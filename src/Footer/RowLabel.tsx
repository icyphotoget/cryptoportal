'use client'

import React from 'react'
import type { RowLabelProps } from '@payloadcms/ui'
import { useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const { data, rowNumber } = useRowLabel<any>()

  const label =
    (data?.label as string) ||
    (data?.title as string) ||
    (data?.text as string) ||
    `Row ${rowNumber + 1}`

  return <span>{label}</span>
}
