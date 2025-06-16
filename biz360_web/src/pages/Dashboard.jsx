import { AdminDashboardPage } from "./AdminDashbord";
import { IndOrgDashboardPage } from "./DashboardInvOrg";


export const DashboardPage = () => { 
  return ( localStorage.user_type=="COM"?<AdminDashboardPage/>:<IndOrgDashboardPage/>);
};
