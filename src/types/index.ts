// Lead Form
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: 'clinic' | 'professional' | 'store';
  currentChallenges: string[];
  budget?: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form Submission
export interface FormSubmission {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessType: 'clinic' | 'professional' | 'store';
  currentChallenges: string[];
}
