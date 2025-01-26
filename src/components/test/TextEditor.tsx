"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
 
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

interface TextEditorProps {
    placeholder: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ placeholder }) => {
    const [content, setContent] = useState<string>("");

    const config = useMemo(
        () => ({
            readonly: false, // Set to true if you want a read-only editor
            placeholder: placeholder || "Start typing...",
        }),
        [placeholder]
    );

    return (
        <div>
            <JoditEditor
                value={content}
                config={config}
                tabIndex={1} // Tab index for accessibility
                onBlur={(newContent) => setContent(newContent || "")} // Update content on blur
                onChange={(newContent) => setContent(newContent || "")} // Update content on change
            />
        </div>
    );
};

export default TextEditor;
