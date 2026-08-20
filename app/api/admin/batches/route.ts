import { desc, eq, inArray, sql } from "drizzle-orm";
import { getD1, getDb } from "../../../../db";
import { deviceBatches, devices } from "../../../../db/schema";
import { createPublicCode, safeBaseUrl } from "../../../../lib/device-codes";
import { requireAdminUser } from "../../../../lib/device-auth";

export const dynamic = "force-dynamic";
const productTypes = new Set(["stand", "card", "sticker", "plate", "bundle", "other"]);

export async function GET() {
  const admin = await requireAdminUser();
  if (!admin) return Response.json({ error: "Admin access required" }, { status: 403 });
  const rows = await getDb().select({ id:deviceBatches.id,name:deviceBatches.name,productType:deviceBatches.productType,quantity:deviceBatches.quantity,baseUrl:deviceBatches.baseUrl,createdAt:deviceBatches.createdAt,activeCount:sql<number>`sum(case when ${devices.status} = 'active' then 1 else 0 end)` })
    .from(deviceBatches).leftJoin(devices,eq(devices.batchId,deviceBatches.id)).groupBy(deviceBatches.id).orderBy(desc(deviceBatches.createdAt)).limit(50);
  return Response.json({ batches: rows });
}

export async function POST(request: Request) {
  const admin = await requireAdminUser();
  if (!admin) return Response.json({ error: "Admin access required" }, { status: 403 });
  try {
    const payload=(await request.json()) as {name?:string;productType?:string;quantity?:number;baseUrl?:string};
    const name=payload.name?.trim()??"";const productType=payload.productType?.trim().toLowerCase()??"";const quantity=Number(payload.quantity);const baseUrl=safeBaseUrl(payload.baseUrl??"");
    if(!name||name.length>100)return Response.json({error:"Enter a batch name"},{status:400});
    if(!productTypes.has(productType))return Response.json({error:"Choose a valid product type"},{status:400});
    if(!Number.isInteger(quantity)||quantity<1||quantity>5000)return Response.json({error:"Quantity must be between 1 and 5,000 per batch"},{status:400});
    const db=getDb();const codes=new Set<string>();while(codes.size<quantity)codes.add(createPublicCode());let candidates=[...codes];let collisions=new Set<string>();
    do{collisions=new Set<string>();for(let start=0;start<candidates.length;start+=80){const existing=await db.select({publicCode:devices.publicCode}).from(devices).where(inArray(devices.publicCode,candidates.slice(start,start+80)));existing.forEach(row=>collisions.add(row.publicCode))}collisions.forEach(code=>codes.delete(code));while(codes.size<quantity)codes.add(createPublicCode());candidates=[...codes]}while(collisions.size);
    const batchId=crypto.randomUUID();const generated=candidates.map((publicCode,index)=>({sequence:index+1,id:crypto.randomUUID(),publicCode,url:`${baseUrl}/c/${publicCode}`}));
    await db.insert(deviceBatches).values({id:batchId,name,productType,quantity,baseUrl,createdBy:admin.email});
    const d1=getD1();for(let start=0;start<generated.length;start+=100){const statements=generated.slice(start,start+100).map(device=>d1.prepare("INSERT INTO devices (id, batch_id, public_code, product_type, status) VALUES (?, ?, ?, ?, 'unused')").bind(device.id,batchId,device.publicCode,productType));await d1.batch(statements)}
    return Response.json({batch:{id:batchId,name,productType,quantity,baseUrl,activeCount:0,createdAt:new Date().toISOString()},devices:generated.map(({sequence,publicCode,url})=>({sequence,publicCode,url}))},{status:201});
  } catch(error){return Response.json({error:error instanceof Error?error.message:"Could not create batch"},{status:500})}
}
