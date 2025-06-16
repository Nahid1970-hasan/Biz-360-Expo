import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../../features/page/page_slice";
import { Loading } from "../../component/Loading";
import UnAuthorized from "../UnAuthorized";
import { Flex } from "../../component/style/styled_flex";
import { initLoader, loadBIZMainCatgData } from "../../features/bizMainCatg/biz_main_category_slice";
import { InlineFlex } from "../../component/style/styled_inlineflex";
import { Select } from "../../component/style/styled_select";
import { getValueByLang } from "../../utils/helper";
import { useTranslation } from "react-i18next";
import { ULine } from "../../component/style/styled_uline";
import { loadBIZGroupData } from "../../features/bizGroup/biz_group_slice";
import { PrimaryButton } from "../../component/style/styled_button";
import { BIZMainCatgGridPage } from "../../features/bizMainCatg/BIZMainCatgGrid";
import { BIZMainCatgFormModalPage } from "../../features/bizMainCatg/BIZMainCatgFormModal";

export const BIZMainCatgPage = () => {
  const bizMainCatgData = useSelector((state) => state.bizmaincatgdata);
  const bizMainGroupData = useSelector((state) => state.bizgroupdata);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [group_id, set_group_id] = useState(0);
  const [group_name, set_group_name] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lang, set_lang] = useState("en");
  useEffect(() => {
    dispatch(loadBIZGroupData());
    dispatch(
      loadPage({
        title: ("main_catg"),
        button: true,
        onClick: () => {
          setOpen(true);
        },
        buttonText: "add_new",
      })
    );
  }, []);

  useEffect(() => {
    bizMainGroupData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [bizMainGroupData.loading]);

  useEffect(() => {
    bizMainCatgData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [bizMainCatgData.loading]);

  function loadMNCatgData(e) {
    e.preventDefault();
    if (group_id) {
      dispatch(loadBIZMainCatgData({ group_id }));
    }
  }

  const rowData = bizMainCatgData?.list.map((d, i) => ({
    ...d,
    "sl": i + 1,
    main_name_value: getValueByLang(d.main_name || "{}", lang),
  }));



  useEffect(() => {
    if (bizMainCatgData.addUpdateLoading == "pending") {
      setIsLoading(true)
    } else if (bizMainCatgData.addUpdateLoading == "succeeded") {
      setIsLoading(false);
      if (group_id) {
        dispatch(loadBIZMainCatgData({ group_id }));
      }
      setTimeout(() => { dispatch(initLoader()); }, 4000);
    } else {
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
    }
  }, [bizMainCatgData.addUpdateLoading]);

  return bizMainCatgData.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
      <Flex row="row">
        <Flex padding="0 !important" md={6} sm={12}>
          <Flex row="row">
            <Flex padding="0 !important" md={6} sm={12} xs={12}>
              <InlineFlex justifycontent="start">
                <Select
                  app="true"
                  width="220px"
                  name="group_id"
                  onChange={(e) => {
                    var grp =  bizMainGroupData?.list?.find((d)=>d.group_id==e.target.value);
                     set_group_name(grp.group_name) 
                     set_group_id(e.target.value) 
                    }}
                  color={!group_id ? "error" : null}
                  value={group_id || 0}
                >
                  <option disabled value={0}>
                    {t("ph_select")}
                  </option>
                  {
                    bizMainGroupData?.list?.map((d, i) => <option key={i} value={d.group_id}>{getValueByLang(d.group_name || "{}", lang)}</option>)
                  }
                </Select>
                <PrimaryButton type="button" onClick={loadMNCatgData} disabled={!group_id}>
                  {t("search")}
                </PrimaryButton>
              </InlineFlex>
            </Flex>
            <Flex padding="0 !important" md={6} sm={12} xs={12}>
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
                    bizMainGroupData?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                  }
                </Select>
              </InlineFlex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex row="row">
        <Flex padding="0 !important" md={6} sm={12} xs={12}>
          <BIZMainCatgGridPage gridata={rowData} group_id={group_id} group_name={group_name} />
        </Flex>
      </Flex>
       <BIZMainCatgFormModalPage open={open} setOpen={setOpen} add  />
      <Loading open={isLoading} />
    </>
  );
};
