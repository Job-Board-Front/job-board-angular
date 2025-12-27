import { Component } from '@angular/core';
export interface Category {
  id: string;
  name: string;
  count?: number;
}
@Component({
  selector: 'app-category-filter',
  imports: [],
  templateUrl: './category-filter.html',
  styleUrl: './category-filter.css',
})

export class CategoryFilter {
categories: Category[] = [
    { id: 'engineering', name: 'Engineering' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'data-science', name: 'Data Science' }
  ];
}
