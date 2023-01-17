
function LabelStatusPOP({...props}) {
    return (
        <>
        {props.status === 'Yogyakarta' ? (
            <span className="badge badge-success text-white">
              {props.status}
            </span>
          ) : props.status === 'Solo' ? (
            <span className="badge badge-warning text-white">
              {props.status}
            </span>
          ) : props.status === 'Purwokerto' ? (
            <span className="badge badge-info text-white">
              {props.status}
            </span>
          ) : (
            <span className="badge text-white">
              {props.status}
            </span>
          )}
        </>
    );
}

export default LabelStatusPOP;