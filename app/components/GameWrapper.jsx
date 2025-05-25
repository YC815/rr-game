'use client';

import dynamic from 'next/dynamic';

const RussianRoulette = dynamic(() => import('./RussianRoulette'), {
    ssr: false
});

export default function GameWrapper() {
    return <RussianRoulette />;
} 