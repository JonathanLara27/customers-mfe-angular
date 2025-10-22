import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerListComponent { }
