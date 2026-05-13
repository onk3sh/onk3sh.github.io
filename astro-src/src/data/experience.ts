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
      'Senior IC on a 6-engineer team owning Media Activation. Own two production Java services — a Spring Boot domain service for the full Google Ads campaign hierarchy and a Quarkus sync service handling bidirectional flows across Google Ads, Meta, LinkedIn, and CM360. Processing ~88K entity saves per 24 hours on a multi-tenant AWS platform. Led the performance track: absorbed 4× workload growth with flat p50/p95/p99 latency and lifted Postgres index hit rate from 81% to 93%.',
  },
  {
    company: 'Centric Consulting',
    title: 'Senior Software Engineer',
    period: '2017 – 2021',
    location: 'Gurgaon, IN',
    description:
      'Senior IC on US BFSI client engagements — insurance carriers and financial services. Owned test architecture and automation on enterprise policy and claims systems. Rewrote a 10,000+ test UI suite with an Excel-driven + Redis cache layer: CI time dropped from 5 hours to 45 minutes, ran on every merge. Delivered across Ruby on Rails, TypeScript, and Python stacks.',
  },
  {
    company: 'Adobe Systems',
    title: 'Software Engineer',
    period: '2015 – 2017',
    location: 'Bangalore, IN',
    description:
      'SDET on Acrobat desktop. Owned test coverage for Edit PDF, Prepress, and Preflight — features used by 200M+ Acrobat users. Part of a 3-person team responsible for a 50K+ test suite across JS and Adobe\'s proprietary framework. Moved to the early beta team for Adobe XD before public launch.',
  },
];

export const education: Degree[] = [
  {
    institution: 'University of Windsor',
    degree: 'M.Eng., Computer Science',
    period: '2020 – 2021',
    location: 'Windsor, ON',
    detail: 'GPA 3.9 / 4.0',
  },
  {
    institution: 'Panjab University',
    degree: 'B.Eng., Computer Science',
    period: '2006 – 2010',
    location: 'Chandigarh, IN',
  },
];
