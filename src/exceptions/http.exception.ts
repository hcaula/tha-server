class HttpException extends Error {
  status: number
  message: string
  value: any

  constructor(status: number, message: string, value: any) {
    super(message)
    this.status = status
    this.message = message
    this.value = value
  }
}

export default HttpException
