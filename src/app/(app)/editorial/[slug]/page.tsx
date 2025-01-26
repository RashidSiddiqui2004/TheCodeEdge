
import EditorialBody from '@/components/custom/EditorialBody';
import Navbar from '@/components/custom/Navbar';
import React from 'react'

export default async function Page({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug
    const editorialId = slug?.split("-").pop();
    // const titleSlug = slug?.replace(`-${editorialId}`, ""); // keeping title slug for future uses

    return (
        <>
            <Navbar />
            {
                editorialId &&
                <EditorialBody editorialid={editorialId} />
            }
        </>

    )
}