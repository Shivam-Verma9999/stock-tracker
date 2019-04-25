import { Component, OnInit } from '@angular/core';
import { StockInfoService } from './stock-info.service';

import { DataInterface } from './shared/data.interface';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  relevantStock = [
    'MSFT',
    // 'GOOG',
    // 'HMC',
    // 'AEB',
    // 'ALL',
    // 'AXS',
    // 'AZN',
    // 'ARR'
  ];
  constructor(private stockInfo: StockInfoService, private fb: FormBuilder) { }

  form = this.fb.group({
    search: ['', Validators.required]
  });
  title = 'stock-tracker';
  stocks: DataInterface[] = [];

  ngOnInit(): void {

  }

  // takes name of stock from input field and adds it to the current stock list
  submitForm() {
    console.log('submitting...');
    const s = this.form.controls.search.value;
    if (s.trim().length === 0) {
      alert("please enter valid stock symbol");
      return;
    }
    if (this.relevantStock.indexOf(s) !== -1) {
      alert('Stock company already on Dashboard');
      return;
    }
    this.relevantStock.push(s);
  }

  // removes the stock from the list on dashboard 
  //and due to databinding its card view also gets removed.
  removeStock(stockName: string) {
    this.relevantStock = this.relevantStock.filter((stock) => { return stockName !== stock });
  }
}
