import React, { useState } from "react";

interface AddNameProps {
  onAdd: () => void
  currentNameInput: string
  onNameInputChanged: (nameInput: string) => void
  quickAddSelected: boolean
  quickAddToggled: () => void
}

const AddNameComponent = (props: AddNameProps) => {

    const handleKeyboardInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.onAdd()
        }
    }

    const getPlaceholderText = () => {
      if (props.quickAddSelected) {
        return "Save Name to Quick Add"
      } else {
        return "Add Name"
      }
    }

  return (
    <div>
      <input type="text" placeholder={getPlaceholderText()} value={props.currentNameInput} onChange={(e) => props.onNameInputChanged(e.target.value)} onKeyDown={ e => handleKeyboardInput(e)}/>
      <button onClick={e => props.onAdd()}>Add</button>
      <label className="switch">
      <input type="checkbox" checked={props.quickAddSelected} onChange={(e) => props.quickAddToggled()}></input>
      <span className="slider round"></span>
      </label>
    </div>
  )
}

export default AddNameComponent