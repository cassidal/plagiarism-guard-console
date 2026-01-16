import { useState, useEffect } from "react";
import { DollarSign, FileCheck, Users, Server } from "lucide-react";
import { KPICard } from "@/components/dashboard/KPICard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { ActivityChart } from "@/components/dashboard/ActivityChart";

const mockChartData = [
  { hour: "00:00", checks: 12 },
  { hour: "02:00", checks: 8 },
  { hour: "04:00", checks: 5 },
  { hour: "06:00", checks: 15 },
  { hour: "08:00", checks: 42 },
  { hour: "10:00", checks: 68 },
  { hour: "12:00", checks: 55 },
  { hour: "14:00", checks: 72 },
  { hour: "16:00", checks: 85 },
  { hour: "18:00", checks: 63 },
  { hour: "20:00", checks: 45 },
  { hour: "22:00", checks: 28 },
];

export default function PulseDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pulse</h1>
          <p className="text-sm text-muted-foreground">Real-time system overview</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">System Status:</span>
          <StatusBadge status="operational" label="All Systems Operational" />
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Revenue Today"
          value="9,540 ₽"
          trend={{ value: 12.5, label: "vs yesterday" }}
          icon={<DollarSign className="w-5 h-5" />}
          loading={loading}
        />
        <KPICard
          title="Checks Processed"
          value="83"
          trend={{ value: 8, label: "vs yesterday" }}
          icon={<FileCheck className="w-5 h-5" />}
          loading={loading}
        />
        <KPICard
          title="New Users"
          value="41"
          trend={{ value: -3, label: "vs yesterday" }}
          icon={<Users className="w-5 h-5" />}
          loading={loading}
        />
        <KPICard
          title="Queue Status"
          value="0"
          subtitle="items in queue"
          icon={<Server className="w-5 h-5" />}
          loading={loading}
        />
      </div>

      {/* Activity Chart */}
      <ActivityChart data={mockChartData} loading={loading} />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-lg border p-5">
          <h3 className="font-medium text-foreground mb-4">Recent Checks</h3>
          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-2 animate-pulse">
                  <div className="h-4 bg-muted rounded w-32" />
                  <div className="h-4 bg-muted rounded w-20" />
                </div>
              ))
            ) : (
              <>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="font-mono text-sm text-muted-foreground">@student_alex</span>
                  <StatusBadge status="completed" />
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="font-mono text-sm text-muted-foreground">@maria_dev</span>
                  <StatusBadge status="processing" />
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="font-mono text-sm text-muted-foreground">@ivan_123</span>
                  <StatusBadge status="completed" />
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-mono text-sm text-muted-foreground">@user_9841</span>
                  <StatusBadge status="error" />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-card rounded-lg border p-5">
          <h3 className="font-medium text-foreground mb-4">Top Referrers Today</h3>
          <div className="space-y-3">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-2 animate-pulse">
                  <div className="h-4 bg-muted rounded w-32" />
                  <div className="h-4 bg-muted rounded w-16" />
                </div>
              ))
            ) : (
              <>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="font-mono text-sm text-muted-foreground">@power_user</span>
                  <span className="text-sm font-medium text-accent">12 invites</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="font-mono text-sm text-muted-foreground">@marketing_pro</span>
                  <span className="text-sm font-medium text-accent">8 invites</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="font-mono text-sm text-muted-foreground">@student_leader</span>
                  <span className="text-sm font-medium text-accent">5 invites</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-mono text-sm text-muted-foreground">@edu_helper</span>
                  <span className="text-sm font-medium text-accent">3 invites</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
