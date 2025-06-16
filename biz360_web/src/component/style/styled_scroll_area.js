import styled from "styled-components";

export const ScrollArea = styled.div`
    height: ${({ height }) => (!!height ? height : '100px')}; 
    overflow: hidden scroll;
`;
