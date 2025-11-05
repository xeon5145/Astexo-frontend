export default function InventoryDashboard() {
    return (
        <>
        <div className="grid gap-6 p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
                    Add New Item
                </button>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 border bg-background shadow-sm rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Items</h3>
                    <p className="text-2xl font-bold">1,234</p>
                </div>
                <div className="p-4 border bg-background shadow-sm rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Low Stock</h3>
                    <p className="text-2xl font-bold text-orange-600">23</p>
                </div>
                <div className="p-4 border bg-background shadow-sm rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Out of Stock</h3>
                    <p className="text-2xl font-bold text-red-600">5</p>
                </div>
                <div className="p-4 border bg-background shadow-sm rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Value</h3>
                    <p className="text-2xl font-bold">$45,678</p>
                </div>
            </div>

            <div className="border bg-background shadow-sm rounded-lg">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-semibold">Recent Inventory</h2>
                </div>
                <div className="p-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 border rounded-md hover:bg-accent hover:text-accent-foreground">
                            <div>
                                <p className="font-medium">Product Name</p>
                                <p className="text-sm text-muted-foreground">SKU: ABC123</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">Stock: 45</p>
                                <p className="text-sm text-muted-foreground">$29.99</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded-md hover:bg-accent hover:text-accent-foreground">
                            <div>
                                <p className="font-medium">Another Product</p>
                                <p className="text-sm text-muted-foreground">SKU: DEF456</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium text-orange-600">Stock: 8</p>
                                <p className="text-sm text-muted-foreground">$15.50</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}