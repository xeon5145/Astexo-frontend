"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star, Zap } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "Perfect for individuals and small teams getting started",
    features: [
      "Up to 5 team members",
      "Basic analytics dashboard",
      "Standard support",
      "5GB storage",
      "Basic integrations",
      "Mobile app access"
    ],
    cta: "Get Started Free",
    popular: false,
    href: "/createAccount"
  },
  {
    name: "Professional",
    price: "$29",
    period: "per month",
    description: "Ideal for growing businesses and teams",
    features: [
      "Up to 25 team members",
      "Advanced analytics & reporting",
      "Priority support",
      "100GB storage",
      "All integrations",
      "Custom workflows",
      "API access",
      "Advanced security features"
    ],
    cta: "Start Free Trial",
    popular: true,
    href: "/createAccount"
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large organizations with specific needs",
    features: [
      "Unlimited team members",
      "Custom analytics & dashboards",
      "Dedicated support manager",
      "Unlimited storage",
      "Custom integrations",
      "Advanced workflow automation",
      "Full API access",
      "Enterprise security & compliance",
      "Custom training & onboarding",
      "SLA guarantees"
    ],
    cta: "Contact Sales",
    popular: false,
    href: "/contact"
  }
];

export default function PricingSection() {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-card-foreground mb-6">
            Simple, transparent
            <span className="text-primary block">pricing for everyone</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Choose the plan that's right for your business. All plans include our core features 
            with no hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-2 border-primary shadow-lg scale-105' 
                  : 'hover:-translate-y-1'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                  <Star className="inline h-4 w-4 mr-1" />
                  Most Popular
                </div>
              )}
              
              <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-muted-foreground ml-2">/{plan.period}</span>
                  )}
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Features List */}
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link href={plan.href} className="block">
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary/90' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    {plan.popular && <Zap className="mr-2 h-4 w-4" />}
                    {plan.cta}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h4 className="font-semibold mb-2">Can I change plans anytime?</h4>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="border-b pb-4">
              <h4 className="font-semibold mb-2">Is there a free trial?</h4>
              <p className="text-muted-foreground">Yes, all paid plans come with a 14-day free trial. No credit card required.</p>
            </div>
            <div className="border-b pb-4">
              <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
              <p className="text-muted-foreground">We accept all major credit cards, PayPal, and bank transfers for enterprise plans.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
              <p className="text-muted-foreground">Yes, we offer a 30-day money-back guarantee for all paid plans.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}