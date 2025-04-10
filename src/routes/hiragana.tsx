import { createFileRoute } from "@tanstack/react-router";
import { hiragana as hiraganaList } from "@/config/hiragana";
import { useEffect, useRef, useState } from "react";
import "./css/design.css";

export const Route = createFileRoute("/hiragana")({
    component: Hiragana,
});

function Hiragana() {
    const [hiragana, setHiragana] = useState<{ [key: string]: string }>({});
    const [currentState, setCurrentState] = useState<number>(0);
    const [submitState, setSubmitState] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [isWrongAnswer, setIsWrongAnswer] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const entries = Object.entries(hiraganaList);
        for (let i = entries.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [entries[i], entries[j]] = [entries[j], entries[i]];
        }
        const shuffledHiragana = Object.fromEntries(entries);
        setHiragana(shuffledHiragana);
    }, []);

    useEffect(() => {
        const inputField = inputRef.current?.value;
        if (inputField?.trim() === "") {
            setSubmitState(true);
        } else {
            setSubmitState(false);
        }
    }, [inputValue]);

    const gameContinue = () => {
        const answer = inputRef.current?.value.trim().toLowerCase();
        const correctAnswer = Object.keys(hiragana)[currentState];

        if (answer === correctAnswer) {
            const totalItems = Object.keys(hiragana).length;
            setInputValue("");
            setIsWrongAnswer(false);
            if (currentState === totalItems - 1) setCurrentState(0);
            else setCurrentState(currentState + 1);
        } else {
            setIsWrongAnswer(true);
            setInputValue("");
        }
    };

    return (
        <div className="app-ui">
            <span className="count">Count: {currentState}</span>
            <div className="hiragana-character">{hiragana[Object.keys(hiragana)[currentState]]}</div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    gameContinue();
                }}
            >
                <input type="text" ref={inputRef} onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
                {isWrongAnswer && <span className="message">Wrong Answer! Please try again!</span>}
                <button type="submit" disabled={submitState}>
                    Check
                </button>
            </form>
        </div>
    );
}
