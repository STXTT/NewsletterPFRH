import React from "react";
import Formations from "../component/Formations";
import Newsletter from "../component/Newsletter";
import { useState } from "react";


const Home = () => {

  const [selectedFormation,setSelectedFormation] = useState();
  const [selectedMode,setSelectedMode] = useState(true)


  return (
    <>
     <h1 style={{textAlign:"center"}}>Bienvenue sur l'outil de newsletter de la PFRH Grand Est</h1>

     <section style={{display:"flex", marginLeft:"1%", marginRight:"1%"}}>
     <div style={{border : "2px solid grey", height : "750px", width:"30%", margin:"5px",textAlign:"center",overflow:"auto"}}>
         <Formations selectedMode={selectedMode} setSelectedFormation={setSelectedFormation}/>
     </div>
     <div style={{border : "2px solid grey", minHeight:"100%",maxHeight:"100%", width:"70%", margin:"5px",textAlign:"center",overflow:"hidden"}}>
       <Newsletter selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
     </div>
     </section>
    </>)

};

export default Home;
