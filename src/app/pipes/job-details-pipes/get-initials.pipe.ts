import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getInitials',
  standalone: true,
})
export class GetInitialsPipe implements PipeTransform {
  transform(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
