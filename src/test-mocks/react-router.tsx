/* eslint-disable react-refresh/only-export-components */
import type { ReactNode, AnchorHTMLAttributes } from 'react'

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
  children: ReactNode
}

export function Link({ to, children, ...props }: LinkProps) {
  return (
    <a href={to} {...props}>
      {children}
    </a>
  )
}

export function MemoryRouter({ children }: { children: ReactNode }) {
  return <>{children}</>
}
export function useParams() {
  return { id: '1' }
}