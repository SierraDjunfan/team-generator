import { TeamNameType } from "../Types/customTypes"

export interface TeamNamingProps {
    randomTeamNamesWasSelected: () => void
    defaultTeamNamesWasSelected: () => void
    nameSelectionType: TeamNameType
}

const TeamNaming = (props: TeamNamingProps) => {

    return (<>
            <h1>2/</h1>
            <button className={props.nameSelectionType === TeamNameType.Default ? "header-button header-button-selected" : "header-button"} onClick={() => props.defaultTeamNamesWasSelected()}>DEFAULT TEAM NAMES</button>
            <h1>OR</h1>
            <button className={props.nameSelectionType === TeamNameType.Random ? "header-button header-button-selected" : "header-button"} onClick={() => props.randomTeamNamesWasSelected()}>RANDOM TEAM NAMES</button>
            </>)
}

export default TeamNaming