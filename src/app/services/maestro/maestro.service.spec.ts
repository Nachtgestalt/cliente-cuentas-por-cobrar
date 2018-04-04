import { TestBed, inject } from '@angular/core/testing';

import { MaestroService } from './maestro.service';

describe('MaestroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaestroService]
    });
  });

  it('should be created', inject([MaestroService], (service: MaestroService) => {
    expect(service).toBeTruthy();
  }));
});
