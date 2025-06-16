import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../../features/page/page_slice";
import UnAuthorized from "../UnAuthorized";
import { Flex } from "../../component/style/styled_flex";
import { useTranslation } from "react-i18next";
import { initLoader, loadInvAdvtismentData } from "../../features/invAd/inv_advert_Slice";
import { Typography } from "../../component/style/styled_typography";

export const BizBlogPage = () => {
    const invadvertisment = useSelector((state) => state.invadvertisment);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lang, set_lang] = useState("en");

    useEffect(() => {
        dispatch(loadInvAdvtismentData());
        dispatch(
            loadPage({
                title: ("blog"),
                button: true,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);



   



    return invadvertisment.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>
<Flex row="row">
    <Flex md={12}>
        <Typography fntsize="headingLargeFontSize"  fntweight="bold">
            Blog Page
        </Typography>
    </Flex>
</Flex>
            
        </>
    );
};
