import { useRef } from "react";
import { useOutsideClicker } from "../utils/helper";
import { StyledModal } from "./style/styled_modal";
import styled from "styled-components";

export const Loading = ({ open, outsideclick }) => {
  const wraperRef = useRef(null);
  {outsideclick ?? useOutsideClicker(wraperRef)}
  const LOADING = styled.main`   
    display:flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70vh;
`;
  return (
    <StyledModal open={open}>
        <LOADING>
            <div className="spinner"> 
                <div className="half-spinner"></div>
            </div>
        </LOADING>
    </StyledModal>
  );
};
