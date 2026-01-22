// Define variants once to reuse across Button, Badge, Dropdown items, etc.
export type UiVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type UiSize = 'sm' | 'md' | 'lg';

export const UI_TOKENS = {
  transition: 'transition-all duration-200 ease-in-out',
  focus:
    'focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-1 dark:focus:ring-offset-slate-900',
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none',

  // Shapes
  rounded: {
    sm: 'rounded',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    full: 'rounded-full',
  },

  // Button & Input Sizes
  sizes: {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-lg',
    icon_sm: 'w-8 h-8 p-1', // Square for icon buttons
    icon_md: 'w-10 h-10 p-2',
    icon_lg: 'w-12 h-12 p-3',
  },

  // Color Variants (Light & Dark support built-in)
  variants: {
    primary: [
      // Light mode: vibrant blue with white text
      'bg-blue-600 text-white',
      'hover:bg-blue-700',
      'active:bg-blue-800',
      'shadow-sm hover:shadow-md',
      // Dark mode
      'dark:bg-blue-500',
      'dark:hover:bg-blue-600',
      'dark:active:bg-blue-700',
    ].join(' '),

    secondary: [
      // Light mode: slate background with dark text
      'bg-slate-100 text-slate-900',
      'hover:bg-slate-200',
      'active:bg-slate-300',
      'ring-1 ring-inset ring-slate-300/50',
      // Dark mode
      'dark:bg-slate-700 dark:text-slate-100',
      'dark:hover:bg-slate-600',
      'dark:active:bg-slate-500',
      'dark:ring-slate-600/50',
    ].join(' '),

    ghost: [
      // Light mode: transparent with slate text
      'bg-transparent text-slate-700',
      'hover:bg-slate-100',
      'active:bg-slate-200',
      // Dark mode
      'dark:text-slate-300',
      'dark:hover:bg-slate-800',
      'dark:active:bg-slate-700',
    ].join(' '),

    danger: [
      // Light mode: red with white text
      'bg-red-600 text-white',
      'hover:bg-red-700',
      'active:bg-red-800',
      'shadow-sm hover:shadow-md',
      // Dark mode
      'dark:bg-red-500',
      'dark:hover:bg-red-600',
      'dark:active:bg-red-700',
    ].join(' '),
    outline:
      'bg-transparent text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800',
  },
};
