export interface NameListProps {
    names: string[]
    removeNameFunction: (name: string) => void
}

const NameList = (props: NameListProps) => {

  return (
    <div id="listed-names">
      {props.names.length === 0 && <h3>NO NAMES SELECTED</h3>}
        {props.names.map( name => 
        <div key={name} className="selectable-name">
          <span>{name}</span>
          <button onClick={ e => props.removeNameFunction(name)}></button>
        </div>
        )}
    </div>
  )
}

export default NameList