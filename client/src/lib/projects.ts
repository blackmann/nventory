import { signal } from '@preact/signals'
import request from './request'
import slugify from './slugify'

interface Project {
  _id: string
  title: string
}

const projects = signal<Project[]>([])

async function loadProjects() {
  const { data } = await request.get('/projects')
  projects.value = data.data
}

async function createProject(data: { title: string }) {
  await request.post('/projects', data)
  await loadProjects()
}

function getProjectFromSlug(slug: string) {
  return projects.peek().find((project) => slugify(project.title) === slug)
}

export { projects, loadProjects, createProject, getProjectFromSlug }
