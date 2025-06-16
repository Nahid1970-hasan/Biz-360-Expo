import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../component/style/styled_flex";
import 'react-international-phone/style.css';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { CardHeaderButton, InfoCard, ShadowCard } from "../component/style/styled_card";
import { PrimaryButton } from "../component/style/styled_button";
import { Tooltip } from "../component/Tooltip";
import { KDImg } from "../component/style/styled_img";
import { Typography } from "../component/style/styled_typography";
import { RadioChildren, RadioLabel } from "../component/RadioButton";
import { initSubGroup, updateSubGroup, updateUserInfo } from "../features/pubRegistrastion/pub_registration_slice";
import { InlineDiv, InlineFlex } from "../component/style/styled_inlineflex";
import { getValueByLang } from "../utils/helper";
import { MemberTypeModal } from "../features/pubRegistrastion/memberTypeModal";
import preview from "../assets/small-icon/preview-icon-biz360expo.png";
import next from "../assets/small-icon/next-icon-biz360expo.png";
import back from "../assets/small-icon/back-icon-biz360expo.png";
import { Center } from "../component/style/styled_center";
import { SizeBox } from "../component/style/styled_sizebox";

export const MembershipStep3Page = ({ set_url_active = () => { }, set_url_pos = () => { } }) => {
    const bizGroupData = useSelector((state) => state.bizpubgroupdata);
    const regDataPub = useSelector((state) => state.pubreg);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [group_id, set_group_id] = useState(0);
    const [group_name, set_group_name] = useState(0);
    const [group_data, set_group_data] = useState({});
    const [groupDataList, setGroupDataList] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [userInfo, setUserInfo] = useState({});
    const [seasonal_traders, set_seasonal_traders] = useState(null); // Changed to null initially
    const [isAgree, setIsAgree] = useState(false);
    const [reqData, setReqData] = useState("");
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState(false);

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
        } else if (seasonal_traders === "No") {
            setRowData(groupDataList.filter(d => d.is_seasonal === 0));
        } else {
            setRowData([]); // No data shown when no selection
        }
    }, [groupDataList, seasonal_traders]);

    return (<div style={{ userSelect: "none" }}>
        <Flex row="row">
            <Flex md={12} sm={12} xs={12} padding="0 !important">
                <InfoCard>
                    <ShadowCard>
                        <Flex row="true">
                            <Flex md={3} sm={8} xs={10} padding="8px 0 0 0 !important">
                                <Typography txtalign="left" fntsize="cardSubTitleFontSize" fntweight="bold" margin=" 0 10px 0 10px ">
                                    {t("seasonal_traders")}
                                </Typography>
                            </Flex>
                            <Flex md={3} sm={8} xs={10} padding="10px 0 0 0 !important">
                                <Typography txtalign="left" fntsize="cardContentFontSize">
                                    {t("seasonal_traders2")}
                                </Typography>
                            </Flex>
                            <Flex md={1.5} sm={8} xs={10} padding="0 !important">
                                <InlineDiv>
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
                             <Flex md={.5} sm={8} xs={10} padding="0 !important"></Flex>
                            <Flex md={4} sm={8} xs={10} padding="0px 0 0 25px!important">
                                {seasonal_traders === "Yes" ? (
                                    <Typography txtalign="left" fntsize="cardContentFontSize">
                                        {t("yes_text")}
                                    </Typography>
                                ) : seasonal_traders === "No" ? (
                                    <Typography txtalign="left" fntsize="cardContentFontSize">
                                        {t("no_text")}
                                    </Typography>
                                ) : null}
                            </Flex>
                        </Flex>
                    </ShadowCard>
                    <SizeBox />
                    <ShadowCard>
                        <Flex row="true">
                            <Flex md={12} xs={12} padding="0 0 10px 0 !important">
                                <Typography txtalign="left" fntsize="cardSubTitleFontSize" fntweight="bold" margin=" 0 10px 0 10px ">
                                    {t("select_field")}
                                </Typography>
                            </Flex>
                            
                            {/* Show prompt if no selection made yet */}
                            {seasonal_traders === null && (
                                <Flex md={12} padding="20px">
                                    <Typography txtalign="center" fntsize="cardContentFontSize">
                                        {t("please_choose_type")}
                                    </Typography>
                                </Flex>
                            )}
                            
                            {/* Show data only after selection */}
                            {seasonal_traders !== null && rowData?.map((d, i) =>
                                <Flex md={3} sm={6} xs={12} key={i} padding="0 10px 10px 0 !important">
                                    <InlineFlex justifycontent="center">
                                        <RadioChildren justifycontent="flex-start" onClick={() => { set_group_data(d), set_group_id(d.group_id), set_group_name(d.group_name) }} checked={d.group_id === group_id}>
                                            {d.group_image && <KDImg src={d.group_image} height={"auto"} width={"auto"} margin="0 5px 0 0" padding="0 !important" noborder="true" />}
                                        </RadioChildren>

                                        <KDImg
                                            src={preview}
                                            noborder="true"
                                            color="font"
                                            margin="0 10px 0 0"
                                            className="material-icons"
                                            onClick={(e) => {
                                                
                                                var fltdata = d.main_names?.map((d) => Object.assign({
                                                    ...d,
                                                    sub_names: seasonal_traders === "Yes" ? d.sub_names : d.sub_names?.filter((m) => m.sub_type == userInfo.member_type) || []
                                                }));
                                                console.log(d)
                                                set_group_data(d);
                                                set_group_id(d.group_id),
                                                set_group_name(d.group_name)
                                                setRole(true);
                                                dispatch(updateSubGroup(fltdata));
                                                e.stopPropagation();
                                            }}
                                        />
                                    </InlineFlex>
                                    <Center> 
                                        <Tooltip
                                            background="bg"
                                            title={getValueByLang(d?.group_name || "{}")}
                                            position={i > 2 ? "top" : "bottom"}
                                            tbwidth="250px"
                                        >
                                            <Typography
                                                fntsize="commentFont"
                                                onClick={() => {
                                                    set_group_id(d.group_id), set_group_name(d.group_name)
                                                }}
                                            >
                                                {getValueByLang(d?.group_codename || "{}")}
                                            </Typography>
                                        </Tooltip>
                                    </Center>
                                </Flex>
                            )}
                        </Flex>
                    </ShadowCard>
                    <SizeBox/>
<ShadowCard>
 <Flex row="row">
                        <Flex md={6} padding="0 5px !important" sm={12} xs={12}>
                            <CardHeaderButton>
                                <PrimaryButton
                                    onClick={() => { dispatch(updateUserInfo({ "tabpos": 1, "info": userInfo })), set_url_active("membertype") }}
                                >
                                    <KDImg
                                        src={back}
                                        height={"auto"}
                                        width={"auto"}
                                        noborder="true"
                                    />
                                    {t("prev")}
                                </PrimaryButton>
                            </CardHeaderButton>
                        </Flex>
                        <Flex md={6} padding="0 5px !important" sm={12} xs={12}>
                            <CardHeaderButton start="true">
                                <PrimaryButton
                                    disabled={!group_id}
                                    onClick={() => {
                                        var subData = regDataPub?.subGroup?.map((d) => ({ "main_id": d.main_id, "sub_id": d?.sub_names?.filter((a) => a.selected == 1).map((j) => j.sub_id) })).filter((p) => p?.sub_id.length) || [];
                                        dispatch(initSubGroup());
                                        set_url_active("memberinfo");
                                        const userInfod = { ...userInfo, sub_list: subData || [], group_id, group_name, is_seasonal: seasonal_traders, group_data };
                                        dispatch(updateUserInfo({ "tabpos": 3, "info": userInfod }));
                                    }}
                                >
                                    {t("next")}
                                    <KDImg
                                        src={next}
                                        height={"auto"}
                                        width={"auto"}
                                        noborder="true"
                                    />
                                </PrimaryButton>
                            </CardHeaderButton>
                        </Flex>
                    </Flex>
</ShadowCard>
                   
                </InfoCard>
            </Flex>
        </Flex>
        <MemberTypeModal open={role} setOpen={setRole} data={data} />
    </div>)
};