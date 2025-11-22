import { useState } from 'react';
import { books, Book } from './data/books';
import { useProgress } from './hooks/useProgress';
import { BookList } from './components/BookList';
import { ProgressBar } from './components/ProgressBar';
import { BookDetails } from './components/BookDetails';

function App() {
    const { readBookIds, toggleRead, progress } = useProgress();
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    return (
        <div className="min-h-screen bg-[#0f172a] text-white selection:bg-cyan-500/30 font-sans">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center pt-12">
                <header className="text-center mb-12 px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                        Хроники Джека Ричера
                    </h1>
                    <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                        Отслеживайте свой путь по легендарной серии триллеров Ли Чайлда.
                    </p>
                </header>

                <BookList
                    books={books}
                    readBookIds={readBookIds}
                    onToggle={toggleRead}
                    onSelect={setSelectedBook}
                />

                <ProgressBar total={books.length} current={progress} />

                {selectedBook && (
                    <BookDetails
                        book={selectedBook}
                        isOpen={!!selectedBook}
                        onClose={() => setSelectedBook(null)}
                        isRead={readBookIds.includes(selectedBook.id)}
                        onToggleRead={() => toggleRead(selectedBook.id)}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
