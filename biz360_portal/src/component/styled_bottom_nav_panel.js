import styled from "styled-components";
import { theme } from "../styles/theme";

export const BottomNavPanel = styled.div`
    position: fixed !important;
    bottom: 0 !important;
    left: 0 !important;
    color: #000;
    background: ${({ theme }) => theme.colors.primary};
    width: 100%;
    height: 60px; 
    display: none;
    justify-content: space-between;
    &>button {
        margin: 0;
        height: 100%;
        width: 100%;
        margin-right: 10px;
    }
    &>div {
        margin: 0;
        height: 100%;
        width: 150px; 
        justify-content: center;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
            background: ${({ theme }) => theme.colors.primaryHover};
        }
    }
    @media(max-width:${theme.layout.xs}){
        display: flex;
    }
`