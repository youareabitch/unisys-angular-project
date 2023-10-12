import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Transaction } from '../../Models/transaction';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent {
  @Input() public transactionList: Transaction[] = [];
}
