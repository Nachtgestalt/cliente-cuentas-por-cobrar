import { TestBed, inject } from '@angular/core/testing';

import { EscuelaService } from './escuela.service';

describe('EscuelaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EscuelaService]
    });
  });

  it('should be created', inject([EscuelaService], (service: EscuelaService) => {
    expect(service).toBeTruthy();
  }));
});
