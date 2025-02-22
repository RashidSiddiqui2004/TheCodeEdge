import React, { useEffect, useState } from 'react'
import { Author } from './EditorialHeader'
import { Editorial } from '@/model/Editorial';
import axios from 'axios';
import { ObjectId, Schema } from 'mongoose';
import EditorialCard from './EditorialCard';
import Link from 'next/link';
import generateSlug from '@/lib/generateSlug';
import { Button } from '../ui/button'; 
// import { PersonStanding, Terminal} from "lucide-react"
// import {
//     Alert,
//     AlertDescription,
//     AlertTitle,
// } from "@/components/ui/alert"

interface MoreFromAuthorProps {
    author: Author | undefined;
    authorId: Schema.Types.ObjectId;
    currentEditorialId: string;
}

const MoreFromAuthor: React.FC<MoreFromAuthorProps> = ({ author, authorId, currentEditorialId }) => {

    const [recentEditorials, setRecentEditorials] = useState<Editorial[]>();

    const fetchRecentEditorials = async () => {
        try {
            const response = await axios.get("/api/editorials/recent", {
                params: { userId: authorId },
            });

            if (response.data.success) {
                const allRecentEditorials = response.data.recentEditorials;

                // Filter out the currentEditorialId and select at most 4 recent editorials 
                const filteredEditorials = allRecentEditorials
                    .filter((editorial: Editorial) => editorial._id !== currentEditorialId)
                    .slice(0, 4);

                setRecentEditorials(filteredEditorials);
            } else {
                console.error("Failed to fetch recent editorials:", response.data.message);
            }
        } catch (error) {
            console.error("Error fetching recent editorials:", error);
        }
    };

    useEffect(() => {
        fetchRecentEditorials();
    }, [])

    return (
        <div className='mx-4'> 

            <h3 className="mt-8 mb-6 scroll-m-20 mx-4 text-sm sm:text-xl font-semibold tracking-tight">
                More Editorials by {author?.authorName}
            </h3> 

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 gap-y-4'>
                {recentEditorials?.map((editorial, index) => {
                    return (
                        <div key={index}>
                            <Link href={`/editorial/${generateSlug(editorial.title, (editorial._id as ObjectId).toString())}`}>
                                <EditorialCard editorial={editorial} />
                            </Link>
                        </div>
                    )
                })}
            </div>

            <Button className='p-6 bg-white text-black hover:bg-slate-200 hover:text-slate-800 rounded-full text-sm font-extralight 
                font-fell my-8'>
                <Link href={`/user/${author?.authorName}`}>
                    See all from {author?.authorName}
                </Link>
            </Button>

        </div>
    )
}

export default MoreFromAuthor