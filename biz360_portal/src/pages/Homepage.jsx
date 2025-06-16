import { Suspense, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Container } from "../component/style/styled_contrainer";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel, { Link } from "react-alice-carousel";
import { Flex } from "../component/style/styled_flex";
import { CardBody, CardHeaderButton, InfoCard, InfoSubTitle, ShadowCard } from "../component/style/styled_card";
import { HL, Typography, ULine, WL } from "../component/style/styled_typography";
import { KDImg } from "../component/style/styled_img";
import img from "../assets/home-page/business-360-expo.png";
import img2 from "../assets/home-page/business-expo.png";
import { Center } from "../component/style/styled_center";
import { useTranslation } from "react-i18next";
import { Toast } from "../component/Toast";
import { useNavigate } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import styled from "styled-components";
import read_more from "../assets/small-icon/read-more-icon-biz360expo.png";
import sign_up from "../assets/small-icon/start-icon-biz360expo.png";




export const HomePage = () => {

    const { t, i18n } = useTranslation();
    const user = useSelector((state) => state.user);
    const [msg, setMsg] = useState("");
    const [validCaptcha, setValidCaptcha] = useState(false);
    const [isHovered, setIsHovered] = useState(false);


    useTitle(t('home_header_title'));

    const galleryData = [img, img2];
    const navigate = useNavigate();

    let items = galleryData?.map((slideImage, index) => (
        <Flex row="row" key={index}>
            <Flex md={12} sm={12} xs={12} padding="10px 0 0 0 !important">

                <KDImg
                    src={slideImage}  // Use the image from array

                    width={"100%"}
                    alt={`Slide ${index + 1}`}
                    noborder="true"
                />

            </Flex>
        </Flex>));

    const responsive = {
        0: { items: 1 },
        820: { items: 1 },
        1080: { items: 1 },
    };



    return (
        <div style={{ userSelect: "none" }}>
            {(msg && <Toast color="success" msg={msg} />)}
            <Suspense >
                <Container >
                    <CardBody  >
                        <Flex row="row">
                            <Flex md={5} padding="0 10px  0 0!important" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                {localStorage.i18nextLng == "en" ? 
                                <Typography fntsize="hometitleFontSize" fntweight="bold" margin="20px 80px 5px 0" fnfamily="Agency" incnumtype="decr" incnum={5}>
                                    {t("home_title1")}{" "}
                                    {/* <KDImg
                                        src={img2}  // Use the image from array
                                        height={"100%"}
                                        width={"100%"}
                                        noborder="true"
                                    /> */}
                                </Typography>: <Typography fntsize="hometitleFontSize" fntweight="bold" margin="20px 80px 5px 0"  incnumtype="incr" incnum={5}>
                                    {t("home_title1")}{" "}
                                </Typography>}

                                  {localStorage.i18nextLng == "en" ? 
                                <Typography fntsize="hometitleFontSize" fntweight="bold" txtalign="left" margin="5px 20px" fnfamily="Agency" incnumtype="decr" incnum={5}>
                                    {t("home_title2")}{" "}
                                    {/* <KDImg
                                        src={img2}  // Use the image from array
                                        height={"100%"}
                                        width={"100%"}
                                        noborder="true"
                                    /> */}
                                </Typography>: <Typography fntsize="hometitleFontSize" fntweight="bold" txtalign="left" margin="5px 20px"  incnumtype="incr" incnum={5}>
                                    {t("home_title2")}{" "}
                                </Typography>}
                              
                                {localStorage.i18nextLng == "en" ? 
                                <Typography fntsize="hometitleFontSize" fntweight="bold" fnfamily="Agency" incnumtype="decr" incnum={5} >
                                    {t("home_title3")}{" "}
                                    {/* <KDImg
                                        src={img2}  // Use the image from array
                                        height={"100%"}
                                        width={"100%"}
                                        noborder="true"
                                    /> */}
                                </Typography>: <Typography fntsize="hometitleFontSize" fntweight="bold"  incnumtype="incr" incnum={5} >
                                    {t("home_title3")}{" "}
                                </Typography>}

                               
                                {localStorage.i18nextLng == "en" ? <Typography fntsize="cardTitleFontSize" margin="30px 0 0 0">
                                    {(t("home_sub_title1"))}<WL> {(t("home_sub_title2"))}</WL>
                                </Typography> : <Typography fntsize="cardTitleFontSize" margin="30px 0 0 0">
                                    <WL> {(t("home_sub_title2"))}</WL> {(t("home_sub_title1"))}
                                </Typography>}

                                <Flex row="row">
                                    <Flex md={8} sm={12} xs={12} padding="10px 0 0 0!important"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>

                                        <InfoCard background="homeinfo">
                                            <Typography fntsize="cardSubTitleFontSize"
                                                txtalign="left"
                                                style={{
                                                    textAlign: 'justify',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    height: '100%'
                                                }}
                                            >
                                                {t("home_sub_desc")}
                                            </Typography>
                                        </InfoCard>

                                    </Flex>

                                    {/* <Flex md={4} sm={12} xs={12} padding="10px 0 0 10px !important">
                                        <InfoCard
                                            height="auto"
                                            padding="10px 15px"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                cursor: 'pointer',
                                                marginBottom: '10px',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(17, 105, 42, 0.05)'
                                                }
                                            }}
                                            onClick={() => navigate('/pmember')}
                                        >
                                            <Typography
                                                fntsize="cardSubTitleFontSize"
                                                style={{ flex: 1 }}
                                            >
                                                {t("benefits_of_membership")}
                                            </Typography>
                                            <a to={'/pmember'}>    <KDImg
                                                src={read_more}
                                                height={"auto"}
                                                width={"auto"}
                                                noborder="true"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    cursor: 'pointer',

                                                }}
                                                onClick={() => navigate('/pmember')}
                                            />
                                            </a>


                                        </InfoCard>
                                        <InfoCard
                                            height="auto"
                                            padding="10px 15px"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(17, 105, 42, 0.05)'
                                                }
                                            }}
                                            onClick={() => navigate('/pmemsup')}
                                        >
                                            <Typography
                                                fntsize="cardSubTitleFontSize"
                                                style={{ flex: 1 }}
                                            >
                                                {t("signup")}
                                            </Typography>
                                            <KDImg
                                                src={sign_up}
                                                height={"auto"}
                                                width={"auto"}
                                                noborder="true"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    cursor: 'pointer',

                                                }}
                                                onClick={() => navigate('/pmemsup')}
                                            />
                                        </InfoCard>
                                    </Flex> */}
                                    <Flex md={4} sm={12} xs={12} padding="10px 0 0 10px !important">
                                        <InfoCard
                                            height="auto"
                                            background="homeinfo"
                                            padding="10px 15px"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                cursor: 'pointer',
                                                marginBottom: '10px',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(17, 105, 42, 0.05)'
                                                }
                                            }}
                                            onClick={() => navigate('/pmember')}
                                        >
                                            <Typography
                                                fntsize="cardSubTitleFontSize"
                                                style={{ flex: 1 }}
                                            >
                                                {t("benefits_of_membership")}
                                            </Typography>
                                            <KDImg
                                                src={read_more}
                                                height={"auto"}
                                                width={"auto"}
                                                noborder="true"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => navigate('/pmember')}
                                                title="/pmember"
                                            />
                                        </InfoCard>

                                        <InfoCard
                                        background="homeinfo"
                                            height="auto"
                                            padding="10px 15px"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(17, 105, 42, 0.05)'
                                                }
                                            }}
                                            onClick={() => navigate('/pmemsup')}
                                        >
                                            <Typography
                                                fntsize="cardSubTitleFontSize"
                                                style={{ flex: 1 }}
                                            >
                                                {t("signup")}
                                            </Typography>
                                            <KDImg
                                                src={sign_up}
                                                height={"auto"}
                                                width={"auto"}
                                                noborder="true"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => navigate('/pmemsup')}
                                                title="/pmemsup"
                                            />
                                        </InfoCard>
                                    </Flex>

                                </Flex>


                            </Flex>
                            <Flex md={7} padding="0!important" xs={12} sm={12}>
                                <AliceCarousel
                                    disableButtonsControls={true}
                                    disableDotsControls={true}
                                    disableSlideInfo={true}
                                    touchMoveDefaultEvents={false}
                                    responsive={responsive}
                                    autoPlay={true}
                                    infinite={true}
                                    mouseTracking={true}
                                    autoPlayInterval={5000}
                                    items={items}
                                >
                                </AliceCarousel>
                            </Flex>
                            <Flex md={12} padding="0 0 5px 0 !important">
                                <Typography fntsize="cardTitleFontSize" fntweight="bold">
                                    <b style={{ color: "#11692a" }}>{t("home_footer")}</b>
                                </Typography>

                            </Flex>
                        </Flex>
                    </CardBody>
                </Container>
            </Suspense>
        </div>

    );
};
