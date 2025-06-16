import styled from "styled-components";

export const ULine = styled.div`
    display:block;
    height:  ${({ h }) => ( h ? h : "1.6px")};
    width: 100%;
    margin: 2px 0; 
`;
