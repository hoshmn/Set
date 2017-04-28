import React, {Component} from 'react';
import Board from './Board';

const createDeck = () => {
	const deck = [];
	for (let count = 1; count<=3; count++){
		for (let pattern = 0; pattern<3; pattern++){
			for (let color = 0; color<3; color++){
				for (let shape = 0; shape<3; shape++){
					const card = {
						count, pattern, color, shape
					}
					deck.push(card);
				}
			}
		}
	}
	return deck;
}

const shuffle = deck => {
	const shuffled = [];
	while (deck.length){
		const i = Math.floor(Math.random()*deck.length);
		shuffled.push(deck.splice(i,1)[0]);
	}
	return shuffled;
}

const deal = (nRow, nCol, deck) => {
	const board = [];
	for(let r = 0; r<nRow; r++){
		const row = [];
		for(let c = 0; c<nCol; c++){
			const drawn = deck.pop();
			drawn.placement = {r,c};
			row.push(drawn);
		}	
		board.push(row);;				
	}
	return board;
}

const validSet = trio => {
	return ['count', 'pattern', 'color', 'shape'].every(property =>
		trio.every((card,i,cards) => 
			cards.every((c,j) => card[property]===c[property]) ||
			cards.every((c,j) => j===i || card[property]!==c[property])
		)
	)
}

const initialState = {
	cardsLong: 4,
	cardsWide: 4,
	selected: [],
	setsTaken: 0,
	status: 'Play on!',
	playerName: 'You',
	cheat: false
	// deck: shuffle(createDeck())
}

class SetGame extends Component {
	constructor(){
		super();
		const {cardsWide,cardsLong} = initialState;
		const deck = shuffle(createDeck());
		const board = deal(cardsLong, cardsWide, deck);
		this.state = {...initialState, deck, board};
		this.select = this.select.bind(this);
		this.toggleCheat = this.toggleCheat.bind(this);
	}

	select(card){
		this.setState(({selected,board,deck,setsTaken,status,playerName,cheat})=>{
			//unselect card if already selected
			let newSelected = selected.filter(crd=>crd!==card);
			//if it wasn't selected already, select it
			if (newSelected.length === selected.length) newSelected.push(card);
			if (newSelected.length > 2) {
				if (validSet(newSelected)||cheat) {
					newSelected.forEach(({placement})=>{ //replace
						const {r,c} = placement;
						const drawn = deck.pop();
						if (drawn) drawn.placement = placement; //if deck empty
						board[r][c] = drawn;
					})
					return {
						selected:[],
						board,
						deck,
						setsTaken: ++setsTaken,
						status: `${playerName} took a set!`
					}
				}
				else return {selected:[]};
			} else return {selected:newSelected};
		});
	}

	toggleCheat(){
		this.setState(({cheat})=>({cheat:!cheat}))
	}
	
	render(){
		const {deck, board, cardsLong, cardsWide, selected, setsTaken, playerName, status, cheat} = this.state;
		return(
			<div>
			<Board 
				deck={deck}
				board={board}
				cardsLong={cardsLong}
				cardsWide={cardsWide} 
				select={this.select}
				selected={selected}
			/>
			<h1>{status}</h1>
			<h2>{playerName}: {setsTaken}</h2>
			<button onClick={this.toggleCheat}>Cheating: {cheat?'ON':'OFF'}</button>
			</div>
		)
	}
}

export default SetGame;