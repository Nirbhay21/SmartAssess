import { LucideIcon, LucideProps } from 'lucide-react';

type Props = {
  icon: LucideIcon;
} & LucideProps;

const ThemeIcon = ({ icon: Icon, ...props }: Props) => {
  return <Icon {...props} />;
};

export default ThemeIcon;
