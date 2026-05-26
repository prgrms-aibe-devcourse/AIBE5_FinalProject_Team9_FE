interface LoadingProps {
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-5 h-5 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-4',
};

export default function Loading({ fullScreen = false, size = 'md' }: LoadingProps) {
  const spinner = (
    <span
      className={[
        'block rounded-full border-[#e63946] border-t-transparent animate-spin',
        sizeMap[size],
      ].join(' ')}
    />
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0d0d]/80">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-10">{spinner}</div>;
}
