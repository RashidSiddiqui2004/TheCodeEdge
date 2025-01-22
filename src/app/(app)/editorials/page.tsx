"use client"

import React, { useState } from "react"
import Filter from "@/components/custom/Filter"
import SearchBar from "@/components/custom/SearchBar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import EditorialCard from "@/components/custom/EditorialCard"
import Link from "next/link"

const platforms = ["LeetCode", "HackerRank", "CodeForces", "AtCoder"]
const difficulties = ["Easy", "Medium", "Hard"]

export interface EditorialInterface {
    id: number
    title: string
    author: string
    platform: string
    difficulty: string
    contest?: string
    likes: number
    comments: number
}

const Page = () => {
    const [searchKeyword, setSearchKeyword] = useState("")
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
    const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])

    const [editorials, setEditorials] = useState<EditorialInterface[]>([
        {
            id: 1,
            title: "Two Sum Solution",
            author: "Alice",
            platform: "LeetCode",
            difficulty: "Easy",
            likes: 120,
            comments: 15,
        },
        {
            id: 2,
            title: "Merge K Sorted Lists",
            author: "Bob",
            platform: "HackerRank",
            difficulty: "Hard",
            likes: 89,
            comments: 7,
        },
        {
            id: 3,
            title: "Binary Tree Level Order Traversal",
            author: "Charlie",
            platform: "CodeForces",
            difficulty: "Medium",
            likes: 56,
            comments: 4,
        },
        {
            id: 4,
            title: "Longest Palindromic Substring",
            author: "David",
            platform: "AtCoder",
            difficulty: "Medium",
            likes: 102,
            comments: 11,
        },
    ])

    const filteredEditorials = editorials.filter(
        (editorial) =>
            (selectedPlatforms.length === 0 || selectedPlatforms.includes(editorial.platform)) &&
            (selectedDifficulties.length === 0 || selectedDifficulties.includes(editorial.difficulty)) &&
            (searchKeyword === "" || editorial.title.toLowerCase().includes(searchKeyword.toLowerCase())),
    );

    return (
        <div className="min-h-screen font-[family-name:var(--font-geist-sans)] p-2">
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

            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-3 space-y-6">
                        <SearchBar keyword={searchKeyword} updateKeyword={setSearchKeyword} />
                        <Filter
                            title="Platforms"
                            options={platforms}
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

                    <div className="col-span-9">
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
                            {filteredEditorials.map((editorial) => (
                                <EditorialCard key={editorial.id} {...editorial} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page

