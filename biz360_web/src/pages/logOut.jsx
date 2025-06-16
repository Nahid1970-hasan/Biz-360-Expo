import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLogout } from "../features/user/user_slice";
import { useNavigate } from "react-router-dom";
import { Modal } from "../component/Modal";
import { Flex } from "../component/style/styled_flex";
import { CardHeaderButton } from "../component/style/styled_card";
import { AlertButton, SecondaryButton } from "../component/style/styled_button";
import { useTranslation } from "react-i18next";
import { loadPage } from "../features/page/page_slice";
import { Loading } from "../component/Loading";
import { NotNetwork } from "./NoNetwork";
import UnAuthorized from "./UnAuthorized";

export const LogOutPage = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const [open, setOpen] = useState(true);
    const [disabled, set_disabled] = useState(false);
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        dispatch(loadPage({ title: ' ' }))
    }, []);

    function deleteItem(e) {
        e.preventDefault();
        dispatch(getLogout());
        set_disabled(true)
    }

    useEffect(() => {
        if (!user.login) {
            nevigate("/login");
        } 
    }, [user]);

    useEffect(() => {
        user.lgloading == "pending" ? setIsLoading(true) : user.lgloading == "idle" ? "":setTimeout(() => {setIsLoading(false), setOpen(false)}, 2000);
    }, [user.lgloading]);

    return (user.lgloading == "unauthorized" ? <UnAuthorized /> : user.lgloading == "nonetwork"  ? <NotNetwork /> :  
        <>
            <Modal title={t("logout_confm")} md={3} sm={4} xs={12} open={open} outsideclick>
                <Flex row="row">
                    <Flex md={12}>  {t("Are your sure, want to do logout?")}</Flex>
                </Flex>
                <CardHeaderButton>
                    <SecondaryButton
                        onClick={() => {
                            setOpen(false);
                            nevigate("/app")
                        }}
                    >
                        {t("cancel")}
                    </SecondaryButton>
                    <AlertButton onClick={deleteItem} disabled={disabled}>
                        {t("yes")}
                    </AlertButton>
                </CardHeaderButton>

            </Modal>
            <Loading open={isLoading} />
        </>
    );
};
