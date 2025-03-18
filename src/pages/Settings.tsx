
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MainNav } from "@/components/MainNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPen, Bell, Shield, CreditCard, UserCog } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <div className="container p-4 md:p-8 max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        
        {/* Profile Section */}
        <Card className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="space-y-4 flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold">John Doe</h2>
                  <p className="text-muted-foreground">john.doe@example.com</p>
                </div>
                <Button variant="outline">
                  <UserPen className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4 flex items-center gap-4 cursor-pointer hover:bg-accent/50 transition-colors">
            <Bell className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium">Notifications</h3>
              <p className="text-sm text-muted-foreground">Manage your alerts</p>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-4 cursor-pointer hover:bg-accent/50 transition-colors">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium">Security</h3>
              <p className="text-sm text-muted-foreground">Password & 2FA</p>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-4 cursor-pointer hover:bg-accent/50 transition-colors">
            <CreditCard className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-medium">Connected Banks</h3>
              <p className="text-sm text-muted-foreground">Manage connections</p>
            </div>
          </Card>
        </div>

        {/* Preferences Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Currency</h3>
                <p className="text-sm text-muted-foreground">Select your preferred currency</p>
              </div>
              <Button variant="outline">USD ($)</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Date Format</h3>
                <p className="text-sm text-muted-foreground">Choose how dates are displayed</p>
              </div>
              <Button variant="outline">MM/DD/YYYY</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Settings;
