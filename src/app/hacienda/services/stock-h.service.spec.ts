import { TestBed, inject } from '@angular/core/testing';

import { StockHService } from './stock-h.service';

describe('StockHService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StockHService]
    });
  });

  it('should be created', inject([StockHService], (service: StockHService) => {
    expect(service).toBeTruthy();
  }));
});
