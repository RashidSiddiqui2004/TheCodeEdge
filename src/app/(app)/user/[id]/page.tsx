"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { PlatformIconMap } from "@/components/my_icons";
import { User } from "@/model/User";
import EditorialCard from "@/components/custom/EditorialCard";
import { Editorial } from "@/model/Editorial";
import TextDisplay from "@/components/ui/TextDisplay";
import Image from "next/image";

export interface SocialLinkInterface {
    github?: string;
    linkedin?: string;
    leetcode?: string;
    codechef?: string;
    codeforces?: string;
}

interface SocialIconProps {
    platform: string;
    url: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ platform, url }) => {
    const Icon = PlatformIconMap[platform];

    if (url == "") {
        return;
    }

    if (!Icon) {
        return null;
    }

    return (
        <div className="flex flex-col items-center">
            <Label htmlFor={platform} className="mb-2">
                <Icon className="text-3xl" />
            </Label>
            <TextDisplay id="email" value={url} className=" w-full" />
        </div>
    );
};

export default function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {

    const { toast } = useToast();

    const [userData, setUserData] = useState<User | null>(null);
    const [editorials, setEditorials] = useState<Editorial[]>([]);
    const [username, setUsername] = useState<string | null>(null);

    const fetchUserData = async () => {
        try {
            const resolvedParams = await params;
            setUsername(resolvedParams.id);

            const response = await axios.get("/api/user/universalProfile", {
                params: { username: resolvedParams.id },
            });

            if (response.data.success) {
                const fetchedUser: User = response.data.user;
                setUserData(fetchedUser);
            } else {
                toast({
                    title: "Error",
                    description: "User data not found!"
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "An unexpected error occurred."
            });
        }
    };

    const fetchEditorials = async () => {
        try {
            if (userData) {
                const response = await axios.get("/api/editorials", {
                    params: { objectId: userData._id },
                });

                if (response.data.success) {
                    setEditorials(response.data.userEditorials);
                } else {
                    toast({
                        title: "Error fetching editorials",
                        description: response.data.message || "Failed to fetch editorials.",
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching editorials:", error);
            toast({
                title: "Error fetching user editorials!",
                description: "An unexpected error occurred.",
            });
        }
    };


    useEffect(() => {
        fetchUserData();
        fetchEditorials();
    }, []);

    return (
        <div className="py-8 flex justify-center items-center bg-slate-950 text-fell">

            <Card className="mx-auto bg-inherit text-white">
                <CardContent>
                    <div className="space-y-4">

                        <div>
                            <div className="flex items-center space-x-4">

                                {
                                    userData?.imageUrl &&
                                    <Image
                                        id="profileImage"
                                        src={userData?.imageUrl}
                                        alt="Profile"
                                        width={10}
                                        height={10}
                                        className="w-12 h-12 rounded-full border"
                                    />
                                }

                                <span>{userData?.username || "N/A"}</span>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email">E-Mail</Label>
                            <TextDisplay id="email" value={userData?.email || "N/A"} isLink={false} />
                        </div>

                        <div>
                            <Label htmlFor="bio">Bio</Label>
                            <TextDisplay
                                value={userData?.bio || "N/A"}
                                className="resize-none"
                                isLink={false}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {userData?.socialLinks &&
                                Object.keys(userData.socialLinks).map((platform) => (
                                    <SocialIcon
                                        key={platform}
                                        platform={platform}
                                        url={userData?.socialLinks[platform] || ""}
                                    />
                                ))}
                        </div>
                    </div>

                    <div className="border-t-2 mt-4 py-4">
                        <h1 className="text-2xl text-fell">Latest editorials</h1>

                        <div className="grid grid-cols-2 my-2 gap-3">
                            {editorials.map((editorial, index) => {
                                return (
                                    <div key={index}>
                                        <EditorialCard
                                            editorial={editorial}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}