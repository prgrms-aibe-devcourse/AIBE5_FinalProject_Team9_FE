import Link from 'next/link';
import { ReactNode } from 'react';

interface StatePageAction {
  href?: string;
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

interface StatePageProps {
  eyebrow?: string;
  title: string;
  description: string;
  code?: string;
  actions?: StatePageAction[];
  children?: ReactNode;
}

const STATE_IMAGE = '/images/state-nyang-bg.png';

const actionClassName = {
  primary:
    'border-[#e63946] bg-[#e63946] text-white shadow-[0_0_22px_rgba(230,57,70,0.22)] hover:border-[#ff5966] hover:bg-[#c1121f]',
  secondary:
    'border-white/15 bg-black/24 text-[#d8d8d8] hover:border-[#e63946]/55 hover:bg-[#e63946]/10 hover:text-white',
};

function StateAction({ action }: { action: StatePageAction }) {
  const className = [
    'inline-flex h-12 min-w-36 items-center justify-center rounded-[8px] border px-5 text-sm font-black transition-all',
    actionClassName[action.variant ?? 'primary'],
  ].join(' ');

  if (action.href) {
    return (
      <Link href={action.href} className={className}>
        {action.label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={action.onClick} className={className}>
      {action.label}
    </button>
  );
}

export default function StatePage({
  eyebrow = 'GRIMGATE STATE',
  title,
  description,
  code,
  actions = [],
  children,
}: StatePageProps) {
  return (
    <main className="relative isolate min-h-[calc(100vh-52px)] overflow-hidden bg-[#08090d] text-[#f5f5f5]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-[72%_center] opacity-80 md:bg-center"
        style={{ backgroundImage: `url(${STATE_IMAGE})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(204,34,34,0.18),transparent_32%),linear-gradient(90deg,rgba(8,9,13,0.94)_0%,rgba(8,9,13,0.78)_40%,rgba(8,9,13,0.18)_72%,rgba(8,9,13,0.04)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-[#08090d] to-transparent"
      />

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-52px)] max-w-[1320px] flex-col justify-center px-5 py-16 sm:px-8 lg:px-10">
        <div className="max-w-[590px]">
          <p className="mb-4 text-[11px] font-black tracking-[0.34em] text-[#e63946]">
            {'// '}
            {eyebrow}
          </p>
          {code && (
            <p className="mb-2 text-[52px] font-black leading-none text-[#e63946]/95 md:text-[74px]">
              {code}
            </p>
          )}
          <h1 className="text-[36px] font-black leading-[1.12] text-white md:text-[54px]">
            {title}
          </h1>
          <p className="mt-5 max-w-[520px] text-[15px] font-bold leading-7 text-[#b8b8b8] md:text-base">
            {description}
          </p>

          {actions.length > 0 && (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {actions.map((action) => (
                <StateAction key={action.label} action={action} />
              ))}
            </div>
          )}

          {children && <div className="mt-6">{children}</div>}
        </div>
      </section>
    </main>
  );
}
