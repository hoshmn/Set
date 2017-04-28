import React from 'react';
import Radium from 'radium';

const colors = ['purple', 'blue', 'green'];
const shapes = ['%', '@', '#'];

/* The animation code */
const example =  Radium.keyframes({
                        '0%': {

                            background: 'blue',
                            top: '-50%'
                        },
                        '100%': {
                            background: 'red',
                            top: '0%'
                        }
                    }, 'overlayFadeIn')
                

/* The element to apply the animation to */
// div {
//     width: 100px;
//     height: 100px;
//     background-color: red;
//     animation-name: example;
//     animation-duration: 4s;
// }

const style = {
	'fontSize': '3em',
	'width': '8em',
	'height': '8em',
	'fontFamily': 'Courier',
	'border': '1px solid black',
	'textAlign': 'center',
	// 'background': 'orange',
	// 'transition': 'background 3s'
	// 'backgroundColor': 'red',
	// 'animationName': example,
	// 'animationDuration': '4s'
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

class Card extends React.Component{
	constructor(){
		super();
		this.state={thisStyle:{}};

	}
	// if (!val) return <DummyCard/>;
	ComponentWillReceiveProps(){
		const thisStyle = {...style, animationName: example, animationDuration: '4s'};
		this.setState({thisStyle})
	}
	
	render(){
		const {r, c, val, select, selected} = this.props;
		const thisStyle = this.state.thisStyle;
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