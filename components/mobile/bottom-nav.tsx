'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home,
  Search,
  Sparkles,
  BarChart3,
  User
} from 'lucide-react'

const navItems = [
  {
    href: '/',
    icon: Home,
    label: 'Home'
  },
  {
    href: '/automations',
    icon: Search,
    label: 'Browse'
  },
  {
    href: '/discoveries',
    icon: Sparkles,
    label: 'Feed'
  },
  {
    href: '/analytics',
    icon: BarChart3,
    label: 'Analytics'
  },
  {
    href: '/dashboard',
    icon: User,
    label: 'Profile'
  }
]

export function BottomNav() {
  const pathname = usePathname()
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 md:hidden z-50">
      <div className="grid grid-cols-5">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                isActive 
                  ? 'text-primary bg-primary/5' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-primary'
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 ${isActive ? 'text-primary' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}