import { useRef, useState } from "react";
import { useOutsideClicker } from "../utils/helper";
import { useTranslation } from "react-i18next";
import { GreenBox, Typography, ULine } from "./style/styled_typography";
import { Menu } from "./Menu";
import { MenuItem } from "./style/Styled_pub_menu_item";
import { InlineFlex } from "./style/styled_inlineflex";
import { ALinkButton } from "./style/styled_button";

export const PublicLngMenu = () => {
    const [subLng, setSubLng] = useState(false);
    const subLngRef = useRef(null);
    useOutsideClicker(subLngRef, () => { setSubLng(false) });
    const { t, i18n } = useTranslation();



    return (
        <div ref={subLngRef}>
            <InlineFlex justifycontent="end">
                <Typography
                    fnfamily="var(--dashboard-font)"
                    txtalign="left"
                    fntcolor="font"
                    margin="0 5px"
                    onClick={(e) => { i18n.changeLanguage("en"); }}
                >

                    {t("English")}

                </Typography>
                {" "}{" | "}{" "}
                <Typography
                    fntcolor="font"
                    fntsize="buttonFontSize"
                    margin="5px 5px 0 5px"
                    onClick={(e) => { i18n.changeLanguage("bn");
                         setSubLng(!subLng) }}
                    // onClick={(e) => setSubLng(!subLng)}
                    txtalign="left"
                    fnfamily="var(--bangla-font)"
                // color={localStorage.i18nextLng == "bn" ? "cardContent" : "infoCardContent"}
                >

                    {t("বাংলা")}

                </Typography>
            </InlineFlex>
            {/* <Menu open={subLng} width="60px" right={(subLngRef?.current?.offsetHeight + 40) + "px"} top={(subLngRef?.current?.offsetTop + 40) + "px"}>
                <MenuItem active={localStorage.i18nextLng == "ar" ? "active" : ""}>
                    <Typography color="font" txtalign="left" onClick={(e) => { i18n.changeLanguage("ar"); setSubLng(!subLng) }}>{t("Arabic")}</Typography>
                </MenuItem>
                <ULine />
                <MenuItem active={localStorage.i18nextLng == "bn" ? "active" : ""}
                    onClick={(e) => { i18n.changeLanguage("bn"); setSubLng(!subLng) }}
                >
                    <Typography color="font" txtalign="left">{t('বাংলা')}</Typography>
                </MenuItem>
            </Menu> */}

        </div>
    );
};
