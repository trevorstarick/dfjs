(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
!function(t){if("function"==typeof bootstrap)bootstrap("pf",t);else if("object"==typeof exports)module.exports=t();else if("function"==typeof define&&define.amd)define(t);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makePF=t}else"undefined"!=typeof window?window.PF=t():global.PF=t()}(function(){return function(t,e,r){function i(r,o){if(!e[r]){if(!t[r]){var s="function"==typeof require&&require;if(!o&&s)return s(r,!0);if(n)return n(r,!0);throw new Error("Cannot find module '"+r+"'")}var a=e[r]={exports:{}};t[r][0].call(a.exports,function(e){var n=t[r][1][e];return i(n?n:e)},a,a.exports)}return e[r].exports}for(var n="function"==typeof require&&require,o=0;o<r.length;o++)i(r[o]);return i}({1:[function(t,e){e.exports=t("./lib/heap")},{"./lib/heap":2}],2:[function(t,e){!function(){var t,r,i,n,o,s,a,u,h,l,p,c,f,d,g;i=Math.floor,l=Math.min,r=function(t,e){return e>t?-1:t>e?1:0},h=function(t,e,n,o,s){var a;if(null==n&&(n=0),null==s&&(s=r),0>n)throw new Error("lo must be non-negative");for(null==o&&(o=t.length);o>n;)a=i((n+o)/2),s(e,t[a])<0?o=a:n=a+1;return[].splice.apply(t,[n,n-n].concat(e)),e},s=function(t,e,i){return null==i&&(i=r),t.push(e),d(t,0,t.length-1,i)},o=function(t,e){var i,n;return null==e&&(e=r),i=t.pop(),t.length?(n=t[0],t[0]=i,g(t,0,e)):n=i,n},u=function(t,e,i){var n;return null==i&&(i=r),n=t[0],t[0]=e,g(t,0,i),n},a=function(t,e,i){var n;return null==i&&(i=r),t.length&&i(t[0],e)<0&&(n=[t[0],e],e=n[0],t[0]=n[1],g(t,0,i)),e},n=function(t,e){var n,o,s,a,u,h;for(null==e&&(e=r),a=function(){h=[];for(var e=0,r=i(t.length/2);r>=0?r>e:e>r;r>=0?e++:e--)h.push(e);return h}.apply(this).reverse(),u=[],o=0,s=a.length;s>o;o++)n=a[o],u.push(g(t,n,e));return u},f=function(t,e,i){var n;return null==i&&(i=r),n=t.indexOf(e),-1!==n?(d(t,0,n,i),g(t,n,i)):void 0},p=function(t,e,i){var o,s,u,h,l;if(null==i&&(i=r),s=t.slice(0,e),!s.length)return s;for(n(s,i),l=t.slice(e),u=0,h=l.length;h>u;u++)o=l[u],a(s,o,i);return s.sort(i).reverse()},c=function(t,e,i){var s,a,u,p,c,f,d,g,b,y;if(null==i&&(i=r),10*e<=t.length){if(p=t.slice(0,e).sort(i),!p.length)return p;for(u=p[p.length-1],g=t.slice(e),c=0,d=g.length;d>c;c++)s=g[c],i(s,u)<0&&(h(p,s,0,null,i),p.pop(),u=p[p.length-1]);return p}for(n(t,i),y=[],a=f=0,b=l(e,t.length);b>=0?b>f:f>b;a=b>=0?++f:--f)y.push(o(t,i));return y},d=function(t,e,i,n){var o,s,a;for(null==n&&(n=r),o=t[i];i>e&&(a=i-1>>1,s=t[a],n(o,s)<0);)t[i]=s,i=a;return t[i]=o},g=function(t,e,i){var n,o,s,a,u;for(null==i&&(i=r),o=t.length,u=e,s=t[e],n=2*e+1;o>n;)a=n+1,o>a&&!(i(t[n],t[a])<0)&&(n=a),t[e]=t[n],e=n,n=2*e+1;return t[e]=s,d(t,u,e,i)},t=function(){function t(t){this.cmp=null!=t?t:r,this.nodes=[]}return t.push=s,t.pop=o,t.replace=u,t.pushpop=a,t.heapify=n,t.nlargest=p,t.nsmallest=c,t.prototype.push=function(t){return s(this.nodes,t,this.cmp)},t.prototype.pop=function(){return o(this.nodes,this.cmp)},t.prototype.peek=function(){return this.nodes[0]},t.prototype.contains=function(t){return-1!==this.nodes.indexOf(t)},t.prototype.replace=function(t){return u(this.nodes,t,this.cmp)},t.prototype.pushpop=function(t){return a(this.nodes,t,this.cmp)},t.prototype.heapify=function(){return n(this.nodes,this.cmp)},t.prototype.updateItem=function(t){return f(this.nodes,t,this.cmp)},t.prototype.clear=function(){return this.nodes=[]},t.prototype.empty=function(){return 0===this.nodes.length},t.prototype.size=function(){return this.nodes.length},t.prototype.clone=function(){var e;return e=new t,e.nodes=this.nodes.slice(0),e},t.prototype.toArray=function(){return this.nodes.slice(0)},t.prototype.insert=t.prototype.push,t.prototype.remove=t.prototype.pop,t.prototype.top=t.prototype.peek,t.prototype.front=t.prototype.peek,t.prototype.has=t.prototype.contains,t.prototype.copy=t.prototype.clone,t}(),("undefined"!=typeof e&&null!==e?e.exports:void 0)?e.exports=t:window.Heap=t}.call(this)},{}],3:[function(t,e){e.exports={Heap:t("heap"),Node:t("./core/Node"),Grid:t("./core/Grid"),Util:t("./core/Util"),Heuristic:t("./core/Heuristic"),AStarFinder:t("./finders/AStarFinder"),BestFirstFinder:t("./finders/BestFirstFinder"),BreadthFirstFinder:t("./finders/BreadthFirstFinder"),DijkstraFinder:t("./finders/DijkstraFinder"),BiAStarFinder:t("./finders/BiAStarFinder"),BiBestFirstFinder:t("./finders/BiBestFirstFinder"),BiBreadthFirstFinder:t("./finders/BiBreadthFirstFinder"),BiDijkstraFinder:t("./finders/BiDijkstraFinder"),IDAStarFinder:t("./finders/IDAStarFinder"),JumpPointFinder:t("./finders/JumpPointFinder"),OrthogonalJumpPointFinder:t("./finders/OrthogonalJumpPointFinder"),TraceFinder:t("./finders/TraceFinder")}},{"./core/Grid":4,"./core/Heuristic":5,"./core/Node":6,"./core/Util":7,"./finders/AStarFinder":8,"./finders/BestFirstFinder":9,"./finders/BiAStarFinder":10,"./finders/BiBestFirstFinder":11,"./finders/BiBreadthFirstFinder":12,"./finders/BiDijkstraFinder":13,"./finders/BreadthFirstFinder":14,"./finders/DijkstraFinder":15,"./finders/IDAStarFinder":16,"./finders/JumpPointFinder":17,"./finders/OrthogonalJumpPointFinder":18,"./finders/TraceFinder":19,heap:1}],4:[function(t,e){function r(t,e,r){this.width=t,this.height=e,this.nodes=this._buildNodes(t,e,r)}var i=t("./Node");r.prototype._buildNodes=function(t,e,r){var n,o,s=new Array(e);for(n=0;e>n;++n)for(s[n]=new Array(t),o=0;t>o;++o)s[n][o]=new i(o,n);if(void 0===r)return s;if(r.length!==e||r[0].length!==t)throw new Error("Matrix size does not fit");for(n=0;e>n;++n)for(o=0;t>o;++o)r[n][o]&&(s[n][o].walkable=!1);return s},r.prototype.getNodeAt=function(t,e){return this.nodes[e][t]},r.prototype.isWalkableAt=function(t,e){return this.isInside(t,e)&&this.nodes[e][t].walkable},r.prototype.isInside=function(t,e){return t>=0&&t<this.width&&e>=0&&e<this.height},r.prototype.setWalkableAt=function(t,e,r){this.nodes[e][t].walkable=r},r.prototype.getNeighbors=function(t,e,r){var i=t.x,n=t.y,o=[],s=!1,a=!1,u=!1,h=!1,l=!1,p=!1,c=!1,f=!1,d=this.nodes;return this.isWalkableAt(i,n-1)&&(o.push(d[n-1][i]),s=!0),this.isWalkableAt(i+1,n)&&(o.push(d[n][i+1]),u=!0),this.isWalkableAt(i,n+1)&&(o.push(d[n+1][i]),l=!0),this.isWalkableAt(i-1,n)&&(o.push(d[n][i-1]),c=!0),e?(r?(a=c&&s,h=s&&u,p=u&&l,f=l&&c):(a=c||s,h=s||u,p=u||l,f=l||c),a&&this.isWalkableAt(i-1,n-1)&&o.push(d[n-1][i-1]),h&&this.isWalkableAt(i+1,n-1)&&o.push(d[n-1][i+1]),p&&this.isWalkableAt(i+1,n+1)&&o.push(d[n+1][i+1]),f&&this.isWalkableAt(i-1,n+1)&&o.push(d[n+1][i-1]),o):o},r.prototype.clone=function(){var t,e,n=this.width,o=this.height,s=this.nodes,a=new r(n,o),u=new Array(o);for(t=0;o>t;++t)for(u[t]=new Array(n),e=0;n>e;++e)u[t][e]=new i(e,t,s[t][e].walkable);return a.nodes=u,a},e.exports=r},{"./Node":6}],5:[function(t,e){e.exports={manhattan:function(t,e){return t+e},euclidean:function(t,e){return Math.sqrt(t*t+e*e)},chebyshev:function(t,e){return Math.max(t,e)}}},{}],6:[function(t,e){function r(t,e,r){this.x=t,this.y=e,this.walkable=void 0===r?!0:r}e.exports=r},{}],7:[function(t,e,r){function i(t){for(var e=[[t.x,t.y]];t.parent;)t=t.parent,e.push([t.x,t.y]);return e.reverse()}function n(t,e){var r=i(t),n=i(e);return r.concat(n.reverse())}function o(t){var e,r,i,n,o,s=0;for(e=1;e<t.length;++e)r=t[e-1],i=t[e],n=r[0]-i[0],o=r[1]-i[1],s+=Math.sqrt(n*n+o*o);return s}function s(t,e,r,i){var n,o,s,a,u,h,l=Math.abs,p=[];for(s=l(r-t),a=l(i-e),n=r>t?1:-1,o=i>e?1:-1,u=s-a;;){if(p.push([t,e]),t===r&&e===i)break;h=2*u,h>-a&&(u-=a,t+=n),s>h&&(u+=s,e+=o)}return p}function a(t){var e,r,i,n,o,a,u=[],h=t.length;if(2>h)return u;for(o=0;h-1>o;++o)for(e=t[o],r=t[o+1],i=s(e[0],e[1],r[0],r[1]),n=i.length,a=0;n-1>a;++a)u.push(i[a]);return u.push(t[h-1]),u}function u(t,e){var r,i,n,o,a,u,h,l,p,c,f,d,g,b=e.length,y=e[0][0],A=e[0][1],k=e[b-1][0],m=e[b-1][1];for(r=y,i=A,a=e[1][0],u=e[1][1],h=[[r,i]],l=2;b>l;++l){for(c=e[l],n=c[0],o=c[1],f=s(r,i,n,o),g=!1,p=1;p<f.length;++p)if(d=f[p],!t.isWalkableAt(d[0],d[1])){g=!0,h.push([a,u]),r=a,i=u;break}g||(a=n,u=o)}return h.push([k,m]),h}function h(t){if(t.length<3)return t;var e,r,i,n,o,s,a=[],u=t[0][0],h=t[0][1],l=t[1][0],p=t[1][1],c=l-u,f=p-h;for(o=Math.sqrt(c*c+f*f),c/=o,f/=o,a.push([u,h]),s=2;s<t.length;s++)e=l,r=p,i=c,n=f,l=t[s][0],p=t[s][1],c=l-e,f=p-r,o=Math.sqrt(c*c+f*f),c/=o,f/=o,(c!==i||f!==n)&&a.push([e,r]);return a.push([l,p]),a}r.backtrace=i,r.biBacktrace=n,r.pathLength=o,r.interpolate=s,r.expandPath=a,r.smoothenPath=u,r.compressPath=h},{}],8:[function(t,e){function r(t){t=t||{},this.allowDiagonal=t.allowDiagonal,this.dontCrossCorners=t.dontCrossCorners,this.heuristic=t.heuristic||o.manhattan,this.weight=t.weight||1}var i=t("heap"),n=t("../core/Util"),o=t("../core/Heuristic");r.prototype.findPath=function(t,e,r,o,s){var a,u,h,l,p,c,f,d,g=new i(function(t,e){return t.f-e.f}),b=s.getNodeAt(t,e),y=s.getNodeAt(r,o),A=this.heuristic,k=this.allowDiagonal,m=this.dontCrossCorners,v=this.weight,w=Math.abs,x=Math.SQRT2;for(b.g=0,b.f=0,g.push(b),b.opened=!0;!g.empty();){if(a=g.pop(),a.closed=!0,a===y)return n.backtrace(y);for(u=s.getNeighbors(a,k,m),l=0,p=u.length;p>l;++l)h=u[l],h.closed||(c=h.x,f=h.y,d=a.g+(0===c-a.x||0===f-a.y?1:x),(!h.opened||d<h.g)&&(h.g=d,h.h=h.h||v*A(w(c-r),w(f-o)),h.f=h.g+h.h,h.parent=a,h.opened?g.updateItem(h):(g.push(h),h.opened=!0)))}return[]},e.exports=r},{"../core/Heuristic":5,"../core/Util":7,heap:1}],9:[function(t,e){function r(t){i.call(this,t);var e=this.heuristic;this.heuristic=function(t,r){return 1e6*e(t,r)}}var i=t("./AStarFinder");r.prototype=new i,r.prototype.constructor=r,e.exports=r},{"./AStarFinder":8}],10:[function(t,e){function r(t){t=t||{},this.allowDiagonal=t.allowDiagonal,this.dontCrossCorners=t.dontCrossCorners,this.heuristic=t.heuristic||o.manhattan,this.weight=t.weight||1}var i=t("heap"),n=t("../core/Util"),o=t("../core/Heuristic");r.prototype.findPath=function(t,e,r,o,s){var a,u,h,l,p,c,f,d,g=function(t,e){return t.f-e.f},b=new i(g),y=new i(g),A=s.getNodeAt(t,e),k=s.getNodeAt(r,o),m=this.heuristic,v=this.allowDiagonal,w=this.dontCrossCorners,x=this.weight,F=Math.abs,W=Math.SQRT2,N=1,C=2;for(A.g=0,A.f=0,b.push(A),A.opened=N,k.g=0,k.f=0,y.push(k),k.opened=C;!b.empty()&&!y.empty();){for(a=b.pop(),a.closed=!0,u=s.getNeighbors(a,v,w),l=0,p=u.length;p>l;++l)if(h=u[l],!h.closed){if(h.opened===C)return n.biBacktrace(a,h);c=h.x,f=h.y,d=a.g+(0===c-a.x||0===f-a.y?1:W),(!h.opened||d<h.g)&&(h.g=d,h.h=h.h||x*m(F(c-r),F(f-o)),h.f=h.g+h.h,h.parent=a,h.opened?b.updateItem(h):(b.push(h),h.opened=N))}for(a=y.pop(),a.closed=!0,u=s.getNeighbors(a,v,w),l=0,p=u.length;p>l;++l)if(h=u[l],!h.closed){if(h.opened===N)return n.biBacktrace(h,a);c=h.x,f=h.y,d=a.g+(0===c-a.x||0===f-a.y?1:W),(!h.opened||d<h.g)&&(h.g=d,h.h=h.h||x*m(F(c-t),F(f-e)),h.f=h.g+h.h,h.parent=a,h.opened?y.updateItem(h):(y.push(h),h.opened=C))}}return[]},e.exports=r},{"../core/Heuristic":5,"../core/Util":7,heap:1}],11:[function(t,e){function r(t){i.call(this,t);var e=this.heuristic;this.heuristic=function(t,r){return 1e6*e(t,r)}}var i=t("./BiAStarFinder");r.prototype=new i,r.prototype.constructor=r,e.exports=r},{"./BiAStarFinder":10}],12:[function(t,e){function r(t){t=t||{},this.allowDiagonal=t.allowDiagonal,this.dontCrossCorners=t.dontCrossCorners}var i=t("../core/Util");r.prototype.findPath=function(t,e,r,n,o){var s,a,u,h,l,p=o.getNodeAt(t,e),c=o.getNodeAt(r,n),f=[],d=[],g=this.allowDiagonal,b=this.dontCrossCorners,y=0,A=1;for(f.push(p),p.opened=!0,p.by=y,d.push(c),c.opened=!0,c.by=A;f.length&&d.length;){for(u=f.shift(),u.closed=!0,s=o.getNeighbors(u,g,b),h=0,l=s.length;l>h;++h)if(a=s[h],!a.closed)if(a.opened){if(a.by===A)return i.biBacktrace(u,a)}else f.push(a),a.parent=u,a.opened=!0,a.by=y;for(u=d.shift(),u.closed=!0,s=o.getNeighbors(u,g,b),h=0,l=s.length;l>h;++h)if(a=s[h],!a.closed)if(a.opened){if(a.by===y)return i.biBacktrace(a,u)}else d.push(a),a.parent=u,a.opened=!0,a.by=A}return[]},e.exports=r},{"../core/Util":7}],13:[function(t,e){function r(t){i.call(this,t),this.heuristic=function(){return 0}}var i=t("./BiAStarFinder");r.prototype=new i,r.prototype.constructor=r,e.exports=r},{"./BiAStarFinder":10}],14:[function(t,e){function r(t){t=t||{},this.allowDiagonal=t.allowDiagonal,this.dontCrossCorners=t.dontCrossCorners}var i=t("../core/Util");r.prototype.findPath=function(t,e,r,n,o){var s,a,u,h,l,p=[],c=this.allowDiagonal,f=this.dontCrossCorners,d=o.getNodeAt(t,e),g=o.getNodeAt(r,n);for(p.push(d),d.opened=!0;p.length;){if(u=p.shift(),u.closed=!0,u===g)return i.backtrace(g);for(s=o.getNeighbors(u,c,f),h=0,l=s.length;l>h;++h)a=s[h],a.closed||a.opened||(p.push(a),a.opened=!0,a.parent=u)}return[]},e.exports=r},{"../core/Util":7}],15:[function(t,e){function r(t){i.call(this,t),this.heuristic=function(){return 0}}var i=t("./AStarFinder");r.prototype=new i,r.prototype.constructor=r,e.exports=r},{"./AStarFinder":8}],16:[function(t,e){function r(t){t=t||{},this.allowDiagonal=t.allowDiagonal,this.dontCrossCorners=t.dontCrossCorners,this.heuristic=t.heuristic||i.manhattan,this.weight=t.weight||1,this.trackRecursion=t.trackRecursion||!1,this.timeLimit=t.timeLimit||1/0}t("../core/Util");var i=t("../core/Heuristic"),n=t("../core/Node");r.prototype.findPath=function(t,e,r,i,o){var s,a,u,h=0,l=(new Date).getTime(),p=function(t,e){return this.heuristic(Math.abs(e.x-t.x),Math.abs(e.y-t.y))}.bind(this),c=function(t,e){return t.x===e.x||t.y===e.y?1:Math.SQRT2},f=function(t,e,r,i,s){if(h++,this.timeLimit>0&&(new Date).getTime()-l>1e3*this.timeLimit)return 1/0;var a=e+p(t,g)*this.weight;if(a>r)return a;if(t==g)return i[s]=[t.x,t.y],t;var u,d,b,y,A=o.getNeighbors(t,this.allowDiagonal,this.dontCrossCorners);for(b=0,u=1/0;y=A[b];++b){if(this.trackRecursion&&(y.retainCount=y.retainCount+1||1,y.tested!==!0&&(y.tested=!0)),d=f(y,e+c(t,y),r,i,s+1),d instanceof n)return i[s]=[t.x,t.y],d;this.trackRecursion&&0===--y.retainCount&&(y.tested=!1),u>d&&(u=d)}return u}.bind(this),d=o.getNodeAt(t,e),g=o.getNodeAt(r,i),b=p(d,g);for(s=0;!0;++s){if(a=[],u=f(d,0,b,a,0),1/0===u)return[];if(u instanceof n)return a;b=u}return[]},e.exports=r},{"../core/Heuristic":5,"../core/Node":6,"../core/Util":7}],17:[function(t,e){function r(t){t=t||{},this.heuristic=t.heuristic||o.manhattan,this.trackJumpRecursion=t.trackJumpRecursion||!1}var i=t("heap"),n=t("../core/Util"),o=t("../core/Heuristic");r.prototype.findPath=function(t,e,r,o,s){var a,u=this.openList=new i(function(t,e){return t.f-e.f}),h=this.startNode=s.getNodeAt(t,e),l=this.endNode=s.getNodeAt(r,o);for(this.grid=s,h.g=0,h.f=0,u.push(h),h.opened=!0;!u.empty();){if(a=u.pop(),a.closed=!0,a===l)return n.expandPath(n.backtrace(l));this._identifySuccessors(a)}return[]},r.prototype._identifySuccessors=function(t){var e,r,i,n,s,a,u,h,l,p,c=this.grid,f=this.heuristic,d=this.openList,g=this.endNode.x,b=this.endNode.y,y=t.x,A=t.y,k=Math.abs;for(Math.max,e=this._findNeighbors(t),n=0,s=e.length;s>n;++n)if(r=e[n],i=this._jump(r[0],r[1],y,A)){if(a=i[0],u=i[1],p=c.getNodeAt(a,u),p.closed)continue;h=o.euclidean(k(a-y),k(u-A)),l=t.g+h,(!p.opened||l<p.g)&&(p.g=l,p.h=p.h||f(k(a-g),k(u-b)),p.f=p.g+p.h,p.parent=t,p.opened?d.updateItem(p):(d.push(p),p.opened=!0))}},r.prototype._jump=function(t,e,r,i){var n=this.grid,o=t-r,s=e-i;if(!n.isWalkableAt(t,e))return null;if(this.trackJumpRecursion===!0&&(n.getNodeAt(t,e).tested=!0),n.getNodeAt(t,e)===this.endNode)return[t,e];if(0!==o&&0!==s){if(n.isWalkableAt(t-o,e+s)&&!n.isWalkableAt(t-o,e)||n.isWalkableAt(t+o,e-s)&&!n.isWalkableAt(t,e-s))return[t,e]}else if(0!==o){if(n.isWalkableAt(t+o,e+1)&&!n.isWalkableAt(t,e+1)||n.isWalkableAt(t+o,e-1)&&!n.isWalkableAt(t,e-1))return[t,e]}else if(n.isWalkableAt(t+1,e+s)&&!n.isWalkableAt(t+1,e)||n.isWalkableAt(t-1,e+s)&&!n.isWalkableAt(t-1,e))return[t,e];return 0!==o&&0!==s&&(this._jump(t+o,e,t,e)||this._jump(t,e+s,t,e))?[t,e]:n.isWalkableAt(t+o,e)||n.isWalkableAt(t,e+s)?this._jump(t+o,e+s,t,e):null},r.prototype._findNeighbors=function(t){var e,r,i,n,o,s,a,u,h=t.parent,l=t.x,p=t.y,c=this.grid,f=[];if(h)e=h.x,r=h.y,i=(l-e)/Math.max(Math.abs(l-e),1),n=(p-r)/Math.max(Math.abs(p-r),1),0!==i&&0!==n?(c.isWalkableAt(l,p+n)&&f.push([l,p+n]),c.isWalkableAt(l+i,p)&&f.push([l+i,p]),(c.isWalkableAt(l,p+n)||c.isWalkableAt(l+i,p))&&f.push([l+i,p+n]),!c.isWalkableAt(l-i,p)&&c.isWalkableAt(l,p+n)&&f.push([l-i,p+n]),!c.isWalkableAt(l,p-n)&&c.isWalkableAt(l+i,p)&&f.push([l+i,p-n])):0===i?c.isWalkableAt(l,p+n)&&(f.push([l,p+n]),c.isWalkableAt(l+1,p)||f.push([l+1,p+n]),c.isWalkableAt(l-1,p)||f.push([l-1,p+n])):c.isWalkableAt(l+i,p)&&(f.push([l+i,p]),c.isWalkableAt(l,p+1)||f.push([l+i,p+1]),c.isWalkableAt(l,p-1)||f.push([l+i,p-1]));else for(o=c.getNeighbors(t,!0),a=0,u=o.length;u>a;++a)s=o[a],f.push([s.x,s.y]);return f},e.exports=r},{"../core/Heuristic":5,"../core/Util":7,heap:1}],18:[function(t,e){function r(t){n.call(this,t),t=t||{},this.heuristic=t.heuristic||i.manhattan}var i=t("../core/Heuristic"),n=t("./JumpPointFinder");r.prototype=new n,r.prototype.constructor=r,r.prototype._jump=function(t,e,r,i){var n=this.grid,o=t-r,s=e-i;if(!n.isWalkableAt(t,e))return null;if(this.trackJumpRecursion===!0&&(n.getNodeAt(t,e).tested=!0),n.getNodeAt(t,e)===this.endNode)return[t,e];if(0!==o){if(n.isWalkableAt(t,e-1)&&!n.isWalkableAt(t-o,e-1)||n.isWalkableAt(t,e+1)&&!n.isWalkableAt(t-o,e+1))return[t,e]}else{if(0===s)throw new Error("Only horizontal and vertical movements are allowed");if(n.isWalkableAt(t-1,e)&&!n.isWalkableAt(t-1,e-s)||n.isWalkableAt(t+1,e)&&!n.isWalkableAt(t+1,e-s))return[t,e];if(this._jump(t+1,e,t,e)||this._jump(t-1,e,t,e))return[t,e]}return this._jump(t+o,e+s,t,e)},r.prototype._findNeighbors=function(t){var e,r,i,n,o,s,a,u,h=t.parent,l=t.x,p=t.y,c=this.grid,f=[];if(h)e=h.x,r=h.y,i=(l-e)/Math.max(Math.abs(l-e),1),n=(p-r)/Math.max(Math.abs(p-r),1),0!==i?(c.isWalkableAt(l,p-1)&&f.push([l,p-1]),c.isWalkableAt(l,p+1)&&f.push([l,p+1]),c.isWalkableAt(l+i,p)&&f.push([l+i,p])):0!==n&&(c.isWalkableAt(l-1,p)&&f.push([l-1,p]),c.isWalkableAt(l+1,p)&&f.push([l+1,p]),c.isWalkableAt(l,p+n)&&f.push([l,p+n]));else for(o=c.getNeighbors(t,!1),a=0,u=o.length;u>a;++a)s=o[a],f.push([s.x,s.y]);return f},e.exports=r},{"../core/Heuristic":5,"./JumpPointFinder":17}],19:[function(t,e){function r(t){t=t||{},this.allowDiagonal=t.allowDiagonal,this.dontCrossCorners=t.dontCrossCorners,this.heuristic=t.heuristic||o.manhattan}var i=t("heap"),n=t("../core/Util"),o=t("../core/Heuristic");r.prototype.findPath=function(t,e,r,o,s){var a,u,h,l,p,c,f,d,g=new i(function(t,e){return t.f-e.f}),b=s.getNodeAt(t,e),y=s.getNodeAt(r,o),A=this.heuristic,k=this.allowDiagonal,m=this.dontCrossCorners,v=Math.abs,w=Math.SQRT2;for(b.g=0,b.f=0,g.push(b),b.opened=!0;!g.empty();){if(a=g.pop(),a.closed=!0,a===y)return n.backtrace(y);u=s.getNeighbors(a,k,m);var x=u.length;for(l=0,p=u.length;p>l;++l)h=u[l],h.closed||(c=h.x,f=h.y,d=a.g+(0===c-a.x||0===f-a.y?1:w),(!h.opened||d<h.g)&&(h.g=d*x/9,h.h=h.h||A(v(c-r),v(f-o)),h.f=h.g+h.h,h.parent=a,h.opened?g.updateItem(h):(g.push(h),h.opened=!0)))}return[]},e.exports=r},{"../core/Heuristic":5,"../core/Util":7,heap:1}]},{},[3])(3)});
}).call(this,typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
'use strict';

window.Settings = {};
window.QueryString = function() {
  // This function is anonymous, is executed immediately and 
  // the return value is assigned to QueryString!
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    // If first entry with this name
    if (typeof query_string[pair[0]] === "undefined") {
      query_string[pair[0]] = pair[1];
      // If second entry with this name
    } else if (typeof query_string[pair[0]] === "string") {
      var arr = [query_string[pair[0]], pair[1]];
      query_string[pair[0]] = arr;
      // If third or later entry with this name
    } else {
      query_string[pair[0]].push(pair[1]);
    }
  }
  return query_string;
}();

