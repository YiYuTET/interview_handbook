
# 面试手册APP- 首页模块

## 首页模块

### 1.静态结构

1）轮播图

::: code-group
```ts :line-numbers 
Row() {
  Swiper() {
    Flex() {
      Image('/common/images/banner_ai.png')
        .objectFit(ImageFit.Fill)
    }
    .padding({ left: vp2vp(15), right: vp2vp(15) })

    Flex() {
      Image('/common/images/banner_pj.png')
        .objectFit(ImageFit.Fill)
    }
    .padding({ left: vp2vp(15), right: vp2vp(15) })

    Flex() {
      Image('/common/images/banner_qa.png')
        .objectFit(ImageFit.Fill)
    }
    .padding({ left: vp2vp(15), right: vp2vp(15) })
  }
  .autoPlay(true)
  .indicator(false)
}
.aspectRatio(2.8)
```
:::

2）骨架效果

::: code-group
```ts :line-numbers 
@Builder
  SkeletonBuilder() {
    Column() {
      Row({ space: vp2vp(15) }) {
        IvSkeleton()
        IvSkeleton({ widthValue: vp2vp(60) })
        IvSkeleton({ widthValue: vp2vp(80) })
      }
      .width('100%')
      .margin({ bottom: vp2vp(15) })

      List({ space: vp2vp(15) }){
        ForEach([1, 2, 3, 4, 5, 6, 7], () => {
          ListItem(){
            Column({ space: vp2vp(15) }){
              Row({ space: vp2vp(15) }){
                IvSkeleton({ widthValue: vp2vp(30) })
                IvSkeleton({ widthValue: '100%' }).layoutWeight(1)
              }
              Row({ space: vp2vp(15) }){
                IvSkeleton({ widthValue: vp2vp(50) })
                IvSkeleton({ widthValue: vp2vp(50) })
                IvSkeleton({ widthValue: vp2vp(50) })
              }
              .width('100%')
            }
            .padding({ top: vp2vp(10), bottom: vp2vp(10) })
          }
        })
      }
      .divider({ strokeWidth: 0.5, color: $r('app.color.gray_bg') })
    }
    .width('100%')
    .padding(vp2vp(15))
    .layoutWeight(1)
  }
```
:::

::: code-group
```ts :line-numbers 
@State
  loading: boolean = false
```
:::

::: code-group
```ts :line-numbers 
if (this.loading) {
    this.SkeletonBuilder()
  } else {
    // Tabs
  }
```
:::

### 2. 分类 Tabs 动态展示

1）数据类型

::: code-group
```ts :line-numbers [models/QuestionTypeModel.ets]
export class TagModel {
  tagName: string
  nameColor: string
  borderColor: string
}

export class QuestionTypeModel {
  public id: number
  public name: string
  public icon?: string
  public describeInfo?: string
  public displayNewestFlag?: 0 | 1
  public tags?: TagModel[]
}
```
:::

2）获取数据

::: code-group
```ts :line-numbers 
@State
  questionTypeList: QuestionTypeModel[] = []
  @State
  activeIndex: number = 0

  aboutToAppear() {
    this.loading = true
    Request.get<QuestionTypeModel[]>('question/type')
      .then(res => {
        this.questionTypeList = res.data
      })
      .finally(() => {
        this.loading = false
      })
  }
```
:::

3）渲染 tabs

::: code-group
```ts :line-numbers 
if (this.loading) {
        this.SkeletonBuilder()
      } else {
        Tabs() {
          ForEach(this.questionTypeList, (item: QuestionTypeModel, index) => {
            TabContent() {
              // 列表组件
            }
            .tabBar(this.TabItemBuilder(item, index))
            .height('100%')
          })
        }
        .layoutWeight(1)
        .barMode(BarMode.Scrollable)
        .onChange(i => this.activeIndex = i)
      }
```
:::

4）自定义构建函数

