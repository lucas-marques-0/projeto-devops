import { TestBed } from '@angular/core/testing';

import { CrudCepService } from './crud-cep.service';

describe('CrudCepService', () => {
  let service: CrudCepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudCepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
