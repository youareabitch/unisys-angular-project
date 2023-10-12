import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { Transaction } from '../Models/transaction';
import { HttpClient } from '@angular/common/http'
import { Util } from '../util/util';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  // public transactionList$ = new BehaviorSubject<Transaction[]>([]);
  private transactionList: Transaction[] = [];

  constructor(private http: HttpClient) {
    // this.init();
    this.initData();
  }

  // init() {
  //   this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(map((x: any) => {
  //     return x.map((item: any) => {
  //       let obj: Transaction = { no: item.id.toString(), name: item.title, time: new Date(new Date().getTime() + ((item.id - 1) * 24 * 60 * 60 * 1000)) }
  //       return obj;
  //     });
  //   })).subscribe(x => {
  //     console.log(x);
  //     this.transactionList$.next(x);
  //   });
  // }

  private initData() {
    for (let i = 1; i <= 10; i++) {
      let randomName = '';
      for (let n = 0; n < 3; n++) {
        randomName = `${randomName}${String.fromCharCode(Util.getRandomNumber(65, 90))}`;
      }

      const data: Transaction = { time: new Date(new Date().getTime() + ((i - 1) * 24 * 60 * 60 * 1000)), no: i.toString(), name: `Transaction ${randomName}` }
      this.transactionList.push(data);
    }
  }

  get(filter: { filterDate?: Date, filterNo?: string } = {}) {
    const { filterDate, filterNo } = filter;
    let result = [...this.transactionList];

    if (filterDate || filterNo) {
      if (filterDate) {
        result = result.filter(x => {
          return x.time.toLocaleDateString().includes(filterDate.toLocaleDateString());
        });
      }

      if (filterNo) {
        result = result.filter(x => {
          return x.no.includes(filterNo);
        });
      }
    }

    console.log(result);
    return of(result).pipe(delay(Util.getRandomNumber(500, 2000)));
  }
}
