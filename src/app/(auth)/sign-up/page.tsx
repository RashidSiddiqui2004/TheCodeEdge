import { SignUp } from "@clerk/nextjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";  
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
            <Card className="w-full max-w-lg shadow-xl">
                <CardHeader className="space-y-1"> 
                    <CardTitle className="text-3xl font-extrabold text-center text-gray-800">
                        Join TheCodeEdge
                    </CardTitle>
                    <CardDescription className="text-center">
                        Sharpen your coding skills and connect with fellow developers
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center">
                    <SignUp
                        appearance={{
                            elements: {
                                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md shadow-md w-full transition duration-200',
                                formButtonSecondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-md w-full transition duration-200',
                                formFieldInput: 'border-2 border-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full',
                                formFieldInputWrapper: 'mb-4 w-full',
                                footerActionLink: 'text-blue-600 hover:text-blue-800 font-medium',
                                card: 'shadow-none',
                            },
                        }}
                    />
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            By signing up, you agree to our{" "}
                            <Link href="/terms" className="text-blue-600 hover:underline">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link href="/privacy" className="text-blue-600 hover:underline">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
