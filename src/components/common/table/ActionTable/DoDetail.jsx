import { HiEye } from "react-icons/hi"


function DoDetail({...props}) {
    return (
      <div className="tooltip" data-tip="Detail">
      <HiEye
        size={20}
        color="#0D68F1"
        className="cursor-pointer"
        onClick={() => props.onClick()}
      />
    </div>
    )
}


export default DoDetail