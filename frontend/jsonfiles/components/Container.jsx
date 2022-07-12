export const Container = (props) => {
    return(
        <div className={`mx-auto mt-20 ${props.className}`}>
            {props.children}
        </div>
    )
}