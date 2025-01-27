"use client"

import React, { useEffect, useMemo, useState } from "react"
import Filter from "@/components/custom/Filter"
import SearchBar from "@/components/custom/SearchBar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EditorialCard from "@/components/custom/EditorialCard"
import Link from "next/link"
import { ContestPlatforms } from "@/enums/ContestPlatforms"
import { QuestionDifficulty } from "@/enums/QuestionDifficulty"
import { Editorial } from "@/model/Editorial"
import axios from "axios"
import { useToast } from "@/hooks/use-toast"
import generateSlug from "@/lib/generateSlug"
import { ObjectId } from "mongoose"
import { User } from "@/model/User"

const Page = () => {

    const { toast } = useToast();

    const contestPlatforms: string[] = [ContestPlatforms.CodeChef, ContestPlatforms.Codeforces, ContestPlatforms.LeetCode,
    ContestPlatforms.HackerRank];

    const difficulties: string[] = [QuestionDifficulty.Easy, QuestionDifficulty.Medium, QuestionDifficulty.Hard, QuestionDifficulty.Expert];

    const [searchKeyword, setSearchKeyword] = useState("")
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
    const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])

    const [editorials, setEditorials] = useState<Editorial[]>([]);
    const [editorialAuthorMap, seteditorialAuthorMap] = useState<Record<string, User>>();

    const filteredEditorials = useMemo(() => {

        return editorials.filter(
            (editorial) =>
                (selectedPlatforms.length === 0 || selectedPlatforms.includes(editorial.contestPlatform)) &&
                (selectedDifficulties.length === 0 || selectedDifficulties.includes(editorial.overallDifficulty)) &&
                (searchKeyword === "" || editorial.title.toLowerCase().includes(searchKeyword.toLowerCase().trim())),
        );

    }, [searchKeyword, selectedPlatforms, selectedDifficulties, editorials]);


    const fetchEditorials = async () => {
        try {
            const response = await axios.get("/api/editorials/latest");

            if (response.data.success) {
                const fetchedEditorials = response.data.editorials;
                const fecthededitorialAuthormap = response.data.editorialAuthorMap;

                setEditorials(fetchedEditorials);
                seteditorialAuthorMap(fecthededitorialAuthormap);

                console.log(fetchedEditorials);
            }

        } catch (error) {
            console.log("Error occured while fetching latest editorials: ", error);

            toast({
                title: "Error fetching latest editorials!"
            });
        }
    }

    // executes only on first render
    useEffect(() => { 
        fetchEditorials();
    }, [])

    return (
        <div className="h-screen font-[family-name:var(--font-geist-sans)] px-2 relative mb-6">

            <div className="mx-auto grid grid-cols-12 gap-x-8">

                <div className="col-span-3 space-y-6 flex-col sticky top-0 justify-center px-4 my-0 border-r-2 py-3 h-screen">
                    <SearchBar keyword={searchKeyword} updateKeyword={setSearchKeyword} />
                    <Filter
                        title="Platforms"
                        options={contestPlatforms}
                        selectedOptions={selectedPlatforms}
                        updateSelectedOptions={setSelectedPlatforms}
                    />
                    <Filter
                        title="Difficulty"
                        options={difficulties}
                        selectedOptions={selectedDifficulties}
                        updateSelectedOptions={setSelectedDifficulties}
                    />
                </div>

                <div className="col-span-9 flex-1 overflow-y-auto scrollbar-hide mb-8">

                    <div className="text-white p-8 mb-8">
                        <div className="max-w-6xl mx-auto">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[60px] font-extrabold text-center mb-4">
                                Contest Editorials
                            </h1>
                            <p className="text-xl text-center mb-6">Explore and learn from the best problem-solving techniques</p>
                            <div className="flex justify-center">
                                <Button
                                    className="text-xl bg-white text-black p-4 rounded-full hover:scale-[99%] duration-75 transition-all
              hover:bg-slate-200 hover:text-slate-900"
                                >
                                    <Link href={'/write-editorial'}>Write your Editorial</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h2 className="text-2xl font-bold mb-2">Applied Filters:</h2>
                        <div className="flex flex-wrap gap-2">
                            {selectedPlatforms.map((platform) => (
                                <Badge key={platform} variant="secondary">
                                    {platform}
                                </Badge>
                            ))}
                            {selectedDifficulties.map((difficulty) => (
                                <Badge key={difficulty} variant="secondary">
                                    {difficulty}
                                </Badge>
                            ))}
                            {searchKeyword && <Badge variant="secondary">Search: {searchKeyword}</Badge>}
                        </div>
                    </div>
                    <div className="grid gap-6">
                        {filteredEditorials.map((editorial, index) => (
                            <div key={index}>
                                <Link href={`/editorial/${generateSlug(editorial.title, (editorial._id as ObjectId).toString())}`}>
                                    <EditorialCard editorial={editorial} descriptionLimit={220} editorialAuthorMap={editorialAuthorMap} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page

