"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, Database, Mail } from "lucide-react";

interface SettingsConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  settingKey: string;
  oldValue: any;
  newValue: any;
  isLoading?: boolean;
}

export default function SettingsConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  settingKey,
  oldValue,
  newValue,
  isLoading = false
}: SettingsConfirmationDialogProps) {
  const getCriticalSettingInfo = (key: string) => {
    const criticalSettings: Record<string, {
      title: string;
      description: string;
      warning: string;
      icon: any;
      severity: 'warning' | 'danger';
    }> = {
      maintenance_mode: {
        title: 'Enable Maintenance Mode',
        description: 'This will restrict access to the application for all users except administrators.',
        warning: 'Users will not be able to access the application while maintenance mode is active.',
        icon: Shield,
        severity: 'warning'
      },
      two_factor_auth: {
        title: 'Two-Factor Authentication',
        description: 'This will require all users to set up two-factor authentication on their next login.',
        warning: 'Users without 2FA setup will be prompted to configure it before accessing their accounts.',
        icon: Shield,
        severity: 'warning'
      },
      max_users: {
        title: 'Maximum Users Limit',
        description: 'This will change the maximum number of users that can register for the application.',
        warning: 'If set below current user count, new registrations will be blocked.',
        icon: Shield,
        severity: 'warning'
      },
      smtp_host: {
        title: 'SMTP Configuration',
        description: 'This will change the email server configuration.',
        warning: 'Email notifications may stop working if the configuration is incorrect.',
        icon: Mail,
        severity: 'danger'
      },
      backup_frequency: {
        title: 'Backup Frequency',
        description: 'This will change how often automatic backups are performed.',
        warning: 'Changing backup frequency may affect data recovery capabilities.',
        icon: Database,
        severity: 'warning'
      }
    };

    return criticalSettings[key] || {
      title: 'Confirm Setting Change',
      description: 'You are about to change a critical system setting.',
      warning: 'This change may affect system functionality.',
      icon: AlertTriangle,
      severity: 'warning' as const
    };
  };

  const settingInfo = getCriticalSettingInfo(settingKey);
  const Icon = settingInfo.icon;

  const formatValue = (value: any) => {
    if (typeof value === 'boolean') {
      return value ? 'Enabled' : 'Disabled';
    }
    return String(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-full ${
              settingInfo.severity === 'danger' 
                ? 'bg-red-100 text-red-600' 
                : 'bg-yellow-100 text-yellow-600'
            }`}>
              <Icon className="h-5 w-5" />
            </div>
            <DialogTitle>{settingInfo.title}</DialogTitle>
          </div>
          <DialogDescription className="text-left space-y-3">
            <p>{settingInfo.description}</p>
            
            <div className={`p-3 rounded-md border ${
              settingInfo.severity === 'danger'
                ? 'bg-red-50 border-red-200'
                : 'bg-yellow-50 border-yellow-200'
            }`}>
              <p className={`text-sm font-medium ${
                settingInfo.severity === 'danger' ? 'text-red-800' : 'text-yellow-800'
              }`}>
                ⚠️ {settingInfo.warning}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Current value:</span>
                <span className="text-muted-foreground">{formatValue(oldValue)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">New value:</span>
                <span className="font-medium text-primary">{formatValue(newValue)}</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            variant={settingInfo.severity === 'danger' ? 'destructive' : 'default'}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Applying..." : "Confirm Change"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}