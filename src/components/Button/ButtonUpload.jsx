

function ButtonUpload({...props}) {
    return (
        <label
        htmlFor="dropzone-file"
        className="btn  btn-block md:w-32 btn-md bg-slate-500 text-white cursor-pointer border-none "
      > Unggah
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={props.onChange}
        />
      </label>
    )
}

export default ButtonUpload;