import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
    value: string;
    language?: string;
}

export const MonacoReadOnlyEditor: React.FC<CodeEditorProps> = ({
    value,
    language = "markdown",
}) => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    return (
        <div
            ref={editorRef}
            className={`border rounded-md overflow-hidden ${isDarkMode ? "bg-gray-900" : "bg-white"
                }`}
        >
            {/* Theme Toggle Button */}
            <div className="flex items-center space-x-2 p-2 bg-gray-800 text-white">
                <h1 className="text-sm font-medium">Read-Only Editor</h1>
                <button
                    className="ml-auto px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm focus:outline-none focus:ring focus:ring-gray-500"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    aria-label="Toggle Editor Theme"
                >
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                </button>
            </div>

            {/* Monaco Editor */}
            <Editor
                height="30vh"
                theme={isDarkMode ? "vs-dark" : "light"}
                language={language}
                value={value}
                options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    lineNumbers: "on",
                    wordWrap: "on",
                    padding: { top: 10, bottom: 10 },
                    renderLineHighlight: "none",
                }}
            />
        </div>
    );
};
