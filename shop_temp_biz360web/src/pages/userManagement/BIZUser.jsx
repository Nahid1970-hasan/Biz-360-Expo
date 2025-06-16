import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Center } from "../../component/style/styled_center";
import { Container } from "../../component/style/styled_contrainer";
import { loadPage } from "../../features/page/page_slice";
import { loadBIZUserData } from "../../features/umBIZUser/biz_user_slice";
import UnAuthorized from "../UnAuthorized";
import { Flex } from "../../component/style/styled_flex";
import { BIZUsersGridPage } from "../../features/umBizUser/BIZUserGrid";
import { Loading } from "../../component/Loading";

export const BIZUserPage = () => {
    const bizUserData = useSelector((state) => state.bizusersdata);
    const [fullname, setfullname] = useState();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(loadBIZUserData())
        dispatch(
            loadPage({
                title: ("biz_user"),
                button: true,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);



    useEffect(() => {
        bizUserData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [bizUserData.loading]);

    const rowData = bizUserData.list.map((d, i) => ({
        ...d,
        "sl": i + 1,
        status: {
            label: d.status,
            color: d.status == "Approved" ? "success" : "error",
        },
    }));


    return bizUserData.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>
            <Suspense>
                <Flex row="row">
                    <Flex padding="0 !important" md={12} sm={12} xs={12}>
                        <BIZUsersGridPage gridata={rowData} />
                    </Flex>
                </Flex>
            </Suspense>
            <Loading open={isLoading} />
        </>

    );
};
