import Logo from '@/components/common/Logo';

const BrandLogo = () => {
  return (
    <div className="mb-4 flex items-center justify-center space-x-1.5">
      <Logo className="w-12" />
      <h1 className="font-montserrat text-foreground text-2xl font-bold">SmartAssess</h1>
    </div>
  );
};

export default BrandLogo;
