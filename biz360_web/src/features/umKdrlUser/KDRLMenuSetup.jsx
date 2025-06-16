import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "../../component/style/styled_button";
// import { initLoader, selectAllModule, selectModule, updateBizMenuTempData } from "./biz_temp_menu_setup_slice";
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
import { updateMenuData } from "./KDRL_menu_setup_slice.JS";
import { selectAllModule } from "./KDRL_menu_setup_slice.JS";
import { selectModule } from "./KDRL_menu_setup_slice.JS";
import { initLoader } from "./KDRL_menu_setup_slice.JS";



export const KDRLMenuSetup = ({ open, setOpen, data }) => {

    const kdrlusersdata = useSelector(state => state.kdrlusersdata);
    const kdrlmenugroupdata = useSelector((state) => state.kdrlmenugroupdata);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [selectAll, setSelectAll] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [menuName, setMenuName] = useState("");
    const [menuLang, setMenuLang] = useState(localStorage.i18nextLng || "en");


    useEffect(() => {
        kdrlmenugroupdata.loading == "pending" ?
            setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [kdrlmenugroupdata.loading]);

    useEffect(() => {
        if (kdrlmenugroupdata.updateLoading == "pending") {
            setIsLoading(true);
        } else if (kdrlmenugroupdata.updateLoading == "succeeded") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); setOpen(false) }, 4000);
        } else if (kdrlmenugroupdata.updateLoading == "failed") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [kdrlmenugroupdata.updateLoading]);


    useEffect(() => {
        setSelectAll(kdrlmenugroupdata?.menuList?.every((d)=>d.sub_module?.every((b)=>b.selected)))
    }, [kdrlmenugroupdata.list]);



    useEffect(() => {
        setMenuName(getValueByLang(data.menu_name || "{}", menuLang));
    }, [data]);

    return <>

        {(kdrlmenugroupdata.updateLoading == "idle" || kdrlmenugroupdata.updateLoading == "pending") ? <></> : (
            kdrlmenugroupdata.updateLoading == "succeeded" ? (
                <Toast msg={kdrlmenugroupdata.msg} icon="task_alt" color="success" />
            ) : (
                <Toast color="error" msg={kdrlmenugroupdata.msg} />
            )
        )}

        <Modal md={8} sm={10} xs={10} open={open} setOpen={setOpen} onClose={() => { setOpen(false); }} title={t("assign_role", { lng: menuLang })} outsideclick>
            <CardHeaderButton>
                <Select
                    app="app"
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
                        kdrlmenugroupdata?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                    }
                </Select>
                <div style={{ marginLeft: "10px" }}>
                    <label htmlFor="readonly">{t("select_all", { lng: menuLang })}</label>
                    <Checkbox id="readonly" size="md" hvcolor={'gridRowOdd'} checked={selectAll} onClick={(e) => (dispatch(selectAllModule(+e.target.checked)), setSelectAll(!selectAll))} />
                </div>
                <PrimaryButton
              
                    onClick={() => {
                         dispatch(updateMenuData(data)
                        )
                         }}
                >
                    {t("submit", { lng: menuLang })}
                </PrimaryButton>

            </CardHeaderButton>
  



            <div>
                <Flex row="row">
                    <Flex padding={"5px !important"} md={12}>
                        <HLLabel>{t("menu", { lng: menuLang })} {":"} {menuName}</HLLabel>
                    </Flex>
                </Flex>
                <ScrollArea height="65vh">
                    <Flex row="row">
                    <form>
                <Flex row="row">
                    {
                        kdrlmenugroupdata?.menuList?.map((module, i) => (<Flex key={i} padding={"5px !important"} md={4} xs={12}>
                            <InfoCard >
                                <CardHeader bottom="10px">{getValueByLang(module.module_name,menuLang)}</CardHeader>
                                
                                    {module.sub_module.map((sub, i) => (
                                        <div key={i} style={{display:"flex"}}>
                                            <Checkbox size="sm" hvcolor={'primarySecendaryBorder'} onClick={(e) => dispatch(selectModule(e.target.id))} id={"select_" + module.module_id + "_" + sub.sub_id} checked={sub.selected} />
                                            <label htmlFor={"select_" + module.module_id + "_" + sub.sub_id}>{getValueByLang(sub?.sub_name,menuLang)}</label>
                                        </div>
                                    ))}

                             
                            </InfoCard>
                        </Flex>))
                    }

                </Flex>
            </form>

                    </Flex>
                </ScrollArea>
            </div>
        </Modal >
        <Loading open={isLoading} />
    </>
}