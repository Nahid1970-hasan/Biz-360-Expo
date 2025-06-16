import { useEffect} from "react";
  
import Aos from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";
import { Typography } from "./style/styled_typography";

export const Demo2PublicMenu = ({ item }) => { 
  useEffect(() => {
    Aos.init({ duration: 1000 }); 
  }, []);

  return (
    <>
        <li><NavLink to={item?.page_name} end> <Typography
            textAlign="left"  
            fontWeight="bold"
            data-aos="fade-down" 
            fontSize={"navbarFontSize"}
          >
           {item.module_name_en}
          </Typography></NavLink> </li>
    </>
  );
};
