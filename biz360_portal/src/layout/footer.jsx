import React, { useEffect } from "react";
import { GreenBox, GreenBoxLink, Typography, ULine } from "../component/style/styled_typography";
import { getCurrentYear } from "../utils/helper";
import { Link } from "react-alice-carousel";
import { Icon } from "../component/style/styled_icon";
import * as feather from "feather-icons/dist/feather.min";
import { SizeBox } from "../component/style/styled_sizebox";
import whatsapp from "../assets/icons/whatsapp.svg";
import { useSelector } from "react-redux";
import { KDImg } from "../component/style/styled_img";
import footer from "../assets/Icone-Medium-100x79.png";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Flex } from "../component/style/styled_flex";
import { Container } from "../component/style/styled_contrainer";
import { FooterStyled } from "../component/style/styled_footer";
import { theme } from "../styles/theme";
import { Center } from "../component/style/styled_center";
import { Tooltip } from "../component/Tooltip";

const Border = styled.div`
    border-radius: 20px; 
`;

const IconLabel = styled.label`
  position: absolute;
  bottom: -5px;
  left: 20%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 5px;
  opacity: 0;
  transition: opacity 0.2s ease;
  white-space: nowrap;
  pointer-events: none;
`;

export const FooterMenu = styled.div`
  width: 100%;
  display: flex;
  padding: 5px 0;
  align-items:center;
   justify-content:${({ itAlign }) => (itAlign ? itAlign : "start")};
  color: ${({ theme }) => theme.colors.bodyContent};  
  position: relative;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-3px);
    ${IconLabel} {
      opacity: 1;
    }
  }
  &>a{   
    text-decoration: none; 
    cursor: pointer;
    color:${({ theme }) => theme.colors.primaryFont} ; 
    &:hover {
      color:${({ theme }) => theme.colors.primaryHover} ; 
      text-decoration: underline; 
    }
  }
   & label{
    color: ${({ theme }) => theme.colors.bodyContent};
    font-size: ${({ theme }) => theme.fontSize.bodySubTitleFontSize}; 
    margin-left: 5px;
    padding: 0 5px;
    text-decoration: none; 
    cursor: pointer;
    &:hover { 
      text-decoration: underline; 
    }
  }

    @media(max-width:${theme.layout.xs}){
        display: flex; 
        justify-content: center; 
    }

`;

