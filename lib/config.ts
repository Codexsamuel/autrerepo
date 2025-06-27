// Configuration des modules DAVY Trading Advisor
export const config = {
  ai: {
    openai: {
      enabled: false,
      apiKey: process.env.OPENAI_API_KEY
    },
    gemini: {
      enabled: false,
      apiKey: process.env.GEMINI_API_KEY
    },
    huggingface: {
      enabled: false,
      apiKey: process.env.HUGGINGFACE_API_KEY
    }
  },
  payments: {
    stripe: {
      enabled: false,
      secretKey: process.env.STRIPE_SECRET_KEY,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    },
    cinetpay: {
      enabled: false,
      apiKey: process.env.CINETPAY_API_KEY,
      siteId: process.env.CINETPAY_SITE_ID
    }
  },
  bots: {
    telegram: {
      enabled: false,
      token: process.env.TELEGRAM_BOT_TOKEN,
      chatId: process.env.TELEGRAM_CHAT_ID
    },
    discord: {
      enabled: false,
      token: process.env.DISCORD_BOT_TOKEN,
      clientId: process.env.DISCORD_CLIENT_ID
    }
  },
  workflows: {
    n8n: {
      enabled: false,
      baseUrl: process.env.N8N_BASE_URL || 'http://localhost:5678',
      apiKey: process.env.N8N_API_KEY
    }
  },
  trading: {
    metaApi: {
      enabled: false,
      token: process.env.META_API_TOKEN,
      accountId: process.env.META_API_ACCOUNT_ID
    },
    oneWin: {
      enabled: false,
      apiKey: process.env.ONE_WIN_API_KEY,
      secretKey: process.env.ONE_WIN_SECRET_KEY
    }
  }
};

export default config;
