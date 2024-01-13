'use client'
import React, { useEffect, useState } from 'react'

interface ClientOnlyProps {
    children: React.ReactNode
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
    const [hasMounted, setHasounted] = useState(false)

    useEffect(() => {
        setHasounted(true)
    }, [])

    if (!hasMounted) {
        return null;
    }
    return (
        <>{children}</>
    )
}

export default ClientOnly