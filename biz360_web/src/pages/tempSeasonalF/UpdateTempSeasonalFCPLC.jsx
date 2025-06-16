
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Flex } from "../../component/style/styled_flex";
import { CardHeaderButton, ShadowCard } from "../../component/style/styled_card";
import { PrimaryButton } from "../../component/style/styled_button";
import { SizeBox } from "../../component/style/styled_sizebox";
import { loadPage } from "../../features/page/page_slice";

import DisplayTheOutput from "rich-text-editor-for-react/display-output"
import RichTextEditor from 'rich-text-editor-for-react'
import useRichTextEditor from 'rich-text-editor-for-react/hook'
import { updateTempBDCSC } from "../template/temp_body_setup_data_slice";

export const UpdateTempSeasonalFCPlcPage = () => {
     const dispatch = useDispatch();
        const [open, setOpen] = useState(false);
        const admTempData = useSelector((state) => state.admupdatetempdata);
        const admTempBDCData = useSelector((state) => state.admbdctempsetupdata);
        const [sectionPrvcData, setSectionPrvcData] = useState({});
        const { t, i18n } = useTranslation();
        const { output, fetchOutput } = useRichTextEditor();
    
        useEffect(() => {
            dispatch(loadPage({
                title: 'cookies_policy_template',
                button: false
            }))
        }, []);
    
        useEffect(() => {
            var infoBodyData = JSON.parse(admTempData?.tempInfoData?.template_body || "{}")?.page7 || {};
            setSectionPrvcData(infoBodyData);
        }, [admTempData]);
    
        const submitForm = (e) => {
            var datak = { 'page_data': output };
            var data = { "template_id": admTempData.tempInfoData?.template_id || 0, "template_body": JSON.stringify({ 'page7': datak }) };
            dispatch(updateTempBDCSC(data))
        }
    
        useEffect(() => {
            if (admTempBDCData.addUpdateLoading == "succeeded") {
                setTimeout(() => { setOpen(false); }, 2000);
            }
        }, [admTempBDCData.addUpdateLoading]);
    
        return (<>
            <Suspense>
                <Flex row={"true"}>
                    <Flex padding="0 !important" md={12} sm={12} xs={12}>
                        <CardHeaderButton><PrimaryButton type="button" onClick={() => { setOpen(!open); }}>{t(!open ? "update" : "close")}</PrimaryButton></CardHeaderButton>
                        <SizeBox />
                    </Flex>
                    {!open ? <Flex md={12} sm={12} xs={12} padding="0">
                        <ShadowCard>
                            <DisplayTheOutput
                                html={sectionPrvcData?.page_data}
                                backgroundColor='#fff'
                                primaryColor='#30b256'
                            />
                        </ShadowCard>
                    </Flex> :
                        <Flex md={12} sm={12} xs={12} padding="0">
                            <RichTextEditor
                                toolbarOptions={['clear_format', 'undo', 'redo', 'header', 'bold', 'italic', 'underline', 'strikethrough', 'text_color', 'highlight_color', 'numbered_list', 'bulleted_list', 'align', 'blockquote', 'code_block', 'sub_script', 'super_script']}
                                fetchOutput={fetchOutput}
                                initialValue={sectionPrvcData?.page_data}
                                customizeUI={{
                                    backgroundColor: '#fff',
                                    primaryColor: '#30b256',
                                }}
                            />
                            <CardHeaderButton top="10px" padding="0 10px">
                                <PrimaryButton
                                    type="button"
                                    onClick={(e) => submitForm(e)}
                                >
                                    {t("submit")}
                                </PrimaryButton>
                            </CardHeaderButton>
                        </Flex>}
                </Flex>
            </Suspense>
    
        </>)
    }