import { ChainConfig } from '@/app/lib/wallet/hooks/useNetwork'
import appConfig from '@/app.config'
import { MessageStatus } from '@/app/lib/hooks/useLZClient'
import { Modal as ModalComponent } from '@/app/components/Modal'
import { Heading, Text } from '@/app/components/typography'
import Spinner from '@/app/components/Spinner'
import Link from 'next/link'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'

import Image from 'next/image'

export type ModalProps = {
  destinationChainConfig: ChainConfig
  isOpen?: boolean
  onClose: () => void
  status?: MessageStatus
  isBridging?: boolean
}

export const Modal = ({
  destinationChainConfig,
  isOpen,
  onClose,
  status,
  isBridging
}: ModalProps) => {
  return (
    <ModalComponent
      isOpen={isOpen}
      onClose={onClose}
      isClosable={status === MessageStatus.DELIVERED}
    >
      <div className='flex w-full flex-col items-center justify-center space-y-8 text-center lg:w-[20rem]'>
        <Heading as='h2'>
          {status === MessageStatus.DELIVERED ? 'Bridged' : 'Bridging'}{' '}
          {appConfig.name} tokens
        </Heading>
        {status === MessageStatus.CONFIRMING && (
          <Image
            src='/assets/gifs/bike.gif'
            alt='Bridge Waiting'
            width={120}
            height={120}
          />
        )}
        {status === MessageStatus.INFLIGHT && (
          <Image
            src='/assets/gifs/rocket.gif'
            alt='Bridge Waiting'
            width={120}
            height={120}
          />
        )}
        {status === MessageStatus.DELIVERED && (
          <Image
            src='/assets/gifs/hands.gif'
            alt='Bridge Done'
            width={120}
            height={120}
          />
        )}
        <div className='flex items-center justify-center space-x-4'>
          {status !== MessageStatus.DELIVERED && <Spinner />}
          <Text>
            {isBridging ? (
              'Sending tokens'
            ) : (
              <>
                {status === MessageStatus.DELIVERED ? (
                  <span>
                    Your tokens has been bridged <br />
                    successfully to {` `}
                    <Link
                      href={`${destinationChainConfig.marketplaceURL}/activity?search[eventTypes][0]=ASSET_TRANSFER`}
                      target='_blank'
                      className='inline-flex items-center space-x-px'
                    >
                      <ArrowTopRightOnSquareIcon width={16} height={16} />
                      <span>{destinationChainConfig.name}</span>
                    </Link>
                  </span>
                ) : (
                  'Almost there'
                )}
              </>
            )}
          </Text>
        </div>
      </div>
    </ModalComponent>
  )
}

export default Modal
