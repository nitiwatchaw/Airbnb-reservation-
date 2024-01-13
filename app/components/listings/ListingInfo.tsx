'use client'
import React from 'react'
import dynamic from 'next/dynamic';
import { SafeUser } from '@/app/types'
import useCountries from '@/app/hooks/useCountries';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    category: {
        icon: string;
        label: string;
        description: string
    } | undefined;
    locationValue: string;
}

const Map = dynamic(() => import('../Map'), { ssr: false })


const ListingInfo: React.FC<ListingInfoProps> = ({ user, description, guestCount, roomCount, bathroomCount, category, locationValue }) => {

    const { getByValue } = useCountries();

    const coordinated = getByValue(locationValue)?.latlng
  


    return (
        <div className='col-span-4 flex flex-col gap-8'>
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibol flex items-center gap-2">
                    <div className="">Hosted by {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className="flex items-center gap-4 font-light text-neutral-500">
                    <div className="">{guestCount} guests</div>
                    <div className="">{roomCount} rooms</div>
                    <div className="">{bathroomCount} barhrooms</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />

            <Map
                center={coordinated}
            />
        </div>
    )
}

export default ListingInfo