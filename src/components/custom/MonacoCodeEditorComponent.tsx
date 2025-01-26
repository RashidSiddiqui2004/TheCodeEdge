import React, { useState } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    language?: string;
    placeholder?: string;
}

export const MonacoCodeEditorComponent: React.FC<CodeEditorProps> = ({
    value,
    onChange,
    language = "markdown", // Default to markdown for styling purposes
    placeholder,
}) => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    const handleStyleInsert = (tag: string) => {
        const openingTag = `<${tag}>`;
        const closingTag = `</${tag}>`;
        onChange(`${openingTag}${value}${closingTag}`);
    };

    return (
        <div className={`border rounded-md overflow-hidden ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
            {/* Toolbar for text styling */}
            <div className="flex items-center space-x-2 p-2 bg-gray-800 text-white">
                <button
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                    onClick={() => handleStyleInsert("b")}
                >
                    Bold
                </button>
                <button
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                    onClick={() => handleStyleInsert("i")}
                >
                    Italic
                </button>
                <button
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                    onClick={() => handleStyleInsert("u")}
                >
                    Underline
                </button>
                <button
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                    onClick={() => handleStyleInsert("code")}
                >
                    Code
                </button>
                <button
                    className="ml-auto px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                >
                    Toggle Theme
                </button>
            </div>

            {/* Monaco Editor */}
            <Editor
                height="400px"
                theme={isDarkMode ? "vs-dark" : "light"}
                language={language}
                value={value}
                defaultLanguage={placeholder}
                onChange={(value) => onChange(value || "")}
                options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    lineNumbers: "on",
                    wordWrap: "on",
                }}
            />
        </div>
    );
};
