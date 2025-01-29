import { Editorial } from "@/model/Editorial";
import React from "react";
import { Button } from "../ui/button";

interface EditorialNavigatorProps {
    isCommentSectionOpen: boolean;
    editorial: Editorial;
    onNavigate: (questionId: string) => void;
}

const EditorialNavigator: React.FC<EditorialNavigatorProps> = ({ isCommentSectionOpen, editorial, onNavigate }) => {
    return (
        <div
            className={`hidden sm:block h-fit transform transition-transform duration-500 ease-in-out text-fell
                ${!isCommentSectionOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            {
                (editorial.problems.length) ?
                    <div className="p-6 flex flex-col h-full sticky top-0">
                        <h2 className="text-lg mb-4 font-normal">In this editorial</h2>
                        <nav className="flex flex-col gap-2 overflow-y-auto flex-grow border-l-4 border-white pl-3 py-2">
                            {editorial.problems.map((question, index) => (
                                <p
                                    key={index}
                                    className="text-sm bg-inherit hover:bg-inherit p-1 rounded-md text-left transition cursor-pointer
                                hover:text-slate-300"
                                    onClick={() => onNavigate(question.problemName)}
                                >
                                    {question.problemName}
                                </p>
                            ))}
                        </nav>
                        <div className="mt-3">
                            <Button
                                className="bg-slate-500 w-fit text-sm font-medium px-5 py-2 rounded-full
                             hover:bg-slate-700 transition-all ease-in duration-100"
                                onClick={() => onNavigate("home")}
                            >
                                Back to Top
                            </Button>
                        </div>
                    </div>
                    :

                    <div className="p-6 flex flex-col h-full sticky top-0">
                        <h2 className="text-lg mb-4 font-normal">In this editorial</h2>
                        <nav className="flex flex-col gap-2 overflow-y-auto flex-grow  text-wrap italic text-sm
                        border-l-4 border-white pl-3 py-2">
                            <h3>No navigation content available</h3>
                        </nav>
                        <div className="mt-3">
                            <Button
                                className="w-fit text-sm font-medium px-5 py-2 rounded-full
                             hover:bg-slate-200 transition-all ease-in duration-100"
                                onClick={() => onNavigate("home")}
                            >
                                Back to Top
                            </Button>
                        </div>
                    </div>
            }

        </div>
    );
};

export default EditorialNavigator;
