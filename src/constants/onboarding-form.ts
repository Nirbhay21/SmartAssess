import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(en);

export const DOMAIN_INDUSTRIES = [
  'Software & IT',
  'Computer Science & Engineering',
  'Data Science & Analytics',
  'Artificial Intelligence & Machine Learning',
  'Cloud Computing & DevOps',
  'Cybersecurity',
  'Mobile App Development',
  'Web Development',
  'Game Development',
  'Embedded Systems & IoT',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Robotics & Automation',
  'VLSI & Semiconductor',
  'Business & Management',
  'Finance & Accounting',
  'Marketing & Sales',
  'Human Resources',
  'Operations & Supply Chain',
  'Product Management',
  'Project Management',
  'Business Analysis',
  'UI / UX Design',
  'Graphic Design',
  'Product Design',
  'Animation & Multimedia',
  'Content & Media',
  'Healthcare & Medical',
  'Pharmacy',
  'Biotechnology',
  'Life Sciences',
  'Education & Teaching',
  'Research & Development',
  'Law & Legal Studies',
  'Public Policy & Governance',
  'Economics',
  'Psychology',
  'Social Sciences',
  'Environmental Studies & Sustainability',
] as const;

export type DomainIndustry = (typeof DOMAIN_INDUSTRIES)[number];

export const PRIMARY_ROLES_BY_DOMAIN: Record<DomainIndustry, string[]> = {
  'Software & IT': [
    'Software Engineer',
    'Backend Developer',
    'Frontend Developer',
    'Full Stack Developer',
    'System Administrator',
    'IT Support Engineer',
    'Technical Consultant',
  ],

  'Computer Science & Engineering': [
    'Computer Engineer',
    'Systems Engineer',
    'Research Engineer',
    'Teaching Assistant',
    'Academic Researcher',
  ],

  'Data Science & Analytics': [
    'Data Scientist',
    'Data Analyst',
    'Business Intelligence Analyst',
    'Machine Learning Analyst',
    'Statistician',
  ],

  'Artificial Intelligence & Machine Learning': [
    'Machine Learning Engineer',
    'AI Engineer',
    'Research Scientist',
    'Applied Scientist',
    'Deep Learning Engineer',
  ],

  'Cloud Computing & DevOps': [
    'DevOps Engineer',
    'Cloud Engineer',
    'Site Reliability Engineer',
    'Infrastructure Engineer',
    'Platform Engineer',
  ],

  Cybersecurity: [
    'Security Engineer',
    'Cybersecurity Analyst',
    'SOC Analyst',
    'Penetration Tester',
    'Security Architect',
  ],

  'Mobile App Development': [
    'Android Developer',
    'iOS Developer',
    'Flutter Developer',
    'React Native Developer',
    'Mobile App Engineer',
  ],

  'Web Development': [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Web Engineer',
    'Web Designer',
  ],

  'Game Development': [
    'Game Developer',
    'Game Designer',
    'Gameplay Programmer',
    'Game Artist',
    'Technical Artist',
  ],

  'Embedded Systems & IoT': [
    'Embedded Systems Engineer',
    'Firmware Engineer',
    'IoT Engineer',
    'Hardware–Software Integration Engineer',
  ],

  'Electrical & Electronics Engineering': [
    'Electrical Engineer',
    'Electronics Engineer',
    'Power Systems Engineer',
    'Control Systems Engineer',
  ],

  'Mechanical Engineering': [
    'Mechanical Engineer',
    'Design Engineer',
    'Manufacturing Engineer',
    'Maintenance Engineer',
  ],

  'Civil Engineering': [
    'Civil Engineer',
    'Structural Engineer',
    'Site Engineer',
    'Construction Manager',
  ],

  'Robotics & Automation': [
    'Robotics Engineer',
    'Automation Engineer',
    'Mechatronics Engineer',
    'Control Engineer',
  ],

  'VLSI & Semiconductor': [
    'VLSI Design Engineer',
    'Physical Design Engineer',
    'Verification Engineer',
    'Semiconductor Process Engineer',
  ],

  'Business & Management': [
    'Business Manager',
    'Operations Manager',
    'Strategy Analyst',
    'Management Trainee',
  ],

  'Finance & Accounting': [
    'Financial Analyst',
    'Accountant',
    'Auditor',
    'Investment Analyst',
    'Risk Analyst',
  ],

  'Marketing & Sales': [
    'Marketing Executive',
    'Growth Marketer',
    'Digital Marketer',
    'Sales Executive',
    'Account Manager',
  ],

  'Human Resources': [
    'HR Executive',
    'Talent Acquisition Specialist',
    'HR Business Partner',
    'People Operations Manager',
  ],

  'Operations & Supply Chain': [
    'Operations Manager',
    'Supply Chain Analyst',
    'Logistics Manager',
    'Procurement Specialist',
  ],

  'Product Management': [
    'Product Manager',
    'Associate Product Manager',
    'Product Owner',
    'Product Strategist',
  ],

  'Project Management': ['Project Manager', 'Program Manager', 'Delivery Manager', 'Scrum Master'],

  'Business Analysis': [
    'Business Analyst',
    'Functional Analyst',
    'Process Analyst',
    'Systems Analyst',
  ],

  'UI / UX Design': ['UI Designer', 'UX Designer', 'Product Designer', 'Interaction Designer'],

  'Graphic Design': ['Graphic Designer', 'Visual Designer', 'Brand Designer', 'Illustrator'],

  'Product Design': ['Product Designer', 'Industrial Designer', 'Design Researcher'],

  'Animation & Multimedia': ['Animator', 'Motion Designer', '3D Artist', 'Multimedia Designer'],

  'Content & Media': ['Content Writer', 'Content Strategist', 'Video Editor', 'Media Producer'],

  'Healthcare & Medical': [
    'Medical Officer',
    'Clinical Research Associate',
    'Healthcare Analyst',
    'Medical Consultant',
  ],

  Pharmacy: [
    'Pharmacist',
    'Clinical Pharmacist',
    'Regulatory Affairs Specialist',
    'Pharmaceutical Researcher',
  ],

  Biotechnology: [
    'Biotechnology Engineer',
    'Research Scientist',
    'Lab Technologist',
    'Bioinformatics Analyst',
  ],

  'Life Sciences': ['Life Science Researcher', 'Biologist', 'Clinical Scientist'],

  'Education & Teaching': ['Teacher', 'Lecturer', 'Instructional Designer', 'Academic Coordinator'],

  'Research & Development': ['R&D Engineer', 'Research Scientist', 'Innovation Engineer'],

  'Law & Legal Studies': [
    'Legal Associate',
    'Corporate Lawyer',
    'Legal Consultant',
    'Compliance Officer',
  ],

  'Public Policy & Governance': [
    'Policy Analyst',
    'Public Affairs Consultant',
    'Governance Specialist',
  ],

  Economics: ['Economist', 'Economic Analyst', 'Policy Researcher'],

  Psychology: ['Psychologist', 'Clinical Psychologist', 'Behavioral Researcher', 'Counselor'],

  'Social Sciences': ['Social Researcher', 'Policy Researcher', 'Sociologist'],

  'Environmental Studies & Sustainability': [
    'Environmental Engineer',
    'Sustainability Analyst',
    'Climate Policy Analyst',
    'Environmental Consultant',
  ],
} as const;

