"use client"

import type React from "react"
import { Fira_Code } from "next/font/google"
import { cn } from "@/lib/utils"
import { extensions, ProgrammingLanguages } from "@/enums/Languages"

const firaCode = Fira_Code({ subsets: ["latin"] })

interface CodeEditorProps {
    code: string;
    isDarkMode: boolean;
    language: ProgrammingLanguages
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, isDarkMode, language }) => {

    return (
        <div className="w-full my-4">
            <div className={cn("rounded-lg shadow-lg overflow-hidden", isDarkMode ? "bg-gray-800" : "bg-gray-100")}>
                {/* Editor Top Bar */}
                <div className={cn("flex items-center justify-between px-4 py-2", isDarkMode ? "bg-gray-700" : "bg-gray-200")}>
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className={cn("text-sm", isDarkMode ? "text-gray-400" : "text-gray-600")}>solution.{extensions[language]}</div>
                </div>

                {/* Code Area */}
                <div className="p-4 overflow-x-auto">
                    <pre className={`${firaCode.className} text-sm leading-6`}>
                        <code className={cn("language-javascript", isDarkMode ? "text-gray-300" : "text-gray-800")}>
                            {code.split("\n").map((line, index) => (
                                <div key={index} className="table-row">
                                    <span className={cn("table-cell pr-4 select-none", isDarkMode ? "text-gray-500" : "text-gray-400")}>
                                        {index + 1}
                                    </span>
                                    <span className="table-cell">{line}</span>
                                </div>
                            ))}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    )
}

export default CodeEditor

