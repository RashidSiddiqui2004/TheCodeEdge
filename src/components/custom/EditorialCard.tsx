
import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, MessageSquare } from "lucide-react"
import { EditorialInterface } from "@/app/(app)/editorials/page"

const EditorialCard: React.FC<EditorialInterface> = ({ title, author, platform, difficulty, likes, comments, contest }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center">
                    <div className="space-x-2">
                        <Badge>{platform}</Badge>
                        <Badge>{contest}</Badge>
                        <Badge variant={difficulty === "Easy" ? "default" : difficulty === "Medium" ? "secondary" : "destructive"}>
                            {difficulty}
                        </Badge>
                    </div>
                    <div className="text-sm text-gray-500">by {author}</div>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        <span>{likes}</span>
                    </div>
                    <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        <span>{comments}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default EditorialCard

