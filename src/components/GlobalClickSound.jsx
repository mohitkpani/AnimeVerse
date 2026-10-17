
import { useEffect } from "react";

function GlobalClickSound() {
    useEffect(() => {
        const audio = new Audio("/sounds/click.mp3");
        audio.preload = "auto";
        audio.volume = 0.3;

        let lastPointerTime = 0;

        const playClick = () => {
            audio.currentTime = 0;

            audio.play().catch((error) => {
                console.info("Click sound could not play:", error);
            });
        };

        const handlePointerDown = (event) => {
            const target = event.target;

            if (!(target instanceof Element)) return;

            const clickable = target.closest(
                "button, a, [role='button'], input, select, summary, label"
            );

            if (!clickable || clickable.matches(":disabled")) return;

            lastPointerTime = Date.now();
            playClick();
        };

        const handleClick = (event) => {
            // Avoid playing twice when a pointer interaction also fires click.
            if (Date.now() - lastPointerTime < 700) return;

            const target = event.target;

            if (!(target instanceof Element)) return;

            const clickable = target.closest(
                "button, a, [role='button'], input, select, summary, label"
            );

            if (!clickable || clickable.matches(":disabled")) return;

            playClick();
        };

        document.addEventListener("pointerdown", handlePointerDown, true);
        document.addEventListener("click", handleClick, true);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown, true);
            document.removeEventListener("click", handleClick, true);
            audio.pause();
            audio.src = "";
        };
    }, []);

    return null;
}

export default GlobalClickSound;
