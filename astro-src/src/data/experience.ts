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
      'Building full-stack features across the Basis ad-tech platform — starting with Ruby on Rails, then expanding into Java Spring Boot. Building internal AI tooling alongside product work, currently developing the Claude Code Office Harness for autonomous ticket-to-PR workflows.',
  },
  {
    company: 'Centric Consulting',
    title: 'Senior Software Engineer',
    period: '2019 – 2021',
    location: 'Gurgaon, IN',
    description:
      'Delivered production software for US enterprise clients as part of an outsourced engineering team, using Ruby on Rails, JavaScript/TypeScript, and Python. Built end-to-end solutions from requirements to deployment.',
  },
  {
    company: 'Adobe Systems',
    title: 'Software Engineer',
    period: '2015 – 2017',
    location: 'Bangalore, IN',
    description:
      'Contributed to engineering teams across Acrobat, Adobe XD, and Adobe Muse.',
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
