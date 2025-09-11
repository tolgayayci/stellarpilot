// Doctor Command Type Definitions

// Diagnose and troubleshoot CLI and network issues
export interface DoctorParams {
  global?: boolean;
  configDir?: string;
}

// Result types for doctor operations
export interface DoctorResult {
  status: 'healthy' | 'issues_found' | 'critical';
  checks: DoctorCheck[];
  summary: string;
}

export interface DoctorCheck {
  name: string;
  category: 'cli' | 'network' | 'config' | 'dependencies';
  status: 'pass' | 'warning' | 'fail';
  message: string;
  details?: string;
  suggestion?: string;
}