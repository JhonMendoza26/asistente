import { TestBed } from '@angular/core/testing';

import { AsistenteVirtualService } from './asistente-virtual.service';

describe('AsistenteVirtualService', () => {
  let service: AsistenteVirtualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsistenteVirtualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
