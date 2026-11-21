import React from 'react';

interface FooterMarginaliaProps {
  variant?: 'lawn' | 'surface';
  onOpenSocials: () => void;
  onOpenContact: () => void;
}

export const FooterMarginalia: React.FC<FooterMarginaliaProps> = ({
  variant = 'surface',
  onOpenSocials,
  onOpenContact,
}) => {
  const isLawn = variant === 'lawn';

  return (
    <footer
      className={
        isLawn
          ? 'relative z-10 flex items-center justify-between gap-gutter-lg px-page-margin pt-gutter-md pb-gutter-xl'
          : 'w-full border-t border-light-outline-variant/60'
      }
    >
      <div
        className={
          isLawn
            ? 'flex items-center justify-between gap-gutter-lg w-full'
            : 'max-w-6xl mx-auto px-6 md:px-page-margin py-gutter-lg flex items-center justify-between gap-gutter-lg'
        }
      >
        <div className="flex items-center gap-gutter-lg">
          <button
            type="button"
            onClick={onOpenSocials}
            className={`font-label text-label-sm transition-opacity duration-150 ease-out hover:underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0 ${
              isLawn
                ? 'text-light-on-primary hover:opacity-80'
                : 'text-light-on-surface-variant hover:text-light-on-surface'
            }`}
          >
            GitHub
          </button>
          <button
            type="button"
            onClick={onOpenContact}
            className={`font-label text-label-sm transition-opacity duration-150 ease-out hover:underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0 ${
              isLawn
                ? 'text-light-on-primary hover:opacity-80'
                : 'text-light-on-surface-variant hover:text-light-on-surface'
            }`}
          >
            Email
          </button>
        </div>

        <p
          className={`font-label text-label-sm text-right ${
            isLawn ? 'text-light-on-primary' : 'text-light-on-surface-variant'
          }`}
        >
          azzah — building calm, sunny software
        </p>
      </div>
    </footer>
  );
};
