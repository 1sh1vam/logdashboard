import { useState, useMemo } from 'react';
import ContentBox from "./components/general/ContentBox";
import LogOverallInfo from "./components/logs/LogOverallInfo";
import Charts from "./containers/Charts";
import LogTable from "./containers/LogTable";
import TimeFilter from "./containers/TimeFilter";
import { LogT } from './types/logs';
import { getOverallLogsInfo } from './utils/logs';

function App() {
  const [logs, setLogs] = useState<LogT[]>([]);
  const [timeRange, setTimeRange] = useState({ startTime: Date.now(), endTime: Date.now() });

  const { apiCalls, failedCalls, totalUsers } = useMemo(() => getOverallLogsInfo(logs), [logs]);

  const handleLogs = (
    logs: LogT[],
    time: {
      startTime: number;
      endTime: number;
    }
  ) => {
    setLogs(logs);
    setTimeRange(time);
  };

  return (
    <div className="w-full app-bg min-h-full">
      <div className="flex flex-col h-full p-6 sm:px-10 sm:py-8 max-w-7xl mx-auto">
        <TimeFilter handleLogs={handleLogs} />
        {logs.length ? (
          <ContentBox className="mt-5">
            <LogOverallInfo
              totalUsers={totalUsers}
              totalApiCalls={apiCalls}
              totalFailures={failedCalls}
            />
            <Charts
              logs={logs}
              startTime={timeRange.startTime}
              endTime={timeRange.endTime}
            />
            <LogTable logs={logs} />
          </ContentBox>
        ) : null}
      </div>
    </div>
  );
}

export default App;
