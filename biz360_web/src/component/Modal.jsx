import { useRef, useState } from "react";
import { useOutsideClicker } from "../utils/helper";
import { IconButton } from "./IconButton"; 
import { StyledModal } from "./style/styled_modal"; 
import { Flex } from "./style/styled_flex";
import { CardBody, CardHeader, ModalCard } from "./style/styled_card";

export const Modal = ({ open,modalTop, onClose, title, children, md, sm, xs, color, outsideclick }) => {
  const wraperRef = useRef(null);
  {outsideclick ?? useOutsideClicker(wraperRef, onClose)}

  return (
    <StyledModal open={open} modalTop={modalTop}>
      <Flex row="row">
        <Flex ref={wraperRef} md={md} sm={sm} xs={xs}>
          <ModalCard margin={"0"}>
            {!!title && (
              <header>
                <CardHeader>{title}</CardHeader>
                {!!onClose && (
                  <IconButton onClick={onClose} padding={"5px"}>
                    <span className="material-icons">close</span>
                  </IconButton>
                )}
              </header>
            )}

            <main>
              <CardBody>{children}</CardBody>
            </main>
          </ModalCard>
        </Flex>
      </Flex>
    </StyledModal>
  );
};
