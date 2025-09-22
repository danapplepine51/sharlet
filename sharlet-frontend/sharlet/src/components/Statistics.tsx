import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  PieController,
  Legend,
  Tooltip,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import API from '../services/API';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  PieController,
  Legend,
  Tooltip
);

export default function Statistics() {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const [barData, setBarData] = useState<number[]>(Array(12).fill(0));
  const [pieLabels, setPieLabels] = useState<string[]>([]);
  const [pieData, setPieData] = useState<number[]>([]);
  const [userSummary, setUserSummary] = useState<{ [userId: string]: number }>({});

  useEffect(() => {
    API.get('/api/v1/statistic')
      .then(res => {
        // Aggregate by date (YYYY-MM) for bar chart
        const hash: { [month: string]: number } = {};
        // Aggregate by category for pie chart
        const categoryHash: { [desc: string]: number } = {};
        // Aggregate by user_id
        const userHash: { [userId: string]: number } = {};
        res.data.forEach((item: { amount: string, date: string, description: string, user_id?: string }) => {
          if (!item.date) return;
          // Bar chart aggregation
          if (!hash[item.date]) hash[item.date] = 0;
          hash[item.date] += Number(item.amount);
          // Pie chart aggregation
          if (!categoryHash[item.description]) categoryHash[item.description] = 0;
          categoryHash[item.description] += Number(item.amount);
          // User summary aggregation
          if (item.user_id) {
            if (!userHash[item.user_id]) userHash[item.user_id] = 0;
            userHash[item.user_id] += Number(item.amount);
          }
        });
        // Map to barData by month (current year)
        const now = new Date();
        const year = now.getFullYear();
        const arr = Array(12).fill(0);
        Object.entries(hash).forEach(([date, amount]) => {
          const [y, m] = date.split('-');
          if (Number(y) === year) {
            arr[Number(m) - 1] = amount;
          }
        });
        setBarData(arr);
        // Pie chart data
        setPieLabels(Object.keys(categoryHash));
        setPieData(Object.values(categoryHash));
        setUserSummary(userHash);
      })
      .catch(() => {
        setBarData(Array(12).fill(0));
        setPieLabels([]);
        setPieData([]);
        setUserSummary({});
      });
  }, []);

  const data = {
    labels,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Spending',
        data: barData,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        type: 'line' as const,
        label: 'Trend',
        data: barData,
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  // Calculate user payment difference
  let paymentSummary = null;
  if (Object.keys(userSummary).length > 1) {
    const entries = Object.entries(userSummary);
    const maxUser = entries.reduce((a, b) => (a[1] > b[1] ? a : b));
    const minUser = entries.reduce((a, b) => (a[1] < b[1] ? a : b));
    const diff = maxUser[1] - minUser[1];
    if (diff > 0) {
      paymentSummary = `User ${minUser[0]} should pay User ${maxUser[0]}: ${diff}`;
    }
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 overflow-auto hidden md:block">
      {/* User summary */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div className="flex flex-wrap gap-4 items-center">
          {Object.keys(userSummary).length > 0 ? (
            Object.entries(userSummary).map(([userId, amount]) => (
              <div key={userId} className="px-3 py-1 bg-green-100 text-green-800 rounded shadow text-sm font-medium flex items-center">
                <span className="font-bold mr-1">User {userId}:</span> <span>{amount}</span>
              </div>
            ))
          ) : (
            <span className="text-gray-500">No user summary available</span>
          )}
        </div>
        {paymentSummary && (
          <div className="px-4 py-2 bg-red-100 text-red-800 rounded shadow font-semibold text-base border border-red-300 mt-2 md:mt-0">
            <span className="mr-2">💸</span>{paymentSummary}
          </div>
        )}
      </div>
      {/* Ownership summary */}
      <h2 className="text-xl font-bold mb-4">Monthly Spending</h2>
      <Chart type="bar" data={data} options={options} />
      <h2 className="text-xl font-bold mt-8 mb-4">Spending by Category</h2>
      <Chart
        type="pie"
        data={{
          labels: pieLabels,
          datasets: [
            {
              label: 'Category Spending',
              data: pieData,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(201, 203, 207, 0.6)',
                'rgba(0, 200, 83, 0.6)',
                'rgba(255, 87, 34, 0.6)',
                'rgba(63, 81, 181, 0.6)'
              ],
              borderColor: ['#fff'],
              borderWidth: 1,
            },
          ],
        }}
        options={{ responsive: true }}
      />
    </div>
  );
};