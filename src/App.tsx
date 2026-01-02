import { useState } from 'react';
import { books, Book } from './data/books';
import { useProgress } from './hooks/useProgress';
import { BookList } from './components/BookList';
import { ProgressBar } from './components/ProgressBar';
import { BookDetails } from './components/BookDetails';
import { SettingsModal } from './components/SettingsModal';

function App() {
    const { readBookIds, toggleRead, progress, importProgress } = useProgress();
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0f172a] text-white selection:bg-cyan-500/30 font-sans">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 flex flex-col items-center pt-12">
                <header className="text-center mb-12 px-4 relative w-full max-w-7xl mx-auto">
                    <button 
                        onClick={() => setIsSettingsOpen(true)}
                        className="absolute right-4 top-0 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Настройки данных"
                    >
                         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                    
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
                
                <SettingsModal
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                    readBookIds={readBookIds}
                    onImport={importProgress}
                />
            </div>
        </div>
    );
}

export default App;
