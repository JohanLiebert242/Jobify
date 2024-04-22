//Libraries
import {BsFillSunFill, BsFillMoonFill} from 'react-icons/bs'; 
import { useDashboardContext } from '../pages/DashboardLayout';

//Wrapper
import Wrapper from '../assets/wrappers/ThemeToggle';


function ThemeToggle() {
    const {isDarkTheme, toggleDarkTheme} = useDashboardContext();

    return (
        <Wrapper onClick={toggleDarkTheme}>
            {isDarkTheme ? (
                <BsFillSunFill className='toggle-icon' />
            ) : 
            (
            <BsFillMoonFill className='toggle-icon' />
            )}
        </Wrapper>
    );
}


export default ThemeToggle;

