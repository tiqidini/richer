import React, { useRef, useState } from 'react';
import { Book } from '../data/books';

interface BookCardProps {
    book: Book;
    isRead: boolean;
    onToggle: (e: React.MouseEvent) => void;
    onSelect: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, isRead, onToggle, onSelect }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onSelect}
            className={`
        relative group cursor-pointer transition-all duration-500 ease-out
        transform preserve-3d h-full
      `}
            style={{
                transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`,
            }}
        >
            <div className={`
        relative h-full overflow-hidden rounded-2xl border backdrop-blur-md transition-all duration-300
        ${isRead
                    ? 'bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.2)]'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 shadow-xl'
                }
      `}>
                {/* Background Cover Blur */}
                <div className="absolute inset-0 z-0">
                    <img
                        src={book.coverUrl}
                        alt=""
                        className="w-full h-full object-cover opacity-20 blur-md group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent" />
                </div>

                <div className="relative z-10 p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-4 mb-4">
                        {/* Cover Thumbnail */}
                        <div className="w-20 h-32 flex-shrink-0 rounded-lg shadow-lg overflow-hidden border border-white/10 group-hover:border-white/30 transition-colors bg-gray-800 flex items-center justify-center">
                            <img
                                src={book.coverUrl}
                                alt={book.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(book.title)}&background=0f172a&color=22d3ee&size=200&font-size=0.33`;
                                }}
                            />
                        </div>

                        {/* Status Toggle */}
                        <button
                            onClick={onToggle}
                            className={`
                p-2 rounded-full transition-all duration-300 border
                ${isRead
                                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]'
                                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/20 hover:text-white'
                                }
              `}
                            title={isRead ? "Отметить как непрочитанное" : "Отметить как прочитанное"}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex-1">
                        <span className={`
              text-xs font-bold tracking-wider uppercase mb-1 block transition-colors duration-300
              ${isRead ? 'text-cyan-300' : 'text-gray-500'}
            `}>
                            Книга #{book.id} • {book.year}
                    </div>
                </div>
            </div>
        </div>
    );
};
