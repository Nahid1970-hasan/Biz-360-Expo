import styled from "styled-components";
import {theme} from "../../styles/theme";

export const StyledTempNavbar =  styled.nav`
    position: ${({ position }) => position ?? "sticky"};
    top: -1px;
    left: 0px; 
    width:${({ width }) => width ?? "100%"};
    background: ${({ theme }) => theme.colors.primary}; 
    align-items: center;
    display: flex;
    font-family: var(--navbar-font);
    z-index:100;
    & > div {
        display: inline-flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: start;
       &> div:last-child {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width:100%;
        }
        & > div {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            height: 100%;
            &:last-child>ul>li:last-child{
                padding: 10px;
            } 
        }
    }
     @media(max-width:${theme.layout.sm}) and (min-width:${theme.layout.xs}){
         &>div>div:first-child { 
            &>ul> span:first-child { 
                display: none;
                
            }
        }
      }
  
      @media(min-width: ${theme.layout.sm}){
        &>div>div:first-child { 
            &>ul> span:first-child { 
                display: none;
                
            }
        }
      }
    @media(max-width:${theme.layout.xs}){
        position: fixed;
        top: 0px;
        height: 60px;
        left: 0px;
        &>div>div:first-child {
            width: 100%;
            &> ul {
                width: 100%;
                display: flex;
                justify-content: start;
                &> a {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }
            }
        }
        &>div> div:last-child {
            display: none; 
        }
      }
`

export const StyledTempNavbarUL = styled.ul`
    display: flex;
    list-style: none;
    align-items: center;
    justify-content: center;
    padding: ${({ padding }) => padding ?? 0};
    text-transform: capitalize !important; 
    
    &>a{
        padding-right: 10px;
        text-decoration: none;
        color: ${({ theme }) => theme.colors.font};
        font-size : ${({ theme }) => localStorage.i18nextLng == 'en' ? theme.fontSize.navFont : theme.fontSize.fontBn};
        cursor: ${({ cursor }) => cursor ? cursor : "pointer"}; 
        &.active {
            span{
                background: ${({ theme }) => theme.colors.font};
            }
        }  
             
    }
   
    &>:hover {
        &>span{
            color: ${({ theme }) => theme.colors.primaryHover};
        } 
    }
`


export const StyledTempNavbarLI = styled.li` 
    &>select{
        padding: 2px 0; 
        background: ${({ theme }) => theme.colors.pubNav}; 
        border: ${({ theme }) => ("1px solid " + theme.colors.font)};
        border-radius: 2px; 
        &:focus {
            outline: none;
             border: ${({ theme }) => ("1px solid " + theme.colors.font)}; 
        } 
    }
    a {
        text-decoration: none;
        color: ${({ theme }) => theme.colors.barFont};
        font-size : ${({ theme }) => localStorage.i18nextLng == 'en' ? theme.fontSize.navFont : theme.fontSize.fontBn};
        cursor: ${({ cursor }) => cursor ? cursor : "pointer"}; 
        &>span{
            padding: 10px;
        }
        &.active {
            &>span{
                background: ${({ theme }) => theme.colors.primaryActive};
            }
        }  
             
    }
    &:hover {
        background: ${({ theme }) => theme.colors.primaryHover};  
    }
`

export const StyleTempDDBackground = styled.div`
    background: ${({ background, theme }) => (background ? theme.colors[background] : theme.colors.primary)};
    position: absolute;
    will-change: transform;
    transform: ${({ transform, size }) => (transform > 0 ? "translateX(" + (size > 1 ? transform : (transform + 150)) + "px)" : "translateX(150px)")};  
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 50px 100px rgba(50, 50, 93, .1), 0 15px 35px rgba(50, 50, 93, .15), 0 5px 15px rgba(0, 0, 0, .1);
    width: ${({ size }) => (size ? (size * 325) + "px" : "350px")};
    left: 0;
    top: 0;
    height: auto; 
    transform-origin: 0 0;
`
export const StyleTempDDArrow = styled.div`
    transform:  ${({ transform }) => (transform > 0 ? "translateX(" + transform + "px) rotate(45deg)" : "translateX(450px) rotate(45deg)")};   ;
    position: absolute;
    left: 0;
    top: -6px;
    margin: 0 0 0 -6px;
    width: 15px;
    height: 15px; 
    border-radius: 4px 0 0;
    background: ${({ background, theme }) => (background ? theme.colors[background] : theme.colors.primary)};
    box-shadow: -3px -3px 5px rgba(82, 95, 127, .04);
    will-change: transform;
    z-index: 10001;
`
export const StyleTempDDContainer = styled.div`
    width: ${({ size }) => (size > 1 ? "650px" : "350px")};
    overflow hidden;
    background: ${({ background, theme }) => (background ? theme.colors[background] : theme.colors.primary)};
    transform: ${({ transform, size }) => (transform > 0 ? "translateX(" + (size > 1 ? transform : (transform + 150)) + "px)" : "translateX(150px)")}; 
    height: auto;
    border-radius: 5px;
    box-shadow: 0 50px 100px rgba(50, 50, 93, .1), 0 15px 35px rgba(50, 50, 93, .15), 0 5px 15px rgba(0, 0, 0, .1);
    will-change: transform,width,height;
    
`