// Updated i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
import {cookies} from 'next/headers';

export default getRequestConfig(async () => {
  // Get locale from cookies, defaulting to 'en'
  const cookieStore = cookies();
  const locale = (await cookieStore).get('locale')?.value || 'en';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});

