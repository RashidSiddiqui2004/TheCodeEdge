import type React from "react";
import { cn } from "@/lib/utils";

interface TextRendererProps {
    content: string;
}

const TextRenderer: React.FC<TextRendererProps> = ({ content }) => {
    return (
        <div className="w-full">
            <div className={cn("rounded-lg overflow-hidden")}>
                {/* Text Area */}
                <div className="p-4 text-wrap">
                    <pre className="text-sm leading-6 break-words whitespace-pre-wrap overflow-x-auto">
                        <code>
                            {content.split("\n").map((line, index) => (
                                <div key={index} className="table-row">
                                    <span className="table-cell">{line}</span>
                                </div>
                            ))}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default TextRenderer;
