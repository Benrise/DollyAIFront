import { IModel } from '@/app/entities/model';
import { ProtectedImage } from '@/app/shared/ui/protected-image';
import { Drawer, Button, Form, Input, Modal, Alert } from 'antd';
import { useState } from 'react';
import { useDeleteModelMutation, useUpdateModelMutation } from '@/app/features/model/create';

interface UpdateModelDrawerProps {
    open: boolean;
    model: IModel
    onClose: () => void;
    onAfterAction: () => void
  }


  export const UpdateModelDrawer: React.FC<UpdateModelDrawerProps> = ({ open, onClose, model, onAfterAction }) => {
    const [modelName, setModelName] = useState("");
    const [modal, contextHolder] = Modal.useModal();
    const { updateModelMutation, isSendingUpdateRequest } = useUpdateModelMutation(() => onAfterAction());
    const { deleteModelMutation, isSendingDeleteRequest } = useDeleteModelMutation([() => onClose(), () => onAfterAction()]);
    const [form] = Form.useForm();

    const handleSubmit = async (values: { name: string }) => {
        updateModelMutation({ model_id: model.id, name: values.name });
    }

    const handleDelete = async () => {
        modal.confirm({
            title: "Are you sure you want to delete this model?",
            content: "This action cannot be undone.",
            okText: "Delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk: () => deleteModelMutation({model_id: model.id}),
        });
    }

    return (
        <Drawer
          title={"Update Model"}
          open={open}
          onClose={onClose}
          height="100vh"
          placement='bottom'
        >
          <Form style={{ height: "100%" }} onFinish={handleSubmit} form={form} layout="vertical" initialValues={{ name: model.name }}>
            <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col">
                    {model.is_train_failed && <Form.Item>
                        <Alert message="Training your model encountered an issue and failed to complete. This can happen due to various reasons, such as insufficient data, resource limitations, or unexpected errors during the process. Please try again later or contact support if the issue persists." type="error"/>
                    </Form.Item>}
                    <Form.Item label="Preview Image">
                        <ProtectedImage preview={false} src={model.cover} fallback="/images/etc/spheric-vortex.png" width={128} height={128} className='max-w-[128px] max-h-[128px] object-cover object-top rounded-full'/>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Model Name"
                        rules={[{ required: true, message: 'Please enter the model name!' }]}
                    >
                        <Input
                            placeholder="Enter model name"
                            value={modelName}
                            onChange={(e) => setModelName(e.target.value)}
                            size='large'
                        />
                    </Form.Item>
                    <Form.Item label="Other">
                        {contextHolder}
                        <Button danger size='large' onClick={handleDelete} loading={isSendingDeleteRequest}>Delete model</Button>
                    </Form.Item>
                </div>
                <Form.Item>
                <div className="flex gap-2">
                    <Button block type="default" htmlType="button" size='large' onClick={onClose}>
                    Cancel
                    </Button>
                    <Button block type="primary" htmlType="submit" size='large' loading={isSendingUpdateRequest || isSendingDeleteRequest}>
                    Save Model
                    </Button>
                </div>
                </Form.Item>
            </div>
          </Form>
        </Drawer>
      );
  }