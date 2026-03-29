export type ContactFormData = {
  name?: string
  email?: string
  projectType?: string
  budget?: string
  message?: string
  /** Honeypot — doit rester vide */
  website?: string
}