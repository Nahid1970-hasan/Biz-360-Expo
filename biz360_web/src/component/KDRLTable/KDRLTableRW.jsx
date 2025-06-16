import { memo } from "react";
import {  CheckboxChildren } from "../Checkbox";
import { Input } from "../style/styled_input";
import { KDTDw, KDTRw } from "../style/styled_kdrl_table";
import {t} from "i18next";
export const KDRowBuilder = memo(({ rwdata, rows, coldata, setRows = (() => { }) }) => {

     function updateCheckedRow(e, row) { 
        setRows(rows => rows?.map(d => d == row ? { ...d, [e.target.id]: d[e.target.id]==1?0:1 } : d)); 
    }
    function updateInputRow(e, row) { 
        setRows(rows => rows?.map(d => d == row ? { ...d, [e.target.name]: e.target.value } : d));
    }
    return (<KDTDw width={coldata.width || "auto"}>
                        {coldata.type === "input" ?
                            <Input
                                app="true"
                                type={coldata.intype || "text"}
                                width={coldata.inwidth || "100%"}
                                name={coldata.field}
                                placeholder={coldata.placeholder || t("not_set")}
                                value={rwdata[coldata.field] || ""}
                                onChange={(e)=>updateInputRow(e, rwdata)}
                            /> :
                            coldata.type === "checkbox" ?
                                <CheckboxChildren
                                    size={"md"}
                                    id={coldata.field}
                                    checked={rwdata[coldata.field] || false} 
                                    onClick={(e)=>updateCheckedRow(e, rwdata)}
                                /> :( rwdata[coldata.field]||"---")} 
                    </KDTDw>);
});
 