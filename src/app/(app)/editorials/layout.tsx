import type { Metadata } from "next"; 
import { APP_NAME } from "@/constants";
import Navbar from "@/components/custom/Navbar"; 
 

export const metadata: Metadata = {
    title: `Editorials Dashboard - ${APP_NAME}`,
    description: `Explore detailed editorials for coding platforms on ${APP_NAME}. Stay updated with the latest insights and problem solutions.`,
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
            {/* <Footer />  */}
        </>
    );
}
