//Libraries
import { useState } from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";

//Wrapper
import Wrapper from '../assets/wrappers/LogoutContainer';

function LogoutContainer() {
    const [showLogout, setShowLogout] = useState(false);
    const {user, logoutUser} = useDashboardContext();

    return (
       <Wrapper>
            <button
                className="btn logout-btn" 
                type='button'
                onClick={() => setShowLogout(!showLogout)}
            >
                {user.avatar ? (
                    <img src={user.avatar} alt='avatar' className="img" />
                ) : (
                    <FaUserCircle />
                )}
                {user?.name}
                <FaCaretDown />
            </button>
            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                <button
                    type="btn"
                    className="dropdown-btn"
                    onClick={logoutUser}
                >
                    Logout
                </button>
            </div>
       </Wrapper>
    );
}

export default LogoutContainer;