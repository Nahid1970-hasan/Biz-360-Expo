import styled from "styled-components";

export const KDImg = styled.img`
    margin: ${({ margin }) => (margin ? margin : 0)};
    padding: ${({ padding }) => (padding ? padding : "5px")}; 
    border: ${({ noborder, theme }) => (noborder ? 'none' : '1px solid ' + theme.colors.primaryBorder)}; 
    height: ${({ height }) => (height ? height : "auto")};
    width: ${({ width }) => (width ? width : "auto")};
    display: block;
    cursor: ${({ cursor }) => (cursor ? cursor : "auto")}; 
    max-height: 500px;

`;


export const CircleKDImg = styled.div`
    margin: ${({ margin }) => (margin ? margin : 0)};
    padding: ${({ padding }) => (padding ? padding : "5px")}; 
     height: ${({ height }) => (height > 0 ? height + "px" : "auto")};
     width: ${({ width }) => (width > 0 ? width + "px" : "auto")};
    border: ${({ noborder, theme }) => (noborder ? 'none' : '1px solid ' + theme.colors.primaryBorder)};  
    border-radius: ${({ height }) => (height > 0 ? (height / 2) + "px" : "auto")};
    display: flex;
    align-items: center;
    justify-content:center;
    max-height: 500px;
    &>img {
        padding: 5px;
        height: ${({ height }) => (height > 0 ? (height - 50) + "px" : "auto")};
        width: ${({ width }) => (width > 0 ? (width - 50) + "px" : "auto")};
    }

`;

export const ImageArea = styled.div`
    margin: ${({ margin }) => (margin ? margin : 0)};
    padding: ${({ padding }) => (padding ? padding : "5px")}; 
`;