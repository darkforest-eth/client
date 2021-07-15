import { ContractFunction } from 'ethers';
import { DiagnosticUpdater } from '../Interfaces/DiagnosticUpdater';
import { ThrottledConcurrentQueue } from '../Network/ThrottledConcurrentQueue';
import { sleep } from '../Utils/Utils';

export class ContractCaller {
  private diagnosticsUpdater?: DiagnosticUpdater;
  private static readonly MAX_RETRIES = 12;
  private readonly callQueue = new ThrottledConcurrentQueue(10, 100, 20);

  public async makeCall<T>(
    contractViewFunction: ContractFunction<T>,
    args: unknown[] = []
  ): Promise<T> {
    for (let i = 0; i < ContractCaller.MAX_RETRIES; i++) {
      try {
        const callPromise = this.callQueue.add(() => {
          this.diagnosticsUpdater?.updateDiagnostics((d) => {
            d.totalCalls++;
          });
          return contractViewFunction(...args);
        });

        this.diagnosticsUpdater?.updateDiagnostics((d) => {
          d.callsInQueue = this.callQueue.size();
        });

        const callResult = await callPromise;

        this.diagnosticsUpdater?.updateDiagnostics((d) => {
          d.callsInQueue = this.callQueue.size();
        });

        return callResult;
      } catch (e) {
        await sleep(1000 * 2 ** i + Math.random() * 100);
      } finally {
        this.diagnosticsUpdater?.updateDiagnostics((d) => {
          d.totalCalls++;
        });
      }
    }

    throw new Error('failed to call contract');
  }

  public setDiagnosticUpdater(diagnosticUpdater?: DiagnosticUpdater) {
    this.diagnosticsUpdater = diagnosticUpdater;
  }
}
