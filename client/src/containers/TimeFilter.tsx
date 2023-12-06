import Button from '@/components/buttons/Button'
import CustomSelect from '@/components/inputs/CutomSelect'
import DatePicker from '@/components/inputs/DatePicker';
import Label from '@/components/inputs/Label';
import { LogStateT, LogT } from '@/types/logs';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';

type TimeFilterProps = {
  handleLogs: (logs: LogT[], time: {
    startTime: number;
    endTime: number;
}) => void
}

const options = [
    { label: "Last 24 hours", value: "24H" },
    { label: "Last 7 days", value: "7D" },
    { label: "Custom time range", value: "custom" },
  ];

const TimeFilter = ({ handleLogs }: TimeFilterProps) => {
  const [filterBy, setFilterBy] = useState('1D');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [logState, setLogState] = useState<LogStateT>({ status: 'init' })

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    setStartTime(new Date(e.target.value));
  };
  
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return;
    setEndTime(new Date(e.target.value));
  };

  const handleFilter = async () => {
    try {
      setLogState({ status: 'pending' });
      let startDateTime = startTime.getTime();
      let endDateTime = endTime.getTime();
      if (filterBy === '24H') {
        startDateTime = Date.now() - 24*60*60*1000;
        endDateTime = Date.now();
      } else if (filterBy === '7D') {
        startDateTime = Date.now() - 7 * 24*60*60*1000;
        endDateTime = Date.now();
      }
      const response = await axios.get<LogT[]>(`/api/logs?from=${startDateTime}&to=${endDateTime}`);
      const logs = response.data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      handleLogs(logs, { startTime: startDateTime, endTime: endDateTime });
      setLogState({ status: 'success' });
    } catch(err) {
      const error = err as AxiosError<{ message: string }>;
      let msg = error.message;
      if (error.response?.data?.message) msg = error.response?.data?.message;
      setLogState({ status: 'failed', msg });
    }
  }


  return (
    <div className="flex flex-wrap sm:items-center justify-between gap-10">
      <div className="flex flex-col sm:flex-row gap-6">
        <Label text="Time">
          <CustomSelect
            containerClass="w-[200px]"
            options={options}
            defaultOption={filterBy}
            onChange={(val) => setFilterBy(val)}
          />
        </Label>
        {filterBy === "custom" ? (
          <>
            <DatePicker
              onChange={handleStartDateChange}
              value={startTime.toISOString().split("T")[0]}
              label="From"
            />
            <DatePicker
              onChange={handleEndDateChange}
              value={endTime.toISOString().split("T")[0]}
              label="To"
            />
          </>
        ) : null}
      </div>
      <Button onClick={handleFilter}>Filter</Button>
    </div>
  );
}

export default TimeFilter