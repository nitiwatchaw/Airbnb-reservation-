'use client'
import React, { useCallback, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import MenuItem from './MenuItem'
import Avatar from '../Avatar'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import useLoginModel from '@/app/hooks/useLoginModal'
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import useRentModal from '@/app/hooks/useRentModal'
import { useRouter } from 'next/navigation'


interface NavbarProps {
    currentUser?: SafeUser | null;
}



const UserMenu: React.FC<NavbarProps> = ({ currentUser }) => {

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((value => !value))
    }, [])

    const registerModal = useRegisterModal()
    const loginModal = useLoginModel()
    const rentModal = useRentModal()



    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen()
        }

        rentModal.onOpen()
    }, [currentUser, loginModal, rentModal])

    return (
        <div className='relative'>
            <div className="flex items-center gap-3">
                <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full
                 hover:bg-neutral-100 transition cursor-pointer" onClick={onRent}>
                    Airbnb your home
                </div>
                <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex 
                items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition" onClick={toggleOpen}>
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>

            {!isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white 
                overflow-hidden right-0 top-12 text-sm ">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                            <>
                                <MenuItem onClick={() => router.push('/trips')} label='My trip' />
                                <MenuItem onClick={() => router.push('/favorites')} label='My favorites' />
                                <MenuItem onClick={() => router.push('/reservations')} label='My reservation' />
                                <MenuItem onClick={() => router.push('/properties')} label='My properties' />
                                <MenuItem onClick={rentModal.onOpen} label='Airbnb my home' />
                                <hr />
                                <MenuItem onClick={() => signOut()} label='Logout' />
                            </>
                        ) : <>
                            <MenuItem onClick={loginModal.onOpen} label='login' />
                            <MenuItem onClick={registerModal.onOpen} label='Sign up' />
                        </>}
                    </div>
                </div>
            )
            }
        </div >
    )
}

export default UserMenu