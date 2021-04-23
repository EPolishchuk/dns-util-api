export interface answer {
  host: string;
  port: number;
  status: boolean;
}

export interface digAnswer {
  host: string;
  record?: string[] | object[] | object;
  nameservers?: string[] | object[] | object;
  error?: string;
}
