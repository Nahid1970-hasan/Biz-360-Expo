import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { CardBody, InfoCard, ShadowCard } from "../../component/style/styled_card";
import { Flex } from "../../component/style/styled_flex";
import { Typography, ULine } from "../../component/style/styled_typography";
import { t } from "i18next";
import { getBNNumber, langs } from "../../utils/helper";
import { SizeBox } from "../../component/style/styled_sizebox";
import { Center } from "../../component/style/styled_center";
import { KDImg } from "../../component/style/styled_img";
import { Toast } from "../../component/Toast";


const UnderLine = styled.div`
    display:block;
    height: 1.5px; 
    width: 100%;
    background-color: #a7a4a4;
`;
export const AdmnProfiledetails = () => {
    const dispatch = useDispatch();
    // const user = useSelector(state => state.self.user);
    const admprofile = useSelector(state => state.admprofile);
    const mmbimgupload = useSelector((state) => state.mmbimgupload);


    return <>
        {(mmbimgupload.imgUploading == "idle" || mmbimgupload.imgUploading == "pending") ? <></> : (
            mmbimgupload.imgUploading == "succeeded" ? (
                <Toast msg={mmbimgupload.msg} icon="task_alt" color="success" />
            ) : (
                <Toast color="error" msg={mmbimgupload.msg} />
            )
        )}
        <CardBody>
            <Flex row="row">
                <Flex md={6}>
                    <Flex row="row">
                        <Flex padding="10px 0 0 0 !important" md={12} sm={12}>
                            <Typography fntweight="bold" ntresize="true" fntsize="bodyTitleFontSize" >
                                <p>{admprofile?.profile?.fullname || "---"}</p>
                            </Typography>
                        </Flex>
                        <Flex padding="5px 0 !important" md={12} sm={12}>
                            <ULine />
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex padding="0 5px!important" md={4} sm={12}><Typography txtalign="right" fntsize="bodySubTitleFontSize" fontWeight="bold">
                            {t("fullname")}
                        </Typography></Flex>

                        <Flex padding="0 5px!important" md={8} sm={12} > <Typography ntresize="true" txtalign="start" fntsize="bodySubTitleFontSize" >
                            {":"} {" "}<p>{admprofile?.profile?.fullname || "---"}</p>
                        </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex padding="0 5px!important" md={4} sm={12}><Typography txtalign="right" fntsize="bodySubTitleFontSize" fontWeight="bold">
                            {t("username")}{" "}
                        </Typography></Flex>
                        <Flex padding="0 5px!important" md={8} sm={12} > <Typography ntresize="true" txtalign="left" fntsize="bodySubTitleFontSize" >
                            {":"} {" "} <p>{admprofile?.profile?.username || "---"}</p>
                        </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex padding="0 5px!important" md={4} sm={12}><Typography txtalign="right" fntsize="bodySubTitleFontSize" fontWeight="bold">
                            {t("designation")}
                        </Typography></Flex>

                        <Flex padding="0 5px!important" md={8} sm={12} > <Typography ntresize="true" txtalign="start" fntsize="bodySubTitleFontSize" >
                            {":"} {" "}<p>{admprofile?.profile?.designation || "---"}</p>
                        </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex padding="0 5px !important" md={4} sm={12} ><Typography txtalign="right" fntsize="bodySubTitleFontSize" fontWeight="bold">
                            {t("email")}
                        </Typography></Flex>

                        <Flex padding="0 5px!important" md={8} sm={12}  > <Typography ntresize="true" txtalign="left" fntsize="bodySubTitleFontSize" >
                            {":"} {" "} <p>{admprofile?.profile?.email || "---"}</p>
                        </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex padding="0 5px !important" md={4} sm={12} >
                            <Typography txtalign="right" fntsize="bodySubTitleFontSize" fontWeight="bold">
                                {t("mobile")}
                            </Typography></Flex>

                        <Flex padding="0 5px!important" md={8} sm={12} >
                            <Typography txtalign="left" fntsize="bodySubTitleFontSize">
                                {":"} {" "} {parseInt(admprofile?.admprofileadmprofile?.mobile) ? getBNNumber(admprofile?.profile?.mobile, true) : admprofile?.profile?.mobile || "---"}
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex padding="0 5px!important" md={4} sm={12} >
                            <Typography txtalign="right" fntsize="bodySubTitleFontSize" fontWeight="bold">
                                {t("status")}
                            </Typography></Flex>
                            <Flex md={.5} padding="0 5px!important">{":"}</Flex>

                        <Flex padding="0!important" md={2} sm={12} >
                            <Typography txtalign="center" fntsize="bodySubTitleFontSize"
                             style={{
                                borderRadius: "8px",
                                border: "2px solid",
                                borderColor: admprofile?.profile?.status === "Approved" ? "green" : "red",
                                color: admprofile?.profile?.status === "Approved" ? "green" : "red"}}
                            >
                                
                                 <p>{admprofile?.profile?.status|| "---"}</p>
                            </Typography>
                        </Flex>
                    </Flex>
                    <Flex row="row">
                        <Flex padding="0 5px!important" md={4} sm={12}><Typography txtalign="right" fntsize="bodySubTitleFontSize" fntweight="bold">
                            {t("def_lang")}
                        </Typography></Flex>
                        <Flex padding="0 5px!important" md={6} sm={12}> <Typography txtalign="left" fntsize="bodySubTitleFontSize" >
                            {":"} {" "} {langs[admprofile?.profile?.default_lang?.toLowerCase() || 'en'].nativeName}
                        </Typography>
                        </Flex>
                    </Flex>
                </Flex>
                <Flex md={4}>
                    <InfoCard >
                        <Typography fntweight="bold" ntresize="true" fntsize="bodyTitlefntsize">
                            {t("photo")}
                        </Typography>
                        <SizeBox />
                        <ShadowCard>
                            <Center>
                                <KDImg height={"250px"} src={admprofile?.profile?.photo_url || ""} />
                            </Center>
                        </ShadowCard>
                    </InfoCard >
                </Flex>
            </Flex>

        </CardBody>
    </>

}