"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAdminDashboard } from "./AdminDashboardContext";
import { 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  X 
} from "lucide-react";

export default function AdminNotifications() {
  const { notifications, removeNotification } = useAdminDashboard();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info':
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getNotificationStyles = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'info':
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <Card 
          key={notification.id}
          className={`p-4 shadow-lg animate-in slide-in-from-right-full duration-300 ${getNotificationStyles(notification.type)}`}
        >
          <div className="flex items-start gap-3">
            {getNotificationIcon(notification.type)}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-card-foreground">
                {notification.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {notification.message}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {notification.timestamp.toLocaleTimeString()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 shrink-0"
              onClick={() => removeNotification(notification.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}