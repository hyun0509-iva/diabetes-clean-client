export interface MenuItemType {
  id: number;
  path: string | null;
  label: string | React.ReactNode;
  handler?: any;
}
