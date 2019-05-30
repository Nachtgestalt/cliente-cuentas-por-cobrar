import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {StockHService} from '../services/stock-h.service';
import {AgregarStockComponent} from './agregar-stock/agregar-stock.component';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['folio', 'titulo', 'cantidad', 'edit'];
  dataSource: MatTableDataSource<Array<any>> = new MatTableDataSource([]);

  user = JSON.parse(localStorage.getItem('user'));
  isLoadingResults = false;

  constructor(private _stockHService: StockHService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._stockHService.listStock().subscribe(
      (res: any) => {
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

  inventario(i: number, claveProducto: number, tipoEntrada: boolean) {
    const dialogRef = this.dialog.open(AgregarStockComponent, {
      data: {
        claveProducto: claveProducto,
        tipoEntrada: tipoEntrada
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.loadData();
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
