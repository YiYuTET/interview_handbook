# 面试手册APP-项目介绍

## 项目描述

面试APP提供了多种题目和内容，包括基础知识点问题、原理问题、项目问题等，满足不同前端程序员的需求。同时，面试通APP还包含各大公司的真实面试经验，便于用户找到心仪公司的面经。面试通APP支持用户自主选择学习内容，同时还提供了智能推荐和反馈机制，帮助用户更好地掌握知识和技能。



<div class="half">
    <img src="./../public/02.77120fbc.png" width="45%" style="float:left;margin-right:30px"/>
    <img src="./../public/03.699a793a.png" width="45%" style="float:left"/>
</div>       
<p style="clear:both"></p>



<div class="half">
    <img src="./../public/04.3f354244.png" width="45%" style="float:left;margin-right:30px"/>
    <img src="./../public/05.78963211.png" width="45%" style="float:left"/>
</div>       
<p style="clear:both"></p>

<div class="half">
    <img src="./../public/06.a586323e.png" width="45%" style="float:left;margin-right:30px"/>
    <img src="./../public/07.e23c8b96.png" width="45%" style="float:left"/>
</div>       
<p style="clear:both"></p>

## 核心功能

- 刷题系统：题库频道、面试题长列表、点赞、收藏、分享、富文本预览
- 项目系统：企业级项目场景面试题展示、业务类问答、技术类问答
- 面经系统：大厂面试经验、文章阅读、试题阅读数据埋点
- 个人中心：打卡、打卡记录、学习时间统计、数据可视化、编辑头像、编辑昵称、退出登录
- 历史记录：试题阅读记录、面经阅读记录、点赞收藏记录、个人反馈记录

## 使用技术

1. 基于 `API9` 使用 `ArtTS` 与 `ArtUI` 实现页面构建和状态管理
2. 基于 `PersistentStorage` 和 `AppStorage` 实现用户信息存储和访问权限控制
3. 基于 `display` 和 `deviceInfo` 实现适配手机侧函数 `vp2vp` 做到视觉统一
4. 基于 `IDataSource` 和 `LazyForEach` 实现列表懒加载优化列表性能
5. 基于 `emitter` 实现 `UIAbility` 进程内通信实现通知更新首页信息
6. 基于 `mediaquery` 实现设备和横竖屏查询实现多设备布局适配
7. 基于 `http` 封装请求工具类，实现接口响应数据泛型支持和参数处理与响应拦截
8. 基于鸿蒙系统组件，抽象封装通用组件 `Search、Skeleton、MiniCalendar、LoadingDialog、Tag`等
9. 基于 `UIAbility` 和 `Page` 生命周期实现阅读实现埋点
10. 基于 `fs` 读取和复制到应用沙箱环境实现文件上传，且完成数据回显功能
11. 基于 `Web` 组件实现 webview 能力，实现用户协议和隐私协议功能
12. 基于 `router` 都页面栈进行控制，完成页面栈维护和清理
13. 基于 `notificationManager` 实现用户学习时间通知提醒
14. 基于动画模块，实现页面转场动画的自定义以及下拉刷新自定义组件动画效果
15. 使用鸿蒙第三方库 `dayjs` 实现时间相关处理业务逻辑
16. 封装本地库，抽离 `MiniCalendar` 组件进行共享维护和迭代

## 技术亮点

- 实现手机侧统一视觉比例适配，解决 `Meta50` 显示问题
- 突破了文件上传 `API` 设计缺陷，和后台约定上传规范
- 共享库维护，将一些通用的组件统一维护，为后期项目迭代准备

## 学习建议

1. 鸿蒙能力集
2. 卡片开发
3. 本地数据库
4. 原子化服务
5. 端云一体
6. 三个一多