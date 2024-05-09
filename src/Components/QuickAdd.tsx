export interface QuickAddProps {
    names: string[]
    removeFromQuickAddFunction: (name: string) => void
    quickAdd: (name: string) => void
    editButtonFunction: () => void
    editIsActive: boolean
    quickAddButtonPressedFunction: () => void
    onQuickAddInputChanged: (name: string) => void
    currentQuickAddInput: string
    error: string | null
}

const QuickAdd = (props: QuickAddProps) => {

      const handleKeyboardInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.quickAddButtonPressedFunction()
        }
    }

  return (
      <>
        <div id="quick-add-header">
          <div className="name-input">
            {!props.editIsActive && <h2>QUICK ADD</h2>}
            {props.error && <div className="error-popup">{props.error}</div>}
            {props.editIsActive && 
              <input 
              autoFocus
              type="text"
              placeholder="NAME"
              value={props.currentQuickAddInput}
              onChange={(e) => props.onQuickAddInputChanged(e.target.value)}
              onKeyDown={ e => handleKeyboardInput(e)}
              />
            }
            {props.editIsActive &&
             <button className="action-button"
             onClick={() => props.quickAddButtonPressedFunction()}
             >ADD</button>}
          </div>
          <button className="action-button" onClick={() => props.editButtonFunction()}>{props.editIsActive ? "DONE" : "EDIT"}</button>
        </div>
        <div id="quick-add-names">
          {props.names.length === 0 && <h3>NO SAVED NAMES</h3>}
          {props.names.sort().map( name => 
          <div key={name} className={props.editIsActive ? "selectable-name wiggle" : "selectable-name"}>
            <span onClick={ e => props.quickAdd(name)}>{name}</span>
            {props.editIsActive && <button className="quick-add-delete-button" onClick={ e => props.removeFromQuickAddFunction(name)}></button>}
          </div>
          )}
        </div>
      </>
    )
}

export default QuickAdd