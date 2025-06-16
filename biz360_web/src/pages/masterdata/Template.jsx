import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../../features/page/page_slice";
import { Loading } from "../../component/Loading";
import UnAuthorized from "../UnAuthorized";
import { Flex } from "../../component/style/styled_flex";
import { useTranslation } from "react-i18next";
import { InlineFlex } from "../../component/style/styled_inlineflex";
import { Select } from "../../component/style/styled_select";
import { PrimaryButton } from "../../component/style/styled_button";
import { getValueByLang } from "../../utils/helper";
import { BizTemplateGrid } from "../../features/bizTemplate/BIZTemplateGrid";
import { initLoader, LoadBizTemplateData, LoadGetTemplateData } from "../../features/bizTemplate/template_slice";
import { BizTemplateModal } from "../../features/bizTemplate/BizTemplateModal";

export const TemplatePage = () => {
  const biztempdata = useSelector((state) => state.biztempdata);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lang, set_lang] = useState("en");
  const [group_id, set_group_id] = useState(0);
  const [group_name, set_group_name] = useState(0);

  useEffect(() => {
    dispatch(LoadBizTemplateData());
    dispatch(
      loadPage({
        title: ("biz_template"),
        button: true,
        onClick: () => {
          setOpen(true);
        },
        buttonText: "add_new",
      })
    );
  }, []);

  function loadTemplateData(e) {
    e.preventDefault();
    if (group_id) {
      dispatch(LoadGetTemplateData({ group_id }));
    }
  }

  useEffect(() => {
    biztempdata.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [biztempdata.loading]);

  const rowData = biztempdata?.tempList.map((d, i) => ({
    ...d,
    "sl": i + 1,
    main_name_value: getValueByLang(d.main_name || "{}", lang),
    template_desc_value: getValueByLang(d.template_desc || "{}", lang),
    published: {
      label: d.published == 1 ? "Published" : "Pendding",
      color: d.published == 1 ? "success" : "error",
    },
  }));

  useEffect(() => {
    if (biztempdata.addUpdateLoading == "pending") {
      setIsLoading(true)
    } else if (biztempdata.addUpdateLoading == "succeeded") {
      setIsLoading(false);
      dispatch(LoadBizTemplateData());
      setTimeout(() => { dispatch(initLoader()); }, 4000);
    } else {
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
    }
  }, [biztempdata.addUpdateLoading]);


  return biztempdata.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
      <Flex row="row">
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <Flex row="row">
            <Flex padding="0 !important" md={6} sm={12} xs={12}>
              <InlineFlex justifycontent="start">
                <Select
                  app="true"
                  width="220px"
                  name="group_id"
                  onChange={(e) => {
                    var grp = biztempdata?.list?.find((d) => d.group_id == e.target.value);
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
                    biztempdata?.list?.map((d, i) => <option key={i} value={d.group_id}>{getValueByLang(d.group_name || "{}", lang)}</option>)
                  }
                </Select>
                <PrimaryButton type="button" onClick={loadTemplateData} disabled={!group_id}>
                  {t("search")}
                </PrimaryButton>
              </InlineFlex>
            </Flex>
            <Flex padding="5px 0 0 0 !important" md={6} sm={12} xs={12}>
              <InlineFlex justifycontent="flex-end">
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
                    biztempdata?.languageList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
                  }
                </Select>
              </InlineFlex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex row="row">
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <BizTemplateGrid gridata={rowData} group_id={group_id} group_name={group_name} />
        </Flex>
      </Flex>
      <BizTemplateModal open={open} setOpen={setOpen} add />
      <Loading open={isLoading} />
    </>
  );
};
