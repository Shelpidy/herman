export type ContactFormObject = {
  fullname?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export interface Action {
  type?: string;
  payload?: string;
}

export type EmailVerifyResp = {
  status?: string;
  content?: NonNullable<{
    message_id: NonNullable<string>;
    verified?: boolean;
  }>;
};
