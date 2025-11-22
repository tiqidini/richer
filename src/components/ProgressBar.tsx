import React from 'react';

interface ProgressBarProps {
    total: number;
    current: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ total, current }) => {
    const percentage = Math.round((current / total) * 100);

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0f172a]/90 backdrop-blur-xl border-t border-white/10 z-40">
            <div className="max-w-4xl mx-auto flex items-center gap-4">
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] transition-all duration-1000 ease-out"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <div className="text-sm font-bold text-cyan-300 min-w-[4rem] text-right">
                    {percentage}%
                </div>
            </div>
            <div className="text-center text-xs text-gray-500 mt-2 font-medium">
                Прочитано {current} из {total} книг
            </div>
        </div>
    );
};
