
import { useRef } from "react";
import { useEffect } from "react";
import { forwardRef } from "react";
import { useState } from "react";
import { langs, MODULES } from "../utils/helper";
import { PublicMenu } from "../component/PublicMenu";
import { useSelector } from "react-redux";
import { StyledRightSidebar } from "../component/styled_sidebar_right";
import { PubSideMenu } from "../component/PubSideMenu";
import logo from "../assets/Icone-Medium-100x79.png";
import { Link } from "react-router-dom";
import { SizeBox } from "../component/style/styled_sizebox";
import { InlineDiv } from "../component/style/styled_inlineflex";
import { CheckboxChildren } from "../component/Checkbox";
import { Label } from "../component/style/styled_label";
 
import { RadioChildren } from "../component/RadioButton";
import { useTranslation } from "react-i18next";
import { ULine } from "../component/style/styled_typography";

export const PubNavSideBar = forwardRef((_, ref) => {
    const scrollRef = useRef(null);
    const itemRef = useRef(null);
    const { t, i18n } = useTranslation();
    const [indexUrl, setIndexUrl] = useState("/");
    const [lang, set_lang] = useState(localStorage.i18nextLng || 'en');
    const pubMenuData = useSelector((state) => state.pubmenu);

    useEffect(() => {
            i18n.changeLanguage(lang); 
        }, []);

    function handleScroll(e) {
        let element = scrollRef.current;
        element.classList.add("show");
        setTimeout(() => element.classList.remove("show"), 1000);
        let scrollHeight = e.target.clientHeight / e.target.scrollHeight;
        element.style.height = scrollHeight * 100 + "%";
        element.style.transform = "translate3d(0px, " + e.target.scrollTop + "px, 0px)";
    }

    useEffect(() => {
        let element = itemRef.current;

        function collapsedSidebar() {
            itemRef.current.parentElement.parentElement.style.marginRight = "-271px";
            itemRef.current.parentElement.parentElement.nextElementSibling.classList.remove("obscure");
        }
        element.addEventListener("click", collapsedSidebar);

        return () => {
            element.removeEventListener("click", collapsedSidebar);
        }

    }, [itemRef]);

    return (
        <>
            <StyledRightSidebar ref={ref}>
                <div onScroll={handleScroll}>
                    <div className="logo">
                        <img src={logo} alt="LOGO" />
                    </div>
                    <ul>
                        <InlineDiv padding="0 10px" justifycontent="end">
                            <RadioChildren size="md" checked={lang == "en"} onClick={() => lang != "en" && (i18n.changeLanguage('en'), set_lang('en'))}>
                                <Label>{langs['en'].nativeName} </Label>
                            </RadioChildren>
                            <RadioChildren size="md" checked={lang == "bn"} onClick={() => lang != "bn" && (i18n.changeLanguage('bn'), set_lang('bn'))}>
                                <Label fnfamily="var(--bangla-font)">{langs['bn'].nativeName} </Label>
                            </RadioChildren>
                        </InlineDiv>
                    </ul>
                    <ULine/>

                    <ul ref={itemRef}>
                        {pubMenuData?.moduleList?.map((item, i) => (
                            <PubSideMenu key={i} item={item} />
                        ))}
                    </ul>
                </div>
                <div>
                    <div ref={scrollRef}></div>
                </div>
            </StyledRightSidebar>
            <div className=""></div>
        </>
    );
});
