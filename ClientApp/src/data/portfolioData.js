import profileImg from '../assets/profile.png';

export const portfolioData = {
    profile: {
      name: "Bonolo Sibeko",
      email: "sibekonolo@gmail.com",
      phone: "062 091 2838",
      role: "Software Developer",
      profileImageUrl: profileImg,
        description: "Software Engineer with a BSc in Computer & Information Science, specializing in high-performance full-stack architectures. | I build mission-critical solutions using C#, ASP.NET Core, and React, engineering robust backends that drive fluid, responsive interfaces. | Expert in SQL Server optimization and scalable system design, I bridge the gap between complex data logic and user experience. | I don't just write code; I engineer reliable, efficient, and scalable software ecosystems designed for impact.",
      socials: {
        linkedin: "https://www.linkedin.com/in/bonolo-sibeko-b92663251",
        github: "https://github.com/NoloSibeko",
        portfolio: "https://nolosibeko-portfolio.web.app/"
      }
    },
    education: [
      { institution: "Edenglen High School", period: "2016 – 2020", description: "Matric" },
      { institution: "Varsity College", period: "2022 – 2024", description: "Degree in Computer and Information Sciences" }
    ],
    experience: [
      {
        role: "Software Development Learnership",
        company: "Singular Systems",
        period: "2025 – Current",
        companyLogoUrl: "https://ui-avatars.com/api/?name=Singular+Systems&background=00ccff&color=fff&rounded=true&bold=true",
        backgroundImageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
      },
      {
        role: "Junior Software Developer",
        company: "Skills Panda",
        period: "",
        companyLogoUrl: "https://ui-avatars.com/api/?name=Skills+Panda&background=ff0055&color=fff&rounded=true&bold=true",
        backgroundImageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
      }
    ],
    contributions: [
      { 
        title: "HR & Payroll Systems",
        description: "Engineered robust payroll processing features including complex PAYE annualisation and Year-To-Date (YTD) calculations to ensure financial accuracy. | Designed and implemented SARS-compliant data structures for payslip generation, ensuring regulatory adherence. | Developed secure backend logic to handle sensitive employee financial data, optimizing for both performance and data integrity within the .NET ecosystem.", 
        projectImageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop" 
      },
      { 
        title: "Leave Management System",
        description: "Built a comprehensive leave management module handling end-to-end workflows: application submission, multi-level approval processes, and real-time balance tracking. | Created role-based access controls (RBAC) to ensure appropriate data visibility for employees, managers, and HR admins. | Seamlessly integrated React frontend components with ASP.NET Core APIs to provide instant feedback and state updates during complex approval chains.", 
        projectImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" 
      },
      { 
        title: "Learner & Program Management",
        description: "Developed key modules for learner enrollment, program stage tracking, and budget management, facilitating the administration of large-scale educational programs. | Implemented administrative dashboards for monitoring program health and learner progress. | Enhanced operational visibility through custom reporting tools, enabling stakeholders to track budget utilization and program milestones effectively.", 
        projectImageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop" 
      },
      { 
        title: "Kiosk-Based Systems",
        description: "Contributed to the development of secure, controlled-access kiosk applications with strictly defined user flows to prevent unauthorized usage. | Focused on system stability and input validation to handle high-volume public interaction without failure. | Implemented hardware integration points and ensured operational correctness in resource-constrained environments.", 
        projectImageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" 
      },
      { 
        title: "Live Projects",
        description: "Actively contributing to live enterprise production environments. | Key platforms include 'Academy' (https://academy.connecthr.co.za) for educational management and 'ConnectHR' (https://www.connecthr.co.za/) for comprehensive HR solutions. | Responsible for ongoing feature enhancements, bug fixes, and performance optimizations in a live CI/CD environment.", 
        links: ["https://academy.connecthr.co.za", "https://www.connecthr.co.za/"], 
        projectImageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&w=800&q=80" 
      }
    ],
    skills: [
      // Languages
      { name: "C# (.NET 8)", category: "Language" },
      { name: "JavaScript / TypeScript", category: "Language" },
      { name: "PHP", category: "Language" },
      { name: "SQL", category: "Language" },
      { name: "HTML5 / CSS3", category: "Language" },

      // Backend Frameworks
      { name: "ASP.NET Core (MVC & API)", category: "Backend" },
      { name: "Entity Framework Core", category: "Backend" },
      { name: "RESTful API Dev", category: "Backend" },
      { name: "Auth (JWT/Role-based)", category: "Backend" },

      // Frontend Frameworks
      { name: "React.js", category: "Frontend" },
      { name: "Expo / React Native", category: "Frontend" },
      { name: "API-driven UI", category: "Frontend" },

      // Database
      { name: "MS SQL Server", category: "Database" },
      { name: "Relational Design", category: "Database" },
      { name: "Data Validation", category: "Database" },

      // Tools
      { name: "Git & GitHub", category: "Tool" },
      { name: "Visual Studio / VS Code", category: "Tool" },
      { name: "Postman", category: "Tool" },
      { name: "Node.js & npm", category: "Tool" },
      { name: "Expo CLI", category: "Tool" },
      { name: "Herd", category: "Tool" },

      // Systems & Domain
      { name: "HR & Payroll Systems", category: "Domain" },
      { name: "PAYE & YTD Logic (SA)", category: "Domain" },
      { name: "Leave Management", category: "Domain" },
      { name: "Learner Management", category: "Domain" },
      { name: "Kiosk Systems", category: "Domain" },

      // Architecture
      { name: "MVC Architecture", category: "Architecture" },
      { name: "Clean Architecture", category: "Architecture" },
      { name: "Feature-based Dev", category: "Architecture" },
      { name: "Agile & Iterative", category: "Architecture" }
    ],
    achievements: [
      { description: "Head of House 2020 at Edenglen High School", imageUrl: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800" },
      { description: "Football Captain at Corinthians Black Aces", imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800" },
      { description: "Varsity College Men's First Team Football Captain", imageUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800" },
      { description: "Competed at University Sports South Africa (USSA) for football 2023, 2024 and 2025 (Captain)", imageUrl: "https://images.unsplash.com/photo-1526232636376-53d03f24f092?auto=format&fit=crop&q=80&w=800" },
      { description: "Played PSL reserve league (DDC) for Tsakhuma Tsha Madzhibandila", imageUrl: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=800" }
    ]
  };
