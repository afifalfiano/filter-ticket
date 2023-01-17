

function SelectPOP({ ...props }) {
    return (
        <>
            <label htmlFor="location" className="label font-semibold">
                <span className="label-text"> POP</span>
            </label>

            <select
                className="select w-full max-w-full input-bordered"
                onChange={props.handlePOP}
            >
                <option value="all" label="Semua" defaultValue={'all'}>All</option>
                {props.dataPOP?.map((item, index) => (
                    <option key={index} value={item.id_pop} label={item.pop}>{item.pop}</option>
                ))}
            </select>
        </>
    )
}


export default SelectPOP;