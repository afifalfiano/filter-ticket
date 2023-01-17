
function LabelStatus({...props}) {
    return (
        <>
          {props?.status === 'open' ? (
            <span className="badge badge-accent text-white">
              {props?.status}
            </span>
          ) : (
            <span className="badge badge-info text-white">
              {props?.status}
            </span>
          )}
        </>
    );
}

export default LabelStatus;