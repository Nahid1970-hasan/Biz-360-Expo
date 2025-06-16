import { memo } from "react"
import { GridScroll } from "../style/styled_datagrid"
import { KDTable, KDTRw } from "../style/styled_kdrl_table"
import { KDHeaderBuilder } from "./KDRLTableHD"
import { KDRowBuilder } from "./KDRLTableRW"

export const KDRLTableGrid = memo(({ colums, rows, maxheight = "85vh", setRows = (() => { }) }) => { 
    
    return (<GridScroll maxheight={maxheight}>
        <KDTable>
            <tbody >
                <KDHeaderBuilder headerdata={colums} /> 
                {rows?.map((rwdata, i) => <KDTRw key={i} >
                     {colums?.map((coldata, j) =>
                     <KDRowBuilder key={j} rwdata={rwdata} rows ={rows} coldata={coldata} setRows={setRows} />
                    )}
                </KDTRw>)}
            </tbody>
        </KDTable>
    </GridScroll>)

});