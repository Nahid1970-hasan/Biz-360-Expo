import styled from "styled-components";

export const ULine = styled.div`
    display:block;
    height:  ${({ h }) => ( h ? h : "1.6px")};
    width: 100%;
    margin: 2px 0;
    background-color: #a7a4a4;
`;


export const UnderLine = styled.div`  
    height: 1px; 
    height:  ${({ h }) => ( h ? h : "1px")};
    background: ${({ theme }) => theme.colors.gray};
    margin-right: 5px;
`;
