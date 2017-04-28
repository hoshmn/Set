import React from 'react';
import Radium from 'radium';
import PropTypes from 'prop-types';

const colors = ['purple', 'blue', 'green'];
const shapes = ['%', '@', '#'];

// const flash =  Radium.keyframes({
//     '0%': {
//         background: 'white'
//     },
//     '50%': {
//     	background: 'orange'
//     },
//     '100%': {
//         background: 'white'
//     }
// });

const style = {
	'fontSize': '1em',
	'width': '8em',
	'height': '8em',
	'fontFamily': 'Courier',
	'border': '1px solid black',
	'textAlign': 'center',
	'userSelect': 'none'
};

const lineCreator = (pattern,shape) => {

	switch(pattern){
		case 0:
			return shape.repeat(7);
		case 1:
			return `${shape} `.repeat(4);
		case 2:
			return `${shape} ${shape}`;
		default:
			return '??huh??';
	}
}

const Card = ({r, c, cardInfo, select, isSelected}) => {
	if (!cardInfo) return <DummyCard/>;
	const thisStyle = {...style};
	const {count,pattern,color,shape,seen} = cardInfo;
	const theShape = shapes[shape];
	const line = lineCreator(pattern, theShape);
	thisStyle.color = colors[color];
	if (isSelected) thisStyle.backgroundColor = 'rgba(0,255,255,.2)';
	if (!seen) {
		thisStyle.transition = 'all .5s ease-out';
		thisStyle.transform = 'rotateY(360deg)';
		cardInfo.seen = true;
	}
	return (
		<div
			onClick={()=>select(cardInfo)}
			style={thisStyle}
		> 
			<div>&nbsp;</div>
			<div>&nbsp;{count===3 ? line:''}</div>
			<div>&nbsp;{count===2 ? line:''}</div>
			<div>&nbsp;{count%2 ? line:''}</div>
			<div>&nbsp;{count===2 ? line:''}</div>
			<div>&nbsp;{count===3 ? line:''}</div>
			<div>&nbsp;</div>
		</div>)
}

Card.propTypes = {
	r: PropTypes.number,
	c: PropTypes.number,
	val: PropTypes.object,
	select: PropTypes.func,
	selected: PropTypes.array
}

const DummyCard = () => (<div style={{...style, background:'black'}}>
	<div>&nbsp;</div>
	<div>&nbsp;</div>
	<div>&nbsp;</div>
	<div>&nbsp;</div>
	<div>&nbsp;</div>
	<div>&nbsp;</div>
	<div>&nbsp;</div></div>)

export default Radium(Card);