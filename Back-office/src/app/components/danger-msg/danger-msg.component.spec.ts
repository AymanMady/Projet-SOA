import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerMsgComponent } from './danger-msg.component';

describe('DangerMsgComponent', () => {
  let component: DangerMsgComponent;
  let fixture: ComponentFixture<DangerMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DangerMsgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DangerMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
