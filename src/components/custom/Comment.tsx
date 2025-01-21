
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp, MessageSquare } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface CommentProps {
    author: string
    content: string
    avatarUrl: string
    createdAt: Date
    likes: number
}

const Comment: React.FC<CommentProps> = ({ author, content, avatarUrl, createdAt, likes }) => {
    return (
        <Card className="mb-4">
            <CardContent className="pt-4">
                <div className="flex items-start space-x-4">
                    <Avatar>
                        <AvatarImage src={avatarUrl} alt={author} />
                        <AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold">{author}</h4>
                            <span className="text-sm">
                                {formatDistanceToNow(createdAt, { addSuffix: true })}
                            </span>
                        </div>
                        <p className="mt-2">{content}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    {likes} Likes
                </Button>
            </CardFooter>
        </Card>
    )
}

export default Comment
