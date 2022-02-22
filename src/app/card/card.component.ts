import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StockInfoService } from '../stock-info.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  // stock name recieved from parent component.
  @Input() stockName;

  // Eventmitter for passing info to parent component.
  // to  remove this stock from the list.
  @Output() removeEvent = new EventEmitter();
  data: any = '';

  symbol: string;
  open: Number = undefined;
  high: Number = undefined;
  low: Number = undefined;
  close: Number = undefined;
  volume: Number = undefined;
  diff: Number = undefined;
  perc_diff: Number = undefined;


  constructor(private stockInfo: StockInfoService) { }

  ngOnInit() {
    this.getStockData(this.stockName);
    setInterval( () => {this.getStockData(this.stockName); },  5 * 60 * 1000 );
  }

  getStockData(name: string) {
    this.stockInfo.getInfo(name).subscribe(data => {
      this.data = data;
      this.parseData();
    });
  }

  removeFromList() {
    this.removeEvent.emit(this.stockName);
  }

  // test comment
  // extract and parse the stock info data retrieved from Stock service
  parseData() {

    // as this api limits 5 requests per minute for non-prime users
    // so it sometimes returns error message or note regarding request limit exceeded.
    if (this.data['Error Message'] || this.data['Note']) {
      console.log(this.data['Error Message'] || this.data['Note']);

      // if card is shown for first time and some error accured then,
      // the card will remain empty so this removes that card
      // as when it loads for first time then all variables will be undefined.
      if (this.open === undefined) {
        this.removeFromList();
      }
      return;
    }


    // parsing the keys from response
    const parent_keys = Object.keys(this.data);
    console.log(this.data);
    const time_keys = Object.keys(this.data[parent_keys[1]]);
    const time_data = this.data[parent_keys[1]];

    this.symbol = this.data[parent_keys[0]]['2. Symbol'];
    this.open = time_data[time_keys[0]]['1. open'];
    this.high = time_data[time_keys[0]]['2. high'];
    this.low = time_data[time_keys[0]]['3. low'];
    this.close = Number(time_data[time_keys[0]]['4. close']);
    this.close = Number(this.close.toFixed(3));
    this.volume = time_data[time_keys[0]]['5. volume'];

    this.diff = Number((time_data[time_keys[0]]['4. close'] - time_data[time_keys[1]]['4. close']).toFixed(3));
    this.perc_diff = (Number(this.diff) / Number(time_data[time_keys[1]]['4. close'])) * 100;
    this.perc_diff = Number(this.perc_diff.toFixed(3));

  }

}
