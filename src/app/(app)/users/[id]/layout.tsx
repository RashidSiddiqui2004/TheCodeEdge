
import Navbar from "@/components/custom/Navbar";
import { APP_NAME } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: APP_NAME + " - Master CP",
    description: "Discover in-depth editorials, innovative solutions, and strategies for competitive programming contests. Sharpen your coding skills with community-driven insights.",
};


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
