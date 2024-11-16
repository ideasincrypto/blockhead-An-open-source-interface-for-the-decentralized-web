/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/v1.1/1": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Prices for whitelisted tokens
         * @description Prices for whitelisted tokens
         */
        get: operations["getWhitelistedTokensPrices"];
        put?: never;
        /**
         * Prices for requested tokens
         * @description Returns prices for requested tokens
         */
        post: operations["getPricesForRequestedTokens"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1.1/1/currencies": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List of custom currencies
         * @description Custom currencies
         */
        get: operations["getCustomCurrenciesList"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/v1.1/1/{addresses}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Prices for requested tokens
         * @description Returns prices for requested tokens
         */
        get: operations["getPricesForRequestedTokens"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        CurrenciesResponseDto: {
            codes: string[];
        };
        GetPricesRequestDto: {
            /** @example [
             *       "0x111111111117dc0aa78b770fa6a738034120c302"
             *     ] */
            tokens: string[];
            /**
             * @description If no currency provided, then price returned in native Wei
             * @enum {string}
             */
            currency?: "USD";
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getWhitelistedTokensPrices: {
        parameters: {
            query?: {
                /** @description If no currency provided, then price returned in native Wei */
                currency?: "USD" | "AED" | "ARS" | "AUD" | "BDT" | "BHD" | "BMD" | "BRL" | "CAD" | "CHF" | "CLP" | "CNY" | "CZK" | "DKK" | "EUR" | "GBP" | "HKD" | "HUF" | "IDR" | "ILS" | "INR" | "JPY" | "KRW" | "KWD" | "LKR" | "MMK" | "MXN" | "MYR" | "NGN" | "NOK" | "NZD" | "PHP" | "PKR" | "PLN" | "RUB" | "SAR" | "SEK" | "SGD" | "THB" | "TRY" | "TWD" | "UAH" | "VEF" | "VND" | "ZAR";
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Prices for whitelisted tokens */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
        };
    };
    getPricesForRequestedTokens: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["GetPricesRequestDto"];
            };
        };
        responses: {
            /** @description Prices for requested tokens */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {unknown} */
                        error?: "Bad Request";
                        description?: string;
                        /** @enum {unknown} */
                        statusCode?: 400;
                        meta?: {
                            /** @example address */
                            type?: string;
                            /** @example 0xbad_address */
                            value?: unknown;
                        }[];
                    };
                };
            };
        };
    };
    getCustomCurrenciesList: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List of supported currencies */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CurrenciesResponseDto"];
                };
            };
        };
    };
    getPricesForRequestedTokens: {
        parameters: {
            query?: {
                /** @description If no currency provided, then price returned in native Wei */
                currency?: "USD" | "AED" | "ARS" | "AUD" | "BDT" | "BHD" | "BMD" | "BRL" | "CAD" | "CHF" | "CLP" | "CNY" | "CZK" | "DKK" | "EUR" | "GBP" | "HKD" | "HUF" | "IDR" | "ILS" | "INR" | "JPY" | "KRW" | "KWD" | "LKR" | "MMK" | "MXN" | "MYR" | "NGN" | "NOK" | "NZD" | "PHP" | "PKR" | "PLN" | "RUB" | "SAR" | "SEK" | "SGD" | "THB" | "TRY" | "TWD" | "UAH" | "VEF" | "VND" | "ZAR";
            };
            header?: never;
            path: {
                /** @description To get many prices pass addresses separated by comma */
                addresses: string[];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Prices for whitelisted tokens */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @enum {unknown} */
                        error?: "Bad Request";
                        description?: string;
                        /** @enum {unknown} */
                        statusCode?: 400;
                        meta?: {
                            /** @example address */
                            type?: string;
                            /** @example 0xbad_address */
                            value?: unknown;
                        }[];
                    };
                };
            };
        };
    };
}
