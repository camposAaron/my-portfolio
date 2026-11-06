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
    // Hidden until it has a description and recordings.
    id: 'autogestion-ai',
    name: 'Autogestion AI mode',
    public: false,
    videos: [],
  },
  {
    // Hidden until it has a description and recordings.
    id: 'fastgym',
    name: 'FastGym',
    public: false,
    videos: [],
  },
]

export const publicProjects = projects.filter((p) => p.public)
