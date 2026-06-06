import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import fs from "fs";
import path from "path";

const DEFAULT_HORAIRES = {
  domicile: {
    "1": ["19:00","19:30","20:00"],
    "2": ["18:00","18:30","19:00","20:00"],
    "3": ["17:30","18:00","18:30","19:00","20:00"],
    "4": ["18:00","18:30","19:00","19:30","20:00"],
    "5": ["17:30","18:00","18:30","19:00"],
  },
  bruna: ["09:00","09:30","10:00","10:30","11:00","11:30"],
};

async function getHoraires() {
  if (process.env.UPSTASH_REDIS_REST_URL) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
    const data = await redis.get("horaires");
    return data ?? DEFAULT_HORAIRES;
  }
  // En local : fichier JSON
  const filePath = path.join(process.cwd(), "data", "horaires.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

async function saveHoraires(horaires: unknown) {
  if (process.env.UPSTASH_REDIS_REST_URL) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
    await redis.set("horaires", horaires);
  } else {
    const filePath = path.join(process.cwd(), "data", "horaires.json");
    fs.writeFileSync(filePath, JSON.stringify(horaires, null, 2));
  }
}

export async function GET() {
  const data = await getHoraires();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD || "slaystudio2025";
  const { password, horaires } = await req.json();

  if (password !== adminPassword) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  await saveHoraires(horaires);
  return NextResponse.json({ success: true });
}
