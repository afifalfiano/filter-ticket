import { HiCheckCircle, HiTrash } from "react-icons/hi"


function DoActivate({...props}) {
    return (
      <div className="tooltip" data-tip="Aktifkan">
      <HiCheckCircle
        size={20}
        color="#36D399"
        className="cursor-pointer"
        onClick={() => props.onClick()}
      />
    </div>
    )
}

export default DoActivate