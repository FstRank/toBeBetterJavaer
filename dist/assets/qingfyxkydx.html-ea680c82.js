import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r,o,c,a as e,d as t,b as i,e as p}from"./app-1c5b5ce3.js";const l={},g={href:"https://mp.weixin.qq.com/s/3RVsFZ17F0JzoHCLKbQgGw",target:"_blank",rel:"noopener noreferrer"},s=e("strong",null,"370 多名",-1),b=e("br",null,null,-1),d=e("br",null,null,-1),f=e("br",null,null,-1),m={href:"https://javabetter.cn",target:"_blank",rel:"noopener noreferrer"},x=e("p",null,"今天无聊刷 GitHub 看到一个让我血压上来的项目，带大家看看什么叫做“开源流氓”、“开源牛皮癣”。",-1),u=e("figure",null,[e("img",{src:"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qingfyxkydx-d223ab3b-2b49-48cf-9f2a-eac620874d7a.jpg",alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1),h={href:"https://zhuanlan.zhihu.com/p/478412327",target:"_blank",rel:"noopener noreferrer"},_=p('<p>乍一看，2.4k star，应该不像是什么小项目应该是比较有用的项目，但接下来的事情属实是让我气的很！我严重怀疑这 star 不是某宝买的吧？</p><p>对于开源项目我是不喜欢下载预构建的成品的，我更喜欢自己动手从源代码构建，所以我熟练的clone到本地根据readme里面写的指引构建。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qingfyxkydx-67242325-e584-4952-a4ba-04e16234dd76.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>构建完我一运行，既然上面写着支持学堂在线，那就输个学堂在线的地址进去试试呗</p><p>很快啊就给我返回了一个视频链接不合法</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qingfyxkydx-2cd1aa23-eed5-4775-89b7-d1bc9b13adb8.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>那就翻翻代码看看是不是哪里有需要微调的地方呗</p><p>这一翻代码不得了啊，我根本没在代码里找到学堂在线相关的组件…</p><p>我就想是不是项目分模块然后我clone的时候缺了什么模块就去翻帮助</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qingfyxkydx-af44faf8-a196-48c1-85ee-1b9951908c7a.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可显然不是这样的情况</p><p>当我翻来覆去迷惑了半天的时候，才发现readme下面还有一行小字<img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qingfyxkydx-93363bcb-67dc-4ae5-9ca7-7e5744c80995.jpg" alt="" loading="lazy">他娘的你不早点说啊</p><p>一看commit记录还真是</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qingfyxkydx-ec84b915-4936-4ec1-8ddd-4c5e7a00d67a.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>打开Release页面</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qingfyxkydx-88057688-64f6-4d0b-84f0-2682f21ed094.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>嗯，用GitHub Release却不上传附件非要用国内流氓网盘也就算了</p><p>这个VIP用户又是啥子回事啊</p><p>俗话说得好啊好奇心害死猫，我就决定下载下来试试</p><p>鉴于这个版本显然表现和仓库内的开源版本不一样，为了安全起见果断打开sandboxie，新建沙盒内运行</p><p>安装完启动，好，sandboxie给我报了个错</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qingfyxkydx-097a6e3c-6aa0-4a4d-8ae2-6139e5962863.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>我默认开的严格模板不允许管理员权限，所以沙盒内如果请求管理员权限就会报错</p><p>可是你一个下载器为什么要管理员权限啊？？？</p><p>算了，我姑且相信你没有通过提权突破沙盒的能力，允许一次管理员权限吧</p><p>结果我一打开，弹出来这个</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qingfyxkydx-c300c0d5-88ba-45b6-ade7-f3b36ca91062.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>登录？还必须扫码登录？</p><p>我叉掉这个窗口，又弹出来一次，再叉掉，然后直接就在浏览器内打开扫码登录了</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qingfyxkydx-e7046c3b-7db3-49bb-b8f9-5752549603f6.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>你收了微信多少钱，非要捆绑微信？逼着用户必须先注册个微信是吧？</p><p>顺着说明打开该项目官网，且不谈图片的css样式显然没在高分屏上测试过，4k屏直接右侧就白了</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qingfyxkydx-f9c9d040-23ef-48f7-9d5a-678484a14115.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>谁给你的勇气还写着代码开源的？你发布的源码和你发布的安装包是一个东西吗？用户能通过源码构建出和安装包一样功能的东西吗？</p><p>而且根据我对安装包内文件的分析，这个项目至少使用了node.js,electron,crypto-js,aria2, wkhtmltopdf,ffmpeg等开源项目，却没有在软件内和官网下看到任何对这些所使用的开源项目的标注。</p><p>宣传要用开源的旗号宣传，却不愿意老老实实把开源落实到位，那谁给你自信这么宣传的啊？</p><p>我不是说开源项目不能赚钱，相反我支持开源项目以合适的方式盈利，比如mupdf完整开源但商用需要额外许可费用，比如onlyoffice提供功能完全一致但限制用户数量的开源版本，又比如我贡献了翻译的LADB采用完全开源但在play商店付费上架的方式我甚至还支持了一份付费副本。这些开源项目都以合适的可持续的方式盈利，同时保证了开源的纯粹性，即用户可访问全部源码，可自行构建全功能版本。</p><p>就算你真不想继续开源新版本的源码，你也可以选择放弃维护当前项目，自己新建一个不开源的新项目嘛！</p><p>但我真的无法接受打着开源的旗号吸引眼球赚钱，却不把开源落到实处的行为，这种安装包与公开源码显然不同的行为完全丧失了开源的安全可靠可审查性，却利用了人们对开源软件的信任，可以说就是在大口吮吸开源的鲜血。</p><p>作为真正坚持绝对开源并支持开源生态的开发者，我真不想再看到打着开源旗号挂羊头卖狗肉的情况了，不要再吸开源的血了！</p><p>然而GitHub拉黑用户后他的项目仍然有可能出现在推荐里，令人感叹!</p><p>PS:在21年4/18之后开源源码再也没有一行更新，可以说作者至少吸了接近一年开源的血，却还能截止到现在多出700多star，一些Github用户的星星是不是给的太随意了点。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-qingfyxkydx-5aea5f25-97f8-496f-805d-8eca324661eb.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><hr><p><em>没有什么使我停留——除了目的，纵然岸旁有玫瑰、有绿荫、有宁静的港湾，我是不系之舟</em>。</p><p><strong>推荐阅读</strong>：</p>',46),y={href:"https://mp.weixin.qq.com/s/1_9FVEhEErMhjCRNP9dqZw",target:"_blank",rel:"noopener noreferrer"},j={href:"https://mp.weixin.qq.com/s/1WdD2eLVMT-efMukLrtAwg",target:"_blank",rel:"noopener noreferrer"},v={href:"https://mp.weixin.qq.com/s/2wW4ZZWMYXuyY2-tLGvIwQ",target:"_blank",rel:"noopener noreferrer"},k={href:"https://mp.weixin.qq.com/s/16AvpvTZ4NOyfFvU57ok9Q",target:"_blank",rel:"noopener noreferrer"},q=e("figure",null,[e("img",{src:"https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-rumrabbitmqzypjdg-53717e59-63c9-44bd-99d3-dd2c26fe68bb.png",alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1);function w(z,V){const a=r("ExternalLinkIcon");return o(),c("div",null,[e("blockquote",null,[e("p",null,[e("a",g,[t("二哥编程知识星球"),i(a)]),t(" （戳链接加入）正式上线了，来和 "),s,t(" 小伙伴一起打怪升级吧！这是一个 Java 学习指南 + 编程实战的私密圈子，你可以向二哥提问、帮你制定学习计划、跟着二哥一起做实战项目，冲冲冲。"),b,d,f,t(" 二哥的Java进阶之路网址："),e("a",m,[t("https://javabetter.cn"),i(a)])])]),x,u,e("blockquote",null,[e("p",null,[t("作者：琴梨梨 来源："),e("a",h,[t("https://zhuanlan.zhihu.com/p/478412327"),i(a)])])]),_,e("ul",null,[e("li",null,[e("a",y,[t("计划国庆前跳槽"),i(a)])]),e("li",null,[e("a",j,[t("去外包，我也挺知足"),i(a)])]),e("li",null,[e("a",v,[t("我的第一次，4万！"),i(a)])]),e("li",null,[e("a",k,[t("入职新公司半个月了"),i(a)])])]),q])}const G=n(l,[["render",w],["__file","qingfyxkydx.html.vue"]]);export{G as default};