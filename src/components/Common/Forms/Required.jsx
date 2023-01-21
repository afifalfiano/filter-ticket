function Required({...props}) {
    return (
        <div className="label text-red-500 pb-0 text-xs">
            {props.errors}
        </div>
    )
}

export default Required;