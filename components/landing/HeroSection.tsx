"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Play, Star, Users, Zap, Shield } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Star className="h-4 w-4" />
              Trusted by 10,000+ users worldwide
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-card-foreground">
                Transform Your
                <span className="text-primary block">Business Operations</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Astexo provides powerful tools and analytics to streamline your workflow, 
                manage your team, and grow your business with confidence.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/createAccount">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-card-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-card-foreground">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-card-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {/* Main Dashboard Preview */}
            <Card className="p-6 shadow-2xl bg-card/80 backdrop-blur-sm border-2">
              <div className="space-y-4">
                {/* Mock Header */}
                <div className="flex items-center justify-between pb-4 border-b">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                      <Zap className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="font-semibold">Astexo Dashboard</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-2 w-2 bg-green-500 rounded-full" />
                    <div className="h-2 w-2 bg-yellow-500 rounded-full" />
                    <div className="h-2 w-2 bg-red-500 rounded-full" />
                  </div>
                </div>

                {/* Mock Content */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Users className="h-5 w-5 text-primary mb-2" />
                      <div className="text-sm font-medium">1,247</div>
                      <div className="text-xs text-muted-foreground">Users</div>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Shield className="h-5 w-5 text-green-600 mb-2" />
                      <div className="text-sm font-medium">99.9%</div>
                      <div className="text-xs text-muted-foreground">Uptime</div>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Zap className="h-5 w-5 text-blue-600 mb-2" />
                      <div className="text-sm font-medium">Fast</div>
                      <div className="text-xs text-muted-foreground">Response</div>
                    </div>
                  </div>

                  {/* Mock Chart */}
                  <div className="h-32 bg-muted/50 rounded-lg flex items-end justify-between p-4">
                    {[40, 60, 45, 80, 65, 90, 75].map((height, i) => (
                      <div
                        key={i}
                        className="bg-primary rounded-t-sm w-6 transition-all duration-500"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg animate-bounce">
              <Shield className="h-5 w-5" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg animate-pulse">
              <Zap className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}