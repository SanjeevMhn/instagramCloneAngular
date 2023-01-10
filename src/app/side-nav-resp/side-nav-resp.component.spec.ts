import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavRespComponent } from './side-nav-resp.component';

describe('SideNavRespComponent', () => {
  let component: SideNavRespComponent;
  let fixture: ComponentFixture<SideNavRespComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavRespComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavRespComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
