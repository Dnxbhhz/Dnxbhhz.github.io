'use client'
import React, { useState } from 'react'

type CardData = { title: string; value: number }
const data: CardData[] = [
  { title: '总应用数', value: 109 },
  { title: '智能问答应用', value: 13 },
  { title: '智能问数应用', value: 46 },
  { title: '运行中x', value: 46 },
  { title: '总应用数', value: 109 },
  { title: '智能问答应用', value: 13 },
  { title: '智能问数应用', value: 46 },
  { title: '运行中', value: 46 },
  // 可以继续添加更多卡片
]

const CARDS_PER_PAGE = 4

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

const groupedData = chunkArray(data, CARDS_PER_PAGE)

export default function CustomCarousel() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => Math.max(0, c - 1))
  const next = () => setCurrent((c) => Math.min(groupedData.length - 1, c + 1))

  return (
    <div className="relative w-full mx-auto px-6">
      {/* 左右按钮 */}
      <button
        onClick={prev}
        disabled={current === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow px-3 py-1">
        {'<'}
      </button>
      <button
        onClick={next}
        disabled={current === groupedData.length - 1}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow px-3 py-1">
        {'>'}
      </button>

      {/* 走马灯窗口 */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{
            width: `${groupedData.length * 100}%`,
            transform: `translateX(-${current * (100 / groupedData.length)}%)`,
          }}>
          {groupedData.map((group, idx) => (
            <div
              key={idx}
              className="flex w-full gap-4"
              style={{ width: `${100 / groupedData.length}%` }}>
              {group.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-row items-center justify-around h-52 w-1/4 border-1 rounded-[8px]">
                  <div>
                    <p className="text-[18px] mb-4">{item.title}</p>
                    <p className="text-[30px] font-bold">{item.value}</p>
                  </div>
                  <div className="w-1px h-full bg-amber-700"></div>
                  <div>
                    <p className="text-[18px] mb-4">{item.title}</p>
                    <p className="text-[30px] font-bold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
