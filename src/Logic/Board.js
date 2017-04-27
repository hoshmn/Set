import React from 'react';
import Card from './Card';

export default ({deck, board, cardsLong, cardsWide, select, selected}) => {
	return(
		<div>
		{
			board.map((row, r) => 
				 <div style={{'display':'flex'}} key={r}>
					{ 
						row.map((val, c) => 
						<Card key={c} r={r} c={c} val={val} select={select} selected={selected}/>
						) 
					}
				</div>
			)
		}
		</div>

		)}