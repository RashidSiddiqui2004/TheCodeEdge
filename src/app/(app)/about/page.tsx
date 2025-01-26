'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import React from "react";

const AboutPage = () => {

    const router = useRouter();

    return (
        <div className="bg-gray-900 text-white min-h-screen text-fell">
            {/* Hero Section */}
            <div className="text-center py-16">
                <h1 className="text-4xl mb-4">About CodeEdge</h1>
                <p className="text-lg max-w-2xl mx-auto">
                    CodeEdge is your one-stop platform to explore, learn, and share knowledge about coding.
                    We're committed to building a community of developers who are passionate about solving
                    real-world problems through code.
                </p>
            </div>

            {/* Mission and Vision */}
            <div className="py-12 px-6 sm:px-12 lg:px-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Mission */}
                    <div>
                        <h2 className="text-2xl mb-4">Our Mission</h2>
                        <p className="text-gray-300">
                            To empower developers by providing cutting-edge tools, resources, and a platform
                            where they can collaborate, learn, and grow.
                        </p>
                    </div>
                    {/* Vision */}
                    <div>
                        <h2 className="text-2xl mb-4">Our Vision</h2>
                        <p className="text-gray-300">
                            To become the global hub for developers to innovate, collaborate, and redefine the
                            future of technology together.
                        </p>
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="py-12 px-6 sm:px-12 lg:px-32 bg-gray-800">
                <h2 className="text-3xl text-center mb-8">Meet Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
                    {/* Example Team Member */}
                    <div className="text-center">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Team Member"
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <h3 className="text-xl">Rashid Siddiqui</h3>
                        <p className="text-gray-400">Founder & CEO</p>
                    </div>
                    {/* Add more team members similarly */}
                    <div className="text-center">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Team Member"
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <h3 className="text-xl">Ms. X</h3>
                        <p className="text-gray-400">CTO</p>
                    </div>
                </div>
            </div>

            {/* Technologies Section */}
            <div className="py-12 px-6 sm:px-12 lg:px-32">
                <h2 className="text-3xl font-bold text-center mb-8">Technologies We Use</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    <div className="bg-gray-800 py-2 px-4 rounded-lg shadow-lg">
                        React.js
                    </div>
                    <div className="bg-gray-800 py-2 px-4 rounded-lg shadow-lg">
                        Next.js
                    </div>
                    <div className="bg-gray-800 py-2 px-4 rounded-lg shadow-lg">
                        Tailwind CSS
                    </div>
                    <div className="bg-gray-800 py-2 px-4 rounded-lg shadow-lg">
                        Node.js
                    </div>
                    <div className="bg-gray-800 py-2 px-4 rounded-lg shadow-lg">
                        MongoDB
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="py-12 text-center">
                <h2 className="text-2xl mb-4">Join the CodeEdge Community</h2>
                <p className="text-gray-200 mb-6">
                    Whether you are a seasoned developer or just starting, there's something here for everyone.
                </p>
                <Button onClick={() => router.push("/sign-up")} className="bg-gray-100 text-slate-950 px-6 py-2 rounded-lg hover:bg-gray-200 
                    transition">
                    Get Started
                </Button>
            </div>
        </div>
    );
};

export default AboutPage;
