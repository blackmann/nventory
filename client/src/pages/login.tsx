import { FieldValues, useForm } from 'react-hook-form'
import Button from '../components/button'
import Input from '../components/input'
import React from 'preact/compat'
import request from '../lib/request'

function Login() {
  const { handleSubmit, register } = useForm()
  const [submitting, setSubmitting] = React.useState(false)

  async function login(data: FieldValues) {
    if (submitting) {
      return
    }

    setSubmitting(true)
    try {
      const { data: res } = await request.post('/login', data)
      localStorage.setItem('auth', JSON.stringify(res))
      setSubmitting(false)
      window.location.href = '/'
    } catch (err) {
      setSubmitting(false)
      console.error(err)
    }
  }

  return (
    <div className="flex justify-center">
      <form className="mt-[20vh] bg-zinc-300 bg-opacity-50 p-2 rounded-lg w-[20rem]"
      onSubmit={handleSubmit(login)}>
        <h1 class="font-bold text-xl mb-4">Login</h1>

        <label className="mb-2 block">
          Username
          <Input {...register('username', { required: true })} />
        </label>

        <label className="block">
          Password
          <Input
            type="password"
            {...register('password', { required: true })}
          />
        </label>

        <div className="my-2">
          <Button disabled={submitting}>
            {submitting ? 'Please wait…' : 'Login'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login
