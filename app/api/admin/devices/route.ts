import { and, asc, desc, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { getDb } from "../../../../db";
import { deviceBatches, devices } from "../../../../db/schema";
import { requireAdminUser } from "../../../../lib/device-auth";
export const dynamic="force-dynamic";
export async function GET(request:Request){
  const admin=await requireAdminUser();
  if(!admin)return Response.json({error:"Admin access required"},{status:403});
  const url=new URL(request.url);
  const status=url.searchParams.get("status")?.trim();
  const batchId=url.searchParams.get("batch")?.trim();
  const search=url.searchParams.get("search")?.trim();
  const sort=url.searchParams.get("sort")==="batch"?"batch":"created";
  const direction=url.searchParams.get("direction")==="asc"?"asc":"desc";
  const conditions:SQL[]=[];
  if(status&&["unused","active","disabled"].includes(status))conditions.push(eq(devices.status,status as "unused"|"active"|"disabled"));
  if(batchId)conditions.push(eq(devices.batchId,batchId));
  if(search)conditions.push(or(like(devices.publicCode,`%${search.toUpperCase()}%`),like(devices.ownerEmail,`%${search.toLowerCase()}%`))!);
  const sortColumn=sort==="batch"?deviceBatches.name:devices.createdAt;
  const rows=await getDb().select({
    id:devices.id,publicCode:devices.publicCode,productType:devices.productType,status:devices.status,
    ownerEmail:devices.ownerEmail,label:devices.label,destinationType:devices.destinationType,
    destinationUrl:devices.destinationUrl,claimedAt:devices.claimedAt,createdAt:devices.createdAt,
    scanCount:devices.scanCount,batchId:devices.batchId,batchName:deviceBatches.name
  }).from(devices).innerJoin(deviceBatches,eq(devices.batchId,deviceBatches.id))
    .where(conditions.length?and(...conditions):undefined)
    .orderBy(direction==="asc"?asc(sortColumn):desc(sortColumn),asc(devices.publicCode)).limit(250);
  return Response.json({devices:rows});
}

type AdminActionPayload={
  publicCode?:string;
  action?:"disable"|"enable"|"unlink"|"program";
  scope?:"single"|"selected"|"batch";
  publicCodes?:string[];
  batchId?:string;
  destinationType?:string;
  destinationUrl?:string;
  overwrite?:boolean;
};

export async function PATCH(request:Request){
  const admin=await requireAdminUser();
  if(!admin)return Response.json({error:"Admin access required"},{status:403});
  const payload=(await request.json())as AdminActionPayload;
  const db=getDb();

  if(payload.action==="program"){
    const destinationType=payload.destinationType?.trim()||"other";
    const destinationUrl=payload.destinationUrl?.trim()||"";
    try{const parsed=new URL(destinationUrl);if(!["http:","https:"].includes(parsed.protocol))throw new Error()}catch{return Response.json({error:"Enter a valid http:// or https:// destination link"},{status:400})}
    const scope=payload.scope||"single";
    const targetConditions:SQL[]=[];
    if(scope==="batch"){
      if(!payload.batchId)return Response.json({error:"Choose a batch"},{status:400});
      targetConditions.push(eq(devices.batchId,payload.batchId));
    }else{
      const codes=(scope==="single"?[payload.publicCode||""]:(payload.publicCodes||[])).map(code=>code.trim().toUpperCase()).filter(Boolean);
      if(!codes.length)return Response.json({error:"Choose at least one code"},{status:400});
      if(codes.length>250)return Response.json({error:"Program up to 250 selected codes at once"},{status:400});
      targetConditions.push(inArray(devices.publicCode,codes));
    }
    if(!payload.overwrite)targetConditions.push(eq(devices.status,"unused"));
    const matching=await db.select({id:devices.id}).from(devices).where(and(...targetConditions));
    if(!matching.length)return Response.json({error:"No eligible codes found. Enable overwrite to replace existing destinations."},{status:409});
    const now=new Date().toISOString();
    await db.update(devices).set({status:"active",destinationType,destinationUrl,updatedAt:now}).where(and(...targetConditions));
    return Response.json({ok:true,updatedCount:matching.length});
  }

  const publicCode=payload.publicCode?.trim().toUpperCase()??"";
  const[device]=await db.select().from(devices).where(eq(devices.publicCode,publicCode)).limit(1);
  if(!device)return Response.json({error:"Card not found"},{status:404});
  if(payload.action==="disable")await db.update(devices).set({status:"disabled",updatedAt:new Date().toISOString()}).where(eq(devices.id,device.id));
  else if(payload.action==="enable")await db.update(devices).set({status:device.destinationUrl?"active":"unused",updatedAt:new Date().toISOString()}).where(eq(devices.id,device.id));
  else if(payload.action==="unlink")await db.update(devices).set({status:"unused",ownerEmail:null,label:null,destinationType:null,destinationUrl:null,claimedAt:null,updatedAt:new Date().toISOString()}).where(eq(devices.id,device.id));
  else return Response.json({error:"Invalid action"},{status:400});
  return Response.json({ok:true});
}
