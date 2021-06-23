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

export interface FarmStakingControllerGetApprovalStateRequest {
    farmStatsType: FarmStakingControllerGetApprovalStateFarmStatsTypeEnum;
    ownerAddress: string;
    rewardAddress: string;
    poolIndex: number;
    network?: FarmStakingControllerGetApprovalStateNetworkEnum;
}

export interface FarmStakingControllerGetApprovalTransactionRequest {
    farmStatsType: FarmStakingControllerGetApprovalTransactionFarmStatsTypeEnum;
    ownerAddress: string;
    rewardAddress: string;
    gasPrice: string;
    poolIndex: number;
    network?: FarmStakingControllerGetApprovalTransactionNetworkEnum;
}

export interface FarmStakingControllerGetClaimTransactionRequest {
    farmStatsType: FarmStakingControllerGetClaimTransactionFarmStatsTypeEnum;
    ownerAddress: string;
    rewardAddress: string;
    poolIndex: number;
    gasPrice: string;
    network?: FarmStakingControllerGetClaimTransactionNetworkEnum;
}

export interface FarmStakingControllerGetExitTransactionRequest {
    farmStatsType: FarmStakingControllerGetExitTransactionFarmStatsTypeEnum;
    ownerAddress: string;
    rewardAddress: string;
    poolIndex: number;
    amount: string;
    gasPrice: string;
    network?: FarmStakingControllerGetExitTransactionNetworkEnum;
}

export interface FarmStakingControllerGetStakeTransactionRequest {
    farmStatsType: FarmStakingControllerGetStakeTransactionFarmStatsTypeEnum;
    ownerAddress: string;
    rewardAddress: string;
    poolIndex: number;
    amount: string;
    gasPrice: string;
    network?: FarmStakingControllerGetStakeTransactionNetworkEnum;
}

/**
 * 
 */
export class FarmTransactionsApi extends runtime.BaseAPI {