::: code-group
```ts :line-numbers 
@Builder
  TabItemBuilder(q: QuestionTypeModel, index: number) {
    Row() {
      Stack({ alignContent: Alignment.Bottom }) {
        Text(q.name)
          .fontSize(vp2vp(15))
          .height(vp2vp(44))
          .fontColor(this.activeIndex === index ? $r('app.color.black') : $r('app.color.gray'))
        Text()
          .width(this.activeIndex === index ? vp2vp(20) : 0)
          .height(vp2vp(2))
          .backgroundColor($r('app.color.black'))
          .animation({ duration: this.activeIndex === index ? 300 : 0 })
      }
      .padding({ left: vp2vp(index === 0 ? 15 : 0) })

      if (q.displayNewestFlag === 1) {
        Image($r('app.media.new'))
          .width(vp2vp(34))
          .height(vp2vp(14))
          .padding({ left: vp2vp(5) })
      }
    }
    .padding({ right: vp2vp(15) })
  }
```
:::

### 3. 试题列表组件抽取

1）标签组件

::: code-group
```ts :line-numbers [common/components/IvTag.ets]
import { vp2vp } from '../utils/Basic'

@Component
export struct IvTag {
  text: string
  difficulty: number = 1

  getTag() {
    if (this.difficulty === 3 || this.difficulty === 4) {
      return { text: '一般', color: $r('app.color.blue') }
    } else if (this.difficulty === 5) {
      return { text: '困难', color: $r('app.color.orange') }
    }
    return { text: this.text ? this.text : '简单', color: $r('app.color.green') }
  }

  build() {
    Text(this.getTag().text)
      .fontColor(this.getTag().color)
      .fontSize(vp2vp(10))
      .width(vp2vp(34))
      .height(vp2vp(18))
      .backgroundColor($r('app.color.gray_bg'))
      .borderRadius(vp2vp(2))
      .textAlign(TextAlign.Center)
      .margin({ right: vp2vp(7) })
  }
}
```
:::

2）试题项组件

::: code-group
```ts :line-numbers [common/components/IvQuestionItem.ets]
import { Auth } from '../utils/Auth'
import { vp2vp } from '../utils/Basic'
import { IvTag } from './IvTag'

@Component
export struct IvQuestionItem {
  @Builder
  SplitBuilder() {
    Text('|')
      .width(vp2vp(30))
      .textAlign(TextAlign.Center)
      .fontColor('#C3C3C5')
      .fontSize(vp2vp(12))
  }

  @Builder
  TextBuilder(text: string) {
    Text(text)
      .fontColor('#C3C3C5')
      .fontSize(vp2vp(12))
  }

  build() {
    Column() {
      Row() {
        IvTag({ difficulty: 4 })
        Text('闭包你是怎么理解的？')
          .fontSize(vp2vp(15))
          .layoutWeight(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .maxLines(1)
      }.width('100%')

      Row() {
        this.TextBuilder(`点赞 100`)
        this.SplitBuilder()
        this.TextBuilder(`浏览 200`)
        this.SplitBuilder()
        this.TextBuilder(`已看过`)
      }
      .width('100%')
      .margin({ top: vp2vp(10) })
    }
    .height(vp2vp(80))
    .justifyContent(FlexAlign.Center)
    .width('100%')
    .onClick(() => {
      Auth.pushUrl({
        url: 'pages/QuestionDetail',
      })
    })
  }
}
```
:::

3）试题列表组件

::: code-group
```ts :line-numbers [common/components/IvQuestionList.ets]
import { vp2vp } from '../utils/Basic'
import { IvQuestionItem } from './IvQuestionItem'

@Component
export struct IvQuestionList {
  build() {
    List() {
      ForEach([1, 2, 3, 4, 5, 6, 7, 8], () => {
        ListItem() {
          IvQuestionItem()
        }
      })
    }
    .divider({
      strokeWidth: 0.5,
      color: $r('app.color.gray_bg')
    })
    .padding({ left: vp2vp(15), right: vp2vp(15) })
    .height('100%')
    .width('100%')
  }
}
```
:::

4）首页使用组件

::: code-group
```ts :line-numbers [views/Index/Home.ets]
ForEach(this.questionTypeList, (item: QuestionTypeModel, index) => {
            TabContent() {
              // 列表组件
              IvQuestionList()
            }
            .tabBar(this.TabItemBuilder(item, index))
            .height('100%')
          })
```
:::

### 4. 试题列表加载

1）请求参数类型

