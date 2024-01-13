
import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathroomCount?: number;
    startDate?: number;
    endDate?: number;
    locationValue: number;
    category?: number;
}

// get all listing from database
export default async function getListing(params: IListingsParams) {
    try {

        const { userId, guestCount, roomCount, bathroomCount, startDate, endDate, locationValue, category } = params;

        let query: any = {};


        if (userId) {
            query.userId = userId
        }
        if (category) {
            query.category = category
        }

        if (roomCount) {
            query.roomCount = {
                // greaterthan or equal
                gte: + roomCount
            }
        }
        if (
            bathroomCount) {
            query.bathroomCount = {
                // greaterthan or equal
                gte: + bathroomCount
            }
        }

        if (guestCount) {
            query.guestCount = {
                // greaterthan or equal
                gte: + guestCount
            }
        }

        if (locationValue) {
            query.locationValue = locationValue
        }

        // filter date range
        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate }
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate }
                            }
                        ]
                    }
                }
            }
        }


        const listing = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        })
        // fixed error
        const safeListings = listing.map((listing) => ({
            ...listing, createdAt: listing.createdAt.toISOString(),
        }))
        return safeListings;
    }
    catch (error: any) {
        throw new Error(error)
    }
}