import { TestBed } from '@angular/core/testing';

import { StockInfoService } from './stock-info.service';

describe('StockInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockInfoService = TestBed.get(StockInfoService);
    expect(service).toBeTruthy();
  });
});
