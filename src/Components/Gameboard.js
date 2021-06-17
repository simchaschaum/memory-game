import React, {useState} from 'react';
import reactDom from 'react-dom';
import ReactDOM from 'react-dom';
import Card from './Card';
import Button from '@material-ui/core/Button';

const Gameboard = (props) => {
    const openingScreen = () => {
        if(window.confirm(`Are you sure you want to reset the game?`)){
            props.openingScreen();
        }
    }

    return(
        <div>
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
            <div id="score">
                <h2>{props.score1} Matches</h2>
            </div>
            <Button variant="contained" className="newGame" onClick={() => openingScreen()}>Reset Game</Button>
        </div>
        )
    }
 
export default Gameboard;