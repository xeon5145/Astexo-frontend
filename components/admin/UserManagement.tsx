"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserDetailModal from "./UserDetailModal";
import ConfirmationDialog from "./ConfirmationDialog";
import {
  Search,
  Filter,
  MoreHorizontal,
  UserPlus,
  Download,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Shield,
  ShieldOff,
  Mail,
  Calendar,
  Clock
} from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  lastLoginAt: Date | null;
}

type FilterStatus = 'all' | 'active' | 'inactive' | 'suspended';
type FilterRole = 'all' | 'admin' | 'user';

export default function UserManagement() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [roleFilter, setRoleFilter] = useState<FilterRole>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    action: () => void;
    variant?: 'default' | 'destructive' | 'warning';
  }>({
    isOpen: false,
    title: '',
    description: '',
    action: () => {},
    variant: 'default'
  });

  const usersPerPage = 10;

  // Mock user data
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockUsers: AdminUser[] = [
        {
          id: '1',
          email: 'john.doe@example.com',
          name: 'John Doe',
          role: 'admin',
          status: 'active',
          createdAt: new Date('2024-01-15'),
          lastLoginAt: new Date('2024-02-10T10:30:00')
        },
        {
          id: '2',
          email: 'sarah.smith@example.com',
          name: 'Sarah Smith',
          role: 'user',
          status: 'active',
          createdAt: new Date('2024-01-20'),
          lastLoginAt: new Date('2024-02-09T14:22:00')
        },
        {
          id: '3',
          email: 'mike.johnson@example.com',
          name: 'Mike Johnson',
          role: 'user',
          status: 'inactive',
          createdAt: new Date('2024-02-01'),
          lastLoginAt: new Date('2024-02-05T09:15:00')
        },
        {
          id: '4',
          email: 'emily.davis@example.com',
          name: 'Emily Davis',
          role: 'user',
          status: 'suspended',
          createdAt: new Date('2024-01-10'),
          lastLoginAt: null
        },
        {
          id: '5',
          email: 'alex.wilson@example.com',
          name: 'Alex Wilson',
          role: 'admin',
          status: 'active',
          createdAt: new Date('2024-01-05'),
          lastLoginAt: new Date('2024-02-10T16:45:00')
        }
      ];
      
      setUsers(mockUsers);
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  // Filter and search users
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      
      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, searchQuery, statusFilter, roleFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleUserAction = (userId: string, action: string) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;

    switch (action) {
      case 'view':
        setSelectedUser(user);
        setIsDetailModalOpen(true);
        break;
      
      case 'edit':
        setSelectedUser(user);
        setIsDetailModalOpen(true);
        break;
      
      case 'activate':
        setConfirmationDialog({
          isOpen: true,
          title: 'Activate User',
          description: `Are you sure you want to activate ${user.name}? They will regain access to their account.`,
          action: () => handleUserUpdate(userId, { status: 'active' }),
          variant: 'default'
        });
        break;
      
      case 'deactivate':
        setConfirmationDialog({
          isOpen: true,
          title: 'Deactivate User',
          description: `Are you sure you want to deactivate ${user.name}? They will lose access to their account.`,
          action: () => handleUserUpdate(userId, { status: 'inactive' }),
          variant: 'warning'
        });
        break;
      
      case 'delete':
        setConfirmationDialog({
          isOpen: true,
          title: 'Delete User',
          description: `Are you sure you want to permanently delete ${user.name}? This action cannot be undone.`,
          action: () => handleDeleteUser(userId),
          variant: 'destructive'
        });
        break;
    }
  };

  const handleUserUpdate = (userId: string, updates: Partial<AdminUser>) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, ...updates } : user
      )
    );
    setConfirmationDialog(prev => ({ ...prev, isOpen: false }));
    
    // Update selected user if it's currently being viewed
    if (selectedUser?.id === userId) {
      setSelectedUser(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    setConfirmationDialog(prev => ({ ...prev, isOpen: false }));
    
    // Close detail modal if deleted user was being viewed
    if (selectedUser?.id === userId) {
      setIsDetailModalOpen(false);
      setSelectedUser(null);
    }
  };

  const closeConfirmationDialog = () => {
    setConfirmationDialog(prev => ({ ...prev, isOpen: false }));
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800 border-green-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200',
      suspended: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
        {status}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
        role === 'admin' 
          ? 'bg-blue-100 text-blue-800 border border-blue-200' 
          : 'bg-gray-100 text-gray-800 border border-gray-200'
      }`}>
        {role === 'admin' ? <Shield className="h-3 w-3" /> : <ShieldOff className="h-3 w-3" />}
        {role}
      </span>
    );
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Never';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">User Management</h3>
          <p className="text-sm text-muted-foreground">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Status: {statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('active')}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('inactive')}>
                    Inactive
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('suspended')}>
                    Suspended
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Role: {roleFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setRoleFilter('all')}>
                    All Roles
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter('admin')}>
                    Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRoleFilter('user')}>
                    User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Users ({filteredUsers.length})</span>
            {selectedUsers.length > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                {selectedUsers.length} selected
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="h-10 w-10 bg-muted animate-pulse rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
                    <div className="h-3 w-1/2 bg-muted animate-pulse rounded" />
                  </div>
                  <div className="h-6 w-16 bg-muted animate-pulse rounded" />
                  <div className="h-6 w-12 bg-muted animate-pulse rounded" />
                </div>
              ))}
            </div>
          ) : paginatedUsers.length > 0 ? (
            <div className="space-y-2">
              {paginatedUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-card-foreground truncate">{user.name}</p>
                        {getRoleBadge(user.role)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Joined {formatDate(user.createdAt).split(',')[0]}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Last login: {formatDate(user.lastLoginAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getStatusBadge(user.status)}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleUserAction(user.id, 'view')}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUserAction(user.id, 'edit')}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === 'active' ? (
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, 'deactivate')}>
                            <ShieldOff className="h-4 w-4 mr-2" />
                            Deactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, 'activate')}>
                            <Shield className="h-4 w-4 mr-2" />
                            Activate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          variant="destructive"
                          onClick={() => handleUserAction(user.id, 'delete')}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No users found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * usersPerPage) + 1} to {Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Detail Modal */}
      <UserDetailModal
        user={selectedUser}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedUser(null);
        }}
        onUserUpdate={handleUserUpdate}
      />

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        onClose={closeConfirmationDialog}
        onConfirm={confirmationDialog.action}
        title={confirmationDialog.title}
        description={confirmationDialog.description}
        variant={confirmationDialog.variant}
        confirmText={
          confirmationDialog.variant === 'destructive' ? 'Delete' :
          confirmationDialog.variant === 'warning' ? 'Deactivate' : 'Confirm'
        }
      />
    </div>
  );
}