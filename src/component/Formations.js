import React, { useState } from "react";
import DatePicker from "react-date-picker";
import { useQuery } from "react-query";
import Formation from "./Formation";
import { Switch } from "@mui/material";




const Formations = ({setSelectedFormation}) => {

//url du flux rss, passé par toptal afin de récupérer un objet json directement
const url = useState("http://api.allorigins.win/get?url=https://grand-est.safire.fonction-publique.gouv.fr/web/grand-est/51-rss.php?idRegion=1")

const [date,setDate] = useState(null);
const [selectedMode, setSelectedMode] = useState(false)






//permet de recuperer les formations et les stocker dans le cache
const {isLoading, data} =useQuery("formations", () => GetFormations(url));




  return (
    <>
     {!selectedMode ? "Formations publié après le :" : "Formations ayant lieu avant le"}   <DatePicker value={date} onChange={setDate} />
     <Switch checked={selectedMode} onChange={()=>{
      setSelectedMode(!selectedMode);
      setDate(null);
      }} inputProps={{ 'aria-label': 'controlled' }}/>
     
     
    {/* lorsque la requete à fini de charger on parcours chaque item pour l'afficher */         } 
     {!isLoading && date ? data.map((formation) => {
      if(!selectedMode){
        if (formatDate(formation.date_published) >= date){
            return(<div key={formation.guid}  onClick={()=>setSelectedFormation(formation)}>
              
             <Formation  formation={formation}/>
             </div>
            )
        }
      }
      else {
        var actualDate = new Date();
        if(!formation.date.includes("<p"))
        if (formatDate2(formation.date) <= date && formatDate2(formation.date) > actualDate ){
          return(<div key={formation.guid}  onClick={()=>setSelectedFormation(formation)}>
            
           <Formation  formation={formation}/>
           </div>
          )
      }
      }
          })
        

     :null} 
    </>)
};

//fonction de recherche des formations via l'url du flux
const GetFormations= async (url)=> {

    const res = await fetch(`${url}`);
    const { contents } = await res.json();
    const feed = new window.DOMParser().parseFromString(contents, "text/xml");
    const items = feed.querySelectorAll("item");
    const feedItems = [...items].map((el) => ({
      link: el.querySelector("link").innerHTML,
      title: el.querySelector("title").innerHTML,
      description: el.querySelector("description").innerHTML,
      date_published: el.querySelector("pubDate").innerHTML,
      guid: el.querySelector("guid").innerHTML,
      domain: el.querySelector("description").innerHTML.slice(
        el.querySelector("description").innerHTML.indexOf("Domaine :</strong><br />")+24,
        el.querySelector("description").innerHTML.indexOf("</p>")
      ),
      date : el.querySelector("description").innerHTML.slice(
        el.querySelector("description").innerHTML.lastIndexOf("Date : </strong>")+16,
        el.querySelector("description").innerHTML.lastIndexOf("Date : </strong>")+26
       
      ),
      address: el.querySelector("description").innerHTML.slice(
        el.querySelector("description").innerHTML.lastIndexOf("Lieu : </strong>")+16,
        el.querySelector("description").innerHTML.lastIndexOf("Statut :")
      ),

    }));
    return feedItems;




}

//permet de passer de la date du flux rss à un objet Date JS

const formatDate = (date) =>{

    var formatedDate = new Date(date)
    

    return formatedDate;
}

const formatDate2 = (date) =>{

  var formatedDate = new Date;
  formatedDate.setDate(date.slice(0,2))
  formatedDate.setMonth(date.slice(3,5))
  formatedDate.setFullYear(date.slice(6,10))
  
  

  return formatedDate;
}
export default Formations;
