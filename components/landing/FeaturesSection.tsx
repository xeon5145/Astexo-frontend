"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Users, 
  Shield, 
  Zap, 
  Settings, 
  Globe,
  Lock,
  Smartphone,
  HeadphonesIcon
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Get deep insights into your business with comprehensive analytics and reporting tools.",
    color: "text-blue-600 bg-blue-100"
  },
  {
    icon: Users,
    title: "Team Management",
    description: "Efficiently manage your team members, roles, and permissions from a centralized dashboard.",
    color: "text-green-600 bg-green-100"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with end-to-end encryption, 2FA, and compliance certifications.",
    color: "text-purple-600 bg-purple-100"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with sub-second response times and 99.9% uptime guarantee.",
    color: "text-yellow-600 bg-yellow-100"
  },
  {
    icon: Settings,
    title: "Customizable",
    description: "Tailor the platform to your needs with extensive customization options and integrations.",
    color: "text-gray-600 bg-gray-100"
  },
  {
    icon: Globe,
    title: "Global Scale",
    description: "Built to scale globally with multi-region deployment and localization support.",
    color: "text-indigo-600 bg-indigo-100"
  },
  {
    icon: Lock,
    title: "Data Privacy",
    description: "Your data stays yours. GDPR compliant with transparent privacy policies.",
    color: "text-red-600 bg-red-100"
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Access your dashboard anywhere with our responsive design and mobile apps.",
    color: "text-pink-600 bg-pink-100"
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Get help when you need it with our round-the-clock customer support team.",
    color: "text-orange-600 bg-orange-100"
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-card-foreground mb-6">
            Everything you need to
            <span className="text-primary block">succeed in business</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Powerful features designed to help you manage, analyze, and grow your business 
            with confidence and ease.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-sm"
              >
                <CardHeader>
                  <div className={`inline-flex p-3 rounded-lg ${feature.color} w-fit mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to experience the power of Astexo?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Card className="p-6 bg-primary text-primary-foreground">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">Start Free Trial</div>
                <div className="text-sm opacity-90">No credit card required</div>
              </div>
            </Card>
            <Card className="p-6 border-2 border-primary">
              <div className="text-center">
                <div className="text-2xl font-bold mb-2 text-primary">Schedule Demo</div>
                <div className="text-sm text-muted-foreground">See it in action</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}