'use client'

import React, { useState, useCallback } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Upload, X, CheckCircle2, AlertCircle, FileImage, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'
import { uploadToB2 } from '@/app/actions/upload'
import { cn } from '@/lib/utils'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        toast.error('Please select an image file.')
        return
      }
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      if (!droppedFile.type.startsWith('image/')) {
        toast.error('Please drop an image file.')
        return
      }
      setFile(droppedFile)
      setPreview(URL.createObjectURL(droppedFile))
    }
  }

  const clearFile = () => {
    setFile(null)
    setPreview(null)
    setUploadProgress(0)
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(10)

    const formData = new FormData()
    formData.append('file', file)

    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => (prev < 90 ? prev + 10 : prev))
    }, 200)

    try {
      const result = await uploadToB2(formData)
      clearInterval(interval)
      setUploadProgress(100)

      if (result.success) {
        toast.success('Image uploaded successfully!')
        console.log('Uploaded URL:', result.url)

      } else {
        toast.error(result.error || 'Upload failed.')
      }
    } catch (error) {
      clearInterval(interval)
      toast.error('An unexpected error occurred.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Header />
      
      <section className="flex-grow flex items-center justify-center p-6 mt-20 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
        </div>

        <Card className="w-full max-w-2xl border-none shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl animate-in fade-in zoom-in duration-500">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Image Upload
            </CardTitle>
            <CardDescription className="text-lg">
              Securely upload your images to Backblaze B2 storage
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {!preview ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "relative border-2 border-dashed rounded-3xl p-12 transition-all duration-300 flex flex-col items-center justify-center space-y-4 group",
                  isDragging 
                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 scale-[1.02]" 
                    : "border-slate-200 dark:border-slate-800 hover:border-blue-400 hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
                )}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FileImage className="w-10 h-10 text-slate-400 dark:text-slate-500" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
                    Click or drag & drop to upload
                  </p>
                  <p className="text-sm text-slate-500">
                    PNG, JPG, WebP up to 10MB
                  </p>
                </div>
                <Button variant="outline" className="mt-4 rounded-full px-8 pointer-events-none">
                  Select File
                </Button>
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-video bg-slate-100 dark:bg-slate-800">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                  {!isUploading && (
                    <button
                      onClick={clearFile}
                      className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors backdrop-blur-md"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-slate-600 dark:text-slate-400">Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2 rounded-full" />
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="flex-1 h-12 text-lg rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
                  >
                    {isUploading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      'Start Upload'
                    )}
                  </Button>
                  {!isUploading && (
                    <Button
                      variant="outline"
                      onClick={clearFile}
                      className="h-12 rounded-xl px-6 border-slate-200 dark:border-slate-800"
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-4 py-4 text-xs text-slate-400 uppercase tracking-widest font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> End-to-end Encrypted
              </span>
              <span className="w-1 h-1 bg-slate-300 rounded-full" />
              <span>Backblaze B2 Powered</span>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </main>
  )
}
