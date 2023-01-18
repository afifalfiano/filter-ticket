

function ComplainEffect({ ...props }) {
    return (
        <div key={props.key} className="border-2 border-gray-100 rounded-md mt-3 p-3">
            <div className="props.item?s-center w-full flex">
                <div className="w-4/12">
                    <p>Pelanggan</p>
                    <p>Kontak</p>
                    <p>Sumber Keluhan</p>
                    <p>Keluhan</p>
                </div>
                <div className="w-1/12">
                    <p className="p-0">:</p>
                    <p className="p-0">:</p>
                    <p className="p-0">:</p>
                    <p className="p-0">:</p>
                </div>
                <div className="w-7/12">
                    <p>{props.item?.id_pelanggan} - {props.item?.nama_pelanggan}</p>
                    <p>{props.item?.nama_pelapor} - {props.item?.nomor_pelapor}</p>
                    <p>{props.item?.sumber.sumber} - {props.item?.detail_sumber}</p>
                    <p>
                        <div dangerouslySetInnerHTML={{ __html: props.item?.keluhan }} className="!inline"></div>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ComplainEffect;