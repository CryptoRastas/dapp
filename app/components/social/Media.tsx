'use client'

import { Children, HTMLProps } from 'react'

import Link from 'next/link'
import appConfig from '@/app.config'
import { Text } from '@/app/components/typography'
import Image from 'next/image'
import classNames from 'classnames'

const medias = Object.values(appConfig.social.media)

export const SocialMedia = ({
  className,
  ...props
}: HTMLProps<HTMLUListElement>) => {
  return (
    <ul {...props} className={classNames(className, 'flex space-x-6')}>
      {Children.toArray(
        medias.map((socialMedia, index) => (
          <>
            <li>
              <Link href={socialMedia.url} target='_blank'>
                {socialMedia.icon ? (
                  <div className='relative h-6 w-6'>
                    <Image
                      alt={socialMedia.label}
                      src={socialMedia.icon}
                      fill
                    />
                  </div>
                ) : (
                  <Text className='text-indigo-400'>{socialMedia.label}</Text>
                )}
              </Link>
            </li>
            {index === medias.length - 1 ? null : (
              <li className='border border-indigo-200 dark:border-gray-700'></li>
            )}
          </>
        ))
      )}
    </ul>
  )
}

export default SocialMedia
