
import React from 'react'
import { Button } from '../ui/button'

const CTA = () => {
    return (
        <div className='flex gap-8 justify-center w-full'>
            <Button className='bg-white text-black hover:bg-slate-300 p-6 rounded-full'>Explore Editorials</Button>
            <Button className='p-6 rounded-full'>Write your Editorial</Button>
        </div>
    )
}

export default CTA