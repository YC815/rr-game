'use client';

import dynamic from 'next/dynamic';

const RussianRoulette = dynamic(() => import('./RussianRoulette'), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="text-2xl">載入中...</div>
        </div>
    )
});

export default function GameWrapper() {
    return <RussianRoulette />;
} 