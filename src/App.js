import React from 'react';
import ReactDOM from 'react-dom';
import Gameboard from './Components/Gameboard';
import OpeningScreen from './Components/Openingscreen';
import './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      inputNum: 20, // the input value; will update when input is changed  
      cardsNum: 20, // Will be passed as props to Gameboard component
      gameOn: false,  // is the game on?? :)
      cardsOn: true, // able to click when true
      picsArr: [],  // will be populated with data of random pictures from fetch. 
      choice1: null,  // either the number of the first card chosen, or null
      card1: null,
      card2: null,
      scores: [0,0], // player(s) score(s)
      pairsArr: [], // array of card numbers of pairs that are now off the board
      players: 1, // how many players
      currentPlayer: 1 // for multi-player game
    }
  }

  // handles change for slider
  handleChange = (event, value) => {
    this.setState({inputNum: value})
  }

  // shuffles the array of picture data
  shuffle = (arr) => {
    for(var i = arr.length-1; i > 0; i--){
      let j = Math.floor(Math.random()*i+1);
      [arr[i],arr[j]] = [arr[j],arr[i]]
    }
    return arr;
  }
  // takes JSON data and creates neat array 
  makePicsArr = (arr) => {
    let picsArr = [];
    let url, num, credit;
    let counter = 1;
    for(var i=0; i<arr.length; i++){
      if(i % 2 === 0){
        num = counter
        url = arr[i].download_url;
        credit = `Credit: ${arr[i].author}, ${<a href="https://unsplash.com}">Unsplash</a>}`
      }  else {
        counter++
      }
      picsArr.push(
        {
          picNum: num,
          url: url,
          altUrl: "https://img.icons8.com/plasticine/100/000000/question-mark.png",
          credit: credit
        }
      )
    }
  return picsArr
  }
  // mid-game, if click 'new game,' brings you to opening screen:
  openOpeningScreen = () => {
    this.setState({gameOn: false})
  }

  // trigged when 'new game' button is clicked
  newGame = (playersNum) => {
    this.setState({pairsArr:[], gameOn: true, card1: null, card2: null, players: playersNum, currentPlayer: 1, scores: [0,0]});
    let inputNum = this.state.inputNum;
    let rand = Math.floor(Math.random()*10)
    fetch("https://picsum.photos/v2/list?page=" + rand + "&limit=" + inputNum)
    .then(response => response.json())
    .then(this.setState({cardsNum: this.state.inputNum}))
    .then(data=>{
      let picsArr = this.shuffle(this.makePicsArr(data));
      this.setState({picsArr: picsArr});
    })
    .then(()=>this.setState({gameOn: true}))
    .catch(error => console.log(error))
  }

  // triggered when card is flipped (starts in Card component)
  cardFlip = (cardNum, picNum) => {
    if(this.state.card1 !== 0 && !this.state.card1){   // CHECKING THAT IT'S NOT TRUTHY AND NOT ZERO - WORK??
      // If this is the first card chosen:
      this.setState({card1: cardNum, choice1: picNum})
    } else if(this.state.card1 !== cardNum){
      // If this is the second card chosen (and it's not identical to the first card)
      this.setState({card2: cardNum, cardsOn: false});
      if(picNum === this.state.choice1 && cardNum !== this.state.card1){
        // If it's a match - picNum and choice1 but cardNum does not equal card1 (so you can't just click the same card twice!)
        let scoresArr = this.state.scores;
        console.log(scoresArr[0])
        console.log(scoresArr[1])

        scoresArr[this.state.currentPlayer-1] = this.state.scores[this.state.currentPlayer-1] + 1;
        this.setState({scores: scoresArr}, ()=> {
          console.log(`we have a match! Your score is now ${this.state.scores[this.state.currentPlayer-1]}`);
          let arr = this.state.pairsArr;
          arr.push(this.state.card1, this.state.card2);
          setTimeout(()=>this.setState({pairsArr: arr}), 2000)
        });
      } else {
        // If it's not a match... but it's also not the same card that was already chosen
          console.log("oohh, sorry.");
      }
      setTimeout(()=>this.setState({card1: null, card2: null, choice1: null}, ()=>{
        if(this.state.players > 1){
          let currentPlayer = this.state.currentPlayer === 1 ? 2 : 1;
          this.setState({currentPlayer: currentPlayer})
        }
        this.setState({cardsOn: true})
      }), 2000)
    }
  }

  render(){

    const screen = this.state.gameOn ? 
        <Gameboard 
          cardsNum = {this.state.cardsNum}
          picsArr = {this.state.picsArr}
          gameOn = {this.state.gameOn}
          cardFlip = {(cardNum, picNum)=>this.cardFlip(cardNum, picNum)}
          card1 = {this.state.card1}
          card2 = {this.state.card2}
          cardsOn = {this.state.cardsOn}
          pairsArr = {this.state.pairsArr}
          openingScreen = {this.openOpeningScreen}
          scores = {this.state.scores}
          players = {this.state.players}
          currentPlayer = {this.state.currentPlayer}
      />
      : <OpeningScreen 
          newGame = {this.newGame}
          handleChange = {(event, value) => this.handleChange (event, value)}
        />


    return (
      <div className="App">
        {screen}
      </div>
    );
  }
}

export default App;


/*
Challenges: 
- finding pictures to download
- shuffling array of pictures - using "Fisher-Yates Shuffle, found here - https://javascript.info/task/shuffle"
- flipping cards - originally switch between two src's - the picture URL and the ? icon.  However, it took too long for the pic to load; solution: cover it and remove the cover
- Game play: 
  - click 1 - pic1(state), turn over 
  - click 2 - match? 
            - no: clear pic1 state, turn card over
            - yes: raise score, eliminate both cards 
*/