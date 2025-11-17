import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export const EpochDisplay = () => {
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentEpoch.toString());
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg border-0">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Clock className="w-8 h-8" />
        <h2 className="text-2xl font-bold">Current Unix Epoch Time</h2>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="text-5xl font-mono font-bold tracking-tight">
          {currentEpoch}
        </div>
        <Button
          onClick={copyToClipboard}
          variant="secondary"
          size="icon"
          className="h-12 w-12"
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        </Button>
      </div>
      <p className="text-center mt-4 text-sm opacity-90">
        Updates every second
      </p>
    </Card>
  );
};
