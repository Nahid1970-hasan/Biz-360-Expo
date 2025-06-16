import { Suspense, useEffect } from "react";
import { forwardRef, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { getLogout } from "../features/user/user_slice";
import { daysLeftCount, getValueByLang, stringSearch, TEMPCONST, useOutsideClicker } from "../utils/helper";
import { HeaderButton } from "../component/Button";
import { Menu } from "../component/Menu";
import { MenuItem } from "../component/style/Styled_pub_menu_item";
import { Typography } from "../component/style/styled_typography";
import { Loading } from "../component/Loading";
import { StyledAdminDashboardHeader } from "../component/style/styled_admin_dashboard_header";
import { CircleKDImg, KDImg } from "../component/style/styled_img";
import img from "../assets/logo.jpg"
import { ULine, UnderLine } from "../component/style/styled_uline";
import { Center } from "../component/style/styled_center";
import { ALinkButton, DownloadButton, PrimaryButton } from "../component/style/styled_button";
import { useTranslation } from "react-i18next";
import { InlineDiv } from "../component/style/styled_inlineflex";
import { SizeBox } from "../component/style/styled_sizebox";
import { ProfileSetupModalPage } from "../pages/ProfileSetupModal";
import { loadbizSubscriptionData } from "../features/bizSubscription/biz_subscription_slice";
import { loadBizMemSubsData } from "../features/bizMemSubscription/biz_mem_subscription_slice";
import { Toast } from "../component/Toast";
import bizlogo from "../assets/biz360logo.png";
import { InfoCard } from "../component/style/styled_card";
import { DateTime } from "luxon";
import logo from "../assets/avatar-image/avatar-circle-icon-biz360expo.png";
import profile from "../assets/avatar-image/avatar-icon-biz360expo.png";

export const AdminDashboardHeader = forwardRef(({ title }, ref) => {
  const packageData = useSelector((state) => state.bizmemsubscription);
  const allMenus = JSON.parse(localStorage.getItem("menu") || "[]")
    ?.map((d) =>
      !!d.sub_module
        ? d.sub_module.map((d) => ({
          name: d.sub_module_name_en,
          link: d.page_name,
        }))
        : { name: d.module_name_en, link: d.page_name }
    )
    .flat() || [];
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [pageName, setPageName] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedMenu, setSearchedMenu] = useState(null);
  const [loader, setLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const wraperRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation()
  const user = useSelector((state) => state.user);
  const basicInfo = useSelector((state) => state?.user?.basicInfo);
  const page = useSelector((state) => state.page);
  const [subsInfo, setSubsInfo] = useState({});
  const [ivnoiceData, setIvnoiceData] = useState({});
  const [notifyMsg, setNotifyMsg] = useState("");

  useEffect(() => {
    setSearchOpen(false);
    setPageName(location.pathname.replace("/app/", ""));
  }, [location]);

  useOutsideClicker(wraperRef, () => {
    setOpen(false);
  });
  function logoutHandle(e) {
    dispatch(getLogout());
  }
  function profileHandle(e) {
    setOpen(false);
    { basicInfo?.seasonal_trader == "Yes" ? navigate("/app/dmpro") : basicInfo?.seasonal_trader == "No" && basicInfo?.user_type == "BIZ" ? navigate("/app/bzpro") : basicInfo?.seasonal_trader == "No" && basicInfo?.user_type == "IND" ? navigate("/app/inpro") : navigate("/app/profile") }

  }

  useEffect(() => {
    var dyLft = daysLeftCount(user?.dashboard?.subscription?.sn_expiry_date || DateTime.now().toFormat("yyyy-MM-dd")) || -1;
    var snData = user?.dashboard?.subscription || {};
    var invData = user.dashboard.pending_invoice || {};
    setNotifyMsg(invData?.status === "Under Processing" ? TEMPCONST.payment_status_notify_msg : invData?.status === "Pending" ? TEMPCONST.package_notify_msg : snData.sn_type === "Trial" ? dyLft < 0 ? TEMPCONST.package_expired_notify_msg :TEMPCONST.trail_notify_msg :  "");
    setSubsInfo(user?.dashboard?.subscription || {});
    setIvnoiceData(user?.dashboard?.pending_invoice || {});
  }, [user?.dashboard]);

  function cngPassHandle(e) {
    setOpen(false);
    navigate("/app/chgpass");
  }

  useEffect(() => {
    if (!user.login) {
      navigate("/login");
    }
    if (search != "") {
      setLoader(true);
      stringSearch(allMenus, search, "name").then((d) => {
        setSearchedMenu(d);
        setLoader(false);
        setSearchOpen(true);
      });
    } else {
      setSearchedMenu(null);
      setLoader(false);
      setSearchOpen(false);
    }
  }, [user, search]);


  useEffect(() => {
    user.lgloading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [user.lgloading]);

  // useEffect(() => {
  //   if (packageData.loading == "pending") {
  //     setIsLoading(true);
  //   } else if (packageData.loading == "succeeded") {
  //     setIsLoading(false); setProfileOpen(true);
  //   } else if (packageData.loading == "failed") {
  //     setTimeout(() => { setIsLoading(false); }, 2000);
  //   }
  // }, [packageData.loading]);

  return (
    <>
      {(packageData.addUpdateLoading == "idle" || packageData.addUpdateLoading == "pending") ? <></> : (
        packageData.addUpdateLoading == "succeeded" ? (
          <Toast color="success" msg={packageData.msg} />
        ) : (<Toast color="error" msg={packageData.msg} />)
      )}
      <Suspense>
        <StyledAdminDashboardHeader>
          <div>
            <a ref={ref}>
              <span className="material-icons md-36">menu</span>
            </a>
            <span>{t(page.title)}</span>
            {page.button && (
              <HeaderButton onClick={page.onClick}>
                {page.prefixIcon && (<span className="material-icons">{page.prefixIcon}{"  "}</span>)}
                {t(page.buttonText)}
                {page.buttonIcon && (<span className="material-icons">{page.buttonIcon}</span>)}
              </HeaderButton>
            )}
            <div>
              <ul> {notifyMsg && <div style={{ marginLeft: "20px" }}>
                  <InfoCard padding="2px 5px" background="error">
                    <InlineDiv justifycontent="center">
                      <Typography txtalign="center" color="primaryFont">{notifyMsg}</Typography>
                      {ivnoiceData?.status === "Pending" && <ALinkButton onClick={() => { navigate("/app/ininv") }} margin="4px 0" fntsize="smFont">{t("pay_now")}</ALinkButton>}
                    </InlineDiv>
                  </InfoCard>
                </div>
              }
              </ul>
                <ul>
                  {/* {basicInfo?.user_type != "COM" &&
                  (<li>
                    <HeaderButton onClick={() => {
                      dispatch(loadBizMemSubsData());
                    }}>
                      {t("upgrade_membership")}
                    </HeaderButton>
                  </li>)
                }
                <li><SizeBox width="10px" /></li> */}
                  {basicInfo?.user_type == "COM" ? <li ref={wraperRef}>
                    <a onClick={() => setOpen(!open)}>

                      {/* <div>{fullname}</div> */}
                      <CircleKDImg height={40} width={40} padding="0">
                        <KDImg src={logo} height={"auto"}
                          width={"auto"} noborder="true" />
                      </CircleKDImg>

                    </a>
                    <Menu open={open} width="180px" right={"15px"} top={(wraperRef?.current?.offsetTop + 40) + "px"}>

                      <ULine h="10px" />
                      <MenuItem active={pageName == 'profile' ? "active" : ""} onClick={profileHandle}

                      >
                        <InlineDiv justifycontent="start">
                          {/* <KDImg src={profile} height={"auto"}
                          width={"auto"} noborder="true" /> */}
                          <span className="material-icons md-20">account_circle</span>
                          <Typography color="font" txtalign="left">{t("profile")}</Typography>
                        </InlineDiv>
                      </MenuItem>
                      <UnderLine />
                      <MenuItem active={pageName == 'change-pass' ? "active" : ""} onClick={cngPassHandle}>
                        <InlineDiv justifycontent="start">
                          <span className="material-icons md-20">key</span>
                          <Typography color="font" txtalign="left">{t("chang_pass")}</Typography>
                        </InlineDiv>
                      </MenuItem>
                      <UnderLine />
                      <MenuItem onClick={logoutHandle} highligh="SW">
                        <InlineDiv justifycontent="start">
                          <span className="material-icons md-20">logout</span>
                          <Typography color="font" txtalign="left">{t('logout')}</Typography>
                        </InlineDiv>

                      </MenuItem>
                    </Menu>
                  </li> : <KDImg height={"50px"} src={bizlogo} />}
                </ul>
            </div>
          </div>
        </StyledAdminDashboardHeader>
      </Suspense>
      <Loading open={isLoading} />
      {/* <ProfileSetupModalPage open={profileOpen} setOpen={setProfileOpen} /> */}
    </>
  );
});

