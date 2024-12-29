import { useEffect, useState } from "react";

const sampleSentences = [
    "The shimmer of stardust coated the ancient ruins with an otherworldly glow ",
    "Serendipity led her to an abandoned bookstore where every page whispered secrets ",
    "A gentle breeze carried the echoes of forgotten lullabies across the silent meadow ",
    "Sunset painted the skyline with liquid gold, a fleeting masterpiece of light and time ",
    "His laughter crackled like distant thunder on a summer night ",
    "Whispers of revolution stirred in the shadowy corners of the cobblestone alley ",
    "She folded her wishes into paper cranes, sending them adrift in a moonlit stream ",
    "The city never slept, but it still dreamed in neon rainbows and midnight jazz ",
    "When he spoke, the world paused to listen, drawn by the gravity of his words ",
    "Hope grew in the cracks of the concrete, defying every attempt to silence it "
];

const getRandomNumber = (prevNumber: number) => {
    const number = Math.floor(Math.random() * sampleSentences.length);
    if (number === prevNumber) return getRandomNumber(prevNumber);
    return number;
};

type CharItem = {
    character: string;
    state: "correct" | "incorrect" | "missing";
};

function generateChars(assignment: string, input: string): CharItem[] {
    let charItems: CharItem[] = [];
    for (let i = 0; i < assignment.length; i++) {
        if (i < input.length) {
            charItems.push({
                character: assignment.charAt(i),
                state: assignment.charAt(i) === input.charAt(i) ? "correct" : "incorrect"
            });
        } else {
            charItems.push({
                character: assignment.charAt(i),
                state: "missing"
            });
        }
    }
    return charItems;
}

export const Type = () => {
    const [input, setInput] = useState("");
    const [index, setIndex] = useState(0);
    const [assignment, setAssignment] = useState(sampleSentences[index]);
    const [charItems, setCharItems] = useState<CharItem[]>([]);
    const [assignmentPercentage, setAssignmentPercentage] = useState(0);
    // const [roundPercentage, setRoundPercentage] = useState(0);


    useEffect(() => {
        setCharItems(generateChars(assignment, input));
        // If user has typed past or exactly the length of the assignment, load a new sentence
        if (input.length >= assignment.length) {
            const newIndex = getRandomNumber(index);
            setIndex(newIndex);
            setAssignment(sampleSentences[newIndex]);
            setInput("");
            setAssignmentPercentage(Math.round(100 * input.length / assignment.length));
        }
    }, [input, assignment, index]);

    // The index of the character that should be typed next
    const cursorIndex = input.length;

    return (
        <div>
            {/* 
        The style block with our blinking CSS class. 
        You could also put this in an external CSS file.
      */}
            <style jsx>{`
        @keyframes blink {
          0% {
            background-color: rgba(247, 255, 0, 0.27);
          }
          50% {
            background-color: transparent;
          }
          100% {
            background-color: rgba(247, 255, 0, 0.27);
          }
        }
        .cursor {
          animation: blink 800ms step-start infinite;
        }
      `}</style>

            {charItems.map((charItem, i) => {
                const isCursor = i === cursorIndex;

                return (
                    <span
                        key={i}
                        className={isCursor ? "cursor" : ""}
                        style={{
                            opacity: charItem.state === "missing" ? 0.3 : 1,
                            color: charItem.state === "incorrect" ? "red" : undefined,
                            textDecoration: isCursor ? "underline" : undefined
                        }}
                    >
                        {charItem.character}
                    </span>
                );
            })}

            <br />
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                id="input"
                name="input"
            />

            <div style={{ width: "100%", height: 200, background: "red" }} id="loading-bar"></div>
        </div>
    );
};
