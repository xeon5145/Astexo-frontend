"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 lg:p-12 bg-card/80 backdrop-blur-sm border-2 shadow-2xl">
            <div className="text-center space-y-8">
              {/* Icon */}
              <div className="inline-flex p-4 bg-primary/10 rounded-full">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-5xl font-bold text-card-foreground">
                  Ready to transform your
                  <span className="text-primary block">business operations?</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of businesses that have already streamlined their operations 
                  and boosted productivity with Astexo.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                <div className="text-center">
                  <div className="inline-flex p-3 bg-blue-100 rounded-full mb-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-card-foreground">10,000+</div>
                  <div className="text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-3 bg-green-100 rounded-full mb-3">
                    <Zap className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-card-foreground">40%</div>
                  <div className="text-muted-foreground">Efficiency Increase</div>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-3 bg-purple-100 rounded-full mb-3">
                    <Sparkles className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-card-foreground">99.9%</div>
                  <div className="text-muted-foreground">Uptime SLA</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/createAccount">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                    Start Your Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8">
                  Schedule a Demo
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 border-t">
                <p className="text-sm text-muted-foreground mb-4">
                  Trusted by industry leaders
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                  {/* Mock Company Logos */}
                  <div className="text-lg font-bold text-muted-foreground">TechCorp</div>
                  <div className="text-lg font-bold text-muted-foreground">InnovateLab</div>
                  <div className="text-lg font-bold text-muted-foreground">GlobalTech</div>
                  <div className="text-lg font-bold text-muted-foreground">StartupXYZ</div>
                  <div className="text-lg font-bold text-muted-foreground">Enterprise+</div>
                </div>
              </div>

              {/* Guarantee */}
              <div className="bg-muted/50 rounded-lg p-6">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  <span>30-day money-back guarantee • No setup fees • Cancel anytime</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}