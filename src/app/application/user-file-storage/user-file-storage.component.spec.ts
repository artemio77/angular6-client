import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFileStorageComponent } from './user-file-storage.component';

describe('UserFileStorageComponent', () => {
  let component: UserFileStorageComponent;
  let fixture: ComponentFixture<UserFileStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFileStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFileStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
