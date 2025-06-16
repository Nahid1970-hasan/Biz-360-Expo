import styled from "styled-components";
import {theme} from "../../styles/theme";

export const StyledPubNavbar = styled.nav`
  position: ${({position})=> position ?? "sticky"};
  top: -1px;
  left: 0px;
  // box-shadow: 0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%);
  width:${({width})=> width?? "100%"};
  background: ${({ theme }) => theme.colors.pubNav}; 
  align-items: center;
  display: flex;
  font-family: var(--navbar-font);
  z-index:100;

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
      ul {
        display: flex;
        list-style: none;
        text-transform: capitalize !important; 
        li {
          padding: 10px;
          a {
            text-decoration: none;
            color: ${({ theme }) => theme.colors.barFont};
            font-size : ${({ theme }) => localStorage.i18nextLng=='en'? theme.fontSize.navFont:theme.fontSize.fontBn};
            cursor:pointer;

            &.active {
              span{
                color: ${({ theme }) => theme.colors.font};
              }
            }  
             
          }
        }
        & li:hover {
          background: ${({ theme }) => theme.colors.primaryHover};  
        }
        & li:has(.active){
          background: ${({ theme }) => theme.colors.primaryActive};  
        }

        & li.highlight{
            background-color: ${({ theme }) => theme.colors.primaryActive};
            &>a{
              color: ${({ theme }) => theme.colors.bg};
            }
        }
      } 
    }
    
    }

    @media(max-width:${theme.layout.xs}){
      &>div>div {
        overflow-x:scroll;
        -ms-overflow-style: none;  
        scrollbar-width: none;
      }
    }
  
`;
