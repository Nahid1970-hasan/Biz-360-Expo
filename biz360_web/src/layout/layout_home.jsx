import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { NavHeader } from "./navHeader";
import Footer from "./footerDemo";

const BodyArea = styled.div`
    margin-bottom: 0px;
    min-height: 70vh;
    @media(max-width:${theme.layout.xs}){
        margin-bottom: 100px; 
    }
`
export const LayoutHome = () => {
    return (
        <>
            <NavHeader />
            <BodyArea>
                <Outlet />
            </BodyArea>
            <Footer />
        </>)
}