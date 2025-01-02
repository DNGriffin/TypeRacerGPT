import { Button } from "@mantine/core"
import { useNavigate } from "react-router";

export const MainMenu: React.FC = () => {
    let navigate = useNavigate();

    return <div>

        <Button
            variant="light"
            radius="xl"
            size="md"
            onClick={() => navigate("/singleplayer")}
        >Single Player</Button>


    </div>
}