import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "../component/style/styled_typography";
import { Container } from "../component/style/styled_contrainer";
import { Center } from "../component/style/styled_center";
 
import { Flex } from "../component/style/styled_flex";

export const UserSkillPage = () => {
    const profilePubData = useSelector((state) => state.pubprofiledata);
    const [basicInfo, setBasicInfo] = useState("");
    const user = useSelector((state) => state.user);
    const [fullname, setfullname] = useState();

    useEffect(() => {
        setBasicInfo(profilePubData?.basicData || {});
    }, [profilePubData?.profileData]);
    
    return (
        <>
            <Suspense>
                <Container>

                    <Center>
                        <Typography fntsize="headingLargeFontSize" >
                            {"HI"} {basicInfo?.biz_name || ""}
                        </Typography>

                    </Center>
                    <Flex row="true">
                        <Flex md={12}>
                          
                        </Flex>
                    </Flex>
                </Container>
            </Suspense>
        </>

    );
};
