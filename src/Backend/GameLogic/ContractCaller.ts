import { ContractFunction } from 'ethers';
import { ThrottledConcurrentQueue } from '../Network/ThrottledConcurrentQueue';
import { sleep } from '../Utils/Utils';

export class ContractCaller {
  private static readonly MAX_RETRIES = 5;
  private readonly callQueue = new ThrottledConcurrentQueue(10, 1000, 20);

  public async makeCall<T>(
    contractViewFunction: ContractFunction<T>,
    args: unknown[] = []
  ): Promise<T> {
    for (let i = 0; i < ContractCaller.MAX_RETRIES; i++) {
      try {
        return await this.callQueue.add(() => contractViewFunction(...args));
      } catch (e) {
        await sleep(1000 * 2 ** i + Math.random() * 100);
      }
    }

    throw new Error('failed to call contract');
  }
}
