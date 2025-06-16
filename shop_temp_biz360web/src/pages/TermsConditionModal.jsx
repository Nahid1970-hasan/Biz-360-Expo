import { useTranslation } from "react-i18next";
import { Modal } from "../component/Modal";
import { AlertButton, PrimaryButton } from "../component/style/styled_button";
import { CardHeaderButton } from "../component/style/styled_card";
import { Flex } from "../component/style/styled_flex";
import { saveIndvInfo, saveOrgInfo } from "../features/pubRegistration/pub_registration_slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CheckboxChildren, CheckboxLabel } from "../component/Checkbox";
import { Label } from "../component/style/styled_label";
import { Input } from "../component/style/styled_input";
import { FooterMenu } from "../layout/footer";
import { Link } from "react-alice-carousel";
import { SizeBox } from "../component/style/styled_sizebox";




export const TermsConditionModal = ({ open, setOpen = () => { }, reqdata, member_type }) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const regDataPub = useSelector((state) => state.pubreg);
    const [isPreserveData, setIsPreserveData] = useState(false);
    const [isTermsPolicy, setIsTermsPolicy] = useState(false);

    function fetchData(e) {
        e.preventDefault();
        setOpen(false);
        dispatch(member_type ? saveIndvInfo(reqdata) : saveOrgInfo(reqdata));
    }

    useEffect(() => {
        if (regDataPub.loading == "succeeded") {
            setTimeout(() => { setOpen(false); }, 4000);
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
                    <SizeBox/>
                    <CheckboxChildren checked={isPreserveData} onClick={() => setIsPreserveData(!isPreserveData)} size={"md"}>
                        <Label margin="0">The information is correct. I allow KDRL website to preserve this information.</Label>
                    </CheckboxChildren> 
                    <CheckboxChildren checked={isTermsPolicy} onClick={() => setIsTermsPolicy(!isTermsPolicy)} size={"md"}>
                        <Label margin="0">I agree to <a href="#">Terms & Conditions</a>  and <a href="#">Privacy Policy</a></Label>
                    </CheckboxChildren> 
                    <SizeBox/>
                    <CardHeaderButton>
                        <AlertButton onClick={() => { setOpen(false); }}>
                            {t("back")}
                        </AlertButton>
                        <PrimaryButton
                            disabled={!(isPreserveData && isTermsPolicy)}
                            onClick={fetchData}
                        >
                            {t("submit")}
                        </PrimaryButton>

                    </CardHeaderButton>

                </div>
            </Flex>
        </Flex>
    </Modal>
}