/* tslint:disable */
/* eslint-disable */
/**
 * Zapper API
 * The Zapper API provides some of the most robust Defi related data, everything from liquidity and prices on different AMMs to complex Defi protocol balances all in one convenient place. In addition, the API also supports bridging between different networks as well as formatted Zap transaction endpoints. <br/><br/><br/> *Enter in our public API key in the Authorize section below to test the endpoints directly in swagger: **96e0cc51-a62e-42ca-acee-910ea7d2a241**
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    Transaction,
    TransactionFromJSON,
    TransactionToJSON,
} from '../models';

export interface ZapOutControllerGetZapOutApprovalStateRequest {
    protocol: ZapOutControllerGetZapOutApprovalStateProtocolEnum;
    ownerAddress: string;
    sellTokenAddress: string;
    network?: ZapOutControllerGetZapOutApprovalStateNetworkEnum;
}

export interface ZapOutControllerGetZapOutApprovalTransactionRequest {
    protocol: ZapOutControllerGetZapOutApprovalTransactionProtocolEnum;
    ownerAddress: string;
    sellTokenAddress: string;
    gasPrice: string;
    network?: ZapOutControllerGetZapOutApprovalTransactionNetworkEnum;
}

export interface ZapOutControllerGetZapOutTransactionRequest {
    protocol: ZapOutControllerGetZapOutTransactionProtocolEnum;
    ownerAddress: string;
    sellAmount: string;
    toTokenAddress: string;
    poolAddress: string;
    gasPrice: string;
    slippagePercentage: number;
    signature?: string;
    network?: ZapOutControllerGetZapOutTransactionNetworkEnum;
    affiliateAddress?: string;
}

/**
 * 
 */
export class ZapOutApi extends runtime.BaseAPI {

