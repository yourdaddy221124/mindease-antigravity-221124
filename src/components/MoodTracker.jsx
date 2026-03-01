import React, { useState, useRef, useEffect } from 'react';
import { Smile, Frown, Meh, Heart, Activity } from 'lucide-react';
import './MoodTracker.css';

const MOODS = [
    { label: 'Great', emoji: '🤩', color: '#34d399' },
    { label: 'Good', emoji: '😊', color: '#38bdf8' },
    { label: 'Neutral', emoji: '😐', color: '#94a3b8' },
    { label: 'Anxious', emoji: '😰', color: '#fb923c' },
    { label: 'Low', emoji: '😔', color: '#f43f5e' },
    { label: 'Sad', emoji: '😢', color: '#3b82f6' },
    { label: 'Angry', emoji: '😡', color: '#ef4444' },
];

function MoodTracker({ currentMood, setMood }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const current = MOODS.find(m => m.label === currentMood) || MOODS[2];

    return (
        <div className={`mood-tracker ${isOpen ? 'open' : ''}`} ref={ref}>
            <button
                className="mood-trigger"
                onClick={() => setIsOpen(!isOpen)}
                title="Log your mood"
            >
                <span className="mood-emoji">{current.emoji}</span>
                <span>{current.label}</span>
                <span className="mood-chevron">▾</span>
            </button>

            {isOpen && (
                <div className="mood-dropdown">
                    <div className="mood-label-header">How are you feeling?</div>
                    {MOODS.map((mood) => (
                        <button
                            key={mood.label}
                            className={`mood-option ${currentMood === mood.label ? 'active' : ''}`}
                            onClick={() => { setMood(mood.label); setIsOpen(false); }}
                        >
                            <span className="mood-opt-emoji">{mood.emoji}</span>
                            <span>{mood.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MoodTracker;
