
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Modal } from "../../component/Modal";
import { Flex } from "../../component/style/styled_flex";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, SecondaryButton } from "../../component/style/styled_button";
import { useEffect } from "react";
import { deleteSecurityQusData } from "./biz_security_qus_slice";



export const BizSecurityQusDelete = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const bizsecurityqus = useSelector((state) => state.bizsecurityqus);

    useEffect(() => {
        if (bizsecurityqus.addUpdateLoading == "succeeded") {
            setTimeout(() => { setOpen(false); }, 4000);
        }
    }, [bizsecurityqus.addUpdateLoading]);

    function deletedata(e) {
        e.preventDefault();
        dispatch(deleteSecurityQusData(data));
    }
    return <Modal title={t("del_sec_qus")} xs={4} open={open} onClose={() => {
        setOpen(false);
    }} outsideclick>
        <Flex row="row">
            <Flex md={12}>  {t("del_msg")}</Flex>
        </Flex>
        <CardHeaderButton>
            <SecondaryButton
                onClick={() => {
                    setOpen(false);
                }}
            >
                {t("cancel")}
            </SecondaryButton>
            <AlertButton onClick={deletedata}>
                {t("ok")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}