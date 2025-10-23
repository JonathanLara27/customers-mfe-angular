import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  styleUrls: ['./headerPage.component.scss'],
  templateUrl: './headerPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderPageComponent { 

  title = input.required<string>();
  subtitle = input.required<string>();
  // @Input({ required: true }) public  titleButton!: string;
  


  // @Output() showmodal = new EventEmitter<void>();

  // showModal() {
  //   this.showmodal.emit();
  // }

}
