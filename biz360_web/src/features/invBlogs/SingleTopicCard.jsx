
import { CommentCard } from "./commentCard";
import { formatGridDatetime } from "../../utils/helper";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { Flex } from "../../component/style/styled_flex";
import { Typography } from "../../component/style/styled_typography";
import { PrimaryButton } from "../../component/style/styled_button";
import { getInvBlogsData, updateBlogsComment, updateBlogsDislike, updateInvBlogsLike,initLoader } from "./inv_blogs_Slice";
import { Toast } from "../../component/Toast";
import { TextArea } from "../../component/style/styled_textarea";
import { Hypend } from "../../component/style/Hypen_styled";
import { Loader } from "../../component/style/Loader_styled";

const TopicArea = styled.div`
  width: 100%;
  padding: 15px 10px;
  margin: 5px 0;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "1.2rem")};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 500)};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : "normal")};
  color: ${({ color, theme }) => (color ? theme.colors[color] : "inherit")};
  font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : "inherit")};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : "left")};
  display: block;
  background: #fff; 
`;

const CustFlexArea = styled(CardHeaderButton)`
    margin-top: ${({ mTop }) => (!!mTop ? mTop : "0")}; 
    display: flex;
    align-items: ${({ bottom }) => (!!bottom ? bottom : "center")};
    justify-content: start;
`;
const CustInput = styled(TextArea)`
  margin-left: 0;
  padding: 2px 7px;
  margin-top: -5px;
  min-width: auto;
  min-height:50px;
`;

const CircleBox = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
`;
const DButton = styled(PrimaryButton)` 
  margin-top: ${({ top }) => (!!top ? top : "8px")} !important; 
  margin-left: ${({ left }) => (!!left ? left : "black")} !important; 
  height: 30px;
  width: 30px;
  cursor: ${({ cursor }) => (!!cursor ? cursor : "pointer")} !important; 
  border-radius: 15px;
  padding: 0; 
  border-style: ${({ outlined }) => (!!outlined ? outlined : "none")};
  background:  ${({ background }) => (!!background ? background : "transparent")};
  &:hover {
    background: gray;
  }
  &>span {
    font-size: 15px;
    padding: 0;  
    vertical-align: middle;
    color: ${({ info }) => (!!info ? info : "black")};
  }
`;
const TextButton = styled.div`
    color: ${({ theme, fontColor, disabled }) =>
    disabled
      ? "rgba(0, 0, 0, 0.26)"
      : !!fontColor
        ? theme.colors[fontColor]
        : theme.colors.primaryButtonFont};
    display: ${({ display }) => (display ?? "block")};
    padding: 8px 0;
    background: transparent;
    font-size: ${({ theme, fontSize }) => !!fontSize ? theme.fontSize[fontSize] : theme.fontSize.font};
    font-family: var(--dashboard-font);
    cursor: pointer;
