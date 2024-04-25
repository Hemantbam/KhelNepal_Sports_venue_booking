import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = ({ bookings }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Aggregate bookings data by day and count the number of bookings per day
    const aggregateData = bookings.reduce((acc, booking) => {
      const day = booking.createdAt.split("T")[0]; // Extracting the date part only
      acc[day] = acc[day] ? acc[day] + 1 : 1; // Counting the number of bookings for each day
      return acc;
    }, {});

    // Extracting aggregated labels (days) and data (number of bookings)
    const labels = Object.keys(aggregateData);
    const data = Object.values(aggregateData);

    // Create new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Number of Bookings",
            data: data,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Number of Bookings",
            },
          },
          x: {
            title: {
              display: true,
              text: "Day",
            },
          },
        },
      },
    });

    // Cleanup function to destroy chart instance when component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [bookings]);

  return (
    <div>
      <canvas ref={chartRef} width={600} height={400} />
    </div>
  );
};

export default LineChart;
