import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../../features/page/page_slice";
import { Loading } from "../../component/Loading";
import { Flex } from "../../component/style/styled_flex";
import UnAuthorized from "../UnAuthorized";
import { SMSConfigGridPage } from "../../features/smsConfig/SMSConfigGrid";
import {  initLoader, loadSmsConfigData } from "../../features/smsConfig/smsConfig_slice";
import { SMSConfigModal } from "../../features/smsConfig/SMSConfigModal";

 

export const SMSConfigPage = () => {
  const smsConfigData = useSelector((state) => state.smsconfigdata);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { 
     dispatch(loadSmsConfigData());
    dispatch(
      loadPage({
        title: ("sms_config"),
        button: true,
        onClick: () => {
          setOpen(true);
        },
        buttonText: "add_new", 
      })
    );
  }, []);

  useEffect(() => {
    smsConfigData.loading == "pending" ? setIsLoading(true) : setTimeout(() =>  setIsLoading(false), 2000);
  }, [smsConfigData.loading]);

     useEffect(() => {
            if (smsConfigData.addUpdateLoading == "pending") {
                setIsLoading(true)
            } else if (smsConfigData.addUpdateLoading == "succeeded") {
                setIsLoading(false);
                dispatch(loadSmsConfigData());
                setTimeout(() => { dispatch(initLoader()); }, 4000);
            } else {
                setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
            }
        }, [smsConfigData.addUpdateLoading]);

  return smsConfigData.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
      <Flex row ="row"> 
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <SMSConfigGridPage/>
        </Flex>
      </Flex> 
      <SMSConfigModal open={open} setOpen={setOpen} data ={{}}  add />
      <Loading open={isLoading}/>
    </>
  );
};
