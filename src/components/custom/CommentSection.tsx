import React, { useEffect } from 'react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Comment } from '@/model/Comment'
import CommentBody from './CommentBody'
import { Schema } from 'mongoose'
import axios from 'axios'
import { useToast } from '@/hooks/use-toast'
import { SignInButton, useUser } from '@clerk/nextjs'
import { IoIosClose } from "react-icons/io";
import type { UserResource } from "@clerk/types";

interface EditorialSideHeroProps {
    isCommentSectionOpen: boolean;
    updateCommentState: () => void;
    editorialId?: string;
    commentsIds: Schema.Types.ObjectId[];
    user: UserResource | null | undefined;
    handleComment: (commentContent: string) => Promise<boolean>;
}

const CommentSection: React.FC<EditorialSideHeroProps> = ({ commentsIds, user, handleComment, isCommentSectionOpen, updateCommentState }) => {
 
    const { toast } = useToast();
    const [comments, setComments] = useState<Comment[]>();
    const [newComment, setNewComment] = useState("");
    const [loadingComments, setloadingComments] = useState(false);
    const [submittingComment, setsubmittingComment] = useState<boolean>(false);

    // const fetchCommentsPopulated = useCallback(
    //     async (editorialId: string) => {
    //         try {
    //             const response = await axios.get("/api/editorials/id/comments", {
    //                 params: { editorialId },
    //             });

    //             if (response.data.success) {
    //                 const fetchedComments = response.data.comments;
    //                 setComments(fetchedComments);
    //             } else {
    //                 toast({
    //                     title: "Failed to fetch comments",
    //                     description: response.data.message || "Something went wrong.",
    //                 });
    //             }

    //         } catch (error) {
    //             console.error("Error fetching comments:", error);
    //         }
    //     },
    //     [editorialId]
    // );

    const fetchComments = async (commentsIds: Schema.Types.ObjectId[]) => {
        setloadingComments(true);
        try {
            const fetchedComments = await Promise.all(
                commentsIds.map(async (commentId) => {
                    const response = await axios.get(`/api/comment?commentId=${commentId}`);
                    if (response.data.success) {
                        return response.data.comment;
                    } else {
                        console.error("Failed 😔 to fetch comments:", response.data.message);
                        return null;
                    }
                })
            );

            setComments(fetchedComments.filter((comment: Comment) => comment !== null));
        } catch (error) {
            console.error("Error 😔 fetching comments:", error);
        } finally {
            setloadingComments(false);
        }
    };

    const handleNewComment = async () => {
        if (!newComment.trim()) return;

        setsubmittingComment(true);

        try {
            const isCommented = await handleComment(newComment);

            if (isCommented) {
                setNewComment("");
                toast({
                    title: "Comment added ❤️"
                });
                fetchComments(commentsIds);
            }
            else {
                toast({
                    title: "Failed to comment, pls try again.."
                });
            }
        } catch (error) { 
            console.log(error);

            toast({
                title: "Failed to comment, pls try again.."
            });
        } finally {
            setsubmittingComment(false);
        }
    };

    useEffect(() => {
        fetchComments(commentsIds);
    }, [commentsIds]);

    return (
        <div
            className={`hidden md:flex absolute right-0 w-[30vw] h-screen flex-1 overflow-y-auto scrollbar-hide bg-white text-gray-800 flex-col items-center 
                p-6 shadow-md transform transition-transform duration-1000 ease-in-out ${isCommentSectionOpen ? "translate-x-0" : "translate-x-full"}
                }`}
        >

            <div className='flex flex-row justify-between w-full'>
                <h2 className="text-lg font-semibold mb-4">
                    Comments ({comments ? comments.length : ''})
                </h2>
                <IoIosClose className='text-3xl mr-5 cursor-pointer' onClick={updateCommentState} />
            </div>


            {
                user?.id ?

                    (
                        <div className="w-full flex items-start gap-4 mb-6">

                            <Avatar className="shrink-0">
                                <AvatarImage
                                    src={user?.imageUrl}
                                    alt={user?.username || "user"}
                                    className="rounded-full"
                                />
                                <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
                            </Avatar>

                            <div className='flex-1'>
                                <Textarea
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="w-full resize-none text-sm border-gray-300 rounded-lg focus:ring focus:ring-indigo-300 focus:outline-none"
                                    rows={2}
                                />

                                <Button
                                    onClick={handleNewComment}
                                    className="mt-2 w-fit text-sm font-medium bg-slate-900 text-white hover:bg-indigo-700 rounded-lg"
                                    disabled={submittingComment}
                                >
                                    {submittingComment ? "Posting..." : "Post Comment"}
                                </Button>
                            </div>

                        </div>
                    )
                    :
                    (
                        <div className="w-full flex flex-col items-center justify-center gap-3  mb-2
                            border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow-md
                          bg-gray-100 dark:bg-gray-800">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                Want to join the discussion? 🔥
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Please log in to leave a comment and share your thoughts.
                            </p>
                            <div className="px-4 py-2 text-white bg-slate-600 font-medium rounded-md transition">
                                <SignInButton />
                            </div>
                        </div>

                    )
            }

            <div className="w-full divide-y divide-gray-200">
                {comments && comments?.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index}>
                            <CommentBody initialComment={comment} />
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-500 text-center mt-4">
                        {loadingComments ? "Fetching comments..." : "No comments yet. Be the first to comment!"}
                    </p>
                )}
            </div>
        </div>

    )
}

export default CommentSection