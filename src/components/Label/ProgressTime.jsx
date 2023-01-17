
function ProgressTime({...props }) {
    return (
        <>
            <p>
                Dibuat:
                {new Date(props.item.created_at).toLocaleString('id-ID')}
            </p>
            <p>
                Diubah:
                {props.item.balasan.length > 0
                    ? new Date(
                        props.item.balasan[
                            props.item.balasan.length - 1
                        ].created_at
                    ).toLocaleString('id-ID')
                    : new Date(props.item.created_at).toLocaleString(
                        'id-ID'
                    )}
            </p></>

    )
}

export default ProgressTime;