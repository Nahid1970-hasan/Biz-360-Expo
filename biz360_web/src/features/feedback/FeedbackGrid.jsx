import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import DataGrid from "../../component/DataGrid"; 
import { Toast } from "../../component/Toast"; 
import { CardBody } from "../../component/style/styled_card"; 
import { DeleteFeedback } from "./DeleteFeedback";
import { FeedbackModal } from "./FeedbackModal";
  
export const FeedbackGrid = ({gridata}) => {

    const feedback = useSelector((state) => state.feedback); 
    const dispatch = useDispatch();
    const [remove, setRemove] = useState(false);
    const [feedback_id, set_feedback_id] = useState(0);
    const [data, setData] = useState({});
    const [open, setOpen] = useState(false);

    const colums = [
        {
            headerName: "ID",
            field: "feedback_id",
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
            headerName: ("name"),
            field: "req_name",
            description: "req_name",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 
        {
            headerName: ("address"),
            field: "req_address",
            description: "req_address",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 
        {
            headerName: ("req_detail"),
            field: "req_detail",
            description: "req_detail",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 
        {
            headerName: ("mobile"),
            field: "req_mobile",
            description: "req_mobile",
            sortable: true,
            filterable: true,
            fontFamily:"var(--dashboard-font)",
            type: "string",
        }, 
        {
            headerName: ("email"),
            field: "req_email",
            description: "req_email",
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
                (feedback_id) => {
                    var rowdata = feedback?.list?.find((d) => d.feedback_id == feedback_id); 
                    setOpen(true);   
                    setData(rowdata);
                },
                (feedback_id) => {
                    setRemove(true);
                    set_feedback_id(feedback_id);
                },
            ],
        },
    ];
 
   

    return <Suspense> 
        
        <CardBody>
            <DataGrid colums={colums} rows={gridata||[]} />
        </CardBody> 
        <FeedbackModal open={open} setOpen={setOpen} data={data} />
        <DeleteFeedback open={remove} setOpen={setRemove} data={{feedback_id}} />
    </Suspense>;
}