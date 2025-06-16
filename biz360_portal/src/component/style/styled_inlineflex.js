import styled from "styled-components";

export const InlineFlex = styled.div`
  width: 100%;
  display: inline-flex; 
  padding: ${({ padding }) => (padding ? padding : "0px")}; 
  justify-content: ${({ justifycontent }) => (justifycontent ? justifycontent : "space-between")};
  align-items: center;
  cursor: pointer;
  &> div{
    display: flex;
    align-items: center;
  }
  &> img {
    display: flex; 
    margin-right: 10px;
    cursor: pointer;
  }
  &> button {
    display: flex; 
      margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : "10px")}; 
  }
`;
export const InFlex = styled.div`
  width: 100%;
  display: inline-flex; 
  padding: ${({ padding }) => (padding ? padding : "0px")}; 
  justify-content: ${({ justifycontent }) => (justifycontent ? justifycontent : "space-between")};
  align-items: center;
  cursor: pointer;

  & > div {
    display: flex;
    align-items: center;
  }

  & > img {
    display: flex; 
    margin-right: 10px;
    cursor: pointer;
  }

  & > button {
    display: flex; 
    margin-left: 10px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    & > div {
      flex-direction: column;
      align-items: flex-start;
    }

    & > img {
      margin-right: 0;
      margin-bottom: 10px;
    }

    & > button {
      margin-left: 0;
      margin-top: 10px;
    }
  }
`;

export const InlineDiv = styled.div`
  width: 100%;
  padding: ${({ padding }) => (padding ? padding : "0")};
  display: inline-flex; 
  justify-content: ${({ justifycontent }) => (justifycontent ? justifycontent : "space-between")};
  text-align:${({  txtalign }) => ( txtalign ? txtalign : "center")};
  align-items: ${({  alignitems }) => ( alignitems ? alignitems : "center")};
   font-family: ${({ fnfamily }) => (!!fnfamily ? fnfamily : localStorage.i18nextLng == 'en' ? "var(--dashboard-font)" : "var(--bangla-font)")};
 &>:first-child {
    margin-right: 10px;
  } 
`;