import { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux";
import { loadPage } from "../../features/page/page_slice";
import { Flex } from "../../component/style/styled_flex";
import { Typography } from "../../component/style/styled_typography";

export const InvTemplatePage = () => {
    const biztempdata = useSelector((state) => state.biztempdata);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(
            loadPage({
                title: ("inv_template"),
                button: false,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);

    
return(
      
    // return biztempdata.loading === "unauthorized" ? (
    //     <UnAuthorized />
    // ) : (
        <>
        <Flex row="row">
            <Typography fntsize="cardTitleFontSize">
                Inv template
            </Typography>
             </Flex>
           

        </>
    );
};
