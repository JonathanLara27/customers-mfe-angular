import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFormComponent { }
