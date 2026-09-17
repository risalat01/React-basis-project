// import { useState } from 'react'
 import Player from './components/Player.jsx'
 import GameBoard from './components/GameBoard.jsx'
import { useState } from 'react'
 import Logs from './components/Logs.jsx'
 import { WINNING_COMBINATIONS } from './Winning-Combinations.jsx'
import GameOver from './components/GameOver.jsx'


  const initialGameBoard = [
        [null,null,null],
        [null,null,null],
        [null,null,null]
    ]

function deriveActivePlayer(gameTurns){
   let currPlayer = 'X';
        if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
           currPlayer = 'O'
          
        }
         return currPlayer

}

function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map(array => [...array])]
    for(const turn of gameTurns){
        const {square , player} = turn;
        const {row, col} = square
        gameBoard[row][col] = player;
    }
    return gameBoard
}

function deriveWinner(gameBoard, playerName){
   let winner = null;
    for(const combination of WINNING_COMBINATIONS){
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

      if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
       winner = playerName[firstSquareSymbol]
    }
  }
return winner;
}


function App(){
 const [playerName,setPlayerName] = useState({
    X: "Player 1",
    O: "Player 2"
  })
  const [gameTurns, setGameTurns] = useState([])
  const gameBoard = deriveGameBoard(gameTurns)
  const activePlayer = deriveActivePlayer(gameTurns)
    
   const winner = deriveWinner(gameBoard,playerName)
  let hasDraw = gameTurns.length === 9 && !winner


    function handleSelectSquare(rowIndex,colIndex){
      
      setGameTurns(prevTurns => {
        let currPlayer = deriveActivePlayer(prevTurns)
        const updatedGameTurns = [{square : {row : rowIndex, col : colIndex}, player : currPlayer},...prevTurns]
        return updatedGameTurns
      })


      
    }
    function handleRestart(){
      setGameTurns([]);
    }

    function handlePlayerNameChange(symbol,newName){
    setPlayerName(prevNames => {
      return {
        ...prevNames,
        [symbol]: newName
      }
  })}

  return (
  <main>
    <div id = "game-container">
      <ol id="players" className = "highlight-player">
      <Player onChangeName = {handlePlayerNameChange} isActive={activePlayer === 'X'} initialName = "Player1" symbol = "X"/>
      <Player onChangeName = {handlePlayerNameChange} isActive={activePlayer === 'O'}  initialName = "Player2" symbol = "O"/>

      </ol>
      {(winner || hasDraw) && <GameOver onRestart={handleRestart} winner = {winner}/>}
       <GameBoard board = {gameBoard} onSelectSquare = {handleSelectSquare}/>
     
    </div>
   <Logs turns = {gameTurns}/>
   
  </main>
  )
}
export default App
