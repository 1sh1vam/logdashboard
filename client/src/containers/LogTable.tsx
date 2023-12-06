import { LogT } from '@/types/logs';

type LogKeys = keyof LogT;

const columns: { key: LogKeys; label: string }[] = [
  { key: "userId", label: "User ID" },
  { key: "createdAt", label: "Timestamp" },
  { key: "status", label: "Status" },
  { key: "errorMsg", label: "Error Message" },
  { key: "request", label: "Request" },
  { key: "response", label: "Response" },
];

type LogTableProps = {
  logs: LogT[];
}

const LogTable = ({ logs }: LogTableProps) => {
  return (
    <div className="w-full bg-neutral-dark px-5 mt-5 h-[300px] overflow-auto rounded-lg py-3">
      <table className="text-content-2 font-medium font-poppins w-full">
        <thead>
          <tr className="text-left text-xs">
            {columns.map((column) => (
              <th key={column.key} className="font-medium pb-5">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm">
          {logs.map((log, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.key} className="font-medium pb-5">
                  {column.key === 'request' || column.key === 'response' ? JSON.stringify(log[column.key]) : log[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LogTable;