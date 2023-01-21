import { HiOutlinePrinter, HiTrash } from "react-icons/hi"


function DoPrint({...props}) {
    return (
      <div className="tooltip" data-tip="Hapus">
      <HiOutlinePrinter
        size={20}
        color="#0D68F1"
        className="cursor-pointer"
        onClick={(e) => props.onClick(e)}
      />
    </div>
    )
}


export default DoPrint