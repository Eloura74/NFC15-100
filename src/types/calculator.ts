export type CalculatorType =
  | 'ohm'
  | 'power-single'
  | 'power-three'
  | 'voltage-drop'
  | 'cable-section'
  | 'conduit-fill'
  | 'phase-balance'
  | 'conversion';

export interface CalculatorInput {
  name: string;
  label: string;
  type: 'number' | 'select' | 'radio';
  unit?: string;
  required: boolean;
  min?: number;
  max?: number;
  step?: number;
  options?: { value: string; label: string }[];
  defaultValue?: any;
  helpText?: string;
}

export interface CalculatorResult {
  name: string;
  label: string;
  value: number | string;
  unit?: string;
  precision?: number;
  status?: 'ok' | 'warning' | 'error';
  message?: string;
}

export interface CalculatorDefinition {
  id: CalculatorType;
  name: string;
  description: string;
  category: string;
  inputs: CalculatorInput[];
  assumptions: string[];
  limitations: string[];
  sources?: string[];
}

export interface CalculationError {
  field?: string;
  message: string;
  type: 'validation' | 'calculation' | 'warning';
}
