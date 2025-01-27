
import { Metadata } from "next";
import { APP_NAME } from "@/constants";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: APP_NAME + " - Master CP",
  description: "Discover in-depth editorials, innovative solutions, and strategies for competitive programming contests. Sharpen your coding skills with community-driven insights.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">{children}</div>
      </div>
    </ClerkProvider>
  )
}

