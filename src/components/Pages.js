import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Page() {
   const [bnug, getBnug] = useState([]);
      useEffect(() => {
     getAllBnug();
    }, []);
    
    const url = 'http://localhost:3002/bnug';
    const getAllBnug = async()=>{
       await axios.get(`${url}`)
        .then((res)=>{
            const bnugs = res.data;
            getBnug(bnugs);
            console.log(bnugs);
        }).catch((error)=>{
            console.log(error)
        });
    }
    
  return <div>
       {bnug&&bnug.map((image,index)=>(
          <div key={index}>
              {image.mag&&image.mag.map((img,id)=>(
            <img key={id} src={`../png/${img}`} style={{width: 100, height: 100}} alt="book"/>
              ))}
              </div>
      ))}
  </div>;
}
