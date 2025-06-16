import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../../features/page/page_slice";
import { Loading } from "../../component/Loading";
import { Flex } from "../../component/style/styled_flex";
import UnAuthorized from "../UnAuthorized";
import { loadSMSConfData } from "../../features/smsConfig/sms_config_slice";
import { SMSConfigGridPage } from "../../features/smsConfig/SMSConfigGrid";

 

export const SMSConfigPage = () => {
  const smsConfigData = useSelector((state) => state.smsconfigdata);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { 
     dispatch(loadSMSConfData());
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

  return smsConfigData.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <>
      <Flex row ="row"> 
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <SMSConfigGridPage/>
        </Flex>
      </Flex> 
      <Loading open={isLoading}/>
    </>
  );
};
