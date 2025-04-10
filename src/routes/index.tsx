import { createFileRoute, Link } from "@tanstack/react-router";
import "../App.css";

export const Route = createFileRoute("/")({
    component: App,
});

function App() {
    return (
        <div>
            <h1>Choose what you want to learn: </h1>
            <Link to="/hiragana">Hiragana</Link>
        </div>
    );
}
