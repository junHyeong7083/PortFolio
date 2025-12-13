export interface Profile {
  name: string;
  title: string;
  description: string;
  avatar: string;
  links: {
    github?: string;
    blog?: string;
    email?: string;
  };
  skills: {
    category: string;
    items: string[];
  }[];
}

export interface TechStackItem {
  category: string;
  value: string;
}

export interface PortfolioSection {
  title: string;
  content: string;
}

export interface DesignPattern {
  pattern: string;
  usage: string;
}

export interface Portfolio {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  order: number;
  periodDisplay: string;
  period: string;
  team: string;
  engine: string;
  platform: string;
  gradient: string[];
  tags: string[];
  summary: string;
  features: string[];
  techStack: TechStackItem[];
  sections: PortfolioSection[];
  designPatterns: DesignPattern[];
  achievements: string[];
  links: {
    github?: string;
    demo?: string;
    video?: string;
  };
}
