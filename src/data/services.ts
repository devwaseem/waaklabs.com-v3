interface Service {
    id: string;
    title: string;
    description: string;
    examples: string;
}
export const services: Service[] = [
    {
        id: "e-commerce-apps",
        title: "E-commerce Apps",
        description:
            "Elevate your online retail presence with our bespoke e-commerce applications, designed to provide an immersive and user-friendly shopping experience. Whether you're in fashion, electronics, or specialty goods, we specialize in e-commerce applications that drive sales and customer engagement.",
        examples: "Amazon, Flipkart, Ebay, Etsy, etc.",
    },
    {
        id: "real-estate-websites",
        title: "Real Estate Websites",
        description:
            "Capture the real estate market with visually stunning, functional, and user-friendly websites designed to showcase your properties and attract potential buyers. Our real estate websites feature property listings, virtual tours, and powerful search capabilities to boost your real estate business.",
        examples: "Brickell.com, Zillow, Compass",
    },
    {
        id: "ai-apps",
        title: "AI Apps",
        description:
            "Leverage the power of Artificial Intelligence with customized AI applications that analyze data, streamline processes, and unlock new possibilities for your organization. Our AI apps can enhance decision-making, automate tasks, and personalize user experiences for industries such as healthcare, finance, and e-commerce.",
        examples: "ChatGPT Wrapper, Image Generation, AI Automation, etc.",
    },

    {
        id: "saas-development",
        title: "SaaS Development",
        description:
            "Unlock the power of Software as a Service (SaaS) with our tailored development solutions. From concept to deployment, we design and build cloud-based applications that provide flexibility, accessibility, and security to meet the ever-evolving needs of your users.",
        examples:
            "Hubspot, MailChimp, Google Drive, Dropbox, Slack, Salesforce, Zoom etc.",
    },
    {
        id: "mvp-development",
        title: "MVP Development",
        description:
            "Start your journey to market success with a Minimum Viable Product (MVP) designed to validate your concept and engage early adopters. Our MVP development services help you rapidly launch and iterate on your product idea to ensure it meets market demands.",
        examples:
            "OTT Platforms, Video Resume Platform, Airbnb, Dropbox, Instagram, Uber, WhatsApp etc.",
    },

    {
        id: "product-development",
        title: "Product Development",
        description:
            "Elevate your business with our Product Development service. From internal business tools to custom Point of Sale (POS) software, inventory management systems, and booking applications, we turn your ideas into robust, market-ready solutions. Whether you're aiming to streamline operations or launch the next big app, we're here to make it happen.",
        examples:
            "Internal Business Dashboards, Billing System, Inventory Management, Booking systems, etc.",
    },
    {
        id: "no-code-to-code-migration",
        title: "No-Code to Code Migration",
        description:
            "Transform your business processes and digital solutions seamlessly by migrating from no-code platforms to custom code. Harness the full potential of customization, scalability, and performance with our expert migration services.",
        examples:
            "Bubble.io to Code, GlideApps to code, Adalo to Code, OutSystems to Code,  etc.",
    },
];
