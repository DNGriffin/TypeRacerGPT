import { useEffect, useState } from "react";
import React from "react";



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
function computeCompletion(sentencesLength: number, sentenceIndex: number, assignmentPercentage: number) {
    const sentencePercentage = sentenceIndex / sentencesLength;
    const weightedAssignmentPercentage = (1 / sentencesLength) * assignmentPercentage
    return Math.round(100 * (sentencePercentage + weightedAssignmentPercentage));

}


export const Type: React.FC<{ sentences: string[] }> = ({ sentences }) => {
    const [input, setInput] = useState("");
    const [index, setIndex] = useState(0);
    const [assignment, setAssignment] = useState(sentences[0]);
    const [percentage, setPercentage] = useState(0);
    const [charItems, setCharItems] = useState<CharItem[]>([]);
    // const [roundPercentage, setRoundPercentage] = useState(0);


    useEffect(() => {
        if (index >= sentences.length) {
            alert("COMPLETE!")
            return;
        }
        setCharItems(generateChars(assignment, input));
        setPercentage(computeCompletion(sentences.length, index, input.length / assignment.length))

        if (input.length >= assignment.length) {
            const newIndex = index + 1;
            setIndex(newIndex);
            setAssignment(sentences[newIndex]);
            setInput("");
        }
    }, [input, assignment, index]);

    const cursorIndex = input.length;

    return (
        <div>

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
            <br />
            <br />

            <ProgressBar percent={percentage}></ProgressBar>
        </div>
    );
};


interface ProgressBarProps {
    /** 0–100 */
    percent: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => {
    const validPercent = Math.max(0, Math.min(100, percent));

    return (
        <div style={{ display: "inline-block", width: "50%" }}>
            <div
                style={{
                    width: "100%",
                    height: 20,
                    backgroundColor: "#e0e0de",
                    borderRadius: 10,
                    overflow: "hidden",
                    boxShadow: "inset 0 2px 5px rgba(0,0,0,0.2)"
                }}
            >
                <div
                    style={{
                        width: `${validPercent}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #A1FFCE 0%, #FAFFD1 100%)",
                        transition: "width 0.2s ease-in-out"
                    }}
                />
            </div>

            <div style={{ textAlign: "center", marginTop: 8, fontWeight: 600 }}>
                {validPercent}%
            </div>
        </div>
    );
};
