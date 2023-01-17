

function SelectStatusComplain({ ...props }) {
    return (
        <>
            <label htmlFor="location" className="label font-semibold">
                <span className="label-text"> Status Keluhan</span>
            </label>

            <select
                className="select w-full max-w-full input-bordered"
                onChange={props.handlePOP}
                defaultValue={'open'}
            >
                <option value="open" label="Open Case">Open Case</option>
                <option value="closed" label="Closed Case">Closed Case</option>
            </select>
        </>
    )
}


export default SelectStatusComplain;