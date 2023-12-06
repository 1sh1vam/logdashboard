import { LogT } from "@/types/logs";

function calculateAggregationInterval(startTime: number, endTime: number) {
  const timeDifference = endTime - startTime;
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const millisecondsInWeek = 7 * millisecondsInDay;
  const millisecondsInMonth = 30 * millisecondsInDay;

  if (timeDifference <= millisecondsInDay) {
    return { interval: 4 * 60 * 60 * 1000, label: "4 Hours" };
  } else if (timeDifference <= 8 * millisecondsInDay) {
    return { interval: millisecondsInDay, label: "Day" };
  } else if (timeDifference <= millisecondsInMonth) {
    return { interval: millisecondsInWeek, label: "Week" };
  } else {
    return { interval: millisecondsInMonth, label: "Month" };
  }
}

function generateXAxisLabels(
  startTime: number,
  endTime: number,
  interval: number
) {
  const labels: string[] = [];
  let current = startTime;
  const intervals: number[] = [];

  while (current <= endTime) {
    if (interval === 4 * 60 * 60 * 1000) {
      labels.push(
        new Date(current).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    } else if (interval === 24 * 60 * 60 * 1000) {
      labels.push(
        new Date(current).toLocaleDateString("en-US", { weekday: "short" })
      );
    } else if (interval === 7 * 24 * 60 * 60 * 1000) {
      labels.push(`Week ${getISOWeek(new Date(current))}`);
    } else if (interval === 30 * 24 * 60 * 60 * 1000) {
      labels.push(
        new Date(current).toLocaleDateString("en-US", { month: "long" })
      );
    }

    if (intervals.length) {
        intervals.push(intervals[intervals.length-1] + interval)
    } else {
        intervals.push(startTime)
    }
    current += interval;
  }

  return { intervals, labels};
}

function getISOWeek(date: Date) {
  const januaryFirst = new Date(date.getFullYear(), 0, 1);
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.ceil(
    ((date.getTime() - januaryFirst.getTime()) / millisecondsPerDay +
      januaryFirst.getDay() +
      1) /
      7
  );
}

export function aggregateDataByInterval(
  logs: LogT[],
  startTime: number,
  endTime: number
) {
  const { interval } = calculateAggregationInterval(startTime, endTime);
  const aggregatedData: { [interval: number]: { users: Set<string>, apiCalls: number, failedCalls: number }} = {};

  const { labels, intervals } = generateXAxisLabels(startTime, endTime, interval);

  logs.forEach((log) => {
    const timestamp = new Date(log.createdAt).getTime();
    const intervalStart =
      Math.floor((timestamp - startTime) / interval) * interval + startTime;
    
    if (!aggregatedData[intervalStart]) {
      aggregatedData[intervalStart] = { users: new Set([log.userId]), apiCalls: 1, failedCalls: log.status === 'failed' ? 1 : 0 };
    } else {
        const intervalData = aggregatedData[intervalStart]
        intervalData.users.add(log.userId);
        intervalData.apiCalls += 1;
        intervalData.failedCalls += log.status === 'failed' ? 1 : 0
    }
  });


  return { aggregatedData, xAxisLabels: [ ...labels ], intervals };
}

export const getOverallLogsInfo = (logs: LogT[]) => {
    const users = new Set<string>();
    let failedCalls = 0;

    logs.forEach((log) => {
        users.add(log.userId);
        if (log.status === 'failed') {
            failedCalls += 1;
        }
    });

    return { totalUsers: users.size, apiCalls: logs.length, failedCalls };
}