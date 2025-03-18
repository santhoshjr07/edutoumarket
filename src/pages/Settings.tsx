import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MainNav } from "@/components/MainNav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPen, Bell, Shield, CreditCard } from "lucide-react";

const Settings = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-background"
    >
      <MainNav />
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container p-4 md:p-8 max-w-6xl mx-auto space-y-8"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-3xl font-bold"
        >
          Settings
        </motion.h1>
        
        {/* Profile Section */}
        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Avatar className="h-20 w-20">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </motion.div>
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
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          variants={itemVariants} 
          className="grid gap-4 md:grid-cols-3"
        >
          {[
            { icon: <Bell className="h-5 w-5 text-primary" />, title: "Notifications", desc: "Manage your alerts" },
            { icon: <Shield className="h-5 w-5 text-primary" />, title: "Security", desc: "Password & 2FA" },
            { icon: <CreditCard className="h-5 w-5 text-primary" />, title: "Connected Banks", desc: "Manage connections" }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="p-4 flex items-center gap-4 cursor-pointer hover:bg-accent/50 transition-colors">
                {item.icon}
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Preferences Section */}
        <motion.div variants={itemVariants}>
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            <div className="space-y-4">
              <motion.div 
                className="flex items-center justify-between"
                whileHover={{ x: 5 }}
              >
                <div>
                  <h3 className="font-medium">Currency</h3>
                  <p className="text-sm text-muted-foreground">Select your preferred currency</p>
                </div>
                <Button variant="outline">USD ($)</Button>
              </motion.div>
              <motion.div 
                className="flex items-center justify-between"
                whileHover={{ x: 5 }}
              >
                <div>
                  <h3 className="font-medium">Date Format</h3>
                  <p className="text-sm text-muted-foreground">Choose how dates are displayed</p>
                </div>
                <Button variant="outline">MM/DD/YYYY</Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Settings;