::: code-group
```ts :line-numbers [models/QuestionItemModel.ets]
export class QueryQuestionListParams {
  type: number
  page: number
  questionBankType: number
  sort?: number
  keyword?: string
}

@Observed
export class QuestionItemModel {
  public id: string
  public stem: string
  public difficulty: number
  public likeCount: number
  public views: number
  public readFlag?: 0 | 1
}
```
:::

2）试题列表组件

::: code-group
```ts :line-numbers [common/components/IvQuestionList.ets]
import promptAction from '@ohos.promptAction'
import { QueryQuestionListParams, QuestionItemModel } from '../../models/QuestionItemModel'
import { vp2vp } from '../utils/Basic'
import { Request } from '../utils/Request'
import { IvQuestionItem } from './IvQuestionItem'

@Component
export struct IvQuestionList {
  @Prop
  questionType: number
  @Prop
  @Watch('initQuestionList')
  activeIndex: number
  @Prop
  selfIndex: number

  params: QueryQuestionListParams = {
    questionBankType: 10,
    type: this.questionType,
    page: 1,
    sort: 0,
  }
  @State
  questionList: QuestionItemModel[] = []

  aboutToAppear() {
    this.initQuestionList()
  }

  initQuestionList () {
    if (this.activeIndex === this.selfIndex && this.questionList.length === 0) {
      this.getQuestionList(this.params)
    }
  }

  getQuestionList() {
    return Request.get<{
      total: number,
      pageTotal: number,
      rows: QuestionItemModel[]
    }>('question/list', this.params)
      .then(res => {
        this.questionList = res.data.rows
      })
      .catch(e => {
        promptAction.showToast({ message: JSON.stringify(e) })
      })
  }

  build() {
    List() {
      ForEach(this.questionList, (item: QuestionItemModel) => {
        ListItem() {
          IvQuestionItem({ item })
        }
      },
        ({id, likeCount, readFlag, views}: QuestionItemModel) => {
          return JSON.stringify({ id, likeCount, readFlag, views })
        }
      )
    }
    .divider({
      strokeWidth: 0.5,
      color: $r('app.color.gray_bg')
    })
    .padding({ left: vp2vp(15), right: vp2vp(15) })
    .height('100%')
    .width('100%')
  }
}
```
:::

3）试题选项组件

::: code-group
```ts :line-numbers [common/components/IvQuestionList.ets]
import { QuestionItemModel } from '../../models/QuestionItemModel'
import { Auth } from '../utils/Auth'
import { vp2vp } from '../utils/Basic'
import { IvTag } from './IvTag'

@Component
export struct IvQuestionItem {
  @ObjectLink
  item: QuestionItemModel

  @Builder
  SplitBuilder() {
    Text('|')
      .width(vp2vp(30))
      .textAlign(TextAlign.Center)
      .fontColor('#C3C3C5')
      .fontSize(vp2vp(12))
  }

  @Builder
  TextBuilder(text: string) {
    Text(text)
      .fontColor('#C3C3C5')
      .fontSize(vp2vp(12))
  }

  build() {
    Column() {
      Row() {
        IvTag({ difficulty: this.item.difficulty })
        Text(this.item.stem)
          .fontSize(vp2vp(15))
          .layoutWeight(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .maxLines(1)
      }.width('100%')

      Row() {
        this.TextBuilder(`点赞 ${this.item.likeCount}`)
        this.SplitBuilder()
        this.TextBuilder(`浏览 ${this.item.views}`)
        this.SplitBuilder()
        if (this.item.readFlag === 1) {
          this.TextBuilder(`已看过`)
        }
      }
      .width('100%')
      .margin({ top: vp2vp(10) })
    }
    .height(vp2vp(80))
    .justifyContent(FlexAlign.Center)
    .width('100%')
    .onClick(() => {
      Auth.pushUrl({
        url: 'pages/QuestionDetail',
        params: this.item
      })
    })
  }
}
```
:::

### 5. 加载更多

1）加载和完成状态

::: code-group
```ts :line-numbers 
@State
  finished: boolean = false
  @State
  loading: boolean = false
```
:::

2）判断是否可以加载更多

::: code-group
```ts :line-numbers [common/components/IvQuestionList.ets]
getQuestionList() {
+    if (this.loading || this.finished)  return
```
:::

