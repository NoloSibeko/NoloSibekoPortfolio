import { jsPDF } from 'jspdf';

export const generateResume = (data) => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let y = 20;

  // Helper for checking page breaks
  const checkPageBreak = (heightNeeded) => {
    if (y + heightNeeded > pageHeight - margin) {
      doc.addPage();
      y = 20;
    }
  };

  // --- HEADER ---
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(data.profile.name.toUpperCase(), margin, y);
  y += 10;

  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100);
  doc.text(data.profile.role.toUpperCase(), margin, y);
  y += 15;

  // Contact Info
  doc.setFontSize(10);
  doc.setTextColor(0);
  const contactInfo = [
    data.profile.email,
    data.profile.phone,
    "Johannesburg, South Africa"
  ].join(" | ");
  doc.text(contactInfo, margin, y);
  y += 6;

  // Links
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 255);
  
  const linkedinText = "LinkedIn Profile";
  doc.text(linkedinText, margin, y);
  const linkedinWidth = doc.getTextWidth(linkedinText);
  doc.link(margin, y - 4, linkedinWidth, 5, { url: data.profile.socials.linkedin });

  doc.setTextColor(0);
  doc.text(" | ", margin + linkedinWidth, y);
  const separatorWidth = doc.getTextWidth(" | ");

  doc.setTextColor(0, 0, 255);
  const githubText = "GitHub Profile";
  const githubX = margin + linkedinWidth + separatorWidth;
  doc.text(githubText, githubX, y);
  const githubWidth = doc.getTextWidth(githubText);
  doc.link(githubX, y - 4, githubWidth, 5, { url: data.profile.socials.github });
  
  if (data.profile.socials.portfolio) {
    doc.setTextColor(0);
    doc.text(" | ", githubX + githubWidth, y);
    const separator2Width = doc.getTextWidth(" | ");
    
    doc.setTextColor(0, 0, 255);
    const portfolioText = "Portfolio";
    const portfolioX = githubX + githubWidth + separator2Width;
    doc.text(portfolioText, portfolioX, y);
    const portfolioWidth = doc.getTextWidth(portfolioText);
    doc.link(portfolioX, y - 4, portfolioWidth, 5, { url: data.profile.socials.portfolio });
  }

  y += 15;

  // --- SUMMARY ---
  checkPageBreak(30);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0);
  doc.text("PROFESSIONAL SUMMARY", margin, y);
  y += 8;
  
  doc.setLineWidth(0.5);
  doc.line(margin, y - 5, pageWidth - margin, y - 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const cleanDesc = data.profile.description.replace(/\|/g, ""); // Remove pipes
  const splitDesc = doc.splitTextToSize(cleanDesc, contentWidth);
  doc.text(splitDesc, margin, y);
  y += (splitDesc.length * 5) + 10;

  // --- EDUCATION ---
  checkPageBreak(40);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("EDUCATION", margin, y);
  y += 8;
  doc.line(margin, y - 5, pageWidth - margin, y - 5);

  data.education.forEach(edu => {
    checkPageBreak(20);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(edu.institution, margin, y);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const periodWidth = doc.getTextWidth(edu.period);
    doc.text(edu.period, pageWidth - margin - periodWidth, y);
    y += 5;
    
    doc.setFont("helvetica", "italic");
    doc.text(edu.description, margin, y);
    y += 10;
  });
  y += 5;

  // --- EXPERIENCE ---
  checkPageBreak(40);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setFont("helvetica", "bold"); 
  doc.text("EXPERIENCE", margin, y);
  y += 8;
  doc.line(margin, y - 5, pageWidth - margin, y - 5);

  data.experience.forEach(exp => {
    checkPageBreak(30);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(exp.role, margin, y);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const dateStr = exp.period || "Present";
    const dateWidth = doc.getTextWidth(dateStr);
    doc.text(dateStr, pageWidth - margin - dateWidth, y);
    y += 5;
    
    doc.setFont("helvetica", "bold"); // Company bold
    doc.text(exp.company, margin, y);
    y += 10;
  });
  y += 5;

  // --- TECHNICAL SKILLS ---
  checkPageBreak(60);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("TECHNICAL SKILLS", margin, y);
  y += 8;
  doc.line(margin, y - 5, pageWidth - margin, y - 5);

  const categories = ["Language", "Backend", "Frontend", "Database", "Tool", "Architecture"];
  
  categories.forEach(cat => {
    const skills = data.skills.filter(s => s.category === cat).map(s => s.name).join(", ");
    if (skills) {
      checkPageBreak(15);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(`${cat}:`, margin, y);
      
      doc.setFont("helvetica", "normal");
      const catWidth = doc.getTextWidth(`${cat}:`);
      const splitSkills = doc.splitTextToSize(skills, contentWidth - catWidth - 5);
      doc.text(splitSkills, margin + catWidth + 5, y);
      y += (splitSkills.length * 5) + 3;
    }
  });
  y += 10;

  // --- KEY PROJECTS ---
  checkPageBreak(40);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("KEY PROJECTS", margin, y);
  y += 8;
  doc.line(margin, y - 5, pageWidth - margin, y - 5);

  data.contributions.forEach(proj => {
    checkPageBreak(35);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(proj.title, margin, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const cleanProjDesc = proj.description.replace(/\|/g, "•"); // Replace pipes with bullets
    const splitProj = doc.splitTextToSize(cleanProjDesc, contentWidth);
    doc.text(splitProj, margin, y);
    y += (splitProj.length * 5) + 8;
  });

  // Save the PDF
    doc.save('Bonolo_Sibeko_CV.pdf');
  } catch (error) {
    console.error("PDF Generation Error:", error);
    alert(`Could not generate PDF: ${error.message}`);
  }
};
