import { useState } from "react";
import { Filter, RefreshCw, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { cn } from "@/lib/utils";

interface LogEntry {
  id: string;
  timestamp: string;
  userId: string;
  username: string;
  status: "processing" | "completed" | "error";
  message: string;
  duration?: number;
}

const mockLogs: LogEntry[] = [
  { id: "log-001", timestamp: "2025-01-16 14:32:15", userId: "847291034", username: "@student_alex", status: "completed", message: "Check completed successfully", duration: 2340 },
  { id: "log-002", timestamp: "2025-01-16 14:31:58", userId: "293847561", username: "@maria_dev", status: "processing", message: "Analyzing document...", duration: undefined },
  { id: "log-003", timestamp: "2025-01-16 14:31:42", userId: "182736450", username: "@ivan_123", status: "completed", message: "Check completed successfully", duration: 1890 },
  { id: "log-004", timestamp: "2025-01-16 14:31:21", userId: "394857261", username: "@power_user", status: "error", message: "Document parsing failed: Invalid format", duration: undefined },
  { id: "log-005", timestamp: "2025-01-16 14:30:55", userId: "583746291", username: "@new_student", status: "completed", message: "Check completed successfully", duration: 3120 },
  { id: "log-006", timestamp: "2025-01-16 14:30:12", userId: "673829104", username: "@edu_helper", status: "completed", message: "Check completed successfully", duration: 2450 },
  { id: "log-007", timestamp: "2025-01-16 14:29:48", userId: "847291034", username: "@student_alex", status: "error", message: "Rate limit exceeded", duration: undefined },
  { id: "log-008", timestamp: "2025-01-16 14:29:15", userId: "293847561", username: "@maria_dev", status: "completed", message: "Check completed successfully", duration: 1980 },
];

export default function LogsQueue() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [logs, setLogs] = useState(mockLogs);

  const filteredLogs = statusFilter === "all"
    ? logs
    : logs.filter((log) => log.status === statusFilter);

  const handleRefresh = () => {
    // Simulate refresh
    setLogs([...mockLogs]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-success";
      case "processing":
        return "text-warning";
      case "error":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Logs & Queue</h1>
          <p className="text-sm text-muted-foreground">Monitor check processing in real-time</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="error">Errors</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground mb-1">Total Logs</div>
          <div className="text-2xl font-bold">{logs.length}</div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground mb-1">Completed</div>
          <div className="text-2xl font-bold text-success">
            {logs.filter((l) => l.status === "completed").length}
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground mb-1">Processing</div>
          <div className="text-2xl font-bold text-warning">
            {logs.filter((l) => l.status === "processing").length}
          </div>
        </div>
        <div className="bg-card rounded-lg border p-4">
          <div className="text-sm text-muted-foreground mb-1">Errors</div>
          <div className="text-2xl font-bold text-destructive">
            {logs.filter((l) => l.status === "error").length}
          </div>
        </div>
      </div>

      {/* Terminal View */}
      <div className="bg-terminal-bg rounded-lg overflow-hidden border border-border">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border/20 bg-black/20">
          <Terminal className="w-4 h-4 text-terminal-text" />
          <span className="text-sm font-mono text-terminal-text">system.logs</span>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-destructive" />
            <div className="w-3 h-3 rounded-full bg-warning" />
            <div className="w-3 h-3 rounded-full bg-success" />
          </div>
        </div>

        <div className="p-4 space-y-2 max-h-[500px] overflow-auto font-mono text-sm">
          {filteredLogs.map((log, index) => (
            <div
              key={log.id}
              className={cn(
                "flex items-start gap-4 py-2 px-3 rounded transition-colors hover:bg-white/5",
                index !== filteredLogs.length - 1 && "border-b border-white/5"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <span className="text-muted-foreground/70 flex-shrink-0">
                {log.timestamp}
              </span>
              <StatusBadge status={log.status} className="flex-shrink-0" />
              <span className="text-terminal-text flex-shrink-0">
                {log.username}
              </span>
              <span className={cn("flex-1", getStatusColor(log.status))}>
                {log.message}
              </span>
              {log.duration && (
                <span className="text-muted-foreground/70 flex-shrink-0">
                  {log.duration}ms
                </span>
              )}
            </div>
          ))}

          {filteredLogs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No logs matching filter
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          Export Logs
        </Button>
        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
          Clear Error Logs
        </Button>
      </div>
    </div>
  );
}
