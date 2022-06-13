import React,{useEffect, useState} from "react";
import Formation from "./Formation";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ButtonMailto from "./ButtonMailto";


const Newsletter = ({selectedFormation}) => {
  const [value, setValue] = useState('<p style= color : "red">Bonjour, voici les formation disponible : </p>');
 
useEffect(()=>{
  setValue(value+" "+selectedFormation?.title)
},[selectedFormation])
    return(
<div>
<ReactQuill style={{marginTop : "-5%"}} theme="snow" value={value} onChange={setValue}/>
<ButtonMailto label="Envoyer" mailto={"mailto:no-reply@example.com?body="+value+"&subject=Les formations à venir sur safire"} />


</div>
    )
}
export default Newsletter;