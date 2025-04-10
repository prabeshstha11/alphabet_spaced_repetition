import { createFileRoute } from "@tanstack/react-router";
import { hiragana as hiraganaList } from "@/config/hiragana";
import { useEffect, useMemo, useRef, useState } from "react";
import "./css/design.css";

export const Route = createFileRoute("/hiragana")({
    component: Hiragana,
});

function shuffleObject(obj: { [key: string]: string }) {
    const entries = Object.entries(obj);
    for (let i = entries.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [entries[i], entries[j]] = [entries[j], entries[i]];
    }
    return Object.fromEntries(entries);
}

function Hiragana() {
    const [hiragana, setHiragana] = useState<{ [key: string]: string }>({});
    const [currentState, setCurrentState] = useState<number>(0);
    // const [submitState, setSubmitState] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [isWrongAnswer, setIsWrongAnswer] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const hiraganaKeys = useMemo(() => Object.keys(hiragana), [hiragana]);

    // useEffect(() => {
    //     const entries = Object.entries(hiraganaList);
    //     for (let i = entries.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [entries[i], entries[j]] = [entries[j], entries[i]];
    //     }
    //     const shuffledHiragana = Object.fromEntries(entries);
    //     setHiragana(shuffledHiragana);
    // }, []);
    useEffect(() => {
        setHiragana(shuffleObject(hiraganaList));
    }, []);

    useEffect(() => {
        inputRef.current?.focus();
    }, [currentState, isWrongAnswer]);

    // useEffect(() => {
    //     const inputField = inputRef.current?.value;
    //     if (inputField?.trim() === "") {
    //         setSubmitState(true);
    //     } else {
    //         setSubmitState(false);
    //     }
    // }, [inputValue]);
    const isSubmitDisabled = inputValue.trim() === "";

    const gameContinue = () => {
        const answer = inputRef.current?.value.trim().toLowerCase();
        const correctAnswer = Object.keys(hiragana)[currentState];

        if (answer === correctAnswer) {
            const totalItems = Object.keys(hiragana).length;
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
            <div className="hiragana-character">{hiragana[hiraganaKeys[currentState]]}</div>
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
