import React from "react";

const Formation = ({formation}) => {
  if(!formation.date.includes("<p>"))
    return(
<div style={{border : "solid black 2px ", margin : "2px", marginTop : "8px"}}>
  Domaine : {formation.domain} <br/> Titre : {formation.title} <br/> Date : {formation.date}
  
        
</div>
    )
  
  else return null;
}
export default Formation;