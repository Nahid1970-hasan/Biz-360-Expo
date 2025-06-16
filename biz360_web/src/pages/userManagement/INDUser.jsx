import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Center } from "../../component/style/styled_center";
import { Container } from "../../component/style/styled_contrainer";
import { loadPage } from "../../features/page/page_slice";
import { loadINDUserData,initLoader } from "../../features/umIndUser/ind_user_slice";
import { INDUsersGridPage } from "../../features/umIndUser/INDUserGrid";
import { Flex } from "../../component/style/styled_flex";
import UnAuthorized from "../UnAuthorized";
import { Loading } from "../../component/Loading";
import { InvUseModal } from "../../features/umIndUser/InvUseModal";

export const INDUserPage = () => {
    const indUserData = useSelector((state) => state.indusersdata);
    const [fullname, setfullname] = useState();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(loadINDUserData())
        dispatch(
            loadPage({
                title: ("ind_user"),
                button: false,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);





    useEffect(() => {
        indUserData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [indUserData.loading]);

    useEffect(() => {
        if (indUserData.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (indUserData.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadINDUserData());
            setTimeout(() => { dispatch(initLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [indUserData.addUpdateLoading]);

    const rowData = indUserData.list.map((d, i) => ({
        ...d,
        "sl": i + 1,
        status: {
            label: d.status,
            color: d.status == "Approved" ? "success" : "error",
        },
    }));


    return indUserData.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>
            <Suspense>
                <Flex row="row">
                    <Flex padding="0 !important" md={12} sm={12} xs={12}>
                        <INDUsersGridPage gridata={rowData} />
                    </Flex>
                </Flex>
                <InvUseModal open={open} setOpen={setOpen} add />
            </Suspense>
            <Loading open={isLoading} />
        </>

    );
};
