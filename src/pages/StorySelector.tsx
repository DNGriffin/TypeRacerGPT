import { StoryCard } from "../components/StoryCard"
import { mockStories } from "../mock/mock-data"

export const StorySelector: React.FC<{ type: "singleplayer" | "multiplayer" }> = () => {

    return <div> {mockStories.map((story, i) => <StoryCard id={i} {...story} />)}

    </div>
}