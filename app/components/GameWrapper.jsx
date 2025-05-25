'use client';

import dynamic from 'next/dynamic';

const RussianRoulette = dynamic(() => import('./RussianRoulette'), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
            <div className="text-xl sm:text-2xl text-center">載入中...</div>
        </div>
    )
});

export default function GameWrapper() {
    return <RussianRoulette />;
} 