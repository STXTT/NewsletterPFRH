import React from "react";
import Formations from "../component/Formations";
import Newsletter from "../component/Newsletter";
import { useState } from "react";


const Home = () => {

  const [selectedFormation,setSelectedFormation] = useState()

  return (
    <>
     <h1 style={{textAlign:"center"}}>Bienvenue sur l'outil de newsletter de la PFRH Grand Est</h1>
     <section style={{display:"flex", marginLeft:"10%", marginRight:"5%"}}>
     <div style={{border : "2px solid grey", height:"800px", width:"30%", margin:"5px",textAlign:"center",overflow:"auto"}}>
         <Formations setSelectedFormation={setSelectedFormation}/>
     </div>
     <div style={{border : "2px solid grey", height:"800px", width:"60%", margin:"5px",textAlign:"center",overflow:"auto"}}>
       <Newsletter selectedFormation={selectedFormation}/>
     </div>
     </section>
    </>)

};

export default Home;
