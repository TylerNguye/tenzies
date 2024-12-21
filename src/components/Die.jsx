export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "White"
    }
    return (
        <button style={styles} onClick={props.hold} className={"die"}>{props.value}</button>
    )
}