import { getChatGPTUser } from "../app/chatgpt-auth";
import { getRuntimeEnv } from "./runtime-env";
export function getBiz365Env(){try{return getRuntimeEnv()}catch{return {BIZ365_ADMIN_EMAIL:process.env.BIZ365_ADMIN_EMAIL}}}
export async function requireApiUser(){return getChatGPTUser()}
export async function requireAdminUser(){const user=await requireApiUser();const email=getBiz365Env().BIZ365_ADMIN_EMAIL?.trim().toLowerCase();return user&&email&&user.email.toLowerCase()===email?user:null}
