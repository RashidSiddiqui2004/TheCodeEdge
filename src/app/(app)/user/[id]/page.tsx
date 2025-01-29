import LazyLoadedUserDetails from '@/components/custom/LazyLoadedUserDetails';

export default function page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <LazyLoadedUserDetails params={params} />
    )
} 