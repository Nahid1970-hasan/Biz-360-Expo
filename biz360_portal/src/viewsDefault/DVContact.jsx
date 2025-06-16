import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "../component/style/styled_typography";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { useTranslation } from "react-i18next";
import { Frame } from "../component/style/styled_iframe";
import { SizeBox } from "../component/style/styled_sizebox";


export const DefaultContactPage = () => {
    const user = useSelector((state) => state.user);
    const profilePubData = useSelector((state) => state.dfprofiledata);
    const { t, i18n } = useTranslation();
    const [cntDataList, setCntDataList] = useState({});

    useEffect(() => {
        var infoBodyData = JSON.parse(profilePubData?.bodyData || "{}")?.page2 || {};
        setCntDataList(infoBodyData)
    }, [profilePubData?.bodyData]);
    return (
        <>
            <Suspense>
                <Container>

                    <Flex row="true">
                        <Flex md={12}>
                            <Typography fntsize="cardTitleFontSize" fntweight="bold">{cntDataList?.page_title || "{{" + t("contact_us") + "}}"}</Typography>
                        </Flex>
                        <Flex md={11.99}>
                            <Typography fntsize="cardContentFontSize" txtalign="left">{cntDataList?.page_subtitle || "{{" + t("contact_us_subtitle") + "}}"}</Typography>
                            <SizeBox />
                        </Flex>
                        <Flex md={6}>
                                <Typography fntsize="bodyTitleFontSize" txtalign="left" fntweight="bold">
                                    {cntDataList?.panel1_title || "{{" + t("support") + "}}"}
                                </Typography>
                                <SizeBox />
                                <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                    <a>{cntDataList?.panel1_name}</a>
                                </Typography>
                                <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                    <a>{cntDataList?.panel1_mobile}</a>
                                </Typography>
                                <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                    <a>{cntDataList?.panel1_email}</a>
                                </Typography>
                                <Flex row="true">
                                    <Flex md={6}>
                                        <Typography fntsize="bodyTitleFontSize" txtalign="left" fntweight="bold">
                                            {cntDataList?.panel2_title || "{{" + t("location_1") + "}}"}
                                        </Typography>
                                        <SizeBox />
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{cntDataList?.panel2_name}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{cntDataList?.panel2_mobile}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{cntDataList?.panel2_email}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{cntDataList?.panel2_address}</a>
                                        </Typography>
                                       
                                    </Flex>
                                    <Flex md={6}>
                                        <Typography fntsize="bodyTitleFontSize" txtalign="left" fntweight="bold">
                                            {cntDataList?.panel3_title || "{{" + t("location_2") + "}}"}
                                        </Typography>
                                        <SizeBox />
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{cntDataList?.panel3_name}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{cntDataList?.panel3_mobile}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{cntDataList?.panel3_email}</a>
                                        </Typography>
                                        <Typography fntsize="bodySubTitleFontSize" color="font" width={"100%"} txtalign="left">
                                            <a>{cntDataList?.panel3_address}</a>
                                        </Typography>
                                       
                                    </Flex>
                                </Flex>
                            </Flex>
                            
                            <Flex md={6}>
                                {cntDataList?.panel4_visible ? <Frame
                                    height={"250px"}
                                    width={"100%"}
                                    src={cntDataList?.panel4_info_link || "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1291.080901858037!2d90.36113210395774!3d23.757068431399833!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bfeaac77cf97%3A0x56e8b5892d7e73df!2sMohammadpur%20Bus%20Stand!5e0!3m2!1sen!2sbd!4v1742800914799!5m2!1sen!2sbd"}
                                ></Frame> : <></>}
                            </Flex>
                    </Flex>
                </Container>
            </Suspense>
        </>

    );
};
