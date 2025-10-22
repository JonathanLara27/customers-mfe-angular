import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { ButtonColumn, TableColumn } from './table.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MAT_PAGINATOR_DEFAULT_OPTIONS, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { Internationalization } from '../functions/internationalization';
const matPaginatorConfig = {
  pageSizeOptions: [5, 10, 25, 50],
  showFirstLastButtons: true,
};
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ActionButtonComponent
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {

  public dataSource = input.required<any[]>();

  public isLoading = input.required<boolean>();

  public columns = input.required<TableColumn[]>();

  public buttonColumn = input.required<ButtonColumn>();

  public showAction = signal<boolean[]>([]);

  public displayedColumns = computed(() => {
    const cols = this.columns();
    const buttonCol = this.buttonColumn();
    const newCols = cols.map(col => col.field);
    if (buttonCol) {
      newCols.push(buttonCol.field);
    }
    return newCols;
  })

  public tableDataSource = computed(() => {
    return new MatTableDataSource<any>(this.dataSource());
  })

  ngOnInit(): void {
    this.initShowAction();
  }

  private initShowAction(): void {
    const buttonCol = this.buttonColumn();
    if (!buttonCol) return;
    this.showAction.set(this.dataSource().map(row => {
      return (buttonCol.buttons?.length ?? 0) <= 2;
    }));
  }


  public onButtonClick(action: (row: any) => void, row: any) {
    action(row);
  }

  public changeViewActions(index: number): void {
    this.showAction.update(actions => {
      const updated = [...actions];
      updated[index] = !updated[index];
      return updated;
    });
  }

  public getVisibleButtonsCount(element: any): number {
    const buttonColumn = this.buttonColumn();
    if (!buttonColumn) return 0;
    return buttonColumn.buttons.filter(button => button.show(element)).length;
  }

  public setFilter(filter: string): void {
    this.tableDataSource().filter = filter.trim().toLowerCase();
  }

 }