var Game = require('./core/game.js');

Settings = {
  tick: 200, // max ticks per second
  size: Math.ceil(window.innerWidth / 80), // size in pixels of block
  maxSize: 8,
  width: 80, // size in pixels of width
  height: 45, // size in pixels of height
};

Settings.updateSize = function() {
  Settings.size = Math.ceil(window.innerWidth / 80);
  Game.canvas.width = Settings.size * Settings.width;
  Game.canvas.height = Settings.size * Settings.height;
  console.log('Size updated...', Settings.size);
};

window.document.title += ' ' + Settings.seed;
console.log('%c%c background: #222; color: #bada55', 'background: #222; color: #bada55');

// Start Game
Game.start();
},{"./core/game.js":4}],3:[function(require,module,exports){
'use strict';

var Entity = {};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// @ENTITY_MAIN
Entity.createNew = function(data, pos, cb) {
  var id = Object.keys(Game.entityMap).length;
  var x = pos[0],
    y = pos[1];

  if (Game.map[x][y] === -1) {
    data.coordinates = [x, y];
    Game.entityMap[id] = data;
    Game.map[x][y] = id;
    return cb(id);
  } else {
    return cb(false);
  }
};

Entity.remove = function(pos) {
  var x = pos[0],
    y = pos[1];

  if (Game.map[x][y] !== -1) {
    var id = Game.map[x][y];
    console.log('removed', id, [x, y]);
    Game.entityMap[id] = {
      deleted: true
    };
    Game.map[x][y] = -1;
  }
};

Entity.spawn = function(type, data) {
  data = data || {};
  var spawned = 0;

  function increase(success) {
    if (success) spawned += 1;
  }
  while (spawned < 1) {
    var x = getRandomInt(0, 80 - 1),
      y = getRandomInt(0, 45 - 1);
    Entity.createNew({
      type: type,
      data: data
    }, [x, y], increase);
  }
};

Entity.populate = function(type, data, limit) {
  var spawned = 0;

  function increase(success) {
    if (success) spawned += 1;
  }
  while (spawned < limit) {
    var x = getRandomInt(0, 80 - 1),
      y = getRandomInt(0, 45 - 1);
    Entity.createNew({
      type: type,
      data: data
    }, [x, y], increase);
  }
};

// Entity movement
Entity.MoveLeft = function(id) {
  this.MoveEntity(-1, 0, id);
};

Entity.MoveUp = function(id) {
  this.MoveEntity(0, -1, id);
};

Entity.MoveRight = function(id) {
  this.MoveEntity(1, 0, id);
};

Entity.MoveDown = function(id) {
  this.MoveEntity(0, 1, id);
};

Entity.MoveEntity = function(dirX, dirY, id) {
  if (Game._interval && Game.status !== 'paused') {
    var that = Game.entityMap[id];
    var cord = that.coordinates;

    Game.map[cord[0]][cord[1]] = -1;
    var next = Game.map[cord[0] + dirX][cord[1] + dirY];
    console.log(next, Game.entityMap[next]);
    console.log(cord);
    // Check collision
    if (0 <= cord[0] + dirX && 0 <= cord[1] + dirY) {
      if (next === -1 || Game.entityMap[next].type !== 'block') {
        next = id;
        that.coordinates = [cord[0] + dirX, cord[1] + dirY];
      }
    }
  }
};

module.exports = Entity;
},{}],4:[function(require,module,exports){
'use strict';

window.Game = {};

var Map = require('./map.js'),
  Entity = require('./entities.js'),
  Input = require('../input/keypress.js'),
  Pathfinding = require('../ai/pathfinding.js'),
  seedrandom = require('./seedrandom.js');

Game = {
  map: [],
  entityMap: {},
  version: 2,
  state: 'paused',
  seed: Math.ceil(Math.random() * Date.now()).toString(36).substring(0, 8),
  selected: 'block',
  input: new window.keypress.Listener()
};

// Game.seed = 'trevor';

Game.init = function() {
  // Game = this.readCookie('save');
  this.loops = 0;

  var listener = Game.input;
  var finder = new Pathfinding.AStarFinder();

  listener.simple_combo("shift d", function() {
    gui.Window.get().showDevTools();
  });
  listener.simple_combo("shift r", function() {
    // run pathfinding
    var grid = new Pathfinding.Grid(Settings.width, Settings.height)
    var path = finder.findPath(1, 2, 4, 2, grid);
    for (var coords in path) {
      console.log(path[coords]);
    }
  });
  listener.simple_combo("shift s", function() {
    var state = document.getElementById('stats').style.display;
    console.log(state);
    if (!state || state === "none") {
      document.getElementById('stats').style.display = "block";
    } else {
      document.getElementById('stats').style.display = "none";
    }
  });

  seedrandom(this.seed, {
    global: true
  });
  if (Settings.size > Settings.maxSize) {
    Settings.size = Settings.maxSize;
  }

  Game.canvas = document.getElementById("game");
  Game.canvas.width = Settings.size * Settings.width;
  Game.canvas.height = Settings.size * Settings.height;
  Game.ctx = Game.canvas.getContext("2d");

  // Game.canvas.addEventListener("mouseup", getPosition, false);
  // Game.canvas.addEventListener("mousemove", getPosition, false);
  Game.canvas.addEventListener("mousedown", function(e) {
    e.preventDefault();
    var pos = getPosition(e);
    Entity.createNew({
      "type": Game.selected,
      "data": {},
      "coordinates": pos
    }, pos, function(status) {
      if (status) {
        console.log("created", status, pos);
      } else {
        console.log("unable to create");
      }
    });
  }, false);

  Game.canvas.oncontextmenu = function(e) {
    e.preventDefault();
    var pos = getPosition(e);
    var x = pos[0];
    var y = pos[1];
    Entity.remove([x, y]);
  };

  function getPosition(e) {
    var x = e.x,
      y = e.y;

    x -= Game.canvas.offsetLeft;
    y -= Game.canvas.offsetTop;

    var pos = [Math.floor(x / Settings.size), Math.floor(y / Settings.size)];
    console.log(e.type, [x, y], pos);
    return pos;
  }

  $(document).keydown(function(event) {
    switch (event.keyCode) {
      case 37:
        Entity.MoveLeft(0);
        break;
      case 38:
        Entity.MoveUp(0);
        break;
      case 39:
        Entity.MoveRight(0);
        break;
      case 40:
        Entity.MoveDown(0);
        break;
    }
  });

  Map.init();

  Entity.spawn('player');
  // Entity.populate('liquid', {}, 10);
  Entity.populate('beast', {}, 1);
  // Entity.populate('npc', {}, 15);
  Entity.populate('block', {}, 100);

  console.log('Game initialized...');
};

Game.update = function() {
  window.stats.update();
};

Game.draw = function() {
  var ids = Object.keys(Game.entityMap).length;
  var size = Settings.size;
  Game.canvas.width = Game.canvas.width;
  for (var i = 0; i < ids; i++) {
    var that = Game.entityMap[i];
    if (!that.deleted) {
      var x = that.coordinates[0];
      var y = that.coordinates[1];
      var type = that.type;
      switch (type) {
        case 'player':
          Game.ctx.fillStyle = "rgba(255,255, 255, 1)";
          break;
        case 'npc':
          Game.ctx.fillStyle = "rgba(0, 255, 0, 1)";
          break;
        case 'beast':
          Game.ctx.fillStyle = "rgba(255, 0, 0, 1)";
          break;
        case 'liquid':
          Game.ctx.fillStyle = "rgba(0, 0, 255, 1)";
          break;
        default:
          Game.ctx.fillStyle = "rgba(128, 128, 128, 1)";
      }
      Game.ctx.fillRect(x * size, y * size, 1 * size, 1 * size);
    }
  }
};

Game.pause = function() {
  Game.state = 'paused';
  console.log(Game.state);
  clearInterval(Game._interval);
};

Game.resume = function() {
  Game.state = 'running';
  console.log(Game.state);
  Game._interval = setInterval(Game.run, 1000 / Settings.tick);
};

Game.start = function() {
  Game.state = 'running';
  console.log(Game.state);
  Game._interval = setInterval(Game.run, 1000 / Settings.tick);
};

Game.clearScreen = function() {
  Game.canvas.width = Game.canvas.width;
  clearInterval(Game._interval);
  Game.map = [];
  Game.entityMap = {};
};

Game.reset = function() {
  Game.canvas.width = Game.canvas.width;
  Game.map = [];
  Game.entityMap = {};
  Game.start();
};

Game.run = function() {
  if (Game.map.length) {
    Game.update();
    Game.draw();
  } else {
    Game.init();
  }
};

module.exports = Game;
},{"../ai/pathfinding.js":1,"../input/keypress.js":7,"./entities.js":3,"./map.js":5,"./seedrandom.js":6}],5:[function(require,module,exports){
'use strict';

var Map = function() {
  this.initialized = false;
};

Map.prototype = {
  init: function() {
    for (var x = 0; x <= 80 - 1; x++) {
      var row = [];
      for (var y = 0; y <= 45 - 1; y++) {
        row.push(-1);
      }
      Game.map.push(row);
    }
    this.initialized = true;
    console.log('Map initialized...');
  },
  span: function(direction, length) {
    var map = Game.map;
    switch (direction) {
      case 'up':
        direction = [0, -length];
        break;
      case 'down':
        direction = [0, length];
        break;
      case 'left':
        direction = [-length, 0];
        break;
      case 'right':
        direction = [length, 0];
        break;
    }
    console.log(direction);
  }
};

module.exports = new Map();
},{}],6:[function(require,module,exports){
/**

seedrandom.js
=============

Seeded random number generator for Javascript.

version 2.3.6<br>
Author: David Bau<br>
Date: 2014 May 14

Can be used as a plain script, a node.js module or an AMD module.

Script tag usage
----------------

<script src=//cdnjs.cloudflare.com/ajax/libs/seedrandom/2.3.6/seedrandom.min.js>
</script>

// Sets Math.random to a PRNG initialized using the given explicit seed.
Math.seedrandom('hello.');
console.log(Math.random());          // Always 0.9282578795792454
console.log(Math.random());          // Always 0.3752569768646784

// Sets Math.random to an ARC4-based PRNG that is autoseeded using the
// current time, dom state, and other accumulated local entropy.
// The generated seed string is returned.
Math.seedrandom();
console.log(Math.random());          // Reasonably unpredictable.

// Seeds using the given explicit seed mixed with accumulated entropy.
Math.seedrandom('added entropy.', { entropy: true });
console.log(Math.random());          // As unpredictable as added entropy.

// Use "new" to create a local prng without altering Math.random.
var myrng = new Math.seedrandom('hello.');
console.log(myrng());                // Always 0.9282578795792454


Node.js usage
-------------

npm install seedrandom

// Local PRNG: does not affect Math.random.
var seedrandom = require('seedrandom');
var rng = seedrandom('hello.');
console.log(rng());                  // Always 0.9282578795792454

// Autoseeded ARC4-based PRNG.
rng = seedrandom();
console.log(rng());                  // Reasonably unpredictable.

// Global PRNG: set Math.random.
seedrandom('hello.', { global: true });
console.log(Math.random());          // Always 0.9282578795792454

// Mixing accumulated entropy.
rng = seedrandom('added entropy.', { entropy: true });
console.log(rng());                  // As unpredictable as added entropy.


Require.js usage
----------------

Similar to node.js usage:

bower install seedrandom

require(['seedrandom'], function(seedrandom) {
  var rng = seedrandom('hello.');
  console.log(rng());                  // Always 0.9282578795792454
});


Network seeding via a script tag
--------------------------------

<script src=//cdnjs.cloudflare.com/ajax/libs/seedrandom/2.3.6/seedrandom.min.js>
</script>
<!-- Seeds using urandom bits from a server. -->
<script src=//jsonlib.appspot.com/urandom?callback=Math.seedrandom">
</script>

Examples of manipulating the seed for various purposes:

var seed = Math.seedrandom();        // Use prng with an automatic seed.
document.write(Math.random());       // Pretty much unpredictable x.

var rng = new Math.seedrandom(seed); // A new prng with the same seed.
document.write(rng());               // Repeat the 'unpredictable' x.

function reseed(event, count) {      // Define a custom entropy collector.
  var t = [];
  function w(e) {
    t.push([e.pageX, e.pageY, +new Date]);
    if (t.length < count) { return; }
    document.removeEventListener(event, w);
    Math.seedrandom(t, { entropy: true });
  }
  document.addEventListener(event, w);
}
reseed('mousemove', 100);            // Reseed after 100 mouse moves.

The "pass" option can be used to get both the prng and the seed.
The following returns both an autoseeded prng and the seed as an object,
without mutating Math.random:

var obj = Math.seedrandom(null, { pass: function(prng, seed) {
  return { random: prng, seed: seed };
}});


Version notes
-------------

The random number sequence is the same as version 1.0 for string seeds.
* Version 2.0 changed the sequence for non-string seeds.
* Version 2.1 speeds seeding and uses window.crypto to autoseed if present.
* Version 2.2 alters non-crypto autoseeding to sweep up entropy from plugins.
* Version 2.3 adds support for "new", module loading, and a null seed arg.
* Version 2.3.1 adds a build environment, module packaging, and tests.
* Version 2.3.4 fixes bugs on IE8, and switches to MIT license.
* Version 2.3.6 adds a readable options object argument.

The standard ARC4 key scheduler cycles short keys, which means that
seedrandom('ab') is equivalent to seedrandom('abab') and 'ababab'.
Therefore it is a good idea to add a terminator to avoid trivial
equivalences on short string seeds, e.g., Math.seedrandom(str + '\0').
Starting with version 2.0, a terminator is added automatically for
non-string seeds, so seeding with the number 111 is the same as seeding
with '111\0'.

When seedrandom() is called with zero args or a null seed, it uses a
seed drawn from the browser crypto object if present.  If there is no
crypto support, seedrandom() uses the current time, the native rng,
and a walk of several DOM objects to collect a few bits of entropy.

Each time the one- or two-argument forms of seedrandom are called,
entropy from the passed seed is accumulated in a pool to help generate
future seeds for the zero- and two-argument forms of seedrandom.

On speed - This javascript implementation of Math.random() is several
times slower than the built-in Math.random() because it is not native
code, but that is typically fast enough.  Some details (timings on
Chrome 25 on a 2010 vintage macbook):

* seeded Math.random()          - avg less than 0.0002 milliseconds per call
* seedrandom('explicit.')       - avg less than 0.2 milliseconds per call
* seedrandom('explicit.', true) - avg less than 0.2 milliseconds per call
* seedrandom() with crypto      - avg less than 0.2 milliseconds per call

Autoseeding without crypto is somewhat slower, about 20-30 milliseconds on
a 2012 windows 7 1.5ghz i5 laptop, as seen on Firefox 19, IE 10, and Opera.
Seeded rng calls themselves are fast across these browsers, with slowest
numbers on Opera at about 0.0005 ms per seeded Math.random().


LICENSE (MIT)
-------------

Copyright (c)2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

/**
 * All code is in an anonymous closure to keep the global namespace clean.
 */
(function (
    global, pool, math, width, chunks, digits, module, define, rngname) {

//
// The following constants are related to IEEE 754 limits.
//
var startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,

//
// seedrandom()
// This is the seedrandom function described above.
//
impl = math['seed' + rngname] = function(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      // If called as a method of Math (Math.seedrandom()), mutate Math.random
      // because that is how seedrandom.js has worked since v1.0.  Otherwise,
      // it is a newer calling convention, so return the prng directly.
      function(prng, seed, is_math_call) {
        if (is_math_call) { math[rngname] = prng; return seed; }
        else return prng;
      })(

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  }, shortseed, 'global' in options ? options.global : (this == math));
};

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
/** @constructor */
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability discard an initial batch of values.
    // See http://www.rsa.com/rsalabs/node.asp?id=2009
  })(width);
}

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto if available.
//
/** @param {Uint8Array|Navigator=} seed */
function autoseed(seed) {
  try {
    global.crypto.getRandomValues(seed = new Uint8Array(width));
    return tostring(seed);
  } catch (e) {
    return [+new Date, global, (seed = global.navigator) && seed.plugins,
            global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to intefere with determinstic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math[rngname](), pool);

//
// Nodejs and AMD support: export the implemenation as a module using
// either convention.
//
if (module && module.exports) {
  module.exports = impl;
} else if (define && define.amd) {
  define(function() { return impl; });
}

// End anonymous scope, and pass initial values.
})(
  this,   // global window object
  [],     // pool: entropy pool starts empty
  Math,   // math: package containing random, pow, and seedrandom
  256,    // width: each RC4 output is 0 <= x < 256
  6,      // chunks: at least six RC4 outputs for each double
  52,     // digits: there are 52 significant digits in a double
  (typeof module) == 'object' && module,    // present in node.js
  (typeof define) == 'function' && define,  // present with an AMD loader
  'random'// rngname: name for Math.random and Math.seedrandom
);

},{}],7:[function(require,module,exports){
// Generated by CoffeeScript 1.7.1

/*
Copyright 2014 David Mauro

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Keypress is a robust keyboard input capturing Javascript utility
focused on input for games.

version 2.0.1
 */


/*
Combo options available and their defaults:
    keys            : []            - An array of the keys pressed together to activate combo.
    count           : 0             - The number of times a counting combo has been pressed. Reset on release.
    is_unordered    : false         - Unless this is set to true, the keys can be pressed down in any order.
    is_counting     : false         - Makes this a counting combo (see documentation).
    is_exclusive    : false         - This combo will replace other exclusive combos when true.
    is_solitary     : false         - This combo will only fire if ONLY it's keys are pressed down.
    is_sequence     : false         - Rather than a key combo, this is an ordered key sequence.
    prevent_default : false         - Prevent default behavior for all component key keypresses.
    prevent_repeat  : false         - Prevent the combo from repeating when keydown is held.
    on_keydown      : null          - A function that is called when the combo is pressed.
    on_keyup        : null          - A function that is called when the combo is released.
    on_release      : null          - A function that is called when all keys in the combo are released.
    this            : undefined     - Defines the scope for your callback functions.
 */

(function() {
  var Combo, keypress, _change_keycodes_by_browser, _compare_arrays, _compare_arrays_sorted, _convert_key_to_readable, _convert_to_shifted_key, _decide_meta_key, _factory_defaults, _filter_array, _is_array_in_array, _is_array_in_array_sorted, _key_is_valid, _keycode_alternate_names, _keycode_dictionary, _keycode_shifted_keys, _log_error, _metakey, _modifier_event_mapping, _modifier_keys, _validate_combo,
    __hasProp = {}.hasOwnProperty,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _factory_defaults = {
    is_unordered: false,
    is_counting: false,
    is_exclusive: false,
    is_solitary: false,
    prevent_default: false,
    prevent_repeat: false
  };

  _modifier_keys = ["meta", "alt", "option", "ctrl", "shift", "cmd"];

  _metakey = "ctrl";

  keypress = {};

  keypress.debug = false;

  Combo = (function() {
    function Combo(dictionary) {
      var property, value;
      for (property in dictionary) {
        if (!__hasProp.call(dictionary, property)) continue;
        value = dictionary[property];
        if (value !== false) {
          this[property] = value;
        }
      }
      this.keys = this.keys || [];
      this.count = this.count || 0;
    }

    Combo.prototype.allows_key_repeat = function() {
      return !this.prevent_repeat && typeof this.on_keydown === "function";
    };

    Combo.prototype.reset = function() {
      this.count = 0;
      return this.keyup_fired = null;
    };

    return Combo;

  })();

  keypress.Listener = (function() {
    function Listener(element, defaults) {
      var attach_handler, property, value;
      this.should_suppress_event_defaults = false;
      this.should_force_event_defaults = false;
      this.sequence_delay = 800;
      this._registered_combos = [];
      this._keys_down = [];
      this._active_combos = [];
      this._sequence = [];
      this._sequence_timer = null;
      this._prevent_capture = false;
      this._defaults = defaults || {};
      for (property in _factory_defaults) {
        if (!__hasProp.call(_factory_defaults, property)) continue;
        value = _factory_defaults[property];
        this._defaults[property] = this._defaults[property] || value;
      }
      element = element || document.body;
      attach_handler = function(target, event, handler) {
        if (target.addEventListener) {
          return target.addEventListener(event, handler);
        } else if (target.attachEvent) {
          return target.attachEvent("on" + event, handler);
        }
      };
      attach_handler(element, "keydown", (function(_this) {
        return function(e) {
          e = e || window.event;
          _this._receive_input(e, true);
          return _this._bug_catcher(e);
        };
      })(this));
      attach_handler(element, "keyup", (function(_this) {
        return function(e) {
          e = e || window.event;
          return _this._receive_input(e, false);
        };
      })(this));
      attach_handler(window, "blur", (function(_this) {
        return function() {
          var key, _i, _len, _ref;
          _ref = _this._keys_down;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            key = _ref[_i];
            _this._key_up(key, {});
          }
          return _this._keys_down = [];
        };
      })(this));
    }

    Listener.prototype._bug_catcher = function(e) {
      var _ref;
      if (_metakey === "cmd" && __indexOf.call(this._keys_down, "cmd") >= 0 && ((_ref = _convert_key_to_readable(e.keyCode)) !== "cmd" && _ref !== "shift" && _ref !== "alt" && _ref !== "caps" && _ref !== "tab")) {
        return this._receive_input(e, false);
      }
    };

    Listener.prototype._cmd_bug_check = function(combo_keys) {
      if (_metakey === "cmd" && __indexOf.call(this._keys_down, "cmd") >= 0 && __indexOf.call(combo_keys, "cmd") < 0) {
        return false;
      }
      return true;
    };

    Listener.prototype._prevent_default = function(e, should_prevent) {
      if ((should_prevent || this.should_suppress_event_defaults) && !this.should_force_event_defaults) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
        if (e.stopPropagation) {
          return e.stopPropagation();
        }
      }
    };

    Listener.prototype._get_active_combos = function(key) {
      var active_combos, keys_down;
      active_combos = [];
      keys_down = _filter_array(this._keys_down, function(down_key) {
        return down_key !== key;
      });
      keys_down.push(key);
      this._match_combo_arrays(keys_down, (function(_this) {
        return function(match) {
          if (_this._cmd_bug_check(match.keys)) {
            return active_combos.push(match);
          }
        };
      })(this));
      this._fuzzy_match_combo_arrays(keys_down, (function(_this) {
        return function(match) {
          if (__indexOf.call(active_combos, match) >= 0) {
            return;
          }
          if (!(match.is_solitary || !_this._cmd_bug_check(match.keys))) {
            return active_combos.push(match);
          }
        };
      })(this));
      return active_combos;
    };

    Listener.prototype._get_potential_combos = function(key) {
      var combo, potentials, _i, _len, _ref;
      potentials = [];
      _ref = this._registered_combos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        combo = _ref[_i];
        if (combo.is_sequence) {
          continue;
        }
        if (__indexOf.call(combo.keys, key) >= 0 && this._cmd_bug_check(combo.keys)) {
          potentials.push(combo);
        }
      }
      return potentials;
    };

    Listener.prototype._add_to_active_combos = function(combo) {
      var active_combo, active_key, active_keys, already_replaced, combo_key, i, should_prepend, should_replace, _i, _j, _k, _len, _len1, _ref, _ref1;
      should_replace = false;
      should_prepend = true;
      already_replaced = false;
      if (__indexOf.call(this._active_combos, combo) >= 0) {
        return true;
      } else if (this._active_combos.length) {
        for (i = _i = 0, _ref = this._active_combos.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
          active_combo = this._active_combos[i];
          if (!(active_combo && active_combo.is_exclusive && combo.is_exclusive)) {
            continue;
          }
          active_keys = active_combo.keys;
          if (!should_replace) {
            for (_j = 0, _len = active_keys.length; _j < _len; _j++) {
              active_key = active_keys[_j];
              should_replace = true;
              if (__indexOf.call(combo.keys, active_key) < 0) {
                should_replace = false;
                break;
              }
            }
          }
          if (should_prepend && !should_replace) {
            _ref1 = combo.keys;
            for (_k = 0, _len1 = _ref1.length; _k < _len1; _k++) {
              combo_key = _ref1[_k];
              should_prepend = false;
              if (__indexOf.call(active_keys, combo_key) < 0) {
                should_prepend = true;
                break;
              }
            }
          }
          if (should_replace) {
            if (already_replaced) {
              active_combo = this._active_combos.splice(i, 1)[0];
              if (active_combo != null) {
                active_combo.reset();
              }
            } else {
              active_combo = this._active_combos.splice(i, 1, combo)[0];
              if (active_combo != null) {
                active_combo.reset();
              }
              already_replaced = true;
            }
            should_prepend = false;
          }
        }
      }
      if (should_prepend) {
        this._active_combos.unshift(combo);
      }
      return should_replace || should_prepend;
    };

    Listener.prototype._remove_from_active_combos = function(combo) {
      var active_combo, i, _i, _ref;
      for (i = _i = 0, _ref = this._active_combos.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        active_combo = this._active_combos[i];
        if (active_combo === combo) {
          combo = this._active_combos.splice(i, 1)[0];
          combo.reset();
          break;
        }
      }
    };

    Listener.prototype._get_possible_sequences = function() {
      var combo, i, j, match, matches, sequence, _i, _j, _k, _len, _ref, _ref1, _ref2;
      matches = [];
      _ref = this._registered_combos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        combo = _ref[_i];
        for (j = _j = 1, _ref1 = this._sequence.length; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 1 <= _ref1 ? ++_j : --_j) {
          sequence = this._sequence.slice(-j);
          if (!combo.is_sequence) {
            continue;
          }
          if (__indexOf.call(combo.keys, "shift") < 0) {
            sequence = _filter_array(sequence, function(key) {
              return key !== "shift";
            });
            if (!sequence.length) {
              continue;
            }
          }
          for (i = _k = 0, _ref2 = sequence.length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
            if (combo.keys[i] === sequence[i]) {
              match = true;
            } else {
              match = false;
              break;
            }
          }
          if (match) {
            matches.push(combo);
          }
        }
      }
      return matches;
    };

    Listener.prototype._add_key_to_sequence = function(key, e) {
      var combo, sequence_combos, _i, _len;
      this._sequence.push(key);
      sequence_combos = this._get_possible_sequences();
      if (sequence_combos.length) {
        for (_i = 0, _len = sequence_combos.length; _i < _len; _i++) {
          combo = sequence_combos[_i];
          this._prevent_default(e, combo.prevent_default);
        }
        if (this._sequence_timer) {
          clearTimeout(this._sequence_timer);
        }
        if (this.sequence_delay > -1) {
          this._sequence_timer = setTimeout(function() {
            return this._sequence = [];
          }, this.sequence_delay);
        }
      } else {
        this._sequence = [];
      }
    };

    Listener.prototype._get_sequence = function(key) {
      var combo, i, j, match, seq_key, sequence, _i, _j, _k, _len, _ref, _ref1, _ref2;
      _ref = this._registered_combos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        combo = _ref[_i];
        if (!combo.is_sequence) {
          continue;
        }
        for (j = _j = 1, _ref1 = this._sequence.length; 1 <= _ref1 ? _j <= _ref1 : _j >= _ref1; j = 1 <= _ref1 ? ++_j : --_j) {
          sequence = (_filter_array(this._sequence, function(seq_key) {
            if (__indexOf.call(combo.keys, "shift") >= 0) {
              return true;
            }
            return seq_key !== "shift";
          })).slice(-j);
          if (combo.keys.length !== sequence.length) {
            continue;
          }
          for (i = _k = 0, _ref2 = sequence.length; 0 <= _ref2 ? _k < _ref2 : _k > _ref2; i = 0 <= _ref2 ? ++_k : --_k) {
            seq_key = sequence[i];
            if (__indexOf.call(combo.keys, "shift") < 0) {
              if (seq_key === "shift") {
                continue;
              }
            }
            if (key === "shift" && __indexOf.call(combo.keys, "shift") < 0) {
              continue;
            }
            if (combo.keys[i] === seq_key) {
              match = true;
            } else {
              match = false;
              break;
            }
          }
        }
        if (match) {
          return combo;
        }
      }
      return false;
    };

    Listener.prototype._receive_input = function(e, is_keydown) {
      var key;
      if (this._prevent_capture) {
        if (this._keys_down.length) {
          this._keys_down = [];
        }
        return;
      }
      key = _convert_key_to_readable(e.keyCode);
      if (!is_keydown && !this._keys_down.length && (key === "alt" || key === _metakey)) {
        return;
      }
      if (!key) {
        return;
      }
      if (is_keydown) {
        return this._key_down(key, e);
      } else {
        return this._key_up(key, e);
      }
    };

    Listener.prototype._fire = function(event, combo, key_event, is_autorepeat) {
      if (typeof combo["on_" + event] === "function") {
        this._prevent_default(key_event, combo["on_" + event].call(combo["this"], key_event, combo.count, is_autorepeat) !== true);
      }
      if (event === "release") {
        combo.count = 0;
      }
      if (event === "keyup") {
        return combo.keyup_fired = true;
      }
    };

    Listener.prototype._match_combo_arrays = function(potential_match, match_handler) {
      var source_combo, _i, _len, _ref;
      _ref = this._registered_combos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        source_combo = _ref[_i];
        if ((!source_combo.is_unordered && _compare_arrays_sorted(potential_match, source_combo.keys)) || (source_combo.is_unordered && _compare_arrays(potential_match, source_combo.keys))) {
          match_handler(source_combo);
        }
      }
    };

    Listener.prototype._fuzzy_match_combo_arrays = function(potential_match, match_handler) {
      var source_combo, _i, _len, _ref;
      _ref = this._registered_combos;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        source_combo = _ref[_i];
        if ((!source_combo.is_unordered && _is_array_in_array_sorted(source_combo.keys, potential_match)) || (source_combo.is_unordered && _is_array_in_array(source_combo.keys, potential_match))) {
          match_handler(source_combo);
        }
      }
    };

    Listener.prototype._keys_remain = function(combo) {
      var key, keys_remain, _i, _len, _ref;
      _ref = combo.keys;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        key = _ref[_i];
        if (__indexOf.call(this._keys_down, key) >= 0) {
          keys_remain = true;
          break;
        }
      }
      return keys_remain;
    };

    Listener.prototype._key_down = function(key, e) {
      var combo, combos, event_mod, i, mod, potential, potential_combos, sequence_combo, shifted_key, _i, _j, _k, _len, _len1, _ref;
      shifted_key = _convert_to_shifted_key(key, e);
      if (shifted_key) {
        key = shifted_key;
      }
      this._add_key_to_sequence(key, e);
      sequence_combo = this._get_sequence(key);
      if (sequence_combo) {
        this._fire("keydown", sequence_combo, e);
      }
      for (mod in _modifier_event_mapping) {
        event_mod = _modifier_event_mapping[mod];
        if (!e[event_mod]) {
          continue;
        }
        if (mod === key || __indexOf.call(this._keys_down, mod) >= 0) {
          continue;
        }
        this._keys_down.push(mod);
      }
      for (mod in _modifier_event_mapping) {
        event_mod = _modifier_event_mapping[mod];
        if (mod === key) {
          continue;
        }
        if (__indexOf.call(this._keys_down, mod) >= 0 && !e[event_mod]) {
          if (mod === "cmd" && _metakey !== "cmd") {
            continue;
          }
          for (i = _i = 0, _ref = this._keys_down.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            if (this._keys_down[i] === mod) {
              this._keys_down.splice(i, 1);
            }
          }
        }
      }
      combos = this._get_active_combos(key);
      potential_combos = this._get_potential_combos(key);
      for (_j = 0, _len = combos.length; _j < _len; _j++) {
        combo = combos[_j];
        this._handle_combo_down(combo, potential_combos, key, e);
      }
      if (potential_combos.length) {
        for (_k = 0, _len1 = potential_combos.length; _k < _len1; _k++) {
          potential = potential_combos[_k];
          this._prevent_default(e, potential.prevent_default);
        }
      }
      if (__indexOf.call(this._keys_down, key) < 0) {
        this._keys_down.push(key);
      }
    };

    Listener.prototype._handle_combo_down = function(combo, potential_combos, key, e) {
      var is_autorepeat, is_other_exclusive, potential_combo, result, _i, _len;
      if (__indexOf.call(combo.keys, key) < 0) {
        return false;
      }
      this._prevent_default(e, combo && combo.prevent_default);
      is_autorepeat = false;
      if (__indexOf.call(this._keys_down, key) >= 0) {
        is_autorepeat = true;
        if (!combo.allows_key_repeat()) {
          return false;
        }
      }
      result = this._add_to_active_combos(combo, key);
      combo.keyup_fired = false;
      is_other_exclusive = false;
      if (combo.is_exclusive) {
        for (_i = 0, _len = potential_combos.length; _i < _len; _i++) {
          potential_combo = potential_combos[_i];
          if (potential_combo.is_exclusive && potential_combo.keys.length > combo.keys.length) {
            is_other_exclusive = true;
            break;
          }
        }
      }
      if (!is_other_exclusive) {
        if (combo.is_counting && typeof combo.on_keydown === "function") {
          combo.count += 1;
        }
        if (result) {
          return this._fire("keydown", combo, e, is_autorepeat);
        }
      }
    };

    Listener.prototype._key_up = function(key, e) {
      var active_combo, active_combos_length, combo, combos, i, sequence_combo, shifted_key, unshifted_key, _i, _j, _k, _l, _len, _len1, _len2, _ref, _ref1, _ref2, _ref3;
      unshifted_key = key;
      shifted_key = _convert_to_shifted_key(key, e);
      if (shifted_key) {
        key = shifted_key;
      }
      shifted_key = _keycode_shifted_keys[unshifted_key];
      if (e.shiftKey) {
        if (!(shifted_key && __indexOf.call(this._keys_down, shifted_key) >= 0)) {
          key = unshifted_key;
        }
      } else {
        if (!(unshifted_key && __indexOf.call(this._keys_down, unshifted_key) >= 0)) {
          key = shifted_key;
        }
      }
      sequence_combo = this._get_sequence(key);
      if (sequence_combo) {
        this._fire("keyup", sequence_combo, e);
      }
      if (__indexOf.call(this._keys_down, key) < 0) {
        return false;
      }
      for (i = _i = 0, _ref = this._keys_down.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if ((_ref1 = this._keys_down[i]) === key || _ref1 === shifted_key || _ref1 === unshifted_key) {
          this._keys_down.splice(i, 1);
          break;
        }
      }
      active_combos_length = this._active_combos.length;
      combos = [];
      _ref2 = this._active_combos;
      for (_j = 0, _len = _ref2.length; _j < _len; _j++) {
        active_combo = _ref2[_j];
        if (__indexOf.call(active_combo.keys, key) >= 0) {
          combos.push(active_combo);
        }
      }
      for (_k = 0, _len1 = combos.length; _k < _len1; _k++) {
        combo = combos[_k];
        this._handle_combo_up(combo, e, key);
      }
      if (active_combos_length > 1) {
        _ref3 = this._active_combos;
        for (_l = 0, _len2 = _ref3.length; _l < _len2; _l++) {
          active_combo = _ref3[_l];
          if (active_combo === void 0 || __indexOf.call(combos, active_combo) >= 0) {
            continue;
          }
          if (!this._keys_remain(active_combo)) {
            this._remove_from_active_combos(active_combo);
          }
        }
      }
    };

    Listener.prototype._handle_combo_up = function(combo, e, key) {
      var keys_down, keys_remaining;
      this._prevent_default(e, combo && combo.prevent_default);
      keys_remaining = this._keys_remain(combo);
      if (!combo.keyup_fired) {
        keys_down = this._keys_down.slice();
        keys_down.push(key);
        if (!combo.is_solitary || _compare_arrays(keys_down, combo.keys)) {
          this._fire("keyup", combo, e);
          if (combo.is_counting && typeof combo.on_keyup === "function" && typeof combo.on_keydown !== "function") {
            combo.count += 1;
          }
        }
      }
      if (!keys_remaining) {
        this._fire("release", combo, e);
        this._remove_from_active_combos(combo);
      }
    };

    Listener.prototype.simple_combo = function(keys, callback) {
      return this.register_combo({
        keys: keys,
        on_keydown: callback
      });
    };

    Listener.prototype.counting_combo = function(keys, count_callback) {
      return this.register_combo({
        keys: keys,
        is_counting: true,
        is_unordered: false,
        on_keydown: count_callback
      });
    };

    Listener.prototype.sequence_combo = function(keys, callback) {
      return this.register_combo({
        keys: keys,
        on_keydown: callback,
        is_sequence: true
      });
    };

    Listener.prototype.register_combo = function(combo_dictionary) {
      var combo, property, value, _ref;
      if (typeof combo_dictionary["keys"] === "string") {
        combo_dictionary["keys"] = combo_dictionary["keys"].split(" ");
      }
      _ref = this._defaults;
      for (property in _ref) {
        if (!__hasProp.call(_ref, property)) continue;
        value = _ref[property];
        if (combo_dictionary[property] === void 0) {
          combo_dictionary[property] = value;
        }
      }
      combo = new Combo(combo_dictionary);
      if (_validate_combo(combo)) {
        this._registered_combos.push(combo);
        return combo;
      }
    };

    Listener.prototype.register_many = function(combo_array) {
      var combo, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = combo_array.length; _i < _len; _i++) {
        combo = combo_array[_i];
        _results.push(this.register_combo(combo));
      }
      return _results;
    };

    Listener.prototype.unregister_combo = function(keys_or_combo) {
      var combo, unregister_combo, _i, _len, _ref;
      if (!keys_or_combo) {
        return false;
      }
      unregister_combo = (function(_this) {
        return function(combo) {
          var i, _i, _ref, _results;
          _results = [];
          for (i = _i = 0, _ref = _this._registered_combos.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            if (combo === _this._registered_combos[i]) {
              _this._registered_combos.splice(i, 1);
              break;
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        };
      })(this);
      if (keys_or_combo.keys) {
        return unregister_combo(keys_or_combo);
      } else {
        _ref = this._registered_combos;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          combo = _ref[_i];
          if (!combo) {
            continue;
          }
        }
        if (typeof keys_or_combo === "string") {
          keys_or_combo = keys_or_combo.split(" ");
        }
        if ((combo.is_unordered && _compare_arrays(keys_or_combo, combo.keys)) || (!combo.is_unordered && _compare_arrays_sorted(keys_or_combo, combo.keys))) {
          return unregister_combo(combo);
        }
      }
    };

    Listener.prototype.unregister_many = function(combo_array) {
      var combo, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = combo_array.length; _i < _len; _i++) {
        combo = combo_array[_i];
        _results.push(this.unregister_combo(combo));
      }
      return _results;
    };

    Listener.prototype.get_registered_combos = function() {
      return this._registered_combos;
    };

    Listener.prototype.reset = function() {
      return this._registered_combos = [];
    };

    Listener.prototype.listen = function() {
      return this._prevent_capture = false;
    };

    Listener.prototype.stop_listening = function() {
      return this._prevent_capture = true;
    };

    Listener.prototype.get_meta_key = function() {
      return _metakey;
    };

    return Listener;

  })();

  _decide_meta_key = function() {
    if (navigator.userAgent.indexOf("Mac OS X") !== -1) {
      _metakey = "cmd";
    }
  };

  _change_keycodes_by_browser = function() {
    if (navigator.userAgent.indexOf("Opera") !== -1) {
      _keycode_dictionary["17"] = "cmd";
    }
  };

  _convert_key_to_readable = function(k) {
    return _keycode_dictionary[k];
  };

  _filter_array = function(array, callback) {
    var element;
    if (array.filter) {
      return array.filter(callback);
    } else {
      return (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = array.length; _i < _len; _i++) {
          element = array[_i];
          if (callback(element)) {
            _results.push(element);
          }
        }
        return _results;
      })();
    }
  };

  _compare_arrays = function(a1, a2) {
    var item, _i, _len;
    if (a1.length !== a2.length) {
      return false;
    }
    for (_i = 0, _len = a1.length; _i < _len; _i++) {
      item = a1[_i];
      if (__indexOf.call(a2, item) >= 0) {
        continue;
      }
      return false;
    }
    return true;
  };

  _compare_arrays_sorted = function(a1, a2) {
    var i, _i, _ref;
    if (a1.length !== a2.length) {
      return false;
    }
    for (i = _i = 0, _ref = a1.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      if (a1[i] !== a2[i]) {
        return false;
      }
    }
    return true;
  };

  _is_array_in_array = function(a1, a2) {
    var item, _i, _len;
    for (_i = 0, _len = a1.length; _i < _len; _i++) {
      item = a1[_i];
      if (__indexOf.call(a2, item) < 0) {
        return false;
      }
    }
    return true;
  };

  _is_array_in_array_sorted = function(a1, a2) {
    var index, item, prev, _i, _len;
    prev = 0;
    for (_i = 0, _len = a1.length; _i < _len; _i++) {
      item = a1[_i];
      index = a2.indexOf(item);
      if (index >= prev) {
        prev = index;
      } else {
        return false;
      }
    }
    return true;
  };

  _log_error = function() {
    if (keypress.debug) {
      return console.log.apply(console, arguments);
    }
  };

  _key_is_valid = function(key) {
    var valid, valid_key, _;
    valid = false;
    for (_ in _keycode_dictionary) {
      valid_key = _keycode_dictionary[_];
      if (key === valid_key) {
        valid = true;
        break;
      }
    }
    if (!valid) {
      for (_ in _keycode_shifted_keys) {
        valid_key = _keycode_shifted_keys[_];
        if (key === valid_key) {
          valid = true;
          break;
        }
      }
    }
    return valid;
  };

  _validate_combo = function(combo) {
    var alt_name, i, key, mod_key, non_modifier_keys, property, validated, value, _i, _j, _k, _len, _len1, _ref, _ref1;
    validated = true;
    if (!combo.keys.length) {
      _log_error("You're trying to bind a combo with no keys:", combo);
    }
    for (i = _i = 0, _ref = combo.keys.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      key = combo.keys[i];
      alt_name = _keycode_alternate_names[key];
      if (alt_name) {
        key = combo.keys[i] = alt_name;
      }
      if (key === "meta") {
        combo.keys.splice(i, 1, _metakey);
      }
      if (key === "cmd") {
        _log_error("Warning: use the \"meta\" key rather than \"cmd\" for Windows compatibility");
      }
    }
    _ref1 = combo.keys;
    for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
      key = _ref1[_j];
      if (!_key_is_valid(key)) {
        _log_error("Do not recognize the key \"" + key + "\"");
        validated = false;
      }
    }
    if (__indexOf.call(combo.keys, "meta") >= 0 || __indexOf.call(combo.keys, "cmd") >= 0) {
      non_modifier_keys = combo.keys.slice();
      for (_k = 0, _len1 = _modifier_keys.length; _k < _len1; _k++) {
        mod_key = _modifier_keys[_k];
        if ((i = non_modifier_keys.indexOf(mod_key)) > -1) {
          non_modifier_keys.splice(i, 1);
        }
      }
      if (non_modifier_keys.length > 1) {
        _log_error("META and CMD key combos cannot have more than 1 non-modifier keys", combo, non_modifier_keys);
        validated = false;
      }
    }
    for (property in combo) {
      value = combo[property];
      if (_factory_defaults[property] === "undefined") {
        _log_error("The property " + property + " is not a valid combo property. Your combo has still been registered.");
      }
    }
    return validated;
  };

  _convert_to_shifted_key = function(key, e) {
    var k;
    if (!e.shiftKey) {
      return false;
    }
    k = _keycode_shifted_keys[key];
    if (k != null) {
      return k;
    }
    return false;
  };

  _modifier_event_mapping = {
    "cmd": "metaKey",
    "ctrl": "ctrlKey",
    "shift": "shiftKey",
    "alt": "altKey"
  };

  _keycode_alternate_names = {
    "escape": "esc",
    "control": "ctrl",
    "command": "cmd",
    "break": "pause",
    "windows": "cmd",
    "option": "alt",
    "caps_lock": "caps",
    "apostrophe": "\'",
    "semicolon": ";",
    "tilde": "~",
    "accent": "`",
    "scroll_lock": "scroll",
    "num_lock": "num"
  };

  _keycode_shifted_keys = {
    "/": "?",
    ".": ">",
    ",": "<",
    "\'": "\"",
    ";": ":",
    "[": "{",
    "]": "}",
    "\\": "|",
    "`": "~",
    "=": "+",
    "-": "_",
    "1": "!",
    "2": "@",
    "3": "#",
    "4": "$",
    "5": "%",
    "6": "^",
    "7": "&",
    "8": "*",
    "9": "(",
    "0": ")"
  };

  _keycode_dictionary = {
    0: "\\",
    8: "backspace",
    9: "tab",
    12: "num",
    13: "enter",
    16: "shift",
    17: "ctrl",
    18: "alt",
    19: "pause",
    20: "caps",
    27: "esc",
    32: "space",
    33: "pageup",
    34: "pagedown",
    35: "end",
    36: "home",
    37: "left",
    38: "up",
    39: "right",
    40: "down",
    44: "print",
    45: "insert",
    46: "delete",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
    91: "cmd",
    92: "cmd",
    93: "cmd",
    96: "num_0",
    97: "num_1",
    98: "num_2",
    99: "num_3",
    100: "num_4",
    101: "num_5",
    102: "num_6",
    103: "num_7",
    104: "num_8",
    105: "num_9",
    106: "num_multiply",
    107: "num_add",
    108: "num_enter",
    109: "num_subtract",
    110: "num_decimal",
    111: "num_divide",
    124: "print",
    144: "num",
    145: "scroll",
    186: ";",
    187: "=",
    188: ",",
    189: "-",
    190: ".",
    191: "/",
    192: "`",
    219: "[",
    220: "\\",
    221: "]",
    222: "\'",
    223: "`",
    224: "cmd",
    225: "alt",
    57392: "ctrl",
    63289: "num"
  };

  _decide_meta_key();

  _change_keycodes_by_browser();

  if (typeof define === "function" && define.amd) {
    define([], function() {
      return keypress;
    });
  } else {
    window.keypress = keypress;
  }

}).call(this);

},{}]},{},[2]);