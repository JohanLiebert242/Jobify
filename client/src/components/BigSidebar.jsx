//Libraries
import { useDashboardContext } from "../pages/DashboardLayout";

//Component
import Logo from "./Logo";
import NavLinks from "./NavLinks";

//Wrapper
import Wrapper from "../assets/wrappers/BigSidebar";

function BigSidebar() {
    const {showSidebar} = useDashboardContext();
    return (
        <Wrapper>
            <div className={showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"}>
                <div className="content">
                    <header>
                        <Logo />
                    </header>
                    <NavLinks isBigSidebar/>
                </div>
            </div>
        </Wrapper>
    );
}

export default BigSidebar;