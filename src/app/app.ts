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
  link: string;
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
  readonly portfolioTrack = 'Junior / Internship';
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
    { value: 'Junior', label: 'Career stage' },
    { value: 'Full-Stack', label: 'Angular and .NET focus' },
    { value: 'Open', label: 'Internship and junior roles' },
  ];

  readonly skillGroups: SkillGroup[] = [
    {
      category: 'Frontend',
      techs: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind'],
    },
    {
      category: 'Backend',
      techs: ['.NET', 'C#', 'SQLite', 'REST APIs', 'SQL', 'GitHub'],
    },
    {
      category: 'Workflow',
      techs: ['Git', 'GitHub', 'Responsive UI', 'Problem Solving', 'Learning Fast', 'Clean Code'],
    },
  ];

  readonly skillBars: SkillBar[] = [
    { name: 'Angular', level: 90 },
    { name: 'TypeScript', level: 85 },
    { name: 'C# / .NET', level: 82 },
    { name: 'HTML / CSS', level: 90 },
    { name: 'API Integration', level: 80 },
    { name: 'SQLite / SQL', level: 78 },
    { name: 'Git / GitHub', level: 84 },
  ];

  readonly projects: ProjectCard[] = [
    {
      title: 'Freelancer Hub',
      description:
        'A freelance marketplace concept focused on connecting clients and freelancers through a modern full-stack workflow.',
      tech: ['Angular', '.NET', 'C#', 'SQLite'],
      accent: 'FH',
      link: this.githubUrl,
    },
    {
      title: 'Portfolio Rebuild',
      description:
        'A modern personal portfolio built in Angular to present my skills, projects, and developer profile in a clean and professional way.',
      tech: ['Angular', 'SCSS', 'TypeScript'],
      accent: 'PR',
      link: this.githubUrl,
    },
    {
      title: 'More Projects Coming',
      description:
        'This section is ready for the next projects I will add, including real deployments, case studies, and improvements as I grow.',
      tech: ['Angular', '.NET', 'GitHub'],
      accent: 'NP',
      link: this.githubUrl,
    },
  ];

  readonly experiences: ExperienceItem[] = [
    {
      period: 'Now',
      title: 'Junior Full-Stack Developer',
      description:
        'Focused on building practical web applications with Angular, .NET, C#, TypeScript, and SQLite while improving every project step by step.',
    },
    {
      period: 'Current goal',
      title: 'Internship or Junior Opportunity',
      description:
        'Actively shaping a portfolio that shows real coding ability, problem solving, and readiness to join a team as a junior developer or intern.',
    },
    {
      period: 'Next step',
      title: 'Real Project Expansion',
      description:
        'Next updates will add my full experience, resume, stronger project case studies, and more polished details across the site.',
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
