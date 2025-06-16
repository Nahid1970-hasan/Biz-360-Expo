
import { useDispatch, useSelector } from "react-redux";
import { AdmnProfiledetails } from "../features/profile/AdmnProfiledetails";
import { useEffect, useState } from "react";
import { loadPage } from "../features/page/page_slice";
import { Toast } from "../component/Toast";
import { Flex } from "../component/style/styled_flex";
import { Loading } from "../component/Loading";
import { loadAdminProfile ,initLoader} from "../features/profile/admin_profile_slice";
import { AdmnProfileModal } from "../features/profile/AdmnProfileModal";

export const AdminProfile = () => {
    const dispatch = useDispatch();
    const [editModal, setEditModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const admprofile = useSelector(state => state.admprofile);

    useEffect(() => {
        setIsLoading(true);
        dispatch(loadAdminProfile())
        // dispatch(loadProfile({ "bmd_ind_user_id": localStorage.user_id }));
        dispatch(loadPage({
            title: "profile", button: true, buttonText: "update_profile", onClick: () => {
                setEditModal(true);
            }
        }))
    }, []);

    useEffect(() => {
        admprofile.loading != "pending" && setTimeout(() => setIsLoading(false), 2000);
    }, [admprofile.loading]);

    useEffect(() => {
        if (admprofile.updateLoading == "pending") {
            setIsLoading(true)
        } else if (admprofile.updateLoading == "succeeded") {
            setIsLoading(false);
            dispatch(loadAdminProfile());
            setTimeout(() => { dispatch(initLoader()); }, 4000);
        } else {
            setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
        }
    }, [admprofile.updateLoading]);

    return <>
        {(admprofile.updateLoading == "idle" || admprofile.updateLoading == "pending") ? <></> : (
            admprofile.updateLoading == "succeeded" ? (
                <Toast msg={admprofile.msg} icon="task_alt" color="success" />
            ) : (
                <Toast color="error" msg={admprofile.msg} />
            )
        )}
        <Flex row="row">
            <Flex padding="0 !important" md={12} sm={10} xs ={12}>  
                <AdmnProfiledetails /> 
            </Flex>
        </Flex>
        <AdmnProfileModal open={editModal} setOpen={setEditModal} />
        <Loading open={isLoading} />
    </>
}