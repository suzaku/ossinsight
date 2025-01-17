import React, {useMemo} from 'react'
import {useRemoteData} from "../RemoteCharts/hook";
import {renderChart} from "../RemoteCharts/withQuery";
import BrowserOnly from "@docusaurus/core/lib/client/exports/BrowserOnly";
import {Queries} from "../RemoteCharts/queries";
import {EChartsOption, SeriesOption} from "echarts";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import useThemeContext from "@theme/hooks/useThemeContext";
import {Opts} from "echarts-for-react/lib/types";

export interface ContributorsChartsProps {
  type: 'prs' | 'contributors'
  percent?: boolean
}

const blank = {}
export default function ContributorsCharts({type, percent = false}: ContributorsChartsProps) {
  const remoteData = useRemoteData('rt-osdb-contributors-by-repo-group', blank, false)
  const {data, loading} = remoteData

  return renderChart('rt-osdb-contributors-by-repo-group', (
    <BrowserOnly>
      {() => (
        <Charts
          data={data?.data ?? []}
          loading={loading}
          size={24}
          type={type}
          percent={percent}
        />
      )}
    </BrowserOnly>
  ), remoteData)
}

type Data = Queries['rt-osdb-contributors-by-repo-group']['data']
type GroupedData = Record<string, { totalPrs: number, contributors: { contributor: string, prs: number }[] }>
const steps = [10, 100, Infinity] as const
const stepLabels = [
  'Developers with no more than 10 PRs',
  'Developers with no more than 100 PRs',
  'Developers with more than 100 PRs',
]
type StepData = [repo: string, total: number, ...steps: number[]]

interface ChartsProps {
  data: Data[]
  type: 'prs' | 'contributors'
  percent: boolean
  loading: boolean
  size: number
}

function Charts({data: rawData, type, percent, loading, size}: ChartsProps) {
  const {isDarkTheme} = useThemeContext();
  const ordered = useOrdered(rawData)
  const data = useSteps(ordered, type, percent)

  const option: EChartsOption = useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
      },
      legend: {
        show: true
      },
      xAxis: {
        type: 'value',
        position: 'top',
        name: type,
        axisLabel: {
          formatter: percent
            ? (value: number) => (value * 100) + '%'
            : (value) => `${value} ${type}`
        },
        max: percent ? 1 : undefined
      },
      yAxis: {
        type: 'category',
        data: data.map(d => d[0]),
        inverse: true,
      },
      series: steps.map((step, i) => ({
        type: 'bar',
        name: stepLabels[i],
        data: data.map((items) => items[i + 2]),
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        label: !percent && i === steps.length - 1 ? {
          show: true,
          position: "right",
          formatter: (params) => `${data[params.dataIndex][1]}`
        } : undefined,
        tooltip: {
          valueFormatter: (value) => percent
            ? ((value as number) * 100).toFixed(1) + '%'
            : value
        }
      } as SeriesOption))
    }
  }, [steps, data, type])

  const height = useMemo(() => {
    return loading ? 400 : data.length * (size * 1.5)
  }, [size, loading, data])

  const opts: Opts = useMemo(() => {
    return {
      devicePixelRatio: window?.devicePixelRatio ?? 1,
      renderer: 'canvas',
      height,
      width: 'auto',
      locale: 'en'
    }
  }, [height])

  return (
    <ReactEChartsCore
      showLoading={loading}
      echarts={echarts}
      option={option}
      notMerge={false}
      lazyUpdate={true}
      theme={isDarkTheme ? 'dark' : 'vintage'}
      style={{
        height,
        marginBottom: 16,
        borderRadius: 'var(--ifm-global-radius)',
        overflow: 'hidden'
      }}
      opts={opts}
    />
  )
}


function useOrdered(data: Data[]): GroupedData {
  return useMemo(() => data.reduce((result, item) => {
    if (!result[item.repo_group_name]) {
      result[item.repo_group_name] = {
        contributors: [],
        totalPrs: 0
      }
    }
    const obj = result[item.repo_group_name]
    obj.totalPrs += item.prs
    obj.contributors.push({contributor: item.contributor, prs: item.prs})
    return result
  }, {}), [data])
}

function useSteps(data: GroupedData, type: 'prs' | 'contributors', percent: boolean): StepData[] {
  return useMemo(() => {
    return Object.entries(data).map(([name, obj]) => {
      const groups = steps.map(() => 0)
      let total = 0
      for (const {prs} of obj.contributors) {
        for (let i = 0; i < steps.length; i++) {
          if (prs < steps[i]) {
            const val = type === 'prs' ? prs : 1
            groups[i] += val
            total += val
            break
          }
        }
      }
      return [name, total, ...groups.map(i => percent ? i / total : i)] as StepData
    })
      .sort((a, b) => (b[1] as number) - (a[1] as number))
  }, [data, type])
}