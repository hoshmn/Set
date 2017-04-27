import React from 'react';
// import Radium from 'radium';

const colors = ['purple', 'blue', 'green'];
const shapes = ['%', '@', '#'];

const style = {
	'fontSize': '3em',
	'width': '8em',
	'height': '8em',
	'fontFamily': 'Courier',
	'border': '1px solid black',
	'textAlign': 'center'
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

export default ({r, c, val, select, selected}) => {
	if (!val) return <DummyCard/>;
	const thisStyle = {...style};
	const {count,pattern,color,shape} = val;
	const theShape = shapes[shape];
	const line = lineCreator(pattern, theShape);
	thisStyle.color = colors[color];
	if (selected.includes(val)) thisStyle.background = 'yellow';
	return (
		<div
			onClick={()=>select(val)}
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

const DummyCard = () => (<div style={{...style, background:'black'}}>
	<div>&nbsp;</div>
	<div>&nbsp;</div>
	<div>&nbsp;</div>
	<div>&nbsp;</div>
	<div>&nbsp;</div>
	<div>&nbsp;</div>
	<div>&nbsp;</div></div>)