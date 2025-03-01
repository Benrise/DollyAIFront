import { Drawer} from 'antd';
import { ModelForm } from '@/app/create-model/components';


interface CreateModelDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CreateModelDrawer: React.FC<CreateModelDrawerProps> = ({ open, onClose }) => {
  return (
    <Drawer
      title="Create a New Model"
      open={open}
      onClose={onClose}
      height="100vh"
      placement='bottom'
    >
      <ModelForm/>
    </Drawer>
  );
}
