
import { APP_NAME } from '@/constants';
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-2 py-10 px-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h2 className="text-lg font-semibold text-white mb-4">About {APP_NAME}</h2>
                    <p className="text-sm leading-relaxed">
                        {APP_NAME} is a platform where competitive programmers share insights, strategies, and solutions to contest problems, fostering a community of learners and conquerors.
                    </p>
                </div>

                {/* Column 2: Navigation */}
                <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li>
                            <a href="/home" className="hover:text-white transition-colors">Home</a>
                        </li>
                        <li>
                            <a href="/leaderboard" className="hover:text-white transition-colors">Leaderboard</a>
                        </li>
                        <li>
                            <a href="/about" className="hover:text-white transition-colors">About Us</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Contact and Social Media */}
                <div>
                    <h2 className="text-lg font-semibold text-white mb-4">Get in Touch</h2>
                    <p className="text-sm">Email: support@editorial-x.com</p>
                    <p className="text-sm">Phone: +123 456 7890</p>

                    <div className="flex items-center space-x-4 mt-4">
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                        >
                            <img src="/twitter-icon.svg" alt="Twitter" className="w-5 h-5" />
                        </a>
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                        >
                            <img src="/facebook-icon.svg" alt="Facebook" className="w-5 h-5" />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors"
                        >
                            <img src="/linkedin-icon.svg" alt="LinkedIn" className="w-5 h-5" />
                        </a>
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
