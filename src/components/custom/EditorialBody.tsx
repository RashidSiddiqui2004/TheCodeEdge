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
import { MonacoCodeEditorComponent } from "./MonacoCodeEditorComponent";
import { MonacoReadOnlyEditor } from "./MonacoReadOnlyEditor";
import CommentSection from "./CommentSection";
import { useUser } from "@clerk/nextjs";
import { ObjectId } from "mongoose";
import EditorialNavigator from "./EditorialNavigator";
import MoreFromAuthor from "./MoreFromAuthor";

interface EditorialBodyProps {
    editorialid: string;
}

const EditorialBody: React.FC<EditorialBodyProps> = ({ editorialid }) => {
    const user = useUser();

    if (!user.isSignedIn) {
        return;
    }

    const clerkId = user.user.id;

    const { toast } = useToast();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [editorial, setEditorial] = useState<Editorial>();
    const [author, setAuthor] = useState<Author>();
    const [loading, setLoading] = useState(true);
    const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);

    const handleNavigate = (problemName: string) => {
        console.log("Navigate to question:", problemName);

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

    const toggleDarkMode = () => {
        setIsDarkMode((prev) => !prev);
        document.documentElement.classList.toggle("dark");
    };

    const handleUpdateLike = () => {
        setEditorial((prevEditorial) => {
            if (!prevEditorial) {
                return undefined;
            }
            return {
                ...prevEditorial,
                likes: prevEditorial.likes + 1,
            };
        });
    };


    const fetchAuthorName = async (author_id: any) => {
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
                const author_id = response.data.editorial.author;
                fetchAuthorName(author_id);
            } else {
                toast({
                    title: "Failed to fetch editorial",
                    description: response.data.message || "Something went wrong.",
                });
            }
        } catch (error) {
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
            const response = await axios.post("/api/editorials/comment",
                {
                    editorialId: editorialid,
                    commenterId: clerkId,
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
        return <h1>Loading...</h1>;
    }

    if (!editorial) {
        return <h1>Editorial Not Found</h1>;
    }

    return (

        <div className="md:grid md:grid-cols-5 min-h-screen bg-slate-800 text-white">

            <Card className="col-span-4 md:py-4 mx-0 md:px-6 min-h-screen bg-inherit
                 text-white rounded-none border-none pb-2 md:pb-10">

                <EditorialHeader editorial={editorial} author={author}
                    handleUpdateLike={handleUpdateLike} updateCommentState={handleCommentSection} />

                <CardContent className="space-y-6 mx-0">
                    {/* Introduction */}

                    {
                        editorial.introduction &&
                        <section>
                            <h2 className="mt-10 scroll-m-20 pb-2 text-2xl font-semibold
                            tracking-tight transition-colors first:mt-0 text-muted-foreground">
                                Introduction
                            </h2>
                            <p className="text-lg text-gray-300 [&:not(:first-child)]:mt-2">{editorial.introduction}</p>
                        </section>
                    }


                    {/* Problems */}
                    <section className="">
                        {editorial.problems.map((problem, index) => (
                            <div key={index} className="border-t border-gray-500 pt-4" id={problem.problemName}>
                                {/* Problem Name */}
                                <h2 className="text-xl font-semibold text-purple-400">
                                    {problem.problemName}
                                </h2>

                                {problem.link && (
                                    <Link
                                        href={problem.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        View Problem
                                    </Link>
                                )}

                                <div className="mt-4">
                                    <h3 className="text-lg font-medium text-gray-300">
                                        Approach:
                                    </h3>
                                    <MonacoReadOnlyEditor value={problem.approach} />
                                </div>

                                {problem.code && (
                                    <div className="mt-6">
                                        <h3 className="text-lg font-medium text-gray-300">
                                            Solution Code:
                                        </h3>
                                        <CodeEditor code={problem.code} isDarkMode={true} />
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
                            <blockquote className="mt-6 border-l-2 pl-6 italic text-left mx-auto text-xs md:text-sm">
                                {editorial.outro}
                            </blockquote>
                        </section>
                    }

                    {/* Tags */}
                    <section>
                        <EditorialTags tags={editorial.tags || []} />
                    </section>
                </CardContent>

                <MoreFromAuthor author={author} authorId={editorial.author} currentEditorialId={editorialid} />
            </Card>

            {
                isCommentSectionOpen && <CommentSection
                    isCommentSectionOpen={isCommentSectionOpen}
                    updateCommentState={handleCommentSection}
                    commentsIds={editorial.comments}
                    handleComment={handleCommentOnEditorial}
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
