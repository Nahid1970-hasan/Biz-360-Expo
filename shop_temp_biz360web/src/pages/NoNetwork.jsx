 
import { Center } from "../component/style/styled_center";
import { Typography } from "../component/style/styled_typography";

export const NotNetwork= () => {
    return <div style={{ userSelect: "none" }}>
        <Center>
            <Typography fntweight={100} fntsize="extraLargeFontSize" color="font">404</Typography>
            <Typography fntsize="headingLargeFontSize" >
                Can't load page this moment, please try later.
            </Typography> 
        </Center>
    </div>
}