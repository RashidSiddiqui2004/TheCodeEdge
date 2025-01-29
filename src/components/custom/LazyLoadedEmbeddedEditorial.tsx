"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const EmbeddedEditorial = dynamic(() => import("./EmbeddedEditorial"), {
    ssr: false,
});

const LazyLoadedEmbeddedEditorial = () => {
    return (
        <Suspense fallback={<div>Loading editorial...</div>}>
            <EmbeddedEditorial />
        </Suspense>
    );
};

export default LazyLoadedEmbeddedEditorial;
