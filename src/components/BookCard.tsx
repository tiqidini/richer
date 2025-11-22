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
                        </span>

                        <h3 className={`
              text-lg font-bold leading-tight mb-2 transition-colors duration-300
              ${isRead ? 'text-white' : 'text-gray-200 group-hover:text-white'}
            `}>
                            {book.title}
                        </h3>

                        {book.rating && (
                            <div className="flex items-center gap-1 mb-2">
                                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-xs font-bold text-cyan-100">{book.rating}</span>
                            </div>
                        )}

                        <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                            {book.description}
                        </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                        <span>Подробнее &rarr;</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
