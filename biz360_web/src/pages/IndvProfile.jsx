import { useSelector } from "react-redux";
import { IndividualProfile } from "./IndividualProfile";
import { SeasonalProfilePage } from "./SeasonalProfile";

export const IndvProfilePage = () => {
    const user = useSelector((state) => state.user);
    return (user?.basicInfo?.seasonal_trader=== "Yes"? <SeasonalProfilePage /> : <IndividualProfile />)
}