import { NextResponse } from "next/server";
import { AppConfig } from "@/interface";

export async function GET() {
  const appConfig: AppConfig = {
    widgets: [
      {
        type: 1,
        size: "large",
        name: "金色财经·7*24快讯",
        icon: "https://www.jinse.com/favicon.ico",
        origin: "https://www.jinse.com/lives",
        method: "GET",
        api: "https://api.jinse.cn/noah/v2/lives?limit=20&reading=false&source=web&flag=down&id=0&category=0",
        mapList: "list.0.lives",
        mapTitle: "content_prefix",
        mapTime: "created_at",
        linkTemplate: "https://www.jinse.com/lives/{id}.html",
      },

      {
        type: 1,
        size: "medium",
        name: "金色财经·大事件",
        icon: "https://www.jinse.com/favicon.ico",
        origin: "https://www.jinse.cn/coin_circle",
        method: "GET",
        api: "https://api.jinse.com/noah/v1/modules?page=1&limit=20&module_type=2",
        mapList: "data.list",
        mapTitle: "title",
        mapTime: "published_at",
        linkTemplate: "https://www.jinse.cn/lives/{object_id}.html",
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
