import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "./style/styled_typography";
import { MenuListItem } from "./MenuListItem";
import { getValueByLang } from "../utils/helper";

export const PubSideMenu = ({ item }) => {
    const [subMod, setSubMod] = useState(false);
    const { t, i18n } = useTranslation();
    return (
        <>
            {!item.sub_module ? (
                <MenuListItem title={getValueByLang(item.module_name || "{}")} link={item.page_name} />

            ) : (

                <li>  
                    <label>{getValueByLang(item.module_name || "{}")}</label>
                    <ul >
                        {item.sub_module.map(
                            (subMenu, i) =>
                                <MenuListItem key={i} title={getValueByLang(subMenu.sub_name || "{}")} link={subMenu.page_name} />
                        )}
                    </ul>
                </li>
            )}
        </>
    );
};
