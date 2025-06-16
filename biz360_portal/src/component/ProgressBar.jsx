import React, { useEffect, useState } from 'react'
import {theme} from "../styles/theme";

export default function () {
  const [progressbar, setProgressBar] = useState(0);

  useEffect(() => {
    if(progressbar<100){
      setTimeout(() => {  setProgressBar(progressbar+1)}, 20);
    } else{
      setProgressBar(0)
    }
  }, [progressbar]);

  const Parentdiv = {
    height: '5px',
    width: '100%',
    backgroundColor: 'whitesmoke', 
  }

  const Childdiv = {
    height: '5px',
    width: `${progressbar}%`,
    backgroundColor: `${theme.colors.progressbar}`,
    textAlign: 'right'
  }
  
  return (
    <div style={Parentdiv}>
      <div style={Childdiv}> 
      </div>
    </div>
  )
} 