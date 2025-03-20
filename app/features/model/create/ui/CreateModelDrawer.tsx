import { useState } from 'react';
import { Drawer, Button, Input, Form, Upload, Typography, Space, Select, Tooltip, Alert } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { HighlightedText } from '@/app/shared/ui/highlighted-text';
import { useCreateModelMutation } from '../hooks';
import { toast } from 'sonner';
import { UploadFile, UploadChangeParam, UploadProps  } from 'antd/lib/upload';
import { useUserContext } from '@/app/providers/UserProvider';

const { Text, Paragraph } = Typography;
const { Dragger } = Upload;


interface CreateModelDrawerProps {
  open: boolean;
  onClose: () => void;
  onModelCreated: () => void;
}

export const CreateModelDrawer: React.FC<CreateModelDrawerProps> = ({ open, onClose, onModelCreated }) => {
  const MIN_FILE_COUNT = 10;
  const MAX_FILE_COUNT = 15;
  const MAX_SIZE_MB = 5;

  const [modelName, setModelName] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [gender, setGender] = useState<'man' | 'female'>('man');
  const [form] = Form.useForm();
  const { user } = useUserContext();

  const resetForm = () => {
    form.resetFields();
    setFileList([]);
  };
  const { createModelMutation, isCreatingModel } = useCreateModelMutation([onClose, onModelCreated, resetForm]);
  const handleSubmit = async () => {
    if (isCreatingModel) return;
    if (user?.models_left === 0) {
      toast.error('You have reached the maximum number of models!');
      return;
    };

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

  const uploadProps: UploadProps = {
    beforeUpload: (file: UploadFile) => {
      const fileSizeInMB = file.size! / 1024 / 1024;
  
      if (fileSizeInMB > MAX_SIZE_MB) {
        toast.error('File must be smaller than 5 MB!');
        file.error = new Error('File must be smaller than 5 MB!');
        file.status = 'error';
        return false;
      }
  
      return true
    },
    onChange: (info: UploadChangeParam ) => {
      setFileList(info.fileList);
    },
    fileList,
    multiple: true,
    maxCount: MAX_FILE_COUNT,
    listType: 'picture',
    onPreview: (file) => {
      if (file.originFileObj) {
        const imageUrl = URL.createObjectURL(file.originFileObj);
        window.open(imageUrl, '_blank');
      } else if (file.url) {
        window.open(file.url, '_blank');
      }
    },
    accept: 'image/*'
  }
  const hasErrorFiles = fileList.some((file) => file.status === 'error');

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
        <Form.Item>
          <Alert description={
                <Space direction="vertical" size="middle" className="w-full">
                  <Paragraph className="mb-0!">
                    To achieve maximum accuracy, it is recommended to{' '}
                    <HighlightedText>upload 10-15 photos.</HighlightedText> The{' '}
                    <HighlightedText>more</HighlightedText> pictures there are, the{' '}
                    <HighlightedText>better</HighlightedText> the neural network will be able to understand your{' '}
                    <HighlightedText>unique</HighlightedText> features.
                  </Paragraph>
                  <ul>
                    <li>
                      <Text>
                        <HighlightedText>•</HighlightedText> Use photos from different angles (front, side, half-turn).
                      </Text>
                    </li>
                    <li>
                      <Text>
                        <HighlightedText>•</HighlightedText> Include full-length and portrait shots.
                      </Text>
                    </li>
                    <li>
                      <Text>
                        <HighlightedText>•</HighlightedText> Add photos with different emotions (smile, serious expression, etc.).
                      </Text>
                    </li>
                  </ul>
                  <Paragraph className="mb-0!">
                    The more <HighlightedText>diverse your</HighlightedText> pictures are, the{' '}
                    <HighlightedText>more realistic</HighlightedText> and <HighlightedText>accurate</HighlightedText> the result.
                  </Paragraph>
                </Space>
              }
              type="info"
          />
        </Form.Item>
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
            <Tooltip title={fileList.length < MIN_FILE_COUNT || fileList.length > MAX_FILE_COUNT ? 'Please upload 10 to 15 photos!' : hasErrorFiles ? 'Uploaded photos have errors!' : ''}>
              <Button disabled={fileList.length < MIN_FILE_COUNT || hasErrorFiles} block type="primary" htmlType="submit" size='large' loading={isCreatingModel}>
                Create Model
              </Button>
            </Tooltip>
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
