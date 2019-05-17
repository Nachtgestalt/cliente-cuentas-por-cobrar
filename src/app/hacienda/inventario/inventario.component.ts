import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Inventario} from '../../interfaces/inventario.interface';
import {StockHService} from '../services/stock-h.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['folio', 'titulo', 'cantidad', 'edit'];
  dataSource: MatTableDataSource<Array<any>> = new MatTableDataSource([]);

  user = JSON.parse(localStorage.getItem('user'));
  isLoadingResults = false;

  constructor(private _stockHService: StockHService) {
    this._stockHService.listStock().subscribe(
      (res: any) => {
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log(error);
      },
      () => this.isLoadingResults = false
    );
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
