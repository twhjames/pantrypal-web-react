import React, { useState } from "react";
import { AppLayout } from "@/components/Layout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Lock, Bell, Shield, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const { user, logout, updateProfile } = useAuth();
    const navigate = useNavigate();

    const [profileForm, setProfileForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        expiryAlerts: true,
        weeklyReport: false,
        recipeRecommendations: true,
    });

    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdatingProfile(true);

        try {
            await updateProfile(profileForm);
            toast({
                title: "Profile Updated",
                description: "Your profile has been successfully updated.",
            });
        } catch (error) {
            toast({
                title: "Update Failed",
                description: "Failed to update profile. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast({
                title: "Password Mismatch",
                description: "New passwords don't match.",
                variant: "destructive",
            });
            return;
        }

        setIsChangingPassword(true);

        try {
            // TODO: API Call to PUT /auth/change-password endpoint
            console.log("API Call: PUT /auth/change-password");

            // Mock password change
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setPasswordForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
            toast({
                title: "Password Changed",
                description: "Your password has been successfully updated.",
            });
        } catch (error) {
            toast({
                title: "Password Change Failed",
                description:
                    "Failed to change password. Please check your current password.",
                variant: "destructive",
            });
        } finally {
            setIsChangingPassword(false);
        }
    };

    const handlePreferenceChange = async (key: string, value: boolean) => {
        try {
            // TODO: API Call to PUT /user/preferences endpoint
            console.log("API Call: PUT /user/preferences", { [key]: value });

            setPreferences((prev) => ({ ...prev, [key]: value }));
            toast({
                title: "Preferences Updated",
                description: "Your notification preferences have been saved.",
            });
        } catch (error) {
            toast({
                title: "Update Failed",
                description: "Failed to update preferences.",
                variant: "destructive",
            });
        }
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
        toast({
            title: "Logged Out",
            description: "You have been successfully logged out.",
        });
    };

    return (
        <AppLayout>
            <div className="pt-2 max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Settings ⚙️
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Manage your account and preferences
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Profile Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User size={20} />
                                Profile Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handleProfileUpdate}
                                className="space-y-4"
                            >
                                <div>
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={profileForm.name}
                                        onChange={(e) =>
                                            setProfileForm({
                                                ...profileForm,
                                                name: e.target.value,
                                            })
                                        }
                                        placeholder="Enter your full name"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={profileForm.email}
                                        onChange={(e) =>
                                            setProfileForm({
                                                ...profileForm,
                                                email: e.target.value,
                                            })
                                        }
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isUpdatingProfile}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    {isUpdatingProfile
                                        ? "Updating..."
                                        : "Update Profile"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Password Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock size={20} />
                                Change Password
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handlePasswordChange}
                                className="space-y-4"
                            >
                                <div>
                                    <Label htmlFor="currentPassword">
                                        Current Password
                                    </Label>
                                    <Input
                                        id="currentPassword"
                                        type="password"
                                        value={passwordForm.currentPassword}
                                        onChange={(e) =>
                                            setPasswordForm({
                                                ...passwordForm,
                                                currentPassword: e.target.value,
                                            })
                                        }
                                        placeholder="Enter current password"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="newPassword">
                                        New Password
                                    </Label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        value={passwordForm.newPassword}
                                        onChange={(e) =>
                                            setPasswordForm({
                                                ...passwordForm,
                                                newPassword: e.target.value,
                                            })
                                        }
                                        placeholder="Enter new password"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="confirmPassword">
                                        Confirm New Password
                                    </Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        value={passwordForm.confirmPassword}
                                        onChange={(e) =>
                                            setPasswordForm({
                                                ...passwordForm,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                        placeholder="Confirm new password"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={
                                        isChangingPassword ||
                                        !passwordForm.currentPassword ||
                                        !passwordForm.newPassword
                                    }
                                    variant="outline"
                                >
                                    {isChangingPassword
                                        ? "Changing Password..."
                                        : "Change Password"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Notification Preferences */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell size={20} />
                                Notification Preferences
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label
                                        htmlFor="emailNotifications"
                                        className="text-base font-medium"
                                    >
                                        Email Notifications
                                    </Label>
                                    <p className="text-sm text-gray-600">
                                        Receive general updates via email
                                    </p>
                                </div>
                                <Switch
                                    id="emailNotifications"
                                    checked={preferences.emailNotifications}
                                    onCheckedChange={(checked) =>
                                        handlePreferenceChange(
                                            "emailNotifications",
                                            checked
                                        )
                                    }
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label
                                        htmlFor="expiryAlerts"
                                        className="text-base font-medium"
                                    >
                                        Expiry Alerts
                                    </Label>
                                    <p className="text-sm text-gray-600">
                                        Get notified when items are expiring
                                    </p>
                                </div>
                                <Switch
                                    id="expiryAlerts"
                                    checked={preferences.expiryAlerts}
                                    onCheckedChange={(checked) =>
                                        handlePreferenceChange(
                                            "expiryAlerts",
                                            checked
                                        )
                                    }
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label
                                        htmlFor="weeklyReport"
                                        className="text-base font-medium"
                                    >
                                        Weekly Report
                                    </Label>
                                    <p className="text-sm text-gray-600">
                                        Weekly pantry summary and
                                        recommendations
                                    </p>
                                </div>
                                <Switch
                                    id="weeklyReport"
                                    checked={preferences.weeklyReport}
                                    onCheckedChange={(checked) =>
                                        handlePreferenceChange(
                                            "weeklyReport",
                                            checked
                                        )
                                    }
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div>
                                    <Label
                                        htmlFor="recipeRecommendations"
                                        className="text-base font-medium"
                                    >
                                        Recipe Recommendations
                                    </Label>
                                    <p className="text-sm text-gray-600">
                                        AI-powered recipe suggestions
                                    </p>
                                </div>
                                <Switch
                                    id="recipeRecommendations"
                                    checked={preferences.recipeRecommendations}
                                    onCheckedChange={(checked) =>
                                        handlePreferenceChange(
                                            "recipeRecommendations",
                                            checked
                                        )
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield size={20} />
                                Account Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-start gap-4">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Logging out will end your session across all
                                    devices.
                                </p>
                            </div>
                            <Button
                                onClick={handleLogout}
                                variant="destructive"
                                className="flex items-center gap-2"
                            >
                                <LogOut size={16} />
                                Logout
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
};

export default Settings;
