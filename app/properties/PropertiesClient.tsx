'use client'
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SafeListing, SafeUser } from '../types'
import Heading from '../components/Heading'
import Container from '../components/Container'
import axios from 'axios'
import toast from 'react-hot-toast'
import ListingCard from '../components/listings/ListingCard'

interface PropertiesProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null
}


const PropertiesClient: React.FC<PropertiesProps> = ({ listings, currentUser }) => {

    const router = useRouter();

    const [deletingId, setDeletingId] = useState('')

    const onCancel = useCallback((id: string) => {
        setDeletingId(id)

        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success('Listing deleted')
                router.refresh()
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [router])

    return (
        <Container>
            <Heading
                title='Properties'
                subtitle="List of your properties"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
            lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 ">
                {listings.map((listings) => (
                    <ListingCard
                        fromtrips
                        key={listings.id}
                        data={listings}
                        actionId={listings.id}
                        onAction={onCancel}
                        disabled={deletingId === listings.id}
                        actionLabel='Delete Property'
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default PropertiesClient