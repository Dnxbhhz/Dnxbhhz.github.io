'use client'

import siteMetadata from '@/data/siteMetadata'
import Link from '../../components/Link'
import { AnimatedGradientText } from '@/components/magicui/animated-gradient-text'
import { Dock, DockIcon } from '@/components/magicui/dock'
import { HomeIcon, MailIcon, PencilIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/mode-toggle'
import { GithubIcon, type IconProps } from '@/components/icons/GithubIcon'
import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

function OwnerStats({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const flag = searchParams.get('stats')
    if (typeof window === 'undefined') return
    if (flag === '1') {
      localStorage.setItem('showStats', '1')
      setVisible(true)
      return
    }
    if (flag === '0') {
      localStorage.removeItem('showStats')
      setVisible(false)
      return
    }
    const stored = localStorage.getItem('showStats') === '1'
    setVisible(stored)
  }, [searchParams])

  if (!visible) return null
  return <>{children}</>
}

export default function Header() {
  const headerClass =
    'fixed top-0 z-50 flex w-full items-center justify-between bg-background/95 px-10 py-5 backdrop-blur supports-[backdrop-filter]:bg-background/60'
  const Icons = {
    email: (props: IconProps) => <MailIcon {...props} />,
    github: (props: IconProps) => <GithubIcon {...props} />,
  }

  const DATA = {
    navbar: [
      { href: '/', icon: HomeIcon, label: 'Home' },
      { href: '/blog', icon: PencilIcon, label: 'Blog' },
    ],
    contact: {
      social: {
        GitHub: {
          name: 'GitHub',
          url: '#',
          icon: Icons.github,
        },
        email: {
          name: 'Send Email',
          url: '#',
          icon: Icons.email,
        },
      },
    },
  }
  return (
    <header className={headerClass}>
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <AnimatedGradientText
            speed={1}
            colorFrom="oklch(71.4% 0.203 305.504)"
            colorTo="#5046e6"
            className="text-3xl font-semibold tracking-tight">
            {siteMetadata.headerTitle}
          </AnimatedGradientText>
        </Link>
        <Suspense fallback={null}>
          <OwnerStats>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              访客数：<span id="busuanzi_value_uv">...</span> ｜ 浏览量：
              <span id="busuanzi_value_pv">...</span>
            </div>
          </OwnerStats>
        </Suspense>
      </div>

      <TooltipProvider>
        <Dock direction="middle">
          {DATA.navbar.map((item) => (
            <DockIcon key={item.label}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'icon' }),
                      'size-12 rounded-full',
                    )}>
                    <item.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full" />
          {Object.entries(DATA.contact.social).map(([name, social]) => (
            <DockIcon key={name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={social.url}
                    aria-label={social.name}
                    className={cn(
                      buttonVariants({ variant: 'ghost', size: 'icon' }),
                      'size-12 rounded-full',
                    )}>
                    <social.icon className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}
          <Separator orientation="vertical" className="h-full py-2" />
          <DockIcon>
            <ModeToggle />
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </header>
  )
}
