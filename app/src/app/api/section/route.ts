import { NextResponse, NextRequest } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// GET - get section by id

// POST - create new section
export async function POST(request:NextRequest) {
    const body = await request.json()
    const {name, tournamentId} = body

    const newSection = await prisma.section.create({
        data: {
            name: name, 
            tournament: {
                connect: {id: tournamentId}
            }
        }
    })

    return NextResponse.json(newSection.id, {status: 201})
    
}