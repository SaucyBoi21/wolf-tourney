import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// GET get a list of all tournaments
export async function GET(request: Request) {

    const allTournaments = await prisma.tournament.findMany()

    return new Response(JSON.stringify(allTournaments), {
        status: 200,
        headers: {'Content-Type': 'application/json'},
    })
}

// GET get a tournament by id
