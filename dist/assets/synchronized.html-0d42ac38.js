import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r,o as d,c as i,a as n,d as a,b as s,e as t}from"./app-b644cb9d.js";const c={},l=n("h1",{id:"第十节-synchronized的四种锁状态",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#第十节-synchronized的四种锁状态","aria-hidden":"true"},"#"),a(" 第十节：synchronized的四种锁状态")],-1),p={href:"https://javabetter.cn/thread/synchronized-1.html",target:"_blank",rel:"noopener noreferrer"},h=n("p",null,"我想这是很多小伙伴感兴趣的。",-1),u=n("p",null,[a("首先需要明确的一点是："),n("strong",null,"Java 多线程的锁都是基于对象的"),a("，Java 中的每一个对象都可以作为一个锁。")],-1),k=n("strong",null,"类锁",-1),v={href:"https://javabetter.cn/thread/synchronized-1.html",target:"_blank",rel:"noopener noreferrer"},b=n("p",null,"这里再多说几句吧。Class 对象是一种特殊的 Java 对象，代表了程序中的类和接口。Java 中的每个类型（包括类、接口、数组以及基础类型）在 JVM 中都有一个唯一的 Class 对象与之对应。这个 Class 对象被创建的时机是在 JVM 加载类时，由 JVM 自动完成。",-1),m=n("p",null,"Class 对象中包含了与类相关的很多信息，如类的名称、类的父类、类实现的接口、类的构造方法、类的方法、类的字段等等。这些信息通常被称为元数据（metadata）。",-1),_={href:"https://javabetter.cn/basic-extra-meal/fanshe.html",target:"_blank",rel:"noopener noreferrer"},f=n("p",null,"所以我们常说的类锁，其实就是 Class 对象的锁。",-1),y=n("h2",{id:"锁的基本用法",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#锁的基本用法","aria-hidden":"true"},"#"),a(" 锁的基本用法")],-1),g=n("p",null,[n("code",null,"synchronized"),a(" 翻译成中文就是“同步”的意思。")],-1),C=n("code",null,"synchronized",-1),z={href:"https://javabetter.cn/thread/synchronized-1.html",target:"_blank",rel:"noopener noreferrer"},w=t(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 关键字在实例方法上，锁为当前实例</span>
<span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">instanceLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// code</span>
<span class="token punctuation">}</span>

<span class="token comment">// 关键字在静态方法上，锁为当前Class对象</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">classLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// code</span>
<span class="token punctuation">}</span>

<span class="token comment">// 关键字在代码块上，锁为括号里面的对象</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">blockLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">Object</span> o <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>o<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// code</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里介绍一下“临界区”的概念。所谓“临界区”，指的是某一块代码区域，它同一时刻只能由一个线程执行。在上面的例子中，如果<code>synchronized</code>关键字在方法上，那临界区就是整个方法内部。而如果是 synchronized 代码块，那临界区就指的是代码块内部的区域。</p><p>通过上面的例子我们可以看到，下面这两个写法其实是等价的作用：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 关键字在实例方法上，锁为当前实例</span>
<span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">instanceLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// code</span>
<span class="token punctuation">}</span>

<span class="token comment">// 关键字在代码块上，锁为括号里面的对象</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">blockLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// code</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同理，下面这两个方法也应该是等价的：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 关键字在静态方法上，锁为当前Class对象</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">classLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// code</span>
<span class="token punctuation">}</span>

