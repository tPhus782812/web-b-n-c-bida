import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateComponent } from './cate.component';

describe('CateComponent', () => {
  let component: CateComponent;
  let fixture: ComponentFixture<CateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
