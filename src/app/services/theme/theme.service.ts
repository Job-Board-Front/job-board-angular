import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  // Start with false, or read from localStorage if you want persistence
  darkMode = signal<boolean>(false);

  constructor() {
    // Only run this logic in the browser (not during Server Side Rendering)
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = localStorage.getItem('theme');
      // initialize system preference
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (storedTheme === 'dark' || (!storedTheme && systemDark)) {
        this.darkMode.set(true);
      }

      // watch the signal and update the HTML class automatically
      effect(() => {
        const isDark = this.darkMode();
        const html = document.documentElement;

        if (isDark) {
          html.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          html.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      });
    }
  }

  toggleTheme() {
    this.darkMode.update((v) => !v);
  }
}
