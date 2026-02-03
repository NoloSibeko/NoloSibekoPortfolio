namespace NoloSibeko.Models;

public class Profile
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ProfileImageUrl { get; set; } = string.Empty;
}

public class Education
{
    public string Institution { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}

public class Experience
{
    public string Role { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public string CompanyLogoUrl { get; set; } = string.Empty;
    public string BackgroundImageUrl { get; set; } = string.Empty;
}

public class Contribution
{
    public string Description { get; set; } = string.Empty;
    public List<string> Links { get; set; } = new();
    public string ProjectImageUrl { get; set; } = string.Empty;
}

public class Skill
{
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
}

public class Achievement
{
    public string Description { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
}

public class PortfolioData
{
    public Profile Profile { get; set; } = new();
    public List<Education> Education { get; set; } = new();
    public List<Experience> Experience { get; set; } = new();
    public List<Contribution> Contributions { get; set; } = new();
    public List<Skill> Skills { get; set; } = new();
    public List<Achievement> Achievements { get; set; } = new();
}
