import { Team } from "../Types/customTypes"
import { capitalizeName } from "../Utilities/resources"

interface TeamComponentProps {
    team: Team
}

const TeamComponent = (props: TeamComponentProps) => {

    return (
        <div className="team">
           <h2>{props.team.teamName}</h2>
           {props.team.teamMembers.map( member => <p key={member}>{capitalizeName(member)}</p>)}
        </div>
    )
}

export default TeamComponent