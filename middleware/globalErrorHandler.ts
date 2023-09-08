import { ErrorRequestHandler } from 'express'
import config from '../config'
import ApiError from '../errors/ApiError'
import handleValidationError from '../errors/handleValidationError'
import { genericError } from '../interface/errorInterFace'
import { errorLogger } from '../shared/logger'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? console.log('global error handler', error)
    : errorLogger.error('globalErrorHandler', error)
  let statusCode = 500
  let message = 'something went wrong'
  let errorMessages: genericError[] = []

  if (error?.name == 'ValidationError') {
    const simplifyError = handleValidationError(error)
    statusCode = simplifyError.status
    message = simplifyError.message
    errorMessages = simplifyError.error
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    status: false,
    message,
    errorMessages,
    stack: config.env == 'production' ? undefined : error?.stack,
  })
  next()
}

export default globalErrorHandler
