'use client'
import { usePathname } from 'next/navigation'

import { PageData } from '@/@types/defaults'

interface HeaderTitleProps {
  data: PageData[]
}

export function HeaderTitle({ data }: HeaderTitleProps) {
  const pathname = usePathname()
  const currentPage = data.find(({ url }) => url.includes(pathname))

  return <h2>{currentPage?.title}</h2>
}
