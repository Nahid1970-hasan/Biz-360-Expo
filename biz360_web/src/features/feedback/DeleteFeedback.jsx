
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Modal } from "../../component/Modal";
import { Flex } from "../../component/style/styled_flex";
import { CardHeaderButton } from "../../component/style/styled_card";
import { AlertButton, SecondaryButton } from "../../component/style/styled_button";
import { useEffect } from "react";
import { deleteFeedbackData } from "./feedback_Slice";



export const DeleteFeedback = ({ open, setOpen = () => { }, data }) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const feedback = useSelector((state) => state.feedback);

    useEffect(() => {
        if (feedback.addUpdateLoading == "succeeded") {
            setTimeout(() => { setOpen(false); }, 4000);
        }
    }, [feedback.addUpdateLoading]);

    function deletedata(e) {
        e.preventDefault();
        dispatch(deleteFeedbackData(data));
    }
    return <Modal title={t("del_feedback")} xs={4} open={open} onClose={() => {
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