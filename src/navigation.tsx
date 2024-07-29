import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation';

export const defaultLocale = 'en';


export const locales = ['en', 'zh'] as const;

export const localePrefix =
  process.env.NEXT_PUBLIC_LOCALE_PREFIX === 'never' ? 'never' : 'as-needed';

export const pathnames = {
  '/home': '/home',
  '/shop': '/shop',
  '/enterPrise': '/enterPrise',
  '/category': '/category',
  '/products': '/products',
  '/about': '/about',
  '/help': '/help',
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    pathnames
  });