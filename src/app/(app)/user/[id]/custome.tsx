// "use client";

// import React, { useState } from "react";
// import { SignInButton, useUser } from "@clerk/nextjs";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import axios from "axios";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { useToast } from "@/hooks/use-toast";
// import { updateProfileSchema } from "@/schemas/updateProfileSchema";
// import { PlatformIconMap } from "@/components/my_icons";
// import { z } from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Loader2 } from "lucide-react";

// export interface SocialLinkInterface {
//     github?: string;
//     linkedin?: string;
//     leetcode?: string;
//     codechef?: string;
//     codeforces?: string;
// }

// interface SocialIconProps {
//     platform: string;
//     url: string;
//     handleSocialChange: (platform: string, updatedUrl: string) => void;
//     error?: string;
// }

// const SocialIcon: React.FC<SocialIconProps> = ({ platform, url, handleSocialChange }) => {
//     const Icon = PlatformIconMap[platform];
//     if (!Icon) return null;

//     return (
//         <div className="flex flex-col items-center">
//             <Label htmlFor={platform} className="mb-2">
//                 <Icon className="text-3xl" />
//             </Label>
//             <Input
//                 id={platform}
//                 placeholder={`https://${platform}.com/yourusername`}
//                 value={url}
//                 onChange={(e) => handleSocialChange(platform, e.target.value)}
//                 className="w-full"
//             />
//         </div>
//     );
// };

// const Page = () => {
//     const { user } = useUser();
//     const { toast } = useToast();
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const form = useForm<z.infer<typeof updateProfileSchema>>({
//         resolver: zodResolver(updateProfileSchema),
//         defaultValues: {
//             username: user?.username || "",
//             bio: "",
//             email: user?.primaryEmailAddress?.emailAddress || "",
//             socialLinks: {
//                 github: "",
//                 linkedin: "",
//                 leetcode: "",
//                 codeforces: "",
//                 codechef: "",
//             },
//         },
//     });

//     const watchSocialLinks = form.watch("socialLinks") || {};
//     const errors = form.formState.errors;

//     const handleSocialChange = (platform: string, updatedUrl: string) => {
//         form.setValue(`socialLinks.${platform}` as `socialLinks.${keyof SocialLinkInterface}`, updatedUrl);
//     };


//     const onSubmit = async (data: z.infer<typeof updateProfileSchema>) => {
//         console.log("heello world");

//         try {
//             setIsSubmitting(true);
//             const response = await axios.post("/api/user/profile", data);

//             if (response.data.success) {
//                 toast({ title: "Profile updated", description: response.data.message });
//             } else {
//                 toast({ title: "Update failed", description: response.data.message, variant: "destructive" });
//             }
//         } catch (error) {
//             toast({ title: "An error occurred", description: "Please try again.", variant: "destructive" });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     if (!user) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen text-center gap-6">
//                 <h1 className="text-3xl font-semibold">You're not authenticated!</h1>
//                 <SignInButton />
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto py-8">
//             <Card className="mx-auto bg-inherit text-white">
//                 <CardHeader>
//                     <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <div className="flex items-center space-x-4 mb-6">
//                         <Avatar className="w-20 h-20">
//                             <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
//                             <AvatarFallback>
//                                 {user.firstName?.charAt(0)}
//                                 {user.lastName?.charAt(0)}
//                             </AvatarFallback>
//                         </Avatar>
//                         <div>
//                             <h2 className="text-xl font-semibold">{user.fullName}</h2>
//                             <p>{user.primaryEmailAddress?.emailAddress}</p>
//                         </div>
//                     </div>

//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)}>
//                             <FormField
//                                 control={form.control}
//                                 name="username"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Username</FormLabel>
//                                         <FormControl>
//                                             <Input {...field} placeholder="johndoe" />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             <FormField
//                                 control={form.control}
//                                 name="email"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Email</FormLabel>
//                                         <FormControl>
//                                             <Input {...field} placeholder="john@domain.com" />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             <FormField
//                                 control={form.control}
//                                 name="bio"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Bio</FormLabel>
//                                         <FormControl>
//                                             <Input {...field} placeholder="Your bio" />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             <div className="grid grid-cols-2 gap-4">
//                                 {Object.keys(watchSocialLinks).map((platform) => (
//                                     <SocialIcon
//                                         key={platform}
//                                         platform={platform}
//                                         url={watchSocialLinks[platform as keyof SocialLinkInterface] || ""} // Ensure proper type access
//                                         handleSocialChange={handleSocialChange}
//                                     />
//                                 ))}
//                             </div>


//                             <Button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className="bg-white text-black mt-4 hover:bg-slate-200"
//                             >
//                                 {isSubmitting ? (
//                                     <>
//                                         <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
//                                     </>
//                                 ) : (
//                                     "Update Profile"
//                                 )}
//                             </Button>
//                         </form>
//                     </Form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default Page;
