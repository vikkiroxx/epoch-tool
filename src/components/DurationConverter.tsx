import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Timer, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const DurationConverter = () => {
  const [seconds, setSeconds] = useState("");
  const [result, setResult] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  const convert = () => {
    if (!seconds) {
      toast.error("Please enter seconds");
      return;
    }

    try {
      const totalSeconds = parseInt(seconds);
      
      if (isNaN(totalSeconds) || totalSeconds < 0) {
        toast.error("Please enter a valid positive number");
        return;
      }

      const days = Math.floor(totalSeconds / (24 * 3600));
      const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const secs = totalSeconds % 60;

      setResult({ days, hours, minutes, seconds: secs });
    } catch (error) {
      toast.error("Invalid input");
    }
  };

  const reset = () => {
    setSeconds("");
    setResult(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Timer className="w-5 h-5" />
          Convert Seconds to Duration
        </CardTitle>
        <CardDescription>
          Convert seconds to days, hours, minutes, and seconds
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="seconds-input">Seconds</Label>
          <Input
            id="seconds-input"
            type="number"
            placeholder="86400"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && convert()}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={convert} className="flex-1">
            Convert
          </Button>
          <Button onClick={reset} variant="outline" size="icon">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {result && (
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">{result.days}</p>
              <p className="text-sm text-muted-foreground mt-1">Days</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">{result.hours}</p>
              <p className="text-sm text-muted-foreground mt-1">Hours</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">{result.minutes}</p>
              <p className="text-sm text-muted-foreground mt-1">Minutes</p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">{result.seconds}</p>
              <p className="text-sm text-muted-foreground mt-1">Seconds</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