    /**
     * Provides a list of networks to protocols that are supported by the Zap Out routes.
     * Supported Zap Outs
     */
    async zapOutControllerGetSupportedZapOutsRaw(): Promise<runtime.ApiResponse<void>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/zap-out/supported`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Provides a list of networks to protocols that are supported by the Zap Out routes.
     * Supported Zap Outs
     */
    async zapOutControllerGetSupportedZapOuts(): Promise<void> {
        await this.zapOutControllerGetSupportedZapOutsRaw();
    }

    /**
     * Retrieves an ERC20 approval status for a protocol zap-out
     * Zap Out Approval State
     */
    async zapOutControllerGetZapOutApprovalStateRaw(requestParameters: ZapOutControllerGetZapOutApprovalStateRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.protocol === null || requestParameters.protocol === undefined) {
            throw new runtime.RequiredError('protocol','Required parameter requestParameters.protocol was null or undefined when calling zapOutControllerGetZapOutApprovalState.');
        }

        if (requestParameters.ownerAddress === null || requestParameters.ownerAddress === undefined) {
            throw new runtime.RequiredError('ownerAddress','Required parameter requestParameters.ownerAddress was null or undefined when calling zapOutControllerGetZapOutApprovalState.');
        }

        if (requestParameters.sellTokenAddress === null || requestParameters.sellTokenAddress === undefined) {
            throw new runtime.RequiredError('sellTokenAddress','Required parameter requestParameters.sellTokenAddress was null or undefined when calling zapOutControllerGetZapOutApprovalState.');
        }

        const queryParameters: any = {};

        if (requestParameters.ownerAddress !== undefined) {
            queryParameters['ownerAddress'] = requestParameters.ownerAddress;
        }

        if (requestParameters.sellTokenAddress !== undefined) {
            queryParameters['sellTokenAddress'] = requestParameters.sellTokenAddress;
        }

        if (requestParameters.network !== undefined) {
            queryParameters['network'] = requestParameters.network;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/zap-out/{protocol}/approval-state`.replace(`{${"protocol"}}`, encodeURIComponent(String(requestParameters.protocol))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Retrieves an ERC20 approval status for a protocol zap-out
     * Zap Out Approval State
     */
    async zapOutControllerGetZapOutApprovalState(requestParameters: ZapOutControllerGetZapOutApprovalStateRequest): Promise<void> {
        await this.zapOutControllerGetZapOutApprovalStateRaw(requestParameters);
    }

    /**
     * Builds an ERC20 approval transaction for a protocol zap-out
     * Zap Out Approval Transaction
     */
    async zapOutControllerGetZapOutApprovalTransactionRaw(requestParameters: ZapOutControllerGetZapOutApprovalTransactionRequest): Promise<runtime.ApiResponse<Transaction>> {
        if (requestParameters.protocol === null || requestParameters.protocol === undefined) {
            throw new runtime.RequiredError('protocol','Required parameter requestParameters.protocol was null or undefined when calling zapOutControllerGetZapOutApprovalTransaction.');
        }

        if (requestParameters.ownerAddress === null || requestParameters.ownerAddress === undefined) {
            throw new runtime.RequiredError('ownerAddress','Required parameter requestParameters.ownerAddress was null or undefined when calling zapOutControllerGetZapOutApprovalTransaction.');
        }

        if (requestParameters.sellTokenAddress === null || requestParameters.sellTokenAddress === undefined) {
            throw new runtime.RequiredError('sellTokenAddress','Required parameter requestParameters.sellTokenAddress was null or undefined when calling zapOutControllerGetZapOutApprovalTransaction.');
        }

        if (requestParameters.gasPrice === null || requestParameters.gasPrice === undefined) {
            throw new runtime.RequiredError('gasPrice','Required parameter requestParameters.gasPrice was null or undefined when calling zapOutControllerGetZapOutApprovalTransaction.');
        }

        const queryParameters: any = {};

        if (requestParameters.ownerAddress !== undefined) {
            queryParameters['ownerAddress'] = requestParameters.ownerAddress;
        }

        if (requestParameters.sellTokenAddress !== undefined) {
            queryParameters['sellTokenAddress'] = requestParameters.sellTokenAddress;
        }

        if (requestParameters.gasPrice !== undefined) {
            queryParameters['gasPrice'] = requestParameters.gasPrice;
        }

        if (requestParameters.network !== undefined) {
            queryParameters['network'] = requestParameters.network;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/zap-out/{protocol}/approval-transaction`.replace(`{${"protocol"}}`, encodeURIComponent(String(requestParameters.protocol))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionFromJSON(jsonValue));
    }

    /**
     * Builds an ERC20 approval transaction for a protocol zap-out
     * Zap Out Approval Transaction
     */
    async zapOutControllerGetZapOutApprovalTransaction(requestParameters: ZapOutControllerGetZapOutApprovalTransactionRequest): Promise<Transaction> {
        const response = await this.zapOutControllerGetZapOutApprovalTransactionRaw(requestParameters);
        return await response.value();
    }

    /**
     * Builds a zap-out transaction for usage with Web3, complete with best swap from 0x.
     * Zap Out Transaction
     */
    async zapOutControllerGetZapOutTransactionRaw(requestParameters: ZapOutControllerGetZapOutTransactionRequest): Promise<runtime.ApiResponse<Transaction>> {
        if (requestParameters.protocol === null || requestParameters.protocol === undefined) {
            throw new runtime.RequiredError('protocol','Required parameter requestParameters.protocol was null or undefined when calling zapOutControllerGetZapOutTransaction.');
        }

        if (requestParameters.ownerAddress === null || requestParameters.ownerAddress === undefined) {
            throw new runtime.RequiredError('ownerAddress','Required parameter requestParameters.ownerAddress was null or undefined when calling zapOutControllerGetZapOutTransaction.');
        }

        if (requestParameters.sellAmount === null || requestParameters.sellAmount === undefined) {
            throw new runtime.RequiredError('sellAmount','Required parameter requestParameters.sellAmount was null or undefined when calling zapOutControllerGetZapOutTransaction.');
        }

        if (requestParameters.toTokenAddress === null || requestParameters.toTokenAddress === undefined) {
            throw new runtime.RequiredError('toTokenAddress','Required parameter requestParameters.toTokenAddress was null or undefined when calling zapOutControllerGetZapOutTransaction.');
        }

        if (requestParameters.poolAddress === null || requestParameters.poolAddress === undefined) {
            throw new runtime.RequiredError('poolAddress','Required parameter requestParameters.poolAddress was null or undefined when calling zapOutControllerGetZapOutTransaction.');
        }

        if (requestParameters.gasPrice === null || requestParameters.gasPrice === undefined) {
            throw new runtime.RequiredError('gasPrice','Required parameter requestParameters.gasPrice was null or undefined when calling zapOutControllerGetZapOutTransaction.');
        }

        if (requestParameters.slippagePercentage === null || requestParameters.slippagePercentage === undefined) {
            throw new runtime.RequiredError('slippagePercentage','Required parameter requestParameters.slippagePercentage was null or undefined when calling zapOutControllerGetZapOutTransaction.');
        }

        const queryParameters: any = {};

        if (requestParameters.ownerAddress !== undefined) {
            queryParameters['ownerAddress'] = requestParameters.ownerAddress;
        }

        if (requestParameters.sellAmount !== undefined) {
            queryParameters['sellAmount'] = requestParameters.sellAmount;
        }

        if (requestParameters.toTokenAddress !== undefined) {
            queryParameters['toTokenAddress'] = requestParameters.toTokenAddress;
        }

        if (requestParameters.poolAddress !== undefined) {
            queryParameters['poolAddress'] = requestParameters.poolAddress;
        }

        if (requestParameters.gasPrice !== undefined) {
            queryParameters['gasPrice'] = requestParameters.gasPrice;
        }

        if (requestParameters.slippagePercentage !== undefined) {
            queryParameters['slippagePercentage'] = requestParameters.slippagePercentage;
        }

        if (requestParameters.signature !== undefined) {
            queryParameters['signature'] = requestParameters.signature;
        }

        if (requestParameters.network !== undefined) {
            queryParameters['network'] = requestParameters.network;
        }

        if (requestParameters.affiliateAddress !== undefined) {
            queryParameters['affiliateAddress'] = requestParameters.affiliateAddress;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/zap-out/{protocol}/transaction`.replace(`{${"protocol"}}`, encodeURIComponent(String(requestParameters.protocol))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionFromJSON(jsonValue));
    }

    /**
     * Builds a zap-out transaction for usage with Web3, complete with best swap from 0x.
     * Zap Out Transaction
     */
    async zapOutControllerGetZapOutTransaction(requestParameters: ZapOutControllerGetZapOutTransactionRequest): Promise<Transaction> {
        const response = await this.zapOutControllerGetZapOutTransactionRaw(requestParameters);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum ZapOutControllerGetZapOutApprovalStateProtocolEnum {
    Balancer = 'balancer',
    Curve = 'curve',
    Pancakeswap = 'pancakeswap',
    Quickswap = 'quickswap',
    Sushiswap = 'sushiswap',
    UniswapV2 = 'uniswap-v2',
    Yearn = 'yearn'
}
/**
    * @export
    * @enum {string}
    */
export enum ZapOutControllerGetZapOutApprovalStateNetworkEnum {
    Ethereum = 'ethereum',
    Polygon = 'polygon',
    Optimism = 'optimism',
    Xdai = 'xdai',
    BinanceSmartChain = 'binance-smart-chain',
    Fantom = 'fantom'
}
/**
    * @export
    * @enum {string}
    */
export enum ZapOutControllerGetZapOutApprovalTransactionProtocolEnum {
    Balancer = 'balancer',
    Curve = 'curve',
    Pancakeswap = 'pancakeswap',
    Quickswap = 'quickswap',
    Sushiswap = 'sushiswap',
    UniswapV2 = 'uniswap-v2',
    Yearn = 'yearn'
}
/**
    * @export
    * @enum {string}
    */
export enum ZapOutControllerGetZapOutApprovalTransactionNetworkEnum {
    Ethereum = 'ethereum',
    Polygon = 'polygon',
    Optimism = 'optimism',
    Xdai = 'xdai',
    BinanceSmartChain = 'binance-smart-chain',
    Fantom = 'fantom'
}
/**
    * @export
    * @enum {string}
    */
export enum ZapOutControllerGetZapOutTransactionProtocolEnum {
    Balancer = 'balancer',
    Curve = 'curve',
    Pancakeswap = 'pancakeswap',
    Quickswap = 'quickswap',
    Sushiswap = 'sushiswap',
    UniswapV2 = 'uniswap-v2',
    Yearn = 'yearn'
}
/**
    * @export
    * @enum {string}
    */
export enum ZapOutControllerGetZapOutTransactionNetworkEnum {
    Ethereum = 'ethereum',
    Polygon = 'polygon',
    Optimism = 'optimism',
    Xdai = 'xdai',
    BinanceSmartChain = 'binance-smart-chain',
    Fantom = 'fantom'
}
