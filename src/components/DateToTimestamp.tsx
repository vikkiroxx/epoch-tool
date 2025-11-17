import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Copy, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export const DateToTimestamp = () => {
  const [dateInput, setDateInput] = useState("");
  const [timezone, setTimezone] = useState("local");
  const [result, setResult] = useState("");

  const convertToTimestamp = () => {
    if (!dateInput) {
      toast.error("Please enter a date");
      return;
    }

    try {
      let date: Date;
      
      if (timezone === "gmt") {
        // Parse as GMT
        date = new Date(dateInput + " GMT");
      } else {
        // Parse as local time
        date = new Date(dateInput);
      }

      if (isNaN(date.getTime())) {
        toast.error("Invalid date format");
        return;
      }

      const timestamp = Math.floor(date.getTime() / 1000);
      setResult(timestamp.toString());
    } catch (error) {
      toast.error("Invalid date format");
    }
  };

  const reset = () => {
    setDateInput("");
    setResult("");
    setTimezone("local");
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast.success("Copied to clipboard!");
    }
  };

  const setCurrentDate = () => {
    const now = new Date();
    const formatted = now.toISOString().slice(0, 16);
    setDateInput(formatted);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Human Date to Timestamp</CardTitle>
        <CardDescription>
          Input format: YYYY-MM-DD, MM/DD/YYYY, or natural language dates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="date-input">Human Readable Date</Label>
          <div className="flex gap-2">
            <Input
              id="date-input"
              type="text"
              placeholder="Mon, 17 Nov 2025 13:07:33 GMT"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && convertToTimestamp()}
              className="flex-1"
            />
            <Button onClick={setCurrentDate} variant="outline" size="sm">
              Now
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date-timezone">Timezone</Label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger id="date-timezone">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Local Time</SelectItem>
              <SelectItem value="gmt">GMT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button onClick={convertToTimestamp} className="flex-1">
            <ArrowRight className="w-4 h-4 mr-2" />
            Convert
          </Button>
          <Button onClick={reset} variant="outline" size="icon">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {result && (
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <Label>Unix Timestamp</Label>
              <Button onClick={copyResult} variant="ghost" size="sm">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <p className="font-mono text-2xl font-bold">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
