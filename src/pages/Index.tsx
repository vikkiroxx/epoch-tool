import { Clock } from "lucide-react";
import { EpochDisplay } from "@/components/EpochDisplay";
import { TimestampToDate } from "@/components/TimestampToDate";
import { DateToTimestamp } from "@/components/DateToTimestamp";
import { PeriodCalculator } from "@/components/PeriodCalculator";
import { DurationConverter } from "@/components/DurationConverter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Clock className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Epoch Converter</h1>
              <p className="text-muted-foreground">Unix Timestamp Conversion Tools</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Current Epoch Display */}
        <EpochDisplay />

        {/* Info Section */}
        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <h2 className="text-xl font-semibold mb-3">What is Epoch Time?</h2>
          <p className="text-muted-foreground leading-relaxed">
            The <strong>Unix epoch</strong> (or Unix time or POSIX time) is the number of seconds that have elapsed 
            since January 1, 1970 (midnight UTC/GMT), not counting leap seconds. It's a widely used standard for 
            representing dates and times in computer systems.
          </p>
        </div>

        {/* Conversion Tools Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <TimestampToDate />
          <DateToTimestamp />
          <PeriodCalculator />
          <DurationConverter />
        </div>

        {/* Additional Info */}
        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Supported Formats</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Timestamp Formats</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>Seconds:</strong> 10 digits (e.g., 1763384855)</li>
                <li>• <strong>Milliseconds:</strong> 13 digits (e.g., 1763384855000)</li>
                <li>• <strong>Microseconds:</strong> 16 digits</li>
                <li>• <strong>Nanoseconds:</strong> 19 digits</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Date Formats</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• ISO 8601: YYYY-MM-DD</li>
                <li>• RFC 2822: Mon, 17 Nov 2025</li>
                <li>• Natural language: "today", "yesterday"</li>
                <li>• Custom formats: MM/DD/YYYY, DD-MM-YYYY</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>A modern epoch time conversion tool for developers</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
