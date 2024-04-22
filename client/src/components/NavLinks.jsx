//Libraries
import { NavLink } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";
//Utils
import links from "../utils/links";


function NavLinks({isBigSidebar}) {
    const {user, toggleSidebar} = useDashboardContext();

    return (
        <div className="nav-links">
            {links.map(link => {
                const {path, text, icon } = link;
                const {role} = user;
                if(path === 'admin' && role !== 'admin') return;

                return(
                    <NavLink
                        to={path}
                        className='nav-link'
                        key={text}
                        onClick={isBigSidebar ? null : toggleSidebar}
                        end
                    >
                        <span className="icon">{icon}</span> {text}
                    </NavLink>
                )
            })}
        </div>
    );
}

export default NavLinks;