

export interface NameEntryProps {
  onAdd: () => void
  currentNameInput: string
  onNameInputChanged: (nameInput: string) => void
  clearFunction: () => void
  error: string | null
}

const NameEntry = (props: NameEntryProps) => {

    const handleKeyboardInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.onAdd()
        }
    }

  return (
    <div className="name-input">
      {props.error && <div className="error-popup">{props.error}</div>}
      <input type="text" placeholder="ADD NAME" value={props.currentNameInput} onChange={(e) => props.onNameInputChanged(e.target.value)} onKeyDown={ e => handleKeyboardInput(e)}/>
      <button className="action-button" onClick={e => props.onAdd()}>ADD</button>
      <button className="action-button" onClick={ e => props.clearFunction()}>Clear</button>
    </div>
  )
}

export default NameEntry