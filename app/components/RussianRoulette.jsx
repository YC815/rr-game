'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function RussianRoulette() {
    // 遊戲狀態管理
    const [bulletPos, setBulletPos] = useState(null);  // 子彈位置 (0-5)
    const [chamber, setChamber] = useState(0);        // 當前彈倉位置
    const [history, setHistory] = useState([]);       // 遊戲歷史
    const [status, setStatus] = useState('playing');  // 遊戲狀態: 'playing' | 'dead'
    const [isAnimating, setIsAnimating] = useState(false); // 動畫狀態
    const [isReady, setIsReady] = useState(false);    // 組件是否準備就緒

    // 初始化遊戲
    useEffect(() => {
        // 確保只在客戶端執行
        if (typeof window !== 'undefined') {
            setBulletPos(Math.floor(Math.random() * 6));
            setIsReady(true);
        }
    }, []);

    // 處理開槍事件
    const handleShoot = useCallback(() => {
        if (status !== 'playing' || isAnimating || !isReady) return;

        setIsAnimating(true);

        // 模擬開槍延遲
        setTimeout(() => {
            const isDead = chamber === bulletPos;
            setHistory(h => [...h, {
                round: h.length + 1,
                result: isDead ? '爆炸💥' : '安全✅'
            }]);

            if (isDead) {
                setStatus('dead');
            } else {
                setChamber((chamber + 1) % 6);
            }
            setIsAnimating(false);
        }, 500);
    }, [chamber, bulletPos, status, isAnimating, isReady]);

    // 重置遊戲
    const handleReset = useCallback(() => {
        window.location.reload();
    }, []);

    // 如果組件還沒準備好，顯示載入中
    if (!isReady) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="text-2xl">載入中...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4 sm:space-y-8 bg-gray-900 text-white p-4">
            {/* 標題 */}
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent text-center">
                Emoji 俄羅斯轉盤
            </h1>

            {/* 遊戲狀態 */}
            <div className="text-lg sm:text-xl">
                狀態：{' '}
                <span className={status === 'playing' ? 'text-green-400' : 'text-red-500'}>
                    {status === 'playing' ? '存活中 ✅' : '爆炸 💥 Game Over'}
                </span>
            </div>

            {/* 彈倉顯示 */}
            <div className="flex items-center justify-center space-x-2 sm:space-x-4 text-4xl sm:text-6xl">
                {Array.from({ length: 6 }).map((_, idx) => (
                    <motion.div
                        key={idx}
                        animate={{
                            scale: idx === chamber ? [1, 1.1, 1] : 1,
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: idx === chamber ? Infinity : 0,
                            repeatType: "reverse"
                        }}
                        className={`relative ${idx === chamber ? 'text-yellow-400' : 'text-gray-400'}`}
                    >
                        {status === 'dead' && idx === chamber ? '💥' :
                            idx < chamber ? '🟢' : '⚪'}
                        {idx === chamber && (
                            <motion.div
                                className="absolute -bottom-4 sm:-bottom-6 left-1/2 transform -translate-x-1/2 text-xl sm:text-2xl"
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                ⬆️
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* 控制按鈕 */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 w-full max-w-md">
                <button
                    onClick={handleShoot}
                    disabled={status !== 'playing' || isAnimating}
                    className="w-full sm:w-48 px-6 py-3 bg-red-600 rounded-lg text-base sm:text-lg font-semibold
                     hover:bg-red-700 transition-colors duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-lg hover:shadow-red-500/50 mt-5"
                >
                    {isAnimating ? '砰！' : '扣板機'}
                </button>
                <button
                    onClick={handleReset}
                    className="w-full sm:w-48 px-6 py-3 bg-blue-600 rounded-lg text-base sm:text-lg font-semibold
                     hover:bg-blue-700 transition-colors duration-200
                     shadow-lg hover:shadow-blue-500/50"
                >
                    重新開始
                </button>
            </div>

            {/* 歷史記錄 */}
            <div className="w-full max-w-md bg-gray-800 rounded-lg p-3 sm:p-4">
                <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">歷史紀錄：</h2>
                <ul className="space-y-1 sm:space-y-2">
                    {history.map(({ round, result }) => (
                        <motion.li
                            key={round}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-2 text-base sm:text-lg"
                        >
                            <span className="text-gray-400">第 {round} 次：</span>
                            <span>{result}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    );
} 