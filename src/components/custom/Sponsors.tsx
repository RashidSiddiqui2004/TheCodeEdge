"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Label } from "../ui/label";

export interface Sponsor {
    sponsorName: string;
    sponsorUrl: string;
}

const Sponsors = () => {
    const [sponsors, setSponsors] = useState<Sponsor[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSponsors = async () => {
            try {
                const response = await axios.get("/api/sponsors");

                if (response.data.success) {
                    const fetchedSponsors = response.data.sponsors;

                    setSponsors(fetchedSponsors);
                } else {
                    setSponsors(null);
                }
            } catch (err) {
                setError("Failed to load sponsors. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchSponsors();
    }, []);

    return (
        <Card className="rounded-lg mx-4 sm:mx-auto mt-3 sm:mt-0 sm:max-w-lg h-fit shadow-md border dark:border-gray-700">
            <CardContent className="p-5">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Our Sponsors</h2>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-600 dark:text-gray-300">
                                    <Info className="h-5 w-5" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-white text-black shadow-md p-2 rounded-md">
                                These are the companies supporting TheCodeEdge.
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500 dark:text-gray-400">Loading sponsors...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : sponsors && sponsors.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 place-items-center">
                        {sponsors.map((sponsor, index) => (
                            <div className="tems-center text-center flex flex-col gap-y-2" key={index}>
                                <Link href={sponsor.sponsorUrl} target="_blank">
                                    <img
                                        src={sponsor.sponsorUrl}
                                        alt={sponsor.sponsorName}
                                        width={100}
                                        height={50}
                                        className="rounded-md shadow-md hover:scale-105 transition-transform"
                                    />
                                </Link>
                                <Label className="text-black text-center">{sponsor.sponsorName}</Label>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">No sponsors available at the moment.</p>
                )}

                <div className="mt-8 text-center">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                        Want your company to be featured?
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Get exposure to thousands of competitive programmers and tech enthusiasts.
                    </p>
                    <Link href="/sponsorship">
                        <Button variant="default" disabled={true}
                            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700
                         dark:bg-blue-500 dark:hover:bg-blue-600 hover:none">
                            Become a Sponsor
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default Sponsors;
