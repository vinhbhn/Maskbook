/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from 'bn.js'
import { ContractOptions } from 'web3-eth-contract'
import { EventLog } from 'web3-core'
import { EventEmitter } from 'events'
import {
    Callback,
    PayableTransactionObject,
    NonPayableTransactionObject,
    BlockType,
    ContractEventLog,
    BaseContract,
} from './types'

interface EventOptions {
    filter?: object
    fromBlock?: BlockType
    topics?: string[]
}

export type DonationSent = ContractEventLog<{
    token: string
    amount: string
    dest: string
    donor: string
    0: string
    1: string
    2: string
    3: string
}>
export type OwnershipTransferred = ContractEventLog<{
    previousOwner: string
    newOwner: string
    0: string
    1: string
}>
export type Paused = ContractEventLog<{
    account: string
    0: string
}>
export type TokenWithdrawn = ContractEventLog<{
    token: string
    amount: string
    dest: string
    0: string
    1: string
    2: string
}>
export type Unpaused = ContractEventLog<{
    account: string
    0: string
}>

export interface BulkCheckout extends BaseContract {
    constructor(jsonInterface: any[], address?: string, options?: ContractOptions): BulkCheckout
    clone(): BulkCheckout
    methods: {
        donate(_donations: [string, number | string | BN, string][]): PayableTransactionObject<void>

        owner(): NonPayableTransactionObject<string>

        pause(): NonPayableTransactionObject<void>

        paused(): NonPayableTransactionObject<boolean>

        renounceOwnership(): NonPayableTransactionObject<void>

        transferOwnership(newOwner: string): NonPayableTransactionObject<void>

        unpause(): NonPayableTransactionObject<void>

        withdrawEther(_dest: string): NonPayableTransactionObject<void>

        withdrawToken(_tokenAddress: string, _dest: string): NonPayableTransactionObject<void>
    }
    events: {
        DonationSent(cb?: Callback<DonationSent>): EventEmitter
        DonationSent(options?: EventOptions, cb?: Callback<DonationSent>): EventEmitter

        OwnershipTransferred(cb?: Callback<OwnershipTransferred>): EventEmitter
        OwnershipTransferred(options?: EventOptions, cb?: Callback<OwnershipTransferred>): EventEmitter

        Paused(cb?: Callback<Paused>): EventEmitter
        Paused(options?: EventOptions, cb?: Callback<Paused>): EventEmitter

        TokenWithdrawn(cb?: Callback<TokenWithdrawn>): EventEmitter
        TokenWithdrawn(options?: EventOptions, cb?: Callback<TokenWithdrawn>): EventEmitter

        Unpaused(cb?: Callback<Unpaused>): EventEmitter
        Unpaused(options?: EventOptions, cb?: Callback<Unpaused>): EventEmitter

        allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter
    }

    once(event: 'DonationSent', cb: Callback<DonationSent>): void
    once(event: 'DonationSent', options: EventOptions, cb: Callback<DonationSent>): void

    once(event: 'OwnershipTransferred', cb: Callback<OwnershipTransferred>): void
    once(event: 'OwnershipTransferred', options: EventOptions, cb: Callback<OwnershipTransferred>): void

    once(event: 'Paused', cb: Callback<Paused>): void
    once(event: 'Paused', options: EventOptions, cb: Callback<Paused>): void

    once(event: 'TokenWithdrawn', cb: Callback<TokenWithdrawn>): void
    once(event: 'TokenWithdrawn', options: EventOptions, cb: Callback<TokenWithdrawn>): void

    once(event: 'Unpaused', cb: Callback<Unpaused>): void
    once(event: 'Unpaused', options: EventOptions, cb: Callback<Unpaused>): void
}