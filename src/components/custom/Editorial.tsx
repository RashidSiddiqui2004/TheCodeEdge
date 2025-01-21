"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import CodeEditor from "./CodeEditor"
import { cn } from "@/lib/utils"
import EditorialHeader from './EditorialHeader'
import Navigation from './Navigation'
import CommentSection from './CommentSection'
import EditorialTags from "./EditorialTags"
import mockEditorial from "@/dummy/editorial"

const Editorial = () => {
    const [isDarkMode, setIsDarkMode] = useState(true)

    const code = `function fibonacci(n) {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    console.log(fibonacci(10)); // Output: 55`

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
        document.documentElement.classList.toggle("dark")
    }

    const editorialTags = [
        "Codechef", "Dynamic Programming", "Hashmap", "Daily Learning"
    ]

    return (
        <div
            className={cn("transition-colors duration-300", isDarkMode ? "dark bg-gray-900" : "bg-gray-100")}
        >
            <Card className="mx-auto shadow-lg py-4 px-6">
                <EditorialHeader editorial={mockEditorial} />

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

                    </div>

                    <EditorialTags tags={mockEditorial.tags} />

                    <CommentSection />

                </CardContent>

                {/*   
                    <Navigation /> 
                */}
            </Card >


        </div >
    )
}

export default Editorial