import "./app.scss"
import { useEffect, useState } from "react"
import NameEntry, { NameEntryProps } from "./NameEntry"
import NameList, { NameListProps } from "./NameList"
import QuickAdd, { QuickAddProps } from "./QuickAdd"
import ShuffleControls, { ShuffleControlsProps } from "./ShuffleControls"
import TeamSetup, { TeamSetupProps } from "./TeamSetup"
import TeamNaming, { TeamNamingProps } from "./TeamNaming"
import TeamDisplay from "./TeamDisplay"
import * as resources from "../Utilities/resources"
import { TeamNameType, NameCollectionType, TextInputErrorType, Team } from "../Types/customTypes"

interface AppState {
  nameInput: string
  quickAddNameInput: string
  names: string[]
  quickAddNames: string[]
  numberOfTeams: number
  teams: Team[]
  quickAddEditIsEnabled: boolean
  teamNameType: TeamNameType
  quickAddError: string | null
  nameSelectionError: string | null
}

const initialState: AppState = {
  nameInput: "",
  names: [],
  quickAddNames: [],
  numberOfTeams: 2,
  teams: [],
  quickAddEditIsEnabled: false,
  quickAddNameInput: "",
  teamNameType: TeamNameType.Default,
  quickAddError: null,
  nameSelectionError: null
}

