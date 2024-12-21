export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "White"
    }
    return (
        <button
            style={styles}
            onClick={props.hold} 
            className={"die"}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}
        >{props.value}</button>
    )
}