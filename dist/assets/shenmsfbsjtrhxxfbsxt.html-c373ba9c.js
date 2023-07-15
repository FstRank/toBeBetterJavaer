const e=JSON.parse('{"key":"v-b7ca23b2","path":"/nice-article/cnblog/shenmsfbsjtrhxxfbsxt.html","title":"什么是分布式系统，如何学习分布式系统","lang":"zh-CN","frontmatter":{"title":"什么是分布式系统，如何学习分布式系统","shortTitle":"什么是分布式系统，如何学习分布式系统","author":"xybaby","category":["博客园"],"description":"虽然本人在前面也写过好几篇分布式系统相关的文章，主要包括CAP理论、分布式存储与分布式事务，但对于分布式系统，并没有一个跟清晰的概念。分布式系统涉及到很多的技术、理论与协议，很多人也说，分布式系统是“入门容易，深入难”，我之前的学习也只算是管中窥豹，只见得其中一斑。因此，一致希望能对分布式系统有一个更全面的认识，至少能够把分布式系统中的各个技术、理论串起来，了解他们在分布式系统分别解决什么问题，有哪些优秀的实现。","head":[["meta",{"property":"og:url","content":"https://javabetter.cn/nice-article/cnblog/shenmsfbsjtrhxxfbsxt.html"}],["meta",{"property":"og:site_name","content":"二哥的Java进阶之路"}],["meta",{"property":"og:title","content":"什么是分布式系统，如何学习分布式系统"}],["meta",{"property":"og:description","content":"虽然本人在前面也写过好几篇分布式系统相关的文章，主要包括CAP理论、分布式存储与分布式事务，但对于分布式系统，并没有一个跟清晰的概念。分布式系统涉及到很多的技术、理论与协议，很多人也说，分布式系统是“入门容易，深入难”，我之前的学习也只算是管中窥豹，只见得其中一斑。因此，一致希望能对分布式系统有一个更全面的认识，至少能够把分布式系统中的各个技术、理论串起来，了解他们在分布式系统分别解决什么问题，有哪些优秀的实现。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-10-08T01:19:55.000Z"}],["meta",{"property":"article:author","content":"xybaby"}],["meta",{"property":"article:modified_time","content":"2022-10-08T01:19:55.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"什么是分布式系统，如何学习分布式系统\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2022-10-08T01:19:55.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"xybaby\\"}]}"]]},"headers":[{"level":2,"title":"分布式系统挑战","slug":"分布式系统挑战","link":"#分布式系统挑战","children":[]},{"level":2,"title":"分布式系统特性与衡量标准","slug":"分布式系统特性与衡量标准","link":"#分布式系统特性与衡量标准","children":[]},{"level":2,"title":"用一个请求串起来","slug":"用一个请求串起来","link":"#用一个请求串起来","children":[]},{"level":2,"title":"一个简化的架构图","slug":"一个简化的架构图","link":"#一个简化的架构图","children":[]},{"level":2,"title":"概念与实现","slug":"概念与实现","link":"#概念与实现","children":[]}],"git":{"createdTime":1665191995000,"updatedTime":1665191995000,"contributors":[{"name":"沉默王二","email":"www.qing_gee@163.com","commits":1}]},"readingTime":{"minutes":16.81,"words":5043},"filePathRelative":"nice-article/cnblog/shenmsfbsjtrhxxfbsxt.md","localizedDate":"2022年10月8日","excerpt":"<p>虽然本人在前面也写过好几篇分布式系统相关的文章，主要包括<a href=\\"http://www.cnblogs.com/xybaby/p/6871764.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">CAP理论</a>、<a href=\\"http://www.cnblogs.com/xybaby/p/6930977.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">分布式存储</a>与<a href=\\"http://www.cnblogs.com/xybaby/p/7465816.html\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">分布式事务</a>，但对于分布式系统，并没有一个跟清晰的概念。分布式系统涉及到很多的技术、理论与协议，很多人也说，分布式系统是“入门容易，深入难”，我之前的学习也只算是管中窥豹，只见得其中一斑。因此，一致希望能对分布式系统有一个更全面的认识，至少能够把分布式系统中的各个技术、理论串起来，了解他们在分布式系统分别解决什么问题，有哪些优秀的实现。</p>","autoDesc":true}');export{e as data};