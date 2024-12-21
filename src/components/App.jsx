import { useState } from 'react'
import Die from './Die'
import {nanoid} from 'nanoid'

export default function App() {
    const [dice, setDice] = useState(generateAllNewDice());

    function rollDie() {
        return Math.ceil(Math.random() * 6);
    }

    function generateAllNewDice() {
        return new Array(10)
            .fill({})
            .map(() => ({
                value: rollDie(),
                isHeld: false,
                id: nanoid()
            }));
    }

    function rollDice() {
        const newDice = generateAllNewDice();
        setDice(oldDice => {
            return oldDice.map(die => die.isHeld ? die : {...die, value: rollDie()});
        });
    }

    function hold(id) {
        setDice(dice => {
            return dice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die)
        })
    }

    const diceElements = dice.map(die => <Die hold={() => {hold(die.id)}} key={die.id} value={die.value} isHeld={die.isHeld}/>)

    return (
        <main>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div id="diceDiv">
                {diceElements}
            </div>
            <button onClick={rollDice} id="rollBtn">Roll</button>
        </main>
    )
}