
import styled from "styled-components";
import { formatGridDatetime } from "../../utils/helper";
import { Typography } from "../../component/style/styled_typography";
import { Hypend } from "../../component/style/Hypen_styled";

const TopicArea = styled.div`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "1.2rem")};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 500)};
  line-height: ${({ lineHeight }) => (lineHeight ? lineHeight : "normal")};
  color: ${({ color, theme }) => (color ? theme.colors[color] : "inherit")};
  font-family: ${({ fontFamily }) => (!!fontFamily ? fontFamily : "inherit")};
  text-align:${({ textAlign }) => (textAlign ? textAlign : "left")};
  display: block;  
  background: #fff;
  & button:first-child{
    margin-left:0;
  }
`;

export const CommentCard = ({ data }) => {
  return (<>
    <>
      {data.map((d, i) => <TopicArea key={i} >
        <Typography fontSize="bodyTitleFontSize" color="gray" textAlign="left" >{d.posted_by || ""}</Typography>
        <Typography fontSize="smFontBn" color="gray" textAlign="left" >{d?.posted_on ? formatGridDatetime(d.posted_on) : <Hypend />}</Typography>
        <Typography margin="5px 0 !important" fontSize="font" color="gray" textAlign="left" > {d.topic_comment || ""}</Typography> 
      </TopicArea>)}
    </>
  </>)
}