import React from 'react';
import Card from './Card';

export default ({deck, board, cardsLong, cardsWide, select, selected}) => {
	return(
		<div>
		{
			board.map((row, r) => 
				 <div style={{'display':'flex'}} key={r}>
					{ 
						row.map((cardInfo, c) => {
							const isSelected = selected.includes(cardInfo);
							return <Card key={c} r={r} c={c} cardInfo={cardInfo} select={select} isSelected={isSelected}/>
						}) 
					}
				</div>
			)
		}
		</div>

		)}