import { HiPencil } from "react-icons/hi"


function DoUpdate({...props}) {
    return (
        <div className="tooltip" data-tip="Edit">
        <HiPencil
          className="cursor-pointer"
          size={20}
          color="#D98200"
          onClick={() => props.onClick()}
        />
      </div>
    )
}


export default DoUpdate