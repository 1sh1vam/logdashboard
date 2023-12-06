import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { LogT } from "@/types/logs";
import { aggregateDataByInterval } from "@/utils/logs";
import { useMemo } from "react";

// ChartJS.defaults.backgroundColor = '#222222'
ChartJS.defaults.backgroundColor = "#9BD0F5";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartProps = {
  logs: LogT[];
  startTime: number;
  endTime: number;
}

const options = {
  responsive: true,
  backgroundColor: "#222222",
  aspectRatio: 1,
  plugins: {
    legend: {
      // position: "top" as const,
      display: false,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const Charts = ({ logs, startTime, endTime }: ChartProps) => {
  const { xAxisLabels, aggregatedData, intervals } = aggregateDataByInterval(logs, startTime, endTime);

  const { lineData, barData } = useMemo(() => ({
      barData: {
        labels: xAxisLabels,
        datasets: [
          {
            data: intervals.map((interval) => aggregatedData[interval]?.users.size || 0),
            backgroundColor: "#BA4A0C",
            borderColor: '#FEA013'
          }
        ],
      },
      lineData:  {
        labels: xAxisLabels,
        datasets: [
          {
            label: 'Api Calls',
            data: intervals.map((interval) => aggregatedData[interval]?.apiCalls || 0),
            backgroundColor: "#BA4A0C",
            borderColor: '#FEA013'
          },
          {
            label: 'Failed Calls',
            data: intervals.map((interval) => aggregatedData[interval]?.failedCalls || 0),
            backgroundColor: "#69563A",
            borderColor: '#D23131'
          },
        ],
      }
    
    }), [xAxisLabels, aggregatedData])

  return (
    <div className="sm:flex flex-row gap-10 p-3 sm:p-6">
      <div className="w-full sm:w-[40%] sm:max-w-[300px] bg-neutral-dark px-4 py-2 rounded-lg">
        <Bar options={options} data={barData} />
      </div>
      <div className="mt-6 sm:mt-0 w-full sm:w-[40%] sm:max-w-[300px] bg-neutral-dark px-4 py-2 rounded-lg">
        <Line
          options={{
            ...options,
            plugins: {
              ...options.plugins,
              legend: { position: "top" as const },
            },
          }}
          data={lineData}
        />
      </div>
    </div>
  );
};

export default Charts;
