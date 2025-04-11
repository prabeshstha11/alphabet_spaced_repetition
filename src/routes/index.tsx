import { createFileRoute, Link } from "@tanstack/react-router";
import "../App.css";

export const Route = createFileRoute("/")({
    component: App,
});

function App() {
    return (
        <div className="app">
            <h1>Choose what you want to learn: </h1>
            <h2>Japanese 🇯🇵</h2>
            <div className="lesson-category">
                <Link to="/hiragana" className="lesson">
                    Hiragana (complete)
                </Link>
                <Link to="/katakana" className="lesson">
                    Katakana (complete)
                </Link>
            </div>
        </div>
    );
}
