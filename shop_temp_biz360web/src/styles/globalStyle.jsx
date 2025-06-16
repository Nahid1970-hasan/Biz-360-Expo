import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle` 

:root{ 
    --body-font: Ebrima;  
    --navbar-font:  Ebrima;  
    --footer-title: Ebrima;   
    --footer-text: Ebrima ;  
    --title-primary: Ebrima ;  
    --title-secondary: Ebrima;  

    --bangla-font: Nikosh; 

    --dashboard-font: Ebrima; 
    --dashboard-title: Ebrima; 

    --bg: #fff;
    --font: #000000;
    --primary: #FFFFFF;  
    --secondary: #217b3c;  
    --button-primary:rgb(41, 123, 64);
    --button-secondary:rgb(18, 60, 31)
    --button-font: #fff;
    --disable-color: #dfdfdf;
    --font-size: 16px;
  }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }


    body { 
        color: var(--font);
        background: var(--primary);
        font-family: var(--body-font), sans-serif;
        font-size: var(--font-size);
        margin: 0; 
        padding: 0;
        height: 100%;
        overflow-x: hidden;
    }
 
    label{
        display: inline-block; 
    }
 
    input:disabled {
        cursor: default;
        background-color:var(--disable-color);   
    }
 
    ::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px #fff;
        background-color: transparent;
    }

    ::-webkit-scrollbar
    {
        width: 10px;
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb
    {
        background-color: #000000;
    } 
     
     .react-international-phone-input {
        border: 1px solid #59C7FA !important; 
        width: 100%;
        border-radius: 0 !important; 
        &:focus{
            outline: none;
            border:  2px solid #59C7FA !important; 
        }
    }
    .react-international-phone-country-selector-button{
        height: 32px !important; 
        border: none !important;
        width: 50px !important; 
    }
    .react-international-phone-country-selector{
        border: 2px solid #59C7FA !important;  
        height: 36px;
    }
`;