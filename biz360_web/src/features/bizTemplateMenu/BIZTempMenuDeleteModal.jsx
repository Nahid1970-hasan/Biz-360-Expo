import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../component/Modal";
import { Flex } from "../../component/style/styled_flex";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, SecondaryButton } from "../../component/style/styled_button"; 
import { useEffect } from "react"; 
import { deleteBIZSubData } from "./biz_sub_category_slice";

 

export const BIZTempMenuDeleteModalPage = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation(); 
    const bizSubCatgDltData = useSelector((state) => state.bizsubcatgdata);
    useEffect(() => {
        if (bizSubCatgDltData.addUpdateLoading == "succeeded") {
            setTimeout(() => {setOpen(false);}, 4000);
        }  
    }, [bizSubCatgDltData.addUpdateLoading]);

    
    function deleteItem(e) {
        e.preventDefault(); 
        dispatch(deleteBIZSubData(data)); 
    }
    return <Modal  title={t("del_sub_catg_msg")} xs={4} open={open} onClose={() => {
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