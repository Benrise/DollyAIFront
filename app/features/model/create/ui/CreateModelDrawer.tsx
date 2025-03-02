import { Drawer} from 'antd';
import { useState } from 'react';
import { Button, Input, Form, message, Upload, Typography, Space  } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { HighlightedText } from '@/app/shared/highlighted-text';

const { Text, Paragraph } = Typography;
const { Dragger } = Upload;


interface CreateModelDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CreateModelDrawer: React.FC<CreateModelDrawerProps> = ({ open, onClose }) => {
  const [modelName, setModelName] = useState('');
  const [fileList, setFileList] = useState<any[]>([]);

  const handleSubmit = async () => {
    const formData = new FormData();
    
    fileList.forEach((file) => {
      formData.append('images', file.originFileObj);
    });
    formData.append('name', modelName);

    const res = await fetch('/api/create-model', {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    
    if (data?.message) {
      message.success(data.message);
    } else {
      message.error('Error creating model');
    }
  };

  const uploadProps = {
    beforeUpload: (file: any) => {
      if (fileList.length >= 15) {
        message.error('You can only upload up to 15 files.');
        return false;
      }
      return true;
    },
    onChange: (info: any) => {
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
      <Form onFinish={handleSubmit} layout="vertical">
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
        <Space direction="vertical" size="middle" className='bg-indigo-50 border-2 border-indigo-400 rounded-xl p-6 mb-6 w-full'>
          <Paragraph>
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
          <Paragraph>
            The more <HighlightedText>diverse your</HighlightedText> pictures are, the <HighlightedText>more realistic</HighlightedText> and <HighlightedText>accurate</HighlightedText> the result.
          </Paragraph>
        </Space>
        <Form.Item>
          <div className="flex gap-2">
            <Button block type="default" htmlType="button" size='large' onClick={onClose}>
              Cancel
            </Button>
            <Button block type="primary" htmlType="submit" size='large'>
              Create Model
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  );
}
