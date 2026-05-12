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
      'Senior IC (2 of 6) on Basis Platform\'s Media Activation team. Own two production Java services — a Spring Boot domain service for the full Google Ads campaign hierarchy and a Quarkus sync service handling bidirectional flows across Google Ads, Meta, LinkedIn, and CM360. Processing ~88K entity saves per 24 hours. Led the performance track: absorbed 4× workload growth with flat p50/p95/p99 latency and lifted database index hit rate from 81% to 93%.',
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
