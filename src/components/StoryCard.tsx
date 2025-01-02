import { Button } from "@mantine/core";
import { useNavigate } from "react-router";

export const StoryCard: React.FC<{ title: string, description: string, sentences: string[], id: number }> = ({ title, description, sentences, id }) => {
    let navigate = useNavigate();


    return <Button
        variant="light"
        radius="xl"
        size="md"
        onClick={() => navigate(`/singleplayer/${id}`)}
    >{title}</Button>
}