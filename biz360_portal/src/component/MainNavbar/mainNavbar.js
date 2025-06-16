import styled from "styled-components";
import { theme } from "../../styles/theme";

export const StyledMainNavbar = styled.nav`
  position: sticky; 

  background: linear-gradient(135deg, ${props => props.theme.colors.cardContent} 0%, ${props => props.theme.colors.pearl} 100%);
  box-shadow: ${({ position }) => position == "fixed" ? "rgb(25 89 66 / 30%) 0px 2px 10px 0px, rgb(25 89 66 / 30%) 0px 2px 10px 0px" : "inherit"};
  transition:  ${({ position }) => position == "fixed" ? "top 0.3s linear" : "all 0.3s ease-in-out"};
  z-index:  ${({ position }) => position == "fixed" ? "1001" : "99"};;
  top: -1px;
  left: 0px; 
  width:${({ width }) => width ?? "100%"}; 
  align-items: center;
  display: flex;
  font-family: var(--navbar-font); 
  padding:0; 
  & > div {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

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

    @media(max-width: ${theme.layout.xs}){
        padding: 0; 
        &>div {  
            &>div:first-child{ 
                &>div:first-child{ 
                    width: 100%;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center; 
                    &>span {
                        display: block;  
                    }
                }
                &>div>div>div>span{
                    display: block;
                }
                &>div:last-child{
                    display: none; 
                    
                }
            }
            &>div:last-child{
                display: none; 
            }
        } 
    }

    @media(max-width:${theme.layout.sm}) and (min-width:${theme.layout.xs}){
      &>div {  
        &>div:first-child{ 
            &>div:first-child{ 
                &>span {
                    display: none;  
                }
            }
        }
         &>div>div>div>span{
           display: none;
        }
        &>div:last-child{
          display: inline-flex; 
        }
      } 
    }
    @media(min-width: ${theme.layout.sm}){ 
      &>div {   
       &>div:first-child{ 
            &>div:first-child{ 
                &>span {
                    display: none;  
                }
            }
        }
        &>div>div>div>span{
           display: none;
        }
        &>div:last-child{
          display: inline-flex; 
        }
      } 
    }
     
`;


export const StyledMainNavbarUL = styled.ul`
    display: flex;
    list-style: none;
    align-items: center;
    justify-content: left;
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
            color: ${({ theme }) => theme.colors.infoCard};
        } 
    }
`


export const StyledMainNavbarLI = styled.li` 
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
    &>div> a {
        text-decoration: none;
        color: ${({ theme }) => theme.colors.barFont};
        font-size : ${({ theme }) => localStorage.i18nextLng == 'en' ? theme.fontSize.navFont : theme.fontSize.fontBn};
        
        &>span{
            padding:5px  10px;
        }
        &.active {
            &>span{
                background: ${({ theme }) => theme.colors.primaryActive};
            }
        }  
             
    }
    &> a {
        text-decoration: none;
        color: ${({ theme }) => theme.colors.barFont};
        font-size : ${({ theme }) => localStorage.i18nextLng == 'en' ? theme.fontSize.navFont : theme.fontSize.fontBn};
        cursor: ${({ cursor }) => cursor ? cursor : "pointer"}; 
        &>span{
            padding: 5px 15px;
        }
        &.active {
            &>span{
                background: ${({ theme }) => theme.colors.primaryActive};
            }
        }  
             
    }
    &:hover {
        background: ${({ theme }) => theme.colors.pearl};  
    }
`

export const StyleDDBackground = styled.div`
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
export const StyleDDArrow = styled.div`
    transform:  ${({ transform }) => (transform > 0 ? "translateX(" + transform + "px) rotate(45deg)" : "translateX(450px) rotate(45deg)")};   ;
    position: absolute;
    left: 0;
    top: -8px;
    margin: 35px 0 0 -6px;
    width: 15px;
    height: 15px; 
    border-radius: 4px 0 0;
    background: ${({ background, theme }) => (background ? theme.colors[background] : theme.colors.primary)};
    box-shadow: -3px -3px 5px rgba(82, 95, 127, .04);
    will-change: transform;
    z-index: 10001;
`
export const StyleDDContainer = styled.div`
    width: ${({ size }) => (size > 1 ? "400px" : "250px")};
    overflow hidden;
    background: ${({ background, theme }) => (background ? theme.colors[background] : theme.colors.primary)};
    transform: ${({ transform, size }) => (transform > 0 ? "translateX(" + (size > 1 ? transform : (transform + 150)) + "px)" : "translateX(150px)")}; 
    height: auto;
    border-radius: 5px;
    box-shadow: 0 50px 100px rgba(50, 50, 93, .1), 0 15px 35px rgba(50, 50, 93, .15), 0 5px 15px rgba(0, 0, 0, .1);
    will-change: transform,width,height;
    margin: ${({ margin }) => (margin ? margin : "0")};

`