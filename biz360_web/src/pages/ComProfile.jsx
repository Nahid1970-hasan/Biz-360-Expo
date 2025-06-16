import { useSelector } from "react-redux";
import { BizProfilePage } from "./BizProfile"
import { SeasonalProfilePage } from "./SeasonalProfile"

export const ComProfilePage = () => {
     const user = useSelector((state) => state.user);
    return (user?.basicInfo?.seasonal_trader=== "Yes"? <SeasonalProfilePage /> : <BizProfilePage />)
}