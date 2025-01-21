
import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const CTA = () => {
    return (
        <div className='flex gap-8 justify-center w-full'>
            <Button className='bg-white text-black hover:bg-slate-300 p-6 rounded-full'>
                <Link href={'/editorials'}> Explore Editorials</Link>
            </Button>
            <Button className='p-6 rounded-full'>
                <Link href={'/write-editorial'}> Write your Editorial</Link>
            </Button>
        </div>
    )
}

export default CTA