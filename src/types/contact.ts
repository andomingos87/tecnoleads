export interface Contact {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: string;
  lastContact: string;
  city: string;
  state: string;
  hasDeals?: boolean;
} 