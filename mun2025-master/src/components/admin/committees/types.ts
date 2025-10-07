
export interface Committee {
  id: string;
  name: string;
  abbreviation?: string;
  description: string;
  topics: string[];
  image_url?: string;
  created_at: string;
}

export interface CommitteeFormData {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
  topics: string[];
  image_url: string;
}

export const initialFormState: CommitteeFormData = {
  id: '',
  name: '',
  abbreviation: '',
  description: '',
  topics: [''],
  image_url: '',
};
