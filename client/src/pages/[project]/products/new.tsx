import Input from '../../../components/input'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import Button from '../../../components/button'
import { FieldValues, useForm } from 'react-hook-form'
import React from 'preact/compat'
import uploadImage from '../../../lib/upload-image'
import request from '../../../lib/request'
import { useNavigate, useParams, useRevalidator } from 'react-router-dom'
import { getProjectFromSlug } from '../../../lib/projects'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

function NewProduct() {
  const { register, handleSubmit } = useForm()
  const [images, setImages] = React.useState<{ file: File }[]>([])
  const [submitting, setSubmitting] = React.useState(false)

  const { project } = useParams()
  const navigate = useNavigate()
  const { revalidate } = useRevalidator()

  async function submit(data: FieldValues) {
    if (submitting) {
      return
    }

    setSubmitting(true)
    try {
      const { url } = await uploadImage(images[0].file, 720)

      const { data: res } = await request.post('/products', {
        ...data,
        project: getProjectFromSlug(project!)?._id,
        image: url,
      })

      setSubmitting(false)
      revalidate()
      navigate(`/${project}/products/${res._id}`)
    } catch (err) {
      setSubmitting(false)
      console.error(err)
    }
  }

  return (
    <>
      <header className="border-b border-zinc-200 dark:border-neutral-700 text-zinc-500 pb-3 p-2 h-[48px] flex items-center">
        Add new product
      </header>

      <form className="p-2" onSubmit={handleSubmit(submit)}>
        {/* @ts-ignore */}
        <FilePond
          maxFiles={1}
          files={images}
          name="image"
          acceptedFileTypes={['image/*']}
          onupdatefiles={setImages}
        />

        <label>
          Title
          <Input {...register('title', { required: true })} />
        </label>

        <div className="flex gap-3 mt-2">
          <label className="flex-1">
            Price
            <Input
              type="number"
              {...register('price', { valueAsNumber: true, required: true })}
            />
            <small className="text-zinc-500">Currency is GHS</small>
          </label>

          <label className="flex-1">
            Quantity
            <Input
              type="number"
              {...register('quantity', { valueAsNumber: true, required: true })}
            />
          </label>
        </div>

        <div className="mt-3">
          <Button disabled={submitting}>
            {submitting ? 'Submitting…' : 'Save'}
          </Button>
        </div>
      </form>
    </>
  )
}

export default NewProduct
