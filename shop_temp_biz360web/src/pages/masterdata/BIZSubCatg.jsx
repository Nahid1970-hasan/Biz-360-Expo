import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../../features/page/page_slice";
import { Loading } from "../../component/Loading";
import UnAuthorized from "../UnAuthorized";
import { Flex } from "../../component/style/styled_flex";
import { BIZSubCatgFormModalPage } from "../../features/bizSubCatg/BIZSubCatgFormModal";
import { BIZSubCatgGridPage } from "../../features/bizSubCatg/BIZSubCatgGrid";
import { loadBIZMainAllCatgData } from "../../features/bizMainCatg/biz_main_category_slice";
import { initLoader, loadBIZSubCatgData } from "../../features/bizSubCatg/biz_sub_category_slice";
import { InlineFlex } from "../../component/style/styled_inlineflex";
import { Select } from "../../component/style/styled_select";
import { PrimaryButton } from "../../component/style/styled_button";
import { useTranslation } from "react-i18next";
import { getValueByLang } from "../../utils/helper";
import { Label } from "../../component/style/styled_label";

export const BIZSubCatgPage = () => {
  const bizSubCatgData = useSelector((state) => state.bizsubcatgdata);
  const bizMainCatgData = useSelector((state) => state.bizmaincatgdata);
  const [main_id, set_main_id] = useState(0);
  const [main_name, set_main_name] = useState(0);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [lang, set_lang] = useState("en");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(loadBIZMainAllCatgData());
    dispatch(
      loadPage({
        title: ("sub_catg"),
        button: true,
        onClick: () => {
          setOpen(true);
        },
        buttonText: "add_new",
      })
    );
  }, []);

  useEffect(() => {
    bizMainCatgData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [bizMainCatgData.loading]);

  useEffect(() => {
    bizSubCatgData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [bizSubCatgData.loading]);

  function loadMNCatgData(e) {
    e.preventDefault();
    if (main_id) {
      dispatch(loadBIZSubCatgData({ main_id }));
    }
  }

  const rowData = bizSubCatgData?.list.map((d, i) => ({
    ...d,
    "sl": i + 1, 
    sub_name_value: getValueByLang(d.sub_name || "{}", lang),
  }));



  useEffect(() => {
    if (bizSubCatgData.addUpdateLoading == "pending") {
      setIsLoading(true)
    } else if (bizSubCatgData.addUpdateLoading == "succeeded") {
      setIsLoading(false);
      if (main_id) {
        dispatch(loadBIZSubCatgData({ main_id }));
      }
      setTimeout(() => { dispatch(initLoader()); }, 4000);
    } else {
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
    }
  }, [bizSubCatgData.addUpdateLoading]);

  return bizSubCatgData.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
      <Flex row="row">
        <Flex padding="0 !important" md={8} sm={12}>
          <Flex row="row">
            <Flex padding="0 !important" md={6} sm={12} xs={12}>
              <InlineFlex justifycontent="start">
                <Select
                  app="true"
                  width="220px"
                  name="main_id"
                  onChange={(e) => {
                    var grp = bizMainCatgData?.list?.find((d) => d.main_id == e.target.value);
                    set_main_name(grp.main_name)
                    set_main_id(e.target.value)
                  }}
                  color={!main_id ? "error" : null}
                  value={main_id || 0}
                >
                  <option disabled value={0}>
                    {t("ph_select")}
                  </option>
                  {
                    bizMainCatgData?.list?.map((d, i) => <option key={i} value={d.main_id}>{getValueByLang(d.main_name || "{}", lang)}</option>)
                  }
                </Select>
                <PrimaryButton type="button" onClick={loadMNCatgData} disabled={!main_id}>
                  {t("search")}
                </PrimaryButton>
              </InlineFlex>
            </Flex>
            <Flex padding="0 !important" md={6} sm={12} xs={12}>
              <InlineFlex justifycontent="end">
                <Select
                  app="true"
                  name="lang"
                  onChange={(e) => { set_lang(e.target.value) }}
                  value={lang || "en"}
                >

                  <option disabled value={0}>
                    {t("ph_select")}
                  </option>
                  {
                    bizMainCatgData?.langlist?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                  }
                </Select>
              </InlineFlex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex row="row">
        <Flex padding="0 !important" md={8} sm={12} xs={12}>
          <BIZSubCatgGridPage gridata={rowData} main_id={main_id} main_name={main_name} />
        </Flex>
      </Flex>
      <BIZSubCatgFormModalPage open={open} setOpen={setOpen} add />
      <Loading open={isLoading} />
    </>
  );
};
