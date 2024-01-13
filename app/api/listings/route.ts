import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb'
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(request: Request) {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }
    const body = await request.json()
    const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price } = body;



    Object.keys(body).forEach((value: any) => {

        // ถ้ามีตัวไหนที่ไม่ได้ใส่ จะให้ error
        if (!body[value]) {
            NextResponse.error()
        }
    });

    // add to database
    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathroomCount,
            guestCount,
            locationValue: location.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing)
}

