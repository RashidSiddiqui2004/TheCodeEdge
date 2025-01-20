import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { APP_NAME } from '@/constants';

const Navbar = () => {
    return (
        <nav className="flex justify-between py-3 px-3">

            <a href="/" className="text-xl font-semibold text-white hover:text-gray-200 transition-colors">
                {APP_NAME}
            </a>

            <div className="flex items-center space-x-4">
                <a href="/editorials" className="text-white text-sm hover:text-gray-200 transition-colors hidden md:block">
                    Editorials
                </a>
                <a href="/about" className="text-white text-sm hover:text-gray-200 transition-colors hidden md:block">
                    About
                </a>

                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </nav>
    );
};

export default Navbar;