`;

export const SingleTopicCard = ({ data, position }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [commentArea, setCommentArea] = useState(false);
  const topicCommentData = useSelector((state) => state.topicComments);
  const invblogs = useSelector((state) => state.invblogs);
  function handleOnchange(e) {
    setComment(e.target.value);
  }

  useEffect(() => {
    if (invblogs.replyLoading == "succeeded") {
      setComment("");
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (invblogs.replyLoading != "idle") {
      setTimeout(() => { dispatch(initLoader()); setComment(""); }, 5000);
    }
  }, [invblogs.replyLoading]);

  useEffect(() => {
    if (invblogs.addUpdateLoading == "succeeded") {
      setTimeout(() => { dispatch(initLoader()); }, 5000);
    } else if (invblogs.addUpdateLoading != "idle") {
      setTimeout(() => { dispatch(initLoader()); setComment(""); }, 5000);
    }
  }, [invblogs.addUpdateLoading]);

  return (
    <>
      {(invblogs.addUpdateLoading == "idle" || invblogs.addUpdateLoading == "pending") ? <></> : (
        invblogs.addUpdateLoading == "succeeded" ? (
          <Toast msg={invblogs.msg} icon="task_alt" color="success" />
        ) : (
          <Toast color="error" msg={invblogs.msg} />
        )
      )}

      <InfoCard background={"success_bg"} top={position == 0 ? "0" : "10px"}>

        <Flex row="row">
          <Flex padding={"0"} md={12}>
            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
               
              {/* <CircleBox> {data.blog_id}</CircleBox> */}
              {/* <div style={{ marginLeft: "10px" }}>
                <Typography notResize="notResize" fontSize="bodyTitleFontSize" fontFamily="var(--dashboard-font)" textAlign="left">
                  {data.posted_by}
                </Typography>
                <Typography notResize="notResize" fontSize="smFontBn" fontFamily="var(--dashboard-font)" textAlign="left">
                  {data?.posted_on ? formatGridDatetime(data.posted_on) : <Hypend />}
                </Typography>
              </div> */}
            </div>
          </Flex>
          <Flex md={12}>
            <TopicArea textAlign="left" type="textarea">
              {/* {data.topic_detail} */}
              <CustFlexArea mTop="10px">
                <DButton left="0px" disabled={data?.user_liked ==1} cursor={data?.user_liked ==1?"auto":"pointer"}  outlined={data?.user_liked ==1?"none":"solid"} background={data?.user_liked ==1?"#d6d6d6":"transparent"} onClick={(() => dispatch(updateInvBlogsLike({ blog_id: data.blog_id })))} iconColor={data?.user_liked ==1?"#6c716c":"green"}>
                  <span className="material-icons">thumb_up</span>
                </DButton>
                <DButton left="8px" disabled={data?.user_disliked ==1} cursor={data?.user_disliked ==1?"auto":"pointer"} outlined={data?.user_disliked ==1?"none":"solid"} background={data?.user_disliked ==1?"#d6d6d6":"transparent"} onClick={(() => dispatch(updateBlogsDislike({ blog_id: data.blog_id })))} iconColor={data?.user_disliked ==1?"#6c716c":"red"}>
                  <span className="material-icons">thumb_down</span>
                </DButton>
                <Typography margin="0 0 0 5px" notResize="notResize" color="gray" fontSize="smFont" fontFamily="var(--dashboard-font)" textAlign="left">
                  {data?.like_count ? data?.like_count + " Likes" : ""} {" "} {data?.dislike_count ? data?.dislike_count + " Dislikes" : ""} {" "} {data?.comment_count ? data?.comment_count + " Comments" : ""}
                </Typography>
              </CustFlexArea>
            </TopicArea>
          </Flex>
          <CustFlexArea bottom="flex-end" mTop="10px">
            {/* <ReactButton
              type="button"
              fontColor="black"
              outlined
              disabled={data.comment_count == 0}
              onClick={() => {
                setCommentArea(!commentArea);
                dispatch(
                  getTopicComment({
                    blog_id: data.blog_id,
                  })
                );
              }}
            >
              Comment({data.comment_count})
            </ReactButton> */}
            <CustInput
              width="100%"
              type="textarea"
              rows="2"
              maxLength={195}
              placeholder="Type comments here.."
              name="comment"
              value={comment}
              onChange={handleOnchange}
            />
            <PrimaryButton
              type="button"
              disabled={!comment}
              onClick={() => {
                dispatch(
                  comment && updateBlogsComment({
                    blog_id: data.blog_id,
                    comment: comment,
                  })
                );
              }}
            >
              Send
            </PrimaryButton>
          </CustFlexArea>
          <CustFlexArea >
            <TextButton fontColor="font" onClick={() => {
              setCommentArea(!commentArea);
              dispatch(getInvBlogsData({ blog_id: data.blog_id })
              );
            }}
            >
            {commentArea?"Hide Comments":"Show Comments"}  
            </TextButton>
            <span className="material-icons">{commentArea?"keyboard_arrow_up":"keyboard_arrow_down"}</span>
          </CustFlexArea>

          {commentArea? 
            <Flex padding="0" md={12}>
              {invblogs.loading == "pending" ? <Loader/>:  
              Object.keys(invblogs.comment_list).length > 0 ?<CommentCard  data={invblogs.comment_list[data.blog_id] || []} />
              : <div>No Data Found</div> }
            </Flex>
          :<></>}
        </Flex>
      </InfoCard>
    </>
  );
};
