import type React from "react"
import Editor from "@monaco-editor/react"

interface CodeEditorProps {
    value: string
    onChange: (value: string) => void
    language: string
    placeholder?: string
}

export const MonacoCodeEditorComponent: React.FC<CodeEditorProps> = ({ value, onChange, language, placeholder }) => {
    return (
        <div className="border rounded-md overflow-hidden">
            <Editor
                height="400px"
                language={language}
                value={value}
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
    )
}

