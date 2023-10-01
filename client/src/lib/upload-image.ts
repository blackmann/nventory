
import axios from 'redaxios'
import imageCompression from 'browser-image-compression'

const CLOUNDINARY_URL = import.meta.env.VITE_APP_CLOUDINARY_URL as string
const UPLOAD_PRESET = import.meta.env.VITE_APP_UPLOAD_PRESET as string

export default async function uploadImage(file: File, maxWidth: number) {
  const formData = new FormData()

  if (maxWidth) {
    const uploadFile = await imageCompression(file, { maxWidthOrHeight: maxWidth })
    formData.append('file', uploadFile)
  } else {
    formData.append('file', file)
  }

  formData.append('upload_preset', UPLOAD_PRESET)

  try {
    const res = await axios.post(CLOUNDINARY_URL, formData)

    const data = res.data

    return {
      thumbnail: data.eager[0].secure_url,
      type: 'image',
      url: data.secure_url,
    }
  } catch (err) {
    throw Error('Failed to upload image')
  }
}