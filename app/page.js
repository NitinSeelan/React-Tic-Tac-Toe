'use client'
import Image from "next/image";
import {useState } from "react";

function Square(){
  const [value, setValue] =useState();
  function HandleClick(){
    console.log("Button Clicked")
  }
  return (
    <button className="square"
    onClick={HandleClick}>{value}</button>
  );
}
export default function Board() {
  return (
    <>
    <div className = "board-row">
      <Square value = "1"/>
      <Square value = "2" />
      <Square value = "3" />
    </div>
    <div className = "board-row">
      <Square />
      <Square />
      <Square />
    </div>
    <div className = "board-row">
      <Square />
      <Square />
      <Square />
    </div>
    </>
  
  );
}