<span class="token comment">// 关键字在代码块上，锁为括号里面的对象</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">blockLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// code</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="锁的四种状态及锁降级" tabindex="-1"><a class="header-anchor" href="#锁的四种状态及锁降级" aria-hidden="true">#</a> 锁的四种状态及锁降级</h2><p>在 JDK 1.6 以前，所有的锁都是”重量级“锁，因为使用的是操作系统的互斥锁，当一个线程持有锁时，其他试图进入synchronized块的线程将被阻塞，直到锁被释放。涉及到了线程上下文切换和用户态与内核态的切换，因此效率较低。</p><p>这也是为什么很多开发者会认为 synchronized 性能很差的原因。</p><p>那为了减少获得锁和释放锁带来的性能消耗，JDK 1.6 引入了“偏向锁”和“轻量级锁” 的概念，对 synchronized 做了一次重大的升级，升级后的 synchronized 性能可以说上了一个新台阶。</p><p>在 JDK 1.6 及其以后，一个对象其实有四种锁状态，它们级别由低到高依次是：</p><ol><li>无锁状态</li><li>偏向锁状态</li><li>轻量级锁状态</li><li>重量级锁状态</li></ol><p>无锁就是没有对资源进行锁定，任何线程都可以尝试去修改它，很好理解。</p>`,13),j={href:"https://javabetter.cn/jvm/gc.html",target:"_blank",rel:"noopener noreferrer"},J=n("p",null,"关于锁降级有一点需要说明：",-1),M={href:"https://openjdk.org/jeps/8183909",target:"_blank",rel:"noopener noreferrer"},x=t('<blockquote><p>In its current implementation, monitor deflation is performed during every STW pause, while all Java threads are waiting at a safepoint. We have seen safepoint cleanup stalls up to 200ms on monitor-heavy-applications。</p></blockquote><p>大致的意思就是重量级锁降级发生于 STW（Stop The World）阶段，降级对象为仅仅能被 VMThread 访问而没有其他 JavaThread 访问的对象。</p><p>各种锁的优缺点对比（来自《Java 并发编程的艺术》）：</p><table><thead><tr><th>锁</th><th>优点</th><th>缺点</th><th>适用场景</th></tr></thead><tbody><tr><td>偏向锁</td><td>加锁和解锁不需要额外的消耗，和执行非同步方法比仅存在纳秒级的差距。</td><td>如果线程间存在锁竞争，会带来额外的锁撤销的消耗。</td><td>适用于只有一个线程访问同步块场景。</td></tr><tr><td>轻量级锁</td><td>竞争的线程不会阻塞，提高了程序的响应速度。</td><td>如果始终得不到锁竞争的线程使用自旋会消耗 CPU。</td><td>追求响应时间。同步块执行速度非常快。</td></tr><tr><td>重量级锁</td><td>线程竞争不使用自旋，不会消耗 CPU。</td><td>线程阻塞，响应时间缓慢。</td><td>追求吞吐量。同步块执行时间较长。</td></tr></tbody></table><h2 id="对象的锁放在什么地方" tabindex="-1"><a class="header-anchor" href="#对象的锁放在什么地方" aria-hidden="true">#</a> 对象的锁放在什么地方</h2><p>前面我们提到，Java 的锁都是基于对象的。</p><p>首先我们来看看一个对象的“锁”是存放在什么地方的。</p><p>每个 Java 对象都有一个对象头。如果是非数组类型，则用 2 个字宽来存储对象头，如果是数组，则会用 3 个字宽来存储对象头。在 32 位处理器中，一个字宽是 32 位；在 64 位虚拟机中，一个字宽是 64 位。对象头的内容如下表所示：</p><table><thead><tr><th>长度</th><th>内容</th><th>说明</th></tr></thead><tbody><tr><td>32/64bit</td><td>Mark Word</td><td>存储对象的 hashCode 或锁信息等</td></tr><tr><td>32/64bit</td><td>Class Metadata Address</td><td>存储到对象类型数据的指针</td></tr><tr><td>32/64bit</td><td>Array length</td><td>数组的长度（如果是数组）</td></tr></tbody></table><p>我们主要来看看 Mark Word 的格式：</p><table><thead><tr><th>锁状态</th><th>29 bit 或 61 bit</th><th>1 bit 是否是偏向锁？</th><th>2 bit 锁标志位</th></tr></thead><tbody><tr><td>无锁</td><td></td><td>0</td><td>01</td></tr><tr><td>偏向锁</td><td>线程 ID</td><td>1</td><td>01</td></tr><tr><td>轻量级锁</td><td>指向栈中锁记录的指针</td><td>此时这一位不用于标识偏向锁</td><td>00</td></tr><tr><td>重量级锁</td><td>指向互斥量（重量级锁）的指针</td><td>此时这一位不用于标识偏向锁</td><td>10</td></tr><tr><td>GC 标记</td><td></td><td>此时这一位不用于标识偏向锁</td><td>11</td></tr></tbody></table><p>可以看到，当对象状态为偏向锁时，<code>Mark Word</code>存储的是偏向的线程 ID；当状态为轻量级锁时，<code>Mark Word</code>存储的是指向线程栈中<code>Lock Record</code>的指针；当状态为重量级锁时，<code>Mark Word</code>为指向堆中的 monitor（监视器）对象的指针。</p><blockquote><p>在 Java 中，监视器（monitor）是一种同步工具，用于保护共享数据，避免多线程并发访问导致数据不一致。在 Java 中，每个对象都有一个内置的监视器。</p></blockquote>',13),W=n("code",null,"wait()",-1),S=n("code",null,"notify()",-1),L=n("code",null,"notifyAll()",-1),D={href:"https://javabetter.cn/thread/condition.html",target:"_blank",rel:"noopener noreferrer"},A={href:"https://javabetter.cn/thread/shengchanzhe-xiaofeizhe.html",target:"_blank",rel:"noopener noreferrer"},I=n("p",null,"下面分别介绍这几种锁以及它们之间是如何升级的。",-1),V=n("h2",{id:"偏向锁",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#偏向锁","aria-hidden":"true"},"#"),a(" 偏向锁")],-1),O=n("p",null,[a("Hotspot 的作者经过以往的研究发现大多数情况下"),n("strong",null,"锁不仅不存在多线程竞争，而且总是由同一线程多次获得"),a("，于是引入了偏向锁。")],-1),T=n("strong",null,"偏向锁在资源无竞争情况下消除了同步语句",-1),P={href:"https://javabetter.cn/thread/cas.html",target:"_blank",rel:"noopener noreferrer"},E=n("p",null,"大白话就是对锁设置个变量，如果发现为 true，代表资源无竞争，则无需再走各种加锁/解锁流程。如果为 false，代表存在其他线程竞争资源，那么就会走后面的流程。",-1),q=n("h3",{id:"偏向锁的实现原理",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#偏向锁的实现原理","aria-hidden":"true"},"#"),a(" 偏向锁的实现原理")],-1),U=n("p",null,"一个线程在第一次进入同步块时，会在对象头和栈帧中的锁记录里存储锁偏向的线程 ID。当下次该线程进入这个同步块时，会去检查锁的 Mark Word 里面是不是放的自己的线程 ID。",-1),B=n("p",null,"如果是，表明该线程已经获得了锁，以后该线程在进入和退出同步块时不需要花费 CAS 操作来加锁和解锁；如果不是，就代表有另一个线程来竞争这个偏向锁。这个时候会尝试使用 CAS 来替换 Mark Word 里面的线程 ID 为新线程的 ID，这个时候要分两种情况：",-1),H=n("ul",null,[n("li",null,"成功，表示之前的线程不存在了， Mark Word 里面的线程 ID 为新线程的 ID，锁不会升级，仍然为偏向锁；"),n("li",null,"失败，表示之前的线程仍然存在，那么暂停之前的线程，设置偏向锁标识为 0，并设置锁标志位为 00，升级为轻量级锁，会按照轻量级锁的方式进行竞争锁。")],-1),K={href:"https://javabetter.cn/thread/cas.html",target:"_blank",rel:"noopener noreferrer"},R=t(`<p>CAS 是比较并设置的意思，用于在硬件层面上提供原子性操作。在 在某些处理器架构（如x86）中，比较并交换通过指令 CMPXCHG 实现（（Compare and Exchange），一种原子指令），通过比较是否和给定的数值一致，如果一致则修改，不一致则不修改。</p><p>线程竞争偏向锁的过程如下：</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/synchronized-20230728110319.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图中涉及到了 lock record 指针指向当前堆栈中的最近一个 lock record，是轻量级锁按照先来先服务的模式进行了轻量级锁的加锁。</p><h3 id="撤销偏向锁" tabindex="-1"><a class="header-anchor" href="#撤销偏向锁" aria-hidden="true">#</a> 撤销偏向锁</h3><p>偏向锁使用了一种<strong>等到竞争出现才释放锁的机制</strong>，所以当其他线程尝试竞争偏向锁时，持有偏向锁的线程才会释放锁。</p><p>偏向锁升级成轻量级锁时，会暂停拥有偏向锁的线程，重置偏向锁标识，这个过程看起来容易，实则开销还是很大的，大概的过程如下：</p><ol><li>在一个安全点（在这个时间点上没有字节码正在执行）停止拥有锁的线程。</li><li>遍历线程栈，如果存在锁记录的话，需要修复锁记录和 Mark Word，使其变成无锁状态。</li><li>唤醒被停止的线程，将当前锁升级成轻量级锁。</li></ol><p>所以，如果应用程序里所有的锁通常处于竞争状态，那么偏向锁就会是一种累赘，对于这种情况，我们可以一开始就把偏向锁这个默认功能给关闭：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token operator">-</span><span class="token constant">XX</span><span class="token operator">:</span><span class="token class-name">UseBiasedLocking</span><span class="token operator">=</span><span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面这个经典的图总结了偏向锁的获得和撤销：</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/synchronized-20230728112620.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="轻量级锁" tabindex="-1"><a class="header-anchor" href="#轻量级锁" aria-hidden="true">#</a> 轻量级锁</h2><p>多个线程在不同时段获取同一把锁，即不存在锁竞争的情况，也就没有线程阻塞。针对这种情况，JVM 采用轻量级锁来避免线程的阻塞与唤醒。</p><p>JVM 会为每个线程在当前线程的栈帧中创建用于存储锁记录的空间，我们称为 Displaced Mark Word。如果一个线程获得锁的时候发现是轻量级锁，会把锁的 Mark Word 复制到自己的 Displaced Mark Word 里面。</p><p>然后线程尝试用 CAS 将锁的 Mark Word 替换为指向锁记录的指针。如果成功，当前线程获得锁，如果失败，表示 Mark Word 已经被替换成了其他线程的锁记录，说明在与其它线程竞争锁，当前线程就尝试使用自旋来获取锁。</p><blockquote><p>自旋：不断尝试去获取锁，一般用循环来实现。</p></blockquote><p>自旋是需要消耗 CPU 的，如果一直获取不到锁的话，那该线程就一直处在自旋状态，白白浪费 CPU 资源。解决这个问题最简单的办法就是指定自旋的次数，例如让其循环 10 次，如果还没获取到锁就进入阻塞状态。</p><p>但是 JDK 采用了更聪明的方式——适应性自旋，简单来说就是线程如果自旋成功了，则下次自旋的次数会更多，如果自旋失败了，则自旋的次数就会减少。</p><p>自旋也不是一直进行下去的，如果自旋到一定程度（和 JVM、操作系统相关），依然没有获取到锁，称为自旋失败，那么这个线程会阻塞。同时这个锁就会<strong>升级成重量级锁</strong>。</p><h3 id="轻量级锁的释放" tabindex="-1"><a class="header-anchor" href="#轻量级锁的释放" aria-hidden="true">#</a> 轻量级锁的释放</h3><p>在释放锁时，当前线程会使用 CAS 操作将 Displaced Mark Word 的内容复制回锁的 Mark Word 里面。如果没有发生竞争，那么这个复制的操作会成功。如果有其他线程因为自旋多次导致轻量级锁升级成了重量级锁，那么 CAS 操作会失败，此时会释放锁并唤醒被阻塞的线程。</p><p>一张图说明加锁和释放锁的过程：</p><figure><img src="https://cdn.tobebetterjavaer.com/stutymore/synchronized-20230728114101.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="重量级锁" tabindex="-1"><a class="header-anchor" href="#重量级锁" aria-hidden="true">#</a> 重量级锁</h2><p>重量级锁依赖于操作系统的互斥锁（mutex，用于保证任何给定时间内，只有一个线程可以执行某一段特定的代码段） 实现，而操作系统中线程间状态的转换需要相对较长的时间，所以重量级锁效率很低，但被阻塞的线程不会消耗 CPU。</p><p>前面说到，每一个对象都可以当做一个锁，当多个线程同时请求某个对象锁时，对象锁会设置几种状态用来区分请求的线程：</p><ul><li>Contention List：所有请求锁的线程将被首先放置到该竞争队列</li><li>Entry List：Contention List 中那些有资格成为候选人的线程被移到 Entry List</li><li>Wait Set：那些调用 wait 方法被阻塞的线程被放置到 Wait Set</li><li>OnDeck：任何时刻最多只能有一个线程正在竞争锁，该线程称为 OnDeck</li><li>Owner：获得锁的线程称为 Owner</li><li>!Owner：释放锁的线程</li></ul><p>当一个线程尝试获得锁时，如果该锁已经被占用，则会将该线程封装成一个<code>ObjectWaiter</code>对象插入到 Contention List 队列的队首，然后调用<code>park</code> 方法挂起当前线程。</p><p>当线程释放锁时，会从 Contention List 或 EntryList 中挑选一个线程唤醒，被选中的线程叫做<code>Heir presumptive</code>即假定继承人，假定继承人被唤醒后会尝试获得锁，但<code>synchronized</code>是非公平的，所以假定继承人不一定能获得锁。</p><p>这是因为对于重量级锁，线程需要先自旋尝试获得锁，这样做的目的是为了减少执行操作系统同步操作带来的开销。如果自旋不成功再进入等待队列。这对那些已经在等待队列中的线程来说，稍微显得不公平，还有一个不公平的地方是自旋线程可能会抢占了 Ready 线程的锁。</p><p>如果线程获得锁后调用<code>Object.wait</code>方法，则会将线程加入到 WaitSet 中，当被<code>Object.notify</code>唤醒后，会将线程从 WaitSet 移动到 Contention List 或 EntryList 中去。需要注意的是，当调用一个锁对象的<code>wait</code>或<code>notify</code>方法时，<strong>如当前锁的状态是偏向锁或轻量级锁则会先膨胀成重量级锁</strong>。</p><h2 id="锁的升级流程" tabindex="-1"><a class="header-anchor" href="#锁的升级流程" aria-hidden="true">#</a> 锁的升级流程</h2><p>每一个线程在准备获取共享资源时：<br> 第一步，检查 MarkWord 里面是不是放的自己的 ThreadId ,如果是，表示当前线程是处于 “偏向锁” 。</p><p>第二步，如果 MarkWord 不是自己的 ThreadId，锁升级，这时候，用 CAS 来执行切换，新的线程根据 MarkWord 里面现有的 ThreadId，通知之前线程暂停，之前线程将 Markword 的内容置为空。</p><p>第三步，两个线程都把锁对象的 HashCode 复制到自己新建的用于存储锁的记录空间，接着开始通过 CAS 操作，<br> 把锁对象的 MarKword 的内容修改为自己新建的记录空间的地址的方式竞争 MarkWord。</p><p>第四步，第三步中成功执行 CAS 的获得资源，失败的则进入自旋 。</p><p>第五步，自旋的线程在自旋过程中，成功获得资源(即之前获的资源的线程执行完成并释放了共享资源)，则整个状态依然处于 轻量级锁的状态，如果自旋失败 。</p><p>第六步，进入重量级锁的状态，这个时候，自旋的线程进行阻塞，等待之前线程执行完成并唤醒自己。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h2><ul><li>Java 中的每一个对象都可以作为一个锁，Java 中的锁都是基于对象的。</li><li>synchronized 关键字可以用来修饰方法和代码块，它可以保证在同一时刻最多只有一个线程执行该段代码。</li><li>synchronized 关键字在修饰方法时，锁为当前实例对象；在修饰静态方法时，锁为当前 Class 对象；在修饰代码块时，锁为括号里面的对象。</li><li>Java 6 为了减少获得锁和释放锁带来的性能消耗，引入了“偏向锁”和“轻量级锁“。在 Java 6 以前，所有的锁都是”重量级“锁。所以在 Java 6 及其以后，一个对象其实有四种锁状态，它们级别由低到高依次是：无锁状态、偏向锁状态、轻量级锁状态、重量级锁状态。</li><li>偏向锁会偏向于第一个访问锁的线程，如果在接下来的运行过程中，该锁没有被其他的线程访问，则持有偏向锁的线程将永远不需要触发同步。也就是说，偏向锁在资源无竞争情况下消除了同步语句，连 CAS 操作都不做了，提高了程序的运行性能。</li><li>轻量级锁是通过 CAS 操作和自旋来实现的，如果自旋失败，则会升级为重量级锁。</li><li>重量级锁依赖于操作系统的互斥量（mutex） 实现的，而操作系统中线程间状态的转换需要相对较长的时间，所以重量级锁效率很低，但被阻塞的线程不会消耗 CPU。</li></ul>`,41),N={href:"http://concurrent.redspider.group/",target:"_blank",rel:"noopener noreferrer"},G=n("hr",null,null,-1),X={href:"https://github.com/itwanger/toBeBetterJavaer",target:"_blank",rel:"noopener noreferrer"},F={href:"https://javabetter.cn/thread/",target:"_blank",rel:"noopener noreferrer"},Q={href:"https://javabetter.cn/thread/",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://javabetter.cn/thread/",target:"_blank",rel:"noopener noreferrer"},Z={href:"https://javabetter.cn/thread/",target:"_blank",rel:"noopener noreferrer"},$=n("figure",null,[n("img",{src:"https://cdn.tobebetterjavaer.com/stutymore/wangzhe-thread-20230904125125.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1);function nn(an,en){const e=r("ExternalLinkIcon");return d(),i("div",null,[l,n("p",null,[a("前面一节我们讲了 "),n("a",p,[a("synchronized 关键字的基本使用"),s(e)]),a("，它能用来同步方法和代码块，那 synchronized 到底锁的是什么呢？随着 JDK 版本的升级，synchronized 又做出了哪些改变呢？“synchronized 性能很差”的谣言真的存在吗？")]),h,u,n("p",null,[a("还有一点需要注意的是，我们常听到的"),k,a("其实也是对象锁，"),n("a",v,[a("上一节"),s(e)]),a("我们也讲到了，应该有不少小伙伴注意到了。")]),b,m,n("p",null,[a("可以通过 Class 对象来获取类的元数据，甚至动态地创建类的实例、调用类的方法、访问类的字段等。这就是"),n("a",_,[a("Java 的反射（Reflection）机制"),s(e)]),a("。")]),f,y,g,n("p",null,[a("我们通常使用"),C,a("关键字来给一段代码或一个方法上锁，我们"),n("a",z,[a("上一节"),s(e)]),a("已经讲过了，这里简单回顾一下，因为 synchronized 真的非常重要，面试常问，开发常用。它通常有以下三种形式：")]),w,n("p",null,[a("几种锁会随着竞争情况逐渐升级，锁的升级很容易发生，但是锁降级发生的条件就比较苛刻了，锁降级发生在 "),n("a",j,[a("Stop The World"),s(e)]),a("（Java 垃圾回收中的一个重要概念，JVM 篇会细讲）期间，当 JVM 进入安全点的时候，会检查是否有闲置的锁，然后进行降级。")]),J,n("p",null,[a("不同于大部分文章说的锁不能降级，实际上 HotSpot JVM 是支持锁降级的，"),n("a",M,[a("这篇帖子"),s(e)]),a("里有一个很关键的论述，帖子是 R 大给出的。")]),x,n("p",null,[a("监视器包括两个重要部分，一个是锁，一个是等待/通知机制，后者是通过 Object 类中的"),W,a(", "),S,a(", "),L,a("等方法实现的（我们会在讲"),n("a",D,[a("Condition"),s(e)]),a("和"),n("a",A,[a("生产者-消费者模式"),s(e)]),a("）详细地讲。")]),I,V,O,n("p",null,[a("偏向锁会偏向于第一个访问锁的线程，如果在接下来的运行过程中，该锁没有被其他的线程访问，则持有偏向锁的线程将永远不需要触发同步。也就是说，"),T,a("，连 "),n("a",P,[a("CAS"),s(e)]),a("（后面会细讲，戳链接直达） 操作都不做了，着极大地提高了程序的运行性能。")]),E,q,U,B,H,n("p",null,[n("a",K,[a("CAS: Compare and Swap"),s(e)]),a(" 会在后面细讲，可戳链接直达，这里简单提一嘴。")]),R,n("blockquote",null,[n("p",null,[a("编辑：沉默王二，原文内容来源于朋友小七萤火虫开源的这个仓库："),n("a",N,[a("深入浅出 Java 多线程"),s(e)]),a("，强烈推荐。")])]),G,n("p",null,[a("GitHub 上标星 10000+ 的开源知识库《"),n("a",X,[a("二哥的 Java 进阶之路"),s(e)]),a("》第二份 PDF 《"),n("a",F,[a("并发编程小册"),s(e)]),a("》终于来了！包括线程的基本概念和使用方法、Java的内存模型、sychronized、volatile、CAS、AQS、ReentrantLock、线程池、并发容器、ThreadLocal、生产者消费者模型等面试和开发必须掌握的内容，共计 15 万余字，200+张手绘图，可以说是通俗易懂、风趣幽默……详情戳："),n("a",Q,[a("太赞了，二哥的并发编程进阶之路.pdf"),s(e)])]),n("p",null,[n("a",Y,[a("加入二哥的编程星球"),s(e)]),a("，在星球的第二个置顶帖「"),n("a",Z,[a("知识图谱"),s(e)]),a("」里就可以获取 PDF 版本。")]),$])}const on=o(c,[["render",nn],["__file","synchronized.html.vue"]]);export{on as default};