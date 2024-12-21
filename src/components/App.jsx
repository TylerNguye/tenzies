import { useState, useEffect, useRef } from 'react'
import Die from './Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice());
    const buttonRef = useRef(null)
    const gameWon = dice.every(die => die.isHeld && dice[0].value === die.value);

    useEffect(() => {
        buttonRef.current.focus()
    }, [gameWon])

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
        if (!gameWon) {
            setDice(oldDice => {
                return oldDice.map(die => die.isHeld ? die : {...die, value: rollDie()});
            });
        }
        else {
            return setDice(generateAllNewDice());
        }
    }

    function hold(id) {
        setDice(dice => {
            return dice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die)
        })
    }

    const diceElements = dice.map(die => <Die hold={() => {hold(die.id)}} key={die.id} value={die.value} isHeld={die.isHeld}/>)

    return (
        <main>
            {gameWon && <Confetti />}
            <div aria-label="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div id="diceDiv">
                {diceElements}
            </div>
            <button ref={buttonRef} onClick={rollDice} id="rollBtn">{gameWon ? "New Game" : "Roll"}</button>
        </main>
    )
}