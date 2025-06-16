import { Suspense, useEffect, useState } from "react"
import { Center } from "../../component/style/styled_center"
import { Typography } from "../../component/style/styled_typography"
import { Flex } from "../../component/style/styled_flex"
import { BIZTempMenuGridPage } from "../../features/bizTemplateMenu/BIZTempMenuGrid"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { loadPage } from "../../features/page/page_slice"
import { loadBIZTempMenuData, initLoader } from "../../features/bizTemplateMenu/biz_template_menu_slice"
import UnAuthorized from "../UnAuthorized"
import { Loading } from "../../component/Loading"
import { getValueByLang } from "../../utils/helper"
import { BIZTempModal } from "../../features/bizTemplateMenu/BIZTempModal"
import { InlineFlex } from "../../component/style/styled_inlineflex"
import { Select } from "../../component/style/styled_select"

export const UpdateTempMenuPage = () => {
  const bizTmpMenuData = useSelector((state) => state.biztempmenudata);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lang, set_lang] = useState("en");

  useEffect(() => {
    dispatch(loadBIZTempMenuData());
    dispatch(
      loadPage({
        title: ("biz_menu"),
        button: true,
        onClick: () => {
          setOpen(true);
        },
        buttonText: "add_new",
      })
    );
  }, []);

  const rowData = bizTmpMenuData?.menuList?.map((d, i) => ({
    ...d,
    "sl": i + 1,
    menu_name_value: getValueByLang(d.menu_name || "{}", lang),
  }));
  useEffect(() => {
    bizTmpMenuData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [bizTmpMenuData.loading]);

  useEffect(() => {
    if (bizTmpMenuData.addUpdateLoading == "pending") {
      setIsLoading(true)
    } else if (bizTmpMenuData.addUpdateLoading == "succeeded") {
      setIsLoading(false);
      dispatch(loadBIZTempMenuData());
      setTimeout(() => { dispatch(initLoader()); }, 4000);
    } else {
      setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
    }
  }, [bizTmpMenuData.addUpdateLoading]);

  return bizTmpMenuData.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (<>
    <Suspense>
      <Flex row="row">
        <Flex padding="0 0 10px 0 !important" md={8} sm={12} xs={12}>
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
                bizTmpMenuData?.langList?.map((d, i) => <option key={i} value={d.language_code}>{d.language_name}</option>)
              }
            </Select>
          </InlineFlex>

        </Flex>
      </Flex>
      <Flex row="row">
        <Flex padding="0 !important" md={8} sm={12} xs={12}>
          <BIZTempMenuGridPage gridata={rowData} />
        </Flex>
      </Flex>
      <BIZTempModal open={open} setOpen={setOpen} add />
      <Loading open={isLoading} />
    </Suspense>
  </>)
}