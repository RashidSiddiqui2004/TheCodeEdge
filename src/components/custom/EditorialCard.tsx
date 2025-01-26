import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import { PiHandsClapping } from "react-icons/pi";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Author } from "./EditorialHeader";
import { Editorial } from "@/model/Editorial";

interface EditorialCardProps {
    editorial: Editorial;
}

const EditorialCard: React.FC<EditorialCardProps> = ({ editorial }) => {
    const {
        title,
        author,
        contestPlatform,
        overallDifficulty,
        likes,
        comments,
        contestName,
        languageUsed,
        introduction,
        problems,
    } = editorial;

    const { toast } = useToast();
    const [authorData, setAuthorData] = useState<Author | null>(null);

    useEffect(() => {
        const fetchAuthorName = async () => {
            if (!author) return;

            try {
                const response = await axios.get("/api/user", { params: { userId: author } });
                if (response.data.success) {
                    setAuthorData(response.data.author);
                } else {
                    toast({
                        title: "Error",
                        description: response.data.message || "Failed to fetch the author name.",
                    });
                }
            } catch (error) {
                console.error("Error fetching author name:", error);
                toast({
                    title: "Error fetching author name",
                    description: "An unexpected error occurred.",
                });
            }
        };

        fetchAuthorName();
    }, [author, toast]);

    const renderIntroduction = () => {
        if (introduction) {
            return `${introduction.slice(0, 140)}...`;
        }

        if (problems && problems[0]?.approach) {
            return `${problems[0].approach.slice(0, 140)}...`;
        }

        return "No introduction available.";
    };

    const getDifficultyVariant = (difficulty: string) => {
        switch (difficulty) {
            case "Easy":
                return "default";
            case "Medium":
                return "secondary";
            case "Hard":
                return "destructive";
            default:
                return "default";
        }
    };

    return (
        <Card
            className="bg-gray-900 text-gray-100 shadow-lg flex flex-col h-full flex-grow hover:shadow-gray-600 transition-shadow duration-300 border-none"
        >
            <CardHeader>
                <CardTitle
                    className="text-lg font-bold text-gray-100 hover:text-white transition-colors duration-300"
                >
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="flex justify-between items-center mb-2">
                    <div className="space-x-2">
                        <Badge className="bg-gray-700 text-gray-300">{contestPlatform}</Badge>
                        {contestName && (
                            <Badge className="bg-gray-700 text-gray-300">{contestName}</Badge>
                        )}
                        <Badge variant={getDifficultyVariant(overallDifficulty)}>
                            {overallDifficulty}
                        </Badge>
                        <Badge className="bg-gray-700 text-gray-300">{languageUsed}</Badge>
                    </div>
                    <div className="text-sm text-gray-400">by {authorData?.authorName || "Unknown"}</div>
                </div>

                <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center text-gray-400 hover:text-gray-200 transition-colors duration-300">
                        <PiHandsClapping className="w-4 h-4 mr-1" />
                        <span>{likes}</span>
                    </div>
                    <div className="flex items-center text-gray-400 hover:text-gray-200 transition-colors duration-300">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        <span>{comments.length}</span>
                    </div>
                </div>

                <div className="mt-4">{renderIntroduction()}</div>
            </CardContent>
        </Card>
    );
};

export default EditorialCard;
