import { HiOutlineRefresh} from "react-icons/hi"


function DoRollbackStatus({...props}) {
    return (
      <div className="tooltip" data-tip="Kembalikan Status Open">
      <HiOutlineRefresh
        size={20}
        color="#D98200"
        className="cursor-pointer"
        onClick={() => props.onClick()}
      />
    </div>
    )
}


export default DoRollbackStatus