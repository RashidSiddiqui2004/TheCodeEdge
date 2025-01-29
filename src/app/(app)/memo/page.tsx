// 'use client';

// import React, { useMemo, useState } from "react";

// const UseMemoExample = () => {
//     const [count, setCount] = useState(0);
//     const [text, setText] = useState("");

//     // Simulate an expensive computation
//     const expensiveCalculation = (num: number) => {
//         console.log("Calculating...");
//         return num * 2;
//     };

//     // Memoize the result of the expensive calculation
//     const memoizedValue = useMemo(() => expensiveCalculation(count), [count]);

//     return (
//         <div className="p-4">
//             <h1 className="text-xl font-bold">useMemo Example</h1>
//             <p className="mt-2">Count: {count}</p>
//             <p>Memoized Value (Count x 2): {memoizedValue}</p>

//             <button
//                 onClick={() => setCount(count + 1)}
//                 className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//             >
//                 Increment Count
//             </button>

//             <div className="mt-4">
//                 <input
//                     type="text"
//                     placeholder="Type something..."
//                     value={text}
//                     onChange={(e) => setText(e.target.value)}
//                     className="border p-2 rounded"
//                 />
//                 <p className="mt-2">Text: {text}</p>
//             </div>
//         </div>
//     );
// };

// export default UseMemoExample;
