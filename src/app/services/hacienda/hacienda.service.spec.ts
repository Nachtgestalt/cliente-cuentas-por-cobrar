import { TestBed, inject } from '@angular/core/testing';

import { HaciendaService } from './hacienda.service';

describe('HaciendaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HaciendaService]
    });
  });

  it('should be created', inject([HaciendaService], (service: HaciendaService) => {
    expect(service).toBeTruthy();
  }));
});
