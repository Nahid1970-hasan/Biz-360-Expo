
import { useRef } from "react";
import { useEffect } from "react";
import { forwardRef } from "react";
import { useState } from "react"; 
import { useSelector } from "react-redux"; 
import { StyledLeftSidebar } from "../../component/styled_sidebar_left";
import { TempNavMenu } from "./layout_temp_nav_menu";

export const LayoutDemoSideBar = forwardRef((_, ref) => {
    const scrollRef = useRef(null);
    const itemRef = useRef(null);
    const [indexUrl, setIndexUrl] = useState("/");
    const profilePubData = useSelector((state) => state.pubprofiledata);
    const [logo, set_logo] = useState("");
    const [langList, set_LangList] = useState([]);
    const [moduledata, set_module_data] = useState([]);

    function handleScroll(e) {
        let element = scrollRef.current;
        element.classList.add("show");
        setTimeout(() => element.classList.remove("show"), 1000);
        let scrollHeight = e.target.clientHeight / e.target.scrollHeight;
        element.style.height = scrollHeight * 100 + "%";
        element.style.transform = "translate3d(0px, " + e.target.scrollTop + "px, 0px)";
    }

    useEffect(() => {
        set_logo(profilePubData?.headerData?.logo || "");
        set_LangList(profilePubData?.langList || []);
        set_module_data(profilePubData?.moduleList?.filter((d) => d.menu_position == "header") || []);
    }, [profilePubData]);

    useEffect(() => {
        let element = itemRef.current;

        function collapsedSidebar() {
            itemRef.current.parentElement.parentElement.style.marginLeft = "-271px";
            itemRef.current.parentElement.parentElement.nextElementSibling.classList.remove("obscure");
        }
        element.addEventListener("click", collapsedSidebar);

        return () => {
            element.removeEventListener("click", collapsedSidebar);
        }

    }, [itemRef]);

    return (
        <>
            <StyledLeftSidebar ref={ref}>
                <div onScroll={handleScroll}>
                    <div className="logo">
                        <img src={logo||"#"} alt="LOGO" />
                    </div>
                    <ul ref={itemRef}>
                        {moduledata?.map((item, i) => (
                            <TempNavMenu key={i} item={item} />
                        ))}
                    </ul>
                </div>
                <div>
                    <div ref={scrollRef}></div>
                </div>
            </StyledLeftSidebar>
            <div className=""></div>
        </>
    );
});
