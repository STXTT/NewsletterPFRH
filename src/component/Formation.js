import React from "react";

// Ce composant permet de gérer l'affichage d'une formation 
const Formation = ({selected, formation}) => {

  //Si les caractères de la date sont la balise <p> c'est qu'il n'y a pas de date, la formation à donc été férmé et ne doit pas être affiché
  if(!formation.date.includes("<p>"))
    return(
<div style={{border : "solid black 2px ", margin : "2px", marginTop : "8px", backgroundColor : selected ? 'lightgray' : null}}>
  Domaine : {formation.domain} <br/> Titre : {formation.title} <br/> Date : {formation.date}
  
        
</div>
    )
  
  else return null;
}
export default Formation;