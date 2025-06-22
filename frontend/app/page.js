"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Send, LogOut, MessageCircle, Sparkles, Search, Filter, Download, Globe, ExternalLink } from "lucide-react";
import SocialMediaGraph from "../components/social-media-graph";

export default function Home() {
  const [username, setUsername] = useState("");
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  const handleSearch = async (searchUsername) => {
    if (!searchUsername.trim()) return;
    
    setIsSearching(true);
    setSearchError("");
    setResults([]); // Clear previous results
    
    try {
      const response = await fetch(`http://localhost:8000/username/${searchUsername}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer
        
        for (const line of lines) {
          if (line.trim()) {
            try {
              const result = JSON.parse(line);
              setResults(prev => [...prev, {
                id: Date.now() + Math.random(), // Unique ID
                title: result.name,
                description: `${result.source} - Social Media Profile`,
                status: "found",
                timestamp: new Date().toLocaleTimeString(),
                data: `Found on ${result.name}`,
                url: result.url,
                source: result.source
              }]);
            } catch (e) {
              console.error('Failed to parse JSON:', line);
            }
          }
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      setSearchError("Failed to search. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsSearchSubmitted(true);
      handleSearch(username);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "found":
        return "bg-green-500/20 text-green-600 border-green-500/30";
      case "searching":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30";
      case "error":
        return "bg-red-500/20 text-red-600 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-600 border-gray-500/30";
    }
  };

  const filteredResults = results.filter(result =>
    result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isSearchSubmitted) {
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
              <p className="text-muted-foreground text-lg">Enter a username to find social media profiles</p>
            </div>
            
            <form onSubmit={handleUsernameSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Username
                </label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username..."
                  className="h-12 text-base"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" />
                Find Profiles
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
              <p className="text-sm text-muted-foreground">Searching for: {username}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsSearchSubmitted(false);
                setUsername("");
                setResults([]);
                setIsSearching(false);
                setSearchError("");
              }}
              className="h-10 px-4"
            >
              <LogOut className="w-4 h-4 mr-2" />
               New Search
            </Button>
          </div>
        </div>
      </div>

      {/* Search Status */}
      {isSearching && (
        <div className="px-8 py-4 max-w-7xl mx-auto w-full">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-center space-x-3">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-blue-600 font-medium">Searching social media platforms...</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {searchError && (
        <div className="px-8 py-4 max-w-7xl mx-auto w-full">
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center space-x-3">
            <span className="text-red-600 font-medium">{searchError}</span>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search results..."
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

        {/* Results Count */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Found {filteredResults.length} social media profile{filteredResults.length !== 1 ? 's' : ''}
          </h2>
        </div>

        {/* Grid of Social Media Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredResults.map((result) => (
            <div
              key={result.id}
              className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 p-8 hover:shadow-lg transition-all duration-200 hover:border-border/80 min-h-[280px]"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-primary" />
                    {result.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.description}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-10 w-10 p-0 ml-4 flex-shrink-0"
                  onClick={() => window.open(result.url, '_blank')}
                >
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(result.status)}`}>
                  {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                </div>
                
                <div className="bg-muted/50 rounded-xl p-4 min-h-[80px]">
                  <p className="text-sm text-foreground leading-relaxed">
                    {result.data}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Source: {result.source}
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
                  <span className="font-medium">Found at {result.timestamp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Graph */}
        {results.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Social Media Network</h2>
            <SocialMediaGraph results={results} />
          </div>
        )}

        {filteredResults.length === 0 && !isSearching && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No profiles found</h3>
            <p className="text-muted-foreground">Try searching for a different username</p>
          </div>
        )}
      </div>
    </div>
  );
}
