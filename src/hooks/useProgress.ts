import { useState, useEffect } from 'react';

const STORAGE_KEY = 'reacher-progress';

export function useProgress() {
    const [readBookIds, setReadBookIds] = useState<number[]>(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to load progress:', error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(readBookIds));
        } catch (error) {
            console.error('Failed to save progress:', error);
        }
    }, [readBookIds]);

    const toggleRead = (bookId: number) => {
        setReadBookIds(prev =>
            prev.includes(bookId)
                ? prev.filter(id => id !== bookId)
                : [...prev, bookId]
        );
    };

    const importProgress = (json: string) => {
        try {
            const data = JSON.parse(json);
            if (Array.isArray(data) && data.every(id => typeof id === 'number')) {
                setReadBookIds(data);
                return true;
            }
            return false;
        } catch (e) {
            console.error('Import failed', e);
            return false;
        }
    };

    const isRead = (bookId: number) => readBookIds.includes(bookId);

    const progress = readBookIds.length;

    return { readBookIds, toggleRead, isRead, progress, importProgress };
}
