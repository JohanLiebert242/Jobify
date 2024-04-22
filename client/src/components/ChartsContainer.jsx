//Libraries
import { useState } from 'react';

//Components
import BarChart from './BarChart';
import AreaChart from './AreaChart';

//Wrapper
import Wrapper from '../assets/wrappers/ChartsContainer';


function ChartsContainer({data}) {
    const [barChart, setBarChart] = useState(true);

    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            <button onClick={() => setBarChart(!barChart)} type='button'>
                {barChart ? 'Area Chart' : 'Bar Chart'}
            </button>
            {barChart ? <BarChart data={data} /> : <AreaChart data={data} /> }
        </Wrapper>
    );
}

export default ChartsContainer;