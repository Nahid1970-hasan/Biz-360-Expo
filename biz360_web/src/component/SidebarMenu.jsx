import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "./style/styled_typography";
import { MenuListItem } from "./MenuListItem";
import { getValueByLang } from "../utils/helper";

export const SidebarMenu = ({ item }) => {
  const [subMod, setSubMod] = useState(false);
  const { t, i18n } = useTranslation();
  return (
    <>
      {!item.sub_module ? (
        <MenuListItem title={getValueByLang(item.module_name || "{}")} icon={item.icon_name} link={item.page_name} />

      ) : (

        <li
          className={!subMod ? "collapsible collapsed" : "collapsible"}
        >
          <a onClick={() => setSubMod(!subMod)}>
            <Typography txtalign="left" color="font" >
              <span className="material-icons md-18">{item.icon_name}</span>
              {getValueByLang(item.module_name || "{}")}
            </Typography></a>
          <ul style={{ display: subMod ? "block" : "none" }}>
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
