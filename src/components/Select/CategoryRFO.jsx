

function CategoryRFO({...props}) {
    return (
        <>
        <label htmlFor="location" className="label font-semibold">
        <span className="label-text"> Jenis RFO</span>
        </label>

        <select
          className="select w-full max-w-full input-bordered"
          defaultValue={props.defaultValue}
          disabled
        >
          <option disabled>Pilih Status</option>
          {props.data}
        </select>
        </>
    )
}

export default CategoryRFO;