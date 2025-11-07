import { useEffect, useReducer, useState } from 'react';
import './App.css';

function App() {
	const addPos = (state,position)=>{
		const {i, j, operation} = position;
		switch (operation) {
			case "place": {
				const newState = JSON.parse(JSON.stringify(state))
				const player = newState.currentPlayer
				if(newState.board[i][j]!==0) {
					return state;
				}
				newState.board[i][j] = player;
				const isXWon = checkWon("x", newState);

				newState.won = isXWon ? "x": checkWon("y", newState) ? "y" : null;
				newState.currentPlayer = state.currentPlayer==="x"? "y" : "x";
				return newState;
			}
			case "update": {
				return initialState(n)
			}
			default:
				return initialState(n)
		}
	}

	const checkDiagonals = (plr, board)=>{
		let oneDigonal = 0;
		let twoDigonal = 0;
		const vertical = Array(board.length).fill(0);
		for (let i = 0; i < board.length; i++) {
			for (let j = 0; j < board.length; j++) {
				if(i === j && board[i][j] === plr) {
					oneDigonal+=1;
				}
				if(i+j === board[0].length-1 && board[i][j] === plr) {
					twoDigonal+=1;
				}
				if(twoDigonal === vertical.length || oneDigonal === vertical.length) {
					return true;
				}
				if(board[i][j] === plr) {
					vertical[j]+=1;
				}
				if(vertical.find(v=>v === vertical.length)) {
					return true;
				}
			}
		}
		return false;
	}

	const checkWon = (plr, newState)=>{
		for (let i = 0; i < newState.board.length; i++) {
			const row = newState.board[i];
			let isPlrPresent = 0;
			for (let j = 0; j < row.length; j++) {
				const cell = row[j];
				if(cell === plr) {
					isPlrPresent+=1;
				}
			}
			if(isPlrPresent === newState.board.length) {
				return true;
			}
		}

		const is1stDigonal = checkDiagonals(plr, newState.board)
		return is1stDigonal;
	}
	const [n, setN] = useState(3);
	useEffect(()=>{
		updatePosition(0,0,)
	},[n])
	const initialState = (noOfBoxes)=>{
		return {
			currentPlayer: "x",
			won: null,
			board: Array(noOfBoxes).fill([]).map(()=> Array(n).fill(0))
		}
	}
	const [positions, updatePosition] = useReducer(addPos, initialState(n))

	return (
  <div className="game-wrapper">
    {positions.won && <p>{positions.won} won the game 🎉</p>}
    <div>Current player: <strong>{positions.currentPlayer}</strong></div>
    <input
      type="number"
      value={n}
      onChange={(e) => setN(Math.floor(e.target.value > 3 ? e.target.value : 3))}
    />
    <div className="App">
      {positions.board.map((r, i) => (
        <div key={i} className="container">
          {r.map((c, j) => (
            <div
              key={i + '::' + j}
              onClick={() => updatePosition({ i, j, c, operation: 'place' })}
              className="box"
            >
              {c}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);
}

export default App;
