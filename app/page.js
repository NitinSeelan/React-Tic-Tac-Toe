'use client'
import Image from "next/image";
import {useState } from "react";

function Square({value, onSquareClick}){
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xNext, setXNext] = useState(true)
  function handleClick(i) {
    const nextSquares = squares.slice();
    if (nextSquares[i]){
      return;
    }
    if(xNext){
      nextSquares[i] = "X";
    }else{
      nextSquares[i] = "O";
    }
    setXNext(!xNext)
    setSquares(nextSquares);
  }

  function checkWinner(squares){
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
    for(let i = 0; i < lines.length; i++){
      // i exists as a var, and it goes from 0-7
      // lines[i] gives us the ith line in lines [a, b, c]
      // squares is the state of the board
      // squares => [X, O, X, O, X, O, null, O, X]
      // lines[i] => [a, b, c]
      const [a, b, c] = lines[i];

      if(squares[a] == squares[b] && squares[b] == squares[c]){
        if(squares[a]){
          return squares[a];
        }
      }
    }

    return null;
  }
  
  return (
    <>
      <div className = "board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className = "board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className = "board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  
  );
}
