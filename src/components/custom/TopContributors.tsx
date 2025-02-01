"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import axios from "axios"
import Link from "next/link"

export interface Contributor {
    username: string
    algopoints: number
    imageUrl: string
}

const TopContributors = () => {
    const [topContributors, setTopContributors] = useState<Contributor[]>([])
    const [visibleContributors, setVisibleContributors] = useState(4)

    useEffect(() => {
        const fetchTopContributors = async () => {
            const response = await axios.get('/api/leaderboard');
            const top20Contributors: Contributor[] = response.data.topContributors;
            setTopContributors(top20Contributors.slice(0, 5));
        }
        fetchTopContributors();
    }, [])

    const handleViewMore = () => {
        setVisibleContributors((prev) => Math.min(prev + 4, topContributors.length))
    }

    const getCardColor = (rank: number): string => {
        if (rank === 1) return "bg-yellow-500" // Gold
        if (rank === 2) return "bg-gray-400" // Silver
        if (rank === 3) return "bg-orange-400" // Bronze
        return "bg-gray-600" // Default for others
    }

    return (
        <Card className="rounded-sm mx-4 sm:mx-auto mt-3 sm:mt-0 sm:max-w-md h-fit" id="leaderboard">
            <CardContent className="p-3">
                <div className="flex justify-center items-center gap-2 mb-6">
                    <h2 className="text-2xl font-bold">Top Contributors</h2>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Info className="h-4 w-4" />
                                    <span className="sr-only">How is Leaderboard calculated?</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-white text-black">
                                <p>Leaderboard is calculated based on AlgoPoints earned by users.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                <ul className="space-y-2">
                    {topContributors.slice(0, visibleContributors).map((contributor, index) => (
                        <li
                            key={contributor.username}
                            className={`flex items-center justify-between p-3 
                            rounded-lg ${getCardColor(index + 1)}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-lg">{index + 1}</span>
                                <img src={contributor.imageUrl} alt="User image" className="h-7 w-7 rounded-full"/>
                                <Link href={`/user/${contributor.username}`} target="_blank" className="font-medium">{contributor.username}</Link>
                            </div>
                            <span className="font-semibold">{contributor.algopoints} AlgoPoints</span>
                        </li>
                    ))}
                </ul>

                {visibleContributors < topContributors.length && (
                    <Button onClick={handleViewMore} className="w-full mt-6">
                        View More
                    </Button>
                )}

                <div className="mt-8 text-sm text-gray-600 dark:text-gray-400">
                    <h3 className="font-semibold mb-2">How is the leaderboard updated?</h3>
                    <p>
                        The leaderboard is dynamically updated based on the AlgoPoints earned by users. AlgoPoints are awarded for
                        various activities:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        {/* <li>Solving coding challenges: 1-5 points per challenge</li> */}
                        <li>Writing quality editorials: 10 points per approved editorial</li>
                        <li>Upvotes on editorials: 2 points per upvote</li>
                        <li>Comments on editorials: 3 points per upvote</li>
                        {/* <li>Helping others in discussions: 2 points per helpful comment</li> */}
                    </ul>
                    {/* <p className="mt-2">
                        * The leaderboard is updated in real-time as users earn points. Rankings are recalculated daily at midnight
                        UTC to ensure fair competition.
                    </p> */}
                </div>
            </CardContent>
        </Card>
    )
}

export default TopContributors

