"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { enumsTheCodeEdge } from "@/enums/EnumsTheCodeEdge";
import { editorialSchema } from "@/schemas/editorialSchema";
import { contestProblemLinks, EDITORIAL_LIMITS } from "@/constants";
import { ContestPlatforms } from "@/enums/ContestPlatforms";
import TextDisplay from "@/components/ui/TextDisplay";
import generateSlug from "@/lib/generateSlug";
import { Badge } from "../ui/badge";
import { GiCancel } from "react-icons/gi";
import { ContestData, ProblemData, ProblemInput } from "@/types";
import EditorialValidation from "./EditorialValidation";
import { Info } from "lucide-react";

const WriteEditorial = () => {

    const { user } = useUser();
    const { toast } = useToast();
    const router = useRouter();

    const [showSchema, setShowSchema] = useState(false);
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
    const [currentTag, setCurrentTag] = useState('');

    const [listOfContests, setListOfContests] = useState<ContestData[]>([]);
    const [selectedContest, setSelectedContest] = useState<string>("");

    const [listOfProblems, setListOfProblems] = useState<ProblemData[]>([]);
    const [problemInputs, setProblemInputs] = useState<ProblemInput[]>([]);

    const fetchLatestContestsData = async () => {
        try {
            const response = await axios.get(`/api/contest-data/${contestPlatform.toLowerCase()}/all-contests`);

            if (response.data.success) {
                const contestsFetched = response.data.contestData;

                if (contestPlatform === ContestPlatforms.CodeChef) {
                    const contestNames = contestsFetched.map((contest: any) => ({
                        contestCode: contest.contest_code,
                        contestName: contest.contest_name
                    }));
                    setListOfContests(contestNames);
                }
                else if (contestPlatform === ContestPlatforms.Codeforces) {
                    const contestNames = contestsFetched.map((contestBody: any) => ({
                        contestCode: contestBody?.id || "Unknown",
                        contestName: contestBody?.name?.toString() || "Unnamed Contest",
                    }));
                    setListOfContests(contestNames);
                }
                // else if (contestPlatform === ContestPlatforms.LeetCode) {

                //     const contestNames = contestsFetched.map((contestBody: any) => ({
                //         contestCode: getLeetcodeContestCode(contestBody.contest.title),
                //         contestName: contestBody.contest.title
                //     }));
                //     setListOfContests(contestNames);
                // }

            }
        } catch (error) {
            console.log(error);
            setListOfContests([]);
        }
    };

    const fetchContestProblemsData = async () => {
        try {

            const response = await axios.get(`/api/contest-data/${contestPlatform.toLowerCase()}/contest`,
                { params: { contestID: selectedContest } });

            if (response.data.success) {

                if (contestPlatform === ContestPlatforms.CodeChef) {
                    const problemsFetched = response.data.contestData;

                    const problemsData: ProblemData[] = Object.entries(problemsFetched).map(([_, problem]: [string, any]) => ({
                        problemName: problem.name,
                        problemUrl: problem.problem_url
                    }));

                    setListOfProblems(problemsData);
                }

                else if (contestPlatform === ContestPlatforms.Codeforces) {
                    const problemsFetched = response.data.contestData.problems;

                    const problemsData: ProblemData[] = Object.entries(problemsFetched).map(([_, problem]: [string, any]) => ({
                        problemName: problem.name,
                        problemUrl: problem.index,
                    }));

                    setListOfProblems(problemsData);
                }
                // else if (contestPlatform === ContestPlatforms.LeetCode) {
                //     const problemsFetched = response.data.contestData.questions;

                //     const problemsData: ProblemData[] = problemsFetched.map(
                //         ([_, problem]: [string, { title: string; title_slug: string }]) => ({
                //             problemName: problem.title,
                //             problemUrl: problem.title_slug,
                //         })
                //     );

                //     setListOfProblems(problemsData);
                // }
            }
        } catch (error) {
            console.log(error);

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
        if (key == "problemName") {

            if (contestPlatform === ContestPlatforms.Codeforces) {
                const problemUrl = "https://" + contestProblemLinks[contestPlatform as ContestPlatforms] + `/contest/${selectedContest}/problem/` + listOfProblems.find((problem) => problem.problemName === value)?.problemUrl;
                setProblemInputs((prev) =>
                    prev.map((item, i) => (i === index ? { ...item, link: problemUrl, problemName: value } : item))
                );
            }
            else {
                const problemUrl = "https://" + contestProblemLinks[contestPlatform as ContestPlatforms] + listOfProblems.find((problem) => problem.problemName === value)?.problemUrl;

                setProblemInputs((prev) =>
                    prev.map((item, i) => (i === index ? { ...item, link: problemUrl, problemName: value } : item))
                );
            }

        } else {
            setProblemInputs((prev) =>
                prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
            );
        }

    };


    const handleInputChange = (e: any) => {
        const newTag = e.target.value;
        setCurrentTag(newTag);
    };

    const handleInputKeyDown = (e: any) => {
        if (e.key === 'Enter' && currentTag.trim() !== '') {
            setTags([...tags, currentTag.trim()]);
            setCurrentTag('');
        }
    };

    const handleTagRemove = (index: number) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
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
                introduction,
                outro,
                tags
            };

            const validatedEditorial = editorialSchema.parse(payload);

            const response = await axios.post("/api/editorials", validatedEditorial);

            if (response.data.success) {
                toast({
                    title: "Editorial Submitted",
                    description: "Your editorial has been successfully submitted for review.",
                })

                const editorialId = response.data.editorialId;

                const redirectEditorialUrl = `/editorial/${generateSlug(payload.title, editorialId)}`;

                router.push(redirectEditorialUrl);
            } else {
                throw new Error(response.data.message || "Submission failed")
            }
        } catch (error) {
            console.log(error);

            toast({
                title: "Editorial Schema Validation Failed",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const titleRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.focus();
        }
        fetchLatestContestsData();
    }, [contestPlatform]);

    useEffect(() => {
        if (selectedContest) fetchContestProblemsData();
    }, [selectedContest]);

    if (!user) {
        return (
            <div className="flex flex-col gap-6 justify-center items-center text-center min-h-screen">
                <h1 className="text-3xl font-semibold text-center">You&#39;re not authenticated!</h1>
                <SignInButton />
            </div>
        );
    }

    return (
        <div className="text-fell">
            <Navbar />
            <Card className="mx-auto bg-inherit border-none text-white">
                <CardContent>
                    <div className="space-y-6 relative">

                        {
                            !showSchema ?
                                <button
                                    onClick={() => setShowSchema(!showSchema)}
                                    className="absolute top-0 right-2 p-2 rounded-full
                                     bg-gray-800 text-white shadow-md hover:bg-gray-700 transition"
                                >
                                    <Info size={24} />
                                </button>
                                :
                                <EditorialValidation handleUpdateShowSchema={setShowSchema} />
                        }

                        {/* editorial title */}
                        <div className="space-y-2 flex gap-x-2 justify-center items-center text-3xl">
                            <Label htmlFor="title" className="text-2xl text-gray-400">Title</Label>
                            <span className="border-r-2 border-white w-1 h-10"></span>
                            <textarea
                                id="title"
                                ref={titleRef}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Editorial title..."
                                rows={1}
                                className="w-full rounded flex text-3xl text-white bg-transparent px-3 py-1 shadow-sm transition-colors resize-none overflow-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = "auto";
                                    target.style.height = `${target.scrollHeight}px`;
                                }}
                            />
                            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                        </div>

                        {/* platform name */}
                        <div>
                            <Label className="text-xl">Contest Platform</Label>
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
                            <Label className="text-xl">Contest</Label>
                            <Select value={selectedContest} onValueChange={setSelectedContest}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a contest" />
                                </SelectTrigger>
                                <SelectContent>
                                    {listOfContests.map((contest) => (
                                        <SelectItem key={contest.contestCode} value={contest.contestCode.toString()}>
                                            {contest.contestName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.selectedContest && (
                                <p className="text-red-500 text-sm">{errors.selectedContest}</p>
                            )}
                        </div>

                        {/* Overall Difficulty */}
                        <div>
                            <Select value={overallDifficulty} onValueChange={setOverallDifficulty}>
                                <Label className="text-xl mt-6">Overall Difficulty of the contest</Label>

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
                        </div>

                        {/* programming language used */}
                        <div>
                            <Select value={language} onValueChange={setLanguage}>

                                <Label className="text-xl mt">Language used in the contest</Label>

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
                        </div>

                        {/* introduction */}
                        <div className="space-y-2 gap-2 justify-center items-center text-3xl">
                            <Label htmlFor="title" className="text-2xl text-gray-400">Contest Experience</Label>

                            <textarea
                                id="introduction"
                                value={introduction}
                                onChange={(e) => setIntroduction(e.target.value)}
                                placeholder="Write the contest experience here..."
                                rows={1}
                                maxLength={EDITORIAL_LIMITS.MAX_INTRO}
                                className="w-full rounded flex text-xl text-white bg-transparent px-3 py-1 shadow-sm transition-colors resize-none overflow-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = "auto";
                                    target.style.height = `${target.scrollHeight}px`;
                                }}
                            />

                            <div className="flex justify-left gap-x-6 items-center text-sm text-gray-400">
                                <span>Characters: {introduction.length} / {EDITORIAL_LIMITS.MAX_INTRO}</span>
                                {introduction.length >= EDITORIAL_LIMITS.MAX_INTRO && (
                                    <Badge className="text-sm bg-slate-200 text-red-600 shadow-md shadow-slate-700">Maximum character limit reached!</Badge>
                                )}
                            </div>

                        </div>

                        {/* problems input form */}
                        {problemInputs.map((problemInput, index) => (
                            <div key={index} className="mb-4 flex flex-col gap-y-3">
                                {/* Problem Name Dropdown */}
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

                                {/* Problem Link Input (Disabled) */}
                                <Label htmlFor={`link-${index}`} className="mt-4">Problem link</Label>
                                <TextDisplay
                                    id={`link-${index}`}
                                    value={
                                        problemInput.link || ""
                                        // "https://" + contestProblemLinks[contestPlatform as ContestPlatforms] + listOfProblems.find((problem) => problem.problemName === problemInput.problemName)?.problemUrl || ""
                                    }
                                    className="w-fit min-w-96 h-10 border-gray-300 rounded-full"
                                />

                                <Label htmlFor={`editorial-${index}-approach`}>Approach</Label>

                                <textarea
                                    id="introduction"
                                    value={problemInput.approach}
                                    onChange={(e) => handleProblemChange(index, "approach", e.target.value)}
                                    placeholder="Write the approach for this problem here..."
                                    rows={1}
                                    className="w-full rounded flex text-xl text-white bg-transparent px-3 py-1 shadow-sm transition-colors resize-none overflow-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                                    onInput={(e) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        target.style.height = "auto";
                                        target.style.height = `${target.scrollHeight}px`;
                                    }}
                                />


                                <Label htmlFor={`editorial-${index}-code`}>Code {"(Optional)"}</Label>

                                <MonacoCodeEditorComponent
                                    value={problemInput.code || ""}
                                    language={language}
                                    placeholder="// Write/Paste your solution here"
                                    onChange={(value) => handleProblemChange(index, "code", value)}
                                />

                                {/* Remove Problem Button */}
                                <button
                                    onClick={() => handleRemoveProblem(index)}
                                    className="mt-2 bg-red-500 hover:bg-red-700 w-fit rounded-full
                                     text-white font-bold py-2 px-6"
                                >
                                    Remove Problem
                                </button>
                            </div>
                        ))}

                        {/* to add new problems */}
                        <Button onClick={handleAddProblem}>Add {problemInputs.length === 0 ? "a" : "another"} Problem</Button>

                        {/* outro */}
                        <div className="space-y-2 gap-2 justify-center items-center text-3xl">
                            <Label htmlFor="title" className="text-2xl text-gray-400">Outro</Label>

                            <textarea
                                id="introduction"
                                value={outro}
                                placeholder="Write outro here..."
                                onChange={(e) => setOutro(e.target.value)}
                                rows={1}
                                maxLength={EDITORIAL_LIMITS.MAX_OUTRO}
                                className="w-full rounded flex text-xl text-white bg-transparent px-3 py-1 shadow-sm transition-colors resize-none overflow-hidden file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = "auto";
                                    target.style.height = `${target.scrollHeight}px`;
                                }}
                            />

                            <div className="flex justify-left gap-x-6 items-center text-sm text-gray-400">
                                <span>Characters: {outro.length} / {EDITORIAL_LIMITS.MAX_OUTRO}</span>
                                {outro.length >= EDITORIAL_LIMITS.MAX_OUTRO && (
                                    <Badge className="text-sm bg-slate-200 text-red-600 shadow-md shadow-slate-700">Maximum character limit reached!</Badge>
                                )}
                            </div>

                        </div>

                        {/* tags input */}
                        <div className="mt-4">
                            <h2 className='text-white flex justify-start text-xl mb-4 font-semibold ml-3'>Tags</h2>

                            <div className="flex flex-wrap gap-2 mb-2">
                                {tags.map((tag, index) => (
                                    <Button className='rounded-full bg-slate-500 hover:bg-slate-600 py-1 px-4 flex justify-around gap-x-4
                                        duration-100 ease-in transition-all shadow-sm shadow-slate-600' key={index}>
                                        {tag}
                                        <button
                                            onClick={() => handleTagRemove(index)}
                                            className={`rounded-full text-lg py-1`}
                                        >
                                            <GiCancel />
                                        </button>
                                    </Button>

                                ))}
                            </div>

                            <input
                                type="text"
                                value={currentTag}
                                onChange={handleInputChange}
                                onKeyDown={handleInputKeyDown}
                                placeholder="Type and press Enter to add tags"
                                className=' bg-inherit mb-4 px-2 py-2 w-full rounded-lg inputbox text-white placeholder:text-gray-200 outline-none'
                            />
                        </div>

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

export default WriteEditorial;
