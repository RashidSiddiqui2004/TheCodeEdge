"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ThumbsUp, MessageSquare, Sun, Moon, ChevronDown, ChevronUp } from "lucide-react"
import CodeEditor from "./CodeEditor"
import { cn } from "@/lib/utils"

const SampleEditorial = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [showFullContent, setShowFullContent] = useState(false)

    const code = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // Output: 55`

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.toggle("dark")
    }

    return (
        <div
            className={cn("col-span-8 mx-4 transition-colors duration-300 h-full", isDarkMode ? "dark bg-gray-900" : "bg-gray-100")}
        >
            <Card className="shadow-lg">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <CardTitle className="text-3xl font-bold">Sample Editorial: LeetCode BiWeekly Contest</CardTitle>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Badge variant="secondary">LeetCode</Badge>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-white text-black">
                                            <p>Source Platform</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <div className="flex items-center gap-1">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>1.2k</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <MessageSquare className="w-4 h-4" />
                                    <span>84</span>
                                </div>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Badge variant="secondary">Rashid Siddiqui</Badge>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-white text-black">
                                            <p>Contributor username</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Badge variant="secondary">Master Editorialist</Badge>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-white text-black">
                                            <p>Contributor Badge</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Badge variant="outline" className="text-sm">
                                            Medium
                                        </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-white text-black">
                                        <p>Difficulty Rating of the problem</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            {/* <Button variant="outline" size="icon" onClick={toggleDarkMode}>
                                {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                                <span className="sr-only">Toggle dark mode</span>
                            </Button> */}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className={cn("prose max-w-none", isDarkMode ? "dark:prose-invert" : "")}>
                        <p>
                            In this editorial, we'll explore a recursive solution to generate the Fibonacci sequence. The Fibonacci
                            sequence is a series of numbers where each number is the sum of the two preceding ones...
                        </p>
                        <h3>Problem Statement</h3>
                        <p>Given a number n, calculate the nth Fibonacci number...</p>
                        <h3>Solution</h3>
                        <p>We can solve this problem using a recursive approach. Here's the implementation:</p>
                        <CodeEditor code={code} isDarkMode={isDarkMode} />
                        {/* {showFullContent && (
                            <>
                                <h3>Explanation</h3>
                                <ol>
                                    <li>The base case: if n is 0 or 1, we return n itself.</li>
                                    <li>
                                        For any other n, we recursively calculate fibonacci(n-1) and fibonacci(n-2) and return their sum.
                                    </li>
                                    <li>This recursive approach mimics the mathematical definition of the Fibonacci sequence.</li>
                                </ol>
                                <h3>Time Complexity</h3>
                                <p>
                                    The time complexity of this recursive solution is O(2^n), which is not efficient for large values of
                                    n. For better performance, consider using dynamic programming or iterative approaches...
                                </p>
                                <h3>Space Complexity</h3>
                                <p>
                                    The space complexity is O(n) due to the recursive call stack. Each recursive call adds a layer to the
                                    stack, and the maximum depth of the stack will be n...
                                </p>
                                <h3>Optimization</h3>
                                <p>
                                    To optimize this solution, we can use memoization or dynamic programming. Here's a simple memoized
                                    version:
                                </p>
                                <CodeEditor
                                    code={`function fibonacciMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  return memo[n];
}

console.log(fibonacciMemo(10)); // Output: 55`}
                                    isDarkMode={isDarkMode}
                                />
                                <p>
                                    This memoized version has a time complexity of O(n) and space complexity of O(n), making it much more
                                    efficient for larger values of n...
                                </p>
                                <h3>Conclusion</h3>
                                <p>
                                    While the recursive solution is elegant and easy to understand, it's important to note its limitations
                                    for large inputs. In real-world scenarios, you should implement more efficient solutions...
                                </p>
                            </>
                        )} */}
                        <Button onClick={() => setShowFullContent(!showFullContent)} className="mt-4">
                            {showFullContent ? (
                                <>
                                    Show Less <ChevronUp className="ml-2 h-4 w-4" />
                                </>
                            ) : (
                                <>
                                    Show More <ChevronDown className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SampleEditorial

