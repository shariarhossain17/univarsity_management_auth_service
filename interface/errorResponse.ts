import { genericError } from './errorInterFace'

type IerrorResponse = {
  status: number
  message: string
  error: genericError[]
}

export default IerrorResponse
