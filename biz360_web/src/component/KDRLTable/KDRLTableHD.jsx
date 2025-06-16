import { memo } from "react";
import { KDTHDw, KDTRw } from "../style/styled_kdrl_table";
import {t} from "i18next";

export const KDHeaderBuilder = memo(({ headerdata }) => { 
    return (<KDTRw rwcolor='modalHeader'>
        {headerdata?.map((header, i) => (<KDTHDw key={i} width={header.width||"auto"}>{t(header.title)} </KDTHDw>))}
    </KDTRw>);
});