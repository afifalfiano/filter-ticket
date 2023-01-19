import { HiPencilAlt } from "react-icons/hi";


function PreviewProfile({ ...props }) {
  return (
    <div className="flex items-start justify-center">
      <div className="text-center">
        <div className="avatar">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
            <span className="text-3xl">
              <img width={'100%'} height={'100%'} src={props.profile?.avatar} alt={props.profile?.name} />
            </span>
          </div>
        </div>
        <h1 className="font-semibold text-xl mt-5">{props.profile?.name}</h1>
        <div className="my-5 flex justify-center">
          <div className="border-gray-200 rounded-md border-2 w-80 h-48 items-center flex-row justify-center">
            <div className="flex pt-1 px-1 justify-end">
              <HiPencilAlt
                size={30}
                className="link"
                onClick={props.handleUpdateProfile}
              />
            </div>
            <div className="px-5 py-5">
              <table className="border-none items-center w-full font-semibold">
                <tbody>
                  <tr className="text-left">
                    <td>Email</td>
                    <td>:</td>
                    <td>{props.profile?.email}</td>
                  </tr>
                  <tr className="text-left">
                    <td>Role</td>
                    <td>:</td>
                    <td>{props.profile?.role?.role}</td>
                  </tr>
                  <tr className="text-left">
                    <td>POP</td>
                    <td>:</td>
                    <td>{props.profile?.pop?.pop}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewProfile