import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "horaires.json");

export async function GET() {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD || "slaystudio2025";
  const { password, horaires } = await req.json();

  if (password !== adminPassword) {
    return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 });
  }

  fs.writeFileSync(filePath, JSON.stringify(horaires, null, 2));
  return NextResponse.json({ success: true });
}
