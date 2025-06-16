import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../component/style/styled_flex";
import 'react-international-phone/style.css';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../component/style/styled_button";;
import { Typography } from "../component/style/styled_typography";
import { SizeBox } from "../component/style/styled_sizebox";
import { HLLabel } from "../component/style/styled_label";
import { Input } from "../component/style/styled_input";
import { InlineDiv } from "../component/style/styled_inlineflex";
import { CenterModal } from "../component/CenterModal";
import { checkUserInfo, updateUserInfo } from "../features/pubRegistrastion/pub_registration_slice";
import { getHideEmail } from "../utils/helper";

export const MemberTermsPage = ({ set_url_active = () => { } }) => {
    const bizGroupData = useSelector((state) => state.bizpubgroupdata);
    const regDataPub = useSelector((state) => state.pubreg);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [isAgree, setIsAgree] = useState(false);
    const [textCode, setTextCode] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [timevalue, setTimeValue] = useState(600);
    const [member_type, set_member_type] = useState(false);
    const [timeout, settimeout] = useState(false);
    const [userInfo, setUserInfo] = useState({});



    return (<>
        <Flex row="row">
            <Flex md={12}>
                <Typography>
                    {t("terms_condition")}
                </Typography>
            </Flex>

        </Flex>
    </>)
};
