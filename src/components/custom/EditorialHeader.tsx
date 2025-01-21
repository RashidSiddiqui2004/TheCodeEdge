'use client';

import { CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ThumbsUp, MessageSquare } from "lucide-react"
import { enumsTheCodeEdge } from "@/enums/EnumsTheCodeEdge";
import { Editorial } from "@/model/Editorial";
import React, { useEffect, useState } from "react";
import { User } from "@/model/User";

interface EditorialHeaderProps {
    editorial: Editorial
}

const EditorialHeader: React.FC<EditorialHeaderProps> = ({ editorial }) => {

    const [author, setAuthor] = useState<User | null>(null);
    const { AuthorBadge } = enumsTheCodeEdge;

    const fetchAuthorData = async () => {
        const authorData = await fetch(`/api/user/${editorial.author}`);
    }

    useEffect(() => {
        fetchAuthorData();
    }, [])


    return (
        <div>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="space-y-2 w-full">
                        <CardTitle className="text-5xl font-extrabold mb-4">{editorial.title}</CardTitle>

                        <div className="flex flex-row justify-between items-center gap-2 w-full 
                            text-sm text-muted-foreground">

                            <div className="flex flex-wrap items-center gap-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Badge variant="secondary" className="shadow-md shadow-gray-600">{editorial.contestPlatform}</Badge>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-white text-black">
                                            <p>Source Platform</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Badge variant="secondary" className="shadow-md shadow-gray-600">{editorial.languageUsed}</Badge>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-white text-black">
                                            <p>Programming language used in Editorial</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <div className="flex items-center gap-1">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>{editorial.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageSquare className="w-4 h-4" />
                                    <span>{editorial.comments.length}</span>
                                </div>

                            </div>

                            <div className="flex flex-wrap items-center gap-6">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Badge variant="secondary" className="shadow-md shadow-gray-600 text-sm font-normal">{author?.username}</Badge>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-white text-black">
                                            <p>Contributor username</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Badge variant="secondary" className="shadow-md shadow-gray-600 text-sm font-normal">{author?.authorBadge}</Badge>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-white text-black">
                                            <p>Contributor Badge</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Badge variant="outline"
                                        className="text-lg border-white shadow-md shadow-gray-600">
                                        {editorial.overallDifficulty}
                                    </Badge>
                                </TooltipTrigger>
                                <TooltipContent className="bg-white text-black">
                                    <p>Difficulty Rating of the problem</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {/* <Button variant="outline" size="icon" onClick={toggleDarkMode}>
                            {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                            <span className="sr-only">Toggle dark mode</span>
                        </Button> */}
                    </div>
                </div>
            </CardHeader>
        </div>
    )
}

export default EditorialHeader