"use client"

import { Upload, UploadFile, UploadProps } from 'antd'
import { useState } from 'react'
import { toast } from 'sonner'
import { UploadCloud } from 'lucide-react'

import { useUserContext } from '@/app/providers/UserProvider'
import { useCreateModelMutation } from '../hooks'
import { HighlightedText } from '@/app/shared/ui/highlighted-text'
import { Button } from '@/app/shared/ui/button'
import { Input } from '@/app/shared/ui/input'
import { Label } from '@/app/shared/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/shared/ui/select'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/app/shared/ui/drawer'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/shared/ui/tooltip"

const { Dragger } = Upload

interface CreateModelDrawerProps {
  open: boolean
  onClose: () => void
  onModelCreated: () => void
}

export const CreateModelDrawer: React.FC<CreateModelDrawerProps> = ({ 
  open, 
  onClose, 
  onModelCreated 
}) => {
  const MIN_FILE_COUNT = 10
  const MAX_FILE_COUNT = 15
  const MAX_SIZE_MB = 5

  const [modelName, setModelName] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const { user } = useUserContext()

  const resetForm = () => {
    setModelName('')
    setFileList([])
    setGender('male')
  }

  const { createModelMutation, isCreatingModel } = useCreateModelMutation([
    onClose, 
    onModelCreated, 
    resetForm
  ])

  const handleSubmit = async () => {
    if (isCreatingModel) return
    if (user?.models_left === 0) {
      toast.error('You have reached the maximum number of models!')
      return
    }
    if (fileList.length < MIN_FILE_COUNT || fileList.length > MAX_FILE_COUNT) {
      toast.error(`Please upload between ${MIN_FILE_COUNT} to ${MAX_FILE_COUNT} photos!`)
      return
    }
    const formData = new FormData()
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append('train_photos', file.originFileObj)
      }
    })
    formData.append('name', modelName)
    formData.append('gender', gender)

    createModelMutation(formData)
  }

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      const fileSizeInMB = file.size / 1024 / 1024
      if (fileSizeInMB > MAX_SIZE_MB) {
        toast.error(`File "${file.name}" must be smaller than ${MAX_SIZE_MB} MB!`)
        return Upload.LIST_IGNORE
      }
      return true
    },
    onChange: ({ fileList }) => {
      setFileList(fileList)
    },
    fileList,
    multiple: true,
    maxCount: MAX_FILE_COUNT,
    listType: 'picture',
    accept: 'image/*',
    onPreview: (file) => {
      const url = file.url || (file.originFileObj && URL.createObjectURL(file.originFileObj))
      if (url) window.open(url, '_blank')
    }
  }

  const hasErrorFiles = fileList.some((file) => file.status === 'error');
  const isSubmitDisabled = 
    fileList.length < MIN_FILE_COUNT || 
    fileList.length > MAX_FILE_COUNT || 
    !modelName ||
    fileList.some(file => file.status === 'error')

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="h-fit max-h-[95vh]!">
        <DrawerHeader>
          <DrawerTitle>Create a New Model</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 flex flex-col gap-6 overflow-y-auto">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Label htmlFor="model-name">Model Name</Label>
              <Input
                id="model-name"
                placeholder="Enter model name"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label htmlFor="gender">Gender</Label>
              <Select 
                value={gender}
                onValueChange={(value) => {
                    if (value === 'male' || value === 'female') {
                      setGender(value)
                    }
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-4 p-6 bg-popover border border-border rounded-2xl">
              <p>
                To achieve maximum accuracy, it is recommended to{' '}
                <HighlightedText>upload 10-15 photos.</HighlightedText> The{' '}
                <HighlightedText>more</HighlightedText> pictures there are, the{' '}
                <HighlightedText>better</HighlightedText> the neural network will be able to understand your{' '}
                <HighlightedText>unique</HighlightedText> features.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Use photos from different angles (front, side, half-turn)</li>
                <li>Include full-length and portrait shots</li>
                <li>Add photos with different emotions (smile, serious expression, etc.)</li>
              </ul>
              <p>
                The more <HighlightedText>diverse your</HighlightedText> pictures are, the{' '}
                <HighlightedText>more realistic</HighlightedText> and <HighlightedText>accurate</HighlightedText> the result.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Label>Upload Photos (10-15)</Label>
              <Dragger {...uploadProps} className="border-border">
                <div className="p-6 flex flex-col items-center gap-4">
                  <UploadCloud className="w-16 h-16 text-muted-foreground" />
                  <p className="font-medium text-foreground">Click or drag files to upload</p>
                  <p className="text-sm text-muted-foreground">
                    Upload between {MIN_FILE_COUNT}-{MAX_FILE_COUNT} photos (max {MAX_SIZE_MB}MB each)
                  </p>
                </div>
              </Dragger>
              <p className="text-sm text-muted-foreground">
                {fileList.length} files uploaded
              </p>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <DrawerClose className="w-full">
              <Button variant="outline" className="w-full" size="lg">
                Cancel
              </Button>
            </DrawerClose>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="w-full">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isSubmitDisabled || isCreatingModel}
                    isLoading={isCreatingModel}
                  >
                    Create Model
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {fileList.length < MIN_FILE_COUNT || fileList.length > MAX_FILE_COUNT ? 'Please upload 10 to 15 photos!' : hasErrorFiles ? 'Uploaded photos have errors!' : 'Model name is required!'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}