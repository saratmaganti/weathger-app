import { Component, Input, OnInit } from '@angular/core';
import { TableColumn, TableData } from 'src/app/model/weather.model';

@Component({
  selector: 'app-custom-data-table',
  templateUrl: './custom-data-table.component.html',
  styleUrls: ['./custom-data-table.component.scss'],
})
export class CustomDataTableComponent implements OnInit {

  @Input() tblData!: TableData[];
  @Input() tblColumns!: TableColumn[];
  @Input() title!: string;
	rowData: TableData[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
