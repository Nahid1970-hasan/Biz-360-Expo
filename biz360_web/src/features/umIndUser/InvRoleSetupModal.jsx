import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "../../component/style/styled_button";
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
import { selectAllModule, selectModule, updateInvMenuData,initLoader } from "./inv_menu_setup_slice";



export const InvRoleSetupModal = ({ open, setOpen, data }) => {

    const invmenugroupdata = useSelector((state) => state.invmenugroupdata);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [selectAll, setSelectAll] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [module_name, setmodule_name] = useState("");
    const [menuLang, setMenuLang] = useState(localStorage.i18nextLng || "en");


    useEffect(() => {
        invmenugroupdata.loading == "pending" ?
            setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [invmenugroupdata.loading]);

    useEffect(() => {
        if (invmenugroupdata.updateLoading == "pending") {
            setIsLoading(true);
        } else if (invmenugroupdata.updateLoading == "succeeded") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); setOpen(false) }, 4000);
        } else if (invmenugroupdata.updateLoading == "failed") {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [invmenugroupdata.updateLoading]);


    useEffect(() => {
        setSelectAll(invmenugroupdata?.menuList?.every((d)=>d.sub_module?.every((b)=>b.selected)))
    }, [invmenugroupdata.list]);



    useEffect(() => {
        setmodule_name(getValueByLang(data.menu_name || "{}", menuLang));
    }, [data]);

    return <>

        {(invmenugroupdata.updateLoading == "idle" || invmenugroupdata.updateLoading == "pending") ? <></> : (
            invmenugroupdata.updateLoading == "succeeded" ? (
                <Toast msg={invmenugroupdata.msg} icon="task_alt" color="success" />
            ) : (
                <Toast color="error" msg={invmenugroupdata.msg} />
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
                        data && setmodule_name(getValueByLang(data?.module_name || "{}", e.target.value));
                    }}
                    value={menuLang}
                >
                    <option disabled value={0}>
                        {t("ph_select_val")}
                    </option>
                    {
                        invmenugroupdata?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                    }
                </Select>
                <div style={{ marginLeft: "10px" }}>
                    <label htmlFor="readonly">{t("select_all", { lng: menuLang })}</label>
                    <Checkbox id="readonly" size="md" hvcolor={'gridRowOdd'} checked={selectAll} onClick={(e) => (dispatch(selectAllModule(+e.target.checked)), setSelectAll(!selectAll))} />
                </div>
                <PrimaryButton
              
                    onClick={() => {
                         dispatch(updateInvMenuData(data)
                        )
                         }}
                >
                    {t("submit", { lng: menuLang })}
                </PrimaryButton>

            </CardHeaderButton>
  



            <div>
                <Flex row="row">
                    <Flex padding={"5px !important"} md={12}>
                        <HLLabel>{t("menu", { lng: menuLang })} {":"} {module_name}</HLLabel>
                    </Flex>
                </Flex>
                <ScrollArea height="65vh">
                    <Flex row="row">
                    <form>
                <Flex row="row">
                    {
                        invmenugroupdata?.menuList?.map((module, i) => (<Flex key={i} padding={"5px !important"} md={4} xs={12}>
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