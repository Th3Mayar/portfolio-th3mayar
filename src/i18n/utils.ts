import { ui, defaultLang } from '@/i18n/ui';

export function getLangFromUrl(url: URL) {
    const [_, lang] = url.pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return ui[lang] || ui[defaultLang];
}

export function useTranslatedPath(lang: keyof typeof ui) {
    return function translatePath(path: string | URL, l: string = lang) {
        if (path instanceof URL) path = path.pathname;
        return `/${l}${path}`;
    };
}