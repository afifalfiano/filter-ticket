import { HiDocumentText } from "react-icons/hi";

function Progress({...props}) {

    return (
        <div key={props.key} className="my-5">
              <div className='flex justify-center items-center gap-0 md:gap-5'>
              <div className='w-1/12 hidden lg:flex  items-center justify-center ml-2'>
              <div className="avatar">
              <div className={`w-16 rounded-full ring ${props.item?.user?.aktif ? 'ring-green-400' : 'ring-red-600'} ring-offset-base-100 ring-offset-2`}>
                    <img width={'100%'} height={'100%'} src={props.item?.user?.avatar} alt={props.item?.user?.name}/>
                    {/* <img src="https://placeimg.com/192/192/people" /> */}
                  </div>
                </div>
              </div>
              <div className="w-12/12 lg:w-11/12 w-full">
              <div className="flex flex-col lg:flex-row lg:justify-between py-2">
                <p>Balasan pesan: 
                  {props.item?.user?.aktif && <span className='pl-1 font-semibold'>{props.item?.user?.name} ({props.item?.user?.role?.role})</span>} 
                  {!props.item?.user?.aktif && <span className="pl-1 text-red-600 font-semibold">{props.item?.user?.name} ({props.item?.user?.role?.role})</span>} 
                </p>
                <p>
                  {new Date(props.item?.created_at).toLocaleString('id-ID', {
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
                  <div dangerouslySetInnerHTML={{__html: props.item?.balasan}} className={`textarea resize-none bg-gray-100 h-auto`}/>
              </div>
              <div className="py-2">
                {props.item?.lampiranbalasan?.map((file, index) => {
                  if (+file.balasan_id === +props.item.id_balasan) {
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
              <hr />
            </div>
    )
}


export default Progress;