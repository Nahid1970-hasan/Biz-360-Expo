import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../../features/page/page_slice";
import { Loading } from "../../component/Loading";
import UnAuthorized from "../UnAuthorized";
import { Flex } from "../../component/style/styled_flex";
import { useTranslation } from "react-i18next";
import { InlineFlex } from "../../component/style/styled_inlineflex";
import { Select } from "../../component/style/styled_select";
import { getValueByLang } from "../../utils/helper";
import { PublicMenuGrid } from "../../features/bizPubliceMenu/PublicMenuGrid";
import { initLoader, LoadPublicMenuData } from "../../features/bizPubliceMenu/public_menu_Slice";
import { ModulesModal } from "../../features/bizPubliceMenu/ModulesModal";

export const PublicMenuPage = () => {
    const bizpublicdata = useSelector((state) => state.bizpublicdata);
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [lang, set_lang] = useState("en");
    const [module_id, set_module_id] = useState(0);
    const [module_name, set_module_name] = useState(0);

    useEffect(() => {
        dispatch(LoadPublicMenuData());
        dispatch(
            loadPage({
                title: ("biz_public_menu"),
                button: false,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);

    useEffect(() => {
        bizpublicdata.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [bizpublicdata.loading]);

    const rowData = bizpublicdata?.list.map((d, i) => ({
        ...d,
        "sl": i + 1,
        module_name: getValueByLang(d.module_name || "{}", lang),
    
      }));

        useEffect(() => {
          if (bizpublicdata.addUpdateLoading == "pending") {
            setIsLoading(true)
          } else if (bizpublicdata.addUpdateLoading == "succeeded") {
            setIsLoading(false);
              dispatch(LoadPublicMenuData());
            setTimeout(() => { dispatch(initLoader()); }, 4000);
          } else {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
          }
        }, [bizpublicdata.addUpdateLoading]);

    return bizpublicdata.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>

         <Flex row="row">
               {/* <Flex padding="0 !important" md={6} sm={12}>
                 <Flex row="row">
                   <Flex padding="0 !important" md={6} sm={12} xs={12}>
                     <InlineFlex justifycontent="start">
                       <Select
                         app="true"
                         width="220px"
                         name="module_id"
                         onChange={(e) => {
                           var grp =  bizpublicdata?.list?.find((d)=>d.module_id==e.target.value);
                            set_module_name(grp.module_name) 
                            set_module_id(e.target.value) 
                           }}
                         color={!module_id ? "error" : null}
                         value={module_id || 0}
                       >
                         <option disabled value={0}>
                           {t("ph_select")}
                         </option>
                         {
                           bizpublicdata?.list?.map((d, i) => <option key={i} value={d.module_id}>{getValueByLang(d.module_name || "{}", lang)}</option>)
                         }
                       </Select>
                       <PrimaryButton type="button" disabled={!module_id}>
                         {t("search")}
                       </PrimaryButton>
                     </InlineFlex>
                   </Flex>
                   <Flex padding="5px 0 0 0 !important" md={6} sm={12} xs={12}>
                     <InlineFlex justifycontent="end">
                       <Select
                         app="true"
                         name="status"
                         onChange={(e) => { set_lang(e.target.value) }}
                         value={lang || "en"}
                       >
       
                         <option disabled value={0}>
                           {t("ph_select")}
                         </option>
                         {
                           bizpublicdata?.languageList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                         }
                       </Select>
                     </InlineFlex>
                   </Flex>
                 </Flex>
               </Flex> */}
             </Flex>
             <Flex row='row'>
             <Flex padding="0 0 10px 0 !important" md={6} sm={12} xs={12}>
                     <InlineFlex justifycontent="end">
                       <Select
                         app="true"
                         name="status"
                         onChange={(e) => { set_lang(e.target.value) }}
                         value={lang || "en"}
                       >
       
                         <option disabled value={0}>
                           {t("ph_select")}
                         </option>
                         {
                           bizpublicdata?.languageList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                         }
                       </Select>
                     </InlineFlex>
                   </Flex>
             </Flex>

             <Flex row="row">
               <Flex padding="0 !important" md={6} sm={12} xs={12}>
                 <PublicMenuGrid gridata={rowData} module_id={module_id} module_name={module_name} />
               </Flex>
              
             </Flex>
               <ModulesModal open={open} setOpen={setOpen} add  />
    
            <Loading open={isLoading} />
        </>
    );
};
