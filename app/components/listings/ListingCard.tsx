'use client'
import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import { SafeReservations } from '@/app/types';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react'
import { format } from 'date-fns'
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';
import { SafeListing } from '@/app/types';

interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservations;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionId?: string;
    actionLabel?: string;
    currentUser?: SafeUser | null;
    fromtrips?: boolean
}


const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionId = '',
    actionLabel,
    currentUser,
    fromtrips
}) => {

    const router = useRouter();
    const { getByValue } = useCountries()



    const location = getByValue(data.locationValue)


    const handleCancle = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        if (disabled) {
            return;
        }

        onAction?.(actionId)
    }, [onAction, actionId, disabled])


    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price])


    const reservationDate = useMemo(() => {

        if (!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate)
        const end = new Date(reservation.endDate)

        return `${format(start, 'PP')} - ${format(end, 'PP')} `


    }, [reservation])




    return (
        <div onClick={() => router.push(`/listings/${data.id}`)}
            className='col-span-1 cursor-pointer group'>
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image
                        fill
                        alt='listing'
                        src={data.imageSrc}
                        className='object-cover h-full w-full group-hover:scale-110 transition'
                    />
                    <div className="absolute top-3 right-3">
                        
                        {!fromtrips ?
                            <HeartButton
                                listingId={data.id}
                                currentUser={currentUser}
                            /> : null
                        }
                    </div>
                </div>
                <div className="font-semibold text-lg">
                    {location?.region} ,{location?.label}
                </div>
                <div className="font-light text-neutral500">
                    {reservationDate || data.category}
                </div>
                <div className="flex items-center gap-1">
                    <div className="font-semibold">
                        ${price}
                    </div>
                    {!reservation && (
                        <div className='font-light'>
                            night
                        </div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancle}
                    />
                )}
            </div>

        </div>
    )
}

export default ListingCard