import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterForm } from './constant/filter-form';
import { isEqual } from "lodash";
import { TransactionService } from '../../services/transaction.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-filter',
  standalone: true,
  imports: [CommonModule, InputTextModule, CalendarModule, FormsModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.scss']
})
export class TransactionFilterComponent implements OnInit {
  @Output() onFilter = new EventEmitter<{ filterDate?: Date, filterNo?: string }>();

  editorForm!: FormGroup<FilterForm>;
  editorFormListener!: Subscription;
  originData: any;

  constructor(private fb: FormBuilder, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.editorForm = this.fb.group<FilterForm>({
      filterDate: new FormControl({
        value: undefined, disabled: false
      }, { nonNullable: true }),
      filterNo: new FormControl({
        value: '', disabled: false
      }, { nonNullable: true })
    });

    this.originData = this.editorForm.getRawValue();
    this.setFormListener();
  }

  private setFormListener() {
    this.editorFormListener = this.editorForm.valueChanges.subscribe({
      next: () => {
        this.checkEditorFormDirty();
      }
    })
  }

  private checkEditorFormDirty() {
    if (!isEqual(this.originData, this.editorForm.getRawValue())) {
      this.editorForm.markAsDirty();
    } else {
      this.editorForm.markAsPristine();
    }
  }

  getData() {
    this.onFilter.emit(this.editorForm.getRawValue());
  }
}
