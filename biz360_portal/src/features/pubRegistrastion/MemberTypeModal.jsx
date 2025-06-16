import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../../component/style/styled_flex";
import { Modal } from "../../component/Modal";
import { CardHeader, CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { Checkbox } from "../../component/Checkbox";
import { getValueByLang } from "../../utils/helper";
import { ScrollArea } from "../../component/style/styled_scroll_area";
import { Typography } from "../../component/style/styled_typography";
import { InlineFlex } from "../../component/style/styled_inlineflex";
import { SizeBox } from "../../component/style/styled_sizebox";
import { selectSubGroup, updateSubGroup } from "./pub_registration_slice";
import { PrimaryButton } from "../../component/style/styled_button";
import { Center } from "../../component/style/styled_center";


export const MemberTypeModal = ({ open, setOpen, data }) => {
    const regDataPub = useSelector((state) => state.pubreg);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [userInfo, setUserInfo] = useState({});
 
    useEffect(() => { setUserInfo(regDataPub?.userInfo || {}) }, [regDataPub.userInfo]);

    return (
        <Modal md={10} sm={11} xs={11} open={open} setOpen={setOpen}
            onClose={() => setOpen(false)} title={t("business_area") + (data.group_shortname ? getValueByLang(data.group_shortname) : "")} outsideclick>
            <div>
                <ScrollArea height="65vh">
                    <Flex row="row">
                        <Flex md={12} padding="0 0 5px 0 !important">
                            <InfoCard background="pearl">
                                <Typography fntsize={"bodyTitleFontSize"} txtalign="left" fntweight="bold"> {(data.group_name ? getValueByLang(data.group_name) : "")}</Typography>
                            </InfoCard>
                        </Flex>
                        {
                            regDataPub?.subGroup?.map((module, i) => (

                                <Flex key={i} padding={"5px !important"} md={12} xs={12}>
                                    {module?.sub_names?.length > 0 && <InfoCard >
                                        <CardHeader>
                                            <SizeBox />
                                            <Typography fntsize={"bodyTitleFontSize"} txtalign="left" fntweight="bold">{getValueByLang(module.main_name)}</Typography>
                                        </CardHeader>
                                        <SizeBox />
                                        <Flex row="row">
                                            {module?.sub_names?.map((sub, i) => (
                                                <Flex md={3} sm={4} xs={12} padding={"0!important"} key={i}>
                                                    <InlineFlex justifycontent="flex-start">
                                                        <Checkbox size="md" hvcolor={'error'} onClick={(e) => {
                                                            dispatch(selectSubGroup(e.target.id));

                                                        }} id={"select_" + module.main_id + "_" + sub.sub_id} checked={sub.selected == 1} />
                                                        <label htmlFor={"select_" + module.main_id + "_" + sub.sub_id}>{getValueByLang(sub?.sub_name)}</label>
                                                    </InlineFlex>
                                                </Flex>
                                            ))}
                                        </Flex>

                                    </InfoCard>}
                                </Flex>

                            ))
                        }

                    </Flex>
                </ScrollArea>
                <Center top="10px" >
                    <PrimaryButton
                        type="button"
                        onClick={() => {
                            // var data = regDataPub?.subGroup?.map((d)=>({"main_id":d.main_id, sub_names:d.sub_names?.filter((a)=>a.selected==1).map((j)=>j.sub_id)})).filter((p)=>p.sub_names.length);
                            setOpen(false);
                        }}
                        style={{
                            textAlign: 'justify',
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%'
                        }}
                    >
                        {t("okay")}
                    </PrimaryButton>
                </Center>
            </div>
        </Modal>
    );
};
