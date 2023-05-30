import { NextResponse } from "next/server";
import { AppConfig, WidgetType } from "@/interface";

export async function GET() {
  const appConfig: AppConfig = {
    widgets: [
      {
        type: WidgetType.JINSECAIJING_NEWS,
        size: "large",
        name: "7*24快讯",
        icon: "https://www.jinse.com/favicon.ico",
        origin: "https://www.jinse.com/lives",
        api: "https://api.jinse.cn/noah/v2/lives?limit=50&reading=false&source=web&flag=down&id=0&category=0",
        dataProp: "list.0.lives",
        timeProp: "created_at",
        nameTemplate: "{content_prefix}",
        linkTemplate: "https://www.jinse.com/lives/{id}.html",
      },

      {
        type: WidgetType.JINSECAIJING_NEWS,
        size: "large",
        name: "大事件",
        icon: "https://www.jinse.com/favicon.ico",
        origin: "https://www.jinse.cn/coin_circle",
        api: "https://api.jinse.com/noah/v1/modules?page=1&limit=50&module_type=2",
        dataProp: "data.list",
        timeProp: "published_at",
        nameTemplate: "title",
        linkTemplate: "https://www.jinse.cn/lives/{object_id}.html",
      },

      {
        type: WidgetType.JINSECAIJING_NEWS,
        size: "large",
        name: "MEXC·最新公告",
        icon: "https://www.mexc.com/sites/favicon.ico",
        origin: "https://www.mexc.com/zh-CN/support/sections/360000679912",

        api: "https://www.mexc.com/help/announce/api/new/zh-CN/section/360000679912/articles?page=1&perPage=50",
        dataProp: "results",
        timeProp: "",
        nameTemplate: "{title}",
        linkTemplate: "https://www.mexc.com/zh-CN/support/articles/{id}",
      },

      {
        type: WidgetType.JINSECAIJING_ACTIVE,
        size: "large",
        name: "近期活动",
        icon: "https://www.jinse.com/favicon.ico",
        origin: "https://www.jinse.com/activity",

        api: "https://api.jinse.cn/v6/activities?page=1&limit=20&classify=all&city=all&date=all",
        revalidate: 60,
        dataProp: "data.list",

        nameProp: "title",
        statusProp: "activity_status_str",
        linkTemplate: "https://www.jinse.com/activity/{url_key}.html",
      },

      {
        type: WidgetType.XUEQIU_ZHISHUGUZHI,
        size: "large",
        api: "https://danjuanfunds.com/djapi/index_eva/dj",
        codes: ["SZ399986", "SH000015", "SH000922", "SZ399550", "SZ399812"],
      },
      {
        type: WidgetType.DONGFANGCAIFU_NIUXIONGZHIBIAO,
        size: "medium",
      },

      // {
      //   type: 1,
      //   size: "large",
      //   name: "大事件",
      //   icon: "https://www.8btc.com/favicon.ico",
      //   origin: "https://www.8btc.com/flash",
      //   method: "POST",
      //   payload:
      //     '{"operationName":"listFlash","variables":{"flashCategory":"HIGHLIGHT","first":20},"query":"query listFlash($first: Int, $after: String, $showOn7x24h: Boolean, $flashCategory: FlashCategory = GENERAL, $tag: Int, $startTime: Date, $endTime: Date) {\\n  articleGraph {\\n    list: listFlash(page: {first: $first, after: $after, pattern: CURSOR}, param: {flashCategory: $flashCategory, showOn7x24h: $showOn7x24h, tagId: $tag, startTime: $startTime, endTime: $endTime}) {\\n      edges {\\n        node {\\n          id\\n          post {\\n            title\\n            desc\\n            content\\n            postDate\\n            thumbnail\\n            __typename\\n          }\\n          extra {\\n            authorInfo {\\n              base {\\n                displayName\\n                __typename\\n              }\\n              __typename\\n            }\\n            source {\\n              link\\n              name\\n              __typename\\n            }\\n            __typename\\n          }\\n          ... on Flash {\\n            highlight\\n            push\\n            sense {\\n              down\\n              up\\n              select\\n              __typename\\n            }\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      pageInfo {\\n        hasNextPage\\n        totalCount\\n        startCursor\\n        endCursor\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}',
      //   api: "https://gate.8btc.cn:8443/one-graph-auth/graphql",
      //   mapList: "data.articleGraph.list.edges",
      //   mapTitle: "node.post.title",
      //   mapTime: "node.post.postDate",
      //   linkTemplate: "https://www.8btc.com/article/{node.id}",
      // },
    ],
  };
  return NextResponse.json({ data: appConfig });
}
