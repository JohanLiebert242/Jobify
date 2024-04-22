//Libraries
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';

//Wrapper
import Wrapper from "../assets/wrappers/StatsContainer";

//Components
import {StatItem} from '../components';


function StatsContainer({defaultStats}) {
    const statsData = [
        {
            title: "Pending Applications",
            count: defaultStats?.pending || 0,
            icon: <FaSuitcaseRolling />,
            color: '#f59e0b',
            bcg: '#fef3c7',
        },
        {
            title: "Interviews Scheduled",
            count: defaultStats?.interviewed || 0,
            icon: <FaCalendarCheck />,
            color: '#647acb',
            bcg: '#e0e8f9',
        },
        {
            title: "Jobs Declined",
            count: defaultStats?.rejected || 0,
            icon: <FaBug />,
            color: '#d66a6a',
            bcg: '#ffeeee',
        },
    ];

    return (
        <Wrapper>
            {statsData.map(item => {
               return <StatItem key={item.title} {...item} />
            })}
        </Wrapper>
    );
}

export default StatsContainer;