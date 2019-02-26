const dynamicBaseURL = window.location.hostname === 'localhost' ? process.env.BASE_API : window.location.protocol + '//' + window.location.host + '/ticket'
const ticketTitle = ''

export default {
  dynamicBaseURL,

  setTicketTitle(title) {
    this.ticketTitle = title
  },
  getTicketTitle() {
    return this.ticketTitle
  }
}
