import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    fontSize: 14,
    colorPrimary: "#615fff",
    colorInfo: "#615fff",
    borderRadiusLG: 12,
    fontSizeLG: 14,
    lineWidth: 2,
    fontFamily: '"Rubik", sans-serif',
    colorBgSpotlight: '#615fff',
    controlHeightLG: 48,
  },
  components: {
    Radio: {
      radioSize: 20,
      dotSize: 8
    },
    Button: {
      onlyIconSizeLG: 24,
      borderRadiusLG: 16,
      defaultBg: '#FFFFFF',
      defaultHoverBorderColor: '#FAFAFA',
      defaultHoverColor: '',
      colorBgContainerDisabled: '#B0AFFF',
      colorTextDisabled: '#FFFFFF',
    },
    Tag: {
      borderRadiusSM: 16,
    }
  }
};

