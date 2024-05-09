export interface TeamSetupProps {
    numberOfTeams: number
    onNumTeamsDropdownChanged: (number: number) => void
}

const TeamSetup = (props: TeamSetupProps) => {
        const arrayFromOne = (to: number) => {
        return Array.from({length: to}, (_, index) => index + 1)
    }

    return (
        <div className="dropdown">
          <button className="dropdown-button">{props.numberOfTeams}</button>
              <div className="dropdown-content">
              {arrayFromOne(8).map( num => <button key={num} className="dropdown-content-button" onClick={() => props.onNumTeamsDropdownChanged(num)}>{num}</button>)}
              </div>
        </div>)
}

export default TeamSetup