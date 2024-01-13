import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '@/app/libs/prismadb'

interface IParams {
    reservationId?: string;

}


export async function DELETE(request: Request, { params }: { params: IParams }) {

    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error()
    }
    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== 'string') {
        throw new Error('Imvalid ID')
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            // คนที่เป็นคนสร้างสถามที่ หรือ คนที่จองสถานที่ สามารถลบได้
            OR: [
                { userId: currentUser.id },
                { listing: { userId: currentUser.id } }
            ]
        }
    });
    return NextResponse.json(reservation)
}