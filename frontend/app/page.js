"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Send, LogOut, MessageCircle, Sparkles, Search, Filter, Download } from "lucide-react";
import SocialMediaGraph from "../components/social-media-graph";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data for the output boxes
  const outputBoxes = [
    {
      id: 1,
      title: "Network Analysis",
      description: "Deep packet inspection results",
      status: "completed",
      timestamp: "2 minutes ago",
      data: "Found 3 suspicious connections"
    },
    {
      id: 2,
      title: "Vulnerability Scan",
      description: "Port scanning results",
      status: "running",
      timestamp: "5 minutes ago",
      data: "Scanning 1000+ ports"
    },
    {
      id: 3,
      title: "Malware Detection",
      description: "File analysis results",
      status: "completed",
      timestamp: "10 minutes ago",
      data: "No threats detected"
    },
    {
      id: 4,
      title: "Traffic Analysis",
      description: "Network flow analysis",
      status: "pending",
      timestamp: "15 minutes ago",
      data: "Queued for processing"
    },
    {
      id: 5,
      title: "Log Analysis",
      description: "System log parsing",
      status: "completed",
      timestamp: "20 minutes ago",
      data: "Processed 50,000+ entries"
    },
    {
      id: 6,
      title: "Forensics Report",
      description: "Digital forensics summary",
      status: "completed",
      timestamp: "1 hour ago",
      data: "Report generated successfully"
    }
  ];

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setIsEmailSubmitted(true);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-600 border-green-500/30";
      case "running":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-600 border-gray-500/30";
    }
  };

  const filteredBoxes = outputBoxes.filter(box =>
    box.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    box.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isEmailSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl blur-3xl"></div>
          
          <div className="relative bg-card/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 w-full max-w-md border border-border/50">
            <div className="text-center mb-10">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MessageCircle className="w-10 h-10 text-primary-foreground" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                WormDive
              </h1>
              <p className="text-muted-foreground text-lg">Enter your email to find your worm</p>
            </div>
            
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="h-12 text-base"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Get Started
              </Button>
            </form>

            <div className="absolute top-6 right-6">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10 flex flex-col">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-xl shadow-sm border-b border-border/50 px-8 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">WormDive</h1>
              <p className="text-sm text-muted-foreground">Logged in as {email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsEmailSubmitted(false);
                setEmail("");
              }}
              className="h-10 px-4"
            >
              <LogOut className="w-4 h-4 mr-2" />
               Use Another Email
            </Button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search outputs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          <Button variant="outline" size="sm" className="h-10 px-4">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Grid of Output Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredBoxes.map((box) => (
            <div
              key={box.id}
              className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 p-8 hover:shadow-lg transition-all duration-200 hover:border-border/80 min-h-[280px]"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {box.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {box.description}
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0 ml-4 flex-shrink-0">
                  <Download className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(box.status)}`}>
                  {box.status.charAt(0).toUpperCase() + box.status.slice(1)}
                </div>
                
                <div className="bg-muted/50 rounded-xl p-4 min-h-[80px]">
                  <p className="text-sm text-foreground leading-relaxed">
                    {box.data}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
                  <span className="font-medium">ID: {box.id}</span>
                  <span>{box.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <SocialMediaGraph />

        {filteredBoxes.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
