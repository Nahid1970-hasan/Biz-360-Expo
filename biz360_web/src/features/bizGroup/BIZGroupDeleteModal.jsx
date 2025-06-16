import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../component/Modal";
import { Flex } from "../../component/style/styled_flex";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, SecondaryButton } from "../../component/style/styled_button";
import { deleteBIZGroupData } from "./biz_group_slice";
import { useEffect } from "react";

 

export const BIZGroupDeleteModalPage = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const bizGroupFormData = useSelector((state) => state.bizgroupdata);

    useEffect(() => {
        if (bizGroupFormData.addUpdateLoading == "succeeded") { 
            setTimeout(() => {setOpen(false);}, 3000);
        }  
    }, [bizGroupFormData.addUpdateLoading]);

    
    function deleteItem(e) {
        e.preventDefault(); 
        dispatch(deleteBIZGroupData(data)); 
    }
    return <Modal  title={t("del_main_field_msg")} xs={4} open={open} onClose={() => {
        setOpen(false);
      }} outsideclick>
         <Flex row ="row">
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
            <AlertButton onClick={deleteItem}>
            {t("ok")}
            </AlertButton>
        </CardHeaderButton>
    </Modal>
}