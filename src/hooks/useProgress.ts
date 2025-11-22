import { useState, useEffect } from 'react';

const STORAGE_KEY = 'reacher-progress';

export function useProgress() {
    const [readBookIds, setReadBookIds] = useState<number[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(readBookIds));
    }, [readBookIds]);

    const toggleRead = (bookId: number) => {
        setReadBookIds(prev =>
            prev.includes(bookId)
                ? prev.filter(id => id !== bookId)
                : [...prev, bookId]
        );
    };

    const isRead = (bookId: number) => readBookIds.includes(bookId);

    const progress = readBookIds.length;

    return { readBookIds, toggleRead, isRead, progress };
}
