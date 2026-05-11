export type Role = {
  company: string;
  title: string;
  period: string;
  location: string;
  description: string;
};

export type Degree = {
  institution: string;
  degree: string;
  period: string;
  location: string;
  detail?: string;
};

export const roles: Role[] = [
  {
    company: 'Basis Technologies',
    title: 'Senior Full Stack Engineer',
    period: '2022 – Present',
    location: 'Toronto, ON',
    description:
      'Built and run a ticket-to-PR pipeline (Claude Code Harness) used daily on production Rails and Spring Boot work — autonomous from Jira to draft PR, with persistent agent memory. Full-stack delivery across the Basis ad-automation platform.',
  },
  {
    company: 'Centric Consulting',
    title: 'Senior Software Engineer',
    period: '2017 – 2021',
    location: 'Gurgaon, IN',
    description:
      'Senior IC on US enterprise BFSI client teams. Ruby on Rails, JavaScript/TypeScript, and Python.',
  },
  {
    company: 'Adobe Systems',
    title: 'Software Engineer',
    period: '2015 – 2017',
    location: 'Bangalore, IN',
    description:
      'Shipped the Edit PDF feature on Adobe Acrobat, then moved to the early beta team for Adobe XD.',
  },
];

export const education: Degree[] = [
  {
    institution: 'University of Windsor',
    degree: 'Graduate Studies, Computer Science',
    period: '2020 – 2021',
    location: 'Windsor, ON',
    detail: 'GPA 3.9 / 4.0',
  },
];
