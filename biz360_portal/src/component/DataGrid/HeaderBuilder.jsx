import { GridContext } from ".";

import { CellItem } from "../style/styled_datagrid";
import { useContext, useState } from "react";
import { IconButton } from "../IconButton";
import { Tooltip } from "../Tooltip";
import { Checkbox } from "../Checkbox";
import { useEffect } from "react";
import { memo } from "react";
import { useTranslation } from "react-i18next";

export const HeaderBuilder = memo(() => {
  const { mainSelect, setMainSelect, setRows, colums, sortGrid, asc } = useContext(GridContext);
  const { t } = useTranslation();

  useEffect(() => {
    if (mainSelect == 1) { 
      setRows(rows => rows.map(d => ({ ...d, checkbox: true })));
    }
    else if (mainSelect == 0) { 
      setRows(rows => rows.map(d => ({ ...d, checkbox: false })));
    }
  }, [mainSelect])

  return colums.map((header, i) => (
    (header.hide) && !header.key ?
      "" : <CellItem child={header.child} style={{ width: header.type == "checkbox" ? "30px" : header.type == "action" ? header.icons.length < 2 ? "80px" : header.icons.length ? (40 * header.icons.length) + "px" : "auto" : header.width ? header.width : "auto" }} key={i} alignment={header.type == "action" ? 'center' : header.alignment} type={header.type} smhide={header.smhide?"true":""} hide={header.hide?"true":""} fontSize={"girdHeaderFontSize"} onClick={(e) => (header.type != "custom" && header.type != "action" && header.sortable != false) && sortGrid(i)}>

        {header.type == "checkbox" ?
          <Checkbox size="sm" selectColor="primaryFont" hoverColor={'gridRowOdd'} checked={mainSelect} onClick={(e) => { setMainSelect(+e.target.checked) }} />
          : <>
            <div style={{fontWeight:'bold'}}>
              {header.description ?
                <Tooltip position={i == (colums.length - 1) ? 'left' : 'bottom'} background={'girdHeaderalter'} color={"girdHeaderFontalter"} headerTitle={'girdHeaderFontSize'} title={t(header.description)}>{t(header.headerName)}</Tooltip>
                : t(header.headerName)
              } 
              {
                (header.type != "custom" && header.type != "action" && header.sortable != false && !header.child) &&

                (<div style={{ display: "flex" }}>
                  <div className={asc[i] == null ? "" : "show"}>
                    <IconButton key={i} onClick={(e) => { }}>
                      {(asc[i] == true || asc[i] == null) ?
                        (<span className="material-icons md-15">arrow_upward</span>) :
                        (<span className="material-icons md-15">arrow_downward</span>)
                      }
                    </IconButton>
                  </div> 
                </div>)
              }  
            </div>
            {header.child ? <div style={{ display: "flex", justifyContent: "space-between", marginTop:'5px' }}>
              <div>{t(header.child[0].label)}</div>
              <div>{t(header.child[1].label)}</div>

            </div>
              : ""} 
          </>}
      </CellItem>)
  );
});
