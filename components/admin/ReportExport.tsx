"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Download,
  FileText,
  FileSpreadsheet,
  Image,
  Loader2,
  Calendar,
  BarChart3,
  Users,
  Activity,
  CheckCircle
} from "lucide-react";

interface ReportExportProps {
  dateRange: string;
  analyticsData: any;
}

type ExportFormat = 'pdf' | 'csv' | 'excel' | 'png';
type ReportType = 'summary' | 'detailed' | 'users' | 'traffic' | 'conversion';

export default function ReportExport({ dateRange, analyticsData }: ReportExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('pdf');
  const [selectedReportType, setSelectedReportType] = useState<ReportType>('summary');
  const [reportName, setReportName] = useState('');
  const [includeCharts, setIncludeCharts] = useState(true);

  const reportTypes = [
    {
      id: 'summary' as ReportType,
      name: 'Executive Summary',
      description: 'High-level overview of key metrics',
      icon: BarChart3
    },
    {
      id: 'detailed' as ReportType,
      name: 'Detailed Analytics',
      description: 'Comprehensive data analysis',
      icon: FileText
    },
    {
      id: 'users' as ReportType,
      name: 'User Analytics',
      description: 'User behavior and demographics',
      icon: Users
    },
    {
      id: 'traffic' as ReportType,
      name: 'Traffic Report',
      description: 'Page views and traffic sources',
      icon: Activity
    },
    {
      id: 'conversion' as ReportType,
      name: 'Conversion Report',
      description: 'Goal completions and funnels',
      icon: CheckCircle
    }
  ];

  const exportFormats = [
    { id: 'pdf' as ExportFormat, name: 'PDF Document', icon: FileText, extension: '.pdf' },
    { id: 'csv' as ExportFormat, name: 'CSV Data', icon: FileSpreadsheet, extension: '.csv' },
    { id: 'excel' as ExportFormat, name: 'Excel Workbook', icon: FileSpreadsheet, extension: '.xlsx' },
    { id: 'png' as ExportFormat, name: 'PNG Image', icon: Image, extension: '.png' }
  ];

  const generateReportName = (type: ReportType, format: ExportFormat) => {
    const date = new Date().toISOString().split('T')[0];
    const typeName = reportTypes.find(t => t.id === type)?.name.replace(/\s+/g, '_') || 'Report';
    return `${typeName}_${dateRange}_${date}${exportFormats.find(f => f.id === format)?.extension}`;
  };

  const simulateExport = async (format: ExportFormat, reportType: ReportType) => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const steps = [
      { progress: 20, message: 'Preparing data...' },
      { progress: 40, message: 'Generating charts...' },
      { progress: 60, message: 'Formatting report...' },
      { progress: 80, message: 'Creating file...' },
      { progress: 100, message: 'Download ready!' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setExportProgress(step.progress);
    }

    // Simulate file download
    const fileName = reportName || generateReportName(reportType, format);
    const blob = new Blob(['Mock report data'], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setIsExporting(false);
    setIsDialogOpen(false);
    setExportProgress(0);
  };

  const handleQuickExport = async (format: ExportFormat) => {
    await simulateExport(format, 'summary');
  };

  const handleCustomExport = async () => {
    await simulateExport(selectedFormat, selectedReportType);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Reports
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Export Options */}
        <div>
          <h4 className="text-sm font-medium text-card-foreground mb-3">Quick Export</h4>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickExport('pdf')}
              disabled={isExporting}
            >
              <FileText className="h-4 w-4 mr-2" />
              PDF Summary
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickExport('csv')}
              disabled={isExporting}
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              CSV Data
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickExport('excel')}
              disabled={isExporting}
            >
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Excel Report
            </Button>
          </div>
        </div>

        {/* Custom Export Dialog */}
        <div>
          <h4 className="text-sm font-medium text-card-foreground mb-3">Custom Export</h4>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" disabled={isExporting}>
                <Download className="h-4 w-4 mr-2" />
                Custom Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Generate Custom Report</DialogTitle>
                <DialogDescription>
                  Configure your report settings and export format
                </DialogDescription>
              </DialogHeader>

              {isExporting ? (
                <div className="py-8">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <div className="text-center">
                      <p className="text-sm font-medium">Generating Report...</p>
                      <p className="text-xs text-muted-foreground">
                        {exportProgress < 100 ? 'Please wait while we prepare your report' : 'Download starting...'}
                      </p>
                    </div>
                    <div className="w-full max-w-xs">
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${exportProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-center text-muted-foreground mt-1">
                        {exportProgress}%
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Report Type Selection */}
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Report Type</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {reportTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.id}
                            onClick={() => setSelectedReportType(type.id)}
                            className={`p-3 rounded-lg border text-left transition-all ${
                              selectedReportType === type.id
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <Icon className="h-5 w-5 text-primary mt-0.5" />
                              <div>
                                <p className="text-sm font-medium text-card-foreground">
                                  {type.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {type.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Export Format */}
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Export Format</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {exportFormats.map((format) => {
                        const Icon = format.icon;
                        return (
                          <button
                            key={format.id}
                            onClick={() => setSelectedFormat(format.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-all ${
                              selectedFormat === format.id
                                ? 'border-primary bg-primary/5 text-primary'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {format.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Report Name */}
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Report Name (Optional)</label>
                    <Input
                      placeholder={generateReportName(selectedReportType, selectedFormat)}
                      value={reportName}
                      onChange={(e) => setReportName(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Additional Options */}
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Options</label>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={includeCharts}
                          onChange={(e) => setIncludeCharts(e.target.checked)}
                          className="rounded border-border"
                        />
                        <span className="text-sm text-card-foreground">Include charts and visualizations</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter>
                {!isExporting && (
                  <>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCustomExport}>
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Recent Exports */}
        <div>
          <h4 className="text-sm font-medium text-card-foreground mb-3">Recent Exports</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-card-foreground">Executive_Summary_30d_2024-02-10.pdf</span>
              </div>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-card-foreground">User_Analytics_7d_2024-02-09.xlsx</span>
              </div>
              <span className="text-xs text-muted-foreground">1 day ago</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}