::: code-group
```ts :line-numbers [common/components/IvQuestionList.ets]
if ( this.params.page < res.data.pageTotal ) {
          this.params.page ++
        } else {
          this.finished = true
        }
        this.loading = false
```
:::

3）监听滚动到最下方

::: code-group
```ts :line-numbers [common/components/IvQuestionList.ets]
.onReachEnd(() => {
      this.getQuestionList()
    })
```
:::

4）加上加载UI结构

::: code-group
```ts :line-numbers [common/components/IvQuestionList.ets]
@Builder
  LoadingBuilder () {
    if (this.finished) {
      Row() {
        Text('没有更多了~')
          .fontColor($r('app.color.gray'))
          .fontSize(vp2vp(14))
      }
      .width('100%')
      .height(vp2vp(50))
      .justifyContent(FlexAlign.Center)
    } else {
      if (this.loading) {
        Row() {
          LoadingProgress()
            .width(vp2vp(24))
            .margin({ right: vp2vp(5) })
          Text('加载中...')
            .fontColor($r('app.color.gray'))
            .fontSize(vp2vp(14))
        }
        .width('100%')
        .height(vp2vp(50))
        .justifyContent(FlexAlign.Center)
      }
    }
  }
```
:::

### 6. LazyForEach 性能优化

1）实现数据源

::: code-group
```ts :line-numbers [models/BasicDataSource.ets]
export class BasicDataSource implements IDataSource {
  private listeners: DataChangeListener[] = [];

  public totalCount(): number {
    return 0;
  }

  public getData(index: number): any {

  }

  registerDataChangeListener(listener: DataChangeListener): void {
    if (this.listeners.indexOf(listener) < 0) {
      console.info('add listener');
      this.listeners.push(listener);
    }
  }

  unregisterDataChangeListener(listener: DataChangeListener): void {
    const pos = this.listeners.indexOf(listener);
    if (pos >= 0) {
      console.info('remove listener');
      this.listeners.splice(pos, 1);
    }
  }

  notifyDataReload(): void {
    this.listeners.forEach(listener => {
      listener.onDataReloaded();
    })
  }

  notifyDataAdd(index: number): void {
    this.listeners.forEach(listener => {
      listener.onDataAdd(index);
    })
  }

  notifyDataChange(index: number): void {
    this.listeners.forEach(listener => {
      listener.onDataChange(index);
    })
  }

  notifyDataDelete(index: number): void {
    this.listeners.forEach(listener => {
      listener.onDataDelete(index);
    })
  }
}
```
:::

2）继承数据源进行扩展

::: code-group
```ts :line-numbers [common/components/IvQuestionList.ets]
class QuestionListDataSource extends BasicDataSource {

  private questionList: QuestionItemModel[] = []

  totalCount () {
    return this.questionList.length
  }

  getData(index: number): QuestionItemModel  {
    return this.questionList[index]
  }

  public addData(index: number, data: QuestionItemModel): void {
    this.questionList.splice(index, 0, data);
    this.notifyDataAdd(index);
  }

  public pushData(data: QuestionItemModel): void {
    this.questionList.push(data);
    this.notifyDataAdd(this.questionList.length - 1);
  }

}
```
:::

3）改用数据源渲染列表

::: code-group
```ts :line-numbers [common/components/IvQuestionList.ets]
questionListDataSource = new QuestionListDataSource()
```
:::

::: code-group
```ts :line-numbers [common/components/IvQuestionList.ets]
initQuestionList () { // [!code ++]
    if (this.activeIndex === this.selfIndex &&  this.questionListDataSource.totalCount() === 0) { // [!code ++]
      this.getQuestionList() // [!code ++]
    } // [!code ++]
  } // [!code ++]
```
:::

::: code-group
```ts :line-numbers [common/components/IvQuestionList.ets]
}>('question/list', this.params)
      .then(res => {

        res.data.rows.forEach(item => { // [!code ++]
          this.questionListDataSource.pushData(item) // [!code ++]
        }) // [!code ++]
```
:::

::: code-group
```ts :line-numbers [common/components/IvQuestionList.ets]
LazyForEach(this.questionListDataSource, (item: QuestionItemModel) => { // [!code ++]
        ListItem() { // [!code ++]
          IvQuestionItem({ item }) // [!code ++]
        } // [!code ++]
} // [!code ++]
```
:::