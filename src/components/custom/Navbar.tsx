'use client';
 
import { APP_NAME } from '@/constants';
import {
    SignOutButton,
    SignedIn,
    SignedOut,
    UserButton, 
} from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {

    return (
        <nav className="flex justify-between py-3 px-3 bg-slate-200 text-slate-800 text-sm text-fell">
            <Link href="/" className="text-lg hover:text-gray-800 transition-colors">
                {APP_NAME}
            </Link>
            <div className="flex items-center space-x-4">
                <Link href="/editorials" className="text-sm hover:text-gray-900  transition-colors hidden md:block">
                    Editorials
                </Link>
                <Link href="/about" className="text-sm hover:text-gray-900 transition-colors hidden md:block">
                    About
                </Link>

                <SignedOut>
                    <Button className=' bg-slate-900 text-white hover:bg-slate-800 hover:text-slate-100'>
                        <Link href={'/sign-up'}>Sign In</Link>
                    </Button>
                </SignedOut>

                <SignedIn>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <UserButton />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href={`/profile`}>Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <SignOutButton />
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SignedIn>
            </div>
        </nav>
    );
};

export default Navbar;
