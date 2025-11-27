export type AuthFormValues = {
  email: string;
  password: string;
  username?: string;
  confirmPassword?: string;
};

export interface AuthModalProps {
  opened: boolean;
  onClose: () => void;
  activeTab: string | null;
  onTabChange: (tab: string | null) => void;
}
