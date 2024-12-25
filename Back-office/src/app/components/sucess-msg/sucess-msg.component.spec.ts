import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessMsgComponent } from './sucess-msg.component';

describe('SucessMsgComponent', () => {
  let component: SucessMsgComponent;
  let fixture: ComponentFixture<SucessMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucessMsgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucessMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
