 
import { memo } from "react";
import { Center } from "../component/style/styled_center";
import { Typography } from "../component/style/styled_typography";

export const NotFound= () => {
    return <div style={{ userSelect: "none" }}>
        <Center>
            <Typography fntweight={100} fntsize="extraLargeFontSize" color="font">404</Typography>
            <Typography fntsize="headingLargeFontSize" >
                 Not Found
            </Typography> 
        </Center>
    </div>
}

export const MemberNotFound= ({msg}) => {
    return <div style={{ userSelect: "none" }}>
        <Center>
            <Typography fntweight={100} fntsize="extraLargeFontSize" color="font">404</Typography>
            <Typography fntsize="headingLargeFontSize" >
               {msg || " Member Not Found"}
            </Typography> 
        </Center>
    </div>
}

export const TemplateNotFound = memo ( ({name}) => {
    return <div style={{ userSelect: "none" }}>
        <Center>
            <Typography fntweight={100} fntsize="titleLargeFontSize" color="font">{"Hi"} {name}</Typography>
            <Typography fntsize="dsFontSize" >
               {"Please select the template and start your activities on Biz 360 Expo Digital Platform"}
            </Typography> 
        </Center>
    </div>
})

export const PageNotFound= ({msg}) => {
    return <div style={{ userSelect: "none" }}>
        <Center>
            <Typography fntweight={100} fntsize="extraLargeFontSize" color="font">404</Typography>
            <Typography fntsize="headingLargeFontSize" >
               {msg || " Page Not Found"}
            </Typography> 
        </Center>
    </div>
}