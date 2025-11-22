import React from 'react';
import { Book } from '../data/books';

interface BookDetailsProps {
    book: Book;
    isOpen: boolean;
    onClose: () => void;
    isRead: boolean;
    onToggleRead: () => void;
}

export const BookDetails: React.FC<BookDetailsProps> = ({ book, isOpen, onClose, isRead, onToggleRead }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-[#0f172a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header Image/Banner */}
                <div className="relative h-48 sm:h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent z-10" />
                    <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover opacity-50 blur-sm scale-110"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="relative z-20 -mt-20 px-6 pb-6 overflow-y-auto custom-scrollbar">
                    <div className="flex flex-col sm:flex-row gap-6">
                        {/* Cover Image */}
                        <div className="flex-shrink-0 mx-auto sm:mx-0">
                            <div className="w-32 h-48 md:w-48 md:h-72 rounded-lg shadow-2xl overflow-hidden border-2 border-white/10 flex-shrink-0 bg-gray-800 flex items-center justify-center">
                                <img
                                    src={book.coverUrl}
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(book.title)}&background=0f172a&color=22d3ee&size=300&font-size=0.33`;
                                    }}
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-left">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">{book.title}</h2>
                                    <p className="text-cyan-400 text-sm font-medium mb-4">
                                        {book.originalTitle} • {book.year}
                                        {book.coAuthor && <span className="text-gray-400"> • w/ {book.coAuthor}</span>}
                                    </p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Сюжет</h3>
                                <p className="text-gray-200 leading-relaxed text-sm sm:text-base">
                                    {book.description}
                                </p>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Персонажи</h3>
                                <div className="flex flex-wrap gap-2">
                                    {book.characters.map((char, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300"
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={onToggleRead}
                                className={`
                  w-full py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2
                  ${isRead
                                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 hover:bg-cyan-500/30'
                                        : 'bg-white text-black hover:bg-gray-200'
                                    }
                `}
                            >
                                {isRead ? (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Прочитано
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Отметить как прочитанное
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
