
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDistanceToNow } from 'date-fns'
import { Author } from './EditorialHeader'
import axios from 'axios'
import { PiHandsClapping } from "react-icons/pi";
import { useToast } from '@/hooks/use-toast'
import { Comment } from '@/model/Comment'

interface CommentProps {
    initialComment: Comment
}

const CommentBody: React.FC<CommentProps> = ({ initialComment }) => {

    const { toast } = useToast();
    const [comment, setComment] = useState<Comment>(initialComment);
    const [author, setAuthor] = useState<Author>();

    const likeComment = async () => {
        try {
            const response = await axios.put("/api/comment", {
                commentId: comment._id,
            });

            if (response.data.success) {
                setComment(prevComment => ({
                    ...prevComment.toObject(),
                    likes: prevComment.likes + 1,
                }));
            } else {
                toast({
                    title: "Failed to like the comment"
                });
            }

        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }

    useEffect(() => {
        const fetchAuthorName = async () => {
            try {
                const response = await axios.get("/api/user", {
                    params: { userId: comment.author },
                });

                if (response.data.success) {
                    setAuthor(response.data.author);
                }
            } catch (error) {
                console.error("Error fetching author :", error);
            }
        };
        fetchAuthorName();
    }, []);

    return (
        <Card className="mb-4 w-full text-fell">
            <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                    <Avatar>
                        <AvatarImage src={author?.authorImage} alt={author?.authorName} />
                        <AvatarFallback>{author?.authorName.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex flex-col justify-start items-start">
                            <h4 className="font-normal">{author?.authorName}</h4>
                            <span className="text-xs">
                                {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                            </span>
                        </div>
                    </div>
                </div>
                <p className="mt-2 italic">{comment.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between p-0 mx-3 mb-1">
                <Button variant="ghost" size="sm" className='cursor-pointer' onClick={likeComment}>
                    <PiHandsClapping className="h-4 w-4" />
                    {comment.likes} Likes
                </Button>
            </CardFooter>
        </Card>
    )
}

export default CommentBody
