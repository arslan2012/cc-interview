"use server"

import { generateNonce } from 'siwe'
import { cookies } from "next/headers";
import { type SessionData, sessionOptions } from "@/utils/sessionOptions";
import { getIronSession } from "iron-session";

export async function getNounce() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  const nonce = generateNonce();
  session.nonce = nonce;
  await session.save();
  return nonce;
}