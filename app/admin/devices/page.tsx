import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import { chatGPTSignOutPath, requireChatGPTUser } from "../../chatgpt-auth";
import { getBiz365Env } from "../../../lib/device-auth";
import { AdminDevicesClient } from "./admin-devices-client";
export const dynamic="force-dynamic";
export default async function AdminDevicesPage(){const user=await requireChatGPTUser("/admin/devices");const isAdmin=user.email.toLowerCase()===getBiz365Env().BIZ365_ADMIN_EMAIL?.trim().toLowerCase();if(!isAdmin)return <main className="portal-page"><section className="portal-auth-card"><LockKeyhole/><span>NFCPLATE ADMIN</span><h1>Admin access required</h1><p>This account is not authorized to manage product inventory.</p><Link href={chatGPTSignOutPath("/admin/devices")}>Sign in with another account</Link></section></main>;return <AdminDevicesClient adminEmail={user.email}/>}
