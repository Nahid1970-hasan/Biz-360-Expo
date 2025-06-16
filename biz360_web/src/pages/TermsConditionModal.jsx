import { useTranslation } from "react-i18next";
import { Modal } from "../component/Modal";
import { AlertButton, PrimaryButton } from "../component/style/styled_button";
import { CardHeaderButton } from "../component/style/styled_card";
import { Flex } from "../component/style/styled_flex";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CheckboxChildren, CheckboxLabel } from "../component/Checkbox";
import { Label } from "../component/style/styled_label";
import { Input } from "../component/style/styled_input";
import { FooterMenu } from "../layout/footer";
import { Link } from "react-alice-carousel";
import { SizeBox } from "../component/style/styled_sizebox";
import { saveUserInfo, updateUserInfo } from "../features/pubRegistration/pub_registration_slice";




export const TermsConditionModal = ({ open, setOpen = () => { }, set_url_active = () => { }, reqdata }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const regDataPub = useSelector((state) => state.pubreg);
    const [isPreserveData, setIsPreserveData] = useState(false);
    const [isTermsPolicy, setIsTermsPolicy] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => { setUserInfo(regDataPub?.userInfo || {}) }, [regDataPub.userInfo]);

    function fetchData(e) {
        e.preventDefault(e);
        dispatch(saveUserInfo(Object.assign({ ...userInfo })));
    }

    useEffect(() => {
        if (regDataPub.loading == "succeeded") {
            setTimeout(() => { setOpen(false); dispatch(updateUserInfo({ "tabpos": 5, "info": userInfo })); set_url_active("verification"); }, 4000);
        } else if (regDataPub.loading == "failed") {
            setOpen(false);
        }
    }, [regDataPub.loading]);

    return <Modal title={t("terms_condition")} xs={6} open={open} outsideclick>
        <Flex row="row">
            <Flex md={12}>
                <div style={{ height: "500px", padding: "10px", overflow: "hidden scroll" }}>
                    <div style={{ height: "800px", display: "flex", flexWrap: "wrap", alignContent: "space-between" }}>
                        <h1>Terms & Condition Message START here...</h1>
                        <h1>Terms & Condition Message END here...</h1>
                    </div>
                    <SizeBox />
                    <CheckboxChildren checked={isTermsPolicy} onClick={() => setIsTermsPolicy(!isTermsPolicy)} size={"md"}>
                        <Label margin="0">I agree to Terms & Conditions and Privacy Policy</Label>
                    </CheckboxChildren>
                    <CheckboxChildren checked={isPreserveData} onClick={() => setIsPreserveData(!isPreserveData)} size={"md"}>
                        <Label margin="0">The information is correct. I allow KDRL website to preserve this information.</Label>
                    </CheckboxChildren>
                    <SizeBox />
                    <CardHeaderButton>
                        <AlertButton onClick={() => {
                            set_url_active("memberinfo");
                            dispatch(updateUserInfo({ "tabpos": 3, "info": userInfo }));
                            setOpen(false);
                        }}>
                            {t("back")}
                        </AlertButton>
                        <PrimaryButton
                            disabled={!(isPreserveData && isTermsPolicy)}
                            onClick={fetchData}
                        >
                            {t("next")}
                        </PrimaryButton>

                    </CardHeaderButton>

                </div>
            </Flex>
        </Flex>
    </Modal>
}