import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "../component/style/styled_contrainer";
import { Center } from "../component/style/styled_center";
import { Flex } from "../component/style/styled_flex";
import { Typography, ULine } from "../component/style/styled_typography";
import { useTranslation } from "react-i18next";
import { getValueByLang } from "../utils/helper";

export const IndOrgDashboardPage = () => {
    const user = useSelector((state) => state.user);
    const useprofile = useSelector((state) => state.bizprofile);
    const { t, i18n } = useTranslation();


    const [fullname, setfullname] = useState();

    useEffect(() => {
        setfullname(localStorage.getItem("fullname"));
    }, [])

    return (
        <>
            <Suspense>
                <Container>
                    <Center>
                        {/* <h1>Hi  <b>{fullname}</b> </h1> */}
                        {/* <h3>This is your <b>About Page</b></h3> */}

                        <Flex row="row">
                            <Typography>
                                {/* {user?.mainList?.map((d, i) => key = { i.main_id }{ d.main_name }} */}
                            </Typography>
                            <Flex md={6}>

                                <Flex row="row">
                                    <Flex padding="0 !important" md={12} sm={12}>
                                        <Typography fontWeight="bold" notResize fontSize="bodyTitleFontSize" fntweight="bold">
                                            {"subscription"}
                                        </Typography>
                                    </Flex>
                                    <Flex padding="10px 0 !important" md={12} sm={12}>
                                        <ULine />
                                    </Flex>
                                </Flex>

                                <Flex row="row">
                                    <Flex padding="0 !important" md={4} sm={12}>
                                        <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                            {t("sn_name")}
                                        </Typography></Flex>
                                    <Flex md={1} padding="0 !important">{" "}{":"}{" "}</Flex>
                                    <Flex padding="0 !important" md={7} sm={12}>
                                        <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                            {getValueByLang(useprofile?.profile?.subscription?.sn_name || "{ }")}
                                        </Typography>
                                    </Flex>
                                </Flex>

                                <Flex row="row">
                                    <Flex padding="0 !important" md={4} sm={12}>
                                        <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                            {t("sn_desc")}
                                        </Typography></Flex>
                                    <Flex md={1} padding="0 !important">{" "}{":"}{" "}</Flex>                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                        {getValueByLang(useprofile?.profile?.subscription?.sn_desc || "{ }")}
                                    </Typography>
                                    </Flex>
                                </Flex>

                                <Flex row="row">
                                    <Flex padding="0 !important" md={4} sm={12}>
                                        <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                            {t("sn_start_date")}
                                        </Typography></Flex>
                                    <Flex md={1} padding="0 !important">{":"}</Flex>                                <Flex padding="0 !important" md={7} sm={12}> <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                        {useprofile?.profile?.subscription?.sn_start_date || " "}
                                    </Typography>
                                    </Flex>
                                </Flex>
                                <Flex row="row">
                                    <Flex padding="0 !important" md={4} sm={12}>
                                        <Typography txtalign="right" fontSize="bodySubTitleFontSize" fontWeight="bold" margin="0 10px">
                                            {t("sn_expiry_date")}
                                        </Typography>
                                    </Flex>
                                    <Flex md={1} padding="0 !important">{":"}</Flex>
                                    <Flex padding="0 !important" md={7} sm={12}>
                                        <Typography txtalign="left" fontSize="bodySubTitleFontSize" >
                                            {useprofile?.profile?.subscription?.sn_expiry_date || " "}
                                        </Typography>
                                    </Flex>

                                </Flex>


                            </Flex>
                        </Flex>
                    </Center>
                </Container>
            </Suspense>
        </>

    );
};
