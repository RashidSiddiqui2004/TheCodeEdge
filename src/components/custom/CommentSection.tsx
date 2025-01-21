import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Comment from "./Comment"

interface CommentData {
    id: number
    author: string
    content: string
    avatarUrl: string
    createdAt: Date
    likes: number 
}

const CommentSection: React.FC = () => {
    const [comments, setComments] = useState<CommentData[]>([
        {
            id: 1,
            author: "Alice Johnson",
            content: "Great editorial! The explanation of the time complexity was particularly helpful.",
            avatarUrl: "https://api.dicebear.com/6.x/avataaars/svg?seed=Alice",
            createdAt: new Date(2023, 5, 15),
            likes: 5, 
        },
        {
            id: 2,
            author: "Bob Smith",
            content:
                "I found the optimized solution interesting. Could you elaborate more on how memoization works in this context?",
            avatarUrl: "https://api.dicebear.com/6.x/avataaars/svg?seed=Bob",
            createdAt: new Date(2023, 5, 16),
            likes: 3, 
        },
    ])

    const [newComment, setNewComment] = useState("")

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (newComment.trim()) {
            const comment: CommentData = {
                id: comments.length + 1,
                author: "Current User",
                content: newComment,
                avatarUrl: "https://api.dicebear.com/6.x/avataaars/svg?seed=CurrentUser",
                createdAt: new Date(),
                likes: 0, 
            }
            setComments([comment, ...comments])
            setNewComment("")
        }
    }

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <form onSubmit={handleCommentSubmit} className="mb-6">
                <div className="flex items-start space-x-4">
                    <Avatar>
                        <AvatarImage src="https://api.dicebear.com/6.x/avataaars/svg?seed=CurrentUser" alt="Current User" />
                        <AvatarFallback>CU</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <Textarea
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full"
                        />
                        <Button type="submit" className="mt-2">
                            Post Comment
                        </Button>
                    </div>
                </div>
            </form>
            <div className="space-y-4">
                {comments.map((comment) => (
                    <Comment key={comment.id} {...comment} />
                ))}
            </div>
        </div>
    )
}

export default CommentSection

