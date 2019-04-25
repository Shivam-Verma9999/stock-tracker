import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataInterface } from './shared/data.interface';
@Injectable({
  providedIn: 'root'
})
  // service for fetching stock info from API.
export class StockInfoService {

  api_url: string;
  constructor(private http: HttpClient) { }

  // takes stock symbol and fetches realtime stock info from the API.
  // this api allows 5 requests per minute and 500 per day.
  getInfo(symbol: string): Observable<any> {
    if (!symbol) {
      symbol = 'MSFT';
    }
    this.api_url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=8VKB4HBESG4Z9V9E`;
    return this.http.get(this.api_url);
  }
}
