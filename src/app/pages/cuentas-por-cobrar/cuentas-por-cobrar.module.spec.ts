import {CuentasPorCobrarModule} from './cuentas-por-cobrar.module';

describe('CuentasPorCobrarModule', () => {
  let cuentasPorCobrarModule: CuentasPorCobrarModule;

  beforeEach(() => {
    cuentasPorCobrarModule = new CuentasPorCobrarModule();
  });

  it('should create an instance', () => {
    expect(cuentasPorCobrarModule).toBeTruthy();
  });
});
