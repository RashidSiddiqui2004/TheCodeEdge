import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MessageSquare, Moon, Sun } from "lucide-react";
import { Editorial } from "@/model/Editorial";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import AuthorProfileEditorial from "./AuthorProfileEditorial";
import { PiHandsClapping, PiShare } from "react-icons/pi";
import { Button } from "../ui/button";
import type { UserResource } from "@clerk/types";

export interface Author {
    authorName: string;
    authorImage: string;
    authorClerkId: string;
}

interface EditorialHeaderProps {
    editorial: Editorial;
    author: Author | undefined;
    user: UserResource | null | undefined; // Clerk's user object (null if not signed in)
    isDarkMode?: boolean;
    toggleDarkMode: () => void;
    handleUpdateLike: () => void;
    updateCommentState?: () => void;
    isEmbedded?: boolean;
    isToggleEnabled?: boolean;
}

const EditorialHeader: React.FC<EditorialHeaderProps> = ({ author, editorial, user, isEmbedded = false, isDarkMode = true, toggleDarkMode, isToggleEnabled = false, handleUpdateLike, updateCommentState = () => { } }) => {

    const { toast } = useToast();

    const likeEditorial = async () => {
        const editorialId = editorial._id;

        try {

            if (!user?.id) {
                toast({
                    title: "Login required",
                    description: "Please sign in to like this editorial.",
                });
                return;
            }
  
            
            if (user?.id && user.id === (author?.authorClerkId)) {
                toast({
                    title: "You can't applaud your own editorial!",
                });
                return;
            }

            const response = await axios.post("/api/editorials/like", {
                id: editorialId,
            });


            if (response.data.success) {
                handleUpdateLike();
                toast({
                    title: "Applauded the editorial ❤️!",
                });
                return;
            }
            else {
                toast({
                    title: "Failed to like the editorial"
                });
            }

        } catch (error) {

            console.log(error);

            toast({
                title: "Error liking the editorial"
            });
        }
    }

    const shareEditorialLink = async () => {
        try {
            const url = window.location.href;
            await navigator.clipboard.writeText(url);

            toast({
                title: "Link Copied!",
                description: "The editorial link has been copied to your clipboard.",
            });
        } catch (error) {
            console.error("Failed to copy link:", error);
            toast({
                title: "Error",
                description: "Could not copy the link. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="my-3">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="space-y-2 w-full">

                        <div className="flex flex-wrap items-center gap-6">
                            {author && (
                                <AuthorProfileEditorial author={author} editorialPublishDate={editorial.createdAt}
                                    editorialEditedDate={editorial.updatedAt} />
                            )}
                        </div>

                        <CardTitle className="text-3xl md:text-5xl font-extrabold mb-4 text-wrap text-left
                        scroll-m-20 tracking-tight">{editorial.title}</CardTitle>

                        <div className="flex flex-col sm:flex-row justify-start gap-2 w-full
                            text-sm text-muted-foreground flex-wrap py-2 relative">

                            <div className="flex flex-row justify-start items-center gap-3 sm:gap-2">

                                {/* contest platform */}
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Badge variant="secondary" className="shadow-md shadow-gray-600">
                                                {editorial.contestPlatform}
                                            </Badge>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-white text-black">
                                            <p>Source Platform</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                {/* contest title */}
                                {
                                    editorial.contestName && (
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Badge variant="secondary" className="shadow-md shadow-gray-600">
                                                        {editorial?.contestName}
                                                    </Badge>
                                                </TooltipTrigger>
                                                <TooltipContent className="bg-white text-black">
                                                    <p>Contest Name</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )
                                }

                                {/* programming language used */}
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Badge variant="secondary" className="shadow-md shadow-gray-600">
                                                {editorial.languageUsed}
                                            </Badge>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-white text-black">
                                            <p>Programming Language Used</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                            </div>

                            {/* likes and comments */}
                            <div className="flex flex-row justify-between mt-3 sm:mt-0 px-14 sm:px-0 border-y-2 py-3 sm:border-none sm:py-1
                             items-center gap-3 sm:gap-2">
                                {/* likes icon */}
                                <div className="flex items-center gap-1">
                                    <PiHandsClapping className={`w-5 h-5 cursor-pointer ${isDarkMode ? "text-white" : ""}`}
                                        onClick={() => { likeEditorial() }} />
                                    <span className={`text-sm font-semibold ${isDarkMode ? "text-white" : ""}`}>{editorial.likes}</span>
                                </div>

                                {/* comments icon */}
                                <div className="flex items-center gap-1">
                                    {
                                        isEmbedded ? (
                                            <MessageSquare className={`w-5 h-5 cursor-pointer ${isDarkMode ? "text-white" : ""}`} />
                                        ) : (
                                            <MessageSquare className={`w-5 h-5 cursor-pointer ${isDarkMode ? "text-white" : ""}`}
                                                onClick={() => { updateCommentState() }} />
                                        )
                                    }

                                    <span className={`text-sm font-semibold ${isDarkMode ? "text-white" : ""}`}>{editorial.comments.length}</span>
                                </div>

                                <div className="flex items-center gap-1">
                                    <PiShare className={`w-5 h-5 cursor-pointer ${isDarkMode ? "text-white" : ""}`}
                                        onClick={() => { shareEditorialLink() }} />
                                </div>

                            </div>

                            {
                                isToggleEnabled &&
                                <Button variant="outline" size="icon" onClick={toggleDarkMode}
                                    className="absolute top-0 right-0">
                                    {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                                    <span className="sr-only">Toggle dark mode</span>
                                </Button>
                            }

                        </div>
                    </div>
                </div>
            </CardHeader >
        </div >
    );
};

export default EditorialHeader;
