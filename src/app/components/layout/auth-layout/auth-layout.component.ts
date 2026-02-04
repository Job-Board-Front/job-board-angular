import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@/app/components/shared/icon/icon.component';

@Component({
  selector: 'app-auth-layout',
  imports: [IconComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {}
