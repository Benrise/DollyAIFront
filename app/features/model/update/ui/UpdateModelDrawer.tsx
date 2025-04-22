"use client"

import { useState } from 'react'
import { useDeleteModelMutation, useUpdateModelMutation } from '@/app/features/model/create'
import { Button } from '@/app/shared/ui/button'
import { Input } from '@/app/shared/ui/input'
import { Label } from '@/app/shared/ui/label'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/app/shared/ui/drawer'
import { ProtectedImage } from '@/app/shared/ui/protected-image'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/shared/ui/alert-dialog'

interface IModel {
  id: number
  name: string
  cover: string
  is_train_failed: boolean
}

interface UpdateModelDrawerProps {
  open: boolean
  model: IModel
  onClose: () => void
  onAfterAction: () => void
}

export const UpdateModelDrawer: React.FC<UpdateModelDrawerProps> = ({ 
  open, 
  onClose, 
  model, 
  onAfterAction 
}) => {
  const [modelName, setModelName] = useState(model.name)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  
  const { updateModelMutation, isSendingUpdateRequest } = useUpdateModelMutation(() => onAfterAction())
  const { deleteModelMutation, isSendingDeleteRequest } = useDeleteModelMutation([() => onClose(), () => onAfterAction()])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    updateModelMutation({ model_id: model.id, name: modelName })
  }

  const handleDelete = async () => {
    setShowDeleteDialog(false)
    deleteModelMutation({ model_id: model.id })
  }

  return (
    <>
      <Drawer open={open} onOpenChange={onClose}>
        <DrawerContent className="h-[90vh]">
          <DrawerHeader>
            <DrawerTitle>Update Model</DrawerTitle>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="flex flex-col h-full px-4">
            <div className="flex flex-col h-full justify-between">
              <div className="flex flex-col gap-8">
                {model.is_train_failed && (
                  <div className="bg-destructive/15 text-destructive p-4 rounded-lg">
                    Training your model encountered an issue and failed to complete. This can happen due to various reasons, such as insufficient data, resource limitations, or unexpected errors during the process. Please try again later or contact support if the issue persists.
                  </div>
                )}
                
                <div className="flex flex-col gap-4">
                  <Label>Preview Image</Label>
                  <ProtectedImage 
                    preview={false} 
                    src={model.cover} 
                    fallback="/images/etc/spheric-vortex.png" 
                    width={128} 
                    height={128} 
                    className='max-w-[128px] max-h-[128px] object-cover object-top rounded-full'
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <Label htmlFor="model-name">Model Name</Label>
                  <Input
                    id="model-name"
                    placeholder="Enter model name"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                    required
                  />
                </div>

                <Button 
                  variant="destructive" 
                  size="lg" 
                  type="button"
                  onClick={() => setShowDeleteDialog(true)}
                  isLoading={isSendingDeleteRequest}
                >
                  Delete model
                </Button>
              </div>

              <div className="flex gap-4 py-6">
                <DrawerClose asChild>
                  <Button variant="outline" className="flex-1" size="lg">
                    Cancel
                  </Button>
                </DrawerClose>
                <Button 
                  className="flex-1" 
                  size="lg" 
                  type="submit"
                  isLoading={isSendingUpdateRequest || isSendingDeleteRequest}
                >
                  Save Model
                </Button>
              </div>
            </div>
          </form>
        </DrawerContent>
      </Drawer>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this model?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The model will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-destructive hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}