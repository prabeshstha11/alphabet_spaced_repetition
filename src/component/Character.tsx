import { useEffect, useMemo, useRef, useState } from "react";
import "../css/design.css";

type CharacterQuizProps = {
    characterMap: { [key: string]: string };
};

export default function CharacterQuiz({ characterMap }: CharacterQuizProps) {
    const [shuffledMap, setShuffledMap] = useState<{ [key: string]: string }>({});
    const [currentState, setCurrentState] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>("");
    const [isWrongAnswer, setIsWrongAnswer] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const keys = useMemo(() => Object.keys(shuffledMap), [shuffledMap]);

    useEffect(() => {
        setShuffledMap(shuffleObject(characterMap));
    }, [characterMap]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [currentState, isWrongAnswer]);

    const isSubmitDisabled = inputValue.trim() === "";

    const gameContinue = () => {
        const answer = inputRef.current?.value.trim().toLowerCase();
        const correctAnswer = keys[currentState];

        if (answer === correctAnswer) {
            const totalItems = keys.length;
            setInputValue("");
            setIsWrongAnswer(false);
            setCurrentState((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
        } else {
            setIsWrongAnswer(true);
            setInputValue("");
        }
    };

    return (
        <div className="app-ui">
            <span className="count">Count: {currentState}</span>
            <div className="hiragana-character">{shuffledMap[keys[currentState]]}</div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    gameContinue();
                }}
            >
                <input type="text" ref={inputRef} onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
                {isWrongAnswer && <span className="message">Wrong Answer! Please try again!</span>}
                <button type="submit" disabled={isSubmitDisabled}>
                    Check
                </button>
            </form>
        </div>
    );
}

function shuffleObject(obj: { [key: string]: string }) {
    const entries = Object.entries(obj);
    for (let i = entries.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [entries[i], entries[j]] = [entries[j], entries[i]];
    }
    return Object.fromEntries(entries);
}
