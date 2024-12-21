import { useState } from 'react'
import Die from './Die'

export default function App() {
    const [dice, setDice] = useState(generateAllNewDice());

    function rollDice() {
        setDice(generateAllNewDice);
    }

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => Math.ceil(Math.random() * 6))
    }

    const diceElements = dice.map(num => <Die value={num}/>)

    return (
        <main>
            <div id="diceDiv">
                {diceElements}
            </div>
            <button onClick={rollDice} id="rollBtn">Roll</button>
        </main>
    )
}