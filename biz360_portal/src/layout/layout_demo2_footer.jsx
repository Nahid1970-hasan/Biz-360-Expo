import React from "react";
import * as feather from "feather-icons/dist/feather.min";
import { useEffect } from "react";
import { DateTime } from "luxon";
import styled from "styled-components";
import { Container } from "../component/style/styled_contrainer";
import { Flex } from "../component/style/styled_flex";
import { HL, Typography } from "../component/style/styled_typography";
import { ColorIcon } from "../component/style/styled_icon";
const Border = styled.div`
    // border: ${({ theme }) => "1px solid " + theme.colors.primaryBorder};
    padding: 5px;
    border-radius: 20px;
    //background-color: #198da0;
    // &:hover {
    //   padding: 4px;
    //   border: ${({ theme }) => "2px solid " + theme.colors.primaryHover} ; 
    // }
`;


const FTypography = styled(Typography)`
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.lgFontBn}; 
  }
`;

const FooterTypography = styled(Typography)`
  white-space: nowrap;  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.smFontBn}; 
  }
`;
const FooterTemp2Layout = () => {
  useEffect(() => { feather.replace() }, [])
  return (
    <>
      <FooterStyled>
        <Container border={"none"}>
          <Flex row="row">
            <Flex padding="5px 0 0  0!important" md={12}>
              <FTypography fontSize="bodySubTitleFontSize" fontWeight={"bold"} width={"100%"}>
                Connect with us
              </FTypography>
            </Flex>
            <Flex padding="0 !important" md={12}>
              <div style={{ marginTop: "4px", display: "flex", justifyContent: "center" }}>
                <Border><a href="" target="_blank"><ColorIcon color="white" background="blue" data-feather="facebook" hover size={40} /></a></Border>
                <Border><a href="" target="_blank"><ColorIcon color="white" background="#0dbbe0" data-feather="twitter" hover size={40} /></a></Border>
                <Border><a href="" target="_blank"><ColorIcon color="red" hoverBack={"secendaryColor"} background="red" data-feather="instagram" hover size={40} /></a></Border>
                <Border><a href="" target="_blank"><ColorIcon color="white" background="#0073b1" data-feather="linkedin" hover size={40} /></a></Border>
              </div>
            </Flex>
            <Flex padding="0 0 5px 0 !important" md={12}>
              <FooterTypography
                margin={"0 5px"}
                fontWeight={"bold"}
                fontSize="font">
                © {DateTime.now().toFormat("yyyy")}
                King <HL>Digital</HL> Recharge Ltd. || All Rights Reserved
              </FooterTypography>
            </Flex>
          </Flex>
        </Container>
      </FooterStyled>
    </>
  );
};

export default FooterTemp2Layout;
