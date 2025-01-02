import { useParams } from "react-router";
import { Type } from "../components/Type";
import { mockStories } from "../mock/mock-data";

export const SinglePlayer: React.FC = () => {

    let { storyId } = useParams();

    return <div>
        Single Player for story={storyId}
        <Type sentences={mockStories[parseInt(storyId ?? "0")].sentences} />
    </div>
}