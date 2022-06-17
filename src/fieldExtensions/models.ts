export enum FieldState {
  View,
  Edit,
}

export interface Config {
  type: ExtensionType;
  labelsPrefix: string;
  targetOptions: { label: string; value: string }[];
}

export enum ExtensionType {
  Link = "link",
}

export enum TargetType {
  Blank = "_blank",
  Parent = "_parent",
  Self = "_self",
  Top = "_top",
}

export interface LinkModel {
  label: string;
  href?: string;
  isExternal: boolean;
  target?: TargetType;
}

export interface FieldHandlersProps {
  resize: () => void;
  getFieldValue: () => any;
  setFieldValue: (data: any) => void;
}
