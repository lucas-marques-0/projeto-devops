import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudCepComponent } from './crud-cep.component';

describe('CrudCepComponent', () => {
  let component: CrudCepComponent;
  let fixture: ComponentFixture<CrudCepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudCepComponent]
    });
    fixture = TestBed.createComponent(CrudCepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
