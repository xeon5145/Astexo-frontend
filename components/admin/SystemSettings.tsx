"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SettingsConfirmationDialog from "./SettingsConfirmationDialog";
import { 
  Settings, 
  Save, 
  RefreshCw, 
  Shield, 
  Palette, 
  Mail, 
  Database,
  Globe,
  Bell,
  Users,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  History
} from "lucide-react";

interface SystemSetting {
  key: string;
  value: string | number | boolean;
  category: string;
  description: string;
  type: 'text' | 'number' | 'boolean' | 'select';
  options?: string[];
  validation?: {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: string;
  };
}

type SettingsCategory = 'general' | 'security' | 'appearance' | 'notifications' | 'email' | 'database';

export default function SystemSettings() {
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SettingsCategory>('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [originalSettings, setOriginalSettings] = useState<SystemSetting[]>([]);
  const [pendingChange, setPendingChange] = useState<{
    key: string;
    oldValue: any;
    newValue: any;
  } | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [changeHistory, setChangeHistory] = useState<Array<{
    key: string;
    oldValue: any;
    newValue: any;
    timestamp: Date;
    category: string;
  }>>([]);

  const categories = [
    { id: 'general' as SettingsCategory, name: 'General', icon: Settings, description: 'Basic application settings' },
    { id: 'security' as SettingsCategory, name: 'Security', icon: Shield, description: 'Security and authentication settings' },
    { id: 'appearance' as SettingsCategory, name: 'Appearance', icon: Palette, description: 'UI and theme settings' },
    { id: 'notifications' as SettingsCategory, name: 'Notifications', icon: Bell, description: 'Notification preferences' },
    { id: 'email' as SettingsCategory, name: 'Email', icon: Mail, description: 'Email configuration' },
    { id: 'database' as SettingsCategory, name: 'Database', icon: Database, description: 'Database and storage settings' }
  ];

  // Mock settings data
  const mockSettings: SystemSetting[] = [
    // General Settings
    { key: 'app_name', value: 'Astexo', category: 'general', description: 'Application name displayed to users', type: 'text', validation: { required: true } },
    { key: 'app_description', value: 'Your comprehensive application platform', category: 'general', description: 'Brief description of the application', type: 'text' },
    { key: 'maintenance_mode', value: false, category: 'general', description: 'Enable maintenance mode to restrict access', type: 'boolean' },
    { key: 'max_users', value: 1000, category: 'general', description: 'Maximum number of registered users', type: 'number', validation: { min: 1, max: 10000 } },
    
    // Security Settings
    { key: 'password_min_length', value: 8, category: 'security', description: 'Minimum password length requirement', type: 'number', validation: { min: 6, max: 32 } },
    { key: 'session_timeout', value: 30, category: 'security', description: 'Session timeout in minutes', type: 'number', validation: { min: 5, max: 1440 } },
    { key: 'two_factor_auth', value: false, category: 'security', description: 'Require two-factor authentication', type: 'boolean' },
    { key: 'login_attempts', value: 5, category: 'security', description: 'Maximum login attempts before lockout', type: 'number', validation: { min: 3, max: 10 } },
    
    // Appearance Settings
    { key: 'default_theme', value: 'system', category: 'appearance', description: 'Default theme for new users', type: 'select', options: ['light', 'dark', 'system'] },
    { key: 'brand_color', value: '#3b82f6', category: 'appearance', description: 'Primary brand color', type: 'text' },
    { key: 'show_branding', value: true, category: 'appearance', description: 'Display application branding', type: 'boolean' },
    
    // Notification Settings
    { key: 'email_notifications', value: true, category: 'notifications', description: 'Enable email notifications', type: 'boolean' },
    { key: 'push_notifications', value: false, category: 'notifications', description: 'Enable push notifications', type: 'boolean' },
    { key: 'notification_frequency', value: 'daily', category: 'notifications', description: 'Notification frequency', type: 'select', options: ['immediate', 'hourly', 'daily', 'weekly'] },
    
    // Email Settings
    { key: 'smtp_host', value: 'smtp.example.com', category: 'email', description: 'SMTP server hostname', type: 'text', validation: { required: true } },
    { key: 'smtp_port', value: 587, category: 'email', description: 'SMTP server port', type: 'number', validation: { min: 1, max: 65535 } },
    { key: 'smtp_username', value: 'noreply@astexo.com', category: 'email', description: 'SMTP username', type: 'text' },
    { key: 'from_email', value: 'noreply@astexo.com', category: 'email', description: 'Default from email address', type: 'text', validation: { required: true } },
    
    // Database Settings
    { key: 'backup_frequency', value: 'daily', category: 'database', description: 'Automatic backup frequency', type: 'select', options: ['hourly', 'daily', 'weekly', 'monthly'] },
    { key: 'max_connections', value: 100, category: 'database', description: 'Maximum database connections', type: 'number', validation: { min: 10, max: 1000 } },
    { key: 'query_timeout', value: 30, category: 'database', description: 'Query timeout in seconds', type: 'number', validation: { min: 5, max: 300 } }
  ];

  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Load from localStorage if available
      const savedSettings = localStorage.getItem('admin_settings');
      const savedHistory = localStorage.getItem('admin_settings_history');
      
      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setSettings(parsed);
          setOriginalSettings(parsed);
        } catch (error) {
          console.error('Failed to load saved settings:', error);
          setSettings(mockSettings);
          setOriginalSettings(mockSettings);
        }
      } else {
        setSettings(mockSettings);
        setOriginalSettings(mockSettings);
      }

      if (savedHistory) {
        try {
          const parsedHistory = JSON.parse(savedHistory);
          setChangeHistory(parsedHistory.map((item: any) => ({
            ...item,
            timestamp: new Date(item.timestamp)
          })));
        } catch (error) {
          console.error('Failed to load settings history:', error);
        }
      }
      
      setIsLoading(false);
    };

    loadSettings();
  }, []);

  const filteredSettings = settings.filter(setting => setting.category === activeCategory);

  const validateSetting = (setting: SystemSetting, value: any): string | null => {
    if (setting.validation?.required && (!value || value === '')) {
      return 'This field is required';
    }

    if (setting.type === 'number') {
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return 'Must be a valid number';
      }
      if (setting.validation?.min !== undefined && numValue < setting.validation.min) {
        return `Must be at least ${setting.validation.min}`;
      }
      if (setting.validation?.max !== undefined && numValue > setting.validation.max) {
        return `Must be at most ${setting.validation.max}`;
      }
    }

    if (setting.type === 'text' && setting.validation?.pattern) {
      const regex = new RegExp(setting.validation.pattern);
      if (!regex.test(String(value))) {
        return 'Invalid format';
      }
    }

    return null;
  };

  // Critical settings that require confirmation
  const criticalSettings = [
    'maintenance_mode', 
    'two_factor_auth', 
    'max_users', 
    'smtp_host', 
    'backup_frequency',
    'session_timeout',
    'password_min_length'
  ];

  const handleSettingChange = (key: string, value: any) => {
    const setting = settings.find(s => s.key === key);
    if (!setting) return;

    // Validate the new value
    const error = validateSetting(setting, value);
    setErrors(prev => ({
      ...prev,
      [key]: error || ''
    }));

    if (error) return;

    // Check if this is a critical setting that requires confirmation
    if (criticalSettings.includes(key) && setting.value !== value) {
      setPendingChange({
        key,
        oldValue: setting.value,
        newValue: value
      });
      setShowConfirmation(true);
      return;
    }

    // Apply the change immediately for non-critical settings
    applySettingChange(key, value);
  };

  const applySettingChange = (key: string, value: any) => {
    const setting = settings.find(s => s.key === key);
    if (!setting) return;

    // Add to change history
    setChangeHistory(prev => [{
      key,
      oldValue: setting.value,
      newValue: value,
      timestamp: new Date(),
      category: setting.category
    }, ...prev.slice(0, 9)]); // Keep last 10 changes

    // Update the setting value
    setSettings(prev => prev.map(s => 
      s.key === key ? { ...s, value } : s
    ));
    
    setHasChanges(true);
    setSuccessMessage('');
  };

  const handleConfirmChange = () => {
    if (pendingChange) {
      applySettingChange(pendingChange.key, pendingChange.newValue);
      setPendingChange(null);
      setShowConfirmation(false);
    }
  };

  const handleCancelChange = () => {
    setPendingChange(null);
    setShowConfirmation(false);
  };

  const handleSave = async () => {
    // Validate all settings
    const allErrors: Record<string, string> = {};
    let hasValidationErrors = false;

    settings.forEach(setting => {
      const error = validateSetting(setting, setting.value);
      if (error) {
        allErrors[setting.key] = error;
        hasValidationErrors = true;
      }
    });

    setErrors(allErrors);

    if (hasValidationErrors) {
      return;
    }

    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage (in real app, this would be an API call)
      localStorage.setItem('admin_settings', JSON.stringify(settings));
      localStorage.setItem('admin_settings_history', JSON.stringify(changeHistory));
      
      setOriginalSettings([...settings]);
      setHasChanges(false);
      setSuccessMessage('Settings saved successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setSuccessMessage('');
      // In a real app, you'd show an error message here
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings([...originalSettings]);
    setHasChanges(false);
    setErrors({});
    setSuccessMessage('');
  };

  const handleResetToDefaults = () => {
    setSettings([...mockSettings]);
    setOriginalSettings([...mockSettings]);
    setHasChanges(true);
    setErrors({});
    setSuccessMessage('');
  };

  const renderSettingInput = (setting: SystemSetting) => {
    const error = errors[setting.key];

    switch (setting.type) {
      case 'boolean':
        return (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={Boolean(setting.value)}
              onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-sm text-card-foreground">
              {Boolean(setting.value) ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        );

      case 'select':
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {String(setting.value)}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {setting.options?.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => handleSettingChange(setting.key, option)}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );

      case 'number':
        return (
          <Input
            type="number"
            value={setting.value}
            onChange={(e) => handleSettingChange(setting.key, Number(e.target.value))}
            min={setting.validation?.min}
            max={setting.validation?.max}
            className={error ? 'border-red-500' : ''}
          />
        );

      default:
        return (
          <Input
            type="text"
            value={String(setting.value)}
            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
            className={error ? 'border-red-500' : ''}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">System Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure your application settings and preferences
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <History className="h-4 w-4 mr-2" />
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {hasChanges && (
                <DropdownMenuItem onClick={handleReset}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset Changes
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleResetToDefaults}>
                <Settings className="h-4 w-4 mr-2" />
                Reset to Defaults
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            onClick={handleSave} 
            disabled={isSaving || !hasChanges}
          >
            {isSaving ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="p-3 rounded-md bg-green-50 border border-green-200 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-800">{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                      isActive
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">{category.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {category.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Recent Changes */}
          {changeHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Recent Changes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {changeHistory.slice(0, 5).map((change, index) => (
                    <div key={index} className="text-xs p-2 bg-muted/50 rounded">
                      <div className="font-medium">
                        {change.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </div>
                      <div className="text-muted-foreground">
                        {String(change.oldValue)} → {String(change.newValue)}
                      </div>
                      <div className="text-muted-foreground">
                        {change.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const category = categories.find(c => c.id === activeCategory);
                  if (category?.icon) {
                    const Icon = category.icon;
                    return <Icon className="h-5 w-5" />;
                  }
                  return null;
                })()}
                {categories.find(c => c.id === activeCategory)?.name} Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
                      <div className="h-9 w-full bg-muted animate-pulse rounded" />
                      <div className="h-3 w-2/3 bg-muted animate-pulse rounded" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredSettings.map((setting) => {
                    const error = errors[setting.key];
                    
                    return (
                      <div key={setting.key} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-card-foreground">
                            {setting.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            {setting.validation?.required && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </label>
                          {setting.type === 'boolean' && (
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              Boolean(setting.value) 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {Boolean(setting.value) ? 'Enabled' : 'Disabled'}
                            </span>
                          )}
                        </div>
                        
                        {renderSettingInput(setting)}
                        
                        <p className="text-xs text-muted-foreground">
                          {setting.description}
                        </p>
                        
                        {error && (
                          <div className="flex items-center gap-1 text-red-600">
                            <AlertTriangle className="h-3 w-3" />
                            <span className="text-xs">{error}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {pendingChange && (
        <SettingsConfirmationDialog
          isOpen={showConfirmation}
          onClose={handleCancelChange}
          onConfirm={handleConfirmChange}
          settingKey={pendingChange.key}
          oldValue={pendingChange.oldValue}
          newValue={pendingChange.newValue}
          isLoading={isSaving}
        />
      )}
    </div>
  );
}