import { HiEye, HiOutlineClipboardList } from "react-icons/hi"


function DoShowRFOTrouble({...props}) {
    return (
      <div className="tooltip" data-tip="RFO Gangguan">
      <HiOutlineClipboardList
        size={20}
        color="#0007A3"
        className="cursor-pointer"
        onClick={() => props.onClick()}
      />
    </div>
    )
}


export default DoShowRFOTrouble