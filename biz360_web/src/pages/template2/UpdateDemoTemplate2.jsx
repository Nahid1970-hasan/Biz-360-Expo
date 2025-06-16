import { Suspense, useState } from "react";
import { CardHeaderButton, InfoCard } from "../../component/style/styled_card";
import { ActiveButton } from "../../component/style/styled_button";
import { Flex } from "../../component/style/styled_flex";
import { ULine, UnderLine } from "../../component/style/styled_uline";
import { SizeBox } from "../../component/style/styled_sizebox";
import { UpdateTemp2ContentInfo } from "./UpdateTemp2ContentInfo";
import { UpdateTemp2BodyContent } from "./UpdateTemp2BodyContent";
import { UpdateTemp2BasicInfoPage } from "./UpdateTemp2BasicInfo";
import { UpdateAboutTemp2 } from "./UpdateAboutTemp2";
import { UpdateServiseTemp2 } from "./UpdateServiseTemp2";
import { UpdateTemp2Tecnology } from "./UpdateTemp2tecnology";
import { UpdateTemp2Contact } from "./UpdateTemp2Contact";


export const UpdateDemoTemplate2 = () => {
    const [url_active, set_url_active] = useState("basic");

    function onTabClick(url) {
        set_url_active(url);
    }

    return (<>  <Suspense>
        <Flex row={"true"}>
            <Flex padding="0 !important" md={12}>
                <InfoCard>
                    <CardHeaderButton start={'start'}>
                        <div>
                            <ActiveButton height="40px" active={url_active == "basic" ? "true" : null} color="secondaryButton" type="button" onClick={() => onTabClick("basic")}>
                                Basic Info                                </ActiveButton>
                            {url_active == "basic" && <UnderLine />}
                        </div>
                        <div>
                            <ActiveButton height="40px" color="secondaryButton" active={url_active == "hfcontent" ? "true" : null} type="button" onClick={() => onTabClick("hfcontent")}>
                                Header & Footer
                            </ActiveButton>
                            {url_active == "hfcontent" && <UnderLine />}
                        </div>
                        <div>
                            <ActiveButton height="40px" color="secondaryButton" active={url_active == "bdcontent" ? "true" : null} type="button" onClick={() => onTabClick("bdcontent")}>
                                At a Glance
                            </ActiveButton>
                            {url_active == "bdcontent" && <UnderLine />}
                        </div>
                        <div>
                            <ActiveButton height="40px" color="secondaryButton" active={url_active == "services" ? "true" : null} type="button" onClick={() => onTabClick("services")}>
                                Product and Service
                            </ActiveButton>
                            {url_active == "services" && <UnderLine />}
                        </div>
                        <div>
                            <ActiveButton height="40px" color="secondaryButton" active={url_active == "technology" ? "true" : null} type="button" onClick={() => onTabClick("technology")}>
                            Competency
                            </ActiveButton>
                            {url_active == "technology" && <UnderLine />}
                        </div>
                        <div>
                            <ActiveButton height="40px" color="secondaryButton" active={url_active == "aboutus" ? "true" : null} type="button" onClick={() => onTabClick("aboutus")}>
                                About US
                            </ActiveButton>
                            {url_active == "aboutus" && <UnderLine />}
                        </div>
                        <div>
                            <ActiveButton height="40px" color="secondaryButton" active={url_active == "contactus" ? "true" : null} type="button" onClick={() => onTabClick("contactus")}>
                                Contact US
                            </ActiveButton>
                            {url_active == "contactus" && <UnderLine />}
                        </div>
                    </CardHeaderButton>
                </InfoCard>
            </Flex>
            <Flex padding="0 !important" md={12} sm={12} xs={12}><ULine /></Flex>
            <SizeBox />
        </Flex>
        <Flex row={"true"}>
            <Flex padding="0 !important" md={12}>
                {url_active == "basic" ? <UpdateTemp2BasicInfoPage /> : <></>}
                {url_active == "hfcontent" ? <UpdateTemp2ContentInfo /> : <></>}
                {url_active == "bdcontent" ? <UpdateTemp2BodyContent /> : <></>}
                {url_active == "aboutus" ? <UpdateAboutTemp2 /> : <></>}
                {url_active == "services" ? <UpdateServiseTemp2 /> : <></>}
                {url_active == "technology" ? <UpdateTemp2Tecnology /> : <></>}  
                {url_active == "contactus" ? <UpdateTemp2Contact /> : <></>}  
            </Flex>
        </Flex>
    </Suspense>
    </>)
}