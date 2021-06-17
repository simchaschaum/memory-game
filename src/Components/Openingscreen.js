import React from 'react';
import reactDom from 'react-dom';
import ReactDOM from 'react-dom';
import Slider from '@material-ui/core/Slider';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const OpeningScreen = (props) => {
    
    // Triggers a new game
    const newGame = (playersNum) => {
        props.newGame(playersNum)
    }
    
    return(
        <div>
            <Slider
                id="slider"
                aria-labelledby="discrete-slider-always"
                valueLabelDisplay="on"
                defaultValue={20}
                step={2}
                min={8}
                max={50}
                onChange={(event, value)=>props.handleChange(event,value)}
            />
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button className="players" onClick={()=>newGame(1)}>1 Player</Button>
                <Button className="players" onClick={()=>newGame(2)}>2 Players</Button>
            </ButtonGroup>
        </div>
    )
}

export default OpeningScreen;