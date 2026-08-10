(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:ee,getOwnPropertySymbols:te,getPrototypeOf:ne}=Object,f=globalThis,re=f.trustedTypes,ie=re?re.emptyScript:``,ae=f.reactiveElementPolyfillSupport,p=(e,t)=>e,m={toAttribute(e,t){switch(t){case Boolean:e=e?ie:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},oe=(e,t)=>!l(e,t),se={attribute:!0,type:String,converter:m,reflect:!1,useDefault:!1,hasChanged:oe};Symbol.metadata??=Symbol(`metadata`),f.litPropertyMetadata??=new WeakMap;var h=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=se){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??se}static _$Ei(){if(this.hasOwnProperty(p(`elementProperties`)))return;let e=ne(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(p(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(p(`properties`))){let e=this.properties,t=[...ee(e),...te(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?m:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?m:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??oe)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};h.elementStyles=[],h.shadowRootOptions={mode:`open`},h[p(`elementProperties`)]=new Map,h[p(`finalized`)]=new Map,ae?.({ReactiveElement:h}),(f.reactiveElementVersions??=[]).push(`2.1.2`);var ce=globalThis,le=e=>e,g=ce.trustedTypes,ue=g?g.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,de=`$lit$`,_=`lit$${Math.random().toFixed(9).slice(2)}$`,fe=`?`+_,pe=`<${fe}>`,v=document,y=()=>v.createComment(``),b=e=>e===null||typeof e!=`object`&&typeof e!=`function`,me=Array.isArray,he=e=>me(e)||typeof e?.[Symbol.iterator]==`function`,ge=`[ 	
\f\r]`,x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_e=/-->/g,ve=/>/g,S=RegExp(`>|${ge}(?:([^\\s"'>=/]+)(${ge}*=${ge}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),ye=/'/g,be=/"/g,xe=/^(?:script|style|textarea|title)$/i,C=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),w=Symbol.for(`lit-noChange`),T=Symbol.for(`lit-nothing`),Se=new WeakMap,E=v.createTreeWalker(v,129);function Ce(e,t){if(!me(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ue===void 0?t:ue.createHTML(t)}var we=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=x;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===x?c[1]===`!--`?o=_e:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=S):(xe.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=S):o=ve:o===S?c[0]===`>`?(o=i??x,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?S:c[3]===`"`?be:ye):o===be||o===ye?o=S:o===_e||o===ve?o=x:(o=S,i=void 0);let d=o===S&&e[t+1].startsWith(`/>`)?` `:``;a+=o===x?n+pe:l>=0?(r.push(s),n.slice(0,l)+de+n.slice(l)+_+d):n+_+(l===-2?t:d)}return[Ce(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},Te=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=we(t,n);if(this.el=e.createElement(l,r),E.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=E.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(de)){let t=u[o++],n=i.getAttribute(e).split(_),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?De:r[1]===`?`?Oe:r[1]===`@`?ke:k}),i.removeAttribute(e)}else e.startsWith(_)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(xe.test(i.tagName)){let e=i.textContent.split(_),t=e.length-1;if(t>0){i.textContent=g?g.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],y()),E.nextNode(),c.push({type:2,index:++a});i.append(e[t],y())}}}else if(i.nodeType===8){if(i.data===fe)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(_,e+1))!==-1;)c.push({type:7,index:a}),e+=_.length-1}}a++}}static createElement(e,t){let n=v.createElement(`template`);return n.innerHTML=e,n}};function D(e,t,n=e,r){if(t===w)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=b(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=D(e,i._$AS(e,t.values),i,r)),t}var Ee=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??v).importNode(t,!0);E.currentNode=r;let i=E.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new O(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Ae(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=E.nextNode(),a++)}return E.currentNode=v,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},O=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=T,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=D(this,e,t),b(e)?e===T||e==null||e===``?(this._$AH!==T&&this._$AR(),this._$AH=T):e!==this._$AH&&e!==w&&this._(e):e._$litType$===void 0?e.nodeType===void 0?he(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==T&&b(this._$AH)?this._$AA.nextSibling.data=e:this.T(v.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Te.createElement(Ce(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Ee(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=Se.get(e.strings);return t===void 0&&Se.set(e.strings,t=new Te(e)),t}k(t){me(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(y()),this.O(y()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=le(e).nextSibling;le(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},k=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=T,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=T}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=D(this,e,t,0),a=!b(e)||e!==this._$AH&&e!==w,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=D(this,r[n+o],t,o),s===w&&(s=this._$AH[o]),a||=!b(s)||s!==this._$AH[o],s===T?e=T:e!==T&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===T?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},De=class extends k{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===T?void 0:e}},Oe=class extends k{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==T)}},ke=class extends k{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=D(this,e,t,0)??T)===w)return;let n=this._$AH,r=e===T&&n!==T||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==T&&(n===T||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ae=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){D(this,e)}},je=ce.litHtmlPolyfillSupport;je?.(Te,O),(ce.litHtmlVersions??=[]).push(`3.3.3`);var Me=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new O(t.insertBefore(y(),e),e,void 0,n??{})}return i._$AI(e),i},Ne=globalThis,A=class extends h{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Me(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};A._$litElement$=!0,A.finalized=!0,Ne.litElementHydrateSupport?.({LitElement:A});var Pe=Ne.litElementPolyfillSupport;Pe?.({LitElement:A}),(Ne.litElementVersions??=[]).push(`4.2.2`);var j=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},Fe={attribute:!0,type:String,converter:m,reflect:!1,hasChanged:oe},Ie=(e=Fe,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function M(e){return(t,n)=>typeof n==`object`?Ie(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}var N=o`
  :host {
    --ink: #16323d;
    --paper: #f7f1e3;
    --card: #fffbf0;
    --panel-warm: #fdf3d4;
    --popover-bg: #e8f4fa;
    --mustard: #f7c948;
    --coral: #ef7d5c;
    --sky: #8fd0e6;
    --violet: #7b62b8;
    --full-bg: #ffe6dd;
    --full-border-bg: #ffd9cc;
    --mono: 'DM Mono', monospace;
    --sans: Fredoka, 'Helvetica Neue', Helvetica, sans-serif;
  }
`,P=o`
  * {
    box-sizing: border-box;
  }
  button {
    font-family: inherit;
    cursor: pointer;
    border: 0;
    background: none;
    color: inherit;
  }
  a {
    color: var(--coral);
    text-decoration: none;
  }
`;o`
  .sticker {
    border: 2.5px solid var(--ink);
    border-radius: 26px;
    background: var(--card);
    box-shadow: 8px 8px 0 var(--ink);
  }
`;var F=o`
  @keyframes scrimIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes sheetIn {
    from {
      opacity: 0;
      transform: scale(0.96) rotate(-1deg);
    }
    to {
      opacity: 1;
      transform: scale(1) rotate(0);
    }
  }
  @keyframes stepIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes bob {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-4px);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`,I=o`
  .scrim {
    position: fixed;
    inset: 0;
    background: rgba(22, 50, 61, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 80;
    padding: 20px;
    animation: scrimIn 180ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .sheet-in {
    animation: sheetIn 200ms cubic-bezier(0.23, 1, 0.32, 1);
  }
`,Le=[{label:`min`,value:0},{label:`9 o'clock`,value:32},{label:`noon`,value:64},{label:`3 o'clock`,value:96},{label:`max`,value:127}],L={blooper:{id:`blooper`,name:`blooper`,faceName:`blooper`,sub:`bottomless looper`,accent:`#8fd0e6`,body:`#bfe2ec`,ink:`#173b47`,midiChannel:3,pcOffset:0,photo:`assets/blooper-face.png`,pw:508,ph:948,notes:[`Zero-Based Program Changes: Blooper is a zero-based MIDI pedal. Loops 1-16 are saved and recalled using Program Changes 0-15. This allows for the use of Faves for recalling loops and puts presets in line with BOSS ES and MS series controllers. Other controllers have an option for "PC Offset" set to 0.`,`TRS MIDI Connection: Blooper uses a 1/4" TRS Ring Active connection. Requires a Chase Bliss MIDIBox or compatible TRS adapter for 5-pin MIDI controllers.`,`Default Channel: Listens on MIDI Channel 2 by default (configurable by holding both stomp switches at power-on and sending a Program Change).`,`Additive Mode Overdubs: In Additive mode, MIDI CC movements for Modifiers or Stability can be recorded directly into loop overdubs.`],controls:[{id:`volume`,short:`ramp volume`,label:`Ramp / Volume`,type:`knob`,cc:14,x:22,y:12,px:18.7,py:9.7,ps:20.7},{id:`layers`,short:`layers`,label:`Layers`,type:`knob`,cc:17,notes:`Navigates loop layer undo/redo history (0-127)`,x:50,y:12,px:49.2,py:9.5,ps:19.7},{id:`repeats`,short:`repeats`,label:`Repeats`,type:`knob`,cc:15,x:78,y:12,px:82,py:9.5,ps:19.7},{id:`modA`,short:`mod a`,label:`Modifier A`,type:`knob`,cc:30,x:22,y:33,px:19.1,py:29.7,ps:20.7},{id:`stability`,short:`stability`,label:`Stability`,type:`knob`,cc:18,x:50,y:33,px:49.6,py:29.5,ps:19.7},{id:`modB`,short:`mod b`,label:`Modifier B`,type:`knob`,cc:31,x:78,y:33,px:82,py:29.7,ps:19.7},{id:`chA`,short:`1 2 3`,label:`Mod A channel`,type:`toggle`,cc:21,x:22,y:52,px:19.7,py:46.8,ps:12.2,values:[{label:`1`,value:0},{label:`2`,value:64},{label:`3`,value:127}]},{id:`mode`,short:`norm add samp`,label:`Norm / Add / Samp`,type:`toggle`,cc:22,x:50,y:52,px:49.8,py:46.8,ps:12.2,values:[{label:`normal`,value:0},{label:`additive`,value:64},{label:`sampling`,value:127}]},{id:`chB`,short:`4 5 6`,label:`Mod B channel`,type:`toggle`,cc:23,x:78,y:52,px:80.7,py:46.8,ps:12.2,values:[{label:`4`,value:0},{label:`5`,value:64},{label:`6`,value:127}]},{id:`undo`,short:`undo / redo`,label:`Undo / Redo`,type:`toggle`,cc:5,notes:`CC 5 triggers Undo, CC 6 triggers Redo`,x:50,y:82,px:49.8,py:85.7,ps:9.1,values:[{label:`undo`,value:0},{label:`off`,value:64},{label:`redo`,value:127}]},{id:`record`,short:`record`,label:`Record`,type:`foot`,cc:1,notes:`CC 1 triggers Record`,x:28,y:82,px:19.1,py:89.1,ps:19.7},{id:`loop`,short:`loop`,label:`Loop`,type:`foot`,cc:2,notes:`CC 2 triggers Play/Loop, CC 4 triggers Stop`,x:72,y:82,px:79.8,py:89.1,ps:19.7}]},mood:{id:`mood`,name:`MOOD`,faceName:`MOOD`,sub:`instant ambience`,accent:`#ef7d5c`,body:`#e8785a`,ink:`#4a150c`,midiChannel:2,photo:`assets/mood-face.png`,pw:507,ph:957,notes:[`Independent Channel Bypass: CC 102 controls Micro-looper bypass (0=Off, 127=On) and CC 103 controls Wet channel bypass (0=Off, 127=On). On classic MOOD, CC 103 values 0 (both off), 45 (micro only), 85 (wet only), 127 (both on) set combined states.`,`TRS MIDI Connection: Uses 1/4" TRS Ring Active MIDI jack (requires Chase Bliss MIDIBox or TRS MIDI cable).`,`Default Channel: Set to MIDI Channel 2 by default.`,`Clock Sync & Subdivisions: CC 18 controls master clock speed. In Tape mode, Length (CC 16) quantizes loop subdivisions (x/32, x/16, x/8, x/4, x/2, x/1).`],controls:[{id:`time`,short:`time`,label:`Time`,type:`knob`,cc:14,x:22,y:12,px:17.9,py:10.1,ps:20.7},{id:`mix`,short:`mix (ramp)`,label:`Mix (Ramp)`,type:`knob`,cc:15,x:50,y:12,px:48.9,py:10.1,ps:19.8},{id:`length`,short:`length`,label:`Length`,type:`knob`,cc:16,x:78,y:12,px:81.5,py:10.1,ps:19.8},{id:`modWet`,short:`modify`,label:`Modify — wet`,type:`knob`,cc:17,x:22,y:33,px:17.9,py:30.5,ps:20.7},{id:`clock`,short:`clock`,label:`Clock`,type:`knob`,cc:18,x:50,y:33,px:49.3,py:30.3,ps:19.8},{id:`modMicro`,short:`modify`,label:`Modify — micro`,type:`knob`,cc:19,x:78,y:33,px:81.8,py:30.5,ps:19.8},{id:`wetmode`,short:`reverb delay slip`,label:`Wet effect`,type:`toggle`,cc:21,x:22,y:52,px:19.3,py:47,ps:12.2,values:[{label:`reverb`,value:0},{label:`delay`,value:64},{label:`slip`,value:127}]},{id:`routing`,short:`in · ○+in · ○`,label:`Routing`,type:`toggle`,cc:22,x:50,y:52,px:49.5,py:47,ps:12.2,values:[{label:`in`,value:0},{label:`loop + in`,value:64},{label:`loop`,value:127}]},{id:`micromode`,short:`stretch tape env`,label:`Micro-looper mode`,type:`toggle`,cc:23,x:78,y:52,px:80.5,py:47,ps:12.2,values:[{label:`stretch`,value:0},{label:`tape`,value:64},{label:`env`,value:127}]},{id:`bypass`,short:`bypass`,label:`Bypass mode`,type:`toggle`,cc:103,notes:`CC 103 controls Wet channel bypass; CC 102 controls Micro-looper bypass`,x:50,y:82,px:49.5,py:86.7,ps:9.1,values:[{label:`left`,value:0},{label:`centre`,value:64},{label:`right`,value:127}]},{id:`wet`,short:`wet`,label:`Wet channel`,type:`foot`,cc:103,notes:`CC 103 toggles Wet channel bypass`,x:28,y:82,px:18.4,py:90.3,ps:19.8},{id:`microloop`,short:`micro`,label:`Micro-looper`,type:`foot`,cc:102,notes:`CC 102 toggles Micro-looper bypass`,x:72,y:82,px:79.5,py:90.3,ps:19.8}]},elcap:{id:`elcap`,name:`el capistan`,faceName:`el capistan`,sub:`dTape echo`,accent:`#7b62b8`,body:`#c7ced2`,ink:`#20262b`,midiChannel:1,photo:`assets/elcap-face.png`,pw:775,ph:872,notes:[`EXP/MIDI Jack Setup: Must configure EXP/MIDI jack to MIDI mode at power-up (hold TAP footswitch, turn MIX knob until ON LED turns BLUE).`,`Default Channel: Defaults to MIDI Channel 1.`,`Bypass CC: CC 102 with value 127 engages effect; value 0 bypasses.`,`Clock Division: CC 25 controls Clock Division on V2 firmware.`],controls:[{id:`time`,short:`time`,label:`Time`,type:`knob`,cc:12,x:22,y:13,px:14.9,py:18,ps:17},{id:`cmix`,short:`mix`,label:`Mix`,type:`knob`,cc:14,x:78,y:13,px:85.1,py:18,ps:17},{id:`age`,short:`tape age`,label:`Tape Age`,type:`knob`,cc:16,x:38,y:33,px:38,py:37.3,ps:17},{id:`repeats`,short:`repeats`,label:`Repeats`,type:`knob`,cc:15,x:62,y:33,px:62,py:37.3,ps:17},{id:`wow`,short:`wow & flutter`,label:`Wow & Flutter`,type:`knob`,cc:13,x:22,y:45,px:14.9,py:42.5,ps:17},{id:`spring`,short:`spring`,label:`Spring`,type:`knob`,cc:18,x:78,y:45,px:85.1,py:42.5,ps:17},{id:`head`,short:`tape head`,label:`Tape head`,type:`toggle`,cc:11,x:40,y:13,px:42.8,py:18,ps:6.7,values:[{label:`fixed`,value:0},{label:`multi`,value:64},{label:`single`,value:127}]},{id:`cmode`,short:`mode`,label:`Mode`,type:`toggle`,cc:19,x:60,y:13,px:56.9,py:18,ps:6.7,values:[{label:`a`,value:0},{label:`b`,value:64},{label:`c`,value:127}]},{id:`tap`,short:`tap`,label:`Tap`,type:`foot`,cc:93,notes:`CC 93 triggers Tap tempo pulse`,x:28,y:82,px:18.8,py:80.1,ps:14.2},{id:`onoff`,short:`on`,label:`On / bypass`,type:`foot`,cc:102,notes:`CC 102 value 127 engages, 0 bypasses`,x:72,y:82,px:81.8,py:80.1,ps:14.2}]}},Re=[`blooper`,`mood`,`elcap`],R={chocolate:{id:`chocolate`,name:`M-Vave Chocolate`,short:`chocolate`,sub:`4 switches · 4 banks`,keys:[`A`,`B`,`C`,`D`],x:[14,38,62,86],y:[42,42,42,42],height:74,heightDesktop:80,banks:4,screen:!1,onboard:!1,notes:[`Hardware Layout: 4 foot switches (A, B, C, D) across 4 banks.`,`No Onboard Macro Storage: Sends 1 MIDI message per switch. Requires an external smart relay hub (Pirate MIDI Scribble) to fan out multi-step macro stacks.`,`Editor & Connection: Configured via M-Vave CubeSuite app over Bluetooth or USB-C MIDI.`]},mc3:{id:`mc3`,name:`Morningstar MC3`,short:`mc3`,sub:`3 switches · 3 banks`,keys:[`A`,`B`,`C`],x:[26,74,50],y:[74,74,14],height:158,heightDesktop:170,banks:3,screen:!0,onboard:!0,notes:[`Hardware Layout: 3 foot switches (A, B, C) supporting 30 physical banks.`,`Onboard Macro Storage: Stores up to 16 MIDI messages per switch action directly in memory without requiring an external relay box.`,`Editor Integration: Exports native preset JSON for import via the Morningstar Editor.`,`Connectivity: Features OLED display screen, 1x 5-pin DIN MIDI Out, 4x 3.5mm TRS MIDI outputs, and USB-C MIDI.`]}},ze=[`chocolate`,`mc3`],z=[{id:`press`,label:`tap`},{id:`hold`,label:`hold`},{id:`double`,label:`double`}],B={scribble:{id:`scribble`,short:`scribble`,full:`Scribble relay`,sub:`the little box in the loop — takes one message in, fans the whole stack out`,icon:`▤`,colour:`#8fd0e6`,maxSteps:8,banks:16,notes:[`Pirate MIDI Scribble Relay Hub: USB-C Host / TRS / BLE relay box.`,`Macro Capacity: Stores up to 8 MIDI messages per switch action across 16 banks (128 presets total).`,`Firmware Flashing: Configured via USB-C or web editor using scribble.json config file.`]},onboard:{id:`onboard`,short:`onboard`,full:`Controller onboard`,sub:`no extra box — the controller holds the stack itself`,icon:`◉`,colour:`#f7c948`,maxSteps:6,banks:3,notes:[`Controller Onboard Storage: Direct execution on smart controllers (like Morningstar MC3).`,`Macro Capacity: Stores up to 16 MIDI messages per action directly on the controller without requiring an external relay hub.`]},none:{id:`none`,short:`direct`,full:`No brain`,sub:`controller talks straight to the pedals — one message per stomp`,icon:`—`,colour:`#ef7d5c`,maxSteps:1,banks:16,notes:[`Direct Controller Setup: Controller sends 1 raw MIDI message per stomp directly to pedals.`,`No Macro Stacks: Triggers are limited to 1 step per action (no multi-pedal fanout).`]}},Be=[`scribble`,`onboard`,`none`],Ve=[{id:`scribble`,label:`scribble.json`,sub:`relay config`,note:`flashes onto the scribble over usb`},{id:`mc3`,label:`mc3-preset.json`,sub:`native preset`,note:`import via the morningstar editor`},{id:`rig`,label:`rig.json`,sub:`portable source`,note:`the source of truth — every build comes from this`},{id:`labels`,label:`label sheet`,sub:`printable`,note:`one line per stomp, for the pedalboard`},{id:`log`,label:`midi log`,sub:`debug trace`,note:`raw bytes, in the order they leave`}],V=class e{static{this.controlMap=new Map}static{this.targetMap=new Map}static{Object.values(L).forEach(t=>{t.controls.forEach(n=>{e.controlMap.set(`${t.id}:${n.id}`,n)})}),Ve.forEach(t=>{e.targetMap.set(t.id,t)})}static getDevice(e){return L[e]}static getController(e){return R[e]||R.chocolate}static getBrain(e){return B[e]||B.none}static getTarget(t){return e.targetMap.get(t)||Ve[0]}static getControl(t,n){return e.controlMap.get(`${t}:${n}`)}static valueOptionsFor(e){return e.values?e.values:e.type===`knob`?Le:[]}static formatControlLabel(t,n,r){let i=e.getControl(t,n);if(!i)return n;let a=i.label;if(r!=null){let t=e.valueOptionsFor(i).find(e=>e.value===r);t&&(a+=` · `+t.label)}return a}static findNextFreeChannel(e,t){let n={};e.forEach(e=>{t[e]&&(n[t[e]]=!0)});for(let e=1;e<=16;e++)if(!n[e])return e;return 1}static detectChannelCollisions(e,t){let n={};e.forEach(e=>{let r=L[e],i=t[e]||(r?r.midiChannel:1);(n[i]=n[i]||[]).push(r?.name||e)});let r=[];return Object.keys(n).forEach(e=>{let t=Number(e);n[t].length>1&&r.push({channel:t,devices:n[t]})}),r}static getDeviceAccentColorInt(e){let t=L[e];if(!t||!t.accent)return 0;let n=t.accent.replace(`#`,``);return n.length===6?parseInt(n,16):0}},H=class e{static createBanks(e){let t=R[e]||R.chocolate,n=[];for(let e=0;e<t.banks;e++){let e={};t.keys.forEach(t=>{e[t]={press:[],hold:[],double:[]}}),n.push(e)}return n}static cloneBanks(e){return e.map(e=>{let t={};for(let n of Object.keys(e))t[n]={press:e[n].press.slice(),hold:e[n].hold.slice(),double:e[n].double.slice()};return t})}static getActiveStack(e,t,n,r){return!e[t]||!e[t][n]||!e[t][n][r]?[]:e[t][n][r]}static addOrToggleStep(t,n,r,i,a,o,s,c=8){let l=e.cloneBanks(t),u=l[n][r][i],d=u.findIndex(e=>e.device===a&&e.control===o&&e.value===s);return d>=0?(u.splice(d,1),l):(u.length>=c||u.push({device:a,control:o,value:s}),l)}static removeStep(t,n,r,i,a){let o=e.cloneBanks(t),s=o[n][r][i];return a>=0&&a<s.length&&s.splice(a,1),o}static moveStep(t,n,r,i,a,o){let s=e.cloneBanks(t),c=s[n][r][i],l=a+o;if(l>=0&&l<c.length&&a>=0&&a<c.length){let e=c[a];c[a]=c[l],c[l]=e}return s}static countTotalAssignedSteps(e){let t=0;for(let n of e)for(let e of Object.keys(n))t+=n[e].press.length+n[e].hold.length+n[e].double.length;return t}static usedDeviceIds(e){let t={};return e.forEach(e=>{Object.keys(e).forEach(n=>{z.forEach(({id:r})=>{e[n][r].forEach(e=>{t[e.device]=!0})})})}),Object.keys(t)}static usedControlIds(e,t){let n={};return e.forEach(e=>{Object.keys(e).forEach(r=>{z.forEach(({id:i})=>{e[r][i].forEach(e=>{e.device===t&&(n[e.control]=!0)})})})}),Object.keys(n)}},U=8;function He(e){let t=V.getController(e);return{controllerId:e,brainId:`scribble`,banks:H.createBanks(e),bank:0,selectedKey:t.keys[0],action:`press`,browseDevice:Re[0],face:`photo`,popoverControlId:null,compileOpen:!1,settingsOpen:!1,controllerPickerOpen:!1,brainPickerOpen:!1,addPedalOpen:!1,confirmRemovePedal:null,channelPickerOpen:!1,targetId:`scribble`,rig:[`blooper`,`mood`,`elcap`],channels:{blooper:1,mood:2,elcap:3},sheetOpen:!1}}var Ue=class extends EventTarget{constructor(...e){super(...e),this.state=He(`chocolate`)}set(e){this.state={...this.state,...e},this.dispatchEvent(new Event(`change`))}get activeStack(){let{banks:e,bank:t,selectedKey:n,action:r}=this.state;return H.getActiveStack(e,t,n,r)}get totalAssigned(){return H.countTotalAssignedSteps(this.state.banks)}nextFreeChannel(e=this.state.rig,t=this.state.channels){return V.findNextFreeChannel(e,t)}addPedal(e){if(this.state.rig.includes(e)){this.set({addPedalOpen:!1,browseDevice:e});return}let t=[...this.state.rig,e],n={...this.state.channels};n[e]||(n[e]=V.findNextFreeChannel(t.filter(t=>t!==e),n)),this.set({rig:t,channels:n,browseDevice:e,addPedalOpen:!1,popoverControlId:null})}dropPedal(e){if(this.state.rig.length<=1)return;let t=this.state.rig.filter(t=>t!==e),n=this.state.browseDevice===e?t[0]:this.state.browseDevice;this.set({rig:t,browseDevice:n,channelPickerOpen:!1,popoverControlId:null,confirmRemovePedal:null})}setPedalChannel(e,t){let n={...this.state.channels,[e]:t};this.set({channels:n,channelPickerOpen:!1})}toggleChannelPicker(){this.set({channelPickerOpen:!this.state.channelPickerOpen})}setBrain(e){this.set({brainId:e,brainPickerOpen:!1})}openBrainPicker(){this.set({brainPickerOpen:!0,channelPickerOpen:!1})}closeBrainPicker(){this.set({brainPickerOpen:!1})}openAddPedal(){this.set({addPedalOpen:!0,channelPickerOpen:!1})}closeAddPedal(){this.set({addPedalOpen:!1})}setConfirmRemove(e){this.set({confirmRemovePedal:e,channelPickerOpen:!1})}setTarget(e){this.set({targetId:e})}clickControl(e){if(e.type!==`foot`){this.set({popoverControlId:this.state.popoverControlId===e.id?null:e.id,sheetOpen:!0});return}this.addStep(e.id,null)}addStep(e,t){let{banks:n,bank:r,selectedKey:i,action:a,browseDevice:o}=this.state,s=H.addOrToggleStep(n,r,i,a,o,e,t,U);this.set({banks:s,popoverControlId:null,sheetOpen:!0})}removeStep(e){let{banks:t,bank:n,selectedKey:r,action:i}=this.state,a=H.removeStep(t,n,r,i,e);this.set({banks:a})}moveStep(e,t){let{banks:n,bank:r,selectedKey:i,action:a}=this.state,o=H.moveStep(n,r,i,a,e,t);this.set({banks:o})}selectSwitch(e){this.set({selectedKey:e,popoverControlId:null})}selectBank(e){this.set({bank:e,popoverControlId:null})}selectAction(e){this.set({action:e,popoverControlId:null})}setBrowseDevice(e){this.set({browseDevice:e,popoverControlId:null,channelPickerOpen:!1})}closePopover(){this.set({popoverControlId:null})}setFace(e){this.set({face:e,popoverControlId:null})}openSettings(){this.set({settingsOpen:!0})}closeSettings(){this.set({settingsOpen:!1})}openControllerPicker(){this.set({controllerPickerOpen:!0})}closeControllerPicker(){this.set({controllerPickerOpen:!1})}openCompile(){this.set({compileOpen:!0})}closeCompile(){this.set({compileOpen:!1})}toggleSheet(){this.set({sheetOpen:!this.state.sheetOpen})}setSheet(e){this.set({sheetOpen:e})}switchController(e){let t=V.getController(e);this.set({controllerId:e,banks:H.createBanks(e),bank:0,selectedKey:t.keys[0],controllerPickerOpen:!1,popoverControlId:null})}},W=class{constructor(e,t){this.onChange=()=>this.host.requestUpdate(),this.host=e,this.store=t,e.addController(this)}hostConnected(){this.store.addEventListener(`change`,this.onChange)}hostDisconnected(){this.store.removeEventListener(`change`,this.onChange)}};function G(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var K=class extends A{constructor(...e){super(...e),this.desktop=!1}static{this.styles=[N,P,o`
      :host {
        display: block;
      }
      .name-row {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        margin-bottom: 8px;
        text-align: left;
      }
      .name {
        flex: 1;
        font-size: 14.5px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      :host([desktop]) .name {
        font-size: 16px;
      }
      .change {
        font-size: 11px;
        opacity: 0.5;
      }
      .bank-row {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px;
        border-radius: 16px 16px 0 0;
        background: var(--ink);
      }
      .bank-row-label {
        font-family: var(--mono);
        font-size: 10px;
        color: var(--paper);
        opacity: 0.5;
        padding-left: 6px;
        margin-right: 2px;
      }
      .bank-chip {
        flex: 1;
        white-space: nowrap;
        padding: 5px 0;
        border-radius: 11px;
        font-size: 12.5px;
        font-weight: 600;
        border: 2px solid;
        transition:
          background 150ms ease,
          color 150ms ease,
          border-color 150ms ease;
      }
      .strip {
        position: relative;
        border-radius: 16px;
        background: var(--ink);
        box-shadow: 3px 3px 0 var(--violet);
      }
      :host([desktop]) .strip {
        border-radius: 0 0 16px 16px;
      }
      .screen {
        position: absolute;
        left: 50%;
        top: 52%;
        transform: translateX(-50%);
        width: 112px;
        height: 24px;
        border-radius: 4px;
        background: var(--paper);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--mono);
        font-size: 9.5px;
        color: var(--ink);
      }
      :host([desktop]) .screen {
        width: 118px;
        height: 26px;
        font-size: 10px;
      }
      .switch-wrap {
        position: absolute;
        transform: translate(-50%, -50%);
        width: 38px;
        height: 38px;
        padding: 0;
      }
      .cap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        font-size: 12px;
        font-weight: 600;
        color: var(--ink);
        transition:
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1),
          border-color 160ms ease,
          background 160ms ease;
      }
      .switch-name {
        position: absolute;
        left: 50%;
        top: calc(100% + 5px);
        transform: translateX(-50%);
        font-size: 11.5px;
        font-weight: 600;
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new W(this,this.store)}render(){let e=this.store.state,t=R[e.controllerId],n=e.banks[e.bank],r=this.desktop?t.heightDesktop:t.height;return C`
      <button class="name-row" @click=${()=>this.store.openControllerPicker()}>
        <span class="name">${t.name}</span>
        <span class="change">change ⌄</span>
      </button>
      ${this.desktop?C`
            <div class="bank-row">
              <span class="bank-row-label">bank</span>
              ${e.banks.map((t,n)=>{let r=n===e.bank;return C`
                  <button
                    class="bank-chip"
                    style="border-color:${r?`var(--mustard)`:`rgba(247,241,227,.28)`};background:${r?`var(--mustard)`:`transparent`};color:${r?`var(--ink)`:`rgba(247,241,227,.6)`}"
                    @click=${()=>this.store.selectBank(n)}
                  >
                    0${n+1}
                  </button>
                `})}
            </div>
          `:null}
      <div class="strip" style="height:${r}px">
        ${t.screen?C`<div class="screen">bank ${e.bank+1} · ${e.selectedKey}</div>`:null}
        ${t.keys.map((r,i)=>{let a=e.selectedKey===r,o=0,s=new Set;z.forEach(({id:e})=>{n[r][e].forEach(e=>{o++,s.add(e.device)})});let c=s.size===1?L[[...s][0]].accent:s.size>1?`var(--mustard)`:`rgba(247,241,227,.16)`;return C`
            <button
              class="switch-wrap"
              style="left:${t.x[i]}%;top:${t.y[i]}%"
              @click=${()=>this.store.selectSwitch(r)}
            >
              <span
                class="cap"
                style="background:${c};border:2.5px solid ${a?`var(--mustard)`:`rgba(247,241,227,.4)`};box-shadow:${a?`0 0 0 4px rgba(247,201,72,.3)`:`none`}"
                >${o>0?o:``}</span
              >
              <span class="switch-name" style="color:${a?`var(--mustard)`:`rgba(247,241,227,.55)`}">${r}</span>
            </button>
          `})}
      </div>
    `}};G([M({attribute:!1})],K.prototype,`store`,void 0),G([M({type:Boolean,reflect:!0})],K.prototype,`desktop`,void 0),K=G([j(`controller-graphic`)],K);var We=class extends A{static{this.styles=[N,P,F,o`
      :host {
        display: block;
        position: relative;
        overflow: visible;
      }
      .wrap {
        position: relative;
        display: flex;
        align-items: center;
        gap: 10px;
        overflow: visible;
      }
      .row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 7px;
        flex: 1;
        min-width: 0;
        padding: 2px;
      }
      .chip-wrap {
        display: flex;
        align-items: center;
        flex: none;
        border-radius: 18px;
        border: 2px solid var(--ink);
        transition:
          background 150ms ease,
          box-shadow 150ms ease;
      }
      .chip-btn {
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 6px 14px;
        font-size: 13px;
        font-weight: 500;
        white-space: nowrap;
        transition: transform 120ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .chip-btn:active {
        transform: scale(0.97);
      }
      .chip-wrap[active] .chip-btn {
        padding-right: 6px;
      }
      .chip-wrap[active][single] .chip-btn {
        padding-right: 14px;
      }
      .dot {
        width: 13px;
        height: 13px;
        border-radius: 5px;
        flex: none;
        border: 2px solid var(--ink);
      }
      .remove-btn {
        width: 22px;
        height: 22px;
        flex: none;
        margin-right: 5px;
        border-radius: 50%;
        border: 2px solid var(--ink);
        font-size: 12px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        transition:
          background 150ms ease,
          color 150ms ease;
      }
      .remove-btn:hover {
        background: var(--coral);
        color: var(--paper);
      }
      .add-chip {
        display: flex;
        align-items: center;
        flex: none;
        padding: 6px 14px;
        border-radius: 18px;
        font-size: 13px;
        font-weight: 500;
        white-space: nowrap;
        background: transparent;
        opacity: 0.55;
        border: 2px dashed var(--ink);
        transition:
          background 150ms ease,
          opacity 150ms ease,
          transform 120ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .add-chip:hover {
        background: var(--panel-warm);
        opacity: 1;
      }
      .add-chip:active {
        transform: scale(0.97);
      }
      .chan-btn {
        display: flex;
        align-items: center;
        gap: 7px;
        flex: none;
        padding: 6px 12px;
        border-radius: 18px;
        border: 2px solid var(--ink);
        transition:
          background 150ms ease,
          box-shadow 150ms ease;
      }
      .chan-btn:hover {
        box-shadow: 2px 2px 0 var(--ink);
      }
      .chan-popover {
        position: absolute;
        right: 0;
        top: calc(100% + 4px);
        width: 288px;
        max-width: calc(100vw - 28px);
        padding: 14px;
        border-radius: 20px;
        background: var(--card);
        border: 2.5px solid var(--ink);
        box-shadow: 5px 5px 0 var(--ink);
        z-index: 50;
        animation: sheetIn 170ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .pop-title {
        font-size: 13.5px;
        font-weight: 600;
        margin-bottom: 3px;
      }
      .pop-sub {
        font-size: 11.5px;
        line-height: 1.45;
        opacity: 0.6;
        margin-bottom: 11px;
        text-wrap: pretty;
      }
      .chan-grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 5px;
      }
      .chan-opt {
        padding: 6px 0;
        border-radius: 9px;
        font-family: var(--mono);
        font-size: 11px;
        border: 2px solid var(--ink);
        background: var(--card);
        transition: background 140ms ease;
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new W(this,this.store)}render(){let e=this.store.state,t=e.browseDevice,n=V.getDevice(t),r=e.channels[t]||(n?n.midiChannel:1);return C`
      <div class="wrap">
        <div class="row">
          ${e.rig.map(n=>{let r=V.getDevice(n);if(!r)return null;let i=t===n;return C`
              <span
                class="chip-wrap"
                ?active=${i}
                ?single=${e.rig.length<=1}
                style=${i?`background:${r.accent};box-shadow:2px 2px 0 var(--ink)`:`background:transparent;opacity:.6`}
              >
                <button class="chip-btn" @click=${()=>this.store.setBrowseDevice(n)}>
                  <span class="dot" style="background:${r.accent}"></span>
                  <span>${r.name}</span>
                </button>
                ${i&&e.rig.length>1?C`
                      <button
                        class="remove-btn"
                        title="take ${r.name} out of the rig"
                        @click=${()=>this.store.setConfirmRemove(n)}
                      >
                        ×
                      </button>
                    `:null}
              </span>
            `})}
          <button class="add-chip" title="add a pedal to your rig" @click=${()=>this.store.openAddPedal()}>+ pedal</button>
        </div>

        <button
          class="chan-btn"
          title="midi channel for this pedal"
          style=${e.channelPickerOpen?`background:var(--mustard)`:`background:var(--card)`}
          @click=${()=>this.store.toggleChannelPicker()}
        >
          <span style="font-family:var(--mono);font-size:11px">ch ${r}</span>
          <span style="font-size:10px;opacity:.55">⚙</span>
        </button>

        ${e.channelPickerOpen?C`
              <div class="chan-popover">
                <div class="pop-title">${n?.name} · midi channel</div>
                <div class="pop-sub">every message for this pedal goes out on this channel.</div>
                <div class="chan-grid">
                  ${Array.from({length:16},(e,i)=>{let a=i+1;return C`
                      <button
                        class="chan-opt"
                        style=${r===a?`background:${n?.accent};font-weight:600`:`background:var(--card)`}
                        @click=${()=>this.store.setPedalChannel(t,a)}
                      >
                        ${a}
                      </button>
                    `})}
                </div>
              </div>
            `:null}
      </div>
    `}};G([M({attribute:!1})],We.prototype,`store`,void 0),We=G([j(`device-tabs`)],We);var Ge={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ke=e=>(...t)=>({_$litDirective$:e,values:t}),qe=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},Je=`important`,Ye=` !important`,q=Ke(class extends qe{constructor(e){if(super(e),e.type!==Ge.ATTRIBUTE||e.name!==`style`||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,n)=>{let r=e[n];return r==null?t:t+`${n=n.includes(`-`)?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,`-$&`).toLowerCase()}:${r};`},``)}update(e,[t]){let{style:n}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let e of this.ft)t[e]??(this.ft.delete(e),e.includes(`-`)?n.removeProperty(e):n[e]=null);for(let e in t){let r=t[e];if(r!=null){this.ft.add(e);let t=typeof r==`string`&&r.endsWith(Ye);e.includes(`-`)||t?n.setProperty(e,t?r.slice(0,-11):r,t?Je:``):n[e]=r}}return w}}),J=class extends A{constructor(...e){super(...e),this.phone=!1,this.desktop=!1}static{this.styles=[N,P,o`
      :host {
        display: flex;
        flex: 1;
        min-width: 0;
        min-height: 0;
      }
      .canvas {
        flex: 1;
        min-height: 0;
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-x: hidden;
        overflow-y: hidden;
        padding: 10px 14px 14px;
      }
      :host([phone]) .canvas {
        align-items: flex-start;
        overflow-y: auto;
      }
      :host([desktop]) .canvas {
        padding: 0 26px 20px;
      }
      .stage {
        position: relative;
        flex: none;
        container-type: size;
        filter: drop-shadow(5px 5px 0 var(--ink));
      }
      :host([desktop]) .stage {
        filter: drop-shadow(6px 6px 0 var(--ink));
      }
      .deco {
        position: absolute;
        border: 2px solid var(--ink);
      }
      .enclosure {
        position: absolute;
        inset: 0;
        border-radius: 20px;
        border: 2.5px solid var(--ink);
      }
      .brand {
        position: absolute;
        left: 50%;
        bottom: 2%;
        transform: translateX(-50%);
        font-size: clamp(13px, 6cqw, 20px);
        font-weight: 600;
        pointer-events: none;
      }
      .face-photo {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 14px;
        display: block;
      }
      .hotspot {
        padding: 0;
      }
      .badge {
        position: absolute;
        right: -9px;
        top: -9px;
        min-width: 23px;
        height: 23px;
        padding: 0 5px;
        border-radius: 12px;
        background: #fffbf0;
        border: 2.5px solid var(--ink);
        color: var(--ink);
        font-size: 11px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new W(this,this.store)}render(){let e=this.store.state,t=V.getDevice(e.browseDevice),n=e.face===`drawn`,r=this.store.activeStack,i={aspectRatio:n?`344/426`:`${t.pw}/${t.ph}`,width:this.phone?`100%`:`auto`,maxWidth:`100%`,height:this.phone?`auto`:`100%`};return this.desktop&&(i.maxHeight=n?`420px`:`600px`),C`
      <div class="canvas">
        ${this.desktop?C`
              <span class="deco" style="left:8%;top:14%;width:13px;height:13px;border-radius:50%;background:var(--sky)"></span>
              <span class="deco" style="left:13%;bottom:20%;width:20px;height:20px;border-radius:6px;background:var(--mustard);transform:rotate(14deg)"></span>
              <span class="deco" style="right:10%;top:22%;width:18px;height:18px;border-radius:6px;background:var(--coral);transform:rotate(-12deg)"></span>
              <span class="deco" style="right:7%;bottom:16%;width:12px;height:12px;border-radius:50%;background:var(--violet)"></span>
            `:null}
        <div class="stage" style=${q(i)}>
          ${n?C`
                <div class="enclosure" style="background:${t.body}"></div>
                <div class="brand" style="color:${t.ink}">${t.faceName}</div>
              `:C`<img class="face-photo" src=${t.photo} alt=${t.faceName} />`}
          ${t.controls.map(i=>this.renderControl(i,t,n,r,e.popoverControlId))}
        </div>
      </div>
    `}renderControl(e,t,n,r,i){let a=[];r.forEach((n,r)=>{n.device===t.id&&n.control===e.id&&a.push(r+1)});let o=a.length>0,s=i===e.id,c=!n,l=c?e.px:e.x,u=c?e.py:e.y,d={position:`absolute`,left:`${l}%`,top:`${u}%`,transform:`translate(-50%,-50%)`,display:`flex`,alignItems:`center`,justifyContent:`center`,zIndex:String(s?12:6)};c?(d.width=`${e.ps}%`,d.aspectRatio=`1`):e.type===`foot`?(d.width=`18%`,d.aspectRatio=`1`):e.type===`toggle`?(d.width=`9%`,d.height=`11%`):(d.width=`14%`,d.aspectRatio=`1`),this.phone&&(d.minWidth=`44px`,d.minHeight=`44px`);let ee;ee=c?{display:`block`,width:`100%`,height:`100%`,borderRadius:`50%`,border:`2.5px ${s||o?`solid`:`dashed`} var(--ink)`,background:s?`#f7c948aa`:o?`#f7c94855`:`rgba(255,251,240,.28)`,boxShadow:s?`0 0 0 4px #f7c94866`:`none`,transition:`background 160ms ease, box-shadow 160ms cubic-bezier(.23,1,.32,1)`}:e.type===`toggle`?{display:`block`,width:`100%`,height:`100%`,borderRadius:`7px`,background:`var(--ink)`,border:`2.5px solid var(--ink)`}:{display:`block`,width:`100%`,height:`100%`,borderRadius:`50%`,background:`#fffbf0`,border:`2.5px solid var(--ink)`,boxShadow:s?`0 0 0 4px #f7c94866`:`2px 2px 0 var(--ink)`,transition:`box-shadow 160ms cubic-bezier(.23,1,.32,1)`};let te=c?{position:`absolute`,left:`50%`,bottom:`calc(100% + 6px)`,transform:`translateX(-50%)`,whiteSpace:`nowrap`,fontSize:`11px`,fontWeight:`600`,padding:`2px 8px`,borderRadius:`12px`,background:`var(--mustard)`,border:`2px solid var(--ink)`,color:`var(--ink)`,pointerEvents:`none`,opacity:s||o?`1`:`0`}:{position:`absolute`,left:`50%`,[e.type===`foot`?`bottom`:`top`]:e.type===`foot`?`calc(100% + 6px)`:`calc(100% + 5px)`,transform:`translateX(-50%)`,whiteSpace:`nowrap`,fontSize:`clamp(8px,3.2cqw,11px)`,fontWeight:`500`,color:`var(--ink)`,opacity:`.75`,pointerEvents:`none`};return C`
      <button
        class="hotspot"
        style=${q(d)}
        title=${e.label}
        @click=${()=>this.store.clickControl(e)}
      >
        <span style=${q(ee)}></span>
        <span style=${q(te)}>${e.short}</span>
        ${o?C`<span class="badge">${a.join(`,`)}</span>`:null}
      </button>
    `}};G([M({attribute:!1})],J.prototype,`store`,void 0),G([M({type:Boolean,reflect:!0})],J.prototype,`phone`,void 0),G([M({type:Boolean,reflect:!0})],J.prototype,`desktop`,void 0),J=G([j(`pedal-canvas`)],J);function Xe(e){let t={};return e.banks.forEach(e=>{Object.keys(e).forEach(n=>{z.forEach(({id:r})=>{e[n][r].forEach(e=>{t[e.device]=!0})})})}),Object.keys(t)}function Ze(e,t){let n={};return e.banks.forEach(e=>{Object.keys(e).forEach(r=>{z.forEach(({id:i})=>{e[r][i].forEach(e=>{e.device===t&&(n[e.control]=!0)})})})}),Object.keys(n)}function Qe(e){let t={};return Xe(e).forEach(n=>{let r=V.getDevice(n);if(!r)return;let i={};Ze(e,n).forEach(e=>{let t=V.getControl(n,e);t&&(i[e]=t.cc)}),t[n]={name:r.name,channel:e.channels[n]||r.midiChannel,cc:i}}),{schema:`stomp-stacks/rig@1`,controller:e.controllerId,brain:e.brainId,pedals:t,banks:e.banks.map(e=>{let t={};return Object.keys(e).forEach(n=>{let r={};z.forEach(t=>{e[n][t.id].length&&(r[t.id]=e[n][t.id].map(e=>({pedal:e.device,control:e.control,value:e.value===null||e.value===void 0?127:e.value})))}),Object.keys(r).length&&(t[n]=r)}),t})}}var $e=class{constructor(){this.id=`rig`,this.name=`Rig Schema JSON`}compileExport(e){let t=Qe(e);return{filename:`rig-stack-${e.controllerId}.json`,mimeType:`application/json`,content:JSON.stringify(t,null,2)}}compilePreview(e){let t=Qe(e);return JSON.stringify(t,null,2).split(`
`).map(e=>({text:e||` `}))}},et=176;function Y(e,t){let n=V.getDevice(e.device),r=V.getControl(e.device,e.control),i=t&&t[e.device]?t[e.device]:n?.midiChannel||1,a=e.value??127,o=r?.label||e.control;if(e.value!==null&&e.value!==void 0&&r){let t=V.valueOptionsFor(r).find(t=>t.value===e.value);t&&(o+=` · `+t.label)}let s=r?.cc||0,c=et+(i-1);return{label:o,deviceId:n?.id||e.device,deviceName:n?.name||e.device,accent:n?.accent||`#ffffff`,channel:i,cc:s,value:a,message:{statusByte:c,dataByte1:s,dataByte2:a}}}function tt(e){let t={press:`Press`,hold:`Long Press`,double:`Double Tap`},n=[];return e.banks.slice(0,3).forEach((r,i)=>{Object.keys(r).forEach(a=>{let o={};z.forEach(n=>{let i=r[a][n.id];i.length&&(o[t[n.id]]=i.slice(0,6).map(t=>{let n=Y(t,e.channels);return{type:`Control Change`,channel:n.channel,cc:n.cc,value:n.value}}))}),Object.keys(o).length&&n.push({bank:i+1,preset:a,name:a,actions:o})})}),{device:`Morningstar MC3`,schema:`stomp-stacks/mc3@1`,presets:n}}var nt=class{constructor(){this.id=`mc3`,this.name=`Morningstar MC3`}compileExport(e){let t=tt(e);return{filename:`mc3-preset-${e.controllerId}.json`,mimeType:`application/json`,content:JSON.stringify(t,null,2)}}compilePreview(e){let t=tt(e);return JSON.stringify(t,null,2).split(`
`).map(e=>({text:e||` `}))}};function rt(e,t){e.banks.forEach((e,n)=>{Object.keys(e).forEach((r,i)=>{z.forEach(a=>{let o=e[r][a.id];o.length&&t(n,r,i,a,o)})})})}function it(e){let t=[];for(let n=0;n<128;n++){let r=n<e.banks.length,i=`Preset ${n+1}`,a=`Second. ${n+1}`,o=0,s=[];if(r){let t=e.banks[n],r=new Set,c=[];if(Object.keys(t).forEach(n=>{z.forEach(({id:i})=>{t[n][i].forEach(t=>{let n=Y(t,e.channels);r.add(n.deviceName.toUpperCase()),c.length<2&&c.push(`${n.deviceName} ${n.label}`),o||=V.getDeviceAccentColorInt(t.device),s.push({statusByte:n.message.statusByte,dataByte1:n.message.dataByte1,dataByte2:n.message.dataByte2,outputs:{usbd:!0,ble:!0,midi1:!0}})})})}),s.length>0){let e=Array.from(r);i=e.length?e.join(` + `):`BANK ${n+1}`,a=c.join(` · `)||`Bank ${n+1}`}}t.push({bankId:n,bankName:i,secondaryText:a,colourOverride:s.length>0,colour:s.length>0?o||582655:0,textColourOverride:s.length>0,textColour:s.length>0?16777215:0,midiValueDisplayOverride:!1,midiValueDisplay:s.length>0?`valueOnly`:`none`,midiValueDisplayCC:0,bpm:120,switches:[{pressMessages:{numMessages:0,messages:[]},holdMessages:{numMessages:0,messages:[]}},{pressMessages:{numMessages:0,messages:[]},holdMessages:{numMessages:0,messages:[]}}],customMessages:{numMessages:0,messages:[]},presetMessages:{numMessages:s.length,messages:s}})}return{deviceSettings:{deviceModel:`Scribble`,firmwareVersion:`1.0.1-beta.2`,hardwareVersion:`1.x.0`,deviceName:`Scribble`,uId:0x9070692f06d8,profileId:0},globalSettings:{deviceName:`Scribble`,currentBank:0,lightMode:`dark`,mainColour:15199215,textColour:0,displayBrightness:100,midiChannel:1,globalBpm:120,midiOutPortMode:`midiOutA`,bankPcMidiOutputs:{usbd:0,ble:0,midi1:0},clockMode:`external`,clockDisplayType:`bpm`,tapTempoQuant:`none`,usbdThruHandles:{usbd:!0,ble:!0,midi1:!0},bleThruHandles:{usbd:!0,ble:!0,midi1:!0},midi1ThruHandles:{usbd:!0,ble:!0,midi1:!0},midiClockOutHandles:{usbd:!0,ble:!0,midi1:!0},switches:[{mode:`pressPresetDown`,pressMessages:{numMessages:0,messages:[]},holdMessages:{numMessages:0,messages:[]}},{mode:`pressPresetUp`,pressMessages:{numMessages:0,messages:[]},holdMessages:{numMessages:0,messages:[]}}],customMessages:{numMessages:0,messages:[]},presetUpCC:1,presetDownCC:2,goToPresetCC:3,globalCustomMessagesCC:17,presetCustomMessagesCC:16,midiValueDisplay:`valueOnly`,midiValueDisplayCC:7,wirelessType:`ble`,bleMode:`server`,mainTextResize:!1,zeroIndexBanks:!1,kemperPlayerMode:!1,useStaticIp:!1,staticIp:`0.0.0.0`,gatewayIp:`0.0.0.0`},presetSettings:t}}var at=class{constructor(){this.id=`scribble`,this.name=`Pirate MIDI Scribble`}compileExport(e){let t=it(e);return{filename:`scribble.json`,mimeType:`application/json`,content:JSON.stringify(t,null,2)}}compilePreview(e){let t=it(e);return JSON.stringify(t,null,2).split(`
`).map(e=>({text:e||` `}))}},ot=class{constructor(){this.id=`labels`,this.name=`Printable Labels`}compileExport(e){let t=this.compilePreview(e);return{filename:`stomp-labels-${e.controllerId}.txt`,mimeType:`text/plain`,content:t.map(e=>e.text).join(`
`)}}compilePreview(e){let t=[],n=(e,n)=>{t.push({text:e===``?` `:e,...n})},r=V.getController(e.controllerId),i=V.getBrain(e.brainId);return n(`STOMP STACKS · ${r.name}`,{bold:!0}),n(`via ${i.full.toLowerCase()}`,{muted:!0}),rt(e,(t,r,i,a,o)=>{n(``),n(`bank ${t+1}  ·  switch ${r}  ·  ${a.label}`,{bold:!0}),o.forEach((t,r)=>{let i=Y(t,e.channels);n(`   ${r+1}. ${i.deviceName} — ${i.label}`)})}),t.length||n(`nothing stacked yet — go poke a pedal`,{muted:!0}),t}},st=e=>e.toString(16).toUpperCase().padStart(2,`0`),ct=class{constructor(){this.id=`trace`,this.name=`MIDI Trace Log`}compileExport(e){let t=this.compilePreview(e);return{filename:`midi-trace-${e.controllerId}.txt`,mimeType:`text/plain`,content:t.map(e=>e.text).join(`
`)}}compilePreview(e){let t=[],n=(e,n)=>{t.push({text:e===``?` `:e,...n})};return rt(e,(t,r,i,a,o)=>{n(`▸ bank ${t+1} · ${r} ${a.label}`,{bold:!0}),o.forEach(t=>{let r=Y(t,e.channels);n(`    ${st(176+r.channel-1)} ${st(r.cc)} ${st(r.value)}    ${r.deviceName} ${r.label}`,{muted:!0})}),n(``)}),t.length||n(`nothing stacked yet — go poke a pedal`,{muted:!0}),t}},X={rig:new $e,mc3:new nt,scribble:new at,labels:new ot,trace:new ct};function lt(e){let t=V.getBrain(e.brainId),n=V.getController(e.controllerId),r=[],i=0,a=0;rt(e,(e,n,r,o,s)=>{s.length>t.maxSteps&&(i++,s.length>a&&(a=s.length))}),i&&r.push({type:`warn`,text:`${i} stack${i===1?``:`s`} run to ${a} messages — ${t.full.toLowerCase()} sends ${t.maxSteps}${e.brainId===`none`?`. this is the case for a brain.`:`. trim them or move up.`}`}),e.banks.length>t.banks&&r.push({type:`warn`,text:`${n.name} has ${e.banks.length} banks; ${t.full.toLowerCase()} holds ${t.banks}.`}),e.brainId===`onboard`&&!n.onboard&&r.push({type:`warn`,text:`${n.name} can't hold stacks onboard — it only sends one message per switch.`});let o=Xe(e).filter(t=>!e.rig.includes(t));return o.length&&r.push({type:`warn`,text:`${o.map(e=>V.getDevice(e)?.name||e).join(` + `)} ${o.length===1?`is`:`are`} stacked but no longer in the rig — those steps won't be sent.`}),V.detectChannelCollisions(e.rig,e.channels).forEach(({channel:e,devices:t})=>{r.push({type:`warn`,text:`${t.join(` + `)} are both on channel ${e} — their cc numbers will collide.`})}),e.targetId===`mc3`&&e.controllerId!==`mc3`&&r.push({type:`warn`,text:`building an mc3 preset, but the rig is set to ${n.name}.`}),e.targetId===`scribble`&&e.brainId!==`scribble`&&r.push({type:`warn`,text:`building a scribble config, but the brain is set to ${t.full.toLowerCase()}.`}),r.length||r.push({type:`ok`,text:`all clear — nothing collides, nothing overflows.`}),r}var ut=class{static compile(e,t=e.targetId){let n=X[t]||X.rig;return{targetId:t,exportFile:n.compileExport(e),preview:n.compilePreview(e),diagnostics:lt(e)}}static getAdapter(e){return X[e]||X.rig}};ut.compile;var Z=class extends A{constructor(...e){super(...e),this.phone=!1,this.desktop=!1}static{this.styles=[N,P,F,o`
      :host {
        display: flex;
        flex-direction: column;
        background: var(--card);
      }
      :host(:not([phone])) {
        width: 340px;
        flex: none;
        border-left: 2.5px solid var(--ink);
      }
      :host([desktop]) {
        width: 380px;
      }
      :host([phone]) {
        flex: none;
        border-top: 2.5px solid var(--ink);
        border-radius: 20px 20px 0 0;
        transition: max-height 260ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      .grabber {
        display: none;
        width: 44px;
        height: 5px;
        margin: 8px auto 6px;
        border-radius: 3px;
        background: rgba(22, 50, 61, 0.3);
        padding: 0;
      }
      :host([phone]) .grabber {
        display: block;
      }
      .head {
        flex: none;
        padding: 12px 16px 13px;
        background: var(--panel-warm);
        border-bottom: 2.5px solid var(--ink);
      }
      :host([desktop]) .head {
        padding: 15px 18px 13px;
      }
      .head-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
      }
      .title {
        flex: 1;
        font-size: 15.5px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      :host([desktop]) .title {
        font-size: 16px;
      }
      .capacity {
        font-family: var(--mono);
        font-size: 11px;
        padding: 3px 9px;
        border-radius: 11px;
        border: 2px solid var(--ink);
      }
      .chevron {
        width: 28px;
        height: 28px;
        flex: none;
        border-radius: 50%;
        border: 2px solid var(--ink);
        font-size: 13px;
        line-height: 1;
        display: none;
        align-items: center;
        justify-content: center;
      }
      :host([phone]) .chevron {
        display: flex;
      }
      .tabs {
        display: flex;
        gap: 6px;
      }
      .tab {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        padding: 7px 0;
        border-radius: 15px;
        font-size: 13px;
        font-weight: 500;
        border: 2.5px solid var(--ink);
        transition:
          background 150ms ease,
          box-shadow 150ms ease;
      }
      .tab-count {
        font-family: var(--mono);
        font-size: 10px;
        min-width: 17px;
        padding: 1px 0;
        border-radius: 9px;
      }
      .popover {
        flex: none;
        padding: 13px 16px;
        border-bottom: 2.5px solid var(--ink);
        background: var(--popover-bg);
        animation: sheetIn 180ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      :host([desktop]) .popover {
        padding: 15px 18px;
      }
      .popover-head {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 10px;
      }
      .pop-dot {
        width: 14px;
        height: 14px;
        border-radius: 5px;
        flex: none;
        border: 2px solid var(--ink);
      }
      .pop-title {
        flex: 1;
        font-size: 13.5px;
        font-weight: 600;
      }
      .pop-close {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 2px solid var(--ink);
        font-size: 13px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pop-options {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .pop-option {
        padding: 7px 13px;
        border-radius: 14px;
        font-size: 13px;
        border: 2px solid var(--ink);
        background: var(--card);
        transition:
          background 150ms ease,
          box-shadow 150ms ease;
      }
      .list {
        flex: 1;
        min-height: 0;
        overflow: auto;
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: var(--card);
      }
      :host([desktop]) .list {
        padding: 14px;
        gap: 9px;
      }
      .empty {
        text-align: center;
        padding: 24px 18px;
        border-radius: 18px;
        border: 2.5px dashed rgba(22, 50, 61, 0.3);
      }
      :host([desktop]) .empty {
        padding: 30px 22px;
        border-radius: 20px;
      }
      .creature {
        width: 44px;
        height: 44px;
        margin: 0 auto 13px;
        border-radius: 14px;
        background: var(--sky);
        border: 2.5px solid var(--ink);
        position: relative;
        animation: bob 2.6s ease-in-out infinite;
      }
      .creature-eye {
        position: absolute;
        top: 16px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: var(--ink);
      }
      .creature-mouth {
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
        width: 14px;
        height: 7px;
        border-bottom: 2.5px solid var(--ink);
        border-radius: 0 0 14px 14px;
      }
      .empty-title {
        font-size: 13.5px;
        font-weight: 600;
        margin-bottom: 4px;
      }
      :host([desktop]) .empty-title {
        font-size: 14px;
        margin-bottom: 5px;
      }
      .empty-body {
        font-size: 12.5px;
        line-height: 1.5;
        opacity: 0.6;
        text-wrap: pretty;
      }
      .row {
        flex: none;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 12px;
        border-radius: 16px;
        border: 2.5px solid var(--ink);
        background: var(--card);
        box-shadow: 3px 3px 0 var(--ink);
        animation: stepIn 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .row-num {
        width: 22px;
        height: 22px;
        flex: none;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: var(--mono);
        font-size: 11px;
        background: var(--ink);
        color: var(--card);
      }
      .row-dot {
        width: 13px;
        height: 13px;
        flex: none;
        border-radius: 5px;
        border: 2px solid var(--ink);
      }
      .row-text {
        flex: 1;
        min-width: 0;
      }
      .row-label {
        display: block;
        font-size: 13.5px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .row-meta {
        display: block;
        font-family: var(--mono);
        font-size: 10px;
        opacity: 0.55;
      }
      .row-actions {
        display: flex;
        gap: 4px;
        flex: none;
      }
      .nav-btn {
        width: 30px;
        height: 30px;
        border-radius: 9px;
        border: 2px solid var(--ink);
        font-size: 12px;
        line-height: 1;
        transition: background 140ms ease;
      }
      :host([desktop]) .nav-btn {
        width: 24px;
        height: 24px;
        border-radius: 8px;
        font-size: 11px;
      }
      .nav-btn[disabled] {
        opacity: 0.25;
        pointer-events: none;
      }
      .remove-btn {
        width: 30px;
        height: 30px;
        border-radius: 9px;
        border: 2px solid var(--ink);
        font-size: 13px;
        line-height: 1;
        transition:
          background 140ms ease,
          color 140ms ease;
      }
      .remove-btn:hover {
        background: var(--coral);
        color: var(--card);
      }
      :host([desktop]) .remove-btn {
        width: 24px;
        height: 24px;
        border-radius: 8px;
        font-size: 12px;
      }
      .full-notice {
        padding: 9px 13px;
        border-radius: 14px;
        background: var(--full-bg);
        border: 2px solid var(--ink);
        font-size: 12.5px;
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new W(this,this.store)}render(){let e=this.store.state,t=e.banks[e.bank],n=this.store.activeStack,r=e.sheetOpen||!this.phone;this.phone?this.style.maxHeight=r?`56%`:`none`:this.style.maxHeight=``;let i=V.getDevice(e.browseDevice),a=e.popoverControlId?V.getControl(e.browseDevice,e.popoverControlId):null;return C`
      <button class="grabber" @click=${()=>this.store.toggleSheet()}></button>

      <div class="head">
        <div class="head-row">
          <div class="title">switch ${e.selectedKey} macro</div>
          <span class="capacity" style=${n.length>=U?`background:var(--full-border-bg)`:`background:transparent`}
            >${n.length} / ${U}</span
          >
          <button class="chevron" @click=${()=>this.store.toggleSheet()}>${r?`⌄`:`⌃`}</button>
        </div>
        <div class="tabs">
          ${z.map(({id:n,label:r})=>{let i=t[e.selectedKey][n].length,a=e.action===n;return C`
              <button
                class="tab"
                style=${a?`background:var(--mustard);box-shadow:2px 2px 0 var(--ink)`:`background:transparent;opacity:.6`}
                @click=${()=>this.store.selectAction(n)}
              >
                <span>${r}</span>
                <span class="tab-count" style="background:${a?`var(--ink)`:`rgba(22,50,61,.14)`};color:${a?`var(--mustard)`:`var(--ink)`}"
                  >${i}</span
                >
              </button>
            `})}
        </div>
      </div>

      ${a&&i?C`
            <div class="popover">
              <div class="popover-head">
                <span class="pop-dot" style="background:${i.accent}"></span>
                <span class="pop-title">${a.label} lands on…</span>
                <button class="pop-close" @click=${()=>this.store.closePopover()}>×</button>
              </div>
              <div class="pop-options">
                ${V.valueOptionsFor(a).map(t=>C`
                    <button
                      class="pop-option"
                      style=${n.some(n=>n.device===e.browseDevice&&n.control===a.id&&n.value===t.value)?`background:var(--sky);font-weight:600;box-shadow:2px 2px 0 var(--ink)`:``}
                      @click=${()=>this.store.addStep(a.id,t.value)}
                    >
                      ${t.label}
                    </button>
                  `)}
              </div>
            </div>
          `:null}
      ${r?C`
            <div class="list">
              ${n.length===0?C`
                    <div class="empty">
                      ${this.desktop?C`
                            <div class="creature">
                              <span class="creature-eye" style="left:11px"></span>
                              <span class="creature-eye" style="right:11px"></span>
                              <span class="creature-mouth"></span>
                            </div>
                          `:null}
                      <div class="empty-title">nothing stacked yet</div>
                      <div class="empty-body">
                        ${this.phone?`tap`:`poke`} any knob or switch on the pedal${this.phone?` above`:``}. mix pedals freely — up to 8
                        per stomp.
                      </div>
                    </div>
                  `:n.map((e,t)=>{let r=Y(e);return C`
                      <div class="row">
                        <span class="row-num">${t+1}</span>
                        <span class="row-dot" style="background:${r.accent}"></span>
                        <span class="row-text">
                          <span class="row-label">${r.label}</span>
                          <span class="row-meta">${r.deviceName} · cc${r.cc} · ${r.value}</span>
                        </span>
                        <span class="row-actions">
                          <button class="nav-btn" ?disabled=${t===0} @click=${()=>this.store.moveStep(t,-1)}>↑</button>
                          <button class="nav-btn" ?disabled=${t===n.length-1} @click=${()=>this.store.moveStep(t,1)}>↓</button>
                          <button class="remove-btn" @click=${()=>this.store.removeStep(t)}>×</button>
                        </span>
                      </div>
                    `})}
              ${n.length>=U?C`<div class="full-notice">stack's full — 8 is the limit. drop one to add another.</div>`:null}
            </div>
          `:null}
    `}};G([M({attribute:!1})],Z.prototype,`store`,void 0),G([M({type:Boolean,reflect:!0})],Z.prototype,`phone`,void 0),G([M({type:Boolean,reflect:!0})],Z.prototype,`desktop`,void 0),Z=G([j(`macro-panel`)],Z);function dt(e,t){let n=new Blob([JSON.stringify(t,null,2)],{type:`application/json`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=e,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(r)}function ft(e,t){let n=new Blob([t],{type:`text/plain;charset=utf-8`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=e,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(r)}var Q=class extends A{constructor(...e){super(...e),this.phone=!1}static{this.styles=[N,P,I,F,o`
      .panel {
        width: 880px;
        max-width: 100%;
        max-height: 88vh;
        display: flex;
        flex-direction: column;
        background: var(--card);
        border: 2.5px solid var(--ink);
        border-radius: 26px;
        box-shadow: 8px 8px 0 var(--ink);
        overflow: hidden;
      }
      :host([phone]) .panel {
        width: 100%;
        border-radius: 24px 24px 0 0;
        box-shadow: none;
      }
      :host([phone]) .scrim {
        align-items: flex-end;
        padding: 0;
      }
      .head {
        flex: none;
        padding: 20px 24px 16px;
        border-bottom: 2.5px solid var(--ink);
        background: var(--panel-warm);
      }
      .title {
        font-size: 19px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      .meta {
        font-size: 12.5px;
        opacity: 0.65;
        margin-top: 5px;
        text-wrap: pretty;
      }
      .body {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: row;
      }
      :host([phone]) .body {
        flex-direction: column;
      }
      .targets-sidebar {
        width: 216px;
        flex: none;
        display: flex;
        flex-direction: column;
        gap: 7px;
        padding: 14px;
        border-right: 2.5px solid var(--ink);
        background: var(--paper);
      }
      :host([phone]) .targets-sidebar {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 7px;
        padding: 12px 16px;
        overflow-x: auto;
        border-right: 0;
        border-bottom: 2.5px solid var(--ink);
      }
      .target-btn {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1px;
        flex: none;
        white-space: nowrap;
        padding: 9px 11px;
        border-radius: 14px;
        text-align: left;
        border: 2.5px solid var(--ink);
        transition:
          background 150ms ease,
          box-shadow 150ms ease;
      }
      .target-btn[active] {
        background: var(--card);
        box-shadow: 3px 3px 0 var(--ink);
      }
      .target-btn:not([active]) {
        background: transparent;
        border-color: rgba(22, 50, 61, 0.22);
        opacity: 0.62;
      }
      .target-label {
        font-size: 13.5px;
        font-weight: 600;
      }
      .target-sub {
        font-family: var(--mono);
        font-size: 10px;
        opacity: 0.6;
      }
      .main-content {
        flex: 1;
        min-width: 0;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .preview-area {
        flex: 1;
        min-height: 0;
        overflow: auto;
        padding: 16px 24px;
        font-family: var(--mono);
        font-size: 11.5px;
        line-height: 1.75;
        height: 318px;
        white-space: pre-wrap;
      }
      .issues-box {
        flex: none;
        border-top: 2.5px solid var(--ink);
        padding: 12px 20px;
        display: flex;
        flex-direction: column;
        gap: 6px;
        background: var(--card);
      }
      .issue-row {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        font-size: 12px;
        line-height: 1.45;
      }
      .issue-dot {
        width: 9px;
        height: 9px;
        flex: none;
        margin-top: 4px;
        border-radius: 3px;
        border: 2px solid var(--ink);
      }
      .foot {
        flex: none;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 20px;
        border-top: 2.5px solid var(--ink);
        background: var(--card);
      }
      .target-note {
        font-family: var(--mono);
        font-size: 11px;
        opacity: 0.5;
      }
      :host([phone]) .target-note {
        display: none;
      }
      .spacer {
        flex: 1;
      }
      .btn-close {
        padding: 10px 16px;
        border-radius: 20px;
        font-size: 13.5px;
        opacity: 0.6;
        transition: opacity 150ms ease;
      }
      .btn-close:hover {
        opacity: 1;
      }
      .btn-download {
        padding: 10px 20px;
        border-radius: 22px;
        background: var(--sky);
        border: 2.5px solid var(--ink);
        box-shadow: 3px 3px 0 var(--ink);
        font-size: 14px;
        font-weight: 600;
        transition:
          transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .btn-download:active {
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0 var(--ink);
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new W(this,this.store)}handleDownload(){let e=this.store.state,t=ut.compile(e);t.exportFile.mimeType===`application/json`?dt(t.exportFile.filename,JSON.parse(t.exportFile.content)):ft(t.exportFile.filename,t.exportFile.content)}render(){let e=this.store.state;if(!e.compileOpen)return null;let t=this.store.totalAssigned,n=V.getController(e.controllerId),r=V.getBrain(e.brainId),i=e.rig.length?e.rig.map(e=>V.getDevice(e)?.name||e).join(`, `):`no pedals yet`,a=`${t} ${t===1?`message`:`messages`} · ${n.short} → ${r.short} → ${i}`,o=V.getTarget(e.targetId),s=ut.compile(e),c=s.preview,l=s.diagnostics;return C`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this.store.closeCompile()}>
        <div class="panel sheet-in">
          <div class="head">
            <div class="title">one stomp stacks config, freshly cooked</div>
            <div class="meta">${a}</div>
          </div>
          <div class="body">
            <div class="targets-sidebar">
              ${Ve.map(t=>C`
                  <button
                    class="target-btn"
                    ?active=${e.targetId===t.id}
                    @click=${()=>this.store.setTarget(t.id)}
                  >
                    <span class="target-label">${t.label}</span>
                    <span class="target-sub">${t.sub}</span>
                  </button>
                `)}
            </div>
            <div class="main-content">
              <div class="preview-area">
                ${c.map(e=>C`<div style=${e.muted?`white-space:pre;opacity:.42`:e.bold?`white-space:pre;font-weight:600`:`white-space:pre;opacity:.85`}>${e.text}</div>`)}
              </div>
              <div class="issues-box">
                ${l.map(e=>C`
                    <div class="issue-row" style=${e.type===`ok`?`opacity:.6`:``}>
                      <span class="issue-dot" style="background:${e.type===`ok`?`#5bb85b`:`var(--mustard)`}"></span>
                      <span style="flex:1;text-wrap:pretty">${e.text}</span>
                    </div>
                  `)}
              </div>
            </div>
          </div>
          <div class="foot">
            <span class="target-note">${o.note}</span>
            <span class="spacer"></span>
            <button class="btn-close" @click=${()=>this.store.closeCompile()}>close</button>
            <button class="btn-download" @click=${()=>this.handleDownload()}>
              grab ${o.label}
            </button>
          </div>
        </div>
      </div>
    `}};G([M({attribute:!1})],Q.prototype,`store`,void 0),G([M({type:Boolean,reflect:!0})],Q.prototype,`phone`,void 0),Q=G([j(`compile-modal`)],Q);var pt=[{id:`photo`,label:`photo`},{id:`drawn`,label:`sketch`}],mt=class extends A{static{this.styles=[N,P,I,F,o`
      .panel {
        width: 440px;
        max-width: 100%;
        background: var(--card);
        border: 2.5px solid var(--ink);
        border-radius: 26px;
        overflow: hidden;
        box-shadow: 8px 8px 0 var(--ink);
      }
      .head {
        padding: 22px 24px 16px;
        border-bottom: 2.5px solid var(--ink);
        background: var(--panel-warm);
      }
      .head-title {
        font-size: 19px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      .body {
        padding: 20px 24px;
      }
      .group-title {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 4px;
      }
      .group-body {
        font-size: 12.5px;
        opacity: 0.6;
        margin-bottom: 12px;
        text-wrap: pretty;
      }
      .tabs {
        display: flex;
        gap: 8px;
      }
      .tab {
        flex: 1;
        padding: 11px 0;
        border-radius: 16px;
        font-size: 14px;
        font-weight: 600;
        border: 2.5px solid var(--ink);
        transition:
          background 150ms ease,
          box-shadow 150ms ease;
      }
      .foot {
        display: flex;
        justify-content: flex-end;
        padding: 16px 24px;
        border-top: 2.5px solid var(--ink);
      }
      .btn-done {
        padding: 10px 20px;
        border-radius: 22px;
        background: var(--mustard);
        border: 2.5px solid var(--ink);
        box-shadow: 3px 3px 0 var(--ink);
        font-size: 14px;
        font-weight: 600;
        transition:
          transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .btn-done:active {
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0 var(--ink);
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new W(this,this.store)}render(){let e=this.store.state;return e.settingsOpen?C`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this.store.closeSettings()}>
        <div class="panel sheet-in">
          <div class="head"><div class="head-title">settings</div></div>
          <div class="body">
            <div class="group-title">pedal artwork</div>
            <div class="group-body">photos of the real pedals, or clean sketches with every control labelled.</div>
            <div class="tabs">
              ${pt.map(t=>C`
                  <button
                    class="tab"
                    style=${e.face===t.id?`background:var(--sky);box-shadow:2px 2px 0 var(--ink)`:`background:transparent;opacity:.55`}
                    @click=${()=>this.store.setFace(t.id)}
                  >
                    ${t.label}
                  </button>
                `)}
            </div>
          </div>
          <div class="foot"><button class="btn-done" @click=${()=>this.store.closeSettings()}>done</button></div>
        </div>
      </div>
    `:null}};G([M({attribute:!1})],mt.prototype,`store`,void 0),mt=G([j(`settings-modal`)],mt);var ht=class extends A{static{this.styles=[N,P,I,F,o`
      .panel {
        width: 470px;
        max-width: 100%;
        background: var(--card);
        border: 2.5px solid var(--ink);
        border-radius: 26px;
        overflow: hidden;
        box-shadow: 8px 8px 0 var(--ink);
      }
      .head {
        padding: 22px 24px 16px;
        border-bottom: 2.5px solid var(--ink);
        background: var(--panel-warm);
      }
      .head-title {
        font-size: 19px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      .head-sub {
        font-size: 12.5px;
        opacity: 0.65;
        margin-top: 4px;
      }
      .body {
        padding: 18px 24px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .tile {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 13px;
        border-radius: 18px;
        text-align: left;
        border: 2.5px solid var(--ink);
        transition:
          background 160ms ease,
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .tile-strip {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 96px;
        height: 44px;
        flex: none;
        border-radius: 10px;
        background: var(--ink);
      }
      .tile-cap {
        width: 13px;
        height: 13px;
        border-radius: 50%;
        background: rgba(247, 241, 227, 0.55);
      }
      .tile-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
        min-width: 0;
      }
      .tile-name {
        font-size: 15px;
        font-weight: 600;
      }
      .tile-sub {
        font-family: var(--mono);
        font-size: 10.5px;
        opacity: 0.6;
      }
      .foot {
        display: flex;
        justify-content: flex-end;
        padding: 16px 24px;
        border-top: 2.5px solid var(--ink);
      }
      .btn-done {
        padding: 10px 20px;
        border-radius: 22px;
        background: var(--mustard);
        border: 2.5px solid var(--ink);
        box-shadow: 3px 3px 0 var(--ink);
        font-size: 14px;
        font-weight: 600;
      }
      .btn-done:active {
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0 var(--ink);
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new W(this,this.store)}render(){let e=this.store.state;return e.controllerPickerOpen?C`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this.store.closeControllerPicker()}>
        <div class="panel sheet-in">
          <div class="head">
            <div class="head-title">what are you stomping on?</div>
            <div class="head-sub">switching controllers starts a fresh set of stacks.</div>
          </div>
          <div class="body">
            ${ze.map(t=>{let n=R[t];return C`
                <button
                  class="tile"
                  style=${e.controllerId===t?`background:var(--panel-warm);box-shadow:3px 3px 0 var(--ink)`:`background:var(--paper)`}
                  @click=${()=>this.store.switchController(t)}
                >
                  <span class="tile-strip">${n.keys.map(()=>C`<span class="tile-cap"></span>`)}</span>
                  <span class="tile-info">
                    <span class="tile-name">${n.name}</span>
                    <span class="tile-sub">${n.sub}</span>
                  </span>
                </button>
              `})}
          </div>
          <div class="foot"><button class="btn-done" @click=${()=>this.store.closeControllerPicker()}>done</button></div>
        </div>
      </div>
    `:null}};G([M({attribute:!1})],ht.prototype,`store`,void 0),ht=G([j(`controller-picker-modal`)],ht);var gt=class extends A{static{this.styles=[N,P,I,F,o`
      .panel {
        width: 500px;
        max-width: 100%;
        max-height: 90vh;
        overflow: auto;
        background: var(--card);
        border: 2.5px solid var(--ink);
        border-radius: 26px;
        box-shadow: 8px 8px 0 var(--ink);
        display: flex;
        flex-direction: column;
      }
      .head {
        padding: 22px 24px 16px;
        border-bottom: 2.5px solid var(--ink);
        background: var(--panel-warm);
      }
      .title {
        font-size: 19px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      .sub {
        font-size: 12.5px;
        opacity: 0.65;
        margin-top: 4px;
        text-wrap: pretty;
      }
      .tiles {
        padding: 18px 24px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .tile {
        display: flex;
        align-items: center;
        gap: 13px;
        padding: 13px;
        border-radius: 18px;
        text-align: left;
        border: 2.5px solid var(--ink);
        background: var(--paper);
        transition:
          background 160ms ease,
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .tile[active] {
        background: var(--panel-warm);
        box-shadow: 3px 3px 0 var(--ink);
      }
      .icon-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        flex: none;
        border-radius: 14px;
        font-size: 17px;
        border: 2.5px solid var(--ink);
      }
      .tile-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
        min-width: 0;
        flex: 1;
      }
      .tile-title {
        font-size: 15px;
        font-weight: 600;
      }
      .tile-sub {
        font-size: 11.5px;
        opacity: 0.65;
        text-wrap: pretty;
      }
      .cap-tag {
        flex: none;
        font-family: var(--mono);
        font-size: 10px;
        padding: 3px 9px;
        border-radius: 11px;
        border: 2px solid var(--ink);
        background: var(--card);
      }
      .foot {
        display: flex;
        justify-content: flex-end;
        padding: 16px 24px;
        border-top: 2.5px solid var(--ink);
      }
      .btn-done {
        padding: 10px 20px;
        border-radius: 22px;
        background: var(--mustard);
        border: 2.5px solid var(--ink);
        box-shadow: 3px 3px 0 var(--ink);
        font-size: 14px;
        font-weight: 600;
      }
      .btn-done:active {
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0 var(--ink);
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new W(this,this.store)}render(){let e=this.store.state;return e.brainPickerOpen?C`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this.store.closeBrainPicker()}>
        <div class="panel sheet-in">
          <div class="head">
            <div class="title">what turns one stomp into a stack?</div>
            <div class="sub">the stacks stay the same either way — this only changes what you export and what fits.</div>
          </div>
          <div class="tiles">
            ${Be.map(t=>{let n=B[t],r=e.brainId===t,i=n.maxSteps===1?`1 msg`:`up to ${n.maxSteps}`;return C`
                <button class="tile" ?active=${r} @click=${()=>this.store.setBrain(t)}>
                  <span class="icon-box" style="background:${n.colour}">${n.icon}</span>
                  <span class="tile-text">
                    <span class="tile-title">${n.full}</span>
                    <span class="tile-sub">${n.sub}</span>
                  </span>
                  <span class="cap-tag">${i}</span>
                </button>
              `})}
          </div>
          <div class="foot">
            <button class="btn-done" @click=${()=>this.store.closeBrainPicker()}>done</button>
          </div>
        </div>
      </div>
    `:null}};G([M({attribute:!1})],gt.prototype,`store`,void 0),gt=G([j(`brain-picker-modal`)],gt);var _t=class extends A{static{this.styles=[N,P,I,F,o`
      .panel {
        width: 480px;
        max-width: 100%;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        background: var(--card);
        border: 2.5px solid var(--ink);
        border-radius: 26px;
        overflow: hidden;
        box-shadow: 8px 8px 0 var(--ink);
      }
      .head {
        flex: none;
        padding: 22px 24px 16px;
        border-bottom: 2.5px solid var(--ink);
        background: var(--panel-warm);
      }
      .title {
        font-size: 19px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      .sub {
        font-size: 12.5px;
        opacity: 0.65;
        margin-top: 4px;
        text-wrap: pretty;
      }
      .body {
        flex: 1;
        min-height: 0;
        overflow: auto;
        padding: 18px 24px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .tile {
        display: flex;
        align-items: center;
        gap: 13px;
        padding: 13px;
        border-radius: 18px;
        text-align: left;
        border: 2.5px solid var(--ink);
        background: var(--paper);
        transition:
          background 160ms ease,
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .tile:hover {
        background: var(--card);
        box-shadow: 3px 3px 0 var(--ink);
      }
      .dot {
        width: 44px;
        height: 44px;
        flex: none;
        border-radius: 14px;
        border: 2.5px solid var(--ink);
      }
      .text-wrap {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2px;
        min-width: 0;
        flex: 1;
      }
      .pedal-name {
        font-size: 15px;
        font-weight: 600;
      }
      .pedal-sub {
        font-size: 11.5px;
        opacity: 0.65;
      }
      .tag {
        flex: none;
        font-family: var(--mono);
        font-size: 10px;
        padding: 3px 9px;
        border-radius: 11px;
        border: 2px solid var(--ink);
        background: var(--card);
      }
      .exhausted {
        padding: 16px 18px;
        border-radius: 18px;
        border: 2.5px dashed rgba(22, 50, 61, 0.3);
        font-size: 12.5px;
        line-height: 1.5;
        opacity: 0.7;
        text-wrap: pretty;
      }
      .foot {
        flex: none;
        display: flex;
        justify-content: flex-end;
        padding: 16px 24px;
        border-top: 2.5px solid var(--ink);
      }
      .btn-done {
        padding: 10px 20px;
        border-radius: 22px;
        background: var(--mustard);
        border: 2.5px solid var(--ink);
        box-shadow: 3px 3px 0 var(--ink);
        font-size: 14px;
        font-weight: 600;
      }
      .btn-done:active {
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0 var(--ink);
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new W(this,this.store)}render(){let e=this.store.state;if(!e.addPedalOpen)return null;let t=Re.filter(t=>!e.rig.includes(t)),n=t.length===0;return C`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this.store.closeAddPedal()}>
        <div class="panel sheet-in">
          <div class="head">
            <div class="title">add a pedal to the rig</div>
            <div class="sub">only the pedals in your rig get tabs, a channel, and a place in the export.</div>
          </div>
          <div class="body">
            ${t.map(t=>{let n=V.getDevice(t),r=e.channels[t]||this.store.nextFreeChannel(e.rig,e.channels);return C`
                <button class="tile" @click=${()=>this.store.addPedal(t)}>
                  <span class="dot" style="background:${n.accent}"></span>
                  <span class="text-wrap">
                    <span class="pedal-name">${n.name}</span>
                    <span class="pedal-sub">${n.sub}</span>
                  </span>
                  <span class="tag">ch ${r}</span>
                </button>
              `})}
            ${n?C`
                  <div class="exhausted">
                    that's every pedal we know so far. missing yours? send us the midi implementation chart and we'll map it.
                  </div>
                `:null}
          </div>
          <div class="foot">
            <button class="btn-done" @click=${()=>this.store.closeAddPedal()}>done</button>
          </div>
        </div>
      </div>
    `}};G([M({attribute:!1})],_t.prototype,`store`,void 0),_t=G([j(`add-pedal-modal`)],_t);var vt=class extends A{static{this.styles=[N,P,I,F,o`
      .panel {
        width: 420px;
        max-width: 100%;
        background: var(--card);
        border: 2.5px solid var(--ink);
        border-radius: 26px;
        overflow: hidden;
        box-shadow: 8px 8px 0 var(--ink);
      }
      .body {
        padding: 22px 24px 18px;
      }
      .head-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 11px;
      }
      .dot {
        width: 34px;
        height: 34px;
        flex: none;
        border-radius: 11px;
        border: 2.5px solid var(--ink);
      }
      .title {
        font-size: 18px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      .desc {
        font-size: 13px;
        line-height: 1.5;
        opacity: 0.7;
        text-wrap: pretty;
      }
      .foot {
        display: flex;
        justify-content: flex-end;
        gap: 9px;
        padding: 16px 24px;
        border-top: 2.5px solid var(--ink);
      }
      .btn-cancel {
        padding: 10px 16px;
        border-radius: 20px;
        font-size: 13.5px;
        opacity: 0.6;
        transition: opacity 150ms ease;
      }
      .btn-cancel:hover {
        opacity: 1;
      }
      .btn-remove {
        padding: 10px 20px;
        border-radius: 22px;
        background: var(--coral);
        border: 2.5px solid var(--ink);
        box-shadow: 3px 3px 0 var(--ink);
        font-size: 14px;
        font-weight: 600;
        transition:
          transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .btn-remove:active {
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0 var(--ink);
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new W(this,this.store)}countStackedSteps(e){let t=0;return this.store.state.banks.forEach(n=>{Object.keys(n).forEach(r=>{z.forEach(i=>{n[r][i.id].forEach(n=>{n.device===e&&t++})})})}),t}render(){let e=this.store.state;if(!e.confirmRemovePedal)return null;let t=e.confirmRemovePedal,n=L[t];if(!n)return null;let r=this.countStackedSteps(t),i=`nothing is stacked on it yet, so nothing is lost. add it back any time.`;return r===1?i=`1 step across your banks uses it. that step stays put, but it won't be sent until you add it back — the export will flag it.`:r>1&&(i=`${r} steps across your banks use it. those steps stay put, but they won't be sent until you add it back — the export will flag them.`),C`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this.store.setConfirmRemove(null)}>
        <div class="panel sheet-in">
          <div class="body">
            <div class="head-row">
              <span class="dot" style="background:${n.accent}"></span>
              <span class="title">take ${n.name} out?</span>
            </div>
            <div class="desc">${i}</div>
          </div>
          <div class="foot">
            <button class="btn-cancel" @click=${()=>this.store.setConfirmRemove(null)}>keep it</button>
            <button class="btn-remove" @click=${()=>this.store.dropPedal(t)}>take it out</button>
          </div>
        </div>
      </div>
    `}};G([M({attribute:!1})],vt.prototype,`store`,void 0),vt=G([j(`confirm-remove-modal`)],vt);var yt=760,bt=1120,$=class extends A{static{this.styles=[N,P,o`
      :host {
        display: block;
        height: 100vh;
      }
      .root {
        height: 100vh;
        display: flex;
        flex-direction: column;
        background: var(--paper);
        background-image: radial-gradient(#16323d1f 1.4px, transparent 1.4px);
        background-size: 22px 22px;
        overflow: hidden;
      }
      :host([desktop]) .root {
        min-width: 1120px;
      }
      header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 0 14px;
        height: 58px;
        flex: none;
        border-bottom: 2.5px solid var(--ink);
        background: var(--card);
      }
      :host([phone]) header {
        gap: 9px;
        padding: 0 10px;
      }
      :host([desktop]) header {
        gap: 14px;
        padding: 0 26px;
        height: 70px;
      }
      .logo {
        width: 28px;
        height: 28px;
        flex: none;
        border-radius: 9px;
        background: var(--mustard);
        border: 2.5px solid var(--ink);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 700;
      }
      :host([desktop]) .logo {
        width: 30px;
        height: 30px;
        font-size: 15px;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: none;
      }
      .wordmark {
        font-size: 16.5px;
        font-weight: 600;
        letter-spacing: -0.02em;
        white-space: nowrap;
      }
      :host([phone]) .wordmark {
        display: inline;
      }
      :host([desktop]) .wordmark {
        font-size: 19px;
      }
      .spacer {
        flex: 1;
      }
      .rig-bar {
        display: flex;
        align-items: center;
      }
      .rig-chip {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 5px 12px;
        border-radius: 14px;
        border: 2px solid var(--ink);
        line-height: 1.3;
        text-align: left;
        transition: box-shadow 150ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .rig-chip:hover {
        box-shadow: 2px 2px 0 var(--ink);
      }
      .rig-chip-lbl {
        font-family: var(--mono);
        font-size: 9px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        opacity: 0.5;
      }
      .rig-chip-val {
        font-size: 12.5px;
        font-weight: 600;
      }
      .rig-arrow {
        font-size: 12px;
        opacity: 0.3;
        padding: 0 7px;
      }
      .rig-compact-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 11px;
        border-radius: 16px;
        border: 2px solid var(--ink);
        background: #e8f4fa;
        font-family: var(--mono);
        font-size: 10.5px;
        flex: none;
      }
      .settings-btn {
        width: 34px;
        height: 34px;
        flex: none;
        border-radius: 50%;
        border: 2.5px solid var(--ink);
        background: var(--card);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        transition: background 150ms ease;
      }
      .settings-btn:hover {
        background: var(--mustard);
      }
      :host([desktop]) .settings-btn {
        width: 38px;
        height: 38px;
        font-size: 15px;
      }
      .cook-btn {
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 9px 14px;
        border-radius: 22px;
        background: var(--mustard);
        border: 2.5px solid var(--ink);
        box-shadow: 3px 3px 0 var(--ink);
        font-size: 13px;
        font-weight: 600;
        flex: none;
        transition:
          transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .cook-btn:active {
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0 var(--ink);
      }
      :host([desktop]) .cook-btn {
        padding: 10px 18px;
        font-size: 14px;
      }
      .cook-count {
        font-family: var(--mono);
        font-size: 10.5px;
        padding: 1px 7px;
        border-radius: 10px;
        background: var(--ink);
        color: var(--mustard);
      }
      .body {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: row;
      }
      :host([phone]) .body {
        flex-direction: column;
      }
      main {
        flex: 1;
        min-width: 0;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }
      .controller-block {
        flex: none;
        padding: 12px 14px 0;
      }
      .device-tabs-block {
        flex: none;
        padding: 12px 14px 4px;
      }
      /* --- desktop-only layout --- */
      .aside {
        width: 380px;
        flex: none;
        display: flex;
        flex-direction: column;
        background: var(--card);
        border-left: 2.5px solid var(--ink);
      }
      .aside-top {
        flex: none;
        padding: 16px 18px 18px;
        border-bottom: 2.5px solid var(--ink);
      }
      .desktop-tabs-row {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px 26px;
        flex: none;
      }
      .pedal-label {
        font-family: var(--mono);
        font-size: 11px;
        opacity: 0.5;
        flex: none;
        padding-top: 9px;
      }
    `]}constructor(){super(),this.store=new Ue,this.phone=window.innerWidth<yt,this.desktop=window.innerWidth>=bt,this.onResize=()=>{this.phone=window.innerWidth<yt,this.desktop=window.innerWidth>=bt},new W(this,this.store)}connectedCallback(){super.connectedCallback(),window.addEventListener(`resize`,this.onResize)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(`resize`,this.onResize)}render(){let e=this.store.totalAssigned;return C`
      <div class="root">
        <header>
          <div class="brand">
            <span class="logo">S</span>
            <span class="wordmark">stomp stacks</span>
          </div>
          <div class="spacer"></div>
          ${this.renderHeaderRig()}
          <button class="settings-btn" title="settings" @click=${()=>this.store.openSettings()}>⚙</button>
          <button class="cook-btn" @click=${()=>this.store.openCompile()}>
            <span>${this.desktop?`cook it up`:`cook`}</span>
            <span class="cook-count">${e}</span>
          </button>
        </header>

        ${this.desktop?this.renderDesktopBody():this.renderCompactBody()}
      </div>

      <compile-modal .store=${this.store} ?phone=${this.phone}></compile-modal>
      <settings-modal .store=${this.store}></settings-modal>
      <controller-picker-modal .store=${this.store}></controller-picker-modal>
      <brain-picker-modal .store=${this.store}></brain-picker-modal>
      <add-pedal-modal .store=${this.store}></add-pedal-modal>
      <confirm-remove-modal .store=${this.store}></confirm-remove-modal>
    `}renderHeaderRig(){let e=this.store.state,t=V.getController(e.controllerId),n=V.getBrain(e.brainId),r=e.rig.length<=2?e.rig.map(e=>V.getDevice(e)?.name||e).join(`, `):`${e.rig.slice(0,2).map(e=>V.getDevice(e)?.name||e).join(`, `)} +${e.rig.length-2}`;return this.phone?C`
        <button class="rig-compact-btn" title="rig" @click=${()=>this.store.openBrainPicker()}>
          ${t.short} → ${n.short}
        </button>
      `:C`
      <div class="rig-bar">
        <button
          class="rig-chip"
          style="background:#e8f4fa"
          title="change controller"
          @click=${()=>this.store.openControllerPicker()}
        >
          <span class="rig-chip-lbl">controller</span>
          <span class="rig-chip-val">${t.short}</span>
        </button>
        <span class="rig-arrow">→</span>
        <button
          class="rig-chip"
          style="background:${n.colour}55"
          title="what expands one stomp into a stack"
          @click=${()=>this.store.openBrainPicker()}
        >
          <span class="rig-chip-lbl">brain</span>
          <span class="rig-chip-val">${n.short}</span>
        </button>
        <span class="rig-arrow">→</span>
        <div class="rig-chip" style="background:var(--paper);cursor:default">
          <span class="rig-chip-lbl">pedals</span>
          <span class="rig-chip-val">${r}</span>
        </div>
      </div>
    `}renderCompactBody(){return C`
      <div class="body">
        <main>
          <div class="controller-block"><controller-graphic .store=${this.store}></controller-graphic></div>
          <div class="device-tabs-block"><device-tabs .store=${this.store}></device-tabs></div>
          <pedal-canvas .store=${this.store} ?phone=${this.phone}></pedal-canvas>
        </main>
        <macro-panel .store=${this.store} ?phone=${this.phone}></macro-panel>
      </div>
    `}renderDesktopBody(){return C`
      <div class="body">
        <main>
          <div class="desktop-tabs-row">
            <span class="pedal-label">pedal</span>
            <device-tabs .store=${this.store} style="flex:1;min-width:0"></device-tabs>
          </div>
          <pedal-canvas .store=${this.store} desktop></pedal-canvas>
        </main>
        <aside class="aside">
          <div class="aside-top"><controller-graphic .store=${this.store} desktop></controller-graphic></div>
          <macro-panel .store=${this.store} desktop></macro-panel>
        </aside>
      </div>
    `}};G([M({type:Boolean,reflect:!0})],$.prototype,`phone`,void 0),G([M({type:Boolean,reflect:!0})],$.prototype,`desktop`,void 0),$=G([j(`stomp-app`)],$);