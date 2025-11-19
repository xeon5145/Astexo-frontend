"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Package, FileText, ArrowUpRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

// --- MOCK DATA ---
const mockStats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    title: "Active Clients",
    value: "2,350",
    change: "+180.1% from last month",
    icon: Users,
  },
  {
    title: "Inventory Items",
    value: "12,234",
    change: "+19% from last month",
    icon: Package,
  },
  {
    title: "Invoices Issued",
    value: "573",
    change: "+5% from last month",
    icon: FileText,
  },
];

const mockRecentInvoices = [
  {
    invoiceId: "INV001",
    client: "Tech Innovations",
    amount: "$2,500.00",
    status: "Paid",
    date: "2024-10-25",
  },
  {
    invoiceId: "INV002",
    client: "Global Solutions",
    amount: "$1,200.00",
    status: "Pending",
    date: "2024-10-24",
  },
  {
    invoiceId: "INV003",
    client: "Creative Minds",
    amount: "$800.00",
    status: "Paid",
    date: "2024-10-23",
  },
  {
    invoiceId: "INV004",
    client: "Future Corp",
    amount: "$5,100.00",
    status: "Overdue",
    date: "2024-10-22",
  },
  {
    invoiceId: "INV005",
    client: "Alpha Systems",
    amount: "$350.00",
    status: "Paid",
    date: "2024-10-21",
  },
];

export default function AdminDashboard() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download Report</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Area (Recent Invoices) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRecentInvoices.map((invoice) => (
                  <TableRow key={invoice.invoiceId}>
                    <TableCell className="font-medium">{invoice.invoiceId}</TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell className="text-right">{invoice.amount}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        invoice.status === "Paid" ? "bg-green-100 text-green-800" :
                        invoice.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {invoice.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-4 text-right">
              <Link href="/admin/invoice-management" passHref>
                <Button variant="link" className="text-sm">
                  View All Invoices <ArrowUpRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links / Recent Activity Card */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/admin/clients/new" passHref>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" /> Add New Client
              </Button>
            </Link>
            <Link href="/admin/inventory-management/new" passHref>
              <Button className="w-full justify-start" variant="outline">
                <Package className="mr-2 h-4 w-4" /> Add New Product
              </Button>
            </Link>
            <Link href="/admin/invoice-management/new" passHref>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" /> Create New Invoice
              </Button>
            </Link>
            <Link href="/admin/settings" passHref>
              <Button className="w-full justify-start" variant="outline">
                <Loader2 className="mr-2 h-4 w-4" /> System Settings
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
