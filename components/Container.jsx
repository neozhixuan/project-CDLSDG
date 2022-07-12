export const Container = (props) => {
    return(
        <div className={`mt-10 mx-auto ${props.className}`}>
            {props.children}
        </div>
    )
}