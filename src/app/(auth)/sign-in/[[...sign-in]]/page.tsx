import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
    return (
        <SignIn
            appearance={{
                elements: {
                    rootBox: "mx-auto",
                    card: "bg-white shadow-md rounded-lg",
                },
            }}
        />
    )
}

