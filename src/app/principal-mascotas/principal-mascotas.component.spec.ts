import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalMascotasComponent } from './principal-mascotas.component';

describe('PrincipalMascotasComponent', () => {
  let component: PrincipalMascotasComponent;
  let fixture: ComponentFixture<PrincipalMascotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrincipalMascotasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalMascotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
