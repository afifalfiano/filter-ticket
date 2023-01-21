import { ClipLoader } from "react-spinners";

function LoaderGetData() {
    return (
        <div className="fixed bottom-5 right-5 w-52 min-w-min bg-slate-500 rounded-md shadow-md drop-shadow-md">
        <div className="flex flex-row justify-between items-center p-4">
          <ClipLoader
            color="#1ffff0"
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <p className="font-semibold text-white">Data Diperbarui</p>
        </div>
      </div>
    )
}

export default LoaderGetData;