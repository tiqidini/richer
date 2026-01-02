import React, { useRef, useState } from 'react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    readBookIds: number[];
    onImport: (json: string) => boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, readBookIds, onImport }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    if (!isOpen) return null;

    const handleExport = () => {
        const data = JSON.stringify(readBookIds, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `richer-progress-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setMessage({ type: 'success', text: 'Прогресс успешно сохранен в файл!' });
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            const success = onImport(content);
            if (success) {
                setMessage({ type: 'success', text: 'Прогресс успешно восстановлен!' });
                setTimeout(onClose, 1500);
            } else {
                setMessage({ type: 'error', text: 'Ошибка: Неверный формат файла.' });
            }
        };
        reader.readAsText(file);
        // Reset input
        e.target.value = '';
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md bg-[#0f172a] rounded-2xl border border-white/10 shadow-2xl p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Управление данными</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-gray-400 mb-4">
                        Сохраните ваш прогресс в файл, чтобы не потерять его при очистке браузера или переносе на другое устройство.
                    </p>

                    <button
                        onClick={handleExport}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/20 transition-all font-medium"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Скачать резервную копию
                    </button>

                    <div className="relative">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".json"
                            className="hidden"
                        />
                        <button
                            onClick={handleImportClick}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition-all font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Восстановить из файла
                        </button>
                    </div>
                </div>

                {message && (
                    <div className={`mt-6 p-3 rounded-lg text-sm text-center font-medium ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {message.text}
                    </div>
                )}
                
                <div className="mt-6 pt-6 border-t border-white/5 text-center">
                    <p className="text-xs text-gray-500">
                        Текущий прогресс: <span className="text-white font-bold">{readBookIds.length}</span> книг прочитано
                    </p>
                </div>
            </div>
        </div>
    );
};
