// Every project, public or not. Only projects marked `public: true` appear on the page;
// keep incomplete ones here with `public: false` until they have a description and recordings.
//
// Videos live in /public/projects/<folder>/. Each needs a poster (a still from the first
// second, same size as the video) so the page shows something before the video loads.

export interface ProjectVideo {
  /** Short title shown on the recording's tab and under the player. */
  title: string
  /** One sentence on what the recording shows. */
  description?: string
  src: string
  poster?: string
  /** Length as m:ss. */
  duration?: string
}

export interface Project {
  id: string
  name: string
  public: boolean
  /** One line under the name. */
  tagline?: string
  /** The main paragraph. */
  summary?: string
  /** A second, shorter paragraph that introduces the recordings. */
  context?: string
  features?: string[]
  stack?: string[]
  videos: ProjectVideo[]
}

export const projects: Project[] = [
  {
    id: 'autogestion',
    name: 'APS Autogestion',
    public: true,
    tagline: 'Employee self-service for everyday HR workflows.',
    summary:
      'APS Autogestion gives employees a central place to access payroll documents, request vacation or leave, and consult company policies. I worked on this platform using a stack that includes Vue.js, TypeScript, Express, PostgreSQL, AWS, and Kubernetes.',
    context:
      'The platform brings together employee tasks and administrative tools, including notifications and configurable report templates. The recordings below show the employee home, vacation workflows, and letter settings.',
    features: [
      'Payment receipts to download',
      'Vacation and leave requests',
      'Company policies to consult',
      'Notifications',
      'Configurable report templates',
    ],
    stack: ['Vue.js', 'TypeScript', 'Express', 'PostgreSQL', 'AWS', 'Kubernetes'],
    videos: [
      {
        title: 'Employee home and modules',
        description: 'An overview of the employee workspace and its main self-service modules.',
        src: '/projects/aut/profile.webm',
        poster: '/projects/aut/profile-poster.jpg',
        duration: '0:14',
      },
      {
        title: 'Vacation requests and approvals',
        description: 'A walkthrough of the vacation request and approval flow.',
        src: '/projects/aut/ptos.webm',
        poster: '/projects/aut/ptos-poster.jpg',
        duration: '0:53',
      },
      {
        title: 'Letter settings',
        description: 'A look at the administrative settings for employee letters.',
        src: '/projects/aut/letters.webm',
        poster: '/projects/aut/letters-poster.jpg',
        duration: '0:19',
      },
    ],
  },
  {
    id: 'fastgym',
    name: 'FastGym',
    public: true,
    tagline: 'Gym management, from the front desk to the cash count.',
    summary:
      'FastGym runs the day-to-day of a gym: members and memberships, payments, front-desk check-in, a point of sale, and cash register sessions. I built it as a multi-tenant web app with React, TypeScript, NestJS, Prisma, and PostgreSQL, and as an Electron edition that works offline with an embedded database.',
    context:
      'Each gym runs its own registers, plans, and staff roles. Every payment lands in an open cash session, which is counted and closed with a Z-report at the end of the shift. The recordings below show the dashboard, a sale at the point of sale, a new member with a first payment, and a check-in at the kiosk.',
    features: [
      'Members and membership plans',
      'Payments in multiple currencies',
      'Attendance kiosk with face recognition',
      'Point of sale with split payments',
      'Cash sessions with counts and Z-reports',
      'Reports with CSV export',
    ],
    stack: ['React', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'Electron'],
    videos: [
      {
        title: 'Dashboard and reports',
        description: 'Daily indicators, recent activity, and reports by membership, sales, and attendance.',
        src: '/projects/fg/dashboard.webm',
        poster: '/projects/fg/dashboard-poster.jpg',
        duration: '0:22',
      },
      {
        title: 'Point of sale',
        description: 'Opening a cash register and charging a sale in cash.',
        src: '/projects/fg/pos.webm',
        poster: '/projects/fg/pos-poster.jpg',
        duration: '0:33',
      },
      {
        title: 'New member and first payment',
        description: 'Registering a member and charging the first membership into the open register.',
        src: '/projects/fg/members.webm',
        poster: '/projects/fg/members-poster.jpg',
        duration: '0:40',
      },
      {
        title: 'Front-desk check-in',
        description: 'A manual check-in at the attendance kiosk, with the access result.',
        src: '/projects/fg/attendance.webm',
        poster: '/projects/fg/attendance-poster.jpg',
        duration: '0:13',
      },
    ],
  },
  {
    // Hidden until it has a description and recordings.
    id: 'autogestion-ai',
    name: 'Autogestion AI mode',
    public: false,
    videos: [],
  },
]

export const publicProjects = projects.filter((p) => p.public)
