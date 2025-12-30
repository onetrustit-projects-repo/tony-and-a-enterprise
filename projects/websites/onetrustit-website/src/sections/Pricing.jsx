import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import Button from '../components/Button';

const Pricing = () => {
    const plans = [
        {
            name: "Essentials",
            description: "Core security monitoring for growing teams",
            price: "$2,500",
            period: "per month",
            response: "4-hour response",
            coverage: "Business hours monitoring",
            support: "8x5 support",
            reporting: "Monthly reports",
            features: [
                "EDR/XDR monitoring",
                "Basic SIEM integration",
                "Vulnerability scanning",
                "Email & phone support",
                "Quarterly security reviews",
                "Standard compliance templates",
                "Up to 100 endpoints"
            ],
            cta: "Request Proposal",
            variant: "outline"
        },
        {
            name: "Growth",
            description: "Full SOC coverage with advanced threat detection",
            price: "$6,500",
            period: "per month",
            popular: true,
            response: "1-hour response",
            coverage: "24/7/365 monitoring",
            support: "24/7 support",
            reporting: "Weekly reports",
            features: [
                "Full SOC-as-a-Service",
                "Advanced SIEM with custom rules",
                "MDR with threat hunting",
                "Incident response retainer (10 hrs)",
                "vCISO advisory (4 hrs/month)",
                "Bi-weekly vulnerability scans",
                "Cloud security posture management",
                "Priority escalation",
                "SOC 2 / ISO 27001 support",
                "Up to 500 endpoints"
            ],
            cta: "Get Started",
            variant: "primary"
        },
        {
            name: "Enterprise",
            description: "White-glove security operations & governance",
            price: "Custom",
            period: "tailored pricing",
            response: "15-min response",
            coverage: "24/7/365 monitoring + dedicated team",
            support: "24/7 dedicated support",
            reporting: "Real-time dashboards + weekly reports",
            features: [
                "All Growth features",
                "Dedicated security team",
                "Full vCISO services",
                "Unlimited incident response",
                "Red team / penetration testing",
                "Custom playbook development",
                "Advanced threat intelligence",
                "Managed compliance programs",
                "Executive security briefings",
                "Unlimited endpoints",
                "Multi-cloud & hybrid support",
                "Integration with custom tools"
            ],
            cta: "Contact Sales",
            variant: "outline"
        }
    ];

    return (
        <section id="pricing" className="py-20 bg-brand-black relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Plans & <span className="text-brand-primary">SLAs</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Choose the right level of security coverage for your organization.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-2xl border flex flex-col ${plan.popular
                                    ? 'border-brand-primary bg-brand-primary/5 shadow-2xl shadow-brand-primary/10 scale-105 z-10'
                                    : 'border-white/10 glass-dark hover:border-white/20'
                                } p-8 transition-all duration-300`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-white text-sm font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                <p className="text-gray-400 text-sm min-h-[40px]">{plan.description}</p>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                                    <span className="text-gray-500 text-sm font-medium">{plan.period}</span>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8 text-sm">
                                <div className="flex justify-between py-2 border-b border-white/10">
                                    <span className="text-gray-400">Response time:</span>
                                    <span className="text-white font-medium text-right">{plan.response}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/10">
                                    <span className="text-gray-400">Coverage:</span>
                                    <span className="text-white font-medium text-right max-w-[50%]">{plan.coverage}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/10">
                                    <span className="text-gray-400">Support hours:</span>
                                    <span className="text-white font-medium text-right">{plan.support}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-white/10">
                                    <span className="text-gray-400">Reporting:</span>
                                    <span className="text-white font-medium text-right max-w-[50%]">{plan.reporting}</span>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                        <Check className="w-5 h-5 text-brand-primary shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button variant={plan.variant} className="w-full flex items-center justify-center gap-2 group" href="#contact">
                                {plan.cta}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
