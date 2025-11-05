"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const clients = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    company: "Acme Corp",
    plan: "Pro",
    status: "Active",
    lastActive: "2 hours ago",
    initials: "JD",
    avatarColor: "bg-blue-500"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@company.com",
    company: "Tech Solutions",
    plan: "Enterprise",
    status: "Active",
    lastActive: "1 day ago",
    initials: "JS",
    avatarColor: "bg-green-500"
  },
  {
    id: 3,
    name: "Mike Brown",
    email: "mike@startup.io",
    company: "Startup Inc",
    plan: "Basic",
    status: "Pending",
    lastActive: "3 days ago",
    initials: "MB",
    avatarColor: "bg-red-500"
  }
];

export default function ClientDashboard() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "Active":
                return "default";
            case "Pending":
                return "secondary";
            default:
                return "outline";
        }
    };

    const getPlanVariant = (plan: string) => {
        switch (plan) {
            case "Pro":
                return "default";
            case "Enterprise":
                return "secondary";
            case "Basic":
                return "outline";
            default:
                return "outline";
        }
    };

    return (
        <>
            <div className="min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Client Management</h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage all platform clients and their accounts</p>
                    </div>

                    <div className="grid gap-6 mb-8 md:grid-cols-4">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Clients</h3>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">1,247</p>
                            <span className="text-green-600 text-sm">+12% from last month</span>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Clients</h3>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">1,089</p>
                            <span className="text-green-600 text-sm">87% active rate</span>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">New This Month</h3>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">156</p>
                            <span className="text-blue-600 text-sm">+8% growth</span>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Revenue</h3>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">$89,432</p>
                            <span className="text-green-600 text-sm">+15% increase</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Client List</h2>
                                <div className="flex gap-3">
                                    <Input
                                        type="text"
                                        placeholder="Search clients..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-64"
                                    />
                                    <Button>Add Client</Button>
                                </div>
                            </div>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Plan</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Last Active</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredClients.map((client) => (
                                    <TableRow key={client.id}>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Avatar className="h-10 w-10">
                                                    <AvatarFallback className={`${client.avatarColor} text-white`}>
                                                        {client.initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium">{client.name}</div>
                                                    <div className="text-sm text-muted-foreground">{client.email}</div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{client.company}</TableCell>
                                        <TableCell>
                                            <Badge variant={getPlanVariant(client.plan)}>{client.plan}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusVariant(client.status)}>{client.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{client.lastActive}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm">Edit</Button>
                                                <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-900">
                                                    Suspend
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-muted-foreground">
                                    Showing {filteredClients.length} of 1,247 results
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Previous</Button>
                                    <Button size="sm">1</Button>
                                    <Button variant="outline" size="sm">2</Button>
                                    <Button variant="outline" size="sm">3</Button>
                                    <Button variant="outline" size="sm">Next</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
