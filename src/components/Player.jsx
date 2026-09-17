import { useState } from "react"

export default function Player ({onChangeName,initialName , symbol,isActive}){
     const [PlayerName, setPlayerName] = useState(initialName);

     const [isEditing, setIsEditing] = useState(false)
        function handleClick(){
          setIsEditing(prev => !prev)
          if(isEditing){
          onChangeName(symbol,PlayerName)
          }
        }
        function handleChange(event){
            console.log(event)
            setPlayerName(event.target.value)
        }

        let editableName = <span className = "player-name">{PlayerName}</span>
        if(isEditing){
            editableName = <input type = "text" required value= {PlayerName} onChange={handleChange}  ></input>
        }
        


    return (
         <li className = {isActive ? 'active' : undefined}>
        <span className = "player">
           {editableName}
        <span className = "Player-symbol">{symbol}</span>
        </span>
        <button onClick={handleClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}