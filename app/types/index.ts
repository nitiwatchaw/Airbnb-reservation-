import { Listing, Reservation, User } from '@prisma/client'


// เพราะว่า เราไม่สามารถกำหนด type ของ พวก Date ได้ เลยตั้งแยกเพิ่มนั้นเอง

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type SafeListing = Omit<
  Listing, "createdAt"
> & {
  createdAt: string
}

export type SafeReservations = Omit<
  Reservation,
  'createdAt' | 'startDate' | 'endDate' | 'listing'> & {
    createdAt: string;
    startDate: string;
    endDate: string;
    listing: SafeListing;
  }