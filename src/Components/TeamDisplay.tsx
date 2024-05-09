import TeamComponent from "./TeamComponent"
import { Team } from "../Types/customTypes"

interface TeamDisplayProps {
    teams: Team[]
}

const TeamDisplay = (props: TeamDisplayProps) => {

    return (
        <div id="team-display">
           {props.teams.map( team => <TeamComponent key={team.teamName} team={team}></TeamComponent>)}
        </div>
    )
}

export default TeamDisplay