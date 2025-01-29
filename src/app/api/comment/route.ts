import { REWARDS } from "@/constants";
import dbConnect from "@/lib/dbConnect";
import CommentModel from "@/model/Comment";
import EditorialModel from "@/model/Editorial";
import UserModel from "@/model/User";

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const commentId = searchParams.get("commentId");

        if (!commentId) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing commentId." }),
                { status: 400 }
            );
        }

        const comment = await CommentModel.findById(commentId);

        if (!comment) {
            return new Response(
                JSON.stringify({ success: false, message: "Comment not found." }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Comment fetched successfully.",
                comment,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching comment:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Error fetching comment." }),
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { editorialId, commenterId, content } = await request.json();

        if (!editorialId || !commenterId || !content) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing required fields." }),
                { status: 400 }
            );
        }

        const editorial = await EditorialModel.findById(editorialId);

        if (!editorial) {
            return new Response(
                JSON.stringify({ success: false, message: "Editorial not found." }),
                { status: 404 }
            );
        }

        const user = await UserModel.findOne({ clerkUserId: commenterId });

        if (!user) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "You're not authenticated!",
                }),
                { status: 404 }
            );
        }

        const newComment = await CommentModel.create({
            content,
            author: user._id,
            editorial: editorialId,
            likes: 0,
            replies: [],
        });

        if (newComment) {
            editorial.comments.push(newComment._id);

            // save the editorial with new comment
            await editorial.save();

            const authorId = editorial.author;

            const author = await UserModel.findById(authorId);

            if (!author) {
                return new Response(
                    JSON.stringify({ success: false, message: "Author not found." }),
                    { status: 404 }
                );
            }

            // Increment Algopoints of the author
            author.algoPoints += REWARDS.COMMMENT_ON_EDITORIAL_POINTS;

            // save the author with updated algoPoints
            await author.save();

            return new Response(
                JSON.stringify({
                    success: true,
                    message: "Comment added successfully.",
                    comment: newComment,
                }),
                { status: 201 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Comment post failed.",
                comment: newComment,
            }),
            { status: 500 }
        );

    } catch (error) {
        console.error("Error adding comment:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Error adding comment." }),
            { status: 500 }
        );
    }
}

// to like a comment
export async function PUT(request: Request) {
    await dbConnect();

    try {
        const { commentId } = await request.json();

        if (!commentId) {
            return new Response(
                JSON.stringify({ success: false, message: "Missing comment id." }),
                { status: 400 }
            );
        }

        const comment = await CommentModel.findById(commentId);

        if (!comment) {
            return new Response(
                JSON.stringify({ success: false, message: "Comment not found." }),
                { status: 404 }
            );
        }

        comment.likes += 1;

        await comment.save();

        return new Response(
            JSON.stringify({
                success: true,
                message: "Comment added successfully."
            }),
            { status: 201 }
        );

    } catch (error) {
        console.error("Error adding comment:", error);
        return new Response(
            JSON.stringify({ success: false, message: "Error adding comment." }),
            { status: 500 }
        );
    }
}