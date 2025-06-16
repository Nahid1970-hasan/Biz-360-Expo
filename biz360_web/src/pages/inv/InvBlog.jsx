import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex } from "../../component/style/styled_flex";
import { Typography } from "../../component/style/styled_typography";
import { loadPage } from "../../features/page/page_slice";
import { t } from "i18next";
import { loadInvBlogsData } from "../../features/invBlogs/inv_blogs_Slice";
import { Loading } from "../../component/Loading";
import { TopicContentSpan } from "../../features/invBlogs/TopicContentSpan";
import { AddTopicModal } from "../../features/invBlogs/AddTopicModal";
import { Toast } from "../../component/Toast";


 

export const InvBlogPage = () => {  
    const dispatch = useDispatch(); 
    const [open, setOpen] = useState(false);
    const invblogs = useSelector((state) => state.invblogs);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { 
      setIsLoading(true);
        dispatch(loadPage({
            title: 'inv_blog' ,
            button: true,
            onclick: () => {
             setOpen(true);
            },
            buttonText: t("add_new"),
            // buttonIcon: "add",
          }));
       
        dispatch(loadInvBlogsData());
        
      }, []);

    //   useEffect(() => {
    //     invblogs.actionLoading != "pending" && setTimeout(() =>  setIsLoading(false), 2000);
    //   }, [invblogs.actionLoading]);


    //   useEffect(() => {
    //     invblogs.actionLoading == "pending"?setIsLoading(true) : setTimeout(() =>  setIsLoading(false), 2000);
    //   }, [invblogs.actionLoading]);

      useEffect(() => {
        invblogs.loading == "pending"?setIsLoading(true) : setTimeout(() =>  setIsLoading(false), 2000);
      }, [invblogs.loading]);
    return (
        <> 
        {/* {(invblogs.addUpdateLoading == "idle" || invblogs.addUpdateLoading == "pending") ? <></> : (
        invblogs.addUpdateLoading == "succeeded" ? (
          <Toast msg={invblogs.msg} icon="task_alt" color="success" />
        ) : (
          <Toast color="error" msg={invblogs.msg} />
        )
      )} */}
           
            <Flex row="row">
                  <TopicContentSpan data={invblogs?.topic_list} ></TopicContentSpan>
            </Flex> 
            <AddTopicModal open={open} setOpen={setOpen} data={{}} />
            <Loading open={isLoading}/>
        </>
        
        )
}
 
