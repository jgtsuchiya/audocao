export const theme = {
  token: {
    colorPrimary: '#1890ff', // Azul principal
    colorSuccess: '#52c41a', // Verde para sucesso
    colorWarning: '#fa8c16', // Laranja (cor de gato)
    colorError: '#ff4d4f', // Vermelho para erros
    colorInfo: '#1890ff', // Azul informativo
    colorTextBase: '#262626',
    colorBgBase: '#ffffff',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: 14,
    borderRadius: 8,
    controlHeight: 44,
  },
  components: {
    Button: {
      controlHeight: 44,
      fontSize: 16,
      borderRadius: 8,
      primaryShadow: '0 2px 8px rgba(24, 144, 255, 0.15)',
    },
    Input: {
      controlHeight: 44,
      fontSize: 14,
      borderRadius: 8,
    },
    Select: {
      controlHeight: 44,
      fontSize: 14,
      borderRadius: 8,
    },
    Card: {
      borderRadius: 12,
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
    },
    Tag: {
      borderRadius: 16,
      fontSize: 12,
    },
  },
};
