// Contact details, shared by the hero, contact section and footer.
// The role and the availability line are translated: see contact.* in i18n/locales.
export const contact = {
  name: 'Aaron Campos',
  email: 'campos.aaron.15@gmail.com',
  location: 'Managua, Nicaragua',
  github: 'https://github.com/camposAaron',
  linkedin: 'https://www.linkedin.com/in/josu%C3%A9-aaron-campos-a585371a8/',
  // WhatsApp number in international format, digits only (for example 505 followed by the 8-digit number).
  // While empty, the WhatsApp link stays hidden.
  whatsapp: '',
}

export const whatsappUrl = contact.whatsapp ? `https://wa.me/${contact.whatsapp}` : ''
