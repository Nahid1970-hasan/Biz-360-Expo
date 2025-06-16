import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "../../component/style/styled_button";
import { initLoader, selectAllModule, selectModule, updateBizMenuTempData } from "./biz_temp_menu_setup_slice";
import { Flex } from "../../component/style/styled_flex";
import { Loading } from "../../component/Loading";
import { Modal } from "../../component/Modal";
import { CardHeader, CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { Checkbox } from "../../component/Checkbox";
import { getValueByLang } from "../../utils/helper";
import { HLLabel, Label } from "../../component/style/styled_label";
import { Select } from "../../component/style/styled_select";
import { Toast } from "../../component/Toast";
import { ScrollArea } from "../../component/style/styled_scroll_area";



export const BizTempMenuSetupModalPage = ({ open, setOpen, data }) => {

    const bizMenuGroupData = useSelector(state => state.biztempmenugroupdata);
    const bizTmpMenuData = useSelector((state) => state.biztempmenudata);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [selectAll, setSelectAll] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [menuName, setMenuName] = useState("");
    const [menuLang, setMenuLang] = useState(localStorage.i18nextLng || "en");


    useEffect(() => {
        bizMenuGroupData.loading == "pending" ?
            setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [bizMenuGroupData.loading]);

    useEffect(() => {
        if (bizMenuGroupData.updateLoading == "pending") {
            setIsLoading(true);
        } else if (bizMenuGroupData.updateLoading == "succeeded") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); setOpen(false) }, 4000);
        } else if (bizMenuGroupData.updateLoading == "failed") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [bizMenuGroupData.updateLoading]);


    useEffect(() => {
        setSelectAll(bizMenuGroupData?.list?.every((b) => b.selected))
    }, [bizMenuGroupData.list]);

    useEffect(() => {
        setMenuName(getValueByLang(data.menu_name || "{}", menuLang));
    }, [data]);

    return <>

        {(bizMenuGroupData.updateLoading == "idle" || bizMenuGroupData.updateLoading == "pending") ? <></> : (
            bizMenuGroupData.updateLoading == "succeeded" ? (
                <Toast msg={bizMenuGroupData.msg} icon="task_alt" color="success" />
            ) : (
                <Toast color="error" msg={bizMenuGroupData.msg} />
            )
        )}

        <Modal md={8} sm={10} xs={10} open={open} setOpen={setOpen} onClose={() => { setOpen(false); }} title={t("assign_group",{ lng: menuLang })} outsideclick>
            <CardHeaderButton>
                <Select
                    app="true"
                    name="language"
                    width="auto"
                    height="32px"
                    padding="0 0.75rem"
                    onChange={(e) => {
                        setMenuLang(e.target.value);
                        data && setMenuName(getValueByLang(data?.menu_name || "{}", e.target.value));
                    }}
                    value={menuLang}
                >
                    <option disabled value={0}>
                        {t("ph_select_val")}
                    </option>
                    {
                        bizTmpMenuData?.langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                    }
                </Select>
                <div style={{ marginLeft: "10px" }}>
                    <label htmlFor="readonly">{t("select_all",{ lng: menuLang })}</label>
                    <Checkbox id="readonly" size="md" hvcolor={'gridRowOdd'} checked={selectAll} onClick={(e) => (dispatch(selectAllModule(+e.target.checked)), setSelectAll(!selectAll))} />
                </div>

                <PrimaryButton
                    onClick={() => { dispatch(updateBizMenuTempData(data)) }}
                >
                    {t("submit", { lng: menuLang })}
                </PrimaryButton>

            </CardHeaderButton>
            <form>
                <Flex row="true">
                    <Flex padding={"5px !important"} md={12}>
                        <HLLabel>{t("menu", { lng: menuLang })} {":"} {menuName}</HLLabel>
                    </Flex>
                </Flex>
                <ScrollArea height="65vh">
                    <Flex row="true">
                        {
                            bizMenuGroupData?.list?.map((module, i) => (<Flex key={i} padding={"5px !important"} md={4} sm={6} xs={10}>
                                <InfoCard >
                                    <div style={{ display: "flex" }}>
                                        <Checkbox size="md" hvcolor={'primarySecendaryBorder'} onClick={(e) => dispatch(selectModule(e.target.id))} id={"select_" + module?.group_id} checked={module?.selected || 0} />
                                        <Label htmlFor={"select_" + module?.group_id}>{getValueByLang(module?.group_name || "{}", menuLang)}</Label>
                                    </div>
                                </InfoCard>
                            </Flex>))
                        }

                    </Flex>
                </ScrollArea>
            </form>
        </Modal >
        <Loading open={isLoading} />
    </>
}