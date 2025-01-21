
import { Metadata } from "next"; 
import AuthProvider from "@/context/AuthProvider";
import { APP_NAME } from "@/constants";
  

export const metadata: Metadata = {
  title: APP_NAME + " - Master CP",
  description: "Discover in-depth editorials, innovative solutions, and strategies for competitive programming contests. Sharpen your coding skills with community-driven insights.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
