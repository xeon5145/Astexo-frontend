"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    company: "TechStart Inc.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    content: "Astexo has transformed how we manage our business operations. The analytics dashboard gives us insights we never had before, and the team management features have streamlined our workflow significantly.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Operations Director",
    company: "Global Solutions Ltd.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "The security features and compliance tools in Astexo are outstanding. We've been able to maintain our enterprise-grade security requirements while improving our operational efficiency by 40%.",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "Innovation Labs",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "What I love most about Astexo is how intuitive it is. Our team was up and running in just a few hours, and the customer support has been exceptional throughout our journey.",
    rating: 5
  },
  {
    name: "David Park",
    role: "Founder",
    company: "StartupXYZ",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "As a startup, we needed a solution that could grow with us. Astexo's scalability and customization options have been perfect for our evolving needs. Highly recommended!",
    rating: 5
  },
  {
    name: "Lisa Thompson",
    role: "VP of Operations",
    company: "Enterprise Corp",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    content: "The reporting and analytics capabilities have given us unprecedented visibility into our operations. We've identified cost savings opportunities that have already paid for the platform twice over.",
    rating: 5
  },
  {
    name: "James Wilson",
    role: "IT Director",
    company: "SecureFlow Systems",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    content: "Implementation was seamless, and the integration with our existing systems worked flawlessly. The technical support team is knowledgeable and responsive.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-card-foreground mb-6">
            Trusted by industry
            <span className="text-primary block">leaders worldwide</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Don't just take our word for it. Here's what our customers have to say about 
            their experience with Astexo.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        // Fallback to initials if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-primary font-semibold">${testimonial.name.split(' ').map(n => n[0]).join('')}</span>`;
                        }
                      }}
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-card-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-muted-foreground">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-muted-foreground">Uptime SLA</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}