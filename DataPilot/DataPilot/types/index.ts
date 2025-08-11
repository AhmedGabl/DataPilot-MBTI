export interface User {
  id: string;
  email: string;
  name: string;
}

export interface MBTIAnswer {
  questionId: string;
  selectedValue: string;
  selectedAxis: string;
}

export interface TestQuestion {
  id: string;
  text: string;
  options: Array<{
    label: string;
    value: string;
    axis: string;
  }>;
}

export interface MBTIPercentages {
  EI: { E: number; I: number };
  SN: { S: number; N: number };
  TF: { T: number; F: number };
  JP: { J: number; P: number };
}

export interface MBTIConfidence {
  EI: { label: string; margin: number };
  SN: { label: string; margin: number };
  TF: { label: string; margin: number };
  JP: { label: string; margin: number };
}

export interface UserResult {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  mbtiType: string;
  percentages: MBTIPercentages;
  confidence: MBTIConfidence;
  summary: string;
  createdAt: string;
}

export interface TestProgress {
  current: number;
  total: number;
}