const Footer = () => {
    const { t, i18n } = useTranslation();
    useEffect(() => { feather.replace() }, []);
    var link = "/#/";
    return (
        <>
            <FooterStyled color="font">
                <Container border={"none"} >
                    <Flex row="row">
                        <Flex padding="0 !important" md={3} sm={4} xs={12}>
                            <div><KDImg src={footer} height={"auto"} width={"auto"} noborder="true" /></div>
                            <Typography fntsize="bodyTitleFontSize" color="bodyContent" fntweight="bold" width={"100%"} txtalign="left">
                                {t("cust_support")}
                            </Typography>
                            <SizeBox />


                            <Flex row="row">
                                <Flex md={12} sm={12} xs={12} padding="0 !important">
                                    {localStorage.i18nextLng == "en" ? <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left" fnfamily="var(--dashboard-font)"
                                    >
                                        <a href="tel:01703121360">  01703121360</a>
                                    </Typography> : <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left" fnfamily="var(--dashboard-font)" incnumtype="inc" incnum={1}>
                                        <a href="tel:01703121360">  01703121360</a>
                                    </Typography>}

                                    {localStorage.i18nextLng == "en" ? <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left" fnfamily="var(--dashboard-font)">
                                        <a href="tel:01723151360">01730251360</a>
                                    </Typography> : <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left" fnfamily="var(--dashboard-font)" incnumtype="inc" incnum={1}>
                                        <a href="tel:01723151360">01730251360</a>
                                    </Typography>}

                                    {localStorage.i18nextLng == "en" ? <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left" fnfamily="var(--dashboard-font)" >
                                        <a href="mailto:contact@Biz360Expo.com">contact@Biz360Expo.com</a>
                                    </Typography> : <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left" fnfamily="var(--dashboard-font)" incnumtype="inc" incnum={1}>
                                        <a href="mailto:contact@Biz360Expo.com">contact@Biz360Expo.com</a>
                                    </Typography>}

                                    {localStorage.i18nextLng == "en" ? <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left" fnfamily="var(--dashboard-font)" >
                                        <a href="mailto:marketing@Biz360Expo.com">marketing@Biz360Expo.com</a>
                                    </Typography> : <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left" fnfamily="var(--dashboard-font)" incnumtype="inc" incnum={1}>
                                        <a href="mailto:marketing@Biz360Expo.com">marketing@Biz360Expo.com</a>
                                    </Typography>}
                                </Flex>
                            </Flex>



                        </Flex>
                        <Flex padding="0 !important" md={2} sm={4} xs={12}>
                            <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                <Link href={link + "pabout"} target="blank">{t("perception")}</Link>
                            </Typography>
                            <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                <Link href={link + "pabout"} target="blank">{t("core_concept")}</Link>
                            </Typography>
                            <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                <Link href={link + "pabout"} target="blank">{t("about_biz360")}</Link>
                            </Typography>
                            <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                <Link href={link + "pabout"} target="blank">{t("purpose")}</Link>
                            </Typography>
                            <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                <Link href={link + "pabout"} target="blank">{t("key_fea")}</Link>
                            </Typography>
                            <SizeBox />   <SizeBox />   <SizeBox />
                            <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                <a href="https://member.biz360expo.com" target="_blank" rel="noopener noreferrer">
                                    {t("mem_admn_login")}
                                </a>
                            </Typography>
                             <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                <a href="biz360expo.com" target="_blank" rel="noopener noreferrer">
                                    {t("plat_admn_login")}
                                </a>
                            </Typography>


                        </Flex>
                        <Flex padding="0  !important" md={2} sm={4} xs={12}>
                            <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">

                                <Link href={link + "pmember"} target="blank">{t("ben_member")}</Link>

                            </Typography>

                            <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                <Link href={link + "difplatfrm"} target="blank">{t("dif_plat")}</Link>
                            </Typography>
                            <SizeBox />    <SizeBox />
                            <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                <Link href={link + "identitybiz"} target="blank">{t("identity_biz")}</Link>
                            </Typography>
                            <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left" >
                                <Link href={link + "cpyright"} target="blank">{t("copyright")}</Link>
                            </Typography>
                            <SizeBox />   <SizeBox />
                            <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                <Link href={link + "crvalue"} target="blank">{t("principles")}</Link>

                            </Typography>
                            <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">

                                <Link href={link + "crvalue"} target="blank">{t("core_value")}</Link>

                            </Typography>
                        </Flex>
                        <Flex padding="0 !important" md={2} sm={5} xs={12}>
                            <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                <Link href={link + "termcond"} target="blank">{t("term_service")}</Link>
                            </Typography>
                            {/* <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                <Link href="/#/disclmrst" target="blank">{t("disclaimer_state")}</Link>
                            </Typography> */}
                            {/* <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                <Link href="/#/privacy" target="blank">{t("privacy_policy")}</Link>
                            </Typography> */}
                            <SizeBox />   <SizeBox />
                            <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                <Link href={link + "pgintch"} target="blank">{t("contact_us")}</Link>
                            </Typography>
                            <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">

                                <Link href={link + "pgintch"} target="blank">{t("cust_service")}</Link>
                            </Typography>
                            <SizeBox />   <SizeBox />
                            <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                <Link href={link + "viwdemo"} target="blank">{t("view_demo")}</Link>
                            </Typography>
                            <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                <Link href={link + "pfaq"}>{t("faq")}</Link>
                            </Typography>
                        </Flex>
                        <Flex padding="0 !important" md={3} sm={7} xs={12}>
                            <Typography fntsize="bodyTitleFontSize" color="bodyContent" fntweight="bold" width={"100%"}>
                                {t("connect_us")}
                            </Typography>
                            <SizeBox />
                            <Flex row="row">
                                <Flex padding="0 !important" md={4} sm={4} xs={4}>
                                    <Typography >

                                        <FooterMenu itAlign="start">
                                            <a href="https://www.facebook.com/biz360expo/" target="_blank"><Icon hvcolor="white" hvfill="white" hvback="blue" color="black" data-feather="facebook" hover="true" size={40} />
                                                {/* <label>Facebook</label> */}
                                                <IconLabel>Facebook</IconLabel>
                                            </a>
                                        </FooterMenu>


                                        <FooterMenu itAlign="start">
                                            <a href="https://x.com/biz360expo" target="_blank"><Icon hvcolor="white" hvfill="white" hvback="#0dbbe0" color="black" data-feather="twitter" hover="true" size={40} />
                                                {/* <label>Twitter</label> */}
                                                <IconLabel>Twitter</IconLabel>
                                            </a>
                                        </FooterMenu>
                                        <FooterMenu itAlign="start">
                                            <a href="https://www.instagram.com/" target="_blank"><Icon hvcolor="red" hvfill="white" hvback="red" data-feather="instagram" hover="true" size={40} />
                                                {/* <label>Instagram</label> */}
                                                <IconLabel>Instagram</IconLabel>
                                            </a>
                                        </FooterMenu>
                                    </Typography>


                                </Flex>
                                <Flex padding="0 !important" md={4} sm={4} xs={4}>

                                    <FooterMenu itAlign="center">
                                        <a href="https://www.youtube.com/@Biz360Expo" target="_blank"><Icon hvcolor="red" hvfill="white" hvback="red" data-feather="youtube" hover="true" size={40} />
                                            {/* <label>Youtube</label> */}
                                            <IconLabel>Youtube</IconLabel>
                                        </a>
                                    </FooterMenu>
                                    <FooterMenu itAlign="center">
                                        <a href="https://www.linkedin.com/in/biz360expo/" target="_blank">
                                            <Icon hvcolor="white" hvfill="white" hvback="#1bbc9b" color="black" data-feather="linkedin" hover="true" size={40} />
                                            <IconLabel>LinkedIn</IconLabel>
                                            {/* <label>Linked In</label> */}
                                        </a>
                                    </FooterMenu>
                                    <FooterMenu itAlign="center">
                                        <a href="https://www.google.com/search?q=biz360expo.com" target="_blank">
                                            <Icon hvcolor="white" hvfill="white" hvback="red" color="black" hover="true" size={40}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M25.997,48C13.312,48,2.992,37.683,2.992,25c0-12.682,10.32-23,23.005-23c5.746,0,11.247,2.13,15.491,5.997l0.774,0.706l-7.588,7.585l-0.703-0.602c-2.226-1.906-5.058-2.956-7.975-2.956c-6.767,0-12.273,5.504-12.273,12.27s5.506,12.27,12.273,12.27c4.879,0,8.733-2.491,10.549-6.737H24.997V20.176l22.549,0.031L47.713,21c1.179,5.582,0.235,13.793-4.528,19.667C39.238,45.533,33.456,48,25.997,48z" /></svg>

                                            </Icon>
                                            <IconLabel>Google</IconLabel>
                                            {/* <label>Google</label> */}
                                        </a>
                                    </FooterMenu>

                                </Flex>
                                <Flex padding="0 !important" md={4} sm={4} xs={4}>
                                    <FooterMenu itAlign="right">
                                        <a href="https://wa.me/01723151360" target="_blank">
                                            <Icon hvcolor="white" hvfill="white" hvback="green" color="black" hover="true" size={40}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px"><g id="Outlined"><path d="M19.077,4.928C17.191,3.041,14.683,2.001,12.011,2c-5.506,0-9.987,4.479-9.989,9.985c-0.001,1.76,0.459,3.478,1.333,4.992L2,22l5.233-1.237c1.459,0.796,3.101,1.215,4.773,1.216h0.004c5.505,0,9.986-4.48,9.989-9.985C22.001,9.325,20.963,6.816,19.077,4.928z M12.007,19.979c-1.333-0.001-2.653-0.337-3.816-0.972L7.518,18.64l-0.745,0.176l-1.968,0.465l0.481-1.784l0.216-0.802l-0.415-0.719c-0.698-1.208-1.066-2.588-1.065-3.991C4.024,7.583,7.607,4,12.01,4c2.136,0.001,4.143,0.833,5.652,2.341c1.509,1.51,2.339,3.517,2.337,5.651C19.997,16.396,16.413,19.979,12.007,19.979z" /><path d="M16.898,15.554c-0.208,0.583-1.227,1.145-1.685,1.186c-0.458,0.042-0.887,0.207-2.995-0.624c-2.537-1-4.139-3.601-4.263-3.767c-0.125-0.167-1.019-1.353-1.019-2.581S7.581,7.936,7.81,7.687c0.229-0.25,0.499-0.312,0.666-0.312c0.166,0,0.333,0,0.478,0.006c0.178,0.007,0.375,0.016,0.562,0.431c0.222,0.494,0.707,1.728,0.769,1.853s0.104,0.271,0.021,0.437s-0.125,0.27-0.249,0.416c-0.125,0.146-0.262,0.325-0.374,0.437c-0.125,0.124-0.255,0.26-0.11,0.509c0.146,0.25,0.646,1.067,1.388,1.728c0.954,0.85,1.757,1.113,2.007,1.239c0.25,0.125,0.395,0.104,0.541-0.063c0.146-0.166,0.624-0.728,0.79-0.978s0.333-0.208,0.562-0.125s1.456,0.687,1.705,0.812c0.25,0.125,0.416,0.187,0.478,0.291C17.106,14.471,17.106,14.971,16.898,15.554z" /></g></svg>
                                            </Icon>
                                            <IconLabel>WhatsApp</IconLabel>
                                            {/* <label>WhatsApp</label> */}
                                        </a>
                                    </FooterMenu>
                                    <FooterMenu itAlign="right">
                                        <a href="https://t.me/biz360expo" target="_blank">
                                            <Icon hvcolor="white" hvfill="white" hvback="#0dbbe0" color="black" hover="true" size={40}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z" /></svg>
                                            </Icon>
                                            <IconLabel>Telegram</IconLabel>
                                            {/* <label>Telegram</label> */}
                                        </a>
                                    </FooterMenu>
                                    <FooterMenu itAlign="right">
                                        <a href="https://m.me/biz360expo/" target="_blank">
                                            <Icon hvcolor="white" hvfill="white" hvback="#448AFF" color="black" hover="true" size={40}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px"><g id="outlined"><path d="M12,2C6.486,2,2,6.262,2,11.5c0,2.545,1.088,4.988,3,6.772v4.346l4.08-2.039C10.039,20.858,11.02,21,12,21c5.514,0,10-4.262,10-9.5S17.514,2,12,2z M12,19c-0.789,0-1.584-0.115-2.361-0.341l-0.753-0.219L8.185,18.79L7,19.382v-1.11v-0.869L6.364,16.81C4.862,15.408,4,13.472,4,11.5C4,7.365,7.589,4,12,4s8,3.365,8,7.5S16.411,19,12,19z" /><polygon points="13,14 10.5,12 6,14 11,9 13.5,11 18,9 " /></g></svg>
                                            </Icon>
                                            <IconLabel>Messenger</IconLabel>
                                            {/* <label>Messenger</label> */}
                                        </a>
                                    </FooterMenu>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex row="row" justifycenter="true">
                        <Flex md={12} sm={12} xs={12} padding=" 10px 0 0 0!important">
                            <Typography fnfamily="var(--dashboard-font)" fntsize="bodyTitleFontSize" color="primaryFont" width={"100%"} margin="5px 0" incnum={1} incnumtype="decr">

                                © {getCurrentYear() === 2025 ? 2025 : `2025 - ${getCurrentYear()}`} Biz 360 Expo | All Rights Reserved to  <Link href="https://kingdigital.com.bd/" target="blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        margin: '0 0 0 5px',
                                    }}

                                > King Digital Recharge Ltd.</Link>     | {" "}
                                {localStorage.i18nextLng == "en" ? <Link href={link + "sitemap"}
                                    style={{
                                        fontFamily: 'var(--dashboard-font)'
                                    }}
                                    target="blank">

                                    {t("site_map")}
                                </Link> : <Link href={link + "sitemap"}
                                    style={{
                                        fontFamily: 'var(--bangla-font)'
                                    }}
                                    target="blank">

                                    {t("site_map")}
                                </Link>}

                                {/* <Link href="/sitemap"
                                    style={{
                                        fontFamily: 'var(--bangla-font)'
                                    }}
                                    target="blank">

                                    {t("site_map")}
                                </Link> */}
                            </Typography>
                        </Flex>
                        <ULine />
                        <Flex md={12} sm={12} xs={12} padding="0 0 10px 0!important">
                            <Typography fnfamily="var(--dashboard-font)" fntsize="bodysubTitleFontSize" color="primaryFont" width={"100%"} margin="5px 0 10px 0">
                                {t("copyright_desc")}
                            </Typography>
                        </Flex>
                    </Flex>
                </Container>
            </FooterStyled >
        </>
    );
};

export default Footer;
