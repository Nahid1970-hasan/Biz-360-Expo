import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadPage } from "../../features/page/page_slice";
import { Loading } from "../../component/Loading";
import UnAuthorized from "../UnAuthorized";
import { Flex } from "../../component/style/styled_flex";
import { EmailConfigGridPage } from "../../features/emailConfig/EmailConfigGrid";
import { initLoader, loadEmailConfData } from "../../features/emailConfig/email_config_slice";
import { EmailConfigModal } from "../../features/emailConfig/EmailConfigModal";

 

export const EmailConfigPage = () => {
  const emailConfigData = useSelector((state) => state.emailconfigdata);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { 
    dispatch(loadEmailConfData());
    dispatch(
      loadPage({
        title: ("email_config"),
        button: true,
        onClick: () => {
          setOpen(true);
        },
        buttonText: "add_new", 
      })
    );
  }, []);

  useEffect(() => {
    emailConfigData.loading == "pending" ? setIsLoading(true) : setTimeout(() =>  setIsLoading(false), 2000);
  }, [emailConfigData.loading]);

      useEffect(() => {
          if (emailConfigData.addUpdateLoading == "pending") {
              setIsLoading(true)
          } else if (emailConfigData.addUpdateLoading == "succeeded") {
              setIsLoading(false);
              dispatch(loadEmailConfData());
              setTimeout(() => { dispatch(initLoader()); }, 4000);
          } else {
              setTimeout(() => { dispatch(initLoader()); setIsLoading(false); }, 4000);
          }
      }, [emailConfigData.addUpdateLoading]);

  return emailConfigData.loading === "unauthorized" ? (
    <UnAuthorized />
  ) : (
    <> 
      <Flex row="row">
        <Flex padding="0 !important" md={12} sm={12} xs={12}>
          <EmailConfigGridPage /> 
        </Flex>
      </Flex>
      <EmailConfigModal open={open} setOpen={setOpen} data ={{}} add />
      <Loading open={isLoading}/>
    </>
  );
};
