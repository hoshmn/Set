import React from 'react';
import ReactDOM from 'react-dom';
import { StyleRoot } from 'radium';
import SetGame from './Logic/SetGame';
import './index.css';

ReactDOM.render(
	<StyleRoot>
  		<SetGame />
  	</StyleRoot>,
  document.getElementById('root')
);

