import { useSyncExternalStore } from 'react';

export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = ResolvedAppearance | 'system';

export type ColorTheme =
    | 'urban'
    | 'saffron'
    | 'ruby'
    | 'ocean'
    | 'forest'
    | 'plum'
    | 'copper'
    | 'aurora'
    | 'harbor'
    | 'graphite'
    | 'mist'
    | 'quartz';

export type UseAppearanceReturn = {
    readonly appearance: Appearance;
    readonly resolvedAppearance: ResolvedAppearance;
    readonly colorTheme: ColorTheme;
    readonly updateAppearance: (mode: Appearance) => void;
    readonly updateColorTheme: (theme: ColorTheme) => void;
};

const listeners = new Set<() => void>();
let currentAppearance: Appearance = 'system';
let currentColorTheme: ColorTheme = 'urban';

const prefersDark = (): boolean => {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const getStoredAppearance = (): Appearance => {
    if (typeof window === 'undefined') {
        return 'system';
    }

    return (localStorage.getItem('appearance') as Appearance) || 'system';
};

const getStoredColorTheme = (): ColorTheme => {
    if (typeof window === 'undefined') {
        return 'urban';
    }

    return (localStorage.getItem('color_theme') as ColorTheme) || 'urban';
};

const isDarkMode = (appearance: Appearance): boolean => {
    return appearance === 'dark' || (appearance === 'system' && prefersDark());
};

const applyTheme = (appearance: Appearance, colorTheme: ColorTheme): void => {
    if (typeof document === 'undefined') {
        return;
    }

    const isDark = isDarkMode(appearance);

    document.documentElement.classList.toggle('dark', isDark);
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', colorTheme);
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);

    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

const mediaQuery = (): MediaQueryList | null => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.matchMedia('(prefers-color-scheme: dark)');
};

const handleSystemThemeChange = (): void =>
    applyTheme(currentAppearance, currentColorTheme);

export function initializeTheme(): void {
    if (typeof window === 'undefined') {
        return;
    }

    if (!localStorage.getItem('appearance')) {
        localStorage.setItem('appearance', 'system');
        setCookie('appearance', 'system');
    }

    if (!localStorage.getItem('color_theme')) {
        localStorage.setItem('color_theme', 'urban');
        setCookie('color_theme', 'urban');
    }

    currentAppearance = getStoredAppearance();
    currentColorTheme = getStoredColorTheme();
    applyTheme(currentAppearance, currentColorTheme);

    // Set up system theme change listener
    mediaQuery()?.addEventListener('change', handleSystemThemeChange);
}

export function useAppearance(): UseAppearanceReturn {
    const appearance: Appearance = useSyncExternalStore(
        subscribe,
        () => currentAppearance,
        () => 'system',
    );

    const colorTheme: ColorTheme = useSyncExternalStore(
        subscribe,
        () => currentColorTheme,
        () => 'urban',
    );

    const resolvedAppearance: ResolvedAppearance = isDarkMode(appearance)
        ? 'dark'
        : 'light';

    const updateAppearance = (mode: Appearance): void => {
        currentAppearance = mode;

        localStorage.setItem('appearance', mode);
        setCookie('appearance', mode);

        applyTheme(mode, currentColorTheme);
        notify();
    };

    const updateColorTheme = (theme: ColorTheme): void => {
        currentColorTheme = theme;

        localStorage.setItem('color_theme', theme);
        setCookie('color_theme', theme);

        applyTheme(currentAppearance, theme);
        notify();
    };

    return {
        appearance,
        resolvedAppearance,
        colorTheme,
        updateAppearance,
        updateColorTheme,
    } as const;
}
