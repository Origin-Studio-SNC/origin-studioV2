export type ChatMessage = {
  role: 'bot' | 'user'
  content: string
}

export type ChatStep = 'project-type' | 'tier' | 'delay' | 'contact' | 'success'

export type ChatSubmitStatus = 'idle' | 'loading' | 'error'
