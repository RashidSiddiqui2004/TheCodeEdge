// 'use client'

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import Link from "next/link"
// import axios, { AxiosError } from 'axios';
// import { useEffect, useState } from "react"
// // import { useDebounceCallback } from 'usehooks-ts'
// import { Button } from "@/components/ui/button"
// import { useToast } from "@/hooks/use-toast"
// import { useRouter } from "next/navigation"
// import { signUpSchema } from "@/schemas/signUpSchema"
// import { ApiResponse } from "@/types/ApiResponse"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { Loader2 } from "lucide-react"
// import { SignUp } from "@clerk/nextjs"

// const page = () => {
//     const { toast } = useToast()

//     const [username, setUsername] = useState<string>('');
//     const [usernameMessage, setUsernameMsg] = useState<string>('');
//     const [ischeckingUsername, setIscheckingUsername] = useState<boolean>(false);
//     const [isSubmitting, setisSubmitting] = useState(false);

//     // const debounced = useDebounceCallback(setUsername, 500)
//     // useDebounceValue is used to delay the setting of value of a variable (time in ms)

//     const router = useRouter();

//     const form = useForm<z.infer<typeof signUpSchema>>({
//         resolver: zodResolver(
//             signUpSchema
//         ),
//         defaultValues: {
//             username: '',
//             email: '',
//             password: '',
//         }
//     });

//     useEffect(() => {
//         const checkUsernameUnique = async () => {
//             if (username) {
//                 setIscheckingUsername(true);
//                 setUsernameMsg('');

//                 try {
//                     const response = await axios.get(`/api/check-username-unique?username=${username}`);

//                     setUsernameMsg(response.data.message);
//                 } catch (error) {
//                     const axiosError = error as AxiosError<ApiResponse>;
//                     setUsernameMsg(axiosError?.response?.data.message ??
//                         "Error checking username"
//                     );
//                     console.error(axiosError);
//                 }

//                 finally {
//                     setIscheckingUsername(false);
//                 }
//             }

//         }
//         checkUsernameUnique();
//     }, [username])

//     const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
//         setisSubmitting(true)

//         try {
//             const response = await axios.post<ApiResponse>(
//                 '/api/sign-up', data
//             )

//             if (response.data.success) {
//                 toast({
//                     title: "Success",
//                     description: response.data.message
//                 })

//                 router.replace(`/verify/${username}`);
//                 setisSubmitting(false);
//             }
//             else {
//                 toast({
//                     title: "Signup failed",
//                     description: response.data.message
//                 })
//             }

//         } catch (error) {
//             console.error("Error in signup of user", error);
//             const axiosError = error as AxiosError<ApiResponse>;
//             let errorMsg = axiosError.response?.data.message;

//             toast({
//                 title: "Signup Failed",
//                 description: errorMsg,
//                 variant: "destructive"
//             })
//             setisSubmitting(false);
//         }
//     }

//     return (
//         <div className="flex justify-center items-center
//          min-h-screen">

//             <div className="w-full max-w-2xl p-8 space-y-8
//              rounded-lg shadow-md">
//                 <div className="text-center">
//                     <h1 className="text-4xl font-extrabold tracking-tight lg:text-4xl mb-6">
//                         Explore Editorials on TheCodeEdge
//                     </h1>
//                     <p className="mb-4 text-lg text-white">
//                         Dive into insightful editorials, coding tips, and community knowledge. Sign up to stay ahead in the coding world!
//                     </p>
//                 </div>

//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)}
//                         className="space-y-6">
//                         <FormField
//                             control={form.control}
//                             name="username"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Username</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="username"
//                                             className="text-white italic"
//                                             {...field}
//                                             onChange={(e) => {
//                                                 field.onChange(e);
//                                                 setUsername(e.target.value);
//                                             }} />

//                                     </FormControl>

//                                     {ischeckingUsername && <Loader2 className="animate-spin" />}

//                                     <p className={`text-sm ${usernameMessage === "Username is unique" ? 'text-blue-400' : 'text-red-400'}`}>
//                                         {usernameMessage}
//                                     </p>

//                                     <FormDescription>
//                                         This is your public user-name.
//                                     </FormDescription>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="email"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Email</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="john@domain.com"
//                                             className="text-white"
//                                             {...field} />
//                                     </FormControl>
//                                     <FormDescription>
//                                         This is your email address.
//                                     </FormDescription>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="password"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Password</FormLabel>
//                                     <FormControl>
//                                         <Input placeholder="password" type="password"
//                                             className="text-white"
//                                             {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <Button type="submit" disabled={isSubmitting} className="bg-white text-black rounded-md
//                          hover:bg-slate-800 hover:text-white transition-all text-sm">
//                             {
//                                 isSubmitting ?
//                                     <>
//                                         <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
//                                     </>
//                                     :
//                                     "Signup"
//                             }
//                         </Button>
//                     </form>
//                 </Form>

//                 <div className="text-left mt-4">
//                     <p>
//                         Already a member ?{' '}
//                         <Button className="bg-slate-200 text-slate-950 font-semibold rounded-md
//                          hover:bg-slate-800 hover:text-white transition-all text-sm">
//                             <Link href="/sign-in">
//                                 Sign In
//                             </Link>
//                         </Button>
//                     </p>
//                 </div>
//             </div>

//         </div>
//     )


// }

// export default page;