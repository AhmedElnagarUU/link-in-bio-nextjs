import DashboardStarter from "@/features/dashboard/componets/DashboardStarter";
import DashboardNavbar from "@/sharedUi/customUi/DashboardNavbar";





export default function dashboardPage(){
return (
<div className="flex">
  <DashboardNavbar/>
  <DashboardStarter/>
</div>
)  
}