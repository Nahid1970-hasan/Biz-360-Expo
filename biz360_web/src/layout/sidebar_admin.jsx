
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { forwardRef } from "react";
import logo from "../assets/Round_Logo_Red.jpg"
import { StyledAdminSidebar } from "../component/style/styled_admin_sidebar";
import { SidebarMenu } from "../component/SidebarMenu";
import { t } from "i18next";
import { Typography } from "../component/style/styled_typography";
import { getLogout } from "../features/user/user_slice";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "../component/style/styled_label";
import { MenuListItem } from "../component/MenuListItem";
import { useTranslation } from "react-i18next";
import { ULine, UnderLine } from "../component/style/styled_uline";

export const SideBarAdmin = forwardRef((_, ref) => {
  const scrollRef = useRef(null);
  const userinfo = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  function handleScroll(e) {
    let element = scrollRef.current;
    element.classList.add("show");
    setTimeout(() => element.classList.remove("show"), 1000);

    let scrollHeight = e.target.clientHeight / e.target.scrollHeight;

    element.style.height = scrollHeight * 100 + "%";

    element.style.transform =
      "translate3d(0px, " + e.target.scrollTop + "px, 0px)";
  }
  const menu = JSON.parse(localStorage.getItem("menu")) || [];

  function logoutHandle(e) {
    dispatch(getLogout());
  }

  return (
    <>
      <StyledAdminSidebar ref={ref}>
        <div onScroll={handleScroll}>
          <div className="logo">
            <Link to="/app">
              <img src={userinfo?.user_type == "COM" ? (userinfo?.dashboard?.photo?.logo || logo) : userinfo?.dashboard?.photo?.logo ? userinfo?.dashboard?.photo?.logo : (userinfo?.dashboard?.photo?.photo || logo)} alt="Logo" />
            </Link>
          </div>
          <div><Typography>{userinfo?.biz_name ? userinfo?.biz_name : (userinfo?.fullname || "")}</Typography> </div>
          {userinfo?.mobile && <div><Typography>{t("mobile")}{":"} {(userinfo?.mobile || "")}</Typography> </div>}
          <ul><ULine h={"2px"}/></ul>
          {/* <ul>
            <li><Typography color="font" txtalign="left">
              <a href="/#/app/profile">
              <span className="material-icons md-18">person</span> {t("profile")} </a></Typography></li>
            <li><Typography color="font" txtalign="left"><a href="/#/app/change-pass">
            <span className="material-icons md-18">change_circle</span>  {t("change_pass")} </a></Typography></li>

            <li onClick={logoutHandle} >
              <a> 
                <Typography color="font" txtalign="left"><span className="material-icons md-18">logout</span> {t('logout')}</Typography>
              </a>

            </li>
          </ul> */}

          <ul>
            <div><MenuListItem title={t("dashboard")} icon={"home"} link={"/app"} /></div>
            {menu?.map((item, i) =>
              <div key={i}>
                {item.group_name == "Home" ? <></> : <label>{item.group_name || ""}</label>}
                {
                  item.modules.sort((a, b) => a.module_id - b.module_id)?.map((d, j) => <SidebarMenu key={j} item={d} />)
                }
              </div>
            )}
            {userinfo?.user_type != "COM" && <div>
              <li>
                <a onClick={(e) => { logoutHandle(e) }}> <Typography txtalign="left" color="font">
                  {<span className="material-icons md-18">logout</span>}
                  {t("logout")}
                </Typography> </a>
              </li>
            </div>}
          </ul>
        </div>

        <div>
          <div ref={scrollRef}></div>
        </div>
      </StyledAdminSidebar>
      <div className=""></div>
    </>
  );
});
