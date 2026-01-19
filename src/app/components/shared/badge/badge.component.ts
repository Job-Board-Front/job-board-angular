import { Component, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  label = input.required<string>();
  variant = input<'blue' | 'gray' | 'green'>('gray');

  getClasses() {
    const styles = {
      gray: [
        // Light mode: subtle gray with good contrast
        'bg-slate-200 text-slate-800 ring-slate-300',
        'hover:bg-slate-300',
        // Dark mode
        'dark:bg-slate-700/50 dark:text-slate-200 dark:ring-slate-600/40',
        'dark:hover:bg-slate-700/70',
      ].join(' '),

      blue: [
        // Light mode: vibrant blue
        'bg-blue-100 text-blue-800 ring-blue-300',
        'hover:bg-blue-200',
        'shadow-sm',
        // Dark mode
        'dark:bg-blue-500/20 dark:text-blue-300 dark:ring-blue-400/30',
        'dark:hover:bg-blue-500/30',
      ].join(' '),

      green: [
        // Light mode: fresh green
        'bg-emerald-100 text-emerald-800 ring-emerald-300',
        'hover:bg-emerald-200',
        'shadow-sm',
        // Dark mode
        'dark:bg-emerald-500/20 dark:text-emerald-300 dark:ring-emerald-400/30',
        'dark:hover:bg-emerald-500/30',
      ].join(' '),

      red: [
        // Light mode: clear red
        'bg-red-100 text-red-800 ring-red-300',
        'hover:bg-red-200',
        'shadow-sm',
        // Dark mode
        'dark:bg-red-500/20 dark:text-red-300 dark:ring-red-400/30',
        'dark:hover:bg-red-500/30',
      ].join(' '),

      yellow: [
        // Light mode: warm yellow
        'bg-amber-100 text-amber-800 ring-amber-300',
        'hover:bg-amber-200',
        'shadow-sm',
        // Dark mode
        'dark:bg-amber-500/20 dark:text-amber-300 dark:ring-amber-400/30',
        'dark:hover:bg-amber-500/30',
      ].join(' '),
    };
    return styles[this.variant()];
  }
}
