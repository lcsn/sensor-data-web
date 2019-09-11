import { Routes } from '@angular/router';
import { DataChartComponent } from './data-chart/data-chart.component';
import { DataTableComponent } from './data-table/data-table.component';

export const ROOM_DETAIL_ROUTES: Routes = [
  { path: '', redirectTo: 'charts', pathMatch: 'full' },
  { path: 'charts', component: DataChartComponent },
  { path: 'tables', component: DataTableComponent }
];
