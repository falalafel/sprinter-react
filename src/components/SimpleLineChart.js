import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import PropTypes from "prop-types";


function SimpleLineChart(props) {

    const {sprints} = props;
    const minMax = sprints.reduce((acc, sprint) => {
        acc[0] = ( acc[0] === undefined || sprint.factor < acc[0] || sprint.effectiveFactor < acc[0] )
            ? Math.min(sprint.factor,sprint.effectiveFactor) : acc[0]
        acc[1] = ( acc[1] === undefined || sprint.factor > acc[1] || sprint.effectiveFactor > acc[1])
            ? Math.max(sprint.factor,sprint.effectiveFactor) : acc[1]
        return acc;
    }, []);

    const data = sprints.map(s => ({
            Date: new Date(s.startDate).toLocaleDateString() + " - " + new Date(s.endDate).toLocaleDateString(),
            Factor: s.factor,
            "Avg Factor": s.effectiveFactor
        }));

    console.log(data);
    console.log([Math.round(minMax[0]*10 - 5)/10,Math.round(minMax[1]*10 + 5)/10]);

    return (
        <ResponsiveContainer width="99%" height={320}>
            <LineChart data={data}>
                <XAxis dataKey="Date"/>
                <YAxis domain={[Math.round(minMax[0]*10 - 5)/10,Math.round(minMax[1]*10 + 5)/10]}/>
                <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="Factor" stroke="#3f51b5"/>
                <Line type="monotone" dataKey="Avg Factor" stroke="#d83232" activeDot={{r: 8}}/>
            </LineChart>
        </ResponsiveContainer>
    );
}

SimpleLineChart.propTypes = {
    sprints: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.date,
            factor: PropTypes.number,
            effectiveFactor: PropTypes.number,
        })
    ).isRequired
};

export default SimpleLineChart;