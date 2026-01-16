import { useState } from "react";
import { Plus, Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { toast } from "sonner";

interface PromoCode {
  id: string;
  code: string;
  usageCount: number;
  maxUses: number;
  expiresAt: string;
  isMultiUse: boolean;
  bonusAmount: number;
}

const mockPromoCodes: PromoCode[] = [
  { id: "1", code: "WELCOME2025", usageCount: 45, maxUses: 100, expiresAt: "2025-02-01", isMultiUse: true, bonusAmount: 20 },
  { id: "2", code: "SESSION2026", usageCount: 12, maxUses: 50, expiresAt: "2025-01-20", isMultiUse: true, bonusAmount: 30 },
  { id: "3", code: "VIP-ALEX-001", usageCount: 1, maxUses: 1, expiresAt: "2025-01-18", isMultiUse: false, bonusAmount: 100 },
  { id: "4", code: "STUDENT50", usageCount: 89, maxUses: 200, expiresAt: "2025-03-15", isMultiUse: true, bonusAmount: 50 },
];

export default function PromoCodes() {
  const [promoCodes, setPromoCodes] = useState(mockPromoCodes);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newCode, setNewCode] = useState({
    code: "",
    isMultiUse: true,
    maxUses: "50",
    expiresIn: "48",
    bonusAmount: "20",
  });

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  const handleDeleteCode = (id: string) => {
    setPromoCodes(promoCodes.filter((code) => code.id !== id));
    toast.success("Promo code deleted");
  };

  const handleCreateCode = () => {
    if (!newCode.code) {
      toast.error("Please enter a code name");
      return;
    }

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + parseInt(newCode.expiresIn));

    const newPromoCode: PromoCode = {
      id: Date.now().toString(),
      code: newCode.code.toUpperCase(),
      usageCount: 0,
      maxUses: parseInt(newCode.maxUses),
      expiresAt: expirationDate.toISOString().split("T")[0],
      isMultiUse: newCode.isMultiUse,
      bonusAmount: parseInt(newCode.bonusAmount),
    };

    setPromoCodes([newPromoCode, ...promoCodes]);
    setIsCreateOpen(false);
    setNewCode({ code: "", isMultiUse: true, maxUses: "50", expiresIn: "48", bonusAmount: "20" });
    toast.success("Promo code created", {
      description: `Code "${newPromoCode.code}" is now active`,
    });
  };

  const getExpirationStatus = (expiresAt: string) => {
    const expDate = new Date(expiresAt);
    const now = new Date();
    const daysLeft = Math.ceil((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) return "error";
    if (daysLeft <= 3) return "processing";
    return "operational";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Promo Codes</h1>
          <p className="text-sm text-muted-foreground">Create and manage promotional codes</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Code
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create Promo Code</DialogTitle>
              <DialogDescription>
                Generate a new promotional code for users
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="codeName">Code Name</Label>
                <Input
                  id="codeName"
                  placeholder="e.g., SUMMER2025"
                  value={newCode.code}
                  onChange={(e) => setNewCode({ ...newCode, code: e.target.value })}
                  className="font-mono uppercase"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bonusAmount">Bonus Amount</Label>
                <Input
                  id="bonusAmount"
                  type="number"
                  value={newCode.bonusAmount}
                  onChange={(e) => setNewCode({ ...newCode, bonusAmount: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="space-y-0.5">
                  <Label>Multi-use Code</Label>
                  <p className="text-xs text-muted-foreground">
                    {newCode.isMultiUse ? "Can be used by multiple users" : "Single use only"}
                  </p>
                </div>
                <Switch
                  checked={newCode.isMultiUse}
                  onCheckedChange={(checked) => setNewCode({ ...newCode, isMultiUse: checked })}
                />
              </div>

              {newCode.isMultiUse && (
                <div className="space-y-2">
                  <Label htmlFor="maxUses">Maximum Uses</Label>
                  <Input
                    id="maxUses"
                    type="number"
                    value={newCode.maxUses}
                    onChange={(e) => setNewCode({ ...newCode, maxUses: e.target.value })}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="expiresIn">Expires In (hours)</Label>
                <Input
                  id="expiresIn"
                  type="number"
                  value={newCode.expiresIn}
                  onChange={(e) => setNewCode({ ...newCode, expiresIn: e.target.value })}
                />
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateCode}>Create Code</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Codes</CardDescription>
            <CardTitle className="text-3xl">{promoCodes.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Redemptions</CardDescription>
            <CardTitle className="text-3xl">
              {promoCodes.reduce((acc, code) => acc + code.usageCount, 0)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Bonuses Distributed</CardDescription>
            <CardTitle className="text-3xl">
              {promoCodes.reduce((acc, code) => acc + code.usageCount * code.bonusAmount, 0).toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Codes Table */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Code</TableHead>
              <TableHead className="font-semibold">Type</TableHead>
              <TableHead className="font-semibold">Usage</TableHead>
              <TableHead className="font-semibold">Bonus</TableHead>
              <TableHead className="font-semibold">Expires</TableHead>
              <TableHead className="font-semibold text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promoCodes.map((promo) => (
              <TableRow key={promo.id} className="table-row-hover">
                <TableCell className="font-mono font-bold text-primary">
                  {promo.code}
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {promo.isMultiUse ? "Multi-use" : "One-time"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all"
                        style={{ width: `${(promo.usageCount / promo.maxUses) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono text-muted-foreground">
                      {promo.usageCount}/{promo.maxUses}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-accent">
                  +{promo.bonusAmount}
                </TableCell>
                <TableCell>
                  <StatusBadge
                    status={getExpirationStatus(promo.expiresAt) as any}
                    label={promo.expiresAt}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyCode(promo.code)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCode(promo.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
