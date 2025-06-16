import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../component/style/styled_flex";
import 'react-international-phone/style.css';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CardHeaderButton, InfoCard } from "../component/style/styled_card";
import { PrimaryButton } from "../component/style/styled_button";
import { ListTooltip } from "../component/Tooltip";
import { KDImg } from "../component/style/styled_img";
import { Typography, ULine } from "../component/style/styled_typography";
import { SizeBox } from "../component/style/styled_sizebox";
import { RadioChildren, RadioLabel } from "../component/RadioButton";
import { updateUserInfo } from "../features/pubRegistration/pub_registration_slice"; 
import { InlineDiv } from "../component/style/styled_inlineflex"; 

export const MembershipStep3Page = ({ set_url_active = () => { }, set_url_pos = () => { } }) => {
    const bizGroupData = useSelector((state) => state.bizpubgroupdata);
    const regDataPub = useSelector((state) => state.pubreg);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [group_id, set_group_id] = useState(0);
    const [group_name, set_group_name] = useState(0);
    const [groupDataList, setGroupDataList] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    // Initialize seasonal_traders to "No"
    const [seasonal_traders, set_seasonal_traders] = useState("No");
    const [isAgree, setIsAgree] = useState(false);
    const [reqData, setReqData] = useState("");

    useEffect(() => { setUserInfo(regDataPub?.userInfo || {}) }, [regDataPub.userInfo]);

    // Update groupDataList when userInfo changes
    useEffect(() => {
        if (userInfo?.member_type === "BIZ") {
            setGroupDataList(bizGroupData?.orgGroupData || []);
        } else {
            setGroupDataList(bizGroupData?.indvGroupData || []);
        }
    }, [userInfo, bizGroupData]);

    // Update rowData when groupDataList or seasonal_traders changes
    useEffect(() => {
        if (seasonal_traders === "Yes") {
            setRowData(groupDataList.filter(d => d.is_seasonal === 1));
        } else {
            setRowData(groupDataList.filter(d => d.is_seasonal === 0));
        }
    }, [groupDataList, seasonal_traders]);

    return (<>
        <Flex row="row">
            <Flex md={12} sm={12} padding="0 !important">
                <InfoCard>
                <Typography fntsize="dsTextFontSize" fntweight="bold">
                    {t("choose_group")}
                </Typography>
                </InfoCard>
            </Flex>

            <Flex md={12} sm={12}>
                <InfoCard>
            <Flex row="true">
                    <Flex md={3} padding="0 !important">
                        <Typography fntsize="bodySubTitleFontSize" fntweight="bold" margin='18px 0 0 0'>
                            {t("seasonal_traders")}
                        </Typography>
                    </Flex>
                    <Flex md={2} padding="0 !important">
                        <InlineDiv justifycontent="end">
                            <RadioLabel 
                                padding="0" 
                                checked={seasonal_traders === "Yes"} 
                                onClick={() => set_seasonal_traders("Yes")} 
                                label="yes" 
                            />
                            <RadioLabel 
                                padding="0" 
                                checked={seasonal_traders === "No"} 
                                onClick={() => set_seasonal_traders("No")} 
                                label="no" 
                            />
                        </InlineDiv>
                    </Flex>
                </Flex>
                <Flex row="true">
                    {rowData?.map((d, i) =>
                        <Flex md={3} key={i} padding="0 !important">
                            <RadioChildren onClick={() => { set_group_id(d.group_id), set_group_name(d.group_name) }} checked={d.group_id === group_id}>
                                <ListTooltip width="100%" position={(i + 1) % 4 === 0 ? "left" : 'right'} color="font" background={'bg'} title={d.main_names || []}>
                                    {d.group_image && <KDImg src={d.group_image} height={"100px"} width={"135px"} margin="5px" padding="5px !important"  />}
                                </ListTooltip>
                            </RadioChildren>
                        </Flex>)}
                </Flex>
                <CardHeaderButton top="10px">
                    <PrimaryButton
                        onClick={() => { dispatch(updateUserInfo({ "tabpos": 1, "info": userInfo })), set_url_active("membertype") }}
                    >
                        {t("prev")}
                    </PrimaryButton>
                    <PrimaryButton
                        disabled={!group_id}
                        onClick={() => {
                            set_url_active("memberinfo");
                            const userInfod = { ...userInfo, group_id, group_name, is_seasonal: seasonal_traders };
                            dispatch(updateUserInfo({ "tabpos": 3, "info": userInfod }));
                        }}
                    >
                        {t("next")}
                    </PrimaryButton>
                </CardHeaderButton>
                </InfoCard>
            </Flex>
        </Flex>
    </>)
};