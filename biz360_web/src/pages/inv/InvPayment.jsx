
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadPage } from "../../features/page/page_slice";
import UnAuthorized from "../UnAuthorized";
import { Flex } from "../../component/style/styled_flex";
import { Loading } from "../../component/Loading";
import { InvPaymentGrid } from "../../features/invPayment/InvPaymentGrid";
import { initLoader, loadInvPaymentConfig } from "../../features/invPayment/inv_payment_Slice";
import { InvPaymentModal } from "../../features/invPayment/InvPaymentModal";



export const InvPaymentPage = () => {
    const invPaymentData = useSelector((state) => state.invpayment);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    useEffect(() => { 
        dispatch(loadInvPaymentConfig()); 
        dispatch(
            loadPage({
                title: ("Payments"),
                button: true,
                onClick: () => {
                    setOpen(true);
                },
                buttonText: "add_new",
            })
        );
    }, []);



    useEffect(() => {
        invPaymentData.loading == "pending" ? setIsLoading(true) : setTimeout(() => setIsLoading(false), 2000);
    }, [invPaymentData.loading]);


     useEffect(() => {
           if (invPaymentData.addUpdateLoading == "pending") {
               setIsLoading(true)
           } else if (invPaymentData.addUpdateLoading == "succeeded") {
               setIsLoading(false);
               dispatch(loadInvPaymentConfig());
               setTimeout(() => { dispatch(initLoader()); }, 4000);
           } else {
               setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
           }
       }, [invPaymentData.addUpdateLoading]);

    return invPaymentData.loading === "unauthorized" ? (
        <UnAuthorized />
    ) : (
        <>

            <Flex row="row">
                <Flex padding="0 !important" md={12} sm={12} xs={12}>
                    <InvPaymentGrid />
                </Flex>
            </Flex>
            <InvPaymentModal open={open} setOpen={setOpen} data={{}} add />
            <Loading open={isLoading} />
        </>
    );
};
