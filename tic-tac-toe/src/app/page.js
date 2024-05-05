"use client";
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

export default function Board() {
  //we need to use a state to keep track of whether it should be 'X' or 'O'
  const [xIsNext, setXIsNext] = useState(true);
  //the value of each square
  const [squares, setSquares] = useState(Array(9).fill(null));
 
  function handleClick(i){
    //check to see if the square is already filled
    if(squares[i]) return;

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
    setSquares(nextSquares);  // pass in the array "address" value
    //set it to the oppsitie
    setXIsNext(!xIsNext); 
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
