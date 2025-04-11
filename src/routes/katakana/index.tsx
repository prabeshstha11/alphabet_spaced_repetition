import CharacterQuiz from "@/component/Character";
import { katakana } from "@/config/katakana";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/katakana/")({
    component: () => <CharacterQuiz characterMap={katakana} />,
});
