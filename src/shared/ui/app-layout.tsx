import { ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return <div>{children}</div>
}

interface AppLayoutHeaderProps {
  children: ReactNode
  className?: string
}

export function AppLayoutHeader({ children, className }: AppLayoutHeaderProps) {
  return (
    <header
      className={`desktop:h-18 desktop:px-6 flex h-15 items-center border-b border-b-gray-200 px-4 ${className || ''}`}
    >
      {children}
    </header>
  )
}

interface AppLayoutContentProps {
  children: ReactNode
  className?: string
}

export function AppLayoutContent({ children, className }: AppLayoutContentProps) {
  return <div className={`desktop:flex desktop:h-[calc(100vh-4.5rem)] ${className || ''}`}>{children}</div>
}

interface AppLayoutMainProps {
  children: ReactNode
  className?: string
}

export function AppLayoutMain({ children, className }: AppLayoutMainProps) {
  return <main className={`desktop:flex-1 desktop:px-6 desktop:py-7 min-w-0 ${className || ''}`}>{children}</main>
}

interface AppLayoutSidebarProps {
  children: ReactNode
  className?: string
}

export function AppLayoutSidebar({ children, className }: AppLayoutSidebarProps) {
  return (
    <aside className={`min-w-60 border-r border-r-gray-200 bg-gray-50 px-3 py-4 ${className || ''}`}>{children}</aside>
  )
}

interface AppLayoutFooterProps {
  children: ReactNode
  className?: string
}

export function AppLayoutFooter({ children, className }: AppLayoutFooterProps) {
  return (
    <footer className={`fixed right-0 bottom-0 left-0 border-t border-t-gray-300 px-4 pt-2 pb-4 ${className || ''}`}>
      {children}
    </footer>
  )
}
