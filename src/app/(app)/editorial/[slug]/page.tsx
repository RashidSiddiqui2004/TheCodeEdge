 
import EditorialBody from '@/components/custom/EditorialBody'; 
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
            {
                editorialId &&
                <EditorialBody editorialid={editorialId} />
            }
        </>

    )
}