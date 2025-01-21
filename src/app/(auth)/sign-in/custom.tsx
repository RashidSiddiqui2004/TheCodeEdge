
'use client';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { signInSchema } from "@/schemas/signInSchema"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { signIn, useSession } from "next-auth/react";
import { useState } from "react"
import { SignIn } from "@clerk/nextjs";

// zod ka implementation kaise krna hai wo bhi pdh lete hai

// axios to chahiye hi for requests
const page = () => {

    const { toast } = useToast();
    const router = useRouter();
    const [isSubmitting, setisSubmitting] = useState(false);

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(
            signInSchema
        ),
        defaultValues: {
            identifier: '',
            password: '',
        }
    });


    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        setisSubmitting(true)

        //  we're using next-auth so the signin will be done with the
        // help of next-auth not manually => no API call here

        const result = await signIn('credentials', {
            redirect: false,
            identifier: data.identifier,
            password: data.password,
        });

        if (result?.error) {
            toast({
                title: "Log-In Failed",
                description: "Incorrect username or password",
                variant: "destructive",
            })
        }

        if (result?.url) {
            router.replace('/dashboard');
        }

        setisSubmitting(false);
    }

    const { data: session } = useSession();

    if (session && session.user) {
        router.replace('/dashboard');
        return;
    }

    return (
        <SignIn />
        // <div className="flex justify-center items-center
        //  min-h-screen">

        //     <div className="w-full max-w-2xl p-8 space-y-8
        //      rounded-lg shadow-md">
        //         <div className="text-center">
        //             <h1 className="text-4xl font-extrabold tracking-tight lg:text-4xl mb-6">
        //                 Welcome Back to TheCodeEdge
        //             </h1>
        //             <p className="mb-6 text-lg text-white">
        //                 Sign in to explore expert editorials, coding tips, and personalized recommendations.
        //             </p>
        //         </div>

        //         <Form {...form}>
        //             <form onSubmit={form.handleSubmit(onSubmit)}
        //                 className="space-y-6">

        //                 <FormField
        //                     control={form.control}
        //                     name="identifier"
        //                     render={({ field }) => (
        //                         <FormItem>
        //                             <FormLabel>Username</FormLabel>
        //                             <FormControl>
        //                                 <Input placeholder="Username"
        //                                     {...field} className="text-black" />
        //                             </FormControl>
        //                             <FormMessage />
        //                         </FormItem>
        //                     )}
        //                 />
        //                 <FormField
        //                     control={form.control}
        //                     name="password"
        //                     render={({ field }) => (
        //                         <FormItem>
        //                             <FormLabel>Password</FormLabel>
        //                             <FormControl>
        //                                 <Input placeholder="password" type="password"
        //                                     {...field} className="text-black" />
        //                             </FormControl>
        //                             <FormMessage />
        //                         </FormItem>
        //                     )}
        //                 />

        //                 <Button type="submit" disabled={isSubmitting} className="bg-white text-black rounded-md
        //                  hover:bg-slate-800 hover:text-white transition-all text-sm">
        //                     {
        //                         isSubmitting ?
        //                             <>
        //                                 <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
        //                             </>
        //                             :
        //                             "SignIn"
        //                     }
        //                 </Button>
        //             </form>
        //         </Form>

        //         <div className="text-left mt-4">
        //             <p>
        //                 Don&apos;t have an account ?
        //                 <Button className="bg-slate-200 ml-2 text-slate-950 font-semibold rounded-md
        //                  hover:bg-slate-800 hover:text-white transition-all text-sm">
        //                     <Link href="/sign-up">
        //                         Sign Up
        //                     </Link>
        //                 </Button>
        //             </p>
        //         </div>
        //     </div>

        // </div>
    )
}

export default page