export type PrimaryRole = (typeof PRIMARY_ROLES_BY_DOMAIN)[DomainIndustry][number];

export const HIGHEST_EDUCATION_LEVELS = [
  'Secondary School (10th)',
  'Higher Secondary (12th)',
  'Diploma / Polytechnic',
  'Associate Degree',
  'Bachelor’s Degree',
  'Postgraduate Diploma',
  'Master’s Degree',
  'Doctorate (PhD)',
  'Postdoctoral Research',
] as const;

export type HighestEducationLevel = (typeof HIGHEST_EDUCATION_LEVELS)[number];

export const CANDIDATE_CURRENT_STATUS = [
  'Student',
  'Intern',
  'Fresher',
  'Employed',
  'Freelancer',
  'Founder',
  'Unemployed',
  'Career Break',
  'Career Transition',
] as const;

export type CandidateCurrentStatus = (typeof CANDIDATE_CURRENT_STATUS)[number];

export const TOP_SKILLS_BY_DOMAIN: Record<DomainIndustry, string[]> = {
  'Software & IT': [
    'Programming Fundamentals',
    'Object-Oriented Programming',
    'Data Structures & Algorithms',
    'System Design',
    'REST APIs',
    'Databases',
    'Linux',
    'Git',
    'Debugging',
    'Software Architecture',
  ],

  'Computer Science & Engineering': [
    'Data Structures',
    'Algorithms',
    'Operating Systems',
    'Computer Networks',
    'Database Management Systems',
    'Compiler Design',
    'Distributed Systems',
    'Theory of Computation',
    'Research Methodology',
  ],

  'Data Science & Analytics': [
    'Data Analysis',
    'Statistics',
    'Probability',
    'SQL',
    'Python for Data Science',
    'Data Visualization',
    'Exploratory Data Analysis',
    'Business Intelligence',
    'Data Cleaning',
    'A/B Testing',
  ],

  'Artificial Intelligence & Machine Learning': [
    'Machine Learning',
    'Deep Learning',
    'Neural Networks',
    'Natural Language Processing',
    'Computer Vision',
    'Model Training',
    'Model Evaluation',
    'Feature Engineering',
    'MLOps',
    'Prompt Engineering',
  ],

  'Cloud Computing & DevOps': [
    'Cloud Architecture',
    'AWS',
    'Azure',
    'Google Cloud',
    'Docker',
    'Kubernetes',
    'CI/CD',
    'Infrastructure as Code',
    'Monitoring & Logging',
    'Site Reliability Engineering',
  ],

  Cybersecurity: [
    'Network Security',
    'Web Security',
    'Penetration Testing',
    'Ethical Hacking',
    'Incident Response',
    'Threat Modeling',
    'Cryptography',
    'Security Auditing',
    'OWASP Top 10',
  ],

  'Mobile App Development': [
    'Mobile UI Design',
    'Android Development',
    'iOS Development',
    'Cross-Platform Development',
    'App Performance Optimization',
    'API Integration',
    'Mobile Security',
    'App Deployment',
  ],

  'Web Development': [
    'HTML',
    'CSS',
    'JavaScript',
    'Frontend Frameworks',
    'Backend APIs',
    'Authentication',
    'Web Performance',
    'SEO Basics',
    'Accessibility',
  ],

  'Game Development': [
    'Game Programming',
    'Game Engines',
    'Gameplay Mechanics',
    'Physics Simulation',
    'Game AI',
    'Level Design',
    'Rendering Pipelines',
    'Optimization',
  ],

  'Embedded Systems & IoT': [
    'Embedded C/C++',
    'Microcontrollers',
    'Firmware Development',
    'RTOS',
    'Hardware Interfaces',
    'IoT Protocols',
    'Sensor Integration',
    'Low-Power Design',
  ],

  'Electrical & Electronics Engineering': [
    'Circuit Design',
    'Analog Electronics',
    'Digital Electronics',
    'Power Systems',
    'Control Systems',
    'Signal Processing',
    'PCB Design',
  ],

  'Mechanical Engineering': [
    'Mechanical Design',
    'Thermodynamics',
    'Fluid Mechanics',
    'Manufacturing Processes',
    'CAD Modeling',
    'Finite Element Analysis',
    'Quality Control',
  ],

  'Civil Engineering': [
    'Structural Analysis',
    'Construction Planning',
    'AutoCAD',
    'Project Estimation',
    'Site Management',
    'Geotechnical Engineering',
    'Building Codes',
  ],

  'Robotics & Automation': [
    'Robotics Programming',
    'Control Systems',
    'PLC Programming',
    'Industrial Automation',
    'Sensors & Actuators',
    'Mechatronics',
    'Robot Kinematics',
  ],

  'VLSI & Semiconductor': [
    'Digital Design',
    'Analog Design',
    'VLSI Architecture',
    'Verilog / VHDL',
    'Physical Design',
    'Timing Analysis',
    'Semiconductor Fabrication',
  ],

  'Business & Management': [
    'Business Strategy',
    'Operations Management',
    'Leadership',
    'Decision Making',
    'Stakeholder Management',
    'Business Planning',
  ],

  'Finance & Accounting': [
    'Financial Analysis',
    'Accounting Principles',
    'Budgeting',
    'Auditing',
    'Risk Management',
    'Financial Modeling',
    'Taxation',
  ],

  'Marketing & Sales': [
    'Digital Marketing',
    'SEO / SEM',
    'Content Marketing',
    'Brand Strategy',
    'Market Research',
    'Sales Strategy',
    'Customer Acquisition',
  ],

  'Human Resources': [
    'Talent Acquisition',
    'Employee Relations',
    'Performance Management',
    'HR Analytics',
    'Labor Laws',
    'Organizational Development',
  ],

  'Operations & Supply Chain': [
    'Supply Chain Management',
    'Logistics',
    'Inventory Management',
    'Procurement',
    'Process Optimization',
    'Vendor Management',
  ],

  'Product Management': [
    'Product Strategy',
    'Roadmapping',
    'User Research',
    'Requirement Gathering',
    'Stakeholder Communication',
    'Product Analytics',
  ],

  'Project Management': [
    'Project Planning',
    'Risk Management',
    'Agile Methodologies',
    'Scrum',
    'Resource Management',
    'Delivery Management',
  ],

  'Business Analysis': [
    'Requirement Analysis',
    'Process Modeling',
    'Stakeholder Analysis',
    'Documentation',
    'Gap Analysis',
  ],

  'UI / UX Design': [
    'User Research',
    'Wireframing',
    'Prototyping',
    'Usability Testing',
    'Design Systems',
    'Interaction Design',
  ],

  'Graphic Design': [
    'Visual Design',
    'Typography',
    'Brand Identity',
    'Illustration',
    'Design Tools',
  ],

  'Product Design': [
    'Design Thinking',
    'Product Research',
    'Prototyping',
    'Usability Engineering',
    'Industrial Design',
  ],

  'Animation & Multimedia': [
    '2D Animation',
    '3D Animation',
    'Motion Graphics',
    'Storyboarding',
    'Video Editing',
  ],

  'Content & Media': [
    'Content Writing',
    'Editing',
    'Content Strategy',
    'Video Production',
    'Media Planning',
  ],

  'Healthcare & Medical': [
    'Clinical Knowledge',
    'Medical Research',
    'Patient Care',
    'Healthcare Analytics',
    'Medical Documentation',
  ],

  Pharmacy: [
    'Pharmacology',
    'Drug Safety',
    'Regulatory Compliance',
    'Clinical Trials',
    'Pharmaceutical Research',
  ],

  Biotechnology: [
    'Molecular Biology',
    'Genetic Engineering',
    'Bioinformatics',
    'Lab Techniques',
    'Bioprocessing',
  ],

  'Life Sciences': [
    'Biological Research',
    'Clinical Studies',
    'Laboratory Analysis',
    'Scientific Writing',
  ],

  'Education & Teaching': [
    'Curriculum Design',
    'Teaching Methodologies',
    'Assessment Design',
    'E-Learning Tools',
    'Academic Research',
  ],

  'Research & Development': [
    'Research Methodology',
    'Experimental Design',
    'Data Interpretation',
    'Innovation Management',
  ],

  'Law & Legal Studies': [
    'Legal Research',
    'Contract Drafting',
    'Compliance',
    'Corporate Law',
    'Litigation Support',
  ],

  'Public Policy & Governance': [
    'Policy Analysis',
    'Governance Frameworks',
    'Public Administration',
    'Regulatory Analysis',
  ],

  Economics: [
    'Economic Modeling',
    'Macroeconomics',
    'Microeconomics',
    'Policy Evaluation',
    'Data Analysis',
  ],

  Psychology: [
    'Behavioral Analysis',
    'Clinical Assessment',
    'Counseling',
    'Psychological Testing',
    'Research Methods',
  ],

  'Social Sciences': [
    'Social Research',
    'Qualitative Analysis',
    'Quantitative Analysis',
    'Policy Research',
  ],

  'Environmental Studies & Sustainability': [
    'Environmental Impact Assessment',
    'Sustainability Strategy',
    'Climate Policy',
    'Renewable Energy',
    'Environmental Compliance',
  ],
} as const;

