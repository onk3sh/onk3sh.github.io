export type SocialLink = {
  label: string;
  href: string;
};

export type OpenToItem = {
  label: string;
  description: string;
};

export type ContactContent = {
  metaDescription: string;
  hero: { headline: string; subline: string };
  intro: { heading: string; body: string };
  email: string;
  links: SocialLink[];
  openTo: { heading: string; items: OpenToItem[] };
  messagingTips: { heading: string; intro: string; tips: string[] };
};

export const contact: ContactContent = {
  metaDescription: 'Reach Onkesh Bansal, a staff-level engineer building production AI systems. Based in Toronto, open to remote roles across the US and Canada.',
  hero: {
    headline: 'Reach out.',
    subline: 'Staff and senior IC roles, AI platform work, and conversations with people building serious production systems.',
  },
  intro: {
    heading: 'How to reach me',
    body: 'LinkedIn is the fastest way to reach me. I read everything. I reply to messages that carry enough context to skip a round of back-and-forth.',
  },
  email: 'onkesh2022@gmail.com',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/onkesh' },
    { label: 'GitHub',   href: 'https://github.com/onk3sh' },
    { label: 'Email',    href: 'mailto:onkesh2022@gmail.com' },
  ],
  openTo: {
    heading: "What I'm open to",
    items: [
      { label: 'Staff / Senior IC',       description: 'Backend, AI platform, or distributed systems.' },
      { label: 'AI platform work',        description: 'LLM orchestration, agent infrastructure, retrieval pipelines, production ML.' },
      { label: 'Consulting & advisory',   description: 'Agent systems, LLM infrastructure, and backend architecture.' },
      { label: 'Talks & writing',         description: 'Agent engineering, context engineering, and production LLM patterns.' },
      { label: 'Location',               description: 'Based in Toronto. Open to remote roles in the US and Canada, and to select hybrid roles.' },
    ],
  },
  messagingTips: {
    heading: 'Before you message',
    intro: 'I reply to everything. Tell me what your team builds and why you think there is a fit. That saves us both a round of messages.',
    tips: [],
  },
};
