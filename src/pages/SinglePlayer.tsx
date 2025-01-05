import { useParams } from "react-router";
import { Type } from "../components/Type";
import { mockStories } from "../mock/mock-data";

export const SinglePlayer: React.FC = () => {

    let { storyId } = useParams();
    const story = mockStories[parseInt(storyId ?? "0")]


    return <div>
        <h1>{story.title}</h1>
        <Type sentences={story.sentences} />
    </div>
}