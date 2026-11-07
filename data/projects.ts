// Every project, public or not. Only projects marked `public: true` appear on the page;
// keep incomplete ones here with `public: false` until they have a description and recordings.
//
// Text the visitor reads is written in English and Spanish ({ en, es }); the page shows the
// one matching the current language.
//
// Videos live in /public/projects/<folder>/. Each needs a poster (a still from the first
// second, same size as the video) so the page shows something before the video loads.

/** Text written in every language the site offers. */
export interface Localized {
  en: string
  es: string
}

export interface ProjectVideo {
  /** Short title shown on the recording's tab and under the player. */
  title: Localized
  /** One sentence on what the recording shows. */
  description?: Localized
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
  tagline?: Localized
  /** The main paragraph. */
  summary?: Localized
  /** A second, shorter paragraph that introduces the recordings. */
  context?: Localized
  features?: Localized[]
  stack?: string[]
  videos: ProjectVideo[]
}

export const projects: Project[] = [
  {
    id: 'autogestion',
    name: 'APS Autogestion',
    public: true,
    tagline: {
      en: 'Employee self-service for everyday HR workflows.',
      es: 'Autogestión para los trámites de RR. HH. del día a día.',
    },
    summary: {
      en: 'APS Autogestion gives employees a central place to access payroll documents, request vacation or leave, and consult company policies. I worked on this platform using a stack that includes Vue.js, TypeScript, Express, PostgreSQL, AWS, and Kubernetes.',
      es: 'APS Autogestion les da a los empleados un lugar central para consultar sus documentos de nómina, solicitar vacaciones o permisos y revisar las políticas de la empresa. Trabajé en esta plataforma con un stack que incluye Vue.js, TypeScript, Express, PostgreSQL, AWS y Kubernetes.',
    },
    context: {
      en: 'The platform brings together employee tasks and administrative tools, including notifications and configurable report templates. The recordings below show the employee home, vacation workflows, and letter settings.',
      es: 'La plataforma reúne las tareas del empleado y las herramientas administrativas, incluidas notificaciones y plantillas de reportes configurables. Las grabaciones muestran el inicio del empleado, el flujo de vacaciones y la configuración de cartas.',
    },
    features: [
      { en: 'Payment receipts to download', es: 'Colillas de pago para descargar' },
      { en: 'Vacation and leave requests', es: 'Solicitudes de vacaciones y permisos' },
      { en: 'Company policies to consult', es: 'Políticas de la empresa para consultar' },
      { en: 'Notifications', es: 'Notificaciones' },
      { en: 'Configurable report templates', es: 'Plantillas de reportes configurables' },
    ],
    stack: ['Vue.js', 'TypeScript', 'Express', 'PostgreSQL', 'AWS', 'Kubernetes'],
    videos: [
      {
        title: { en: 'Employee home and modules', es: 'Inicio del empleado y módulos' },
        description: {
          en: 'An overview of the employee workspace and its main self-service modules.',
          es: 'Un recorrido por el espacio del empleado y sus principales módulos de autogestión.',
        },
        src: '/projects/aut/profile.webm',
        poster: '/projects/aut/profile-poster.jpg',
        duration: '0:14',
      },
      {
        title: { en: 'Vacation requests and approvals', es: 'Solicitud y aprobación de vacaciones' },
        description: {
          en: 'A walkthrough of the vacation request and approval flow.',
          es: 'El flujo completo de solicitud y aprobación de vacaciones.',
        },
        src: '/projects/aut/ptos.webm',
        poster: '/projects/aut/ptos-poster.jpg',
        duration: '0:53',
      },
      {
        title: { en: 'Letter settings', es: 'Configuración de cartas' },
        description: {
          en: 'A look at the administrative settings for employee letters.',
          es: 'La configuración administrativa de las cartas para empleados.',
        },
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
    tagline: {
      en: 'Gym management, from the front desk to the cash count.',
      es: 'Gestión de gimnasios, de la recepción al arqueo de caja.',
    },
    summary: {
      en: 'FastGym runs the day-to-day of a gym: members and memberships, payments, front-desk check-in, a point of sale, and cash register sessions. I built it as a multi-tenant web app with React, TypeScript, NestJS, Prisma, and PostgreSQL, and as an Electron edition that works offline with an embedded database.',
      es: 'FastGym maneja el día a día de un gimnasio: socios y membresías, pagos, registro de entrada en recepción, punto de venta y sesiones de caja. Lo construí como una aplicación web multi-tenant con React, TypeScript, NestJS, Prisma y PostgreSQL, y como una edición en Electron que funciona sin conexión con una base de datos embebida.',
    },
    context: {
      en: 'Each gym runs its own registers, plans, and staff roles. Every payment lands in an open cash session, which is counted and closed with a Z-report at the end of the shift. The recordings below show the dashboard, a sale at the point of sale, a new member with a first payment, and a check-in at the kiosk.',
      es: 'Cada gimnasio tiene sus propias cajas, planes y roles de personal. Cada pago entra en una sesión de caja abierta, que se cuenta y se cierra con un reporte Z al final del turno. Las grabaciones muestran el dashboard, una venta en el punto de venta, un socio nuevo con su primer pago y un registro de entrada en el kiosco.',
    },
    features: [
      { en: 'Members and membership plans', es: 'Socios y planes de membresía' },
      { en: 'Payments in multiple currencies', es: 'Pagos en varias monedas' },
      { en: 'Attendance kiosk with face recognition', es: 'Kiosco de asistencia con reconocimiento facial' },
      { en: 'Point of sale with split payments', es: 'Punto de venta con pagos divididos' },
      { en: 'Cash sessions with counts and Z-reports', es: 'Sesiones de caja con arqueos y reportes Z' },
      { en: 'Reports with CSV export', es: 'Reportes con exportación a CSV' },
    ],
    stack: ['React', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'Electron'],
    videos: [
      {
        title: { en: 'Dashboard and reports', es: 'Dashboard y reportes' },
        description: {
          en: 'Daily indicators, recent activity, and reports by membership, sales, and attendance.',
          es: 'Indicadores del día, actividad reciente y reportes por membresía, ventas y asistencia.',
        },
        src: '/projects/fg/dashboard.webm',
        poster: '/projects/fg/dashboard-poster.jpg',
        duration: '0:22',
      },
      {
        title: { en: 'Point of sale', es: 'Punto de venta' },
        description: {
          en: 'Opening a cash register and charging a sale in cash.',
          es: 'Apertura de caja y cobro de una venta en efectivo.',
        },
        src: '/projects/fg/pos.webm',
        poster: '/projects/fg/pos-poster.jpg',
        duration: '0:33',
      },
      {
        title: { en: 'New member and first payment', es: 'Socio nuevo y primer pago' },
        description: {
          en: 'Registering a member and charging the first membership into the open register.',
          es: 'Registro de un socio y cobro de su primera membresía en la caja abierta.',
        },
        src: '/projects/fg/members.webm',
        poster: '/projects/fg/members-poster.jpg',
        duration: '0:40',
      },
      {
        title: { en: 'Front-desk check-in', es: 'Registro de entrada en recepción' },
        description: {
          en: 'A manual check-in at the attendance kiosk, with the access result.',
          es: 'Un registro manual en el kiosco de asistencia, con el resultado del acceso.',
        },
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
