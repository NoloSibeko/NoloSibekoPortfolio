using Microsoft.AspNetCore.Mvc;
using NoloSibeko.Models;

namespace NoloSibeko.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PortfolioController : ControllerBase
{
    [HttpGet]
    public ActionResult<PortfolioData> Get()
    {
        var data = new PortfolioData
        {
            Profile = new Profile
            {
                Name = "Bonolo Sibeko", 
                Email = "sibekonolo@gmail.com",
                Phone = "062 091 2838",
                Description = "I am a Computer and Information Sciences graduate from Varsity College, having completed my third year in 2024, and I am currently a software development learner at Singular Systems. Over the past year, I have gained hands-on experience across the IT stack, with a strong focus on .NET and PHP development, building, maintaining, and enhancing web-based systems.|My exposure spans software development, database design, debugging, system integration, and version control, alongside adapting to real-world development workflows. With a strong innovative mindset and solid networking skills, I excel at transforming ideas into practical solutions while learning and adapting quickly in dynamic technical environments.",
                ProfileImageUrl = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=800&auto=format&fit=crop"
            },
            Education = new List<Education>
            {
                new Education { Institution = "Edenglen High School", Period = "2016 – 2020", Description = "Matric" },
                new Education { Institution = "Varsity College", Period = "2022 – 2024", Description = "Computer and Information Sciences Graduate" }
            },
            Experience = new List<Experience>
            {
                new Experience { 
                    Role = "Software Development Learnership", 
                    Company = "Singular Systems", 
                    Period = "2025 – Current", 
                    CompanyLogoUrl = "https://ui-avatars.com/api/?name=Singular+Systems&background=00ccff&color=fff&rounded=true&bold=true",
                    BackgroundImageUrl = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"
                },
                new Experience { 
                    Role = "Junior Software Developer", 
                    Company = "Skills Panda", 
                    Period = "", 
                    CompanyLogoUrl = "https://ui-avatars.com/api/?name=Skills+Panda&background=ff0055&color=fff&rounded=true&bold=true",
                    BackgroundImageUrl = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
                }
            },
            Contributions = new List<Contribution>
            {
                new Contribution { Description = "Software Developer responsible for designing, developing, and maintaining application features using .NET and PHP", ProjectImageUrl = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop" },
                new Contribution { Description = "Developed core backend functionality for a self-service kiosk system, including secure user workflows, data processing, and database integration", ProjectImageUrl = "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop" },
                new Contribution { Description = "Built and enhanced a leave management system supporting automated leave requests, approval workflows, role-based access control, and audit logging both front and backend", ProjectImageUrl = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop" },
                new Contribution { Description = "Implemented tax compliance features, including rule-driven validation, statutory tax calculations, and data integrity checks aligned with regulatory requirements", ProjectImageUrl = "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop" },
                new Contribution { Description = "Designed and optimized database schemas, queries, and transactions to ensure performance and reliability", ProjectImageUrl = "https://images.unsplash.com/photo-1558494949-ef526b01201b?q=80&w=800&auto=format&fit=crop" },
                new Contribution { Description = "Developed and integrated RESTful APIs to support system interoperability and business processes. Performed debugging, performance tuning, and system enhancements to improve stability, scalability, and maintainability", ProjectImageUrl = "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=800&auto=format&fit=crop" },
                new Contribution { Description = "Notable projects: https://academy.connecthr.co.za and https://www.connecthr.co.za/ (Live)", Links = new List<string> { "https://academy.connecthr.co.za", "https://www.connecthr.co.za/" }, ProjectImageUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" }
            },
            Skills = new List<Skill>
            {
                new Skill { Name = "Java", Category = "Language" },
                new Skill { Name = "C#", Category = "Language" },
                new Skill { Name = "Kotlin", Category = "Language" },
                new Skill { Name = "PHP", Category = "Language" },
                new Skill { Name = "SQL Databases", Category = "Database" },
                new Skill { Name = "Backend Development", Category = "Backend" },
                new Skill { Name = ".Net", Category = "Backend" },
                new Skill { Name = "APIs", Category = "Backend" },
                new Skill { Name = "Agile Dev", Category = "Process" },
                new Skill { Name = "Network and Software Engineering", Category = "General" },
                new Skill { Name = "PowerBI", Category = "Tool" },
                new Skill { Name = "Laravel Framework", Category = "Framework" },
                new Skill { Name = "React", Category = "Frontend" },
                new Skill { Name = "HTML", Category = "Frontend" },
                new Skill { Name = "CSS", Category = "Frontend" },
                new Skill { Name = "Javascript", Category = "Frontend" }
            },
            Achievements = new List<Achievement>
            {
                new Achievement { 
                    Description = "Head of House 2020 at Edenglen High School", 
                    ImageUrl = "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&q=80&w=800" 
                },
                new Achievement { 
                    Description = "Football Captain at Corinthians Black Aces", 
                    ImageUrl = "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800" 
                },
                new Achievement { 
                    Description = "Varsity College Men's First Team Football Captain", 
                    ImageUrl = "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=800" 
                },
                new Achievement { 
                    Description = "Competed at University Sports South Africa (USSA) for football 2023, 2024 and 2025 (Captain)", 
                    ImageUrl = "https://images.unsplash.com/photo-1526232636376-53d03f24f092?auto=format&fit=crop&q=80&w=800" 
                },
                new Achievement { 
                    Description = "Played PSL reserve league (DDC) for Tsakhuma Tsha Madzhibandila", 
                    ImageUrl = "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=800" 
                }
            }
        };

        return Ok(data);
    }
}
