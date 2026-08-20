import { chatGPTSignOutPath,requireChatGPTUser } from "../chatgpt-auth";
import { CustomerDevicesClient } from "./customer-devices-client";
export const dynamic="force-dynamic";
export default async function DashboardPage(){const user=await requireChatGPTUser("/dashboard");return <CustomerDevicesClient email={user.email} signOutPath={chatGPTSignOutPath("/")}/>}
