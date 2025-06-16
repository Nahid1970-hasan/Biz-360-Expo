import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Center } from "../../component/style/styled_center";
import { Container } from "../../component/style/styled_contrainer";
import { loadPage } from "../../features/page/page_slice";
import { initLoader, loadKDRLUserData } from "../../features/umKdrlUser/kdrl_user_slice";
import { Loading } from "../../component/Loading";
import UnAuthorized from "../UnAuthorized";
import { KDRLUsersGridPage } from "../../features/umKdrlUser/KDRLUserGrid";
import { Flex } from "../../component/style/styled_flex";
import { KDRLUseModal } from "../../features/umKdrlUser/KDRLUseModal";

export const KDRLUserPage = () => {
    const kdrlUserData = useSelector((state) => state.kdrlusersdata);
    const [fullname, setfullname] = useState();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        dispatch(loadKDRLUserData())
        dispatch(
            loadPage({
                title: ("kdrl_user"),
                button: true,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);



    useEffect(() => {
        kdrlUserData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [kdrlUserData.loading]);

    const rowData = kdrlUserData.list.map((d, i) => ({
        ...d,
        "sl": i + 1,
        status: {
            label: d.status,
            color: d.status == "Approved" ? "success" : "error",
        },
    }));

    useEffect(() => {
        if (kdrlUserData.addUpdateLoading == "pending") {
            setIsLoading(true)
        } else if (kdrlUserData.addUpdateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadKDRLUserData());
            setTimeout(() => { dispatch(initLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [kdrlUserData.addUpdateLoading]);

    return kdrlUserData.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>
            <Suspense>
                <Flex row="row">
                    <Flex padding="0 !important" md={12} sm={12} xs={12}>
                        <KDRLUsersGridPage gridata={rowData} />
                    </Flex>
                </Flex>

            </Suspense>
            <KDRLUseModal open={open} setOpen={setOpen} add />
            <Loading open={isLoading} />
        </>

    );
};
