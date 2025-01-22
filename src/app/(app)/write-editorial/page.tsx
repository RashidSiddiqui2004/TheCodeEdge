"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MonacoCodeEditorComponent } from "@/components/custom/MonacoCodeEditorComponent";
import Navbar from "@/components/custom/Navbar";
import axios from "axios";
import { useUser, SignInButton } from "@clerk/nextjs";
import { QuestionDifficulty } from "@/enums/QuestionDifficulty";
import { enumsTheCodeEdge } from "@/enums/EnumsTheCodeEdge";
import { editorialSchema } from "@/schemas/editorialSchema";
import { ProgrammingLanguages } from "@/enums/Languages";

interface ContestData {
    contestCode: string;
    contestName: string;
}

interface ProblemData {
    problemName: string;
    problemUrl: string;
}

interface ProblemInput {
    problemName: string;
    approach: string;
    code?: string;
    difficulty: QuestionDifficulty;
    link?: string;
}

const Page = () => {
    const { user } = useUser();
    const { toast } = useToast();
    const router = useRouter();

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { ContestPlatforms, QuestionDifficulty, ProgrammingLanguages } = enumsTheCodeEdge;

    const [title, setTitle] = useState<string>("");
    const [contestPlatform, setContestPlatform] = useState<string>(ContestPlatforms.CodeChef);

    const [language, setLanguage] = useState<string>(ProgrammingLanguages.Java);
    const [overallDifficulty, setOverallDifficulty] = useState<string>(QuestionDifficulty.Medium);

    const [introduction, setIntroduction] = useState<string>("");
    const [outro, setOutro] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);

    const [listOfContests, setListOfContests] = useState<ContestData[]>([]);
    const [selectedContest, setSelectedContest] = useState<string>("");

    const [listOfProblems, setListOfProblems] = useState<ProblemData[]>([]);
    const [problemInputs, setProblemInputs] = useState<ProblemInput[]>([]);

    const fetchLatestContestsData = async () => {
        try {
            const response = await axios.get(`/api/contest-data/${contestPlatform.toLowerCase()}/all-contests`);

            if (response.data.success) {
                const contestsFetched = response.data.contestData;

                const contestNames = contestsFetched.map((contest: any) => ({
                    contestCode: contest.contest_code,
                    contestName: contest.contest_name
                }));
                setListOfContests(contestNames);

            }
        } catch (error) {
            setListOfContests([]);
        }
    };

    const fetchContestProblemsData = async () => {
        try {
            const response = await axios.get(`/api/contest-data/${contestPlatform.toLowerCase()}/contest`,
                { params: { contestID: selectedContest } });

            if (response.data.success) {
                const problemsFetched = response.data.contestData.problems;

                const problemsData: ProblemData[] = Object.entries(problemsFetched).map(([key, problem]: [string, any]) => ({
                    problemName: problem.name,
                    problemUrl: problem.problem_url
                }));

                setListOfProblems(problemsData);
            }
        } catch (error) {
            setListOfProblems([]);
        }
    };

    const handleAddProblem = () => {
        setProblemInputs((prev) => [
            ...prev,
            { problemName: "", approach: "", code: "", difficulty: QuestionDifficulty.Medium, link: "" },
        ]);
    };

    const handleRemoveProblem = (index: number) => {
        setProblemInputs((prev) => prev.filter((_, i) => i !== index));
    };

    const handleProblemChange = (index: number, key: keyof ProblemInput, value: any) => {
        setProblemInputs((prev) =>
            prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
        );
    };

    const handleSubmit2 = async () => {
        setIsSubmitting(true);
        try {

            setErrors({});

            const payload = {
                title,
                contestPlatform,
                contestName: selectedContest,
                problems: problemInputs,
                clerkUserId: user?.id,
                languageUsed: language,
                overallDifficulty
            };
  
            const validatedEditorial = editorialSchema.parse(payload);

            console.log(validatedEditorial);

            const response = await axios.post("/api/editorials", validatedEditorial);

            console.log(response);

            if (response.data.success) {
                toast({
                    title: "Editorial Submitted",
                    description: "Your editorial has been successfully submitted for review.",
                });

                // push to published editorial -> route  
                router.push(`/editorial/${}`);
            }

            toast({
                title: "Editorial failed",
                description: "Your editorial has been successfully submitted for review.",
            });

        } catch {
            toast({ title: "Error", description: "Submission failed.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true)
        try {
            setErrors({})

            const payload = {
                title,
                contestPlatform,
                contestName: selectedContest,
                problems: problemInputs,
                clerkUserId: user?.id,
                languageUsed: language,
                overallDifficulty,
            }

            const validatedEditorial = editorialSchema.parse(payload);

            console.log(validatedEditorial);

            const response = await axios.post("/api/editorials", validatedEditorial);

            console.log("API response:", response.data)

            if (response.data.success) {
                toast({
                    title: "Editorial Submitted",
                    description: "Your editorial has been successfully submitted for review.",
                })
                router.push("/editorials")
            } else {
                throw new Error(response.data.message || "Submission failed")
            }
        } catch (error) {
            console.error("Submission error:", error)
            toast({
                title: "Error",
                description: "Submission failed. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        fetchLatestContestsData();
    }, [contestPlatform]);

    useEffect(() => {
        if (selectedContest) fetchContestProblemsData();
    }, [selectedContest]);

    if (!user) {
        return (
            <div className="flex flex-col gap-6 justify-center items-center text-center min-h-screen">
                <h1 className="text-3xl font-semibold">You're not authenticated!</h1>
                <SignInButton />
            </div>
        );
    }

    return (
        <div className="text-fell">
            <Navbar />
            <Card className="mx-auto bg-inherit border-none text-white">
                <CardContent>
                    <div className="space-y-6">

                        {/* title */}
                        <div className="space-y-2 flex gap-2 justify-center items-center text-3xl">
                            <Label htmlFor="title" className="text-2xl text-gray-400">Title</Label>
                            <span className="border-r-2 border-white w-1 h-10"></span>
                            <input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full rounded flex text-3xl text-white bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                        </div>

                        {/* platform name */}
                        <div>
                            <Label>Contest Platform</Label>
                            <Select value={contestPlatform} onValueChange={setContestPlatform}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a platform" />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(ContestPlatforms).map((platform) => (
                                        <SelectItem key={platform} value={platform}>
                                            {platform}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.contestPlatform && (
                                <p className="text-red-500 text-sm">{errors.contestPlatform}</p>
                            )}
                        </div>

                        {/* contest name */}
                        <div>
                            <Label>Contest</Label>
                            <Select value={selectedContest} onValueChange={setSelectedContest}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a contest" />
                                </SelectTrigger>
                                <SelectContent>
                                    {listOfContests.map((contest) => (
                                        <SelectItem key={contest.contestCode} value={contest.contestCode}>
                                            {contest.contestName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Overall Difficulty */}
                        <Select value={overallDifficulty} onValueChange={setOverallDifficulty}>
                            <SelectTrigger>
                                <SelectValue placeholder="Overall Difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(QuestionDifficulty).map((difficulty) => (
                                    <SelectItem key={difficulty} value={difficulty}>
                                        {difficulty}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* language */}
                        <Select value={language} onValueChange={setLanguage}>
                            <SelectTrigger>
                                <SelectValue placeholder="Language Used" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(ProgrammingLanguages).map((language) => (
                                    <SelectItem key={language} value={language}>
                                        {language}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {problemInputs.map((problemInput, index) => (
                            <div key={index} className="mb-4">
                                <Label htmlFor={`problemName-${index}`}>Problem Name</Label>
                                <Select
                                    value={problemInput.problemName}
                                    onValueChange={(value) => handleProblemChange(index, "problemName", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a problem" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {listOfProblems.map((problem) => (
                                            <SelectItem key={problem.problemName} value={problem.problemName}>
                                                {problem.problemName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Label htmlFor={`link-${index}`}>Link</Label>
                                <input
                                    type="text"
                                    id={`link-${index}`}
                                    value={problemInput.link}
                                    onChange={(e) => handleProblemChange(index, "link", e.target.value)}
                                    className="mt-2 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Label htmlFor={`editorial-${index}`}>Editorial</Label>
                                <MonacoCodeEditorComponent
                                    value={problemInput.approach}
                                    language={language}
                                    onChange={(value) => handleProblemChange(index, "approach", value)}
                                />
                                <button
                                    onClick={() => handleRemoveProblem(index)}
                                    className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Remove Problem
                                </button>
                            </div>
                        ))}

                        {/* {problemInputs.map((problemInput, index) => (
                            <div key={index} className="border p-4 rounded space-y-4">
                                <div>
                                    <Label>Problem</Label>
                                    <Select
                                        value={problemInput.problemName}
                                        onValueChange={(value) => {
                                            handleProblemChange(index, "problemName", value)
                                            handleProblemChange(index, "link", problemInput.link)
                                        }
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a problem" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {listOfProblems.map((problem) => (
                                                <SelectItem key={problem.problemName} value={problem.problemName}>
                                                    {problem.problemName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label>Approach</Label>
                                    <MonacoCodeEditorComponent
                                        placeholder="Enter your contest experience"
                                        value={problemInput.approach}
                                        language={"C++"}
                                        onChange={(value) => handleProblemChange(index, "approach", value)}
                                    />
                                </div>

                                <Button onClick={() => handleRemoveProblem(index)}>Remove Problem</Button>
                            </div>
                        ))} */}

                        <Button onClick={handleAddProblem}>Add Another Problem</Button>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Editorial"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Page;
