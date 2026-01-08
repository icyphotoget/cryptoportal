import React from 'react'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'

// Lokalni tip umjesto payload-types Header
type HeaderType = Record<string, any>

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  // Template obično ima navigaciju negdje u data.navItems ili data.nav
  // Ovdje radimo fallback da ne pukne ako je prazno
  const navItems =
    (data?.navItems as any[]) ||
    (data?.nav as any[]) ||
    (data?.links as any[]) ||
    []

  if (!navItems.length) {
    // fallback hardcoded nav ako CMS nije podešen
    return (
      <nav className="flex items-center gap-6 text-sm">
        <Link href="/posts" className="opacity-80 hover:opacity-100">
          News
        </Link>
        <Link href="/markets" className="opacity-80 hover:opacity-100">
          Markets
        </Link>
        <Link href="/search" className="opacity-80 hover:opacity-100">
          Search
        </Link>
      </nav>
    )
  }

  return (
    <nav className="flex items-center gap-4">
      {navItems.map((item, i) => (
        <CMSLink key={i} {...item} />
      ))}
    </nav>
  )
}
