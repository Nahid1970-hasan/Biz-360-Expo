
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../component/style/styled_flex";
import 'react-international-phone/style.css';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CardHeaderButton, InfoCard } from "../component/style/styled_card";
import { PrimaryButton } from "../component/style/styled_button";
import { Typography} from "../component/style/styled_typography";
import { updateUserInfo } from "../features/pubRegistration/pub_registration_slice";
import { KDImg } from "../component/style/styled_img";
import signImg  from "../assets/sign_up.png";

export const MembershipStep1Page = ({ set_url_active = () => { }, set_url_pos = () => { } }) => {
    const bizGroupData = useSelector((state) => state.bizpubgroupdata);
    const regDataPub = useSelector((state) => state.pubreg);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { t, i18n } = useTranslation(); 

    return (<>
        <Flex row="row" justifycenter="true">

            <Flex md={12} sm={12} padding="0 0 10px 0!important">
               <InfoCard>
               <Typography fntsize="bodyHeader" fntweight="bold">
                    {t("guidelines_title")}
                </Typography>
               </InfoCard>
            </Flex>
            <InfoCard>
            <Flex row="row">
                <Flex md={8} padding="0 0 10px 0!important">
                        <Typography fntsize="bodySubTitleFontSize" txtalign="left" margin="5px 0" fntweight="bold">
                        {t("guidelines_start")}
                    </Typography>
                    <Typography fntsize="bodySubTitleFontSize" txtalign="left" margin="5px 0">
                        {t("guidelines_header")}
                    </Typography>
                    <Flex row="row">
                        <Flex md={.5} padding="0 !important">
                            <Typography fntweight="bold" >
                                {t("step_1")}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} padding="0 !important">
                            <Typography txtalign="left">
                                {t("guidelines_key1")}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} padding="5px 0  0 0  !important">
                            <Typography fntweight="bold" >
                                {t("step_2")}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} padding="5px 0  0 0  !important">
                            <Typography txtalign="left">
                                {t("guidelines_key2")}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} padding="5px 0  0 0  !important">
                            <Typography fntweight="bold" >
                                {t("step_3")}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} padding="5px 0  0 0  !important">
                            <Typography txtalign="left">
                                {t("guidelines_key3")}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} padding="5px 0  0 0  !important">
                            <Typography fntweight="bold" >
                                {t("step_4")}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} padding="5px 0  0 0  !important">
                            <Typography txtalign="left">
                                {t("guidelines_key4")}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} padding="5px 0  0 0  !important">
                            <Typography fntweight="bold" >
                                {t("step_5")}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} padding="5px 0 0 0 !important">
                            <Typography txtalign="left">
                                {t("guidelines_key5")}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} padding="5px 0  0 0  !important">
                            <Typography fntweight="bold" >
                                {t("step_6")}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} padding="5px 0  0 0  !important">
                            <Typography txtalign="left">
                                {t("guidelines_key6")}
                            </Typography>
                        </Flex>
                    </Flex>
                      
                </Flex>
                <Flex md={4} padding="0 0 10px 0!important">
                    <KDImg src={signImg} width={"100%"} height={"100%"} noborder="true" padding="0!important"></KDImg>
                </Flex>
                <Flex md={12} padding="0 !important">
                <Flex row="row">
                        <Flex md={.5} padding="5px 0  0 0  !important">
                            <Typography fntweight="bold" >
                                {t("step_7")}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} padding="5px 0  0 0  !important">
                            <Typography txtalign="left">
                                {t("guidelines_key7")}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} padding="5px 0  0 0  !important">
                            <Typography fntweight="bold" >
                                {t("step_8")}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} padding="5px 0  0 0  !important">
                            <Typography txtalign="left">
                                {t("guidelines_key8")}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} padding="5px 0  0 0  !important">
                            <Typography fntweight="bold" >
                                {t("step_9")}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} padding="5px 0  0 0  !important">
                            <Typography txtalign="left">
                                {t("guidelines_key9")}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} padding="5px 0  0 0  !important">
                            <Typography fntweight="bold" >
                                {t("step_10")}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} padding="5px 0  0 2px  !important">
                            <Typography txtalign="left">
                                {t("guidelines_key10")}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} padding="5px 0  0 0 !important">
                            <Typography fntweight="bold" >
                                {t("step_11")}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} padding="5px 0  0 2px   !important">
                            <Typography txtalign="left">
                                {t("guidelines_key11")}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} padding="5px 0  0 0 !important">
                            <Typography fntweight="bold" >
                                {t("step_12")}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} padding="5px 0 0 2px  !important">
                            <Typography txtalign="left">
                                {t("guidelines_key12")}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} padding="5px 0  0 0 !important">
                            <Typography fntweight="bold" >
                                {t("step_13")}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} padding="5px 0  0 2px !important">
                            <Typography txtalign="left">
                                {t("guidelines_key13")}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} padding="5px 0  0 0 !important">
                            <Typography fntweight="bold" >
                                {t("step_14")}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} padding="5px 0  0 2px !important">
                            <Typography txtalign="left">
                                {t("guidelines_key14")}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex md={.5} padding="5px 0  0 0  !important">
                            <Typography fntweight="bold" >
                                {t("step_15")}
                            </Typography>
                        </Flex>
                        <Flex md={11.5} padding="5px 0  0 2px  !important">
                            <Typography txtalign="left">
                                {t("guidelines_key15")}
                            </Typography>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        
            <Flex md={12} sm={12} padding="0!important">

                <CardHeaderButton>
                    <PrimaryButton
                        onClick={() => { set_url_active("membertype"), dispatch(updateUserInfo({ "tabpos": 1, "info": {} })) }}
                    >
                        {t("next")}
                    </PrimaryButton>

                </CardHeaderButton>
            </Flex>
            </InfoCard>
        </Flex></>)
};
