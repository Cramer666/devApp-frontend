export interface Campo {
  tipo: "text" | "number" | "select" | "date" | "checkbox"| "string";
  label: string;
  name: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}