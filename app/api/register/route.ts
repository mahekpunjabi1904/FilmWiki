import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import users from "@/data/users.json";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  // Check if email already exists
  if (users.find((u) => u.email === email)) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Create new user
  const newUser = {
    id: Date.now(),
    name,
    email,
    password 
  };

  // Add to array
  const updatedUsers = [...users, newUser];

  // Save back to users.json
  const filePath = path.join(process.cwd(), "data", "users.json");
  fs.writeFileSync(filePath, JSON.stringify(updatedUsers, null, 2));

  return NextResponse.json({ message: "User registered successfully" });
}
