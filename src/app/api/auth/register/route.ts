import { hash } from "bcryptjs";
import clientPromise from "../../../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const client = await clientPromise;
  const users = client.db().collection("users");

  if (!email || typeof email !== "string" || !password || typeof password !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const existing = await users.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await hash(password, 12);
  await users.insertOne({ email, hashedPassword });

  return NextResponse.json({ message: "User created" });
}
