import { Outlet } from "react-router-dom";
import MainNavigation from "../MainNavigation";


const RootLayout:React.FC = () => {
    return(
        <main className="w-full">
            <MainNavigation />
            <Outlet />
        </main>
    )
};

export default RootLayout;