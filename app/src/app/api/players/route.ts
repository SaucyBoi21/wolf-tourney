import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client/extension";

const prisma = new PrismaClient()

// POST create new player
export async function POST(request: NextRequest) {
    const body = await request.json()
    const {name, }
}