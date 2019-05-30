import {RecursosHumanosModule} from './recursos-humanos.module';

describe('RecursosHumanosModule', () => {
  let recursosHumanosModule: RecursosHumanosModule;

  beforeEach(() => {
    recursosHumanosModule = new RecursosHumanosModule();
  });

  it('should create an instance', () => {
    expect(recursosHumanosModule).toBeTruthy();
  });
});
