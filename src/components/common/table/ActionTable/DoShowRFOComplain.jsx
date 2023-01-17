import { HiOutlineClipboardCheck, HiTrash } from "react-icons/hi"


function DoShowRFOComplain({...props}) {
    return (
      <div className="tooltip" data-tip="RFO Keluhan">
      <HiOutlineClipboardCheck
        size={20}
        color="#065F46"
        className="cursor-pointer"
        onClick={() => props.onClick()}
      />
    </div>
    )
}


export default DoShowRFOComplain