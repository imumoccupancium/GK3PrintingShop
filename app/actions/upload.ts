'use server'

import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const b2 = new S3Client({
  endpoint: process.env.B2_ENDPOINT,
  region: process.env.B2_REGION,
  credentials: {
    accessKeyId: process.env.B2_APPLICATION_KEY_ID || '',
    secretAccessKey: process.env.B2_APPLICATION_KEY || '',
  },
  forcePathStyle: true, // Required for some S3 compatible providers like B2
})

export async function uploadToB2(formData: FormData) {
  const file = formData.get('file') as File
  if (!file) {
    return { success: false, error: 'No file provided' }
  }

  // Check if credentials are set
  if (!process.env.B2_APPLICATION_KEY_ID || !process.env.B2_APPLICATION_KEY) {
      return { success: false, error: 'Backblaze B2 credentials are not configured.' }
  }


  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    const key = `uploads/${Date.now()}-${file.name}`
    
    const parallelUploads3 = new Upload({
      client: b2,
      params: { 
        Bucket: process.env.B2_BUCKET_NAME, 
        Key: key, 
        Body: buffer,
        ContentType: file.type
      },
      queueSize: 4,
      partSize: 1024 * 1024 * 5,
      leavePartsOnError: false,
    })

    await parallelUploads3.done()

    // Generate a signed URL so the user can view the image even if the bucket is private
    const command = new GetObjectCommand({
      Bucket: process.env.B2_BUCKET_NAME,
      Key: key,
    })
    
    // Signed URL valid for 1 hour
    const signedUrl = await getSignedUrl(b2, command, { expiresIn: 3600 })

    return { success: true, url: signedUrl }
  } catch (error: any) {
    console.error('B2 Upload Error:', error)
    return { success: false, error: error.message }
  }
}
