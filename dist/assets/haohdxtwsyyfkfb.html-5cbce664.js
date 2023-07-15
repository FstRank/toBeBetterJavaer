import{_ as c}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as i,c as o,a as e,d as a,b as t,e as h}from"./app-1c5b5ce3.js";const n={},p=h(`<p>球友们好，今天来跟大家聊聊分库分表。</p><h2 id="什么是分库分表" tabindex="-1"><a class="header-anchor" href="#什么是分库分表" aria-hidden="true">#</a> 什么是分库分表</h2><p>分库分表是在海量数据下，由于单库、表数据量过大，导致数据库性能持续下降的问题，演变出的技术方案。</p><p>分库分表是由<code>分库</code>和<code>分表</code>这两个独立概念组成的，只不过通常分库与分表的操作会同时进行，以至于我们习惯性的将它们合在一起叫做分库分表。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-haohdxtwsyyfkfb-c3a750c7-150d-4c2c-bec4-29a94dda8423.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>通过一定的规则，将原本数据量大的数据库拆分成多个单独的数据库，将原本数据量大的表拆分成若干个数据表，使得单一的库、表性能达到最优的效果（响应速度快），以此提升整体数据库性能。</p><h2 id="为什么分库分表" tabindex="-1"><a class="header-anchor" href="#为什么分库分表" aria-hidden="true">#</a> 为什么分库分表</h2><p>单机数据库的存储能力、连接数是有限的，它自身就很容易会成为系统的瓶颈。当单表数据量在百万以里时，我们还可以通过添加从库、优化索引提升性能。</p><p>一旦数据量朝着千万以上趋势增长，再怎么优化数据库，很多操作性能仍下降严重。为了减少数据库的负担，提升数据库响应速度，缩短查询时间，这时候就需要进行分库分表。</p><h3 id="为什么需要分库" tabindex="-1"><a class="header-anchor" href="#为什么需要分库" aria-hidden="true">#</a> 为什么需要分库？</h3><h4 id="容量" tabindex="-1"><a class="header-anchor" href="#容量" aria-hidden="true">#</a> 容量</h4><p>我们给数据库实例分配的磁盘容量是固定的，数据量持续的大幅增长，用不了多久单机的容量就会承载不了这么多数据，解决办法简单粗暴，加容量！</p><h4 id="连接数" tabindex="-1"><a class="header-anchor" href="#连接数" aria-hidden="true">#</a> 连接数</h4><p>单机的容量可以随意扩展，但数据库的连接数却是有限的，在高并发场景下多个业务同时对一个数据库操作，很容易将连接数耗尽导致<code>too many connections</code>报错，导致后续数据库无法正常访问。</p><p>可以通过<code>max_connections</code>查看 MySQL 最大连接数。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>show variables like &#39;%max_connections%&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-haohdxtwsyyfkfb-48c9b75b-2089-4cfb-b157-260713d69bf1.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>将原本单数据库按不同业务拆分成订单库、物流库、积分库等不仅可以有效分摊数据库读写压力，也提高了系统容错性。</p><h3 id="为什么需要分表" tabindex="-1"><a class="header-anchor" href="#为什么需要分表" aria-hidden="true">#</a> 为什么需要分表？</h3><p>做过报表业务的同学应该都体验过，一条 SQL 执行时间超过几十秒的场景。</p><p>导致数据库查询慢的原因有很多，SQL 没命中索引、like 扫全表、用了函数计算，这些都可以通过优化手段解决，可唯独数据量大是 MySQL 无法通过自身优化解决的。慢的根本原因是<code>InnoDB</code>存储引擎，聚簇索引结构的 B+tree 层级变高，磁盘 IO 变多查询性能变慢，详细原理自行查找一下，这里不用过多篇幅说明。</p><p>阿里的开发手册中有条建议，单表行数超 500 万行或者单表容量超过 2GB，就推荐分库分表，然而理想和实现总是有差距的，阿里这种体量的公司不差钱当然可以这么用，实际上很多公司单表数据几千万、亿级别仍然不选择分库分表。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-haohdxtwsyyfkfb-3a864a5a-3aa8-4745-ac0c-ac6f648a177b.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="什么时候分库分表" tabindex="-1"><a class="header-anchor" href="#什么时候分库分表" aria-hidden="true">#</a> 什么时候分库分表</h2><p>那到底什么情况下会用分库分表呢？</p><p>分库分表要解决的是<code>现存海量数据</code>访问的性能瓶颈，对<code>持续激增</code>的数据量所做出的架构预见性。</p><p><strong>是否分库分表的关键指标是数据量</strong>，我们以<code>fire100.top</code>这个网站的资源表 <code>t_resource</code>为例，系统在运行初始的时候，每天只有可怜的几十个资源上传，这时使用单库、单表的方式足以支持系统的存储，数据量小几乎没什么数据库性能瓶颈。</p><p>但某天开始一股神秘的流量进入，系统每日产生的资源数据量暴增至十万甚至上百万级别，这时资源表数据量到达千万级，查询响应变得缓慢，数据库的性能瓶颈逐渐显现。</p><p>以 MySQL 数据库为例，单表的数据量在达到亿条级别，通过加索引、SQL 调优等传统优化策略，性能提升依旧微乎其微时，就可以考虑做分库分表了。</p><p>既然 MySQL 存储海量数据时会出现性能瓶颈，那么我们是不是可以考虑用其他方案替代它？比如高性能的非关系型数据库<code>MongoDB</code>？</p><p>可以，但要看存储的数据类型！</p><p>现在互联网上大部分公司的核心数据几乎是存储在关系型数据库（MySQL、Oracle 等），因为它们有着<code>NoSQL</code>如法比拟的稳定性和可靠性，产品成熟生态系统完善，还有核心的事务功能特性，也是其他存储工具不具备的，而评论、点赞这些非核心数据还是可以考虑用<code>MongoDB</code>的。</p><h2 id="如何分库分表" tabindex="-1"><a class="header-anchor" href="#如何分库分表" aria-hidden="true">#</a> 如何分库分表</h2><blockquote><p>分库分表的核心就是对数据的分片（<code>Sharding</code>）并相对均匀的路由在不同的库、表中，以及分片后对数据的快速定位与检索结果的整合。</p></blockquote><p>分库与分表可以从：垂直（纵向）和 水平（横向）两种纬度进行拆分。下边我们以经典的订单业务举例，看看如何拆分。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-haohdxtwsyyfkfb-31b3e1b1-b4b7-4876-8b9b-97bf1aa2e536.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="垂直拆分" tabindex="-1"><a class="header-anchor" href="#垂直拆分" aria-hidden="true">#</a> 垂直拆分</h3><h4 id="_1、垂直分库" tabindex="-1"><a class="header-anchor" href="#_1、垂直分库" aria-hidden="true">#</a> 1、垂直分库</h4><p>垂直分库一般来说按照业务和功能的维度进行拆分，将不同业务数据分别放到不同的数据库中，核心理念 <code>专库专用</code>。</p><p>按业务类型对数据分离，剥离为多个数据库，像订单、支付、会员、积分相关等表放在对应的订单库、支付库、会员库、积分库。不同业务禁止跨库直连，获取对方业务数据一律通过<code>API</code>接口交互，这也是微服务拆分的一个重要依据。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-haohdxtwsyyfkfb-8695272b-4623-4ce7-8825-cd38668f79d3.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>垂直分库很大程度上取决于业务的划分，但有时候业务间的划分并不是那么清晰，比如：电商中订单数据的拆分，其他很多业务都依赖于订单数据，有时候界线不是很好划分。</p><p>垂直分库把一个库的压力分摊到多个库，提升了一些数据库性能，但并没有解决由于单表数据量过大导致的性能问题，所以就需要配合后边的分表来解决。</p><h4 id="_2、垂直分表" tabindex="-1"><a class="header-anchor" href="#_2、垂直分表" aria-hidden="true">#</a> 2、垂直分表</h4><p>垂直分表针对业务上字段比较多的大表进行的，一般是把业务宽表中比较独立的字段，或者不常用的字段拆分到单独的数据表中，是一种大表拆小表的模式。</p><p>例如：一张<code>t_order</code>订单表上有几十个字段，其中订单金额相关字段计算频繁，为了不影响订单表<code>t_order</code>的性能，就可以把订单金额相关字段拆出来单独维护一个<code>t_order_price_expansion</code>扩展表，这样每张表只存储原表的一部分字段，通过订单号<code>order_no</code>做关联，再将拆分出来的表路由到不同的库中。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-haohdxtwsyyfkfb-f50b5f28-134d-42d7-96e8-4952859f9040.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>数据库它是以行为单位将数据加载到内存中，这样拆分以后核心表大多是访问频率较高的字段，而且字段长度也都较短，因而可以加载更多数据到内存中，减少磁盘 IO，增加索引查询的命中率，进一步提升数据库性能。</p><h3 id="水平拆分" tabindex="-1"><a class="header-anchor" href="#水平拆分" aria-hidden="true">#</a> 水平拆分</h3><p>上边垂直分库、垂直分表后还是会存在单库、表数据量过大的问题，当我们的应用已经无法在细粒度的垂直切分时，依旧存在单库读写、存储性能瓶颈，这时就要配合水平分库、水平分表一起了。</p><h4 id="_1、水平分库" tabindex="-1"><a class="header-anchor" href="#_1、水平分库" aria-hidden="true">#</a> 1、水平分库</h4><p>水平分库是把同一个表按一定规则拆分到不同的数据库中，每个库可以位于不同的服务器上，以此实现水平扩展，是一种常见的提升数据库性能的方式。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-haohdxtwsyyfkfb-a0889565-df94-421f-b91c-3a0198f0d5eb.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>例如：<code>db_orde_1</code>、<code>db_order_2</code>两个数据库内有完全相同的<code>t_order</code>表，我们在访问某一笔订单时可以通过对订单的订单编号取模的方式 <code>订单编号 mod 2 （数据库实例数）</code> ，指定该订单应该在哪个数据库中操作。</p><p>这种方案往往能解决单库存储量及性能瓶颈问题，但由于同一个表被分配在不同的数据库中，数据的访问需要额外的路由工作，因此系统的复杂度也被提升了。</p><h4 id="_2、水平分表" tabindex="-1"><a class="header-anchor" href="#_2、水平分表" aria-hidden="true">#</a> 2、水平分表</h4><p>水平分表是在<strong>同一个数据库内</strong>，把一张大数据量的表按一定规则，切分成多个结构完全相同表，而每个表只存原表的一部分数据。</p><p>例如：一张<code>t_order</code>订单表有 900 万数据，经过水平拆分出来三个表，<code>t_order_1</code>、<code>t_order_2</code>、<code>t_order_3</code>，每张表存有数据 300 万，以此类推。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-haohdxtwsyyfkfb-7bb10c9b-04c6-4707-ba2c-c4e2081ddeb3.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>水平分表尽管拆分了表，但子表都还是在同一个数据库实例中，只是解决了单一表数据量过大的问题，并没有将拆分后的表分散到不同的机器上，还在竞争同一个物理机的 CPU、内存、网络 IO 等。要想进一步提升性能，就需要将拆分后的表分散到不同的数据库中，达到分布式的效果。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-haohdxtwsyyfkfb-c8c3c2a2-3365-42e9-aa40-3a29d2bb7ca3.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="数据存在哪个库的表" tabindex="-1"><a class="header-anchor" href="#数据存在哪个库的表" aria-hidden="true">#</a> 数据存在哪个库的表</h2><p>分库分表以后会出现一个问题，一张表会出现在多个数据库里，到底该往哪个库的哪个表里存呢？</p><p>上边我们多次提到过<code>一定规则</code> ，其实这个规则它是一种路由算法，决定了一条数据具体应该存在哪个数据库的哪张表里。</p><p>常见的有 <code>取模算法</code> 、<code>范围限定算法</code>、<code>范围+取模算法</code> 、<code>预定义算法</code></p><h3 id="_1、取模算法" tabindex="-1"><a class="header-anchor" href="#_1、取模算法" aria-hidden="true">#</a> 1、取模算法</h3><p>关键字段取模（对 hash 结果取余数 hash(XXX) mod N)，N 为数据库实例数或子表数量）是最为常见的一种路由方式。</p><p>以<code>t_order</code>订单表为例，先给数据库从 0 到 N-1 进行编号，对 <code>t_order</code>订单表中<code>order_no</code>订单编号字段进行取模<code>hash(order_no) mod N</code>，得到余数<code>i</code>。<code>i=0</code>存第一个库，<code>i=1</code>存第二个库，<code>i=2</code>存第三个库，以此类推。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-haohdxtwsyyfkfb-3ff496c7-81bd-4fa8-a599-c486fa2c57e6.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>同一笔订单数据会落在同一个库、表里，查询时用相同的规则，用<code>t_order</code>订单编号作为查询条件，就能快速的定位到数据。</p><h4 id="优点" tabindex="-1"><a class="header-anchor" href="#优点" aria-hidden="true">#</a> 优点</h4><p>实现简单，数据分布相对比较均匀，不易出现请求都打到一个库上的情况。</p><h4 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点" aria-hidden="true">#</a> 缺点</h4><p>取模算法对集群的伸缩支持不太友好，集群中有 N 个数据库实<code>·hash(user_id) mod N</code>，当某一台机器宕机，本应该落在该数据库的请求就无法得到处理，这时宕掉的实例会被踢出集群。</p><p>此时机器数减少算法发生变化<code>hash(user_id) mod N-1</code>，同一用户数据落在了在不同数据库中，等这台机器恢复，用<code>user_id</code>作为条件查询用户数据就会少一部分。</p><h3 id="_2、范围限定算法" tabindex="-1"><a class="header-anchor" href="#_2、范围限定算法" aria-hidden="true">#</a> 2、范围限定算法</h3><p>范围限定算法以某些范围字段，如<code>时间</code>或<code>ID区</code>拆分。</p><p>用户表<code>t_user</code>被拆分成<code>t_user_1</code>、<code>t_user_2</code>、<code>t_user_3</code>三张表，后续将<code>user_id</code>范围为 1 ~ 1000w 的用户数据放入<code>t_user_1</code>，1000~ 2000w 放入<code>t_user_2</code>，2000~3000w 放入<code>t_user_3</code>，以此类推。按日期范围划分同理。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-haohdxtwsyyfkfb-693c9b52-4b99-4ec8-a195-422c47d6b3cb.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="优点-1" tabindex="-1"><a class="header-anchor" href="#优点-1" aria-hidden="true">#</a> 优点</h4><ul><li>单表数据量是可控的</li><li>水平扩展简单只需增加节点即可，无需对其他分片的数据进行迁移</li></ul><h4 id="缺点-1" tabindex="-1"><a class="header-anchor" href="#缺点-1" aria-hidden="true">#</a> 缺点</h4><ul><li>由于连续分片可能存在<code>数据热点</code>，比如按时间字段分片时，如果某一段时间（双 11 等大促）订单骤增，存 11 月数据的表可能会被频繁的读写，其他分片表存储的历史数据则很少被查询，导致数据倾斜，数据库压力分摊不均匀。</li></ul><h3 id="_3、范围-取模算法" tabindex="-1"><a class="header-anchor" href="#_3、范围-取模算法" aria-hidden="true">#</a> 3、范围 + 取模算法</h3><p>为了避免热点数据的问题，我们可以对上范围算法优化一下</p><p>这次我们先通过范围算法定义每个库的用户表<code>t_user</code>只存 1000w 数据，第一个<code>db_order_1</code>库存放<code>userId</code>从 1 ~ 1000w，第二个库 1000~2000w，第三个库 2000~3000w，以此类推。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-haohdxtwsyyfkfb-72c25f39-4896-40e3-a43c-10be9edbb58a.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>每个库里再把用户表<code>t_user</code>拆分成<code>t_user_1</code>、<code>t_user_2</code>、<code>t_user_3</code>等，对<code>userd</code>进行取模路由到对应的表中。</p><p>有效的避免数据分布不均匀的问题，数据库水平扩展也简单，直接添加实例无需迁移历史数据。</p><h3 id="_4、地理位置分片" tabindex="-1"><a class="header-anchor" href="#_4、地理位置分片" aria-hidden="true">#</a> 4、地理位置分片</h3><p>地理位置分片其实是一个更大的范围，按城市或者地域划分，比如华东、华北数据放在不同的分片库、表。</p><h3 id="_5、预定义算法" tabindex="-1"><a class="header-anchor" href="#_5、预定义算法" aria-hidden="true">#</a> 5、预定义算法</h3><p>预定义算法是事先已经明确知道分库和分表的数量，可以直接将某类数据路由到指定库或表中，查询的时候亦是如此。</p><h2 id="分库分表出来的问题" tabindex="-1"><a class="header-anchor" href="#分库分表出来的问题" aria-hidden="true">#</a> 分库分表出来的问题</h2><p>了解了上边分库分表的拆分方式不难发现，相比于拆分前的单库单表，系统的数据存储架构演变到现在已经变得非常复杂。看几个具有代表性的问题，比如：</p><h3 id="分页、排序、跨节点联合查询" tabindex="-1"><a class="header-anchor" href="#分页、排序、跨节点联合查询" aria-hidden="true">#</a> 分页、排序、跨节点联合查询</h3><p>分页、排序、联合查询，这些看似普通，开发中使用频率较高的操作，在分库分表后却是让人非常头疼的问题。把分散在不同库中表的数据查询出来，再将所有结果进行汇总合并整理后提供给用户。</p><p>比如：我们要查询 11、12 月的订单数据，如果两个月的数据是分散到了不同的数据库实例，则要查询两个数据库相关的数据，在对数据合并排序、分页，过程繁琐复杂。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-haohdxtwsyyfkfb-33ac555d-4a40-4421-9d8a-5257d0407d58.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="事务一致性" tabindex="-1"><a class="header-anchor" href="#事务一致性" aria-hidden="true">#</a> 事务一致性</h3><p>分库分表后由于表分布在不同库中，不可避免会带来跨库事务问题。后续会分别以阿里的<code>Seata</code>和 MySQL 的<code>XA</code>协议实现分布式事务，用来比较各自的优势与不足。</p><h3 id="全局唯一的主键" tabindex="-1"><a class="header-anchor" href="#全局唯一的主键" aria-hidden="true">#</a> 全局唯一的主键</h3><p>分库分表后数据库表的主键 ID 业务意义就不大了，因为无法在标识唯一一条记录，例如：多张表<code>t_order_1</code>、<code>t_order_2</code>的主键 ID 全部从 1 开始会重复，此时我们需要主动为一条记录分配一个 ID，这个全局唯一的 ID 就叫<code>分布式ID</code>，发放这个 ID 的系统通常被叫发号器。</p><h3 id="多数据库高效治理" tabindex="-1"><a class="header-anchor" href="#多数据库高效治理" aria-hidden="true">#</a> 多数据库高效治理</h3><p>对多个数据库以及库内大量分片表的高效治理，是非常有必要，因为像某宝这种大厂一次大促下来，订单表可能会被拆分成成千上万个<code>t_order_n</code>表，如果没有高效的管理方案，手动建表、排查问题是一件很恐怖的事。</p><h3 id="历史数据迁移" tabindex="-1"><a class="header-anchor" href="#历史数据迁移" aria-hidden="true">#</a> 历史数据迁移</h3><p>分库分表架构落地以后，首要的问题就是如何平滑的迁移历史数据，增量数据和全量数据迁移，这又是一个比较麻烦的事情，后边详细讲。</p><h2 id="分库分表架构模式" tabindex="-1"><a class="header-anchor" href="#分库分表架构模式" aria-hidden="true">#</a> 分库分表架构模式</h2><p>分库分表架构主要有两种模式：<code>client</code>客户端模式和<code>proxy</code>代理模式</p><h3 id="客户模式" tabindex="-1"><a class="header-anchor" href="#客户模式" aria-hidden="true">#</a> 客户模式</h3><p><code>client</code>模式指分库分表的逻辑都在你的系统应用内部进行控制，应用会将拆分后的 SQL 直连多个数据库进行操作，然后本地进行数据的合并汇总等操作。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-haohdxtwsyyfkfb-b143b653-cf7c-473e-be98-e790f2fcb097.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="代理模式" tabindex="-1"><a class="header-anchor" href="#代理模式" aria-hidden="true">#</a> 代理模式</h3><p><code>proxy</code>代理模式将应用程序与 MySQL 数据库隔离，业务方的应用不在需要直连数据库，而是连接 proxy 代理服务，代理服务实现了 MySQL 的协议，对业务方来说代理服务就是数据库，它会将 SQL 分发到具体的数据库进行执行，并返回结果。该服务内有分库分表的配置，根据配置自动创建分片表。</p><figure><img src="https://cdn.tobebetterjavaer.com/tobebetterjavaer/images/nice-article/weixin-haohdxtwsyyfkfb-119e9419-7aa3-4266-828a-2d54dea0a340.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="如何抉择" tabindex="-1"><a class="header-anchor" href="#如何抉择" aria-hidden="true">#</a> 如何抉择</h3><p>如何选择<code>client</code>模式和<code>proxy</code>模式，我们可以从以下几个方面来简单做下比较。</p><h4 id="_1、性能" tabindex="-1"><a class="header-anchor" href="#_1、性能" aria-hidden="true">#</a> 1、性能</h4><p>性能方面<code>client</code>模式表现的稍好一些，它是直接连接 MySQL 执行命令；<code>proxy</code>代理服务则将整个执行链路延长了，应用-&gt;代理服务-&gt;MySQL，可能导致性能有一些损耗，但两者差距并不是非常大。</p><h4 id="_2、复杂度" tabindex="-1"><a class="header-anchor" href="#_2、复杂度" aria-hidden="true">#</a> 2、复杂度</h4><p><code>client</code>模式在开发使用通常引入一个 jar 可以；<code>proxy</code>代理模式则需要搭建单独的服务，有一定的维护成本，既然是服务那么就要考虑高可用，毕竟应用的所有 SQL 都要通过它转发至 MySQL。</p><h4 id="_3、升级" tabindex="-1"><a class="header-anchor" href="#_3、升级" aria-hidden="true">#</a> 3、升级</h4><p><code>client</code>模式分库分表一般是依赖基础架构团队的 Jar 包，一旦有版本升级或者 Bug 修改，所有应用到的项目都要跟着升级。小规模的团队服务少升级问题不大，如果是大公司服务规模大，且涉及到跨多部门，那么升级一次成本就比较高；</p><p><code>proxy</code>模式在升级方面优势很明显，发布新功能或者修复 Bug，只要重新部署代理服务集群即可，业务方是无感知的，但要保证发布过程中服务的可用性。</p><h4 id="_4、治理、监控" tabindex="-1"><a class="header-anchor" href="#_4、治理、监控" aria-hidden="true">#</a> 4、治理、监控</h4><p><code>client</code>模式由于是内嵌在应用内，应用集群部署不太方便统一处理；<code>proxy</code>模式在对 SQL 限流、读写权限控制、监控、告警等服务治理方面更优雅一些。</p>`,126),s={href:"https://mp.weixin.qq.com/s/1kd11pCOcavUHeu1m4bTCw",target:"_blank",rel:"noopener noreferrer"};function b(f,l){const d=r("ExternalLinkIcon");return i(),o("div",null,[p,e("blockquote",null,[e("p",null,[a("参考链接："),e("a",s,[a("https://mp.weixin.qq.com/s/1kd11pCOcavUHeu1m4bTCw"),t(d)])])])])}const x=c(n,[["render",b],["__file","haohdxtwsyyfkfb.html.vue"]]);export{x as default};