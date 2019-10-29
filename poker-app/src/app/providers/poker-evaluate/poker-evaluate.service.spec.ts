import { TestBed, inject } from '@angular/core/testing';

import { PokerEvaluateService } from './poker-evaluate.service';

describe('PokerEvaluateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokerEvaluateService]
    });
  });

  it('should be created', inject([PokerEvaluateService], (service: PokerEvaluateService) => {
    expect(service).toBeTruthy();
  }));
});
