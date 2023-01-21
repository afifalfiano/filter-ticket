

function ButtonIconExit({...props}) {
    return (
        <button
        type={props.type}
        className="btn btn-sm btn-circle absolute right-2 top-2"
        onClick={() => props.onClick()}
      >
        ✕
      </button>
    )
}

export default ButtonIconExit;