import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface NavItem {
  label: string;
  href: string;
}

interface StatItem {
  value: string;
  label: string;
}

interface SkillGroup {
  category: string;
  techs: string[];
}

interface SkillBar {
  name: string;
  level: number;
}

interface ProjectCard {
  title: string;
  description: string;
  tech: string[];
  accent: string;
  primaryLink: string;
  primaryLabel: string;
  secondaryLink?: string;
  secondaryLabel?: string;
}

interface ExperienceItem {
  period: string;
  title: string;
  description: string;
}

interface SocialLink {
  label: string;
  url: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly contactEndpoint = 'https://formspree.io/f/mdapbyra';
  readonly portfolioName = 'Alija Hodzic';
  readonly portfolioTitle = 'Full-Stack Developer';
  readonly portfolioTrack = 'Junior Full-Stack Roles';
  readonly email = 'alija.hodzicdev@gmail.com';
  readonly location = 'Bosnia and Herzegovina';
  readonly githubUrl = 'https://github.com/AlijaHodzic';
  readonly linkedinUrl = 'https://www.linkedin.com/in/alijahodzic/';
  readonly cvUrl = 'alija-hodzic-cv.pdf';

  readonly navItems: NavItem[] = [
    { label: 'Home', href: '#top' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  readonly heroBadges = ['Angular', '.NET', 'TypeScript', 'C#', 'SQLite', 'Tailwind'];

  readonly socialLinks: SocialLink[] = [
    { label: 'GitHub', url: this.githubUrl },
    { label: 'LinkedIn', url: this.linkedinUrl },
    { label: 'Email', url: `mailto:${this.email}` },
  ];

  readonly stats: StatItem[] = [
    { value: '6 mo.', label: 'Full-stack internship at HAA' },
    { value: '3+', label: 'Production-style projects built' },
    { value: 'Open', label: 'Junior full-stack opportunities' },
  ];

  readonly skillGroups: SkillGroup[] = [
    {
      category: 'Frontend',
      techs: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind'],
    },
    {
      category: 'Backend',
      techs: ['.NET', 'C#', 'MySQL', 'SQLite', 'REST APIs', 'SQL'],
    },
    {
      category: 'Workflow',
      techs: ['Git', 'GitHub', 'xUnit', 'Vercel', 'Render', 'Clean Code'],
    },
  ];

  readonly skillBars: SkillBar[] = [
    { name: 'Angular', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'C# / .NET', level: 82 },
    { name: 'HTML / CSS', level: 90 },
    { name: 'API Integration', level: 80 },
    { name: 'SQL / MySQL', level: 78 },
    { name: 'Git / GitHub', level: 84 },
  ];

  readonly projects: ProjectCard[] = [
    {
      title: 'Freelancer Hub',
      description:
        'A freelance marketplace concept focused on connecting clients and freelancers through a modern full-stack workflow.',
      tech: ['Angular', '.NET', 'C#', 'SQLite'],
      accent: 'FH',
      primaryLink: 'https://github.com/AlijaHodzic',
      primaryLabel: 'GitHub',
    },
    {
      title: 'Portfolio',
      description:
        'A modern personal portfolio built in Angular to present my skills, projects, and developer profile in a clean and professional way.',
      tech: ['Angular', 'SCSS', 'TypeScript'],
      accent: 'PR',
      primaryLink: 'https://alija-portofolio.vercel.app/',
      primaryLabel: 'Live',
      secondaryLink: this.githubUrl,
      secondaryLabel: 'GitHub',
    },
    {
      title: 'MeniSpot',
      description:
        'A live digital menu platform for restaurants, cafes, and bars with QR access, theme customization, menu management, and a central admin workflow already used by real clients.',
      tech: ['Angular', '.NET 10', 'PostgreSQL', 'Tailwind'],
      accent: 'MS',
      primaryLink: 'https://menispot.com/',
      primaryLabel: 'Live',
      secondaryLink: 'https://github.com/AlijaHodzic/MeniSpot',
      secondaryLabel: 'GitHub',
    },
  ];

  readonly experiences: ExperienceItem[] = [
    {
      period: 'Nov 2025 - Apr 2026',
      title: 'Full-Stack Development Intern at HAA',
      description:
        'Worked across Angular frontend, C#/.NET backend, MySQL, REST APIs, xUnit testing, and deployments with Render and Vercel in a real engineering workflow.',
    },
    {
      period: 'Current focus',
      title: 'Junior Full-Stack Developer',
      description:
        'Building practical full-stack projects with Angular and .NET while improving code quality, UI implementation, API integration, and problem solving.',
    },
    {
      period: 'Next step',
      title: 'Junior Role Growth',
      description:
        'Looking for opportunities where I can contribute to real products, keep learning from experienced engineers, and grow into a stronger full-stack developer.',
    },
  ];

  contactForm = {
    name: '',
    email: '',
    message: '',
  };

  submitState: 'idle' | 'sending' | 'sent' | 'error' = 'idle';

  async onSubmit(): Promise<void> {
    if (this.submitState === 'sending') {
      return;
    }

    this.submitState = 'sending';

    try {
      const response = await fetch(this.contactEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: this.contactForm.name,
          email: this.contactForm.email,
          message: this.contactForm.message,
          _subject: `New portfolio message from ${this.contactForm.name}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      this.contactForm = {
        name: '',
        email: '',
        message: '',
      };
      this.submitState = 'sent';
    } catch {
      this.submitState = 'error';
    }
  }
}