export type TopSkillByDomain<D extends DomainIndustry> = (typeof TOP_SKILLS_BY_DOMAIN)[D][number];

export const YEARS_OF_EXPERIENCE = [
  { value: '0', label: 'Fresher (0 years)' },
  { value: '0-1', label: '0–1 years' },
  { value: '1-2', label: '1–2 years' },
  { value: '2-3', label: '2–3 years' },
  { value: '3-5', label: '3–5 years' },
  { value: '5-7', label: '5–7 years' },
  { value: '7-10', label: '7–10 years' },
  { value: '10+', label: '10+ years' },
] as const;

export type YearsOfExperience = (typeof YEARS_OF_EXPERIENCE)[number]['value'];

export const COUNTRY_OPTIONS = Object.entries(countries.getNames('en', { select: 'official' })).map(
  ([code, name]) => ({
    value: code,
    label: name,
  }),
);

export type CountryOption = (typeof COUNTRY_OPTIONS)[number];

export const EXPERIENCE_LEVELS = [
  'Internship',
  'Entry Level',
  'Junior (1-3 years)',
  'Mid-Level (3-5 years)',
  'Senior (5-8 years)',
  'Lead / Staff (8+ years)',
  'Executive (C-Suite / VP)',
] as const;

export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

export const ORGANIZATION_SIZES = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees',
] as const;

export type OrganizationSize = (typeof ORGANIZATION_SIZES)[number];
