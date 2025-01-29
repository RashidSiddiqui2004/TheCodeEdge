import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MessageSquare } from "lucide-react";
import { Editorial } from "@/model/Editorial";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import AuthorProfileEditorial from "./AuthorProfileEditorial";
import { PiHandsClapping } from "react-icons/pi";

export interface Author {
    authorName: string;
    authorImage: string;
}

interface EditorialHeaderProps {
    editorial: Editorial;
    author: Author | undefined;
    isDarkMode?: boolean;
    handleUpdateLike: () => void; // for updating likes on the editorial 
    updateCommentState?: () => void;
    isEmbedded?: boolean;
}

const EditorialHeader: React.FC<EditorialHeaderProps> = ({ author, editorial, isEmbedded = false, isDarkMode = true, handleUpdateLike, updateCommentState = () => { } }) => {

    const { toast } = useToast();

    const likeEditorial = async () => {
        const editorialId = editorial._id;

        try {
            const response = await axios.post("/api/editorials/like", {
                id: editorialId,
            });


            if (response.data.success) {
                handleUpdateLike();
            }
            else {
                toast({
                    title: "Failed to like the editorial"
                });
            }
        } catch (error) {
            toast({
                title: "Error liking the editorial"
            });
        }
    }

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
                            text-sm text-muted-foreground flex-wrap py-2">

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

                            <div className="flex flex-row justify-between mt-3 sm:mt-0 px-20 sm:px-0 border-y-2 py-3 sm:border-none sm:py-1
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
                            </div>

                        </div>
                    </div>
                </div>
            </CardHeader >
        </div >
    );
};

export default EditorialHeader;
