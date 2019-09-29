import { TestBed } from '@angular/core/testing';

import { NgxMultiselectService } from './ngx-multiselect.service';

describe('NgxMultiselectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxMultiselectService = TestBed.get(NgxMultiselectService);
    expect(service).toBeTruthy();
  });
});
