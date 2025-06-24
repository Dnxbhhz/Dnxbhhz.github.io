import { cn } from '@/lib/utils'
import { Marquee } from '@/components/magicui/marquee'
import Image from 'next/image'

const thirdRow = [
  {
    name: 'Sass',
    body: '支持变量、嵌套、混入、继承等功能，提升样式编写的可维护性和复用性。',
    img: '/image/sass.png',
  },
  {
    name: 'Tailwind CSS',
    body: '实用工具类优先的 CSS 框架，开发中几乎不写自定义样式，极高自由度与响应式控制。',
    img: '/image/tailwindcss.png',
  },
  {
    name: 'Element UI',
    body: '饿了么开源的 Vue 2 UI 组件库，中文文档完善、组件丰富，适合中后台管理系统开发。',
    img: '/image/elementui.png',
  },
  {
    name: 'Ant Design',
    body: '企业级 UI 组件库，强调设计规范和一致性，风格简洁、组件功能强大，适合复杂业务场景',
    img: '/image/antd.png',
  },
]
const secondRow = [
  {
    name: 'webpack',
    body: '模块打包工具，支持代码分割、懒加载、热更新等功能，适合大型项目的构建优化。',
    img: '/image/webpack.png',
  },
  {
    name: 'vite',
    body: '下一代前端构建工具，基于ES模块的快速开发服务器，支持热更新和按需编译。',
    img: '/image/vite.png',
  },
  {
    name: 'Rollup',
    body: 'Rollup 是一个 JavaScript 模块打包器，专注于 ES6 模块的打包，支持 Tree Shaking 和代码分割，适合构建库和大型应用。',
    img: '/image/rollup.png',
  },
]

const firstRow = [
  {
    name: 'vuex',
    body: '使用严格的"mutation"流程，适合大型项目的全局状态共享',
    img: '/image/vuex.svg',
  },
  {
    name: 'pinia',
    body: '更轻量、类型更友好，支持模块化和组合式用法',
    img: '/image/pinia.png',
  },
  {
    name: 'vue-router',
    body: 'vue-router 是 Vue.js 的官方路由管理器，用于构建单页应用（SPA），支持路由守卫、动态路由、嵌套路由等特性。',
    img: '/image/vueRouter.svg',
  },
]
const fourthRow = [
  {
    name: 'Vue2/3',
    body: '轻量、高效，支持双向绑定与响应式系统；Vue 3 Composition API 提升了逻辑复用能力，用于构建中后台系统与组件库。',
    img: '/image/vue.svg',
  },
  {
    name: 'React',
    body: '基于组件化和虚拟 DOM 的声明式 UI 框架，适用于构建复杂交互的单页应用（SPA），项目中多用于构建后台管理系统和可复用组件。）',
    img: '/image/react.png',
  },
  {
    name: 'Electron',
    body: '基于 Node.js 和 Chromium 的桌面端框架，支持跨平台构建，曾用于开发测试平台的客户端版本，实现文件读写、本地缓存、剪贴板监听等功能。',
    img: '/image/electron.png',
  },
  {
    name: 'Next.js',
    body: 'React 的服务端渲染框架，支持 SSG / SSR / ISR 等模式，提升 SEO 和性能，常用于构建静态博客或文档站点。',
    img: '/image/next.svg',
  },
]

const ReviewCard = ({
  img,
  name,
  body,
}: {
  img: string
  name: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        'relative h-full w-fit sm:w-44 cursor-pointer overflow-hidden rounded-xl border p-6',
        // light styles
        'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
        // dark styles
        'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
      )}>
      <div className="flex flex-row items-center gap-3">
        <Image
          className="rounded-full"
          width={40}
          height={40}
          alt={name}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-base font-medium dark:text-white">
            {name}
          </figcaption>
        </div>
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed">{body}</blockquote>
    </figure>
  )
}

export function Marquee3D() {
  return (
    <div className="relative flex h-[600px] w-1/2 flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            'translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)',
        }}>
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {secondRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {thirdRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:20s]" vertical>
          {fourthRow.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  )
}
