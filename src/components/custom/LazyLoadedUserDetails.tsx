"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const UserDetails = dynamic(() => import("./UserDetails"), {
    ssr: false,
});

export default function LazyLoadedUserDetails({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    return (
        <Suspense fallback={<div>Loading user profile...</div>}>
            <UserDetails params={params} />
        </Suspense>
    );
};

