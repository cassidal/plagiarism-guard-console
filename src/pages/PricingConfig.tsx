import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function PricingConfig() {
  const [pricingMode, setPricingMode] = useState<"fixed" | "per-unit">("fixed");
  const [basePrice, setBasePrice] = useState("129");
  const [pricePerUnit, setPricePerUnit] = useState("0.15");
  const [maxBonusUsage, setMaxBonusUsage] = useState([15]);
  const [inviterReward, setInviterReward] = useState("30");
  const [inviteeReward, setInviteeReward] = useState("10");
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = () => {
    setHasChanges(true);
  };

  const handleSave = () => {
    toast.success("Configuration saved successfully", {
      description: "Pricing changes are now active.",
    });
    setHasChanges(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pricing & Configuration</h1>
        <p className="text-sm text-muted-foreground">Manage pricing strategy and referral rewards</p>
      </div>

      {/* Pricing Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pricing Strategy</CardTitle>
          <CardDescription>Choose between fixed price or per-unit pricing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Pricing Mode</Label>
              <p className="text-sm text-muted-foreground">
                {pricingMode === "fixed" ? "Fixed price per check" : "Price per 1000 symbols/page"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={pricingMode === "fixed" ? "text-foreground font-medium" : "text-muted-foreground"}>
                Fixed
              </span>
              <Switch
                checked={pricingMode === "per-unit"}
                onCheckedChange={(checked) => {
                  setPricingMode(checked ? "per-unit" : "fixed");
                  handleChange();
                }}
              />
              <span className={pricingMode === "per-unit" ? "text-foreground font-medium" : "text-muted-foreground"}>
                Per Unit
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pricingMode === "fixed" ? (
              <div className="space-y-2">
                <Label htmlFor="basePrice">Base Cost of Check</Label>
                <div className="relative">
                  <Input
                    id="basePrice"
                    type="number"
                    value={basePrice}
                    onChange={(e) => {
                      setBasePrice(e.target.value);
                      handleChange();
                    }}
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">₽</span>
                </div>
                <p className="text-xs text-muted-foreground">Standard price for a single plagiarism check</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="pricePerUnit">Price per 1000 Symbols</Label>
                <div className="relative">
                  <Input
                    id="pricePerUnit"
                    type="number"
                    step="0.01"
                    value={pricePerUnit}
                    onChange={(e) => {
                      setPricePerUnit(e.target.value);
                      handleChange();
                    }}
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">₽</span>
                </div>
                <p className="text-xs text-muted-foreground">Price charged per 1000 symbols of text</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Bonus Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bonus Settings</CardTitle>
          <CardDescription>Configure how bonuses can be used for payments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Max Bonus Usage Limit</Label>
              <span className="text-sm font-mono font-medium text-primary">{maxBonusUsage[0]}%</span>
            </div>
            <Slider
              value={maxBonusUsage}
              onValueChange={(value) => {
                setMaxBonusUsage(value);
                handleChange();
              }}
              max={30}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Maximum percentage of check cost that can be paid with bonuses
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Referral Rewards */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Referral Rewards</CardTitle>
          <CardDescription>Set bonus rewards for referral program</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="inviterReward">Inviter Reward</Label>
              <div className="relative">
                <Input
                  id="inviterReward"
                  type="number"
                  value={inviterReward}
                  onChange={(e) => {
                    setInviterReward(e.target.value);
                    handleChange();
                  }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">bonuses</span>
              </div>
              <p className="text-xs text-muted-foreground">Bonuses given to the user who sends invite</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inviteeReward">New User Reward</Label>
              <div className="relative">
                <Input
                  id="inviteeReward"
                  type="number"
                  value={inviteeReward}
                  onChange={(e) => {
                    setInviteeReward(e.target.value);
                    handleChange();
                  }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">bonuses</span>
              </div>
              <p className="text-xs text-muted-foreground">Bonuses given to newly invited user</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Floating Save Button */}
      {hasChanges && (
        <div className="floating-save animate-fade-in">
          <Button onClick={handleSave} size="lg" className="gap-2">
            <Save className="w-4 h-4" />
            Save Configuration
          </Button>
        </div>
      )}
    </div>
  );
}
