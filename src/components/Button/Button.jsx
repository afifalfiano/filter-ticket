
function Button({ ...props }) {
    return (
        <button type={props.type} style={props.style} className={`btn btn-md sm:btn-md md:btn-md lg:btn-md  w-32 ${props.className}`} onClick={props.onClick}>{props.children}</button>
    )
}

export default Button;