import React, { useState } from "react"
import AddNameComponent from "./AddNameComponent"
import "./app.scss"
import NamesComponent from "./NamesComponent"
import QuickAddComponent from "./QuickAddComponent"
import ShuffleControlsComponent from "./ShuffleControlsComponent"

interface AppState {
  currentNameInput: string
  quickAddSelected: boolean
  currentNames: string[]
  quickAddNames: string[]
  numberOfTeams: number
}

//Need to set initial state based on persistent data
const initialState: AppState = {
  currentNameInput: "",
  quickAddSelected: false,
  currentNames: [],
  quickAddNames: [],
  numberOfTeams: 2
}

const App: React.FC = () => {

  const [state, setState] = useState(initialState)

  function onAdd() {
    if (state.quickAddSelected) {
      const newQuickAddArray = [...state.quickAddNames, state.currentNameInput]
      setState({...state, quickAddNames: newQuickAddArray, currentNameInput: ""})
    } else {
      const newNamesArray = [...state.currentNames, state.currentNameInput]
      setState({...state, currentNames: newNamesArray, currentNameInput: ""})
    }
  }

  function onNameInputChanged(nameInput: string) {
    //String validation - Also check that same name isn't added
    setState({...state, currentNameInput: nameInput})
  }

  function quickAddToggled() {
    const currentValue = state.quickAddSelected
    setState({...state, quickAddSelected: !currentValue})
  }

  function removeFromQuickAdd(name: string) {
    //Should be persistent
    const newQuickAddNames = state.quickAddNames.filter( n => n !== name)
    setState({...state, quickAddNames: newQuickAddNames})
  }

  function quickAdd(name: string) {
    //Should be persistent
    const newNames = [...state.currentNames, name]
    setState({...state, currentNames: newNames})
  }

  function onRemove(name: string) {
    const newNames = state.currentNames.filter( n => n !== name )
    setState({...state, currentNames: newNames})
  }

  function shuffle() {

  }

  function numberOfTeamsChanged(number: number) {

  }

  function copyToClipboard() {

  }

  function clearAll() {

  }

  function newRandomTeamNames() {

  }

  function setDefaultTeamNames() {

  }

  return( 
  <div>
    <h1>Team Generator</h1>

    <AddNameComponent 
    onAdd={onAdd} 
    currentNameInput={state.currentNameInput} 
    onNameInputChanged={onNameInputChanged} 
    quickAddSelected={state.quickAddSelected} 
    quickAddToggled={quickAddToggled} ></AddNameComponent>

    <QuickAddComponent 
    names={state.quickAddNames} 
    removeFromQuickAddFunction={removeFromQuickAdd} 
    quickAdd={quickAdd}></QuickAddComponent>

    <NamesComponent 
    names={state.currentNames} 
    removeNameFunction={onRemove}></NamesComponent>

    <ShuffleControlsComponent 
    shuffleFunction={shuffle} 
    numberOfTeams={state.numberOfTeams} 
    numberOfTeamsChanged={numberOfTeamsChanged} 
    copyFunction={copyToClipboard} 
    clearFunction={clearAll} 
    newTeamNamesFunction={newRandomTeamNames} 
    defaultTeamNamesFunction={setDefaultTeamNames}></ShuffleControlsComponent>
    
    </div>
)}

export default App;