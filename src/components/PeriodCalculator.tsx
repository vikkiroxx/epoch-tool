import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar, Copy } from "lucide-react";
import { toast } from "sonner";

export const PeriodCalculator = () => {
  const [period, setPeriod] = useState<"year" | "month" | "day">("month");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString().padStart(2, "0"));
  const [day, setDay] = useState(new Date().getDate().toString().padStart(2, "0"));
  const [timezone, setTimezone] = useState("local");
  const [result, setResult] = useState<{ start: number; end: number } | null>(null);

  const calculate = () => {
    try {
      let startDate: Date;
      let endDate: Date;

      const y = parseInt(year);
      const m = parseInt(month) - 1;
      const d = parseInt(day);

      if (period === "year") {
        startDate = new Date(y, 0, 1, 0, 0, 0);
        endDate = new Date(y, 11, 31, 23, 59, 59);
      } else if (period === "month") {
        startDate = new Date(y, m, 1, 0, 0, 0);
        const lastDay = new Date(y, m + 1, 0).getDate();
        endDate = new Date(y, m, lastDay, 23, 59, 59);
      } else {
        startDate = new Date(y, m, d, 0, 0, 0);
        endDate = new Date(y, m, d, 23, 59, 59);
      }

      let startTimestamp: number;
      let endTimestamp: number;

      if (timezone === "gmt") {
        startTimestamp = Math.floor(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 0, 0, 0) / 1000);
        endTimestamp = Math.floor(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), 23, 59, 59) / 1000);
      } else {
        startTimestamp = Math.floor(startDate.getTime() / 1000);
        endTimestamp = Math.floor(endDate.getTime() / 1000);
      }

      setResult({ start: startTimestamp, end: endTimestamp });
    } catch (error) {
      toast.error("Invalid date values");
    }
  };

  const copyTimestamp = (value: number) => {
    navigator.clipboard.writeText(value.toString());
    toast.success("Copied to clipboard!");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Epoch Dates for Start & End of Period
        </CardTitle>
        <CardDescription>
          Calculate Unix timestamps for the beginning and end of a year, month, or day
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="period">Period</Label>
          <Select value={period} onValueChange={(v) => setPeriod(v as "year" | "month" | "day")}>
            <SelectTrigger id="period">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="year">Year</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-2">
            <Label htmlFor="month-input">Month</Label>
            <Input
              id="month-input"
              type="number"
              min="1"
              max="12"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              disabled={period === "year"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="day-input">Day</Label>
            <Input
              id="day-input"
              type="number"
              min="1"
              max="31"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              disabled={period !== "day"}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="year-input">Year</Label>
            <Input
              id="year-input"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="period-timezone">Timezone</Label>
          <Select value={timezone} onValueChange={setTimezone}>
            <SelectTrigger id="period-timezone">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Local Time</SelectItem>
              <SelectItem value="gmt">GMT</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={calculate} className="w-full">
          Calculate
        </Button>

        {result && (
          <div className="space-y-3">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Label>Start of {period}</Label>
                <Button onClick={() => copyTimestamp(result.start)} variant="ghost" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="font-mono text-lg font-bold">{result.start}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(result.start * 1000).toString()}
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Label>End of {period}</Label>
                <Button onClick={() => copyTimestamp(result.end)} variant="ghost" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="font-mono text-lg font-bold">{result.end}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(result.end * 1000).toString()}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
