import { HiCheckCircle, HiOutlineBan, HiTrash } from "react-icons/hi"


function DoDeactivate({ ...props }) {
    return (
        <div className="tooltip" data-tip="Non aktifkan">
            <HiOutlineBan
                className="cursor-pointer"
                size={20}
                color="#F87272"
                onClick={() => props.onClick()}
            />
        </div>
    )
}

export default DoDeactivate