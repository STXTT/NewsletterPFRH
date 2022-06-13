import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import { useQuery, useQueryClient } from "react-query";
import Formation from "./Formation";




const Formations = ({setSelectedFormation}) => {

//url du flux rss, passé par toptal afin de récupérer un objet json directement
const url = useState("http://api.allorigins.win/get?url=https://grand-est.safire.fonction-publique.gouv.fr/web/grand-est/51-rss.php?idRegion=1")

const [date,setDate] = useState(null);





//permet de recuperer les formations et les stocker dans le cache
const{isLoading, data} =useQuery("formations", () => GetFormations(url))


  return (
    <>
     Formations publié après le : <DatePicker value={date} onChange={setDate} prevLabel={"choisir une date"}/>
     date picked : {date?.toDateString()}
    {/* lorsque la requete à fini de charger on parcours chaque item pour l'afficher */         } 
     {!isLoading && date ? data.map((formation) => {
        
        if (formation.date_published >= date)
            return(<div onClick={()=>setSelectedFormation(formation)}>
              
             <Formation  key={formation.guid} formation={formation}/>
             </div>
            )
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
    }));
    return feedItems;




}

//permet de passer de la date du flux rss à un objet Date JS

const formatDate = (date) =>{
    var year = date.slice(0,4);
    var month = date.slice(5,7);
    var day = date.slice(8,10);
    
    

    var formatedDate = new Date(year,month-1,day)
    

    return formatedDate;
}
export default Formations;