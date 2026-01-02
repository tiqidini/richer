import React from 'react';
import { Book } from '../data/books';
import { BookCard } from './BookCard';

interface BookListProps {
    books: Book[];
    readBookIds: number[];
    nextBookId?: number;
    onToggle: (id: number) => void;
    onSelect: (book: Book) => void;
}

export const BookList: React.FC<BookListProps> = ({ books, readBookIds, nextBookId, onToggle, onSelect }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl mx-auto px-4 pb-24">
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    book={book}
                    isRead={readBookIds.includes(book.id)}
                    isNextUp={book.id === nextBookId}
                    onToggle={(e) => {
                        e.stopPropagation();
                        onToggle(book.id);
                    }}
                    onSelect={() => onSelect(book)}
                />
            ))}
        </div>
    );
};
