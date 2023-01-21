import { HiDocumentText } from "react-icons/hi";


function FirstComplain({...props}) {
    return (
        <div className='flex justify-center items-center mt-3 gap-0 md:gap-5'>
        <div className='w-1/12 hidden lg:flex items-center justify-center ml-2'>
          <div className="avatar">
            <div className={`w-16 rounded-full ring ${props.detailComplain?.user?.aktif ? 'ring-green-400' : 'ring-red-400'} ring-offset-base-100 ring-offset-2`}>
              <img fetchpriority="high" width={'100%'} height={'100%'} src={props.detailComplain?.user?.avatar} alt={props.detailComplain?.user?.name} />
            </div>
          </div>
        </div>
        <div className="w-12/12 lg:w-11/12 w-full">
          <p className="justify-start w-full font-semibold">Keluhan Awal</p>
          <div className="flex flex-col lg:flex-row lg:justify-between py-2">
            <p>
              Dibuat oleh:
              {props.detailComplain?.user?.aktif && <span className='pl-1 font-semibold'>{props.detailComplain?.user?.name} ({props.detailComplain?.user?.role?.role})</span>}
              {!props.detailComplain?.user?.aktif && <span className="pl-1 text-red-600 font-semibold">{props.detailComplain?.user?.name} ({props.detailComplain?.user?.role?.role})</span>}
            </p>
            <p>
              {new Date(props.detailComplain?.created_at).toLocaleString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour12: false,
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
              })}
            </p>
          </div>
          <div className="form-control">
            <div dangerouslySetInnerHTML={{ __html: props.detailComplain?.keluhan }} className={`textarea resize-none bg-gray-100 h-auto`} />
          </div>
          <div className="py-2">
            {props.detailComplain?.lampirankeluhan?.map((file, index) => {
              if (+file.keluhan_id === props.detailComplain?.id_keluhan) {
                return (
                  <a key={index} className="link inline" href={file.path} target="_blank" rel="noreferrer">
                    <HiDocumentText size={24} color="blue" className="inline mr-2" /> Lampiran File
                  </a>
                )
              }
            })}
          </div>
        </div>
      </div>
    )
}

export default FirstComplain;