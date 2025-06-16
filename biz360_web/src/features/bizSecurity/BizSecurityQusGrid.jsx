import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import DataGrid from "../../component/DataGrid"; 
import { Toast } from "../../component/Toast"; 
import { CardBody } from "../../component/style/styled_card"; 
import { BizSecurityQusDelete } from "./BizSecurityQusDelete";
import { BizSecurityQusModal } from "./BizSecurityQusModal";
  
export const BizSecurityQusGrid = ({gridata}) => {

    const bizsecurityqus = useSelector((state) => state.bizsecurityqus); 
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [question_id, set_question_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    const colums = [
        {
            headerName: "ID",
            field: "question_id",
            key: true,
            type: "number",
            hide: true,
            sortable: false,
        },
        {
            headerName: ("#"),
            field: "sl",
            description: "Serial",
            sortable: true, 
            width: "60px",
            fontFamily:"var(--dashboard-font)",
            type: "number",
        },
        {
            headerName: ("biz_security_qus"),
            field: "question_value",
            description: "biz_security_qus",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 

        {
            headerName: ("action"),
            field: "", 
            type: "action",
            icons: ["edit", "delete"],
            colors: ["success", "error"],
            descriptions: ["Edit", "Delete"],
            callBacks: [
                (question_id) => {
                    var rowdata = gridata.find((d) => d.question_id == question_id); 
                    setOpen(true);   
                    setData(rowdata);
                },
                (question_id) => {
                    setRemove(true);
                    set_question_id(question_id);
                },
            ],
        },
    ];
 
   

    return <Suspense> 
         {(bizsecurityqus.addUpdateLoading == "idle" || bizsecurityqus.addUpdateLoading == "pending") ? <></> : (
          bizsecurityqus.addUpdateLoading == "succeeded" ? (
            <Toast msg={bizsecurityqus.msg} color="success" />
          ) : (
            <Toast color="error" msg={bizsecurityqus.msg} />
          )
        )}
        <CardBody>
            <DataGrid colums={colums} rows={gridata||[]} />
        </CardBody> 
        <BizSecurityQusModal open={open} setOpen={setOpen} data={data} />
        <BizSecurityQusDelete open={remove} setOpen={setRemove} data={{question_id}} />
    </Suspense>;
}