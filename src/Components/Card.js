import React from 'react';

const Card = (props) => {

    const cardClick = () => {
        if(props.cardsOn){
            props.cardFlip(props.cardNum, props.picNum)
        }
    }
    
    const card = props.pairsArr.includes(props.cardNum) ? "card disappear" : "card";
    const cardCover = props.card1 === props.cardNum || props.card2 === props.cardNum ? "cardCover disappear" : "cardCover"
    
    return(
        <div className={card}  onClick={()=>cardClick()}>
            <div className={cardCover}>
                <img className="cardCoverImg" src={props.altUrl} alt="question mark"></img>
            </div>
            <img className="cardPic" src={props.url} alt="Memory Game Card"></img>
            <p id="credit">{props.credit}</p>
        </div>
    )
}
export default Card;

