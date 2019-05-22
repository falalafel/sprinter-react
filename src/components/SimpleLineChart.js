import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

const data = [
    {name: 'Mon', Factor: 2200, "Avg Factor": 3400},
    {name: 'Tue', Factor: 1280, "Avg Factor": 2398},
    {name: 'Wed', Factor: 5000, "Avg Factor": 4300},
    {name: 'Thu', Factor: 4780, "Avg Factor": 2908},
    {name: 'Fri', Factor: 5890, "Avg Factor": 4800},
    {name: 'Sat', Factor: 4390, "Avg Factor": 3800},
    {name: 'Sun', Factor: 4490, "Avg Factor": 4300},
];

function SimpleLineChart() {
    return (
        // 99% per https://github.com/recharts/recharts/issues/172
        <ResponsiveContainer width="99%" height={320}>
            <LineChart data={data}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid vertical={false} strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="Factor" stroke="#82ca9d"/>
                <Line type="monotone" dataKey="Avg Factor" stroke="#8884d8" activeDot={{r: 8}}/>
            </LineChart>
        </ResponsiveContainer>
    );
}

export default SimpleLineChart;