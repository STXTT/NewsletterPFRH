import React,{useEffect, useState} from "react";
import Formation from "./Formation";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ButtonMailto from "./ButtonMailto";
import 'react-quill/dist/quill.snow.css';


const Newsletter = ({selectedFormation}) => {
  const [value, setValue] = useState('<p>Bonjour,<br/>La PFRH vous informe des formations suivantes. </p>');
  
  var outro = "Merci par avance d'en assurer la diffusion <br/> Bien cordialement,"
 
useEffect(()=>{
  setValue(value+"<strong><br/>"+selectedFormation?.title+"</strong> : "+selectedFormation?.domain+"<br/>Date : "+selectedFormation?.date+" Lieu : "+selectedFormation?.address+"<br/>"+`<a href=${selectedFormation?.link.slice(0,selectedFormation?.link.lastIndexOf("&"))}>Voir sur Safire</a>`)
},[selectedFormation])

    return(
<div>
{<ReactQuill style={{marginTop : "-5%"}} theme="snow" value={value} onChange={setValue}/>}



<ButtonMailto label="Envoyer" mailto={"mailto:no-reply@example.com?html-body="+value+outro+"&subject=Les formations à venir sur safire"} />


</div>
    )
}
export default Newsletter;