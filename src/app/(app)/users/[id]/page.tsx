"use client"

import type React from "react"
import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios, { type AxiosError } from "axios"
import { useToast } from "@/hooks/use-toast"
import { updateProfileSchema } from "@/schemas/updateProfileSchema"
import { PlatformIconMap } from "@/components/my_icons"

export interface SocialLinkInterface {
    github?: string
    linkedin?: string
    leetcode?: string
    codechef?: string
    codeforces?: string
}

interface SocialIconProps {
    platform: string;
    url: string;
    handleSocialChange: (platform: string, updatedUrl: string) => void;
}

const SocialIcon: React.FC<SocialIconProps> = ({ platform, url, handleSocialChange }) => {
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
        </div>
    );
};


const Page = () => {
    const { user } = useUser()
    const [formData, setFormData] = useState({
        username: user?.username || "",
        bio: "",
        email: user?.primaryEmailAddress?.emailAddress || "",
        socialLinks: {
            github: "",
            linkedin: "",
            leetcode: "",
            codeforces: "",
            codechef: "",
        },
    })

    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    if (!user) {
        return <h1>You're not authenticated!</h1>
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        setFormData((prev) => ({ ...prev, [id]: value }))
    }

    const handleSocialChange = (platform: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [platform]: value,
            },
        }))
    }

    const onSubmit = async () => {
        try {
            setIsSubmitting(true)

            const validatedData = updateProfileSchema.parse({
                ...formData,
                clerkUserId: user.id,
            })

            const response = await axios.post("/api/user/profile", validatedData)

            if (response.data.success) {
                toast({
                    title: "Profile updated",
                    description: response.data.message,
                })
            }
        } catch (error) {
            console.error("Error updating profile:", error)
            const axiosError = error as AxiosError
            const errorMsg = axiosError.response?.data || "Unknown error"
            toast({
                title: "Profile update failed",
                description: "Error occurred",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
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
                        </div>
                        <div>
                            <Label htmlFor="email">E-Mail</Label>
                            <Input id="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor="bio">Bio</Label>
                            <Input id="bio" value={formData.bio} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <SocialIcon platform="github" url={formData.socialLinks.github} handleSocialChange={handleSocialChange} />
                            <SocialIcon platform="linkedin" url={formData.socialLinks.linkedin} handleSocialChange={handleSocialChange} />
                            <SocialIcon platform="leetcode" url={formData.socialLinks.leetcode} handleSocialChange={handleSocialChange} />
                            <SocialIcon platform="codechef" url={formData.socialLinks.codechef} handleSocialChange={handleSocialChange} />
                            <SocialIcon platform="codeforces" url={formData.socialLinks.codeforces} handleSocialChange={handleSocialChange} />
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
                </CardContent>
            </Card>
        </div>
    )
}

export default Page

