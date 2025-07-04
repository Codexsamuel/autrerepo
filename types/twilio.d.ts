declare module 'twilio' {
  export interface TwilioConfig {
    accountSid: string;
    authToken: string;
  }

  export interface MessageOptions {
    body: string;
    from: string;
    to: string;
  }

  export interface TwilioClient {
    messages: {
      create(options: MessageOptions): Promise<any>;
    };
  }

  function twilio(accountSid: string, authToken: string): TwilioClient;
  export default twilio;
} 