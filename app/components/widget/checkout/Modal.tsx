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
  senderAddress?: string
  destinationChainConfig: ChainConfig
  isOpen?: boolean
  onClose: () => void
  status?: MessageStatus
  isBridging?: boolean
}

export const Modal = ({
  senderAddress,
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
      <div className='flex flex-col space-y-8 text-center'>
        <Heading as='h2'>
          Bridging your
          <br /> {appConfig.name} tokens
        </Heading>
        {status === MessageStatus.DELIVERED && (
          <Image
            src='/assets/gifs/bridge-done.gif'
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
                      href={`${destinationChainConfig.blockExplorers?.default.url}/${senderAddress}`}
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
