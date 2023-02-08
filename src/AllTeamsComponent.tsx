import { Team } from "./App"
import TeamComponent from './TeamComponent';

interface AllTeamsProps {
    teams: Team[]
}

const AllTeamsProps = (props: AllTeamsProps) => {

    return (
        <div>
           {props.teams.map( team => <TeamComponent team={team}></TeamComponent>)}
        </div>
    )
}

export default AllTeamsProps