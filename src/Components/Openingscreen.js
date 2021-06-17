import reactDom from 'react-dom';
import ReactDOM from 'react-dom';
import Slider from '@material-ui/core/Slider';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const OpeningScreen = (props) => {
    const newGame = () => {
        props.newGame()
    }
    
    return(
        <div>
            <Slider
                id="slider"
                aria-labelledby="discrete-slider-always"
                valueLabelDisplay="on"
                defaultValue={20}
                step={2}
                min={10}
                max={50}
                onChange={(event, value)=>props.handleChange(event,value)}
            />
            <ButtonGroup color="primary" aria-label="outlined primary button group">
                <Button>1 Player</Button>
                <Button>2 Players</Button>
            </ButtonGroup>
            <Button variant="contained" className="newGame" onClick={()=>newGame()}>New Game</Button>
        </div>
    )
}

export default OpeningScreen;