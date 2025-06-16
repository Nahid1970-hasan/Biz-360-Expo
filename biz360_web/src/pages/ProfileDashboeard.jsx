import { ComProfilePage } from "./ComProfile";
import { SeasonalProfilePage } from "./SeasonalProfile";

const ProfilePage = () => {
  const isSeasonalTrader = localStorage.getItem("seasonal_trader") === "Yes";
  return isSeasonalTrader ? <SeasonalProfilePage /> : <ComProfilePage />;
};