import styled from "styled-components";  
import { getBNFont } from "../../utils/helper";
import { StyledIconButton } from "./styled_icon_button";
export const StyledDatagrid = styled.div`
  display: table;
  position: relative;
  // min-height: 200px;
  table-layout: fixed;
  width: 100%;
  
  & > div:first-child {
    display: table-header-group;
    height: 30px;
    background: ${({ theme }) => theme.colors.girdHeaderalter};
    font-family: ${({ fnfamily }) => (!!fnfamily ? fnfamily : localStorage.i18nextLng=='en'?"var(--dashboard-font)":"var(--bangla-font)")};
    position: sticky;
    z-index: 999;
    top:0;
    & > div {
      display: table-row;
      user-select: none;
      white-space: nowrap;
      & > div {
        color: ${({ theme }) =>theme.colors.girdHeaderFontalter};  
        // display: table-cell;
        // padding: 10px;
      }
    }
  }

  & > div {
    display: table-row-group;
    background: ${({ theme }) => theme.colors.gridBody};
    color: ${({ theme }) =>theme.colors.gridBodyFont};
    height: 30px;
    & > div {
      display: table-row;
      &:hover {
        background: ${({ theme }) =>
        theme.colors.girdHeaderalter.concat("15") +
        " radial-gradient(circle,transparent 1%, " +
        theme.colors.girdHeaderalter.concat("25") +
        " 1%) center/15000%"};
      }
      & > div {
        & ${StyledIconButton} {
          padding: 6px;
          &:hover {
            background: ${({ theme }) =>
              theme.colors.girdHeaderalter.concat("55") +
              " radial-gradient(circle,transparent 1%, " +
              theme.colors.girdHeaderalter.concat("65") +
              " 1%) center/15000%"};
          }
          &:active {
            background-color: ${({ theme }) =>
              theme.colors.girdHeaderalter.concat("44")};
            background-size: 100%;
            transition: background 0s;
          }
        }
      }
    }
  }
`;

export const CellItem = styled.div`
  align-content: center;
  display: ${({ hide }) => (hide ? "none" : "table-cell")} !important;
  padding: 2px 8px;
  width:  ${({ width }) => (width ? width+" !important" : "auto")};
  // border-bottom: 1px solid #999;
  font-size: ${({fntsize, theme, fnfamily }) =>!!fnfamily ? theme.fontSize.font : getBNFont(theme.fontSize[fntsize ? fntsize:'font'])};
  font-family: ${({ fnfamily }) => (!!fnfamily ? fnfamily : localStorage.i18nextLng=='en'?"var(--dashboard-font)":"var(--bangla-font)")};
  & > div {
    // overflow: hidden;
    display: flex;
    justify-content: ${({ alignment }) => {
      return alignment ? alignment: "flex-start";
    }};
    align-items: center;
    overflow: ${({ overflow }) => {
      return overflow ? overflow: "inherit";
    }}; 
    flex-direction: ${({ type }) => (type == "number" ? "row-reverse" : "row")};
  }
  & > div > div > div {
    visibility:  ${({child }) => (child?"visible":"hidden")};
    &.show {
      visibility: visible;
    }
  }

  &:hover {
    & > div > div > div {
      visibility: visible;
    }
  }
`;
export const GridScroll = styled.div`
  display: block;
  overflow: hidden auto;
  margin-top: 10px;
  margin-bottom: 10px;
  padding-bottom: 15px;
  max-height: ${({ maxheight }) => maxheight ? maxheight : "82vh"};
`;