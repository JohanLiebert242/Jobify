//Libraries
import { useDashboardContext } from '../pages/DashboardLayout';
import {FaAlignLeft} from 'react-icons/fa';

//Components
import Logo from '../components/Logo';

//Wrapper
import Wrapper from '../assets/wrappers/Navbar';
import { LogoutContainer, ThemeToggle } from '.';

function Navbar() {
    const {toggleSidebar} = useDashboardContext();
    return (
        <Wrapper>
            <div className='nav-center'>
                <button className='toggle-btn' type='button' onClick={toggleSidebar}>
                    <FaAlignLeft />
                </button>
                <div>
                    <Logo />
                    <h4 className='logo-text'>Dashboard</h4>
                </div>     
                <div className='btn-container'>
                    <ThemeToggle />
                    <LogoutContainer/>
                </div>
            </div>
        </Wrapper>
    );
}

export default Navbar;