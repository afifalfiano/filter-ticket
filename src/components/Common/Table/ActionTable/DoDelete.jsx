import { HiTrash } from "react-icons/hi"


function DoDelete({...props}) {
    return (
      <div className="tooltip" data-tip="Hapus">
      <HiTrash
        size={20}
        color="#FF2E00"
        className="cursor-pointer"
        onClick={() => props.onClick()}
      />
    </div>
    )
}


export default DoDelete