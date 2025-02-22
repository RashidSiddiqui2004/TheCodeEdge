"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import EditorialHeader, { Author } from "./EditorialHeader";
import EditorialTags from "./EditorialTags";
import { Editorial } from "@/model/Editorial";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import CodeEditor from "./CodeEditor";
import CommentSection from "./CommentSection";
import { useUser } from "@clerk/nextjs";
import EditorialNavigator from "./EditorialNavigator";
import MoreFromAuthor from "./MoreFromAuthor";
import { BreadCrumbComponent } from "./BreadCrumbComponent";
import TextRenderer from "./TextRenderer";
import { FaLink } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgrammingLanguages } from "@/enums/Languages";

interface EditorialBodyProps {
    editorialid: string;
}

const EditorialBody: React.FC<EditorialBodyProps> = ({ editorialid }) => {
    const { user } = useUser();

    const { toast } = useToast();
    const [editorial, setEditorial] = useState<Editorial>();
    const [author, setAuthor] = useState<Author>(); 
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(true); // will provide it through the context, later
    const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);
    const [codeBlocksStatus, setcodeBlocksStatus] = useState<Record<string, boolean>>({}); // an object with structure {"name" : boolean}

    function toggleDarkMode(): void {
        setIsDarkMode(!isDarkMode);
    }

    const handleNavigate = (problemName: string) => {
        const targetElement = document.getElementById(problemName);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth", // Smooth scrolling animation
                block: "start",    // Scroll so the element is at the start of the viewport
            });
        }
    };

    const handleCommentSection = () => {
        setIsCommentSectionOpen((prev) => !prev);
    }

    const handleUpdateLike = () => {
        setEditorial((prevEditorial: any) => {
            if (!prevEditorial) {
                return undefined;
            }
            return {
                ...prevEditorial,
                likes: prevEditorial.likes + 1,
            };
        });
    };

    const fetchAuthorName = async (author_id: string) => {
        try {

            const response = await axios.get("/api/user", {
                params: { userId: author_id },
            });

            if (response.data.success) {
                setAuthor(response.data.author);
            } else {
                toast({
                    title: "Error",
                    description: response.data.message || "Failed to fetch the author data.",
                });
            }
        } catch (error) {
            console.error("Error fetching author :", error);
            toast({
                title: "Error fetching author",
                description: "An unexpected error occurred.",
            });
        }
    };

    const fetchEditorial = async () => {
        try {
            const response = await axios.get("/api/editorials/id", {
                params: { editorialId: editorialid },
            });

            if (response.data.success) {
                setEditorial(response.data.editorial);

                if (response.data.editorial.problems) {
                    const problems = response.data.editorial.problems;
                    // fill codeBlocksStatus object

                    setcodeBlocksStatus(
                        problems.reduce((acc: Record<string, boolean>, problem: any) => {
                            acc[problem.problemName] = false;
                            return acc;
                        }, {})
                    );

                }

                const author_id = response.data.editorial.author;
                fetchAuthorName(author_id);
            } else {
                toast({
                    title: "Failed to fetch editorial",
                    description: response.data.message || "Something went wrong.",
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                title: "Error fetching editorial",
                description: "An unexpected error occurred.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCommentOnEditorial = async (content: string) => {
        if (!editorialid || !content) {
            console.error("Missing required parameters: editorialId, or content.");
            return false;
        }

        try {
            const response = await axios.post("/api/comment",
                {
                    editorialId: editorialid,
                    commenterId: author?.authorClerkId,
                    content: content,
                }
            );

            if (response.data.success) {
                fetchEditorial();
                return true;
            }

            console.error("Failed to add comment:", response.data.message);
            return false;
        } catch (error) {
            console.error("Error adding comment:", error);
            return false;
        }
    };

    useEffect(() => {  
        fetchEditorial();
    }, []);
 

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            </div>
        );
    }

    if (!editorial) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Alert variant="default">
                    <AlertTitle>Editorial Not Found</AlertTitle>
                    <AlertDescription>The requested editorial does not exist or may have been removed.</AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div
            className={cn("md:grid md:grid-cols-5 h-screen relative transition-colors duration-300", isDarkMode ? "dark bg-gray-900" : "bg-gray-200")}>

            <Card className="col-span-4 py-4 md:py-4 mx-0 md:px-6 flex-1 overflow-y-auto scrollbar-hide bg-inherit
                rounded-none border-none pb-2 md:pb-10"
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}>

                <BreadCrumbComponent />

                <div id="home">
                    <EditorialHeader editorial={editorial} author={author} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}
                        handleUpdateLike={handleUpdateLike} updateCommentState={handleCommentSection} user={user} />
                </div>


                <CardContent className="space-y-6 mx-0">

                    {
                        editorial.introduction &&
                        <section>
                            <h2 className="mt-10 scroll-m-20 pb-2 text-2xl font-semibold
                            tracking-tight transition-colors first:mt-0 text-muted-foreground">
                                Introduction
                            </h2>
                            <p className="text-lg [&:not(:first-child)]:mt-2">{editorial.introduction}</p>
                        </section>
                    }

                    <section>

                        {editorial.problems.map((problem, index) => (
                            <div key={index} className="border-t border-gray-500 pt-4 mt-3" id={problem.problemName}>
                                {/* Problem Name */}

                                <div className=" flex gap-x-4 ">
                                    <h2 className="text-xl font-semibold">
                                        {problem.problemName}
                                    </h2>

                                    {problem.link && (
                                        <Link
                                            href={problem.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:underline"
                                        >
                                            <FaLink className=" text-lg my-1" />
                                        </Link>
                                    )}
                                </div>

                                {/* approach to the problem */}

                                <div className="mt-4">
                                    <h3 className="text-lg font-medium">
                                        Approach
                                    </h3>
                                    <TextRenderer content={problem.approach} />
                                </div>

                                {/* solution to the problem */}

                                {(problem.code && codeBlocksStatus[problem.problemName]) && (
                                    <div className="mt-6">
                                        <h3 className="text-lg font-medium">Solution Code</h3>

                                        <Button
                                            onClick={() => {
                                                setcodeBlocksStatus((prevStatus) => ({
                                                    ...prevStatus,
                                                    [problem.problemName]: false,
                                                }));
                                            }}
                                        >
                                            Hide Code
                                        </Button>

                                        <CodeEditor code={problem.code} isDarkMode={true} language={editorial.languageUsed as ProgrammingLanguages} />

                                    </div>
                                )
                                }
                                {(problem.code && !codeBlocksStatus[problem.problemName]) && (
                                    <div>
                                        <Button
                                            className="p-2"
                                            onClick={() => {
                                                setcodeBlocksStatus((prevStatus) => ({
                                                    ...prevStatus,
                                                    [problem.problemName]: true,
                                                }));
                                            }}
                                        >
                                            Show Code
                                        </Button>
                                    </div>
                                )}

                            </div>
                        ))}

                    </section>

                    {editorial.outro &&
                        <section>
                            <h2 className="mt-10 scroll-m-20 pb-2 text-2xl font-semibold
                            tracking-tight transition-colors first:mt-0 text-muted-foreground">
                                Outro
                            </h2>
                            <blockquote className="mt-6 border-l-2 pl-6 italic text-left mx-auto text-sm sm:text-xs md:text-sm">
                                {editorial.outro}
                            </blockquote>
                        </section>
                    }

                    <section>
                        <EditorialTags tags={editorial.tags || []} />
                    </section>
                </CardContent>

                <MoreFromAuthor author={author} authorId={editorial.author} currentEditorialId={editorialid} />
            </Card>

            {
                isCommentSectionOpen && <CommentSection
                    isCommentSectionOpen={isCommentSectionOpen}
                    commentsIds={editorial.comments}
                    updateCommentState={handleCommentSection}
                    editorialId={editorialid}
                    handleComment={handleCommentOnEditorial}
                    user={user}
                />
            }

            {
                !isCommentSectionOpen && <EditorialNavigator isCommentSectionOpen={isCommentSectionOpen}
                    editorial={editorial}
                    onNavigate={handleNavigate} />
            }

        </div>

    );
};

export default EditorialBody;
