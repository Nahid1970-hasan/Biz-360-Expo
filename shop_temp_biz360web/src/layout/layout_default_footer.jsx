import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { Typography } from "../component/style/styled_typography";
import { getCurrentYear, getValueByLang } from "../utils/helper";
import { FooterStyled } from "../component/style/styled_footer";
import { Link } from "react-alice-carousel";
import { Icon } from "../component/style/styled_icon";
import * as feather from "feather-icons/dist/feather.min";
import { SizeBox } from "../component/style/styled_sizebox";
import whatsapp from "../assets/icons/whatsapp.svg";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const Border = styled.div`
    padding: 5px;
    border-radius: 20px; 
`;

export const FooterMenu = styled.div`
  width: 100%;
  display: flex;
  padding: 5px 0;
  justify-content: ${({ justifycenter }) => justifycenter ? justifycenter : "start"};  
  align-items: center;
  color: ${({ theme }) => theme.colors.bodyContent};  
  &>a{   
    text-decoration: none; 
    cursor: pointer;
    color:${({ theme }) => theme.colors.primaryFont} ; 
    width: ${({ awidth }) => awidth ? awidth : "auto"};  
    &:hover {
      color:${({ theme }) => theme.colors.primaryHover} ;  
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

`;
export const DVFooterTempLayout = () => {
    const profilePubData = useSelector((state) => state.dfprofiledata);
    const [footerData, setFooterData] = useState({});
    const [activeSocial, setActiveSocial] = useState([]);
    const [activeImpLink, setActiveImpLink] = useState([]);

    useEffect(() => { feather.replace() }, []);

    useEffect(() => {
        var tmpftdata = JSON.parse(profilePubData?.footerData || '{}') || {};
        setFooterData(tmpftdata);
        setActiveImpLink(profilePubData?.moduleList?.filter((d) => d.menu_position == "footer") || []);
        setActiveSocial(tmpftdata?.social_media?.link?.filter((b) => b.status == "Active") || [])
        setTimeout(() => { feather.replace(); }, 900);
    }, [profilePubData.footerData]);

    return (
        <>
            <FooterStyled color="font">
                <Container>
                    <Flex row="row">
                        <Flex padding="10px 0 0 0 !important" md={3}>
                            <Typography fntsize="bodyTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                {footerData?.support?.title || "Support"}
                            </Typography>
                            <SizeBox />
                            {
                                footerData?.support?.datalist?.map((d, i) => <div key={i}>
                                    {d.status == "Active" ? d.type == "mobile" ? <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                        <FooterMenu><a>{d.name || "mobile" + (i + 1)}</a> </FooterMenu>
                                    </Typography> : d.type == "email" ?
                                        <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                            <FooterMenu><a >{d.name || "email" + (i + 1)}</a></FooterMenu>
                                        </Typography> : <Typography fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                            <FooterMenu> {d.name || "other_info"}</FooterMenu>
                                        </Typography> : <></>}
                                </div>)
                            }
                        </Flex>
                        <Flex padding="10px 0 0 0 !important" md={3}>
                            <Typography margin="0 0 0 10px" fntsize="bodyTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                {footerData?.important_link?.title || "Support"}
                            </Typography>
                            <SizeBox />
                            {
                                activeImpLink?.map((d, i) =>
                                    <Typography key={i} fntsize="bodySubTitleFontSize" color="bodyContent" width={"100%"} txtalign="left">
                                        <FooterMenu><NavLink to={ d?.page_name || "/"}  ><label>{getValueByLang(d.menu_name || "{}") || "Link " + (i + 1)}</label></NavLink></FooterMenu>
                                    </Typography>)
                            }
                        </Flex>
                        <Flex padding="10px 0 0 0 !important" md={6}>
                            <Typography fntsize="bodyTitleFontSize" color="bodyContent" width={"100%"}>
                                {footerData?.social_media?.title || "Follow US"}
                            </Typography>
                            <SizeBox />
                            <Flex row="row">
                                {
                                    activeSocial.map((d, i) =>
                                        <Flex key={i} padding="0 !important" md={activeSocial.length > 2 ? 4 : activeSocial?.length > 1 ? 6 : 12}>
                                            <FooterMenu justifycenter={activeSocial.length > 2 ? "start" : "center"}>
                                                <a target="_blank">
                                                    {
                                                        d.type == "icon" ? <Icon hvcolor={d.hvcolor} hvfill="white" hvback={d.hvback} color={d.color} data-feather={d.icon} hover={d.hover} size={40} />
                                                            : <Icon hvcolor={d.hvcolor} hvfill="white" hvback={d.hvback} color={d.color} hover={d.hover} size={40}>
                                                                {d.icon == "google" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M25.997,48C13.312,48,2.992,37.683,2.992,25c0-12.682,10.32-23,23.005-23c5.746,0,11.247,2.13,15.491,5.997l0.774,0.706l-7.588,7.585l-0.703-0.602c-2.226-1.906-5.058-2.956-7.975-2.956c-6.767,0-12.273,5.504-12.273,12.27s5.506,12.27,12.273,12.27c4.879,0,8.733-2.491,10.549-6.737H24.997V20.176l22.549,0.031L47.713,21c1.179,5.582,0.235,13.793-4.528,19.667C39.238,45.533,33.456,48,25.997,48z" /></svg>}
                                                                {d.icon == "whatsapp" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px"><g id="Outlined"><path d="M19.077,4.928C17.191,3.041,14.683,2.001,12.011,2c-5.506,0-9.987,4.479-9.989,9.985c-0.001,1.76,0.459,3.478,1.333,4.992L2,22l5.233-1.237c1.459,0.796,3.101,1.215,4.773,1.216h0.004c5.505,0,9.986-4.48,9.989-9.985C22.001,9.325,20.963,6.816,19.077,4.928z M12.007,19.979c-1.333-0.001-2.653-0.337-3.816-0.972L7.518,18.64l-0.745,0.176l-1.968,0.465l0.481-1.784l0.216-0.802l-0.415-0.719c-0.698-1.208-1.066-2.588-1.065-3.991C4.024,7.583,7.607,4,12.01,4c2.136,0.001,4.143,0.833,5.652,2.341c1.509,1.51,2.339,3.517,2.337,5.651C19.997,16.396,16.413,19.979,12.007,19.979z" /><path d="M16.898,15.554c-0.208,0.583-1.227,1.145-1.685,1.186c-0.458,0.042-0.887,0.207-2.995-0.624c-2.537-1-4.139-3.601-4.263-3.767c-0.125-0.167-1.019-1.353-1.019-2.581S7.581,7.936,7.81,7.687c0.229-0.25,0.499-0.312,0.666-0.312c0.166,0,0.333,0,0.478,0.006c0.178,0.007,0.375,0.016,0.562,0.431c0.222,0.494,0.707,1.728,0.769,1.853s0.104,0.271,0.021,0.437s-0.125,0.27-0.249,0.416c-0.125,0.146-0.262,0.325-0.374,0.437c-0.125,0.124-0.255,0.26-0.11,0.509c0.146,0.25,0.646,1.067,1.388,1.728c0.954,0.85,1.757,1.113,2.007,1.239c0.25,0.125,0.395,0.104,0.541-0.063c0.146-0.166,0.624-0.728,0.79-0.978s0.333-0.208,0.562-0.125s1.456,0.687,1.705,0.812c0.25,0.125,0.416,0.187,0.478,0.291C17.106,14.471,17.106,14.971,16.898,15.554z" /></g></svg>}
                                                                {d.icon == "telegram" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z" /></svg>}
                                                                {d.icon == "messenger" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px"><g id="outlined"><path d="M12,2C6.486,2,2,6.262,2,11.5c0,2.545,1.088,4.988,3,6.772v4.346l4.08-2.039C10.039,20.858,11.02,21,12,21c5.514,0,10-4.262,10-9.5S17.514,2,12,2z M12,19c-0.789,0-1.584-0.115-2.361-0.341l-0.753-0.219L8.185,18.79L7,19.382v-1.11v-0.869L6.364,16.81C4.862,15.408,4,13.472,4,11.5C4,7.365,7.589,4,12,4s8,3.365,8,7.5S16.411,19,12,19z" /><polygon points="13,14 10.5,12 6,14 11,9 13.5,11 18,9 " /></g></svg>}
                                                            </Icon>
                                                    } <label>{d.name}</label>
                                                </a>
                                            </FooterMenu >
                                        </Flex>)
                                }
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex row="row" justifycenter="true">
                        <Flex md={12} padding="0!important">
                            <Typography fnfamily="var(--dashboard-font)" fntsize="bodyTitleFontSize" color="primaryFont" width={"100%"} margin="5px 0">
                                Copyright © {getCurrentYear()} | All Rights Reserved to BIZ360Expo
                            </Typography>
                        </Flex>
                    </Flex>
                </Container>
            </FooterStyled>
        </>
    );
};

