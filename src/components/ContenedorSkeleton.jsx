import { Skeleton } from '@nextui-org/react';
import React from 'react'

export default function ContenedorSkeleton() {
    return (
        <div className="shadow shadow-zinc-700 rounded-xl p-3 w-full space-y-5">
            <header className='flex justify-between items-center w-full h-20 rounded-xl p-3'>
                <Skeleton className='w-full h-full rounded-xl' />
            </header>
            <ul className='flex flex-col space-y-2 p-3'>
                {Array.from({ length: 3 }).map((_, index) => (
                    <li key={index} className='flex flex-row justify-between items-center w-full h-10'>
                        <Skeleton className='w-full h-full rounded-xl' />
                    </li>
                ))}
            </ul>
        </div>
    );
};