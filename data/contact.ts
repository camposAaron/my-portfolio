// Contact details and availability, shared by the hero, contact section and footer.
export const contact = {
  name: 'Aaron Campos',
  role: 'Software Engineer',
  email: 'campos.aaron.15@gmail.com',
  location: 'Managua, Nicaragua',
  // One availability line, used everywhere the page mentions it.
  status: 'Open to software engineering opportunities',
  github: 'https://github.com/camposAaron',
  linkedin: 'https://www.linkedin.com/in/josu%C3%A9-aaron-campos-a585371a8/',
  // WhatsApp number in international format, digits only (for example 505 followed by the 8-digit number).
  // While empty, the WhatsApp link stays hidden.
  whatsapp: '',
}

export const whatsappUrl = contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : ''
