import { Outlet } from "react-router-dom"; 
import styled from "styled-components";
import { theme } from "../styles/theme";
import { NavHeader } from "./navHeader";

const BodyArea = styled.div`
    margin-bottom: 0px;
    @media(max-width:${theme.layout.xs}){
        margin-bottom: 100px; 
    }
`
export const LayoutCustom= () => {
    
    return (
        <>
            <NavHeader/>
            <BodyArea>
                <Outlet/>
            </BodyArea> 
        </>)
}