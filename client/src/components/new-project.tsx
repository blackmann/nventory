import React from 'preact/compat'
import Input from './input'
import Button from './button'
import { FieldValues, useForm } from 'react-hook-form'
import { createProject } from '../lib/projects'

function NewProject() {
  const [showForm, setShowForm] = React.useState(false)
  const { handleSubmit, register } = useForm()

  async function submit(data: FieldValues) {
    await createProject({ title: data.title })
    setShowForm(false)
  }

  if (showForm) {
    return (
      <form className="flex" onSubmit={handleSubmit(submit)}>
        <Input {...register('title', { required: true })} />
        <button className="material-symbols-rounded text-blue-500 hover:bg-zinc-200 rounded-md">
          done
        </button>
        <button
          className="material-symbols-rounded text-zinc-500 hover:bg-zinc-200 rounded-md"
          onClick={() => setShowForm(false)}
          type="button"
        >
          close
        </button>
      </form>
    )
  }

  return (
    <Button
      className="bg-transparent text-zinc-500 hover:bg-zinc-200"
      onClick={() => setShowForm(true)}
    >
      <span className="material-symbols-rounded">add</span> Add new project
    </Button>
  )
}

export default NewProject
