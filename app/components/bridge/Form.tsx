'use client'

import {
  useBalance,
  useChainContract,
  useNetwork,
  useWallet
} from '@/app/lib/wallet/hooks'

import assetsUtils from '@/app/lib/utils/assets'
import { Text } from '@/app/components/typography'
import { Button, Variant, Sizes } from '@/app/components/button/Button'
import { Children } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { LoadingSkeleton } from '../loading'
import addressUtils from '@/app/lib/utils/address'
import useERC721ApproveAll from '@/app/lib/wallet/hooks/useERC721ApproveAll'
import { useFormContext } from 'react-hook-form'
import useBridge from '@/app/lib/hooks/bridge/useBridge'
import useChainConfig from '@/app/lib/wallet/hooks/useChainConfig'
import { ethers } from 'ethers'

export type BridgeFormFields = {
  tokenIds: string
  destinationChainId: string
}

export const BridgeForm = () => {
  const { register, handleSubmit, watch } = useFormContext<BridgeFormFields>()
  const { balance } = useBalance()
  const { isConnected } = useWallet()
  const { config, chains } = useNetwork()

  const token = useChainContract('token')
  const bridge = useChainContract('bridge')

  const remainingChain = chains.filter((chain) => chain.id !== config.id)

  const tokenIdsField = watch('tokenIds')
  const destinationChainIdField = watch('destinationChainId')

  const { config: destinationConfig } = useChainConfig({
    chainId: +destinationChainIdField
  })

  const {
    isApproving,
    isApprovedForAll,
    isLoading: isApproveAllLoading,
    approveAll
  } = useERC721ApproveAll(token.address, bridge.address)

  const {
    sendBatchFrom,
    fees,
    isLoading: isBridgeLoading
  } = useBridge({
    bridgeAddress: bridge.address,
    tokenIds: tokenIdsField.split(',').map((id) => id.trim()),
    destinationChainId: destinationConfig.abstractId
  })

  const onSubmit = async () => {
    try {
      if (!isApprovedForAll) {
        await approveAll()
      }

      await sendBatchFrom()
    } catch (error) {
      console.error('Something wrong while bridging your tokens', error)
    }
  }

  return (
    <form
      key={config.id}
      noValidate
      className='flex flex-col space-y-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset>
        <legend>
          <Text>Collection Address</Text>
        </legend>
        <div className='flex items-center space-x-4'>
          <Link
            className='flex-1'
            target='_blank'
            href={`${config.blockExplorers?.default.url}/address/${token.address}`}
          >
            <Text>{addressUtils.toEllipsis(token.address, 12, 12)}</Text>
          </Link>
          {config.isSourceChain && (
            <Link
              target='_blank'
              href={`${config.blockExplorers?.default.url}/address/${token}`}
            >
              <Text>Mint</Text>
            </Link>
          )}
        </div>
      </fieldset>
      <fieldset className='flex flex-col space-y-2'>
        <legend>
          <Text>Type your token id&apos;s</Text>
        </legend>
        <input
          {...register('tokenIds', { required: true })}
          disabled={!isConnected || isApproveAllLoading}
          type='text'
          placeholder='separated by comma'
          className={classNames(
            Sizes.default.classes,
            'w-full rounded-md',
            isConnected
              ? [Variant.default.classes, Variant.default.hover]
              : [Variant.default.disabled]
          )}
        />
      </fieldset>
      <fieldset>
        <legend>
          <Text>Choose your target network</Text>
        </legend>
        <select
          {...register('destinationChainId', { required: true })}
          disabled={!isConnected || isApproveAllLoading}
          defaultValue={isConnected ? config.id : ''}
          className={classNames(
            Sizes.default.classes,
            'w-full rounded-md',
            isConnected
              ? [Variant.default.classes, Variant.default.hover]
              : [Variant.default.disabled]
          )}
        >
          <option value=''>Select a network</option>

          {Children.toArray(
            remainingChain.map((chain) => (
              <option value={chain.id}>{chain.name}</option>
            ))
          )}
        </select>
      </fieldset>
      <div>
        <ul>
          <li>
            <Text>
              Balance:
              {`${assetsUtils.formatBalance(
                isConnected ? balance?.formatted : 0,
                4,
                0
              )} ${config.nativeCurrency.symbol}`}
            </Text>
          </li>
          <li>
            <Text>
              Fees:{' '}
              {assetsUtils.formatBalance(
                isConnected
                  ? ethers.formatUnits(fees.toString()).toString()
                  : 0,
                12,
                4
              )}{' '}
              {config.nativeCurrency.symbol}
            </Text>
          </li>
        </ul>
      </div>
      {isApproving && (
        <div className='flex flex-col items-center justify-center space-y-2'>
          <Text>Your are approving bridge to transfer your tokens</Text>
          <LoadingSkeleton className='h-2 w-full flex-1' />
        </div>
      )}
      {isBridgeLoading && (
        <div className='flex flex-col items-center justify-center space-y-2'>
          <Text>Your are bridging your tokens</Text>
          <LoadingSkeleton className='h-2 w-full flex-1' />
        </div>
      )}
      <Button
        type='submit'
        disabled={!isConnected || isApproveAllLoading || isBridgeLoading}
      >
        <>{!isApprovedForAll ? 'Approve' : 'Bridge'}</>
      </Button>
    </form>
  )
}

export default BridgeForm