    /**
     * Retrieves an ERC20 approval status for a protocol zap-in
     * Farm Approval State
     */
    async farmStakingControllerGetApprovalStateRaw(requestParameters: FarmStakingControllerGetApprovalStateRequest): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.farmStatsType === null || requestParameters.farmStatsType === undefined) {
            throw new runtime.RequiredError('farmStatsType','Required parameter requestParameters.farmStatsType was null or undefined when calling farmStakingControllerGetApprovalState.');
        }

        if (requestParameters.ownerAddress === null || requestParameters.ownerAddress === undefined) {
            throw new runtime.RequiredError('ownerAddress','Required parameter requestParameters.ownerAddress was null or undefined when calling farmStakingControllerGetApprovalState.');
        }

        if (requestParameters.rewardAddress === null || requestParameters.rewardAddress === undefined) {
            throw new runtime.RequiredError('rewardAddress','Required parameter requestParameters.rewardAddress was null or undefined when calling farmStakingControllerGetApprovalState.');
        }

        if (requestParameters.poolIndex === null || requestParameters.poolIndex === undefined) {
            throw new runtime.RequiredError('poolIndex','Required parameter requestParameters.poolIndex was null or undefined when calling farmStakingControllerGetApprovalState.');
        }

        const queryParameters: any = {};

        if (requestParameters.ownerAddress !== undefined) {
            queryParameters['ownerAddress'] = requestParameters.ownerAddress;
        }

        if (requestParameters.rewardAddress !== undefined) {
            queryParameters['rewardAddress'] = requestParameters.rewardAddress;
        }

        if (requestParameters.poolIndex !== undefined) {
            queryParameters['poolIndex'] = requestParameters.poolIndex;
        }

        if (requestParameters.network !== undefined) {
            queryParameters['network'] = requestParameters.network;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/farms/{farmStatsType}/approval-state`.replace(`{${"farmStatsType"}}`, encodeURIComponent(String(requestParameters.farmStatsType))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Retrieves an ERC20 approval status for a protocol zap-in
     * Farm Approval State
     */
    async farmStakingControllerGetApprovalState(requestParameters: FarmStakingControllerGetApprovalStateRequest): Promise<void> {
        await this.farmStakingControllerGetApprovalStateRaw(requestParameters);
    }

    /**
     * Builds an ERC20 approval transaction for staking a token in a farm
     * Farm Approval Transaction
     */
    async farmStakingControllerGetApprovalTransactionRaw(requestParameters: FarmStakingControllerGetApprovalTransactionRequest): Promise<runtime.ApiResponse<Transaction>> {
        if (requestParameters.farmStatsType === null || requestParameters.farmStatsType === undefined) {
            throw new runtime.RequiredError('farmStatsType','Required parameter requestParameters.farmStatsType was null or undefined when calling farmStakingControllerGetApprovalTransaction.');
        }

        if (requestParameters.ownerAddress === null || requestParameters.ownerAddress === undefined) {
            throw new runtime.RequiredError('ownerAddress','Required parameter requestParameters.ownerAddress was null or undefined when calling farmStakingControllerGetApprovalTransaction.');
        }

        if (requestParameters.rewardAddress === null || requestParameters.rewardAddress === undefined) {
            throw new runtime.RequiredError('rewardAddress','Required parameter requestParameters.rewardAddress was null or undefined when calling farmStakingControllerGetApprovalTransaction.');
        }

        if (requestParameters.gasPrice === null || requestParameters.gasPrice === undefined) {
            throw new runtime.RequiredError('gasPrice','Required parameter requestParameters.gasPrice was null or undefined when calling farmStakingControllerGetApprovalTransaction.');
        }

        if (requestParameters.poolIndex === null || requestParameters.poolIndex === undefined) {
            throw new runtime.RequiredError('poolIndex','Required parameter requestParameters.poolIndex was null or undefined when calling farmStakingControllerGetApprovalTransaction.');
        }

        const queryParameters: any = {};

        if (requestParameters.ownerAddress !== undefined) {
            queryParameters['ownerAddress'] = requestParameters.ownerAddress;
        }

        if (requestParameters.rewardAddress !== undefined) {
            queryParameters['rewardAddress'] = requestParameters.rewardAddress;
        }

        if (requestParameters.gasPrice !== undefined) {
            queryParameters['gasPrice'] = requestParameters.gasPrice;
        }

        if (requestParameters.poolIndex !== undefined) {
            queryParameters['poolIndex'] = requestParameters.poolIndex;
        }

        if (requestParameters.network !== undefined) {
            queryParameters['network'] = requestParameters.network;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            queryParameters["api_key"] = this.configuration.apiKey("api_key"); // api_key authentication
        }

        const response = await this.request({
            path: `/v1/farms/{farmStatsType}/approval-transaction`.replace(`{${"farmStatsType"}}`, encodeURIComponent(String(requestParameters.farmStatsType))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionFromJSON(jsonValue));
    }

    /**
     * Builds an ERC20 approval transaction for staking a token in a farm
     * Farm Approval Transaction
     */
    async farmStakingControllerGetApprovalTransaction(requestParameters: FarmStakingControllerGetApprovalTransactionRequest): Promise<Transaction> {
        const response = await this.farmStakingControllerGetApprovalTransactionRaw(requestParameters);
        return await response.value();
    }

    /**
     * Builds a claim transaction for usage with Web3
     * Farm Claim Transaction
     */
    async farmStakingControllerGetClaimTransactionRaw(requestParameters: FarmStakingControllerGetClaimTransactionRequest): Promise<runtime.ApiResponse<Transaction>> {
        if (requestParameters.farmStatsType === null || requestParameters.farmStatsType === undefined) {
            throw new runtime.RequiredError('farmStatsType','Required parameter requestParameters.farmStatsType was null or undefined when calling farmStakingControllerGetClaimTransaction.');
        }

        if (requestParameters.ownerAddress === null || requestParameters.ownerAddress === undefined) {
            throw new runtime.RequiredError('ownerAddress','Required parameter requestParameters.ownerAddress was null or undefined when calling farmStakingControllerGetClaimTransaction.');
        }

        if (requestParameters.rewardAddress === null || requestParameters.rewardAddress === undefined) {
            throw new runtime.RequiredError('rewardAddress','Required parameter requestParameters.rewardAddress was null or undefined when calling farmStakingControllerGetClaimTransaction.');
        }

        if (requestParameters.poolIndex === null || requestParameters.poolIndex === undefined) {
            throw new runtime.RequiredError('poolIndex','Required parameter requestParameters.poolIndex was null or undefined when calling farmStakingControllerGetClaimTransaction.');
        }

        if (requestParameters.gasPrice === null || requestParameters.gasPrice === undefined) {
            throw new runtime.RequiredError('gasPrice','Required parameter requestParameters.gasPrice was null or undefined when calling farmStakingControllerGetClaimTransaction.');
        }

        const queryParameters: any = {};

        if (requestParameters.ownerAddress !== undefined) {
            queryParameters['ownerAddress'] = requestParameters.ownerAddress;
        }

        if (requestParameters.rewardAddress !== undefined) {
            queryParameters['rewardAddress'] = requestParameters.rewardAddress;
        }

        if (requestParameters.poolIndex !== undefined) {
            queryParameters['poolIndex'] = requestParameters.poolIndex;
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
            path: `/v1/farms/{farmStatsType}/claim`.replace(`{${"farmStatsType"}}`, encodeURIComponent(String(requestParameters.farmStatsType))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionFromJSON(jsonValue));
    }

    /**
     * Builds a claim transaction for usage with Web3
     * Farm Claim Transaction
     */
    async farmStakingControllerGetClaimTransaction(requestParameters: FarmStakingControllerGetClaimTransactionRequest): Promise<Transaction> {
        const response = await this.farmStakingControllerGetClaimTransactionRaw(requestParameters);
        return await response.value();
    }

    /**
     * Builds an exit transaction for usage with Web3
     * Farm Exit Transaction
     */
    async farmStakingControllerGetExitTransactionRaw(requestParameters: FarmStakingControllerGetExitTransactionRequest): Promise<runtime.ApiResponse<Transaction>> {
        if (requestParameters.farmStatsType === null || requestParameters.farmStatsType === undefined) {
            throw new runtime.RequiredError('farmStatsType','Required parameter requestParameters.farmStatsType was null or undefined when calling farmStakingControllerGetExitTransaction.');
        }

        if (requestParameters.ownerAddress === null || requestParameters.ownerAddress === undefined) {
            throw new runtime.RequiredError('ownerAddress','Required parameter requestParameters.ownerAddress was null or undefined when calling farmStakingControllerGetExitTransaction.');
        }

        if (requestParameters.rewardAddress === null || requestParameters.rewardAddress === undefined) {
            throw new runtime.RequiredError('rewardAddress','Required parameter requestParameters.rewardAddress was null or undefined when calling farmStakingControllerGetExitTransaction.');
        }

        if (requestParameters.poolIndex === null || requestParameters.poolIndex === undefined) {
            throw new runtime.RequiredError('poolIndex','Required parameter requestParameters.poolIndex was null or undefined when calling farmStakingControllerGetExitTransaction.');
        }

        if (requestParameters.amount === null || requestParameters.amount === undefined) {
            throw new runtime.RequiredError('amount','Required parameter requestParameters.amount was null or undefined when calling farmStakingControllerGetExitTransaction.');
        }

        if (requestParameters.gasPrice === null || requestParameters.gasPrice === undefined) {
            throw new runtime.RequiredError('gasPrice','Required parameter requestParameters.gasPrice was null or undefined when calling farmStakingControllerGetExitTransaction.');
        }

        const queryParameters: any = {};

        if (requestParameters.ownerAddress !== undefined) {
            queryParameters['ownerAddress'] = requestParameters.ownerAddress;
        }

        if (requestParameters.rewardAddress !== undefined) {
            queryParameters['rewardAddress'] = requestParameters.rewardAddress;
        }

        if (requestParameters.poolIndex !== undefined) {
            queryParameters['poolIndex'] = requestParameters.poolIndex;
        }

        if (requestParameters.amount !== undefined) {
            queryParameters['amount'] = requestParameters.amount;
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
            path: `/v1/farms/{farmStatsType}/exit`.replace(`{${"farmStatsType"}}`, encodeURIComponent(String(requestParameters.farmStatsType))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionFromJSON(jsonValue));
    }

    /**
     * Builds an exit transaction for usage with Web3
     * Farm Exit Transaction
     */
    async farmStakingControllerGetExitTransaction(requestParameters: FarmStakingControllerGetExitTransactionRequest): Promise<Transaction> {
        const response = await this.farmStakingControllerGetExitTransactionRaw(requestParameters);
        return await response.value();
    }

    /**
     * Builds a staking transaction for usage with Web3
     * Farm Stake Transaction
     */
    async farmStakingControllerGetStakeTransactionRaw(requestParameters: FarmStakingControllerGetStakeTransactionRequest): Promise<runtime.ApiResponse<Transaction>> {
        if (requestParameters.farmStatsType === null || requestParameters.farmStatsType === undefined) {
            throw new runtime.RequiredError('farmStatsType','Required parameter requestParameters.farmStatsType was null or undefined when calling farmStakingControllerGetStakeTransaction.');
        }

        if (requestParameters.ownerAddress === null || requestParameters.ownerAddress === undefined) {
            throw new runtime.RequiredError('ownerAddress','Required parameter requestParameters.ownerAddress was null or undefined when calling farmStakingControllerGetStakeTransaction.');
        }

        if (requestParameters.rewardAddress === null || requestParameters.rewardAddress === undefined) {
            throw new runtime.RequiredError('rewardAddress','Required parameter requestParameters.rewardAddress was null or undefined when calling farmStakingControllerGetStakeTransaction.');
        }

        if (requestParameters.poolIndex === null || requestParameters.poolIndex === undefined) {
            throw new runtime.RequiredError('poolIndex','Required parameter requestParameters.poolIndex was null or undefined when calling farmStakingControllerGetStakeTransaction.');
        }

        if (requestParameters.amount === null || requestParameters.amount === undefined) {
            throw new runtime.RequiredError('amount','Required parameter requestParameters.amount was null or undefined when calling farmStakingControllerGetStakeTransaction.');
        }

        if (requestParameters.gasPrice === null || requestParameters.gasPrice === undefined) {
            throw new runtime.RequiredError('gasPrice','Required parameter requestParameters.gasPrice was null or undefined when calling farmStakingControllerGetStakeTransaction.');
        }

        const queryParameters: any = {};

        if (requestParameters.ownerAddress !== undefined) {
            queryParameters['ownerAddress'] = requestParameters.ownerAddress;
        }

        if (requestParameters.rewardAddress !== undefined) {
            queryParameters['rewardAddress'] = requestParameters.rewardAddress;
        }

        if (requestParameters.poolIndex !== undefined) {
            queryParameters['poolIndex'] = requestParameters.poolIndex;
        }

        if (requestParameters.amount !== undefined) {
            queryParameters['amount'] = requestParameters.amount;
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
            path: `/v1/farms/{farmStatsType}/stake`.replace(`{${"farmStatsType"}}`, encodeURIComponent(String(requestParameters.farmStatsType))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => TransactionFromJSON(jsonValue));
    }

    /**
     * Builds a staking transaction for usage with Web3
     * Farm Stake Transaction
     */
    async farmStakingControllerGetStakeTransaction(requestParameters: FarmStakingControllerGetStakeTransactionRequest): Promise<Transaction> {
        const response = await this.farmStakingControllerGetStakeTransactionRaw(requestParameters);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum FarmStakingControllerGetApprovalStateFarmStatsTypeEnum {
    Masterchef = 'masterchef',
    SingleStaking = 'single-staking',
    Geyser = 'geyser',
    Gauge = 'gauge'
}
/**
    * @export
    * @enum {string}
    */
export enum FarmStakingControllerGetApprovalStateNetworkEnum {
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
export enum FarmStakingControllerGetApprovalTransactionFarmStatsTypeEnum {
    Masterchef = 'masterchef',
    SingleStaking = 'single-staking',
    Geyser = 'geyser',
    Gauge = 'gauge'
}
/**
    * @export
    * @enum {string}
    */
export enum FarmStakingControllerGetApprovalTransactionNetworkEnum {
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
export enum FarmStakingControllerGetClaimTransactionFarmStatsTypeEnum {
    Masterchef = 'masterchef',
    SingleStaking = 'single-staking',
    Geyser = 'geyser',
    Gauge = 'gauge'
}
/**
    * @export
    * @enum {string}
    */
export enum FarmStakingControllerGetClaimTransactionNetworkEnum {
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
export enum FarmStakingControllerGetExitTransactionFarmStatsTypeEnum {
    Masterchef = 'masterchef',
    SingleStaking = 'single-staking',
    Geyser = 'geyser',
    Gauge = 'gauge'
}
/**
    * @export
    * @enum {string}
    */
export enum FarmStakingControllerGetExitTransactionNetworkEnum {
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
export enum FarmStakingControllerGetStakeTransactionFarmStatsTypeEnum {
    Masterchef = 'masterchef',
    SingleStaking = 'single-staking',
    Geyser = 'geyser',
    Gauge = 'gauge'
}
/**
    * @export
    * @enum {string}
    */
export enum FarmStakingControllerGetStakeTransactionNetworkEnum {
    Ethereum = 'ethereum',
    Polygon = 'polygon',
    Optimism = 'optimism',
    Xdai = 'xdai',
    BinanceSmartChain = 'binance-smart-chain',
    Fantom = 'fantom'
}
