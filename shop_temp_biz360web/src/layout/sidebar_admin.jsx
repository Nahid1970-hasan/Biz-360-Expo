 
import { Link} from "react-router-dom"; 
import { useRef } from "react"; 
import { forwardRef } from "react";
import logo from "../assets/logo.jpg"
import { StyledAdminSidebar } from "../component/style/styled_admin_sidebar";
import { SidebarMenu } from "../component/SidebarMenu";
import { t } from "i18next";
import { Typography } from "../component/style/styled_typography";

export const SideBarAdmin = forwardRef((_,ref) => {
  const scrollRef = useRef(null);

  function handleScroll(e) {
    let element = scrollRef.current;
    element.classList.add("show");
    setTimeout(() => element.classList.remove("show"), 1000);

    let scrollHeight = e.target.clientHeight / e.target.scrollHeight;

    element.style.height = scrollHeight * 100 + "%";

    element.style.transform =
      "translate3d(0px, " + e.target.scrollTop + "px, 0px)";
  }

  const menu = JSON.parse(localStorage.getItem("menu"))|| [];

  return (
    <>
      <StyledAdminSidebar ref={ref}>
        <div onScroll={handleScroll}>
          <div className="logo">
            <Link to="/app">
              <img src={logo} alt="LOGO" />
            </Link>
          </div>
          <ul>
          <li><Typography  color="font"><a href="/#/app/profile">
           {t("profile")} </a></Typography></li>
           <li><Typography  color="font"><a href="/#/app/change-pass">
           {t("change_pass")} </a></Typography></li>
          </ul>
          <ul>
            {menu.map((item, i) => (
              <SidebarMenu key={i} item={item} />
            ))} 
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
