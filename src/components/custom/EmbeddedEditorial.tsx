"use client"

import React, { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import CodeEditor from "./CodeEditor"
import { cn } from "@/lib/utils"
import { Editorial } from "@/model/Editorial"
import EditorialHeader, { Author } from "./EditorialHeader"
import axios from "axios"
import TextRenderer from "./TextRenderer"

const EmbeddedEditorial = () => {

    // change this to featured editorial of the week

    const editorialid = "6797e0d5b61d80eba648acf4";
    const [editorial, setEditorial] = useState<Editorial>();
    const [author, setAuthor] = useState<Author>();
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [showFullContent, setShowFullContent] = useState(false);

    function toggleDarkMode(): void {
        setIsDarkMode(!isDarkMode);
    }

    const fetchAuthorName = async (author_id: string) => {
        try {

            const response = await axios.get("/api/user", {
                params: { userId: author_id },
            });

            if (response.data.success) {
                setAuthor(response.data.author);
            }
        } catch (error) {
            console.error("Error fetching author :", error);
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
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

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
        <div
            className={cn("col-span-8 mx-4 transition-colors duration-300 max-w-screen", isDarkMode ? "dark bg-gray-900" : "bg-gray-100")}
        >
            <Card className="col-span-4 md:py-4 mx-0 md:px-6 flex-1 scrollbar-hide bg-inherit
                 rounded-none border-none pb-2 md:pb-10"
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}>


                <div id="home">
                    <EditorialHeader editorial={editorial} author={author}
                        handleUpdateLike={handleUpdateLike} isEmbedded={true} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
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

                    <section className="">
                        {editorial.problems.slice(1, 1).map((problem, index) => (
                            <div key={index} className="border-t border-gray-500 pt-4" id={problem.problemName}>

                                {/* Problem Name */}
                                <div className=" flex gap-x-4 ">
                                    <h2 className="text-xl font-semibold">
                                        {problem.problemName}
                                    </h2>
                                </div>

                                <div className="mt-4">
                                    <h3 className="text-lg font-medium">
                                        Approach
                                    </h3>
                                    <TextRenderer content={problem.approach} />
                                </div>

                                {
                                    !showFullContent ? (
                                        <Button className="my-5" onClick={() => { setShowFullContent(!showFullContent) }}>
                                            Read More
                                        </Button>
                                    ) : (
                                        problem.code && (
                                            <div className="mt-6">
                                                <h3 className="text-lg font-medium">
                                                    Solution Code
                                                </h3>
                                                <CodeEditor code={problem.code} isDarkMode={true} />
                                            </div>
                                        )
                                    )
                                }

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

                    <section className="tags flex flex-wrap gap-2 mt-8">
                        <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                            CodeChef
                        </span>
                        <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                            Competitive Programming
                        </span>
                        <span className="px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-full">
                            Daily Learning
                        </span>
                        <span className="px-3 py-1 text-sm font-medium bg-purple-100 text-purple-800 rounded-full">
                            Problem Solving
                        </span>
                    </section>

                </CardContent>

            </Card>

            {/* <Card className="bg-inherit flex flex-col flex-grow h-full ">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <CardTitle className="text-3xl font-bold">Sample Editorial: LeetCode BiWeekly Contest</CardTitle>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Badge variant="secondary">LeetCode</Badge>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-white text-black">
                                            <p>Source Platform</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <div className="flex items-center gap-1">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>1.2k</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageSquare className="w-4 h-4" />
                                    <span>84</span>
                                </div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Badge variant="secondary">Rashid Siddiqui</Badge>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-white text-black">
                                            <p>Contributor username</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Badge variant="secondary">Master Editorialist</Badge>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-white text-black">
                                            <p>Contributor Badge</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Badge variant="outline" className="text-sm">
                                            Medium
                                        </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-white text-black">
                                        <p>Difficulty Rating of the problem</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <Button variant="outline" size="icon" onClick={toggleDarkMode}>
                                {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                                <span className="sr-only">Toggle dark mode</span>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className={cn("prose max-w-none", isDarkMode ? "dark:prose-invert" : "")}>
                        <p>
                            In this editorial, we&#39;ll explore a recursive solution to generate the Fibonacci sequence. The Fibonacci
                            sequence is a series of numbers where each number is the sum of the two preceding ones...
                        </p>
                        <h3>Problem Statement</h3>
                        <p>Given a number n, calculate the nth Fibonacci number...</p>
                        <h3>Solution</h3>
                        <p>We can solve this problem using a recursive approach. Here&#39;s the implementation:</p>
                       
                    </div>
                </CardContent>
            </Card> */}
        </div>
    )
}

export default EmbeddedEditorial

