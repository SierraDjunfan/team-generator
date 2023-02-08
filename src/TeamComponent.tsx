import { Team } from "./App"

interface TeamProps {
    team: Team
}

const TeamComponent = (props: TeamProps) => {

    return (
        <div>
           <h2>{props.team.teamName}</h2>
           {props.team.teamMembers.map( member => <p>{member}</p>)}
        </div>
    )
}

export default TeamComponent