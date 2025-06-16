import { useEffect, useRef } from "react";
import { useOutsideClicker } from "../utils/helper";
import { CardHeaderButton, ModalCard } from "./style/styled_card";
import { StyledCenterModal } from "./style/styled_center_modal";
import { Flex } from "./style/styled_flex";
import { Typography } from "./style/styled_typography";
import { Button } from "./style/styled_button";



export const CenterModal = ({ open, bodymsg, setOpen=()=>{}, md, sm, xs }) => {
    const wraperRef = useRef(null); 
    return (
        <StyledCenterModal open={open}>
            <Flex row="row" justifycenter="true">
                <Flex ref={wraperRef} md={md} sm={sm} xs={xs}>
                    <CardHeaderButton>
                        <Button color="error" onClick={()=>setOpen(false)}>close</Button>
                    </CardHeaderButton>
                    <ModalCard margin={"0"}>
                        {!!bodymsg && (
                            <main>
                                <Typography fntsize="bodyTitleFontSize"> {bodymsg}</Typography>
                            </main>
                        )}
                    </ModalCard>
                </Flex>
            </Flex>
        </StyledCenterModal>
    );
};