const App = () => {

  const [state, setState] = useState(initialState)

  useEffect(() => {
    const loadedNames = loadNamesFromLocalStorage()
    setState(state => ({ ...state, quickAddNames: loadedNames }))
  }, [])

  const errorTimeoutInMiliseconds = 1500
  const textValidationErrorMessages = {
    empty: "Cannot be blank",
    duplicate: "Name already added"
  }

  const loadNamesFromLocalStorage = (): string[] => {
    const quickAddNames = localStorage.getItem('quickAddNames')
    return quickAddNames ? JSON.parse(quickAddNames) : []
  }

  function onNumberOfTeamsDropdownChanged(number: number) {
    setState({ ...state, numberOfTeams: number, teams: [] })
  }

  function onDefaultTeamNamesButtonPressed() {
    setState({ ...state, teamNameType: TeamNameType.Default })
  }

  function onRandomTeamNamesButtonPressed() {
    setState({ ...state, teamNameType: TeamNameType.Random })
  }

  function onQuickAddEditToggled() {
    const currentState = state.quickAddEditIsEnabled
    setState({ ...state, quickAddEditIsEnabled: !currentState })
  }

  function endQuickAddEditing() {
    setState({ ...state, quickAddEditIsEnabled: false })
  }

  function showTextValidationError(input: NameCollectionType, errorType: TextInputErrorType) {
    const errorMessage = errorType === TextInputErrorType.Duplicate ? textValidationErrorMessages.duplicate : textValidationErrorMessages.empty
    setState({ ...state, [input === NameCollectionType.QuickAdd ? "quickAddError" : "nameSelectionError"]: errorMessage })
    setTimeout(() => {
      setState({ ...state, [input === NameCollectionType.QuickAdd ? "quickAddError" : "nameSelectionError"]: null })
    }, errorTimeoutInMiliseconds)
  }

  const saveQuickAddNamesToLocalStorage = (quickAddNames: string[]) => {
    localStorage.setItem('quickAddNames', JSON.stringify(quickAddNames))
  }

  function onQuickAddInputChanged(nameInput: string) {
    setState({ ...state, quickAddNameInput: nameInput })
  }

  function onQuickAddDeleteButtonPressed(name: string) {
    const newQuickAddNames = state.quickAddNames.filter(n => n !== name)
    setState({ ...state, quickAddNames: newQuickAddNames })
    saveQuickAddNamesToLocalStorage(newQuickAddNames)
  }

  function onQuickAddButtonPressed() {
    if (state.quickAddNameInput === "") {
      endQuickAddEditing()
    } else if (nameIsEmpty(state.quickAddNameInput)) {
      showTextValidationError(NameCollectionType.QuickAdd, TextInputErrorType.Empty)
    } else if (nameExistsInCollection(state.quickAddNameInput, NameCollectionType.QuickAdd)) {
      showTextValidationError(NameCollectionType.QuickAdd, TextInputErrorType.Duplicate)
    } else {
      const newQuickAddNames = [...state.quickAddNames, state.quickAddNameInput.trim()]
      setState({ ...state, quickAddNames: newQuickAddNames, quickAddNameInput: "", quickAddError: null })
      saveQuickAddNamesToLocalStorage(newQuickAddNames)
    }
  }

  function onQuickAddNamePressed(name: string) {

    if (nameExistsInCollection(name, NameCollectionType.Selection)) {
      showTextValidationError(NameCollectionType.QuickAdd, TextInputErrorType.Duplicate)
    } else {
      const newSelectedNames = [...state.names, name]
      setState({ ...state, names: newSelectedNames })
    }
  }

  function onNameInputChanged(nameInput: string) {
    setState({ ...state, nameInput: nameInput })
  }

  function onDeleteFromSelectionButtonPressed(name: string) {
    const newNames = state.names.filter(n => n !== name)
    setState({ ...state, names: newNames })
  }

  function onAdd() {

    if (nameIsEmpty(state.nameInput)) {
      showTextValidationError(NameCollectionType.Selection, TextInputErrorType.Empty)
    } else if (nameExistsInCollection(state.nameInput, NameCollectionType.Selection)) {
      showTextValidationError(NameCollectionType.Selection, TextInputErrorType.Duplicate)
    } else {
      const newSelectedNames = [...state.names, state.nameInput.trim()]
      setState({ ...state, names: newSelectedNames, nameInput: "", nameSelectionError: null })

    }
  }

  function nameExistsInCollection(name: string, collectionType: NameCollectionType) {
    return collectionType === NameCollectionType.QuickAdd ? state.quickAddNames.includes(name) : state.names.includes(name)
  }

  function nameIsEmpty(name: string) {
    return !(name.trim().length > 0)
  }

  function randomiseArrayOrder(arr: string[]) {
    const arrayToSort = [...arr]
    return arrayToSort.sort(() => Math.random() - 0.5)
  }

  function separateIntoArrays(array: string[], numArrays: number): string[][] {
    const totalItems = array.length;
    const baseSize = Math.floor(totalItems / numArrays);
    const remainder = totalItems % numArrays;

    return Array.from({ length: numArrays }, (_, i) => {
      const start = i * baseSize + Math.min(i, remainder);
      const end = start + baseSize + (i < remainder ? 1 : 0);
      return array.slice(start, end);
    });
  }

  function shuffleTeams() {
    const allRandomTeamNames = randomiseArrayOrder(resources.allTeamNames)
    const namesInRandomOrder = randomiseArrayOrder(state.names)
    const separated = separateIntoArrays(namesInRandomOrder, state.numberOfTeams)
    const asTeams = separated.map((team, i) => ({
      teamName: state.teams && state.teams.length === state.numberOfTeams
        ? state.teams[i].teamName
        : state.teamNameType === TeamNameType.Default ? `Team ${(i + 1).toString()}` : allRandomTeamNames[i],
      teamMembers: team
    }))
    setState({ ...state, teams: asTeams })
  }

  const copyToClipboard = () => {
    const formattedText = state.teams.map(team => {
      const capitalizedMembers = team.teamMembers.map(resources.capitalizeName).join(', ')
      return `${team.teamName.toUpperCase()}\n ----------\n${capitalizedMembers}\n`
    }).join('\n')

    navigator.clipboard.writeText(formattedText)
      .then(() => alert('Copied to clipboard!')) //TODO - Custom Alert
      .catch(err => console.error('Failed to copy: ', err)); //TODO - Custom Alert
  }

  function clearAll() {
    setState({ ...state, nameInput: "", names: [], numberOfTeams: 2, teams: [] })
  }

  function newRandomTeamNames() {
    const arrayToShuffle = [...resources.allTeamNames]
    const shuffledTeamNames = randomiseArrayOrder(arrayToShuffle)
    const newTeams = state.teams.map((team, i) => ({ teamName: shuffledTeamNames[i], teamMembers: team.teamMembers }))
    setState({ ...state, teams: newTeams })
  }

  //PROPS

  const teamSetupProps = (): TeamSetupProps => {
    return {
      numberOfTeams: state.numberOfTeams,
      onNumTeamsDropdownChanged: onNumberOfTeamsDropdownChanged
    }
  }

  const teamNamingProps = (): TeamNamingProps => {
    return {
      randomTeamNamesWasSelected: onRandomTeamNamesButtonPressed,
      defaultTeamNamesWasSelected: onDefaultTeamNamesButtonPressed,
      nameSelectionType: state.teamNameType
    }
  }

  const quickAddProps = (): QuickAddProps => {
    return {
      names: state.quickAddNames,
      removeFromQuickAddFunction: onQuickAddDeleteButtonPressed,
      quickAdd: onQuickAddNamePressed,
      editButtonFunction: onQuickAddEditToggled,
      editIsActive: state.quickAddEditIsEnabled,
      quickAddButtonPressedFunction: onQuickAddButtonPressed,
      onQuickAddInputChanged: onQuickAddInputChanged,
      currentQuickAddInput: state.quickAddNameInput,
      error: state.quickAddError
    }
  }

  const nameEntryProps = (): NameEntryProps => {
    return {
      onAdd: onAdd,
      currentNameInput: state.nameInput,
      onNameInputChanged: onNameInputChanged,
      clearFunction: clearAll,
      error: state.nameSelectionError
    }
  }

  const nameListProps = (): NameListProps => {
    return {
      names: state.names,
      removeNameFunction: onDeleteFromSelectionButtonPressed
    }
  }

  const shuffleControlsProps = (): ShuffleControlsProps => {
    return {
      shuffleFunction: shuffleTeams,
      copyFunction: copyToClipboard,
      newTeamNamesFunction: newRandomTeamNames,
      teamNameType: state.teamNameType
    }
  }

  return (
    <div id="app-container">
      <header id="app-header">
        <div>
          <h1>Team Splitter</h1>
        </div>
      </header>
      <main id="content-main">
        <section id="teams-setup">
          <div className="step-header">
            <h1>1/ SELECT NUMBER OF TEAMS</h1>
            <TeamSetup {...teamSetupProps()} />
          </div>
        </section>
        <section id="team-naming">
          <div className="step-header">
            <TeamNaming {...teamNamingProps()} />
          </div>
        </section>
        <section id="name-selection">
          <div className="step-header">
            <h1>3. SELECT NAMES</h1>
          </div>
          <div id="name-entry">
            <div id="quick-add">
              <QuickAdd {...quickAddProps()} />
            </div>
            <div id="names-list">
              <h2>SELECTED NAMES</h2>
              <NameEntry {...nameEntryProps()} />
              <NameList {...nameListProps()} />
            </div>
          </div>
        </section>
        <section id="teams-shuffle">
          <div className="step-header">
            <h1>4. GENERATE TEAMS</h1>
            <ShuffleControls {...shuffleControlsProps()} />
          </div>
          <TeamDisplay teams={state.teams} />
        </section>
      </main>
      <footer>
        <div className="footer-content">
          <p>Click<a target="_blank" href="https://sierradjunfan.github.io/portfolio/">here</a>for more apps by Sara Hayward</p>
        </div>
      </footer>
    </div>
  )
}

export default App
