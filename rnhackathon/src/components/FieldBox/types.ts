export interface FieldProps {
  type?: any;
  name: string;
  value: string | undefined;
  onChange: (text: string) => void;
}
