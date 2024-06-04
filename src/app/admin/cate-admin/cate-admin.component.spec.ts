import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateAdminComponent } from './cate-admin.component';

describe('CateAdminComponent', () => {
  let component: CateAdminComponent;
  let fixture: ComponentFixture<CateAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CateAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
