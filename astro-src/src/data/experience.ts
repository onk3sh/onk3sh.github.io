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
      'Building AI tooling and backend systems at Basis — a top-ranked DSP and omnichannel ad automation platform. Running a personal ticket-to-PR pipeline (Claude Code Harness) in daily use on my own engineering workflow. Full-stack across Ruby on Rails and Java Spring Boot.',
  },
  {
    company: 'Centric Consulting',
    title: 'Senior Software Engineer',
    period: '2017 – 2021',
    location: 'Gurgaon, IN',
    description:
      'Delivered production software for US enterprise clients across fintech and logistics domains — Ruby on Rails, JavaScript/TypeScript, and Python. Owned end-to-end delivery from requirements through deployment.',
  },
  {
    company: 'Adobe Systems',
    title: 'Software Engineer',
    period: '2015 – 2017',
    location: 'Bangalore, IN',
    description:
      'Owned test infrastructure and quality tooling for Adobe Acrobat — automated regression coverage across PDF rendering and form workflows at scale.',
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
