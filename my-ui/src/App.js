import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const App = () => {
    // Initialize state variables
    const [sampleData, setSampleData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            // Set loading state to true
            setIsLoading(true);

            try {
                const response = await axios.get('/api/sampledata');
                setSampleData(response.data);
                // Data has been loaded, set loading state to false
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching sample data:', error);
                // Handle error and set loading state to false
                setIsLoading(false);
            }
        };

        // Call the fetchData function to fetch data
        fetchData();
    }, []);

    // Define the Highcharts options object
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

    // Conditional rendering based on loading state
    return (
        <div>
            {isLoading ? (
                <p>Loading data...</p> // Display loading message while data is being fetched
            ) : (
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                />
            )}
        </div>
    );
};

export default App;
