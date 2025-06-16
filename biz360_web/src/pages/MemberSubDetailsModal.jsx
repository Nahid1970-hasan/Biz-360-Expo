 
import { useTranslation } from "react-i18next";
import { Modal } from "../component/Modal";
import { getValueByLang } from "../utils/helper";
import { ScrollArea } from "../component/style/styled_scroll_area copy";
import { Flex } from "../component/style/styled_flex";
import { CardHeader, InfoCard } from "../component/style/styled_card";
import { Typography } from "../component/style/styled_typography";
import { SizeBox } from "../component/style/styled_sizebox";
import { InlineFlex } from "../component/style/styled_inlineflex";
import { Checkbox } from "../component/Checkbox";
 


export const MemSubsDetailsModalPage = ({ open, setOpen, data }) => {
     
    const { t } = useTranslation(); 
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
                            data?.main_names?.map((module, i) => (

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
                                                        <Checkbox size="md" hvcolor={'error'} disabled={"disabled"} onClick={null} id={"select_" + module.main_id + "_" + sub.sub_id} checked={sub.selected == 1} />
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
            </div>
        </Modal>
    );
};
