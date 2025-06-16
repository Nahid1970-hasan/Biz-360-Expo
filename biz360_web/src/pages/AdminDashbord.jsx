import { Suspense, useEffect } from "react";
import { forwardRef, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getValueByLang, stringSearch, useOutsideClicker } from "../utils/helper";
import { useTranslation } from "react-i18next";
import { Loading } from "../component/Loading";
import { Typography, ULine } from "../component/style/styled_typography";
import { InfoCard, InfoTitle } from "../component/style/styled_card";
import { Flex } from "../component/style/styled_flex";
import DataGrid from "../component/DataGrid";
import { loadPage } from "../features/page/page_slice";

export const AdminDashboardPage = forwardRef(({ title }, ref) => {
  const allMenus = JSON.parse(localStorage.getItem("menu") || "[]")
    .map((d) =>
      !!d.sub_module
        ? d.sub_module.map((d) => ({
          name: d.sub_module_name_en,
          link: d.page_name,
        }))
        : { name: d.module_name_en, link: d.page_name }
    )
    .flat();

        useEffect(() => {
            dispatch(
                loadPage({
                    title: ("dashboard"),
                    button: false,
                    onClick: () => {
                        setOpen(true);
                    },
                    buttonText: "add_new",
                })
            );
        }, []);
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [pageName, setPageName] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const wraperRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const user = useSelector((state) => state.user);

  const fullname = useSelector((state) => state.user.fullname);
  const page = useSelector((state) => state.page);
  const [basic_info, set_basic_info] = useState({});
  const [lang, set_lang] = useState("en");
  
var basicInfo=user?.basicInfo;
  var userStatus =user?.dashboard?.users_by_status||[] ;
  var userType = user?.dashboard?.users_by_type;
  var templateList = user?.dashboard?.templates;
  var responseType = user?.dashboard?.pending_response_count;

  useEffect(() => {
    setSearchOpen(false);
    setPageName(location.pathname.replace("/app/", ""));
  }, [location]);

  useOutsideClicker(wraperRef, () => {
    setOpen(false);
  });


  const statusColums = [
    {
      headerName: "status",
      field: "status",
      description: "status",
      type: "state",
    },
    {
      headerName: "count",
      field: "count",
      width: "80px", 
      description: "count",
      type: "number",
    },
  ];

  const templatesColums = [
    {
      headerName: "template_name",
      field: "template_name",
      description: "template_name",
      type: "string",
    },
    {
      headerName: "count",
      field: "count",
      alignment: "center",
      description: "count",
      width: "80px",
      type: "number",
    },
  ];
  const usertypeColums = [
    {
      headerName: "user_type",
      field: "user_type",
      description: "user_type",
      type: "string",
    },
    {
      headerName: "count",
      field: "count",
      alignment: "center",
      description: "count",
      width: "80px",
      type: "number",
    },
  ];

  const rowstatus = userStatus.map((d, i) => ({
    ...d,
    status: {
      label: d.status,
      color: d.status == "Approved" ? "success" : "error",
    },
}));

  return (
    <>
      <Suspense>
        <Flex row="row">
          <Flex md={4} padding="0 0 10px 0!important">
            <InfoCard>
            <InfoTitle> 
              <Typography fntsize="bodyTitleFontSize"  fntweight="bold">
                {t("user_info")}
              </Typography>
            </InfoTitle>
              <Flex row="row">
                <Flex md={5} padding="0 !important">
                <Typography fntsize="bodySubTitleFontSize" txtalign="right" fntweight="bold">
                {t("fullname")}
                </Typography>
               
                </Flex>
                <Flex md={1}padding="5px 0 0 15px!important"> {":"}</Flex>
                <Flex md={6} padding="0 !important">
                <Typography fntsize="bodySubTitleFontSize"txtalign="left">
                {user?.fullname}
            </Typography>
          
                </Flex>
              </Flex>
              <Flex row="row">
                <Flex md={5} padding="0 !important">
                <Typography fntsize="bodySubTitleFontSize" txtalign="right" fntweight="bold">
                {t("user_type")}
                </Typography>
               
                </Flex>
                <Flex md={1}padding="5px 0 0 15px!important"> {":"}</Flex>
                <Flex md={6} padding="0 !important">
                <Typography fntsize="bodySubTitleFontSize"txtalign="left">
                {basicInfo?.user_type}
            </Typography>
                </Flex>
              </Flex>
              <Flex row="row">
                <Flex md={5} padding="0 !important">
                <Typography fntsize="bodySubTitleFontSize" txtalign="right" fntweight="bold">
                {t("def_lang")}
                </Typography>
               
                </Flex>
                <Flex md={1}padding="5px 0 0 15px!important"> {":"}</Flex>
                <Flex md={6} padding="0 !important">
                <Typography fntsize="bodySubTitleFontSize"txtalign="left">
                {basicInfo?.default_lang}
            </Typography>
                </Flex>
              </Flex>
            </InfoCard>
          </Flex>
          <Flex md={4}></Flex>
          <Flex md={4}>
          <InfoTitle background="aboutContent">
          <Flex row="row">
                <Flex md={12} padding="5px 0 !important">
                <Typography fntsize="cardTitleFontSize" txtalign="center" fntweight="bold">
                {t("panding_res")}
                </Typography>
               
                </Flex>
                <ULine/>
                <Flex md={12} padding="5px 0 !important">
                <Typography fntsize="infoCardTitleFontSize"txtalign="center">
                {responseType}
            </Typography>
          
                </Flex>
              </Flex>
            </InfoTitle>
          </Flex>
        </Flex>
        <br/>
      <Flex row='row'>
        <Flex padding="0 5px!important" md={4} sm={6} xs={12}>
          <InfoCard background="aboutContent">
          <InfoTitle> 
              <Typography fntsize="bodyTitleFontSize"  fntweight="bold">
                {t("temp_detail")}
              </Typography>
            </InfoTitle>
          <DataGrid colums={templatesColums} rows={templateList || []} />
          </InfoCard>
        </Flex>
        <Flex padding="0 5px!important" md={4} sm={6} xs={12}>
          <InfoCard background="tooltip">
          <InfoTitle> 
              <Typography fntsize="bodyTitleFontSize"  fntweight="bold">
                {t("status_detail")}
              </Typography>
            </InfoTitle>
          <DataGrid colums={statusColums} rows={rowstatus || []} />
          </InfoCard>
        </Flex>
        <Flex padding="0 5px!important" md={4} sm={6} xs={12}>
       
          <InfoCard background="errorgrid">
          <InfoTitle> 
              <Typography fntsize="bodyTitleFontSize"  fntweight="bold">
                {t("user_type_detail")}
              </Typography>
            </InfoTitle>
          <DataGrid colums={usertypeColums} rows={userType || []} />
          </InfoCard>
        </Flex>

    
      </Flex>
     
      <Loading open={isLoading} />
    </Suspense>
      <Loading open={isLoading} />
    </>
  );
});
