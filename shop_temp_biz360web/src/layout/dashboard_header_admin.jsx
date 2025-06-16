import { Suspense, useEffect } from "react";
import { forwardRef, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { getLogout } from "../features/user/user_slice";
import { stringSearch, useOutsideClicker } from "../utils/helper";
import { useTranslation } from "react-i18next";
import { HeaderButton } from "../component/Button";
import { Menu } from "../component/Menu";
import { MenuItem } from "../component/style/Styled_pub_menu_item";
import { Typography } from "../component/style/styled_typography";
import { Loading } from "../component/Loading";
import { StyledAdminDashboardHeader } from "../component/style/styled_admin_dashboard_header";
import { KDImg } from "../component/style/styled_img";
import img from "../assets/logo.jpg"
import { ULine } from "../component/style/styled_uline";
import { Center } from "../component/style/styled_center";

export const AdminDashboardHeader = forwardRef(({ title }, ref) => {
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

  const fullname = useSelector((state) => state.user.fullname);
  const page = useSelector((state) => state.page);

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
    navigate("/app/profile");
  }
  function cngPassHandle(e) {
    setOpen(false);
    navigate("/app/change-pass");
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
    user.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [user.loading]);


  return (
    <>
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
              <ul>
                <li ref={wraperRef}>
                  <a onClick={() => setOpen(!open)}>
                    {/* <Avatar /> */}
                    <div>{fullname}</div>
                    <span
                      className="material-icons md-18"
                      style={{ verticalAlign: "middle" }}
                    >
                      arrow_drop_down
                    </span>
                  </a>
                  <Menu open={open} width="300px" right={(wraperRef?.current?.offsetLeft + 10) + "px"} top={(wraperRef?.current?.offsetTop + 20) + "px"}>
                    <ULine h="10px" />
                    <Center><KDImg src={img} height="80px" width="120px"></KDImg></Center>
                    <ULine h="10px" />
                    <MenuItem active={pageName == 'profile' ? "active" : ""} onClick={profileHandle}>
                      <Typography color="font" txtalign="left">{t("profile")}</Typography>
                    </MenuItem>
                    <MenuItem active={pageName == 'change-pass' ? "active" : ""} onClick={cngPassHandle}>
                      <Typography color="font" txtalign="left">{t("chang_pass")}</Typography>
                    </MenuItem>
                    <MenuItem onClick={logoutHandle} highligh="SW">
                      <Typography color="font" txtalign="left">{t('logout')}</Typography>
                    </MenuItem>
                  </Menu>
                </li>
              </ul>
            </div>
          </div>
        </StyledAdminDashboardHeader>
      </Suspense>
      <Loading open={isLoading} />
    </>
  );
});
