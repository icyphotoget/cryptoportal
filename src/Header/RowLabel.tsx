'use client'

import React from 'react'
import type { RowLabelProps } from '@payloadcms/ui'
import { useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<any>()
  const safeRowNumber = typeof rowNumber === 'number' ? rowNumber : 0

  const label =
    (data?.label as string) ||
    (data?.title as string) ||
    (data?.text as string) ||
    `Row ${safeRowNumber + 1}`

  return <span>{label}</span>
}
