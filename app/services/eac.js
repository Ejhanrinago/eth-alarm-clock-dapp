import EAC from 'eac.js-lib';
import BigNumber from 'bignumber.js';
import RequestLib from '../abi/RequestLib';

let instance = null;
let web3 = null;

const additionalMethods = {
  getRequestLibInstance(address) {
    return web3.eth.contract(RequestLib).at(address);
  },
  calcEndowment(gasAmount = 0, amountToSend = 0, gasPrice = 0, donation = 0, deposit = 0) {
    gasAmount = gasAmount || 0;
    amountToSend = amountToSend || 0;
    gasPrice = gasPrice || 0;
    donation = donation || 0;
    deposit = deposit || 0;

    const { Util: { calcEndowment } } = this;
    const endowment = calcEndowment(
      new BigNumber(gasAmount),
      new BigNumber(amountToSend),
      new BigNumber(gasPrice),
      new BigNumber(donation),
      new BigNumber(deposit),
    );
    return endowment;
  }
};

export function initEacService(web3Service) {
  if (!instance) {
    web3 = web3Service;
    instance = Object.assign(EAC(web3Service), additionalMethods);
  }

  return instance;
}
