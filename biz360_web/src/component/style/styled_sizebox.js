import styled from "styled-components";

export const SizeBox = styled.div`
    height: ${({ height }) => (!!height ? height : '10px')}; 
    width: ${({ width }) => (!!width ? width : '1px')}; 
`;


export const BorderBox = styled.div`
    border: 1px solid #a7a4a4;
    border-radius: 5px;
    & span {
        padding: 8px;
        & a {
            margin-left: 5px;
            color: ${({theme})=>theme.colors.blue}
        }
    }
`;