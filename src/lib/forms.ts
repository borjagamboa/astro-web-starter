export type FormMethod = 'get' | 'post';

export type FormSubmissionConfig =
  | {
      mode: 'native';
      action: string;
      method?: FormMethod;
    }
  | {
      mode: 'custom';
      handler: string;
      action?: string;
      method?: FormMethod;
    };

export interface ContactFormFeatureConfig {
  enabled: boolean;
  submission?: FormSubmissionConfig;
}

export interface ContactFieldConfig {
  label?: string;
  required?: boolean;
}

export interface ContactFormFields {
  name?: false | ContactFieldConfig;
  email?: false | ContactFieldConfig;
  phone?: false | ContactFieldConfig;
  message?: false | ContactFieldConfig;
}

export interface PrivacyConsentConfig {
  label: string;
  required?: boolean;
  policy?: {
    label: string;
    href: string;
  };
}

export interface HoneypotConfig {
  name?: string;
  label?: string;
}

export interface ContactFormValues {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  privacy?: boolean;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  privacy?: string;
  form?: string;
}

