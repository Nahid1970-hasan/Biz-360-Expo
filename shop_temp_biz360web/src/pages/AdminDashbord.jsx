import { Suspense, useEffect } from "react";
import { forwardRef, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { stringSearch, useOutsideClicker } from "../utils/helper";
import { useTranslation } from "react-i18next";
import { Loading } from "../component/Loading";
import { StyledAdminDashboardHeader } from "../component/style/styled_admin_dashboard_header";
import { Typography } from "../component/style/styled_typography";

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




  useEffect(() => {
    user.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
  }, [user.loading]);


  return (
    <>
      <Suspense>
        <StyledAdminDashboardHeader>
            <Typography> Admin Dashboard</Typography>
        </StyledAdminDashboardHeader>
      </Suspense>
      <Loading open={isLoading} />
    </>
  );
});
