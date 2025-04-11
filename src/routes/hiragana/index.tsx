import CharacterQuiz from "@/component/Character";
import { hiragana } from "@/config/hiragana";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/hiragana/")({
    component: () => <CharacterQuiz characterMap={hiragana} />,
});
