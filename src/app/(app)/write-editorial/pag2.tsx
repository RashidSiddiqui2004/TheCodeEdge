"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MonacoCodeEditorComponent } from "@/components/custom/MonacoCodeEditorComponent";
import { enumsTheCodeEdge } from "@/enums/EnumsTheCodeEdge";
import { cn } from "@/lib/utils";
import Navbar from "@/components/custom/Navbar";
import axios from "axios";
import { editorialSchema } from "@/schemas/editorialSchema";
import { SignInButton, useUser } from "@clerk/nextjs";

export interface ContestData {
    contestCode: string
    contestName: string
}

export interface ProblemData {
    problemName: string
    problemUrl: string
}

interface ProblemInput {
    problemName: string;
    approach: string;
    codeBlocks: string[];
}

const Page = () => {

    const { user } = useUser();

    const { ContestPlatforms, QuestionDifficulty, ProgrammingLanguages } = enumsTheCodeEdge;

    const { toast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [listOfContests, setListofContests] = useState<ContestData[]>([]);

    const [listOfProblems, setListofProblems] = useState<ProblemData[]>([]);

    const [formData, setFormData] = useState({
        title: "",
        contestPlatform: ContestPlatforms.CodeChef,
        contestName: "",
        languageUsed: ProgrammingLanguages.Java,
        overallDifficulty: QuestionDifficulty.Medium,
        introduction: "",
        outro: "",
        problemName: "",
        tags: []
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setErrors((prev) => ({ ...prev, [id]: "" }));
    };

    const handleSelectChange = (key: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try { 
            setErrors({});

            const validatedEditorial = editorialSchema.parse({
                ...formData,
                clerkUserId: user?.id
            });

            const response = await axios.post("/api/editorials", validatedEditorial);

            if (response.data.success) {
                toast({
                    title: "Editorial Submitted",
                    description: "Your editorial has been successfully submitted for review.",
                });

                // push to published route only
                router.push("/editorials");
            }

            toast({
                title: "Editorial failed",
                description: "Your editorial has been successfully submitted for review.",
            });

            return;
        } catch (error) {
            toast({
                title: "Submission Failed",
                description: "There was an error submitting your editorial. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const fetchLatestContestsData = async () => {
        try {
            const response = await axios.get(`/api/contest-data/${formData.contestPlatform.toLowerCase()}/all-contests`);

            if (response.data.success) {
                const contestsFetched = response.data.contestData;

                const contestNames = contestsFetched.map((contest: any) => ({
                    contestCode: contest.contest_code,
                    contestName: contest.contest_name
                }));
                setListofContests(contestNames);

            }
        } catch (error) {
            setListofContests([]);
        }
    };

    const fetchContestProblemsData = async () => {
        try {
            const response = await axios.get(`/api/contest-data/${formData.contestPlatform.toLowerCase()}/contest`,
                { params: { contestID: formData.contestName } });

            if (response.data.success) {
                const problemsFetched = response.data.contestData.problems;

                const problemsData: ProblemData[] = Object.entries(problemsFetched).map(([key, problem]: [string, any]) => ({
                    problemName: problem.name,
                    problemUrl: problem.problem_url
                }));

                setListofProblems(problemsData);
            }
        } catch (error) {
            setListofProblems([]);
        }
    };
 
    useEffect(() => {
        fetchLatestContestsData();
    }, [formData.contestPlatform]);

    useEffect(() => {
        if (formData.contestName && (formData.contestName.length > 0)) fetchContestProblemsData();
    }, [formData.contestName]);

    if (!user) {
        return (
            <div className="flex flex-col gap-6 justify-center items-center text-center min-h-screen">
                <h1 className="text-3xl font-semibold text-center">You're not authenticated!</h1>
                <div>
                    <SignInButton />
                </div>
            </div>
        );
    }

    return (
        <div className="text-fell">
            <Navbar />
            <Card className="mx-auto bg-inherit border-none text-white">
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2 flex gap-2 justify-center items-center text-3xl">
                            <Label htmlFor="title" className="text-2xl text-gray-400">Title</Label>
                            <span className="border-r-2 border-white w-1 h-10"></span>
                            <input
                                id="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                placeholder="Enter the title of your editorial"
                                className={cn(
                                    "flex w-full text-3xl text-white rounded-md bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                                )}
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contestPlatform" className="text-xl">Platform</Label>
                            <Select
                                value={formData.contestPlatform}
                                onValueChange={(value) => handleSelectChange("contestPlatform", value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select the platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.keys(ContestPlatforms).map((platform) => (
                                        <SelectItem key={platform} value={platform}>
                                            {ContestPlatforms[platform]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.contestPlatform && (
                                <p className="text-red-500 text-sm">{errors.contestPlatform}</p>
                            )}
                        </div>

                        {
                            listOfContests && (listOfContests.length > 0) && (
                                <div className="space-y-2">
                                    <Label htmlFor="contestName" className="text-xl">Contest</Label>
                                    <Select
                                        value={formData.contestName}
                                        onValueChange={(value) => handleSelectChange("contestName", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select the Contest" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {listOfContests.length > 0 ? (
                                                listOfContests.map((contest, index) => (
                                                    <SelectItem key={index} value={contest.contestCode}>
                                                        {contest.contestName}
                                                    </SelectItem>
                                                ))
                                            ) : (
                                                <p className="text-muted-foreground text-sm px-2 py-1">
                                                    No contests available
                                                </p>
                                            )}
                                        </SelectContent>
                                    </Select>
                                    {errors.contestName && (
                                        <p className="text-red-500 text-sm">{errors.contestName}</p>
                                    )}
                                </div>
                            )
                        }

                        {/* <div className="space-y-2 flex gap-2 justify-center items-center text-3xl">
                            <Label htmlFor="title" className="text-2xl text-gray-400">Contest Experience</Label>
                            <span className="border-r-2 border-white w-1 h-10"></span>
                            <MonacoCodeEditorComponent
                                value={formData.introduction}
                                handleChange={handleChange}
                                language="markdown"
                                placeholder="Write your contest experience here..."
                            /> 
                            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                        </div> */}

                        {
                            listOfProblems && (listOfProblems.length > 0) && (
                                <div className="space-y-2">
                                    <Label htmlFor="problemName" className="text-xl">Problem Name</Label>
                                    <Select
                                        value={formData.problemName}
                                        onValueChange={(value) => handleSelectChange("problemName", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select the Problem" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                listOfProblems.map((problem, index) => (
                                                    <SelectItem key={index} value={problem.problemName}>
                                                        {problem.problemName} {problem.problemUrl}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    {errors.contestName && (
                                        <p className="text-red-500 text-sm">{errors.contestName}</p>
                                    )}
                                </div>
                            )
                        }

                    </form>
                </CardContent>

                <CardFooter className="flex justify-end space-x-4">
                    <Button
                        className="bg-white text-black hover:bg-slate-200"
                        variant="outline"
                        onClick={() => router.back()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="bg-white text-black hover:bg-slate-200"
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Editorial"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Page;

{/* <div className="space-y-2">
                            <Label htmlFor="description">Short Description</Label>
                            <Textarea
                                id="description"
                                value={formData.}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                placeholder="Write a brief description of your editorial"
                                rows={3}
                            />
                        </div> */}

