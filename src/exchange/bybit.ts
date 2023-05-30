import {
  CoinParam,
  LinearClient,
  LinearGetOrderRequest,
  LinearOrder,
  NewLinearOrder,
  SymbolParam,
  WalletBalances,
} from "bybit-api";
import { CONFIGS } from "../config";

/**
 * Represents byBitExchange
 *
 * @class
 */
class ByBitExchange {
  private linear: LinearClient;

  constructor(params: {
    key: string;
    secret: string;
    testnet: boolean;
    url: string;
  }) {
    this.linear = new LinearClient(params);
  }

  /**
   * @param {function(params): NewLinearOrder}
   * @return {Promise<LinearOrder | null>}
   * */
  async placeActiveOrder(params: NewLinearOrder): Promise<LinearOrder | null> {
    const order = await this.linear.placeActiveOrder(params);
    const { ret_code, ret_msg, result } = order;
    if (ret_code === 0 && ret_msg === "OK" && result) {
      if (Object.keys(result).length > 0) {
        return {
          ...result,
        };
      }
    } else {
      console.log(order, "full order");
    }
    return null;
  }

  /**
   * @param {function(params): CoinParam}
   * @return {Promise<WalletBalances | null>}
   * */
  async getWalletBallance(params: CoinParam): Promise<WalletBalances | null> {
    const { ret_code, ret_msg, result } = await this.linear.getWalletBalance(
      params
    );
    if (ret_code === 0 && ret_msg === "OK" && result) {
      return result;
    }
    return null;
  }

  /**
   * @param {function(params): LinearGetOrderRequest}
   * @return {Promise<any>}
   * */
  async viewOrders(params: LinearGetOrderRequest): Promise<any> {
    const openOrders = await this.linear.getActiveOrderList(params);
    if (openOrders) return openOrders;
    return null;
  }

  /** @return {boolean} */
  async cancelOrders(params: SymbolParam): Promise<boolean> {
    const canceledorders = await this.linear.cancelAllActiveOrders(params);
    if (canceledorders) return true;
    return false;
  }

  async getPrice(params: SymbolParam): Promise<any> {
    const price = await this.linear.getTickers(params);

    return price;
  }
}

export const bybit = new ByBitExchange({
  key: "QpyF4vURSGN5EnRr1l",
  secret: "zAqQsbx3bUQjJqWmhZvLFDDiYnRNxqTjcFEL",
  testnet: true,
  url: "https://api-testnet.bybit.com/",
});
