import React from 'react';

interface FilterBarProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    showUnreadOnly: boolean;
    onToggleUnread: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
    searchQuery, 
    onSearchChange, 
    showUnreadOnly, 
    onToggleUnread 
}) => {
    return (
        <div className="sticky top-0 z-30 w-full bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 py-3 px-4 mb-6 transition-all duration-300">
            <div className="max-w-7xl mx-auto flex gap-3">
                {/* Search Input */}
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Найти книгу..."
                        className="block w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 sm:text-sm transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => onSearchChange('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Filter Toggle */}
                <button
                    onClick={onToggleUnread}
                    className={`
                        flex items-center justify-center px-4 rounded-xl border transition-all duration-300 whitespace-nowrap
                        ${showUnreadOnly 
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' 
                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-200'
                        }
                    `}
                >
                    <svg className={`w-5 h-5 sm:mr-2 ${showUnreadOnly ? 'fill-current' : 'none'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="hidden sm:inline text-sm font-medium">
                        {showUnreadOnly ? 'Скрыты прочитанные' : 'Все книги'}
                    </span>
                </button>
            </div>
        </div>
    );
};
