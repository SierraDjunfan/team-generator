import { TeamNameType } from "../Types/customTypes"

export interface ShuffleControlsProps {
    shuffleFunction: () => void
    copyFunction: () => void
    newTeamNamesFunction: () => void
    teamNameType: TeamNameType
}

const ShuffleControls = (props: ShuffleControlsProps) => {

    const arrayFromOne = (to: number) => {
        return Array.from({length: to}, (_, index) => index + 1)
    }

    return (
        <div id="team-generation">
            <button className="action-button" onClick={ e => props.shuffleFunction()}>Shuffle</button>
            <button className="action-button" onClick={ e => props.copyFunction()}>CLIPBOARD</button>
            {props.teamNameType === TeamNameType.Random && <button className="action-button" onClick={ e => props.newTeamNamesFunction()}>New Team Names</button>}
        </div>
    )
}

export default ShuffleControls