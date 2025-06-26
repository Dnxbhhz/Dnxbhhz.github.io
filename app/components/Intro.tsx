'use client'

import { BoxReveal } from '@/components/magicui/box-reveal'
import { useRouter } from 'next/navigation'
import { ChevronRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function BoxRevealDemo() {
  const router = useRouter()
  const goToblog = () => {
    router.push('/blog')
  }

  return (
    <div className="size-full max-w-lg items-center justify-center overflow-hidden pt-8 mt-52">
      <BoxReveal boxColor={'var(--my-purple)'} duration={0.5}>
        <p className="text-[3.5rem] font-semibold">
          Hello,这里是东南
          <span className="text-[color:var(--my-purple)]">.</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={'var(--my-purple)'} duration={0.5}>
        <h2 className="mt-[.5rem] text-[1rem]">
          让想法落地的{' '}
          <span className="text-[color:var(--my-purple)]">前端程序猿</span>
        </h2>
      </BoxReveal>

      <BoxReveal boxColor={'var(--my-purple)'} duration={0.5}>
        <div className="mt-6">
          <p>
            -&gt; 2020年毕业于
            <span className="font-semibold text-[color:var(--my-purple)]">
              西北大学
            </span>
            <br />
            -&gt; 具备丰富的前端开发经验，曾主导多个中大型平台的
            <span className="font-semibold text-[color:var(--my-purple)]">
              架构设计
            </span>
            <br />
            与核心功能开发;
            <br />
            -&gt; 熟悉前端工程化体系，熟练使用
            <span className="font-semibold text-[color:var(--my-purple)]">
              构建工具链
            </span>
            ，具备从零开始全链路搭建大型项目的能力;
            <br />
            -&gt; 具备
            <span className="font-semibold text-[color:var(--my-purple)]">
              微前端
            </span>
            实践经验，实现子系统模块化拆分与独立部署，解决样式隔离、状态同步等核心问题;
            <br />
          </p>
        </div>
      </BoxReveal>

      <BoxReveal boxColor={'var(--my-purple)'} duration={0.5}>
        <Button
          className="mt-[1.6rem] bg-[color:var(--my-purple)]"
          onClick={() => goToblog()}>
          获取灵感
          <ChevronRightIcon className="ml-1 size-4" />
        </Button>
      </BoxReveal>
    </div>
  )
}
