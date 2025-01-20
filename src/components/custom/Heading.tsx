import React from 'react';
import { Badge } from '../ui/badge';

const Heading = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-r text-white py-20 px-4">

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-extrabold text-center transition-all">
                Share. Learn. Conquer.
            </h1>

            <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-4 text-center opacity-80
        hover:opacity-100 transition-opacity duration-300">
                Contests Together!
            </h2>

            <blockquote className="mt-6 border-l-2 pl-6 italic text-center max-w-xl mx-auto">
                "In the world of CP, every problem is an opportunity to learn and grow."
            </blockquote>

            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-black mt-4">
                {"// Let's Code & Learn Together!"}
            </code>

            <div id='badges' className='hidden sm:block'>
                <Badge className='absolute top-80 left-10 text-sm px-3 py-1 -rotate-[12deg]'>
                    Master Editorialist
                </Badge>

                <Badge className='absolute top-80 right-10 text-sm px-3 py-1 rotate-[16deg]'>
                    DP Guru
                </Badge>
            </div>

        </div>
    );
};

export default Heading;
