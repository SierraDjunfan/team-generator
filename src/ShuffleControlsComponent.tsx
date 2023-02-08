interface ShuffleControlsProps {
    shuffleFunction: () => void
    numberOfTeams: number
    numberOfTeamsChanged: (number: number) => void
    copyFunction: () => void
    clearFunction: () => void
    newTeamNamesFunction: () => void
    defaultTeamNamesFunction: () => void
}

const ShuffleControlsComponent = (props: ShuffleControlsProps) => {

    const arrayFromOne = (to: number) => {
        return Array.from({length: to}, (_, index) => index + 1)
    }


//     <select value={props.numberOfTeams} onChange={e => props.numberOfTeamsChanged(e.target.value)}>
//   {arrayFromOne(8).map( num => <option key={num} value={num}>{num}</option>)}
// </select>



    return (
        <div>
            <label>
                Number of Teams
                <select value={props.numberOfTeams} onChange={e => props.numberOfTeamsChanged(parseInt(e.target.value))}>
                    {arrayFromOne(8).map( num => <option key={num} value={num}>{num}</option>)}
                </select>
            </label>
            <div>
                <button onClick={ e => props.shuffleFunction()}>Shuffle</button>
                <button onClick={ e => props.copyFunction()}>Copy</button>
                <button onClick={ e => props.clearFunction()}>Clear</button>
            </div>
            <div>
                <button onClick={ e => props.newTeamNamesFunction()}>New Team Names</button>
                <button onClick={ e => props.defaultTeamNamesFunction()}>Default Team Names</button>
            </div>
        </div>
    )
}

export default ShuffleControlsComponent