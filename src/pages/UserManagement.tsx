import { useState } from "react";
import { Search, Edit2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface User {
  id: string;
  username: string;
  joinDate: string;
  bonusBalance: number;
  totalSpent: number;
}

const mockUsers: User[] = [
  { id: "847291034", username: "@student_alex", joinDate: "2024-12-15", bonusBalance: 45, totalSpent: 2340 },
  { id: "293847561", username: "@maria_dev", joinDate: "2024-11-28", bonusBalance: 120, totalSpent: 5670 },
  { id: "182736450", username: "@ivan_123", joinDate: "2025-01-02", bonusBalance: 0, totalSpent: 890 },
  { id: "394857261", username: "@power_user", joinDate: "2024-10-05", bonusBalance: 340, totalSpent: 12450 },
  { id: "583746291", username: "@new_student", joinDate: "2025-01-14", bonusBalance: 10, totalSpent: 129 },
  { id: "673829104", username: "@edu_helper", joinDate: "2024-09-20", bonusBalance: 85, totalSpent: 7890 },
];

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [adjustmentAmount, setAdjustmentAmount] = useState("");
  const [adjustmentReason, setAdjustmentReason] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.includes(searchQuery)
  );

  const handleEditBalance = (user: User) => {
    setSelectedUser(user);
    setAdjustmentAmount("");
    setAdjustmentReason("");
    setIsModalOpen(true);
  };

  const handleUpdateBalance = () => {
    if (!selectedUser || !adjustmentAmount || !adjustmentReason) {
      toast.error("Please fill in all fields");
      return;
    }

    const amount = parseInt(adjustmentAmount);
    setUsers(users.map((user) =>
      user.id === selectedUser.id
        ? { ...user, bonusBalance: Math.max(0, user.bonusBalance + amount) }
        : user
    ));

    toast.success("Balance updated successfully", {
      description: `${selectedUser.username}'s balance adjusted by ${amount > 0 ? "+" : ""}${amount} bonuses`,
    });

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">User Management</h1>
        <p className="text-sm text-muted-foreground">Search and manage user accounts</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by Telegram ID or @username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">User ID</TableHead>
              <TableHead className="font-semibold">Username</TableHead>
              <TableHead className="font-semibold">Join Date</TableHead>
              <TableHead className="font-semibold text-right">Bonus Balance</TableHead>
              <TableHead className="font-semibold text-right">Total Spent</TableHead>
              <TableHead className="font-semibold text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="table-row-hover">
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {user.id}
                </TableCell>
                <TableCell className="font-mono font-medium">{user.username}</TableCell>
                <TableCell className="text-muted-foreground">{user.joinDate}</TableCell>
                <TableCell className="text-right">
                  <span className="font-mono font-medium text-accent">
                    {user.bonusBalance}
                  </span>
                </TableCell>
                <TableCell className="text-right font-mono">
                  {user.totalSpent.toLocaleString()} ₽
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditBalance(user)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No users found matching "{searchQuery}"
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Adjustment Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adjust Balance</DialogTitle>
            <DialogDescription>
              Modify bonus balance for {selectedUser?.username}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground">Current Balance</span>
              <span className="font-mono font-bold text-accent">
                {selectedUser?.bonusBalance} bonuses
              </span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Adjustment Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="e.g., +50 or -20"
                value={adjustmentAmount}
                onChange={(e) => setAdjustmentAmount(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Use positive numbers to add, negative to subtract
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Select value={adjustmentReason} onValueChange={setAdjustmentReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="refund">Refund</SelectItem>
                  <SelectItem value="gift">Gift</SelectItem>
                  <SelectItem value="correction">Correction</SelectItem>
                  <SelectItem value="promotion">Promotion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateBalance}>Update Balance</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
