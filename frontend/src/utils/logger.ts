type ErrorType = Error | unknown

export const logError = (message: string, error: ErrorType): void => {
  // En desarrollo, mostramos en consola
  if (process.env.NODE_ENV === 'development') {
    console.error(message, error)
  }

  // Aquí podrías agregar lógica para enviar errores a un servicio de logging
  // como Sentry, LogRocket, etc.
}
