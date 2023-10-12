import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionTableComponent } from '../transaction-table/transaction-table.component';
import { TransactionFilterComponent } from '../transaction-filter/transaction-filter.component';
import { Transaction } from '../../Models/transaction';
import { TransactionService } from '../../services/transaction.service';
import { BlockUIModule } from 'primeng/blockui';
import { ComponentBase } from '../../common/components/component-base';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-transaction-page',
  standalone: true,
  imports: [CommonModule, TransactionTableComponent, TransactionFilterComponent, BlockUIModule],
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.scss']
})
export class TransactionPageComponent extends ComponentBase implements OnInit {
  public transactionList: Transaction[] = [];

  constructor(public transactionService: TransactionService) {
    super();
  }

  ngOnInit(): void {
    this.loading = true;
    this.transactionService.get().pipe(
      finalize(() => this.loading = false)).subscribe({
        next: (list) => {
          this.transactionList = list;
        }
      })
  }

  filterData(filter: { filterDate?: Date, filterNo?: string }) {
    this.loading = true;
    this.transactionService.get(filter).pipe(
      finalize(() => this.loading = false)).subscribe({
        next: (list) => {
          this.transactionList = list;
        }
      })
  }
}
