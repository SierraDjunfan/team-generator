interface NameProps {
    names: string[]
    removeNameFunction: (name: string) => void
}

const NamesComponent = (props: NameProps) => {

  return (
    <div>
        {props.names.map( name => 
        <div>
        <button onClick={ e => props.removeNameFunction(name)}>X</button>
        <span>{name}</span>
        </div>
        )}
    </div>
  )
}

export default NamesComponent