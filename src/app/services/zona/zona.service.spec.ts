import { TestBed, inject } from '@angular/core/testing';

import { ZonaService } from './zona.service';

describe('ZonaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZonaService]
    });
  });

  it('should be created', inject([ZonaService], (service: ZonaService) => {
    expect(service).toBeTruthy();
  }));
});
