
import { APP_NAME } from '@/constants';
import React from 'react';
import { PlatformIconMap } from '../my_icons';
import Link from 'next/link';


const Footer = () => {

    const Linkedin = PlatformIconMap["linkedin"];
    const Github = PlatformIconMap["github"];
    const Leetcode = PlatformIconMap["leetcode"];

    return (
        <footer className="bg-gray-950 text-gray-300 mt-10 py-10 px-6 rounded-t-xl">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-lg font-semibold text-white mb-4">About {APP_NAME}</h2>
                    <p className="text-sm leading-relaxed">
                        {APP_NAME} is a platform where competitive programmers share insights, strategies, and solutions to contest problems, fostering a community of learners and conquerors.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        </li>
                        <li>
                            <Link href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</Link>
                        </li>
                        <li>
                            <Link href="/editorials" className="hover:text-white transition-colors">Insightful Editorials</Link>
                        </li>
                        <li>
                            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Get in Touch</h2>
                    <p className="text-sm">Email: siddiqui20042007@gmail.com</p>

                    <div className="flex items-center space-x-4 mt-4">
                        <Link
                            href={'https://www.linkedin.com/in/rashid-siddiqui2004'}
                            target='_blank'>
                            <Linkedin className="text-3xl" />
                        </Link>
                        <Link
                            href={'https://github.com/RashidSiddiqui2004'}
                            target='_blank'>
                            <Github className="text-3xl" />
                        </Link>
                        <Link
                            href={'https://leetcode.com/rashid_sid'}
                            target='_blank'>
                            <Leetcode className="text-3xl" />
                        </Link>

                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 border-t border-gray-700 pt-4 text-center">
                <p className="text-sm">
                    &copy; 2025 TheCodeEdge. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
