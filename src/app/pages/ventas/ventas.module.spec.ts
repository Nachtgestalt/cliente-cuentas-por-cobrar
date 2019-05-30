import {VentasModule} from './ventas.module';

describe('VentasModule', () => {
  let ventasModule: VentasModule;

  beforeEach(() => {
    ventasModule = new VentasModule();
  });

  it('should create an instance', () => {
    expect(ventasModule).toBeTruthy();
  });
});
