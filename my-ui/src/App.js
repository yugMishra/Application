import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const App = () => {
    const [sampleData, setSampleData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/sampledata');
                setSampleData(response.data);
            } catch (error) {
                console.error('Error fetching sample data:', error);
            }
        };

        fetchData();
    }, []);

    const options = {
        chart: {
            type: 'heatmap',
            height: 400
        },
        title: {
            text: 'Machine Status Heatmap'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            categories: ['Machine Status'],
            title: null
        },
        colorAxis: {
            stops: [
                [0, 'red'], // Missing data
                [0.5, 'yellow'], // Value 0
                [1, 'green'] // Value 1
            ]
        },
        series: [{
            data: sampleData.map(({ ts, machine_status }) => ([new Date(ts).getTime(), 0, machine_status]))
        }]
    };

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    );
};

export default App;
