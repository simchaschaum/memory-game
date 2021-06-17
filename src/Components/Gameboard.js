import React, {useState} from 'react';
import reactDom from 'react-dom';
import ReactDOM from 'react-dom';
import Card from './Card';
import Button from '@material-ui/core/Button';

const Gameboard = (props) => {
    const resetGame = () => {
        if(window.confirm(`Are you sure you want to reset the game?`)){
            props.openingScreen();
        }
    }

    const matches1 = props.scores[0] === 1 ? "Match" : "Matches";
    const matches2 = props.scores[1] === 1 ? "Match" : "Matches";

    const score = props.players === 1 ? 
        <div>
            <h2>{props.scores[0]} {matches1}</h2>
        </div> 
        : 
        <div>
            <h2>Player {props.currentPlayer}'s Turn!</h2>
            <h3>Player 1: {props.scores[0]} {matches1}</h3>
            <h3>Player 2: {props.scores[1]} {matches2}</h3>
        </div>

    return(
        <div>
            <div id="score">
                {score}
            </div>
            <Button variant="contained" className="newGame" onClick={() => resetGame()}>Reset Game</Button>
            <div className="gameBoard">
                {props.picsArr.map((card,index)=> (
                    <div>
                        <Card 
                            picNum = {card.picNum}
                            cardNum = {index}
                            altUrl = {card.altUrl}
                            url = {card.url}
                            credit = {card.credit}
                            gameOn = {props.gameOn}
                            cardFlip = {(cardNum, picNum)=>props.cardFlip(cardNum, picNum)}
                            card1 = {props.card1}
                            card2 = {props.card2}
                            cardsOn = {props.cardsOn}
                            pairsArr = {props.pairsArr}
                        />
                    </div>
                ))}
            </div>
        </div>
        )
    }
 
export default Gameboard;