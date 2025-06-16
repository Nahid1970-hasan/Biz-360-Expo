import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Typography } from "../component/style/styled_typography";
import { Container } from "../component/style/styled_contrainer";
import { Center } from "../component/style/styled_center";


export const DefaultSkillPage = () => {
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
                        <h3> {"This is your Skill Page"}</h3>
                    </Center>
                </Container>
            </Suspense>
        </>

    );
};
