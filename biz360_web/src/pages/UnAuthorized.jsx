 
import { Typography } from "../component/style/styled_typography";
import { Center } from "../component/style/styled_center";

export default () => { 
    return (
        <div style={{ userSelect: "none" }}>
            <Center>
                <Typography fntweight={"bold"} fntsize="extraLargeFontSize">
                    401
                </Typography>
                <Typography fntsize="titleLargeFontSize" lnheight="23px">
                    Authentication Error!
                </Typography>
                <Typography lnheight="3rem" fntsize="bodyTitleFontSize">
                    Access expired
                </Typography> 
            </Center>
        </div>
    );
};
