import { Link, useRouteError } from 'react-router-dom'

class AppError extends Error {
  err: any

  constructor(message: string, err: any) {
    super(message)
    this.name = 'AppError'
    this.err = err
  }
}

function ErrorPage() {
  const { err } = useRouteError() as AppError

  return (
    <div className="p-2">
      <h1 className="font-bold">An Error Occurred</h1>
      <p>Erro code: {err.status}</p>

      {err.status === 401 && (
        <p>
          You may need to <Link class="underline" to="/login">login</Link>.
        </p>
      )}
    </div>
  )
}

export default ErrorPage
export { AppError }
