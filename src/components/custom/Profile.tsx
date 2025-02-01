"use client";

import React, { useEffect, useState } from "react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { updateProfileSchema } from "@/schemas/updateProfileSchema";
import { PlatformIconMap } from "@/components/my_icons";
import { ZodError } from "zod";
import { User } from "@/model/User";
import EditorialCard from "@/components/custom/EditorialCard";
import { Editorial } from "@/model/Editorial";
import { ObjectId } from "mongoose";
import Link from "next/link";
import generateSlug from "@/lib/generateSlug";
import { SocialLinkInterface } from "@/types";


interface SocialIconProps {
    platform: string;
    url: string;
    handleSocialChange: (platform: string, updatedUrl: string) => void;
    error?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ platform, url, handleSocialChange, error }) => {
    const Icon = PlatformIconMap[platform];

    if (!Icon) {
        console.error(`No icon found for platform: ${platform}`);
        return null;
    }

    return (
        <div className="flex flex-col items-center">
            <Label htmlFor={platform} className="mb-2">
                <Icon className="text-3xl" />
            </Label>
            <Input
                id={platform}
                placeholder={`https://${platform}.com/yourusername`}
                value={url}
                onChange={(e) => handleSocialChange(platform, e.target.value)}
                className="w-full"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

const Profile = () => {
    const { user } = useUser();

    const [editorials, setEditorials] = useState<Editorial[]>([]);

    const [formData, setFormData] = useState({
        username: user?.username || "",
        userProfileImage: "",
        bio: "",
        email: user?.primaryEmailAddress?.emailAddress || "",
        socialLinks: {
            github: "",
            linkedin: "",
            leetcode: "",
            codeforces: "",
            codechef: "",
        },
    });

    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        setFormData((prev) => ({ ...prev, [id]: value }));
        setErrors((prev) => ({ ...prev, [id]: "" }));
    };

    const handleSocialChange = (platform: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [platform]: value,
            },
        }));
        setErrors((prev) => ({ ...prev, [platform]: "" }));
    };

    const onSubmit = async () => {
        try {

            setIsSubmitting(true);
            setErrors({});


            // check if username is unique 

            const usernameUniqueResponse = await axios.get("/api/check-username-unique", {
                params: { username: formData.username, clerkId: user?.id },
            });


            if (usernameUniqueResponse.data.success === false) {
                toast({
                    title: "Username already taken",
                    variant: "destructive",
                });
                return;
            }

            const validatedData = updateProfileSchema.parse({
                ...formData,
                clerkUserId: user?.id,
            });

            const response = await axios.post("/api/user/profile", validatedData);

            if (response.data.success) {
                toast({
                    title: "Profile updated",
                    description: response.data.message,
                });
            }

        } catch (error) {
            console.error("Error updating profile:", error);

            if (error instanceof ZodError) {
                setErrors({});

                const errorMap: { [key: string]: string } = {};
                error.errors.forEach((err) => {
                    if (err.path[0]) {
                        errorMap[err.path[0]] = err.message;
                    }
                });
                setErrors(errorMap);
            } else {
                console.error("Unexpected error:", error);
                toast({
                    title: "An unexpected error occurred",
                    description: "Please try again later.",
                    variant: "destructive",
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchUserData = async (user: any) => {
        try {
            const response = await axios.get("/api/user/profile", { params: { clerkUserId: user.id } });

            if (response.data.success) {
                const fetchedUser: User = response.data.user;
                user.username = fetchedUser.username;

                // populate the data from the fetched response
                setFormData((prev) => ({
                    ...prev,
                    bio: fetchedUser.bio,
                    username: fetchedUser.username,
                    userProfileImage: fetchedUser.imageUrl,
                    socialLinks: { ...prev.socialLinks, ...fetchedUser.socialLinks },
                }));
            }

            return;

        } catch (error) {
            console.log("Error occured while fetching user data: ", error);

            // toast({
            //     title: "Error",
            //     description: "An unexpected error occurred."
            // });
        }
    };

    const fetchEditorials = async (user: any) => {
        try {
            const response = await axios.get("/api/editorials", { params: { userId: user?.id } });

            if (response.data.success) {
                const fetchedEditorials = response.data.userEditorials;
                setEditorials(fetchedEditorials);
            }

            return;

        } catch (error) {
            console.log("Error occured while fetching editorials: ", error);
            // toast({
            //     title: "Error fetching user editorials!",
            //     description: "An unexpected error occurred."
            // });
        }
    }

    useEffect(() => {
        if (user) {
            fetchUserData(user);
            fetchEditorials(user);
        }
    }, [user]);

    if (!user) {
        return (
            <div className="flex flex-col gap-6 justify-center items-center text-center min-h-screen">
                <h1 className="text-3xl font-semibold text-center">You&#39;re not authenticated!</h1>
                <div>
                    <SignInButton />
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8">

            <Card className="mx-auto bg-inherit text-white">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">User Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center space-x-4 mb-6">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
                            <AvatarFallback>
                                {user.firstName?.charAt(0)}
                                {user.lastName?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-xl font-semibold">{user.fullName}</h2>
                            <p>{user.primaryEmailAddress?.emailAddress}</p>
                        </div>
                    </div>
                    <form className="space-y-4">
                        <div>
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" value={formData.username} onChange={handleChange} />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                        </div>
                        <div>
                            <Label htmlFor="email">E-Mail</Label>
                            <Input id="email" value={formData.email} onChange={handleChange} />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>
                        <div>
                            <Label htmlFor="email">Profile image</Label>
                            <Input id="userProfileImage" value={formData.userProfileImage} onChange={handleChange} />
                            {errors.userProfileImage && <p className="text-red-500 text-sm">{errors.userProfileImage}</p>}
                        </div>
                        <div>
                            <Label htmlFor="bio">Bio</Label>
                            <Input id="bio" value={formData.bio} onChange={handleChange} />
                            {errors.bio && <p className="text-red-500 text-sm">{errors.bio}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">

                            {
                                (Object.keys(formData.socialLinks) as (keyof SocialLinkInterface)[]).map((platform) => (
                                    <SocialIcon
                                        key={platform}
                                        platform={platform}
                                        url={formData.socialLinks[platform]}
                                        handleSocialChange={handleSocialChange}
                                        error={errors[`socialLinks.${platform}`]}
                                    />
                                ))}
                        </div>
                        <Button
                            type="button"
                            onClick={onSubmit}
                            disabled={isSubmitting}
                            className="bg-white text-black hover:bg-slate-200 hover:text-slate-950"
                        >
                            {isSubmitting ? "Updating..." : "Update Profile"}
                        </Button>
                    </form>

                    <div className="border-t-2 mt-4 py-4">
                        <h1 className=" text-2xl text-fell">Latest editorials</h1>

                        <div className="grid grid-cols-2 my-2 gap-3">
                            {editorials.length && editorials.map((editorial, index) => {
                                return (
                                    <div key={index}>
                                        <Link href={`/editorial/${generateSlug(editorial.title, (editorial._id as ObjectId).toString())}`}>
                                            <EditorialCard editorial={editorial} />
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Profile;
