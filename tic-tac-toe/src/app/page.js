"use client";
import { Rock_3D } from "next/font/google";
import Image from "next/image";
import { useState } from "react";


function Square({ value, onSquareClick }){
  return(
    <button 
      onClick={onSquareClick}
      className="square"
    >
      {value}
    </button>
  )
}


function Board({ xIsNext, squares, onPlay }) {
  //we need to use a state to keep track of whether it should be 'X' or 'O'
  // const [xIsNext, setXIsNext] = useState(true);
  // //the value of each square
  // const [squares, setSquares] = useState(Array(9).fill(null));
 
  function handleClick(i){
    //check to see if the square is already filled, and if there's already a winner
    if(squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();  //creates copy of a new array
    //set the value

    if(xIsNext){
      nextSquares[i] = "X";
    }   
    else{
      nextSquares[i] = "O";
    }

    //the reason why we need a new copy is because of the immutability of state variable
    //it won't re-render if the data(address value) hasn't changed!!!
    // setSquares(nextSquares);  // pass in the array "address" value
    onPlay(nextSquares);
    //set it to the oppsitie
    // setXIsNext(!xIsNext); 
  }

  const winner = calculateWinner(squares);
  let status;
  if(winner){
    status = "Winner: " + winner;
  }
  else{
    status = "Next player: " + (xIsNext? "X" : "O");
  }

  //declare a square display arrow function (understand how it's different from function statement!)
  const renderSquare = (i) => {
    //we need to assign a key prop!
    return <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)}/>;
  }


  //use two for loops instead of hardcoding the Square components
  const board = [];
  for(let i = 0; i < 3; i++){
    const squares = [];
    for(let j=0; j<3; j++){
      squares.push(renderSquare(3*i + j));
    }
    //we need to assign a key prop to the element if it's not hardcoded into the component!!!
    board.push(<div key={i} className="board-row">{squares}</div>);
  }


  return (
    <>
      <div className="status">{status}</div>
      {board} {/*Here we dereference the variable to its value!*/}
    </>

    // <>
    //   <div className="status">{status}</div>
      
    //   <div className="board-row">
    //     {/* <Square value={squares[0]} onSquareClick={() => handleClick(0)} /> */}
    //     {renderSquare(0)}
    //     {renderSquare(1)}
    //     {renderSquare(2)}
    //   </div>
    //   <div className="board-row">
    //     {renderSquare(3)}
    //     {renderSquare(4)}
    //     {renderSquare(5)}
    //   </div>
    //   <div className="board-row">
    //     {renderSquare(6)}
    //     {renderSquare(7)}
    //     {renderSquare(8)}
    //   </div>
    // </>
  );
}

export default function Game() {
  //always try to avoid redundant state. Simplifying what you store in state reduces bugs and makes your code easier to understand.
  //we figure out xIsNext based on currentMove
  // const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;    //if currMove is even it should be X, and O otherwise
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    //use slice to only get all the records till the current move
    setHistory([...history.slice(0, currentMove + 1), nextSquares]);  //... to spread and copy the array!!
    setCurrentMove(currentMove + 1);
    // setXIsNext(!xIsNext);

    //the tutorial used
    // const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // setHistory(nextHistory);
    // setCurrentMove(nextHistory.length - 1);
    // setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove){
    //set the current move to be re-rendered
    setCurrentMove(nextMove);
    // setXIsNext(nextMove % 2 === 0);
  }

  //squares go through the values(arrays) and move goes through the index
  //(In most cases, you’d need the actual array elements, but to render a list of moves you will only need indexes.)
  //in this case we only need the indexes to render which move to go back to
  const moves = history.map((squares, move) => {
    let description;

    if(move > 0){
      description = 'Go to move #' + move;
    }
    else{
      description = 'Go to game start';
    }

    if(move == history.length - 1){
      //show "You are at move #" instead of a button
      return(
        <li key={move}>
          <p>You are at move #{move}</p>
        </li>
      )
    }
    else{
      return(
        //It’s strongly recommended that you assign proper keys 
        //whenever you build "dynamic" lists!!!
        <li key={move}>
            <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          xIsNext={xIsNext} 
          squares={currentSquares} 
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


function calculateWinner(squares) {
  const lines = [
    //rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonals
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}