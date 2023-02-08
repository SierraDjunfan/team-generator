interface QuickAddProps {
    names: string[]
    removeFromQuickAddFunction: (name: string) => void
    quickAdd: (name: string) => void
}

const QuickAddComponent = (props: QuickAddProps) => {

  return (
    <div>
        {props.names.map( name => 
        <div>
        <span onClick={ e => props.quickAdd(name)}>{name}</span>
        <button onClick={ e => props.removeFromQuickAddFunction(name)}>X</button>
        </div>
        )}
    </div>
  )
}

export default QuickAddComponent