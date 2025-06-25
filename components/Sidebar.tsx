'use client'

import { DocNode } from '@/lib/getDocTree'
import ActiveLink from './ActiveLink'
import { useState, useEffect, useLayoutEffect } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  ChevronRight as ChevronRightIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

function Tree({
  tree,
  base = '/blog',
  isCollapsed = false,
}: {
  tree: DocNode[]
  base?: string
  isCollapsed?: boolean
}) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set())
  const [isAnimating, setIsAnimating] = useState(false)

  // 从本地存储读取展开状态
  useLayoutEffect(() => {
    const savedExpanded = localStorage.getItem('sidebar-expanded-nodes')
    if (savedExpanded) {
      try {
        const expanded = JSON.parse(savedExpanded)
        setExpandedNodes(new Set(expanded))
      } catch {
        // 如果解析失败，使用默认展开状态
        const defaultExpanded = new Set<string>()
        tree.forEach((node) => {
          if (
            node.type === 'folder' &&
            node.children &&
            node.children.length > 0
          ) {
            defaultExpanded.add(node.path)
          }
        })
        setExpandedNodes(defaultExpanded)
      }
    } else {
      // 默认展开所有有子节点的文件夹
      const defaultExpanded = new Set<string>()
      tree.forEach((node) => {
        if (
          node.type === 'folder' &&
          node.children &&
          node.children.length > 0
        ) {
          defaultExpanded.add(node.path)
        }
      })
      setExpandedNodes(defaultExpanded)
    }
  }, [tree])

  const toggleNode = (nodePath: string) => {
    if (isAnimating) return // 防止动画期间重复点击

    setIsAnimating(true)
    const isCurrentlyExpanded = expandedNodes.has(nodePath)

    if (isCurrentlyExpanded) {
      // 收起节点
      setExpandedNodes((prev) => {
        const newSet = new Set(prev)
        newSet.delete(nodePath)
        // 保存到本地存储
        localStorage.setItem(
          'sidebar-expanded-nodes',
          JSON.stringify(Array.from(newSet)),
        )
        return newSet
      })
    } else {
      // 展开节点
      setExpandedNodes((prev) => {
        const newSet = new Set(prev)
        newSet.add(nodePath)
        // 保存到本地存储
        localStorage.setItem(
          'sidebar-expanded-nodes',
          JSON.stringify(Array.from(newSet)),
        )
        return newSet
      })
    }

    // 动画结束后重置状态
    setTimeout(() => setIsAnimating(false), 300)
  }

  if (isCollapsed) {
    return null
  }

  return (
    <ul className="pl-2 w-full">
      {tree.map((node) =>
        node.type === 'folder' ? (
          <li key={node.path} className="mb-2 w-full">
            <div
              className="flex items-center gap-1 font-bold text-sm text-muted-foreground mb-1 cursor-pointer hover:text-foreground transition-colors rounded px-1 py-0.5 hover:bg-accent w-full"
              onClick={() => toggleNode(node.path)}>
              <div
                className={`shrink-0 transition-transform duration-200 ${
                  expandedNodes.has(node.path) ? 'rotate-90' : ''
                }`}>
                <ChevronRightIcon
                  size={14}
                  className="shrink-0 transition-transform"
                />
              </div>
              <span className="truncate flex-1">{node.name}</span>
            </div>
            <div
              className={`grid transition-all duration-300 ease-out w-full ${
                expandedNodes.has(node.path)
                  ? 'grid-rows-[1fr]'
                  : 'grid-rows-[0fr]'
              }`}>
              <div className="overflow-hidden w-full">
                <div className="ml-4 border-l border-border/50 pl-2 w-full">
                  <Tree
                    tree={node.children || []}
                    base={base}
                    isCollapsed={isCollapsed}
                  />
                </div>
              </div>
            </div>
          </li>
        ) : (
          <li key={node.path} className="mb-1 w-full">
            <ActiveLink href={`${base}/${node.path}`}>{node.name}</ActiveLink>
          </li>
        ),
      )}
    </ul>
  )
}

interface SidebarProps {
  tree: DocNode[]
}

export default function Sidebar({ tree }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // 从本地存储读取侧边栏状态
  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-collapsed')
    if (savedState !== null) {
      setIsCollapsed(JSON.parse(savedState))
    }
    setIsMounted(true)
  }, [])

  // 保存侧边栏状态到本地存储
  const toggleCollapsed = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newState))
  }

  // 键盘快捷键监听
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+B 或 Cmd+B 切换侧边栏
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault()
        const newState = !isCollapsed
        setIsCollapsed(newState)
        localStorage.setItem('sidebar-collapsed', JSON.stringify(newState))
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isCollapsed]) // 依赖 isCollapsed 以确保 toggleCollapsed 函数是最新的

  // 防止水合不匹配
  if (!isMounted) {
    return (
      <aside className="sticky top-[88px] h-[calc(100vh-88px)] w-64 shrink-0 border-r bg-background/80 p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">文档导航</h2>
        </div>
        <Tree tree={tree} />
      </aside>
    )
  }

  return (
    <TooltipProvider>
      <aside
        className={`sticky top-[88px] h-[calc(100vh-88px)] shrink-0 border-r bg-background/80 p-4 overflow-y-auto transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}>
        <div className="flex items-center justify-between mb-4">
          <div
            className={`transition-all duration-300 overflow-hidden ${
              isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            }`}>
            <h2 className="text-lg font-semibold whitespace-nowrap">
              文档导航
            </h2>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCollapsed}
                className={`${isCollapsed ? 'mx-auto' : 'ml-auto'}`}>
                {isCollapsed ? (
                  <ChevronRight size={16} />
                ) : (
                  <ChevronLeft size={16} />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {isCollapsed ? '展开侧边栏 (Ctrl+B)' : '收起侧边栏 (Ctrl+B)'}
            </TooltipContent>
          </Tooltip>
        </div>

        {!isCollapsed && (
          <div className="w-56 min-w-56">
            <Tree tree={tree} isCollapsed={isCollapsed} />
          </div>
        )}
      </aside>
    </TooltipProvider>
  )
}
