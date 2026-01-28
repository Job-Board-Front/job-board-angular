// absolute-url.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@/environments/environment';

@Pipe({
  name: 'absoluteUrl',
  standalone: true
})
export class AbsoluteUrlPipe implements PipeTransform {
  transform(url: string | null): string | null {
    if (!url) return null;
        if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `${environment.apiUrl}${'/uploads/job-logos'}${url.startsWith('/') ? '' : '/'}${url}`;
  }
}