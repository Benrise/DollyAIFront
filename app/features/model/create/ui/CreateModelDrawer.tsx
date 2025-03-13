import { useState } from 'react';
import { Drawer, Button, Input, Form, Upload, Typography, Space, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { HighlightedText } from '@/app/shared/ui/highlighted-text';
import { useCreateModelMutation } from '../hooks';
import { toast } from 'sonner';
import { UploadFile, UploadChangeParam  } from 'antd/lib/upload';

const { Text, Paragraph } = Typography;
const { Dragger } = Upload;


interface CreateModelDrawerProps {
  open: boolean;
  onClose: () => void;
  onModelCreated: () => void;
}

export const CreateModelDrawer: React.FC<CreateModelDrawerProps> = ({ open, onClose, onModelCreated }) => {
  const [modelName, setModelName] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [gender, setGender] = useState<'man' | 'female'>('man');
  const [form] = Form.useForm();

  const resetForm = () => {
    form.resetFields();
    setFileList([]);
  };

  const { createModelMutation, isCreatingModel } = useCreateModelMutation([onClose, onModelCreated, resetForm]);

  const handleSubmit = async () => {
    if (isCreatingModel) return;

    const formData = new FormData();
    
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append('train_photos', file.originFileObj);
      }
    });
    formData.append('name', modelName);
    formData.append('gender', gender);

    createModelMutation(formData);
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      const MAX_SIZE_MB = 5;
      const fileSizeInMB = file.size / 1024 / 1024;
  
      if (fileSizeInMB > MAX_SIZE_MB) {
        toast.error('File must be smaller than 5 MB!');
        return false;
      }
  
      return true
    },
    onChange: (info: UploadChangeParam ) => {
      setFileList(info.fileList);
    },
    fileList,
    multiple: true,
  };

  return (
    <Drawer
      title="Create a New Model"
      open={open}
      onClose={onClose}
      height="100vh"
      placement='bottom'
    >
      <Form onFinish={handleSubmit} form={form} layout="vertical">
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
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: 'Please select gender!' }]}
        >
          <Select
            value={gender}
            onChange={(value) => setGender(value)}
            placeholder="Select gender"
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' }
            ]}
            size='large'
          />
        </Form.Item>
        <Space direction="vertical" size="middle" className='bg-indigo-50 border-2 border-indigo-400 rounded-xl p-6 mb-6 w-full'>
          <Paragraph className='mb-0!'>
            To achieve maximum accuracy, it is recommended to <HighlightedText>upload 10-15 photos.</HighlightedText> The <HighlightedText>more</HighlightedText> pictures there are, the <HighlightedText>better</HighlightedText> the neural network will be able to understand your <HighlightedText>unique</HighlightedText> features.
          </Paragraph>
          <ul>
            <li>
              <Text><HighlightedText>•</HighlightedText> Use photos from different angles (front, side, half-turn).</Text>
            </li>
            <li>
              <Text><HighlightedText>•</HighlightedText> Include full-length and portrait shots.</Text>
            </li>
            <li>
              <Text><HighlightedText>•</HighlightedText> Add photos with different emotions (smile, serious expression, etc.).</Text>
            </li>
          </ul>
          <Paragraph className='mb-0!'>
            The more <HighlightedText>diverse your</HighlightedText> pictures are, the <HighlightedText>more realistic</HighlightedText> and <HighlightedText>accurate</HighlightedText> the result.
          </Paragraph>
        </Space>
        <Form.Item
          label="Upload Photos"
          rules={[{ required: true, message: 'Please upload between 10 to 15 photos!' }]}
        >
          <Dragger {...uploadProps}>
            <div className="p-6">
              <p className="ant-upload-drag-icon">
                <UploadOutlined size={48} />
              </p>
              <Text type="secondary">Upload (10-15 photos)</Text>
            </div>
          </Dragger>
        </Form.Item>
        <Form.Item>
          <div className="flex gap-2">
            <Button block type="default" htmlType="button" size='large' onClick={onClose}>
              Cancel
            </Button>
            <Button block type="primary" htmlType="submit" size='large' loading={isCreatingModel}>
              Create Model
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
