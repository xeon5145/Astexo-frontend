"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  User,
  Mail,
  Calendar,
  Clock,
  Shield,
  ShieldOff,
  Edit,
  Save,
  X,
  MoreHorizontal,
  Activity,
  Settings
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

interface UserDetailModalProps {
  user: AdminUser | null;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdate: (userId: string, updates: Partial<AdminUser>) => void;
}

export default function UserDetailModal({ 
  user, 
  isOpen, 
  onClose, 
  onUserUpdate 
}: UserDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<AdminUser | null>(null);

  if (!user) return null;

  const handleEdit = () => {
    setEditedUser({ ...user });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedUser) {
      onUserUpdate(user.id, {
        name: editedUser.name,
        email: editedUser.email,
        role: editedUser.role,
        status: editedUser.status
      });
      setIsEditing(false);
      setEditedUser(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(null);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return 'Never';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive': return 'text-gray-600 bg-gray-50 border-gray-200';
      case 'suspended': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const currentUser = isEditing ? editedUser : user;
  if (!currentUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">
                  {isEditing ? 'Edit User' : 'User Details'}
                </DialogTitle>
                <DialogDescription>
                  {isEditing ? 'Modify user information and settings' : `View and manage ${currentUser.name}'s account`}
                </DialogDescription>
              </div>
            </div>
            {!isEditing && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit User
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Activity className="h-4 w-4 mr-2" />
                    View Activity
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Reset Password
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  {isEditing ? (
                    <Input
                      value={currentUser.name}
                      onChange={(e) => setEditedUser(prev => prev ? { ...prev, name: e.target.value } : null)}
                      className="mt-1"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-card-foreground">{currentUser.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={currentUser.email}
                      onChange={(e) => setEditedUser(prev => prev ? { ...prev, email: e.target.value } : null)}
                      className="mt-1"
                    />
                  ) : (
                    <div className="mt-1 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-card-foreground">{currentUser.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role</label>
                  {isEditing ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-start mt-1">
                          {currentUser.role === 'admin' ? <Shield className="h-4 w-4 mr-2" /> : <ShieldOff className="h-4 w-4 mr-2" />}
                          {currentUser.role}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setEditedUser(prev => prev ? { ...prev, role: 'user' } : null)}>
                          <ShieldOff className="h-4 w-4 mr-2" />
                          User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditedUser(prev => prev ? { ...prev, role: 'admin' } : null)}>
                          <Shield className="h-4 w-4 mr-2" />
                          Admin
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <div className="mt-1 flex items-center gap-2">
                      {currentUser.role === 'admin' ? <Shield className="h-4 w-4 text-blue-600" /> : <ShieldOff className="h-4 w-4 text-gray-600" />}
                      <span className="text-sm text-card-foreground capitalize">{currentUser.role}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  {isEditing ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-start mt-1">
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                            currentUser.status === 'active' ? 'bg-green-500' :
                            currentUser.status === 'inactive' ? 'bg-gray-500' : 'bg-red-500'
                          }`} />
                          {currentUser.status}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setEditedUser(prev => prev ? { ...prev, status: 'active' } : null)}>
                          <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2" />
                          Active
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditedUser(prev => prev ? { ...prev, status: 'inactive' } : null)}>
                          <span className="inline-block w-2 h-2 rounded-full bg-gray-500 mr-2" />
                          Inactive
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setEditedUser(prev => prev ? { ...prev, status: 'suspended' } : null)}>
                          <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2" />
                          Suspended
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <div className="mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(currentUser.status)}`}>
                        {currentUser.status}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                  <div className="mt-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-card-foreground">{formatDate(currentUser.createdAt)}</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Last Login</label>
                  <div className="mt-1 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-card-foreground">{formatDate(currentUser.lastLoginAt)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                  <span className="text-muted-foreground">Last login:</span>
                  <span className="text-card-foreground">{formatDate(currentUser.lastLoginAt)}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 bg-blue-500 rounded-full" />
                  <span className="text-muted-foreground">Account created:</span>
                  <span className="text-card-foreground">{formatDate(currentUser.createdAt)}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="h-2 w-2 bg-gray-500 rounded-full" />
                  <span className="text-muted-foreground">Profile updated:</span>
                  <span className="text-card-foreground">2 days ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}