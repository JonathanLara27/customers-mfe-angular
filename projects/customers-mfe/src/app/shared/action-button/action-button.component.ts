import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActionButton } from '../table/table.interface';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionButtonComponent {

  readonly button = input.required<ActionButton>();
  readonly element = input.required<any>();
  readonly isLoading = input.required<boolean>();

  readonly action = output<() => void>();

  onClick(): void {
    this.action.emit(() => this.button().action(this.element()));
  }

  getIconType(): { svg?: string; icon?: string } {
    const btn = this.button();
    const row = this.element();

    if (typeof btn.svgIcon === 'function') {
      return { svg: btn.svgIcon(row) };
    }
    if (typeof btn.icon === 'function') {
      return { icon: btn.icon(row) };
    }
    return { icon: '' };
  }

  shouldShow(): boolean {
    const btn = this.button();
    const row = this.element();
    return btn.show(row)
  }

  getLabel(): string {
    const btn = this.button();
    const row = this.element();
    return btn.label(row)
  }

  getButtonClass(): string {
    const btn = this.button();
    return btn.buttonClass ?? '';
  }
}