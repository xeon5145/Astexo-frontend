export default function InvoiceDashbord() {
    return (
        <>
        <div className="grid gap-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Invoice Management</h1>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                    Create Invoice
                </button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 border bg-background shadow-sm rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Invoices</h3>
                    <p className="text-2xl font-bold">24</p>
                </div>
                <div className="p-4 border bg-background shadow-sm rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Paid</h3>
                    <p className="text-2xl font-bold text-green-600">18</p>
                </div>
                <div className="p-4 border bg-background shadow-sm rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Pending</h3>
                    <p className="text-2xl font-bold text-yellow-600">4</p>
                </div>
                <div className="p-4 border bg-background shadow-sm rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Overdue</h3>
                    <p className="text-2xl font-bold text-red-600">2</p>
                </div>
            </div>

            <div className="border bg-background shadow-sm rounded-lg">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">Recent Invoices</h2>
                </div>
                <div className="p-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-md hover:bg-accent hover:text-accent-foreground">
                            <div>
                                <p className="font-medium">Invoice #INV-001</p>
                                <p className="text-sm text-muted-foreground">Client: ABC Company</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">$1,250.00</p>
                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                    Paid
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-md hover:bg-accent hover:text-accent-foreground">
                            <div>
                                <p className="font-medium">Invoice #INV-002</p>
                                <p className="text-sm text-muted-foreground">Client: XYZ Corp</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">$850.00</p>
                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                    Pending
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-md hover:bg-accent hover:text-accent-foreground">
                            <div>
                                <p className="font-medium">Invoice #INV-003</p>
                                <p className="text-sm text-muted-foreground">Client: Tech Solutions</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">$2,100.00</p>
                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                                    Overdue
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}