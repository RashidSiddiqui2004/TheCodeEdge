import React from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

interface Author {
    authorName: string;
    authorImage?: string;
}

interface AuthorProfileEditorialProps {
    author: Author;
    editorialPublishDate: Date;
    editorialEditedDate?: Date; // Optional prop for "Edited On" date
}

const AuthorProfileEditorial: React.FC<AuthorProfileEditorialProps> = ({
    author,
    editorialPublishDate,
    editorialEditedDate,
}) => {

    const formatDate = (date: Date | undefined) =>
        date ? new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" }) : "N/A";

    return (
        <div className="flex flex-row gap-3 justify-center">
            {/* Avatar Section */}
            <Avatar>
                <AvatarImage src={author.authorImage} alt={author.authorName} className="" />
                <AvatarFallback>{author.authorName?.charAt(0)}</AvatarFallback>
            </Avatar>

            {/* Details Section */}
            <div className="text-xs text-left flex flex-col gap-y-1">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={`/user/${author.authorName}`} 
                            className="font-normal text-xs bg-slate-300 h-fit w-fit px-2 py-1 text-slate-950 rounded-full">
                                {author.authorName}
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent className="bg-white text-black">
                            <p>Contributor Username</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>


                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    {/* Published On */}
                    <h1 className="text-start text-xs md:text-sm text-slate-300">
                        Published on: <span className="font-medium">{formatDate(editorialPublishDate)}</span>
                    </h1>

                    {/* Edited On (if available) */}
                    {/* {editorialEditedDate && (editorialEditedDate != editorialPublishDate) && (
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                            <span className="w-1 h-1 bg-gray-400 rounded-full" aria-hidden="true"></span> 
                            <h1 className="text-start text-xs md:text-sm">
                                Edited on: <span className="font-medium">{formatDate(editorialEditedDate)}</span>
                            </h1>
                        </div>
                    )} */}
                </div>


            </div>
        </div>
    );
};

export default AuthorProfileEditorial;
