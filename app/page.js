'use client'
import Image from "next/image";
import {useState } from "react";

function Square({value, cName, onSquareClick}){
  const fullclass = "square " +cName;
  return (
    <button className={fullclass} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function arrayEquals(a, b){
  //if(a.length != b.length) return false;

  for(let i = 0; i < a.length; i++){
    if (a[i] != b[i]){
      return false;
    }
  }
  return true;
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xNext, setXNext] = useState(true)
  const [squareClasses, setClasses] = useState(Array(9).fill(""))
  const winner = checkWinner(squares)
  let status;
  function handleClick(i) {
    const nextSquares = squares.slice();
    if (nextSquares[i] || checkWinner(squares)){
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
          const sqCl = squareClasses.slice()
          sqCl[a] =  "winSquare"
          sqCl[b] =  "winSquare"
          sqCl[c] =  "winSquare"
          console.log("---")
          console.log(squareClasses);
          console.log(sqCl);
          if (!arrayEquals(sqCl, squareClasses)){
            setClasses(sqCl);
            console.log("set classes")
          }
          return squares[a];
        }
      }
    }

    return null;
  }

  function resetGame(){
    setSquares(Array(9).fill(null));
    setClasses(Array(9).fill("")); 
    setXNext(true);
  }

  if (winner){
    status = "Winner:" + winner;
  } else {
    status = "Next Player:" + (xNext ? "X": "O")
  }
  
  return (
    <div className="boardCenter" width = "100%">
      <div className="status">{status}</div>
      <div className = "boardCont">
        <div className = "board-row">
          <Square cName = {squareClasses[0]} value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square cName = {squareClasses[1]} value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square cName = {squareClasses[2]} value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className = "board-row">
          <Square cName = {squareClasses[3]} value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square cName = {squareClasses[4]} value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square cName = {squareClasses[5]} value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className = "board-row">
          <Square cName = {squareClasses[6]} value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square cName = {squareClasses[7]} value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square cName = {squareClasses[8]} value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      <button className="resetbtn" onClick = {resetGame}>Reset</button>
    </div>
  
  );
}
