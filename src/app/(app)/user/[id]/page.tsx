import UserDetails from '@/components/custom/UserDetails';
import React from 'react'

export default function page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <UserDetails params={params} />
    )
} 