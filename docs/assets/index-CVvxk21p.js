(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:f,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,h=globalThis,g=h.trustedTypes,_=g?g.emptyScript:``,v=h.reactiveElementPolyfillSupport,y=(e,t)=>e,ee={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},b=(e,t)=>!l(e,t),x={attribute:!0,type:String,converter:ee,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol(`metadata`),h.litPropertyMetadata??=new WeakMap;var S=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(y(`elementProperties`)))return;let e=m(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y(`properties`))){let e=this.properties,t=[...f(e),...p(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?ee:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?ee:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??b)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};S.elementStyles=[],S.shadowRootOptions={mode:`open`},S[y(`elementProperties`)]=new Map,S[y(`finalized`)]=new Map,v?.({ReactiveElement:S}),(h.reactiveElementVersions??=[]).push(`2.1.2`);var C=globalThis,w=e=>e,T=C.trustedTypes,E=T?T.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,te=`$lit$`,D=`lit$${Math.random().toFixed(9).slice(2)}$`,ne=`?`+D,re=`<${ne}>`,O=document,ie=()=>O.createComment(``),ae=e=>e===null||typeof e!=`object`&&typeof e!=`function`,oe=Array.isArray,se=e=>oe(e)||typeof e?.[Symbol.iterator]==`function`,ce=`[ 	
\f\r]`,le=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ue=/-->/g,de=/>/g,fe=RegExp(`>|${ce}(?:([^\\s"'>=/]+)(${ce}*=${ce}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),pe=/'/g,me=/"/g,he=/^(?:script|style|textarea|title)$/i,k=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),ge=Symbol.for(`lit-noChange`),A=Symbol.for(`lit-nothing`),_e=new WeakMap,ve=O.createTreeWalker(O,129);function ye(e,t){if(!oe(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return E===void 0?t:E.createHTML(t)}var be=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=le;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===le?c[1]===`!--`?o=ue:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=fe):(he.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=fe):o=de:o===fe?c[0]===`>`?(o=i??le,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?fe:c[3]===`"`?me:pe):o===me||o===pe?o=fe:o===ue||o===de?o=le:(o=fe,i=void 0);let d=o===fe&&e[t+1].startsWith(`/>`)?` `:``;a+=o===le?n+re:l>=0?(r.push(s),n.slice(0,l)+te+n.slice(l)+D+d):n+D+(l===-2?t:d)}return[ye(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},xe=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=be(t,n);if(this.el=e.createElement(l,r),ve.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=ve.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(te)){let t=u[o++],n=i.getAttribute(e).split(D),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Ee:r[1]===`?`?De:r[1]===`@`?Oe:Te}),i.removeAttribute(e)}else e.startsWith(D)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(he.test(i.tagName)){let e=i.textContent.split(D),t=e.length-1;if(t>0){i.textContent=T?T.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],ie()),ve.nextNode(),c.push({type:2,index:++a});i.append(e[t],ie())}}}else if(i.nodeType===8){if(i.data===ne)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(D,e+1))!==-1;)c.push({type:7,index:a}),e+=D.length-1}}a++}}static createElement(e,t){let n=O.createElement(`template`);return n.innerHTML=e,n}};function Se(e,t,n=e,r){if(t===ge)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=ae(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=Se(e,i._$AS(e,t.values),i,r)),t}var Ce=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??O).importNode(t,!0);ve.currentNode=r;let i=ve.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new we(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new ke(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=ve.nextNode(),a++)}return ve.currentNode=O,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},we=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Se(this,e,t),ae(e)?e===A||e==null||e===``?(this._$AH!==A&&this._$AR(),this._$AH=A):e!==this._$AH&&e!==ge&&this._(e):e._$litType$===void 0?e.nodeType===void 0?se(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==A&&ae(this._$AH)?this._$AA.nextSibling.data=e:this.T(O.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=xe.createElement(ye(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Ce(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=_e.get(e.strings);return t===void 0&&_e.set(e.strings,t=new xe(e)),t}k(t){oe(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(ie()),this.O(ie()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=w(e).nextSibling;w(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Te=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=A,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=A}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=Se(this,e,t,0),a=!ae(e)||e!==this._$AH&&e!==ge,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=Se(this,r[n+o],t,o),s===ge&&(s=this._$AH[o]),a||=!ae(s)||s!==this._$AH[o],s===A?e=A:e!==A&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Ee=class extends Te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===A?void 0:e}},De=class extends Te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==A)}},Oe=class extends Te{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=Se(this,e,t,0)??A)===ge)return;let n=this._$AH,r=e===A&&n!==A||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==A&&(n===A||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},ke=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Se(this,e)}},Ae=C.litHtmlPolyfillSupport;Ae?.(xe,we),(C.litHtmlVersions??=[]).push(`3.3.3`);var je=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new we(t.insertBefore(ie(),e),e,void 0,n??{})}return i._$AI(e),i},Me=globalThis,j=class extends S{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=je(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ge}};j._$litElement$=!0,j.finalized=!0,Me.litElementHydrateSupport?.({LitElement:j});var Ne=Me.litElementPolyfillSupport;Ne?.({LitElement:j}),(Me.litElementVersions??=[]).push(`4.2.2`);var M=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},Pe={attribute:!0,type:String,converter:ee,reflect:!1,hasChanged:b},Fe=(e=Pe,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function N(e){return(t,n)=>typeof n==`object`?Fe(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function P(e){return N({...e,state:!0,attribute:!1})}var F=o`
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
`,I=o`
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
`;var L=o`
  @keyframes scrimIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes blip {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes ring {
    0% {
      box-shadow: 0 0 0 0 rgba(247, 201, 72, 0.85);
    }
    100% {
      box-shadow: 0 0 0 15px rgba(247, 201, 72, 0);
    }
  }
  @keyframes breathe {
    0%,
    100% {
      opacity: 0.35;
    }
    50% {
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
  @keyframes wig {
    from {
      left: 0;
    }
    to {
      left: 100%;
    }
  }
  @keyframes glide {
    0% {
      left: 0;
    }
    70%,
    100% {
      left: 100%;
    }
  }
  @keyframes kwig {
    from {
      transform: rotate(var(--a0));
    }
    to {
      transform: rotate(var(--a1));
    }
  }
  @keyframes kglide {
    0% {
      transform: rotate(var(--a0));
    }
    70%,
    100% {
      transform: rotate(var(--a1));
    }
  }
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`,R=o`
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
`;function Ie(e,t,n,r,i){let a=e.state,o=a.hintOpen===t;return k`
    <span style="position:relative;display:inline-flex;align-items:center;flex:none">
      <button
        style=${`width:18px;height:18px;flex:none;padding:0;border-radius:50%;border:2px solid #16323d;font-size:10.5px;font-weight:700;line-height:1;display:flex;align-items:center;justify-content:center;color:#16323d;transition:opacity 150ms ease,background 150ms ease;${a.hintAll||o?`background:#f7c948;opacity:1;animation:ring 1.4s cubic-bezier(.23,1,.32,1) ${a.hintAll?`infinite`:`1`}`:`background:#fffbf0;opacity:.5`}`}
        title=${r}
        @click=${n=>{n.stopPropagation(),e.setHintOpen(t)}}
      >
        ?
      </button>
      ${o?k`
            <div style=${`position:absolute;top:calc(100% + 8px);${n===`right`?`right:-6px`:`left:-6px`};z-index:45;width:270px;max-width:80vw;padding:12px 13px;border-radius:16px;background:#fffbf0;border:2.5px solid #16323d;box-shadow:4px 4px 0 #16323d;display:flex;flex-direction:column;gap:5px;text-align:left;white-space:normal;animation:sheetIn 170ms cubic-bezier(.23,1,.32,1)`} @click=${e=>e.stopPropagation()}>
              <div style="font-size:13px;font-weight:600;color:#16323d">${r}</div>
              <div style="font-size:12px;line-height:1.5;opacity:.75;color:#16323d">${i}</div>
              <button
                style="align-self:flex-end;margin-top:3px;padding:4px 11px;border-radius:11px;background:#f7c948;border:2px solid #16323d;font-size:11.5px;font-weight:600"
                @click=${()=>e.setHintOpen(t)}
              >
                got it
              </button>
            </div>
          `:null}
    </span>
  `}var z={chocolate:{id:`chocolate`,name:`M-Vave Chocolate`,short:`chocolate`,sub:`4 switches · 4 banks`,blurb:`cheap bluetooth stomper, no screen — whatever you name a switch, the caps stay blank`,keys:[`A`,`B`,`C`,`D`],x:[14,38,62,86],y:[42,42,42,42],height:74,heightDesktop:80,banks:4,screen:!1,onboard:!1,photo:{src:`assets/chocolate-top.png`,ar:`1448/243`,x:[6.6,35.4,64.1,92.5],y:[53.5,53.5,53.5,53.5],s:8.3,radius:`1%/6%`,screen:{l:46.1,t:22.6,w:7.3,h:57.6,r:`4px`,digits:!0}},notes:[`Hardware Layout: 4 foot switches (A, B, C, D) across 4 banks.`,`No Onboard Macro Storage: Sends 1 MIDI message per switch. Requires an external smart relay hub (Pirate MIDI Scribble) to fan out multi-step macro stacks.`,`Editor & Connection: Configured via M-Vave CubeSuite app over Bluetooth or USB-C MIDI.`]},mc3:{id:`mc3`,name:`Morningstar MC3`,short:`mc3`,sub:`3 switches · 3 banks`,blurb:`workhorse midi controller with a small screen and colour leds per switch`,keys:[`A`,`B`,`C`],x:[26,74,50],y:[74,74,14],height:158,heightDesktop:170,banks:3,screen:!0,onboard:!0,notes:[`Hardware Layout: 3 foot switches (A, B, C) supporting 30 physical banks.`,`Onboard Macro Storage: Stores up to 16 MIDI messages per switch action directly in memory without requiring an external relay box.`,`Editor Integration: Exports native preset JSON for import via the Morningstar Editor.`,`Connectivity: Features OLED display screen, 1x 5-pin DIN MIDI Out, 4x 3.5mm TRS MIDI outputs, and USB-C MIDI.`]},scribble:{id:`scribble`,name:`Scribble relay`,short:`scribble`,sub:`left + right switch · tap + hold · 128 presets`,blurb:`screen and brain in one — 128 presets, each with a left and right switch you can tap or hold`,keys:[`L`,`R`],x:[27,73],y:[70,70],height:120,heightDesktop:130,banks:128,screen:!1,onboard:!0,isBrain:!0,nav:!0,actions:[`press`,`hold`],photo:{src:`assets/scribble-top.png`,ar:`1315/504`,x:[11.4,91.3],y:[27.8,27.8],s:9.9,radius:`3.5%/9%`,screen:{l:25.1,t:12.3,w:52.5,h:76.4,r:`9%`}},notes:[`Hardware Layout: Left + Right switches across 128 presets with tap and hold triggers.`,`Self-Contained Brain & Screen: Fans out up to 8 MIDI messages per action with a colour LCD screen.`]}},Le=[`chocolate`,`mc3`,`scribble`],B=[{id:`press`,label:`tap`},{id:`hold`,label:`hold`},{id:`double`,label:`double`}],Re={L:`left`,R:`right`},ze=[{label:`min`,value:0},{label:`9 o'clock`,value:32},{label:`noon`,value:64},{label:`3 o'clock`,value:96},{label:`max`,value:127}],Be=[{label:`1`,value:1},{label:`2`,value:2},{label:`3`,value:3}],V={blooper:{id:`blooper`,name:`blooper`,faceName:`blooper`,sub:`bottomless looper`,accent:`#8fd0e6`,body:`#9dcfe0`,ink:`#173742`,midiChannel:1,base:14,pcOffset:0,photo:`assets/blooper-face.png`,pw:618,ph:1126,notes:[`Official Chase Bliss Blooper MIDI Spec: Knobs CC 14-19, Ramp Speed CC 20, Toggles CC 21-23 (values 1/2/3).`,`Transport: Record (CC 1), Play (CC 2), Overdub (CC 3), Stop (CC 4), Undo (CC 5), Redo (CC 6), Erase (CC 7), Hold B (CC 8), One-Shot Dub (CC 9).`,`Modifiers & Ramping: Mod A On/Off (CC 30), Mod B On/Off (CC 31), Ramp Enable (CC 52), Loop Slots (PC 0-15).`],controls:[{id:`volume`,short:`volume`,label:`Volume (loop level)`,type:`knob`,x:22,y:12,px:19.3,py:8.8,ps:21.7,cc:14},{id:`layers`,short:`layers`,label:`Layers`,type:`knob`,x:50,y:12,px:50.6,py:8.8,ps:21.7,cc:15},{id:`repeats`,short:`repeats`,label:`Repeats`,type:`knob`,x:78,y:12,px:81.9,py:8.8,ps:21.7,cc:16},{id:`modA`,short:`mod a`,label:`Mod A`,type:`knob`,x:22,y:33,px:19.3,py:28.4,ps:21.7,cc:17},{id:`stability`,short:`stability`,label:`Stability`,type:`knob`,x:50,y:33,px:50.6,py:28.4,ps:21.7,cc:18},{id:`modB`,short:`mod b`,label:`Mod B`,type:`knob`,x:78,y:33,px:81.9,py:28.4,ps:21.7,cc:19},{id:`modA_sel`,short:`1 · 2 · 3`,label:`Mod A select`,type:`toggle`,x:22,y:52,px:18,py:44.6,ps:9.7,cc:21,values:Be},{id:`mode`,short:`norm · add · samp`,label:`Program mode`,type:`toggle`,x:50,y:52,px:50,py:44.6,ps:9.7,cc:22,values:[{label:`normal`,value:1,oledLabel:`NORM`},{label:`additive`,value:2,oledLabel:`ADD`},{label:`sampler`,value:3,oledLabel:`SAMP`}]},{id:`modB_sel`,short:`4 · 5 · 6`,label:`Mod B select`,type:`toggle`,x:78,y:52,px:81.6,py:44.6,ps:9.7,cc:23,values:Be},{id:`save`,short:`save`,label:`Save / Recall Slot`,type:`toggle`,x:50,y:82,px:50.5,py:75.5,ps:8.1,cc:13,values:[{label:`left (load)`,value:0,oledLabel:`LOAD`,cc:13},{label:`mid (preview)`,value:0,oledLabel:`PREV`,cc:11},{label:`right (save)`,value:0,oledLabel:`SAVE`,cc:12}]},{id:`record`,short:`rec`,label:`Left switch (Rec / Play / Dub / Mod A)`,type:`foot`,x:28,y:82,px:20.6,py:88.2,ps:20.6,cc:1,values:[{label:`record`,value:127,oledLabel:`REC`,cc:1},{label:`play`,value:127,oledLabel:`PLAY`,cc:2},{label:`overdub`,value:127,oledLabel:`DUB`,cc:3},{label:`one-shot dub`,value:127,oledLabel:`1-SHOT`,cc:9},{label:`mod A on`,value:127,oledLabel:`MOD A ON`,cc:30},{label:`mod A off`,value:0,oledLabel:`MOD A OFF`,cc:30}]},{id:`loop`,short:`stop`,label:`Right switch (Stop / Undo / Redo / Mod B)`,type:`foot`,x:72,y:82,px:80.5,py:88.2,ps:20.6,cc:4,values:[{label:`stop`,value:127,oledLabel:`STOP`,cc:4},{label:`hold switch B`,value:127,oledLabel:`HOLD B`,cc:8},{label:`erase`,value:127,oledLabel:`ERASE`,cc:7},{label:`mod B on`,value:127,oledLabel:`MOD B ON`,cc:31},{label:`mod B off`,value:0,oledLabel:`MOD B OFF`,cc:31}]},{id:`play`,short:`play`,label:`Play`,type:`foot`,sub:!0,x:18,y:94,px:18,py:94,ps:8,cc:2},{id:`overdub`,short:`overdub`,label:`Overdub`,type:`foot`,sub:!0,x:28,y:94,px:28,py:94,ps:8,cc:3},{id:`stop`,short:`stop`,label:`Stop`,type:`foot`,sub:!0,x:38,y:94,px:38,py:94,ps:8,cc:4},{id:`undo`,short:`undo`,label:`Undo`,type:`foot`,sub:!0,x:48,y:94,px:48,py:94,ps:8,cc:5},{id:`redo`,short:`redo`,label:`Redo`,type:`foot`,sub:!0,x:58,y:94,px:58,py:94,ps:8,cc:6},{id:`erase`,short:`erase`,label:`Erase loop`,type:`foot`,sub:!0,x:68,y:94,px:68,py:94,ps:8,cc:7},{id:`holdB`,short:`hold b`,label:`Hold switch B`,type:`foot`,sub:!0,x:78,y:94,px:78,py:94,ps:8,cc:8},{id:`oneShotDub`,short:`1-shot`,label:`One-shot dub`,type:`foot`,sub:!0,x:88,y:94,px:88,py:94,ps:8,cc:9},{id:`modA_on`,short:`mod a on/off`,label:`Modifier A on/off`,type:`toggle`,sub:!0,x:22,y:65,px:22,py:65,ps:8,cc:30,values:[{label:`on`,value:127,oledLabel:`MOD A ON`},{label:`off`,value:0,oledLabel:`MOD A OFF`}]},{id:`modB_on`,short:`mod b on/off`,label:`Modifier B on/off`,type:`toggle`,sub:!0,x:78,y:65,px:78,py:65,ps:8,cc:31,values:[{label:`on`,value:127,oledLabel:`MOD B ON`},{label:`off`,value:0,oledLabel:`MOD B OFF`}]},{id:`rampSpeed`,short:`ramp spd`,label:`Ramp speed`,type:`knob`,sub:!0,x:50,y:65,px:50,py:65,ps:8,cc:20},{id:`rampOn`,short:`ramp`,label:`Ramp enable`,type:`toggle`,sub:!0,x:36,y:65,px:36,py:65,ps:8,cc:52,values:[{label:`on`,value:127,oledLabel:`RAMP ON`},{label:`off`,value:0,oledLabel:`RAMP OFF`}]},{id:`loopSlot`,short:`slot`,label:`Select loop slot`,type:`toggle`,sub:!0,x:64,y:65,px:64,py:65,ps:8,cc:13,pc:!0,values:[{label:`slot 1`,value:1,oledLabel:`SLOT 1`,pc:!0},{label:`slot 2`,value:2,oledLabel:`SLOT 2`,pc:!0},{label:`slot 3`,value:3,oledLabel:`SLOT 3`,pc:!0},{label:`slot 4`,value:4,oledLabel:`SLOT 4`,pc:!0}]}],macroTemplates:[{id:`blooper-rec-play-dub`,name:`Rec / Play / Overdub Lifecycle`,description:`Sequences Left Switch through Record (CC 1) -> Play (CC 2) -> Overdub (CC 3)`,controlId:`record`,steps:[{controlId:`record`,value:127,label:`REC`},{controlId:`play`,value:127,label:`PLAY`},{controlId:`overdub`,value:127,label:`DUB`}]}]},mood:{id:`mood`,name:`mood`,faceName:`M O O D`,sub:`micro-looper · space`,accent:`#ef7d5c`,body:`#e5a38d`,ink:`#3a1f16`,midiChannel:2,base:14,photo:`assets/mood-face.png`,pw:618,ph:1126,notes:[`Official Chase Bliss MOOD MIDI Spec: Knobs CC 14-19, Ramp Speed CC 20, Toggles CC 21-23 (values 1/2/3).`,`Footswitches: Micro-Looper (CC 102: 0=off, 1-127=on), Wet Channel (CC 103: 0=off, 1-127=on), Both (CC 104).`,`Presets: PC 0 returns to live panel; PC 1-2 recall front toggle presets; PC 3-122 recall MIDI banks.`],controls:[{id:`time`,short:`time`,label:`Time`,type:`knob`,x:22,y:12,px:19.3,py:8.8,ps:21.7,cc:14},{id:`mix`,short:`mix (ramp)`,label:`Mix (Ramp)`,type:`knob`,x:50,y:12,px:50.6,py:8.8,ps:21.7,cc:15},{id:`length`,short:`length`,label:`Length`,type:`knob`,x:78,y:12,px:81.9,py:8.8,ps:21.7,cc:16},{id:`modWet`,short:`modify`,label:`Modify (wet)`,type:`knob`,x:22,y:33,px:19.3,py:28.4,ps:21.7,cc:17},{id:`clock`,short:`clock`,label:`Clock`,type:`knob`,x:50,y:33,px:50.6,py:28.4,ps:21.7,cc:18},{id:`modMicro`,short:`modify`,label:`Modify (micro-looper)`,type:`knob`,x:78,y:33,px:81.9,py:28.4,ps:21.7,cc:19},{id:`wetmode`,short:`rev · del · slip`,label:`Wet channel mode`,type:`toggle`,x:22,y:52,px:18,py:44.6,ps:9.7,cc:21,values:[{label:`reverb`,value:1},{label:`delay`,value:2},{label:`slip`,value:3}]},{id:`routing`,short:`in · both · env`,label:`Routing`,type:`toggle`,x:50,y:52,px:50,py:44.6,ps:9.7,cc:22,values:[{label:`in`,value:1},{label:`both`,value:2},{label:`env`,value:3}]},{id:`micromode`,short:`env · tape · str`,label:`Loop channel mode`,type:`toggle`,x:78,y:52,px:81.6,py:44.6,ps:9.7,cc:23,values:[{label:`env`,value:1},{label:`tape`,value:2},{label:`stretch`,value:3}]},{id:`preset`,short:`preset`,label:`Preset slot toggle`,type:`toggle`,x:50,y:82,px:50,py:75,ps:8.6,cc:0,pc:!0,values:[{label:`left (slot 1)`,value:1,oledLabel:`PC 1`,pc:!0},{label:`off (live)`,value:0,oledLabel:`PC 0`,pc:!0},{label:`right (slot 2)`,value:2,oledLabel:`PC 2`,pc:!0}]},{id:`wet`,short:`wet`,label:`Wet channel switch`,type:`foot`,x:28,y:82,px:20.6,py:88.2,ps:20.6,cc:103,values:[{label:`toggle`,value:127,oledLabel:`WET ON`},{label:`engage`,value:127,oledLabel:`WET ON`},{label:`bypass`,value:0,oledLabel:`WET OFF`}]},{id:`microloop`,short:`loop`,label:`Micro-looper switch`,type:`foot`,x:72,y:82,px:80.5,py:88.2,ps:20.6,cc:102,values:[{label:`toggle`,value:127,oledLabel:`LOOP ON`},{label:`engage`,value:127,oledLabel:`LOOP ON`},{label:`bypass`,value:0,oledLabel:`LOOP OFF`}]},{id:`rampSpeed`,short:`ramp spd`,label:`Ramp speed`,type:`knob`,sub:!0,x:22,y:65,px:22,py:65,ps:8,cc:20},{id:`both`,short:`both ch`,label:`Both channels on/off`,type:`toggle`,sub:!0,x:50,y:65,px:50,py:65,ps:8,cc:104,values:[{label:`engage both`,value:127,oledLabel:`BOTH ON`},{label:`bypass both`,value:0,oledLabel:`BOTH OFF`}]},{id:`holdWet`,short:`hold wet`,label:`Hold Wet (momentary)`,type:`foot`,sub:!0,x:35,y:65,px:35,py:65,ps:8,cc:105},{id:`holdMicro`,short:`hold loop`,label:`Hold Micro (momentary)`,type:`foot`,sub:!0,x:65,y:65,px:65,py:65,ps:8,cc:106},{id:`tap`,short:`tap`,label:`Tap tempo`,type:`foot`,sub:!0,x:80,y:65,px:80,py:65,ps:8,cc:93}]},elcap:{id:`elcap`,name:`el capistan`,faceName:`el capistan`,sub:`dTape echo`,accent:`#c29a5b`,body:`#c7bfae`,ink:`#2d261c`,midiChannel:3,base:12,photo:`assets/elcap-face.png`,pw:775,ph:872,notes:[`Official Strymon El Capistan v2 MIDI Spec: Time (CC 12), Mix (CC 13), Tape Age (CC 14), Repeats (CC 15), Wow & Flutter (CC 16), Spring Reverb (CC 17).`,`Secondary Knobs: Low End Contour (CC 18), Tape Bias (CC 19), Tape Crinkle (CC 20), Boost/Cut (CC 21).`,`Toggles & Switches: Tape Head (CC 28: 1-3), Mode (CC 29: 1-3), Infinite Hold (CC 27), Tap Tempo (CC 93), Bypass (CC 102).`],controls:[{id:`time`,short:`time`,label:`Time`,type:`knob`,x:18,y:19,px:16.5,py:19.7,ps:17,cc:12},{id:`mix`,short:`mix`,label:`Mix`,type:`knob`,x:82,y:19,px:84.5,py:19.7,ps:17,cc:13},{id:`head`,short:`tape head`,label:`Tape Head`,type:`toggle`,x:42,y:19,px:42.2,py:19.3,ps:7,cc:28,values:[{label:`fixed`,value:1},{label:`multi`,value:2},{label:`single`,value:3}]},{id:`cmode`,short:`mode`,label:`Mode`,type:`toggle`,x:58,y:19,px:57.4,py:19.3,ps:7,cc:29,values:[{label:`a`,value:1},{label:`b`,value:2},{label:`c`,value:3}]},{id:`tapeAge`,short:`tape age`,label:`Tape Age`,type:`knob`,x:38,y:37,px:38.5,py:36.9,ps:17,cc:14},{id:`repeats`,short:`repeats`,label:`Repeats`,type:`knob`,x:64,y:37,px:63.7,py:36.9,ps:17,cc:15},{id:`wow`,short:`wow & flutter`,label:`Wow & Flutter`,type:`knob`,x:18,y:43,px:17.4,py:43,ps:17,cc:16},{id:`spring`,short:`spring`,label:`Spring Reverb`,type:`knob`,x:82,y:43,px:84.5,py:43,ps:17,cc:17},{id:`tap`,short:`tap`,label:`Tap / Hold / Splice`,type:`foot`,x:18,y:80,px:18.3,py:79.8,ps:17.5,cc:93,values:[{label:`tap / sos splice`,value:127,oledLabel:`TAP`,cc:93},{label:`infinite hold on`,value:127,oledLabel:`HOLD ON`,cc:27},{label:`infinite hold off`,value:0,oledLabel:`HOLD OFF`,cc:27}]},{id:`onoff`,short:`on`,label:`On / bypass`,type:`foot`,x:81,y:80,px:81,py:79.8,ps:17.5,cc:102,values:[{label:`engage`,value:127,oledLabel:`ON`},{label:`bypass`,value:0,oledLabel:`BYPASS`}]},{id:`lowEnd`,short:`low end`,label:`Low End Contour`,type:`knob`,sub:!0,x:20,y:64,px:20,py:64,ps:8,cc:18},{id:`tapeBias`,short:`bias`,label:`Tape Bias`,type:`knob`,sub:!0,x:35,y:64,px:35,py:64,ps:8,cc:19},{id:`tapeCrinkle`,short:`crinkle`,label:`Tape Crinkle`,type:`knob`,sub:!0,x:50,y:64,px:50,py:64,ps:8,cc:20},{id:`boostCut`,short:`boost/cut`,label:`+/- 3dB Boost/Cut`,type:`knob`,sub:!0,x:65,y:64,px:65,py:64,ps:8,cc:21},{id:`speed`,short:`speed`,label:`SOS Tape Speed`,type:`toggle`,sub:!0,x:35,y:72,px:35,py:72,ps:8,cc:23,values:[{label:`normal`,value:0,oledLabel:`NORM SPD`},{label:`half`,value:127,oledLabel:`HALF SPD`}]},{id:`sync`,short:`clock sync`,label:`MIDI Clock Sync`,type:`toggle`,sub:!0,x:65,y:72,px:65,py:72,ps:8,cc:22,values:[{label:`free`,value:0,oledLabel:`FREE`},{label:`clock sync`,value:127,oledLabel:`SYNC`}]},{id:`hold`,short:`hold`,label:`Infinite Hold (Oscillation)`,type:`toggle`,sub:!0,x:50,y:72,px:50,py:72,ps:8,cc:27,values:[{label:`hold on`,value:127,oledLabel:`HOLD ON`},{label:`hold off`,value:0,oledLabel:`HOLD OFF`}]}]},genloss:{id:`genloss`,name:`generation loss`,faceName:`generation loss`,sub:`video decay`,accent:`#6d93ad`,body:`#a9c3d4`,ink:`#1f3b4d`,midiChannel:4,base:14,photo:`assets/genloss-face.png`,pw:497,ph:944,notes:[`Official Chase Bliss Generation Loss MKII MIDI Spec: Wow (CC 14), Volume/Ramp (CC 15), Model (CC 16), Flutter (CC 17), Saturate (CC 18), Failure (CC 19).`,`Toggles & Switches: Aux Mode (CC 21: 1-3), Dry (CC 22: 1-3), Noise (CC 23: 1-3), Classic Mode (CC 24), Bypass (CC 102), Aux Switch (CC 103).`],controls:[{id:`wow`,short:`wow`,label:`Wow`,type:`knob`,x:22,y:12,px:18.3,py:8.7,ps:22.1,cc:14},{id:`volume`,short:`volume ramp`,label:`Volume (Ramp)`,type:`knob`,x:50,y:12,px:49.5,py:8.7,ps:21.1,cc:15},{id:`model`,short:`model`,label:`Model / LP`,type:`knob`,x:78,y:12,px:82.7,py:8.7,ps:21.1,cc:16},{id:`flutter`,short:`flutter`,label:`Flutter`,type:`knob`,x:22,y:33,px:18.3,py:29.7,ps:22.1,cc:17},{id:`saturate`,short:`saturate`,label:`Saturate / Gen`,type:`knob`,x:50,y:33,px:49.5,py:29.7,ps:21.1,cc:18},{id:`failure`,short:`failure`,label:`Failure / HP`,type:`knob`,x:78,y:33,px:82.7,py:29.7,ps:21.1,cc:19},{id:`aux`,short:`stop filter fail`,label:`Aux`,type:`toggle`,x:22,y:52,px:17.7,py:47,ps:13,cc:21,values:[{label:`stop`,value:1},{label:`filter`,value:2},{label:`fail`,value:3}]},{id:`dry`,short:`none small unity`,label:`Dry`,type:`toggle`,x:50,y:52,px:48.9,py:46.5,ps:13,cc:22,values:[{label:`none`,value:1},{label:`small`,value:2},{label:`unity`,value:3}]},{id:`noise`,short:`none mild heavy`,label:`Noise`,type:`toggle`,x:78,y:52,px:81.3,py:46.5,ps:13,cc:23,values:[{label:`none`,value:1},{label:`mild`,value:2},{label:`heavy`,value:3}]},{id:`preset`,short:`preset`,label:`Preset toggle`,type:`toggle`,x:50,y:82,px:49.5,py:85.8,ps:9.5,cc:0,pc:!0,values:[{label:`left (slot 1)`,value:1,oledLabel:`PC 1`,pc:!0},{label:`off (live)`,value:0,oledLabel:`PC 0`,pc:!0},{label:`right (slot 2)`,value:2,oledLabel:`PC 2`,pc:!0}]},{id:`auxSw`,short:`aux`,label:`Aux switch (momentary)`,type:`foot`,x:28,y:82,px:17.7,py:91.5,ps:21.1,cc:103,values:[{label:`hold on`,value:127,oledLabel:`AUX ON`},{label:`off`,value:0,oledLabel:`AUX OFF`}]},{id:`bypass`,short:`bypass`,label:`Bypass`,type:`foot`,x:72,y:82,px:79.7,py:91.5,ps:21.1,cc:102,values:[{label:`engage`,value:127,oledLabel:`ON`},{label:`bypass`,value:0,oledLabel:`BYPASS`}]},{id:`ramp`,short:`ramp spd`,label:`Ramp speed`,type:`knob`,sub:!0,x:20,y:65,px:20,py:65,ps:8,cc:20},{id:`classic`,short:`mkii / classic`,label:`Classic mode`,type:`toggle`,sub:!0,x:38,y:65,px:38,py:65,ps:8,cc:24,values:[{label:`mk ii`,value:0},{label:`classic`,value:127}]},{id:`order`,short:`routing`,label:`Filter / Sat order`,type:`toggle`,sub:!0,x:56,y:65,px:56,py:65,ps:8,cc:25,values:[{label:`filter → sat`,value:0},{label:`sat → filter`,value:127}]},{id:`snag`,short:`snag`,label:`Random tape snag`,type:`toggle`,sub:!0,x:74,y:65,px:74,py:65,ps:8,cc:26,values:[{label:`off`,value:0},{label:`on`,value:127}]},{id:`bypassHold`,short:`spread`,label:`Stereo spread (hold bypass)`,type:`toggle`,sub:!0,x:88,y:65,px:88,py:65,ps:8,cc:105,values:[{label:`off`,value:0},{label:`spread on`,value:127}]}]}},Ve=[`blooper`,`mood`,`elcap`,`genloss`],H={scribble:{id:`scribble`,short:`scribble`,full:`Scribble relay`,sub:`the little box in the loop — takes one message in, fans the whole stack out`,icon:`▤`,colour:`#8fd0e6`,maxSteps:8,banks:128,notes:[`Pirate MIDI Scribble Relay Hub: USB-C Host / TRS / BLE relay box.`,`Macro Capacity: Stores up to 8 MIDI messages per switch action across 16 banks (128 presets total).`,`Firmware Flashing: Configured via USB-C or web editor using scribble.json config file.`]},onboard:{id:`onboard`,short:`onboard`,full:`Controller onboard`,sub:`no extra box — the controller holds the stack itself`,icon:`◉`,colour:`#f7c948`,maxSteps:6,banks:3,notes:[`Controller Onboard Storage: Direct execution on smart controllers (like Morningstar MC3).`,`Macro Capacity: Stores up to 16 MIDI messages per action directly on the controller without requiring an external relay hub.`]},none:{id:`none`,short:`direct`,full:`No brain`,sub:`controller talks straight to the pedals — one message per stomp`,icon:`—`,colour:`#ef7d5c`,maxSteps:1,banks:16,notes:[`Direct Controller Setup: Controller sends 1 raw MIDI message per stomp directly to pedals.`,`No Macro Stacks: Triggers are limited to 1 step per action (no multi-pedal fanout).`]}},He=[`scribble`,`onboard`,`none`],Ue=[{id:`scribble`,label:`scribble.json`,sub:`relay config`,note:`flashes onto the scribble over usb`},{id:`mc3`,label:`mc3-preset.json`,sub:`native preset`,note:`import via the morningstar editor`},{id:`rig`,label:`rig.json`,sub:`portable source`,note:`the source of truth — every build comes from this`},{id:`labels`,label:`label sheet`,sub:`printable`,note:`one line per stomp, for the pedalboard`},{id:`log`,label:`midi log`,sub:`debug trace`,note:`raw bytes, in the order they leave`}],We=[`mood`,`genloss`,`blooper`],U={mood:[[`time`,`time`,`Time`],[`modWet`,`modify · wet`,`Modify ●`],[`clock`,`clock`,`Clock`],[`modMicro`,`modify · micro`,`Modify ○`],[`length`,`length`,`Length`]],genloss:[[`wow`,`wow`,`Wow`],[`model`,`model`,`Model`],[`flutter`,`flutter`,`Flutter`],[`saturate`,`saturate`,`Saturate`],[`failure`,`failure`,`Failure`]],blooper:[[`volume`,`volume`,`Volume`],[`layers`,`layers`,`Layers`],[`repeats`,`repeats`,`Repeats`],[`modA`,`mod a`,`Mod A`],[`stability`,`stability`,`Stability`],[`modB`,`mod b`,`Mod B`]]},Ge={mood:{id:`mix`,label:`mix`,note:`mix stops being wet/dry and becomes the speed knob while this set-up is loaded.`},genloss:{id:`volume`,label:`volume (ramp)`,note:`volume (ramp) becomes the ramp speed control while this set-up is loaded.`},blooper:{id:`rampSpeed`,label:`ramp speed`,note:`ramp speed (or repeats on the rear panel) sets how fast the movement runs while this set-up is loaded.`}},Ke={mood:[],genloss:[[`classic`,`Classic Mode`],[`order`,`Sat → Filter`],[`DryType`,`Dry Small`],[`Snag`,`Snag`],[`Hiss`,`Hiss Boost`],[`Miso`,`MISO`],[`Spread`,`Spread`]],blooper:[[`DryKill`,`Dry Kill`],[`Sync`,`Sync`],[`PlayExp`,`Play Exp`],[`Notes`,`Notes`]]},qe=[{id:`clockwig`,device:`mood`,name:`clock wiggle`,slot:1,saved:!1,move:{clock:!0},fall:{},bounce:!0,sweep:`top`,shape:`tri`},{id:`smearswell`,device:`mood`,name:`smear swell`,slot:2,saved:!1,move:{modWet:!0},fall:{},bounce:!1,sweep:`top`,shape:`tri`},{id:`classicwiggle`,device:`genloss`,name:`classic wow wiggle`,slot:1,saved:!1,move:{wow:!0,flutter:!0},fall:{},bounce:!0,sweep:`top`,extras:{classic:!0}},{id:`stereochorus`,device:`genloss`,name:`stereo spread`,slot:2,saved:!1,move:{wow:!0},fall:{},bounce:!0,sweep:`top`,extras:{Miso:!0,Spread:!0}},{id:`bloopmodwig`,device:`blooper`,name:`mod a wiggle`,slot:1,saved:!1,move:{modA:!0},fall:{},bounce:!0,sweep:`top`},{id:`bloopwearwig`,device:`blooper`,name:`stability breathe`,slot:2,saved:!1,move:{stability:!0},fall:{},bounce:!0,sweep:`top`}];function Je(e){let t=e.device||`mood`,n=U[t]||U.mood,r={};n.forEach(([e,,t])=>{r[e]=t});let i=n.filter(([t])=>e.move[t]).map(([e])=>e),a=e.extras||{};if(t===`genloss`){let t=[{id:`wow`,l:`Wow`,on:!!e.move.wow,hot:!0,kind:`move`},{id:`model`,l:`Model`,on:!!e.move.model,hot:!0,kind:`move`},{id:`flutter`,l:`Flutter`,on:!!e.move.flutter,hot:!0,kind:`move`},{id:`saturate`,l:`Saturate`,on:!!e.move.saturate,hot:!0,kind:`move`},{id:`failure`,l:`Failure`,on:!!e.move.failure,hot:!0,kind:`move`},{id:`bounce`,l:`Bounce`,on:!!e.bounce,hot:!0,kind:`bounce`},{id:`Random`,l:`Random`,on:!!a.Random,hot:!1,kind:`extra`},{id:`polarity`,l:`Polarity`,on:i.some(t=>!e.fall[t])&&!e.bounce,hot:!0,kind:`fall`}],n=[{id:`classic`,l:`Classic`,on:!!a.classic,hot:!0,kind:`extra`},{id:`order`,l:`Order`,on:!!a.order,hot:!0,kind:`extra`},{id:`DryType`,l:`Dry Type`,on:!!a.DryType,hot:!0,kind:`extra`},{id:`Snag`,l:`Snag`,on:!!a.Snag,hot:!0,kind:`extra`},{id:`Hiss`,l:`Hiss`,on:!!a.Hiss,hot:!0,kind:`extra`},{id:`sweep`,l:`Sweep`,on:e.sweep===`top`,hot:!0,kind:`sweep`},{id:`Miso`,l:`MISO`,on:!!a.Miso,hot:!0,kind:`extra`},{id:`Spread`,l:`Spread`,on:!!a.Spread,hot:!0,kind:`extra`}];return{left:n,right:t,rDown:t.filter(e=>e.hot&&e.on).map(e=>e.l),lDown:n.filter(e=>e.hot&&e.on).map(e=>e.l)}}if(t===`blooper`){let t=[{id:`volume`,l:`Volume`,on:!!e.move.volume,hot:!0,kind:`move`},{id:`layers`,l:`Layers`,on:!!e.move.layers,hot:!0,kind:`move`},{id:`repeats`,l:`Repeats`,on:!!e.move.repeats,hot:!0,kind:`move`},{id:`modA`,l:`Mod A`,on:!!e.move.modA,hot:!0,kind:`move`},{id:`stability`,l:`Stability`,on:!!e.move.stability,hot:!0,kind:`move`},{id:`modB`,l:`Mod B`,on:!!e.move.modB,hot:!0,kind:`move`},{id:`Sync`,l:`Sync`,on:!!a.Sync,hot:!0,kind:`extra`},{id:`DryKill`,l:`Dry Kill`,on:!!a.DryKill,hot:!0,kind:`extra`}],n=[{id:`PlayExp`,l:`Play Exp`,on:!!a.PlayExp,hot:!0,kind:`extra`},{id:`bounce`,l:`Bounce`,on:!!e.bounce,hot:!0,kind:`bounce`},{id:`Random`,l:`Random`,on:!!a.Random,hot:!1,kind:`extra`},{id:`Notes`,l:`Notes`,on:!!a.Notes,hot:!0,kind:`extra`},{id:`sweep`,l:`Sweep`,on:e.sweep===`top`,hot:!0,kind:`sweep`},{id:`polarity`,l:`Polarity`,on:i.some(t=>!e.fall[t])&&!e.bounce,hot:!0,kind:`fall`},{l:`Filter`,on:!1,hot:!1},{l:`CV Clock`,on:!1,hot:!1}];return{left:n,right:t,rDown:t.filter(e=>e.hot&&e.on).map(e=>e.l),lDown:n.filter(e=>e.hot&&e.on).map(e=>e.l)}}let o=[{id:`time`,l:`Time`,on:!!e.move.time,hot:!0,kind:`move`},{id:`modWet`,l:`Modify ●`,on:!!e.move.modWet,hot:!0,kind:`move`},{id:`length`,l:`Length`,on:!!e.move.length,hot:!0,kind:`move`},{id:`clock`,l:`Clock`,on:!!e.move.clock,hot:!0,kind:`move`},{id:`modMicro`,l:`Modify ○`,on:!!e.move.modMicro,hot:!0,kind:`move`},{id:`bounce`,l:`Bounce`,on:!!e.bounce,hot:!0,kind:`bounce`},{l:`Random`,on:!1,hot:!1},{l:`Trails`,on:!1,hot:!1}],s=[{id:`time`,l:`Time`,on:!e.bounce&&!!e.move.time&&!e.fall.time,hot:!e.bounce&&!!e.move.time,kind:`fall`},{id:`modWet`,l:`Modify ●`,on:!e.bounce&&!!e.move.modWet&&!e.fall.modWet,hot:!e.bounce&&!!e.move.modWet,kind:`fall`},{id:`length`,l:`Length`,on:!e.bounce&&!!e.move.length&&!e.fall.length,hot:!e.bounce&&!!e.move.length,kind:`fall`},{id:`clock`,l:`Clock`,on:!e.bounce&&!!e.move.clock&&!e.fall.clock,hot:!e.bounce&&!!e.move.clock,kind:`fall`},{id:`modMicro`,l:`Modify ○`,on:!e.bounce&&!!e.move.modMicro&&!e.fall.modMicro,hot:!e.bounce&&!!e.move.modMicro,kind:`fall`},{id:`shape`,l:`Shape`,on:e.shape===`square`,hot:!0,kind:`shape`},{id:`sweep`,l:`Sweep`,on:e.sweep===`top`,hot:!0,kind:`sweep`},{l:`Miso`,on:!1,hot:!1}];return{left:s,right:o,rDown:o.filter(e=>e.hot&&e.on).map(e=>e.l),lDown:s.filter(e=>e.hot&&e.on).map(e=>e.l)}}function Ye(e){let t=e.device||`mood`,n=(U[t]||U.mood).filter(t=>e.move[t[0]]),r=e.extras||{},i=(Ke[t]||[]).filter(([e])=>r[e]).map(([,e])=>e.toLowerCase());if(!n.length)return i.length?[`no knobs move; this set-up turns on ${i.join(`, `)} and stores where the knobs sit.`]:[`nothing moves. this set-up only stores where the knobs sit.`];let a=n.map(e=>e[1]),o=a.length===1?a[0]:a.slice(0,-1).join(`, `)+` and `+a[a.length-1],s=n.length===1,c=[];c.push(e.bounce?`${o} ${s?`moves`:`move`} back and forth on ${s?`its`:`their`} own, over and over — like a hand wiggling ${s?`it.`:`them.`}`:`${o} ${s?`glides`:`glide`} once when the set-up loads, then ${s?`stays`:`stay`} where ${s?`it lands.`:`they land.`}`),c.push(`the movement runs between where the knob is set and the ${e.sweep===`top`?`top`:`bottom`} of its travel. actions set that starting point.`),e.bounce||c.push(n.map(t=>`${t[1]}${e.fall[t[0]]?` falls`:` rises`}`).join(`, `)+`.`),i.length&&c.push(`rear dip extras enabled: ${i.join(`, `)}.`);let l=Ge[t]||Ge.mood;return c.push(l.note),t===`mood`&&c.push(`MOOD MkI can't follow MIDI clock, so the speed runs free rather than locking to tempo.`),c}function Xe(e,t){return!e||!t||(e.device||`mood`)!==(t.device||`mood`)?!1:!!e.bounce==!!t.bounce&&e.sweep===t.sweep&&(e.shape||`tri`)===(t.shape||`tri`)}function Ze(e,t){let n=e.device||`mood`,r=V[n]?.faceName||V[n]?.name||n.toUpperCase(),i=z[t.controllerId]||z.chocolate,{rDown:a,lDown:o}=Je(e),s={art:`dips`,title:`set the switches on ${r}'s back`,body:`looking from behind, like the picture — only the outlined switches matter. right bank: push ${a.length?a.join(`, `):`nothing`} down, the other outlined ones up. left bank: push ${o.length?o.join(`, `):`nothing`} down, the other outlined ones up. anything not outlined, leave as it is.`};if(e.slot<=2&&(n===`mood`||n===`genloss`)){let t=e.slot===1?`right`:`left`;return[s,{art:`toggle`,pos:t,title:`flick the preset toggle ${t}`,body:`the small toggle between ${r}'s footswitches. ${t} is slot ${e.slot}.`},{art:`feet`,feetLabel:`hold ~3 seconds`,title:`hold both footswitches`,body:`press both and keep holding for about three seconds, until ${r} shows it's saved. it stores the switches and the knobs together.`},{art:`toggle`,pos:`mid`,title:`flick the toggle back to the middle`,body:`${r} goes back to running live. that's it — whenever an action needs “${e.name}”, scribble calls it up for you.`}]}let c=null;t.banks.forEach((t,n)=>Object.keys(t).forEach(r=>B.forEach(i=>{!c&&t[r][i.id].some(t=>t.control===`pc`&&t.set===e.id)&&(c={bi:n,k:r,a:i.label})})));let l=c,u=l?`${i.nav?`p`+String(l.bi+1).padStart(3,`0`)+` `+({L:`left`,R:`right`}[l.k]||l.k):`switch `+l.k} · ${l.a}`:null,d=`SAVE ${n.toUpperCase().slice(0,6)}`,f=!c&&i.nav&&t.onCreateSaveButton?{label:`put a save button on p128`,run:()=>t.onCreateSaveButton?.(e)}:null;return[s,{art:`scribble`,screen:u?u.toUpperCase():d,helper:f,title:u?`find ${u} on scribble`:`give scribble a save button`,body:u?`that button already sends “load slot ${e.slot}”. pressed while ${r}'s footswitches are held, the same message saves instead — so it doubles as your save button.`:i.nav?`one tap below puts “${d}” on p128. export to scribble once so the button exists.`:`set any spare controller switch to send program change ${e.slot} on channel ${t.channels[n]||2}.`},{art:`feet`,feetLabel:`hold, don't let go`,title:`hold both ${r} footswitches`,body:`press both and keep holding — that's what tells ${r} to save rather than load.`},{art:`scribble`,screen:u?u.toUpperCase():d,title:`while holding, press it on scribble`,body:`then let go of ${r}'s footswitches. slot ${e.slot} now holds this set-up.`}]}function W(e){let t=typeof e==`number`?e:parseInt(String(e??0),10);if(Number.isNaN(t))return String(e??``);let n=ze.find(e=>e.value===t);if(n)return n.label;let r=ze.reduce((e,n)=>Math.abs(n.value-t)<Math.abs(e.value-t)?n:e);return Math.abs(r.value-t)<=6?`≈ ${r.label}`:String(t)}function Qe(e,t){let n=e.find(e=>e.control===`pc`&&e.set),r=n?t.find(e=>e.id===n.set):null;if(!r)return null;let i=r.device||n?.device||`mood`,a=(U[i]||U.mood).filter(e=>r.move[e[0]]);if(!a.length)return null;let o=a[0],s=e.find(e=>e.device===i&&e.control===o[0]&&e.value!==null&&e.value!==void 0),c=s&&s.value!==null?Number(s.value):64,l=!s,u=(Ge[i]||Ge.mood).id,d=e.find(e=>e.device===i&&e.control===u&&e.value!==null&&e.value!==void 0),f=d&&d.value!==null?Number(d.value):64,p=r.sweep===`top`?c:0,m=r.sweep===`top`?127:c,h=o[1]+(a.length>1?` +${a.length-1}`:``),g=l?`${h}${r.bounce?` wiggles`:` glides`} from wherever it was saved to the ${r.sweep===`top`?`top`:`bottom`}. tap ${o[1]} on the pedal to set where it starts.`:`${h}${r.bounce?` wiggles `:` glides `}${W(r.bounce||!r.fall[o[0]]?p:m)}${r.bounce?` ↔ `:` → `}${W(r.bounce||!r.fall[o[0]]?m:p)} · speed ${W(f)}`;return{set:r,device:i,lo:p,hi:m,bounce:!!r.bounce,speed:f,noStart:l,knobId:o[0],text:g}}function $e(e,t,n){let r=V[t.device]?.faceName||V[t.device]?.name||t.device.toUpperCase();if(t.control===`pc`&&t.set)return`goes first — loads the switches, and puts ${r}'s knobs back where they were when you saved`;let i=Qe(e,n);if(!i)return``;if(t.device===i.device&&i.set.move[t.control])return`where the movement starts — it runs from here to the ${i.set.sweep===`top`?`top`:`bottom`}`;let a=Ge[i.device]||Ge.mood;return t.device===i.device&&t.control===a.id?`speed — ${a.label} is the speed knob while the set-up is loaded`:``}function et(e,t,n){let r=e[t];if(!r)return null;let i=V[r.device];if(!i)return null;if(r.control===`pc`){for(let i=t+1;i<e.length;i++){let t=e[i];if(t.device!==r.device||t.control!==`pc`)continue;let a=r.set?n.find(e=>e.id===r.set):null,o=t.set?n.find(e=>e.id===t.set):null,s=Xe(a,o);return{kind:`over`,merge:s?i:null,text:`the preset load at ${i+1}${o?` (“${o.name}”)`:``} replaces this whole set-up — knobs and dips.`+(s?` merge them into one preset?`:a&&o?` they can't merge: ${!!a.bounce==!!o.bounce?`sweep or shape differs`:`one bounces, one glides`}.`:``)}}return null}let a=i.controls.find(e=>e.id===r.control);if(!a||a.type===`foot`)return null;for(let n=t+1;n<e.length;n++){let t=e[n];if(t.device===r.device){if(t.control===r.control)return{kind:`over`,text:`overridden by ${n+1} · frees a slot`};if(t.control===`pc`)return{kind:`over`,text:`the preset load at ${n+1} replaces this · frees a slot`}}}for(let i=t-1;i>=0;i--){let t=e[i];if(t.device!==r.device||t.control!==`pc`)continue;let o=t.set?n.find(e=>e.id===t.set):null;return o&&o.move&&o.move[r.control]&&r.inst!==t.inst&&r.value!==null&&r.value!==void 0?{kind:`wig`,at:i,text:`moves where “${o.name}” starts: ${a.short} now ${o.bounce?`wiggles from `:`glides from `}${W(r.value)}`}:null}return null}var G=class e{static createBanks(e){let t=z[e]||z.chocolate,n=[];for(let e=0;e<t.banks;e++){let e={};t.keys.forEach(t=>{e[t]={press:[],hold:[],double:[]}}),n.push(e)}return n}static cloneBanks(e){return e.map(e=>{let t={};for(let n of Object.keys(e))t[n]={press:e[n].press.map(e=>({...e})),hold:e[n].hold.map(e=>({...e})),double:e[n].double.map(e=>({...e}))};return t})}static detachIn(e,t,n){e.forEach((r,i)=>{if(r.inst!==t)return;let a=n.find(e=>e.id===r.act),o={...r,from:a?a.name:`an action`};delete o.act,delete o.inst,e[i]=o})}static syncBanks(e,t,n){let r=e=>{if(!e.some(e=>e.act===t))return e;let r=[],i={};return e.forEach(e=>{if(e.act!==t){r.push(e);return}let a=e.inst??0;i[a]||(i[a]=!0,n.forEach(n=>r.push({...n,act:t,inst:e.inst})))}),r};return e.map(e=>{let t={};return Object.keys(e).forEach(n=>{t[n]={press:r(e[n].press),hold:r(e[n].hold),double:r(e[n].double)}}),t})}static getActiveStack(e,t,n,r){return!e[t]||!e[t][n]||!e[t][n][r]?[]:e[t][n][r]}static addOrToggleStep(t,n,r,i,a,o,s,c=8,l,u=[]){let d=e.cloneBanks(t),f=d[n][r][i],p=f.findIndex(e=>e.device===a&&e.control===o&&e.value===s);return p>=0?(f[p].inst!==void 0&&e.detachIn(f,f[p].inst,u),f.splice(p,1),d):(f.length>=c||f.push({device:a,control:o,value:s,...l?{label:l}:{}}),d)}static setKnobInBanks(t,n,r,i,a,o,s,c=8,l=[]){let u=e.cloneBanks(t),d=u[n][r][i],f=-1;return d.forEach((e,t)=>{e.device===a&&e.control===o&&(f=t)}),f>=0?(d[f].inst!==void 0&&e.detachIn(d,d[f].inst,l),d[f]={...d[f],value:s},u):(d.length<c&&d.push({device:a,control:o,value:s}),u)}static setValueAtInBanks(t,n,r,i,a,o,s=[]){let c=e.cloneBanks(t),l=c[n][r][i];return l[a]?(l[a].inst!==void 0&&e.detachIn(l,l[a].inst,s),l[a]={...l[a],value:o},c):c}static addMacroTemplateSteps(t,n,r,i,a,o,s=8){let c=e.cloneBanks(t),l=c[n][r][i];for(let e of o){if(l.length>=s)break;l.push({device:a,control:e.controlId,value:e.value,label:e.label})}return c}static addOrUpdatePCStep(t,n,r,i,a,o,s,c=8){let l=e.cloneBanks(t),u=l[n][r][i],d=u.findIndex(e=>e.device===a&&e.control===`pc`&&e.value===o&&!e.set);return d>=0?(u.splice(d,1),l):(u.length>=c||u.push({device:a,control:`pc`,value:o,label:s||`PRESET ${o}`}),l)}static assignGuidedPCStep(t,n,r,i,a,o,s=8){let c=e.cloneBanks(t),l=c[n][r][i],u=l.findIndex(e=>e.device===a&&e.control===`pc`),d={device:a,control:`pc`,value:0,label:`LEARN CH ${o}`};return u>=0?l[u]=d:l.length<s&&l.push(d),c}static removeStep(t,n,r,i,a,o=[]){let s=e.cloneBanks(t),c=s[n][r][i];return a>=0&&a<c.length&&(c[a].inst!==void 0&&e.detachIn(c,c[a].inst,o),c.splice(a,1)),s}static moveStep(t,n,r,i,a,o){let s=e.cloneBanks(t),c=s[n][r][i],l=a+o;if(l>=0&&l<c.length&&a>=0&&a<c.length){let e=c[a];c[a]=c[l],c[l]=e}return s}static moveTo(t,n,r,i,a,o){let s=e.cloneBanks(t),c=s[n][r][i];if(a>=0&&a<c.length&&o>=0&&o<c.length){let[e]=c.splice(a,1);c.splice(o,0,e)}return s}static countTotalAssignedSteps(e){let t=0;for(let n of e)for(let e of Object.keys(n))t+=n[e].press.length+n[e].hold.length+n[e].double.length;return t}static usedDeviceIds(e){let t={};return e.forEach(e=>{Object.keys(e).forEach(n=>{B.forEach(({id:r})=>{e[n][r].forEach(e=>{t[e.device]=!0})})})}),Object.keys(t)}static usedControlIds(e,t){let n={};return e.forEach(e=>{Object.keys(e).forEach(r=>{B.forEach(({id:i})=>{e[r][i].forEach(e=>{e.device===t&&e.control!==`pc`&&(n[e.control]=!0)})})})}),Object.keys(n)}},K=class e{static{this.controlMap=new Map}static{this.targetMap=new Map}static{Object.values(V).forEach(t=>{t.controls.forEach(n=>{e.controlMap.set(`${t.id}:${n.id}`,n)})}),Ue.forEach(t=>{e.targetMap.set(t.id,t)})}static getDevice(e){return V[e]}static getController(e){return z[e]||z.chocolate}static getBrain(e){return H[e]||H.none}static getTarget(t){return e.targetMap.get(t)||Ue[0]}static getControl(t,n){return e.controlMap.get(`${t}:${n}`)}static valueOptionsFor(e){return e.values?e.values:e.type===`knob`?ze:[]}static formatControlLabel(t,n,r){let i=e.getControl(t,n);if(!i)return n;let a=i.label;if(r!=null){let t=e.valueOptionsFor(i).find(e=>e.value===r);t?a+=` · `+t.label:i.type===`knob`&&(a+=` · `+W(r))}return a}static findNextFreeChannel(e,t){let n={};e.forEach(e=>{t[e]&&(n[t[e]]=!0)});for(let e=1;e<=16;e++)if(!n[e])return e;return 1}static detectChannelCollisions(e,t){let n={};e.forEach(e=>{let r=V[e],i=t[e]||(r?r.midiChannel:1);(n[i]=n[i]||[]).push(r?.name||e)});let r=[];return Object.keys(n).forEach(e=>{let t=Number(e);n[t].length>1&&r.push({channel:t,devices:n[t]})}),r}static getDeviceAccentColorInt(e){let t=V[e];if(!t||!t.accent)return 0;let n=t.accent.replace(`#`,``);return n.length===6?parseInt(n,16):0}},q=[[`red`,`#ef5c4c`],[`orange`,`#ef7d5c`],[`yellow`,`#f7c948`],[`green`,`#5bb85b`],[`mint`,`#9fe0c0`],[`cyan`,`#8fd0e6`],[`blue`,`#5b8fd6`],[`purple`,`#7b62b8`],[`pink`,`#e08fc0`],[`white`,`#f4ede0`]],J=q.reduce((e,[t,n])=>(e[t]=n,e),{}),tt=[[`ink`,`#16323d`],[`cream`,`#f7f1e3`],[`white`,`#ffffff`]],nt=tt.reduce((e,[t,n])=>(e[t]=n,e),{}),rt={mint:`green`,pink:`purple`};function it(e){let t=e>>16&255,n=e>>8&255,r=e&255,i=1/0,a=`red`;return q.forEach(([e,o])=>{let s=parseInt(o.slice(1),16),c=s>>16&255,l=s>>8&255,u=s&255,d=(t-c)**2+(n-l)**2+(r-u)**2;d<i&&(i=d,a=e)}),a}function at(e){if(e!=null){if(typeof e==`string`){let t=e.toLowerCase().trim();if(q.some(([e])=>e===t))return t;if(t.startsWith(`#`)){let e=parseInt(t.slice(1),16);if(!isNaN(e))return it(e)}}if(typeof e==`number`&&e>0)return it(e)}}function ot(e){let t=e.startsWith(`#`)?e.slice(1):e;if(t.length!==6)return!0;let n=parseInt(t,16),r=n>>16&255,i=n>>8&255,a=n&255;return(r*299+i*587+a*114)/1e3<150}var Y={scribble:{id:`scribble`,label:`Scribble relay`,role:`brain`,name:12,secondary:12,colors:null,text:!0,note:`a lit strip per switch: both lines, the colour, the text colour.`},mc3:{id:`mc3`,label:`Morningstar MC3`,role:`controller`,name:8,secondary:0,colors:[`red`,`orange`,`yellow`,`green`,`cyan`,`blue`,`purple`,`white`],text:!1,note:`one line on the shared screen, colour on the led. the second line has nowhere to go.`},chocolate:{id:`chocolate`,label:`M-Vave Chocolate`,role:`controller`,name:0,secondary:0,colors:[],text:!1,note:`no screen, no leds. this one only ever reaches the printed label sheet.`}},st=[{id:`conductor`,name:`conductor`,colour:`#f7c948`,blurb:`keeps everything in step and changes several things with one stomp — the scene changes.`},{id:`buffer`,name:`micro-buffer`,colour:`#9fe0c0`,blurb:`catches tiny moments of what you play, then freezes, slices and retunes them.`},{id:`glue`,name:`spatial glue`,colour:`#b9a6e6`,blurb:`the space around everything — washes, trails, tape echoes and keeping layers behind the dry guitar.`},{id:`loop`,name:`macro-loop`,colour:`#e08fc0`,blurb:`long phrases: record, layer, wear them down, bend their speed.`},{id:`wear`,name:`tape & wear`,colour:`#6d93ad`,blurb:`warble, flutter, saturation, magnetic age and VHS failure across the signal chain.`}];function ct(e){return st.find(t=>t.id===e)||st[0]}var X=(e,t,n)=>({device:e,control:t,value:n==null?null:Number(n)}),lt=[{id:`a1`,name:`scene drop`,caps:[`conductor`,`loop`,`buffer`],what:`slows the loop and freezes a texture on the same stomp.`,steps:[X(`blooper`,`modA`,32),X(`mood`,`microloop`)]},{id:`a2`,name:`neutral start`,caps:[`conductor`],what:`puts both pedals back to a known place at the top of a song.`,steps:[X(`blooper`,`stability`,0),X(`mood`,`mix`,64),X(`mood`,`wetmode`,1)]},{id:`a3`,name:`octave down`,caps:[`buffer`],what:`steps the clock down so the micro-loop plays lower.`,steps:[X(`mood`,`clock`,32)]},{id:`a4`,name:`freeze on decay`,caps:[`buffer`],what:`stretch mode, then catch whatever's ringing — stomp after the pick, not on it.`,steps:[X(`mood`,`micromode`,3),X(`mood`,`microloop`)]},{id:`a5`,name:`tape chirps`,caps:[`buffer`],what:`tape mode with modify pushed up — short forward and backward rhythms.`,steps:[X(`mood`,`micromode`,2),X(`mood`,`modMicro`,96)]},{id:`a6`,name:`clock wiggle`,caps:[`buffer`,`glue`],what:`the clock knob moves back and forth by itself, like a hand wiggling it.`,steps:[{device:`mood`,control:`pc`,set:`clockwig`,value:null},X(`mood`,`clock`,64),X(`mood`,`mix`,32)]},{id:`a7`,name:`sink it`,caps:[`glue`],what:`pulls the wet mix down so the textures sit under your playing.`,steps:[X(`mood`,`mix`,32)]},{id:`a8`,name:`wash the loop`,caps:[`glue`,`buffer`],what:`sends the micro-loops through the reverb.`,steps:[X(`mood`,`routing`,2),X(`mood`,`wetmode`,1)]},{id:`a9`,name:`smear swell`,caps:[`glue`],what:`the reverb smear rises once and stays up.`,steps:[{device:`mood`,control:`pc`,set:`smearswell`,value:null},X(`mood`,`modWet`,32),X(`mood`,`mix`,64)]},{id:`a10`,name:`record / play`,caps:[`loop`],what:`first stomp records, the next one plays.`,steps:[X(`blooper`,`record`)]},{id:`a11`,name:`tape wear`,caps:[`loop`,`wear`],what:`turns stability up for drift and warble.`,steps:[X(`blooper`,`stability`,96)]},{id:`a12`,name:`undo a layer`,caps:[`loop`],what:`takes the last overdub off.`,steps:[X(`blooper`,`undo`,0)]},{id:`a13`,name:`overdub layer`,caps:[`loop`],what:`drops straight into overdub without stopping the phrase.`,steps:[X(`blooper`,`overdub`)]},{id:`a14`,name:`clean stop`,caps:[`loop`,`conductor`],what:`stops the loop cleanly on the stomp.`,steps:[X(`blooper`,`stop`)]},{id:`a15`,name:`redo layer`,caps:[`loop`],what:`brings back the layer you just undid.`,steps:[X(`blooper`,`redo`)]},{id:`a16`,name:`additive bake`,caps:[`loop`,`wear`],what:`switches to additive mode with light stability so modifiers bake into the loop.`,steps:[X(`blooper`,`mode`,2),X(`blooper`,`stability`,48),X(`blooper`,`repeats`,127)]},{id:`a17`,name:`frippertronics fade`,caps:[`loop`,`glue`],what:`sets repeats below max so older layers gently dissolve behind new ones.`,steps:[X(`blooper`,`mode`,1),X(`blooper`,`repeats`,48)]},{id:`a18`,name:`half-speed drop`,caps:[`loop`,`conductor`],what:`engages Mod A stepped speed down an octave.`,steps:[X(`blooper`,`modA_sel`,2),X(`blooper`,`modA`,32),X(`blooper`,`modA_on`,127)]},{id:`a19`,name:`stutter scramble`,caps:[`loop`,`buffer`],what:`turns on Mod B scrambler at medium intensity to shuffle the phrase.`,steps:[X(`blooper`,`modB_sel`,1),X(`blooper`,`modB`,96),X(`blooper`,`modB_on`,127)]},{id:`a20`,name:`clear modifiers`,caps:[`loop`,`conductor`],what:`turns both Mod A and Mod B off and resets stability.`,steps:[X(`blooper`,`modA_on`,0),X(`blooper`,`modB_on`,0),X(`blooper`,`stability`,0)]},{id:`a21`,name:`mod a wiggle`,caps:[`loop`],what:`loads the Blooper dip set-up so Mod A sweeps back and forth automatically.`,steps:[{device:`blooper`,control:`pc`,set:`bloopmodwig`,value:null},X(`blooper`,`modA`,32),X(`blooper`,`rampOn`,127),X(`blooper`,`rampSpeed`,48)]},{id:`a22`,name:`stability breathe`,caps:[`loop`,`wear`],what:`loads the Blooper dip set-up that gently swells and recedes tape wear.`,steps:[{device:`blooper`,control:`pc`,set:`bloopwearwig`,value:null},X(`blooper`,`stability`,16),X(`blooper`,`rampOn`,127),X(`blooper`,`rampSpeed`,32)]},{id:`a23`,name:`slip octave up`,caps:[`buffer`,`glue`],what:`switches the wet channel to Slip mode pitched an octave up.`,steps:[X(`mood`,`wetmode`,3),X(`mood`,`time`,96),X(`mood`,`modWet`,64),X(`mood`,`wet`,127)]},{id:`a24`,name:`envelope stutter`,caps:[`buffer`],what:`puts the micro-looper in envelope mode so every pick attack re-triggers the freeze.`,steps:[X(`mood`,`micromode`,1),X(`mood`,`modMicro`,80),X(`mood`,`microloop`,127)]},{id:`a25`,name:`clocked delay trails`,caps:[`glue`],what:`switches the wet side to delay mode with warm low-clock repeats.`,steps:[X(`mood`,`wetmode`,2),X(`mood`,`time`,64),X(`mood`,`modWet`,64),X(`mood`,`clock`,48)]},{id:`a26`,name:`drone bed`,caps:[`buffer`,`glue`],what:`engages both MOOD channels in stretch + smeared reverb for an instant ambient pad.`,steps:[X(`mood`,`micromode`,3),X(`mood`,`wetmode`,1),X(`mood`,`routing`,2),X(`mood`,`modWet`,96),X(`mood`,`both`,127)]},{id:`a27`,name:`bypass mood`,caps:[`conductor`],what:`cleanly bypasses both channels of MOOD.`,steps:[X(`mood`,`both`,0)]},{id:`a28`,name:`warm slapback`,caps:[`glue`],what:`fixed head, short time, low repeats — classic studio tape slap.`,steps:[X(`elcap`,`head`,1),X(`elcap`,`cmode`,1),X(`elcap`,`time`,28),X(`elcap`,`repeats`,24),X(`elcap`,`mix`,56),X(`elcap`,`onoff`,127)]},{id:`a29`,name:`multi-head wash`,caps:[`glue`],what:`multi-head mode with generous spring reverb and high repeats for rhythmic clouds.`,steps:[X(`elcap`,`head`,2),X(`elcap`,`cmode`,2),X(`elcap`,`repeats`,84),X(`elcap`,`spring`,80),X(`elcap`,`mix`,68)]},{id:`a30`,name:`worn reel echo`,caps:[`glue`,`wear`],what:`cranks tape age, wow & flutter, and crinkle for a chewed-up cassette echo.`,steps:[X(`elcap`,`tapeAge`,96),X(`elcap`,`wow`,88),X(`elcap`,`tapeCrinkle`,80),X(`elcap`,`lowEnd`,64)]},{id:`a31`,name:`infinite runaway`,caps:[`glue`,`conductor`],what:`engages El Capistan infinite hold so the repeats oscillate without dying out.`,steps:[X(`elcap`,`hold`,127)]},{id:`a32`,name:`release runaway`,caps:[`glue`,`conductor`],what:`releases infinite hold and drops repeats back to a safe trail.`,steps:[X(`elcap`,`hold`,0),X(`elcap`,`repeats`,52)]},{id:`a33`,name:`sound-on-sound looper`,caps:[`loop`,`glue`],what:`switches El Capistan into Single Head Mode C (SOS tape looper) at half speed.`,steps:[X(`elcap`,`head`,3),X(`elcap`,`cmode`,3),X(`elcap`,`speed`,127),X(`elcap`,`onoff`,127)]},{id:`a34`,name:`spring-only verb`,caps:[`glue`],what:`pulls echo repeats to zero and pushes the hidden spring tank up.`,steps:[X(`elcap`,`repeats`,0),X(`elcap`,`spring`,108),X(`elcap`,`mix`,64)]},{id:`a35`,name:`vhs camcorder`,caps:[`wear`],what:`mild wow, heavy flutter, and camcorder filter model with subtle hiss.`,steps:[X(`genloss`,`wow`,56),X(`genloss`,`flutter`,84),X(`genloss`,`model`,48),X(`genloss`,`noise`,2),X(`genloss`,`bypass`,127)]},{id:`a36`,name:`chewed cassette`,caps:[`wear`],what:`pushes saturation and failure up with random tape snags enabled.`,steps:[X(`genloss`,`saturate`,92),X(`genloss`,`failure`,96),X(`genloss`,`snag`,127),X(`genloss`,`wow`,80)]},{id:`a37`,name:`tape stop drop`,caps:[`wear`,`conductor`],what:`sets Aux to Stop mode and triggers a dramatic tape-stop pitch dive.`,steps:[X(`genloss`,`aux`,1),X(`genloss`,`auxSw`,127)]},{id:`a38`,name:`release aux`,caps:[`wear`,`conductor`],what:`releases the Generation Loss Aux switch so playback resumes.`,steps:[X(`genloss`,`auxSw`,0)]},{id:`a39`,name:`classic gen loss`,caps:[`wear`],what:`flips into Classic MK1 mode with unity dry blend for lo-fi chorus.`,steps:[X(`genloss`,`classic`,127),X(`genloss`,`dry`,3),X(`genloss`,`wow`,64),X(`genloss`,`flutter`,48)]},{id:`a40`,name:`wide stereo warble`,caps:[`wear`,`glue`],what:`loads the stereo spread dip set-up so wow drifts in opposite phase across L/R.`,steps:[{device:`genloss`,control:`pc`,set:`stereochorus`,value:null},X(`genloss`,`wow`,48),X(`genloss`,`volume`,64)]},{id:`a41`,name:`classic wow wiggle`,caps:[`wear`],what:`loads the classic wiggle set-up so wow and flutter sweep on their own.`,steps:[{device:`genloss`,control:`pc`,set:`classicwiggle`,value:null},X(`genloss`,`wow`,32),X(`genloss`,`volume`,48)]},{id:`a42`,name:`nostalgia dissolve`,caps:[`conductor`,`wear`,`glue`],what:`freezes MOOD, kicks on El Capistan multi-head wash, and drapes Gen Loss VHS wear over the whole rig.`,steps:[X(`mood`,`microloop`,127),X(`elcap`,`head`,2),X(`elcap`,`mix`,68),X(`genloss`,`wow`,64),X(`genloss`,`bypass`,127)]},{id:`a43`,name:`all-home reset`,caps:[`conductor`],what:`returns Blooper, MOOD, El Capistan, and Gen Loss to clean, predictable settings.`,steps:[X(`blooper`,`stability`,0),X(`mood`,`mix`,48),X(`elcap`,`hold`,0),X(`elcap`,`repeats`,40),X(`genloss`,`auxSw`,0),X(`genloss`,`bypass`,0)]},{id:`a44`,name:`dub echo freeze`,caps:[`conductor`,`buffer`,`glue`],what:`catches a micro-loop in MOOD while spiking El Capistan repeats and spring tank.`,steps:[X(`mood`,`microloop`,127),X(`elcap`,`repeats`,96),X(`elcap`,`spring`,88)]},{id:`a45`,name:`worn loop handoff`,caps:[`conductor`,`loop`,`wear`],what:`puts Blooper into playback and engages Gen Loss saturation so the loop sounds like an old reel.`,steps:[X(`blooper`,`play`),X(`blooper`,`stability`,64),X(`genloss`,`saturate`,80),X(`genloss`,`bypass`,127)]},{id:`a46`,name:`ambient blackout`,caps:[`conductor`,`loop`,`glue`],what:`stops Blooper while holding El Capistan repeats and swelling MOOD reverb into the gap.`,steps:[X(`blooper`,`stop`),X(`elcap`,`hold`,127),X(`mood`,`wetmode`,1),X(`mood`,`mix`,88)]}],ut=5e3,dt=class extends Error{constructor(e,t){super(e),this.name=`DeviceApiError`,this.packet=t}},ft=class{constructor(){this.buf=``}push(e){this.buf+=e;let t=[],n=this.buf.indexOf(`~`);for(;n!==-1;)t.push(this.buf.slice(0,n)),this.buf=this.buf.slice(n+1),n=this.buf.indexOf(`~`);return t}get pending(){return this.buf}reset(){this.buf=``}};function pt(e){return e+`~`}function mt(e){return e.trim()===`ok`}function ht(e,t){let n=e.trim();try{return JSON.parse(n)}catch{throw new dt(`${t}: expected JSON but device sent ${n.slice(0,80)||`(empty packet)`}`,n)}}var gt=class{constructor(e,t=ut){this.buffer=new ft,this.queue=[],this.chain=Promise.resolve(),this.transport=e,this.timeoutMs=t}exchange(e){let t=this.chain.then(e,e);return this.chain=t.catch(()=>void 0),t}async send(e){return await this.transport.write(pt(e)),this.nextPacket(e)}async nextPacket(e){let t=this.queue.shift();if(t!==void 0)return t;let n=Date.now()+this.timeoutMs;for(;Date.now()<n;){let t=await this.readWithTimeout(n-Date.now());if(t===null)throw new dt(`${e}: serial stream closed before the device replied`);let r=this.buffer.push(t);if(r.length>0)return this.queue.push(...r.slice(1)),r[0]}throw new dt(`${e}: no response within ${this.timeoutMs}ms`+(this.buffer.pending?` (partial data: ${this.buffer.pending.slice(0,60)})`:``))}readWithTimeout(e){return e<=0?Promise.resolve(null):new Promise((t,n)=>{let r=!1,i=setTimeout(()=>{r||(r=!0,t(null))},e);this.transport.read().then(e=>{r||(r=!0,clearTimeout(i),t(e))},e=>{r||(r=!0,clearTimeout(i),n(e))})})}async expectAck(e,t){let n=await this.send(e);if(!mt(n))throw new dt(`${t}: expected "ok~" but device sent "${n}"`,n)}check(){return this.exchange(async()=>ht(await this.send(`CHCK`),`CHCK`))}requestGlobalSettings(){return this.exchange(async()=>(await this.expectAck(`DREQ`,`DREQ`),ht(await this.send(`globalSettings`),`DREQ globalSettings`)))}requestBankSettings(e){return this.exchange(async()=>(await this.expectAck(`DREQ`,`DREQ`),ht(await this.send(`bankSettings,${e}`),`DREQ bankSettings,${e}`)))}transferGlobalSettings(e){return this.exchange(async()=>{await this.expectAck(`DTXR`,`DTXR`),await this.expectAck(`globalSettings`,`DTXR globalSettings`),await this.expectAck(JSON.stringify(e),`DTXR globalSettings payload`)})}transferBankSettings(e,t){return this.exchange(async()=>{await this.expectAck(`DTXR`,`DTXR`),await this.expectAck(`bankSettings,${e}`,`DTXR bankSettings,${e}`),await this.expectAck(JSON.stringify(t),`DTXR bankSettings,${e} payload`)})}control(...e){return this.exchange(async()=>{await this.expectAck(`CTRL`,`CTRL`),await this.expectAck(JSON.stringify({command:e}),`CTRL payload`)})}async savePresets(){await this.control(`savePresets`)}async goToBank(e){await this.control({goToBank:e})}async restart(){await this.control(`restart`)}async readFullConfig(e={}){let t=e.bankCount??128,n=await this.check(),r=await this.requestGlobalSettings(),i=[];for(let n=0;n<t;n++)i.push(await this.requestBankSettings(n)),e.onProgress?.(n+1,t);return{deviceSettings:n,globalSettings:r,bankSettings:i,presetSettings:i}}async writeFullConfig(e,t={}){let n=e.bankSettings??e.presetSettings??[],r=Math.min(t.bankCount??n.length,n.length);await this.transferGlobalSettings(e.globalSettings);for(let e=0;e<r;e++)await this.transferBankSettings(e,n[e]),t.onProgress?.(e+1,r);t.save!==!1&&await this.savePresets()}async close(){await this.transport.close?.()}},_t=class{constructor(e){this.reader=null,this.decoder=new TextDecoder,this.pendingRead=null,this.port=e}async write(e){let t=this.port.writable.getWriter();try{await t.write(new TextEncoder().encode(e))}finally{t.releaseLock()}}async read(){return this.reader||=this.port.readable.getReader(),this.pendingRead||=(async()=>{try{let{value:e,done:t}=await this.reader.read();return t?null:this.decoder.decode(e,{stream:!0})}finally{this.pendingRead=null}})(),this.pendingRead}async close(){if(this.reader){try{await this.reader.cancel(),this.reader.releaseLock()}catch{}this.reader=null,this.pendingRead=null}}},vt=115200;function yt(e){return`0x`+e.toString(16).toUpperCase().padStart(2,`0`)}var Z=new class{constructor(){this.midiAccess=null,this.listeners=new Set,this.isSupported=typeof navigator<`u`&&`requestMIDIAccess`in navigator,this.isSerialSupported=typeof navigator<`u`&&`serial`in navigator,this.activePort=null,this.activePortName=``}async init(){if(!this.isSupported)return!1;try{return this.midiAccess=await navigator.requestMIDIAccess({sysex:!0}),this.midiAccess.onstatechange=()=>{this.notifyListeners()},!0}catch(e){return console.warn(`Web MIDI Access denied or unavailable:`,e),!1}}onStateChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notifyListeners(){this.listeners.forEach(e=>e())}getHardwareNodes(e){let t=[],n=this.getDetectedMidiPorts(),r=z[e.controllerId],i=e.brainId===`scribble`||e.controllerId===`scribble`,a=i?`Pirate MIDI Scribble`:r?r.name:`Controller`,o=n.find(t=>t.name.toLowerCase().includes(e.brainId)||t.name.toLowerCase().includes(e.controllerId)),s=i?this.activePortName||(this.isSerialSupported?`USB Serial CDC (115200)`:`Web Serial unavailable`):`USB MIDI Port 1`;return t.push({id:i?`scribble`:e.controllerId,name:a,kind:i?`USB-C Serial · CDC`:`USB-C MIDI`,port:o?o.portName:s,canRead:!0,canListen:!1}),e.rig.forEach(r=>{let i=V[r];if(!i)return;let a=n.find(e=>e.name.toLowerCase().includes(r));t.push({id:r,name:i.name,kind:`TRS MIDI`,port:a?a.portName:`MIDI Out Ch ${e.channels[r]||1}`,canRead:!1,canListen:!0})}),t}getDetectedMidiPorts(){if(!this.midiAccess)return[];let e=[];return this.midiAccess.inputs.forEach(t=>{e.push({id:t.id,name:t.name||`Unknown Device`,portName:t.name||t.id})}),e}async connectScribble(e=!0){if(!this.isSerialSupported)throw Error(`Web Serial is not supported in this browser. Please use Chrome or Edge on desktop.`);let t=await this.openDeviceApi(e);if(!t)return null;try{return await t.check()}catch(e){throw console.warn(`Scribble handshake failed:`,e),e}finally{await t.close()}}async disconnectScribble(){if(this.activePort){try{await this.activePort.close()}catch(e){console.warn(`Error closing serial port:`,e)}this.activePort=null,this.activePortName=``}}async openDeviceApi(e){if(!this.isSerialSupported)return console.warn(`Web Serial is unavailable — the Device API needs Chrome or Edge on desktop.`),null;let t=navigator.serial,n=this.activePort;if(!n){let r=await t.getPorts();r.length>0?n=r[0]:e&&(n=await t.requestPort())}if(!n)return null;if(!n.readable||!n.writable)try{await n.open({baudRate:vt})}catch(e){if(e?.name!==`InvalidStateError`&&!String(e?.message||``).includes(`already open`))throw e}this.activePort=n;let r=n.getInfo?n.getInfo():{};return this.activePortName=r.usbVendorId?`USB Serial (0x${r.usbVendorId.toString(16).padStart(4,`0`)})`:`USB Serial CDC (115200 baud)`,new gt(new _t(n))}async requestLiveSerialConfig(e={}){let t=null;try{return t=await this.openDeviceApi(!0),t?await t.readFullConfig(e):null}catch(e){throw console.warn(`Scribble read failed:`,e),e}finally{await t?.close()}}async readLiveDeviceConfig(e,t={}){if(e!==`scribble`)return null;let n=null;try{return n=await this.openDeviceApi(t.allowPrompt??!0),n?await n.readFullConfig(t):null}catch(e){throw console.warn(`Scribble read failed:`,e),e}finally{await n?.close()}}async writeLiveDeviceConfig(e,t={}){let n=null;try{return n=await this.openDeviceApi(!0),n?(await n.writeFullConfig(e,t),!0):!1}catch(e){return console.warn(`Scribble write failed:`,e),!1}finally{await n?.close()}}sendControlChange(e,t,n){if(!this.midiAccess)return;let r=176|e-1&15;this.midiAccess.outputs.forEach(e=>{try{e.send([r,t&127,n&127])}catch{}})}sendProgramChange(e,t){if(!this.midiAccess)return;let n=192|e-1&15;this.midiAccess.outputs.forEach(e=>{try{e.send([n,t&127])}catch{}})}};function bt(e){if(!e||typeof e!=`object`)return{version:`2.0.0`,major:`v2`,detectedFrom:`default`};let t=e.deviceSettings?.firmwareVersion;if(typeof t==`string`&&t.trim().length>0){let e=t.trim();return e.startsWith(`2.`)||e.startsWith(`v2.`)?{version:e,major:`v2`,detectedFrom:`metadata`}:e.startsWith(`1.`)||e.startsWith(`v1.`)?{version:e,major:`v1`,detectedFrom:`metadata`}:{version:e,major:e.startsWith(`2`)?`v2`:`v1`,detectedFrom:`metadata`}}let n=e.globalSettings;return Array.isArray(e.presetSettings)&&!Array.isArray(e.bankSettings)||n?.bankPcMidiOutputs!==void 0||n?.tapTempoQuant!==void 0||n?.zeroIndexBanks!==void 0||n?.midiOutPortMode===`typeA`||n?.midiOutPortMode===`typeB`||n?.switches?.some(e=>e?.mode===`presetDown`||e?.mode===`presetUp`||e?.mode===`tapTempo`)?{version:`2.0.0`,major:`v2`,detectedFrom:`schema`}:{version:`1.0.1`,major:`v1`,detectedFrom:`schema`}}function xt(e){let t=e.replace(`#`,``);return parseInt(t,16)||0}var St=176,Ct=192;function wt(e,t,n,r){let i=K.getDevice(e.device),a=e.control===`pc`||e.control===`__pc__`,o=a?null:K.getControl(e.device,e.control),s=t&&t[e.device]?t[e.device]:i?.midiChannel||1;if(a){let t=n||qe,r=e.set?t.find(t=>t.id===e.set):null,a=e.set?r?r.slot:0:e.value??0,o=e.set?r?r.name.toUpperCase():`SET-UP`:e.label||`PC ${a}`,c=e.set?`load set-up · ${r?r.name:`missing`}`:e.label?`Preset ${a} · ${e.label}`:`Preset ${a} · PC ${a}`,l=Ct+(s-1);return{label:c,stepLabel:o,deviceId:i?.id||e.device,deviceName:i?.name||e.device,accent:i?.accent||`#ffffff`,channel:s,cc:null,value:a,pc:!0,bytes:[l,a],message:{statusByte:l,dataByte1:a,dataByte2:0}}}let c=e.value===null||e.value===void 0?127:Number(e.value),l=o?K.valueOptionsFor(o):[],u=(e.label?l.find(t=>t.oledLabel===e.label||t.label.toLowerCase()===e.label?.toLowerCase()):void 0)||l.find(e=>e.value===c);if(o?.pc||u?.pc){let t=Ct+(s-1),n=e.label||u?.oledLabel||u?.label.toUpperCase()||`PC ${c}`;return{label:`${o?.label||e.control} · ${u?.label||`PC ${c}`}`,stepLabel:n,deviceId:i?.id||e.device,deviceName:i?.name||e.device,accent:i?.accent||`#ffffff`,channel:s,cc:null,value:c,pc:!0,bytes:[t,c],message:{statusByte:t,dataByte1:c,dataByte2:0}}}let d=e.label||``;!d&&u&&(d=(u.oledLabel||u.label).toUpperCase()),!d&&o&&(d=o.short.toUpperCase());let f=o?.label||e.control;e.label&&!u?f+=` · `+e.label:e.value!==null&&e.value!==void 0&&o&&(u?f+=` · `+u.label:o.type===`knob`?f+=` · `+W(c):f+=` · `+c);let p=(u?.cc===void 0?o?.cc??0:u.cc)+(r?.[e.device]||0),m=St+(s-1);return{label:f,stepLabel:d,deviceId:i?.id||e.device,deviceName:i?.name||e.device,accent:i?.accent||`#ffffff`,channel:s,cc:p,value:c,pc:!1,bytes:[m,p,c],message:{statusByte:m,dataByte1:p,dataByte2:c}}}function Tt(e,t){if(!t)return null;let n=Y[e];if(!n)return null;if(n.colors===null)return t;if(!n.colors.length)return null;if(n.colors.includes(t))return t;let r=rt[t];return r&&n.colors.includes(r)?r:n.colors[0]}function Et(e){let t={press:`Press`,hold:`Long Press`,double:`Double Tap`},n=[];return e.banks.slice(0,3).forEach((r,i)=>{Object.keys(r).forEach(a=>{let o={};if(B.forEach(n=>{let i=r[a][n.id];i.length&&(o[t[n.id]]=i.slice(0,6).map(t=>{let n=wt(t,e.channels,e.pedalSets,e.offsets);return n.pc?{type:`Program Change`,channel:n.channel,number:n.value,label:n.stepLabel||n.label}:{type:`Control Change`,channel:n.channel,cc:n.cc??0,value:n.value,label:n.stepLabel||n.label}}))}),!Object.keys(o).length)return;let s=`${i}:${a}`,c=e.naming&&e.naming[s]||{},l=c.name?c.name.slice(0,8):``,u=Tt(`mc3`,c.color||null);n.push({bank:i+1,switch:a,preset:a,name:l,shortName:l,ledColor:u,ledColour:u,actions:o})})}),{schema:`stomp-stacks/mc3@1`,device:`Morningstar MC3`,banks:3,presets:n}}var Dt=class{constructor(){this.id=`mc3`,this.name=`Morningstar MC3 JSON`}compileExport(e){let t=Et(e);return{filename:`mc3-preset.json`,mimeType:`application/json`,content:JSON.stringify(t,null,2)}}compilePreview(e){let t=Et(e);return JSON.stringify(t,null,2).split(`
`).map(e=>({text:e}))}};function Ot(e,t){e.banks.forEach((e,n)=>{Object.keys(e).forEach((r,i)=>{B.forEach(a=>{let o=e[r][a.id];o.length&&t(n,r,i,a,o)})})})}var kt={usb:!0,ble:!0,midi1:!0};function At(e,t){let n=(t||e.scribbleFirmware?.major||`v1`)===`v2`,r=[],i=[`A`,`B`,`C`,`D`];for(let t=0;t<128;t++){let n=Math.floor(t/i.length),a=i[t%i.length],o=`${n}:${a}`,s=e.naming?.[o],c=`Preset ${t+1}`,l=`Second. ${t+1}`,u=0,d=[];if(n<e.banks.length){let t=e.banks[n],r=new Set,i=[];if(B.forEach(({id:n})=>{(t[a]?.[n]||[]).forEach(t=>{let n=wt(t,e.channels);r.add(n.deviceName.toUpperCase()),i.length<3&&i.push(n.stepLabel?`${n.deviceName.toUpperCase()} ${n.stepLabel}`:`${n.deviceName} ${n.label}`),u||=K.getDeviceAccentColorInt(t.device),d.push({statusByte:n.message.statusByte,dataByte1:n.message.dataByte1,dataByte2:n.message.dataByte2,outputs:{...kt}})})}),s?.name)c=s.name;else if(d.length>0){let e=Array.from(r);c=e.length?e.join(` + `):`BANK ${n+1}`}s?.secondary?l=s.secondary:d.length>0&&(l=i.join(` · `)||`Bank ${n+1}`),s?.color&&J[s.color]&&(u=xt(J[s.color]))}let f=d.slice(0,8);r.push({bankId:t,bankName:c.slice(0,17),secondaryText:l.slice(0,17),colourOverride:d.length>0||!!s?.color,colour:d.length>0||s?.color?u||582655:0,textColourOverride:d.length>0||!!s?.color,textColour:d.length>0||s?.color?16777215:0,midiValueDisplayOverride:!1,midiValueDisplay:d.length>0?`valueOnly`:`none`,midiValueDisplayCC:0,bpm:120,switches:[{pressMessages:{numMessages:0,messages:[]},holdMessages:{numMessages:0,messages:[]}},{pressMessages:{numMessages:0,messages:[]},holdMessages:{numMessages:0,messages:[]}}],customMessages:{numMessages:0,messages:[]},presetMessages:{numMessages:f.length,messages:f}})}if(n){let t={deviceSettings:{deviceModel:`Scribble`,firmwareVersion:e.scribbleFirmware?.major===`v2`?e.scribbleFirmware.version:`2.0.0`,hardwareVersion:`hw1.x.0`,deviceName:`Scribble`,uId:0x9070692f06d8,profileId:0},globalSettings:{deviceName:`Scribble`,currentBank:0,lightMode:`dark`,mainColour:15199215,textColour:0,displayBrightness:100,midiChannel:0,globalBpm:120,midiOutPortMode:`typeA`,bankPcMidiOutputs:{usbd:0,ble:0,midi1:0},clockMode:`external`,clockDisplayType:`bpm`,tapTempoQuant:`none`,usbdThruHandles:{usbd:!1,ble:!0,midi1:!0},bleThruHandles:{usbd:!0,ble:!1,midi1:!0},midi1ThruHandles:{usbd:!0,ble:!0,midi1:!0},midiClockOutHandles:{usbd:!1,ble:!1,midi1:!1},switches:[{mode:`presetDown`,pressMessages:{numMessages:0,messages:[]},holdMessages:{numMessages:0,messages:[]}},{mode:`presetUp`,pressMessages:{numMessages:0,messages:[]},holdMessages:{numMessages:0,messages:[]}}],customMessages:{numMessages:0,messages:[]},presetUpCC:1,presetDownCC:2,goToPresetCC:3,globalCustomMessagesCC:17,presetCustomMessagesCC:16,midiValueDisplay:`valueOnly`,midiValueDisplayCC:7,wirelessType:`ble`,bleMode:`server`,mainTextResize:!1,zeroIndexBanks:!1,kemperPlayerMode:!1,useStaticIp:!1,staticIp:`0.0.0.0`,gatewayIp:`0.0.0.0`},presetSettings:r};return Object.defineProperty(t,"bankSettings",{get(){return this.presetSettings},enumerable:!1,configurable:!0}),t}let a={deviceSettings:{deviceModel:`Scribble`,firmwareVersion:e.scribbleFirmware?.major===`v1`?e.scribbleFirmware.version:`1.0.1`,hardwareVersion:`1.x.0`,deviceName:`Scribble`,uId:0x9070692f06d8,profileId:0},globalSettings:{deviceName:`Scribble`,currentBank:0,lightMode:`dark`,mainColour:15199215,textColour:0,displayBrightness:100,midiChannel:0,globalBpm:120,midiOutPortMode:`midiOutA`,pcBankOutputs:{usbd:1,ble:1,midi1:1},clockMode:`external`,clockDisplayType:`bpm`,usbdThruHandles:{usbd:!0,ble:!0,midi1:!0},bleThruHandles:{usbd:!1,ble:!1,midi1:!1},midi1ThruHandles:{usbd:!0,ble:!0,midi1:!0},midiClockOutHandles:{usbd:!0,ble:!0,midi1:!0},switches:[{mode:`pressPresetDown`,pressMessages:{numMessages:0,messages:[]},holdMessages:{numMessages:0,messages:[]}},{mode:`pressPresetUp`,pressMessages:{numMessages:0,messages:[]},holdMessages:{numMessages:0,messages:[]}}],customMessages:{numMessages:0,messages:[]},presetUpCC:1,presetDownCC:2,goToPresetCC:3,globalCustomMessagesCC:17,presetCustomMessagesCC:16,midiValueDisplay:`valueOnly`,midiValueDisplayCC:7,wirelessType:`ble`,bleMode:`server`,mainTextResize:!1,kemperPlayerMode:!1,useStaticIp:!1,staticIp:`0.0.0.0`,gatewayIp:`0.0.0.0`},bankSettings:r};return Object.defineProperty(a,"presetSettings",{get(){return this.bankSettings},enumerable:!1,configurable:!0}),a}function jt(e,t,n,r,i){let a=e?.switches?.[t]||{},o=e?.bankName||e?.presetName||e?.name||e?.label||e?.strip?.name||``,s=e?.secondaryText||e?.secondary||e?.description||e?.strip?.secondary||a?.name||a?.label||a?.secondaryText||a?.secondary||``;return o=typeof o==`string`?o.trim():``,s=typeof s==`string`?s.trim():``,o||(n.length>0?(o=Array.from(new Set(n.map(e=>{let t=K.getDevice(e.device);return t?t.name.toUpperCase():e.device.toUpperCase()}))).join(` + `),s||=n.map(e=>{let t=K.getDevice(e.device)?.controls.find(t=>t.id===e.control);return t?t.short||t.label:e.control}).join(` · `)):o=`Preset ${r*4+t+1}`),{presetName:o,secondaryText:s}}function Mt(e,t,n=[`A`,`B`,`C`,`D`]){let r=[],i={};Object.keys(t).forEach(e=>{i[t[e]]=e});let a=Object.keys(t)[0]||`blooper`;function o(e){let t=[];return Array.isArray(e)&&e.forEach(e=>{let n=0,r=0,o=127;if(Array.isArray(e))n=e[0]||0,r=e[1]||0,o=e[2]??127;else if(e&&typeof e==`object`){if(typeof e.smartType==`string`)return;n=e.statusByte||0,r=e.dataByte1||0,o=e.dataByte2??127}let s=(n&15)+1,c=i[s]||a,l=K.getDevice(c);if(!l)return;if(n>=192&&n<=207){t.push({device:c,control:`pc`,value:r,label:`PC ${r}`});return}let u=l.controls.find(e=>e.cc===r)||l.controls[0];u&&t.push({device:c,control:u.id,value:o===127&&u.type===`foot`?null:o})}),t}if(Array.isArray(e?.macros)&&e.macros.length>0)return e.macros.forEach((e,t)=>{let i=typeof e.trigger?.bank==`number`?Math.max(0,e.trigger.bank-1):Math.floor(t/n.length),a=n[t%n.length];if(e.trigger){if(typeof e.trigger.switchKey==`string`&&n.includes(e.trigger.switchKey))a=e.trigger.switchKey;else if(typeof e.trigger.cc==`number`){let t=e.trigger.cc-80;t>=0&&t<n.length&&(a=n[t])}else typeof e.trigger.action==`string`&&n.includes(e.trigger.action)&&(a=e.trigger.action)}let s=Math.max(0,n.indexOf(a)),c=typeof e.trigger?.slot==`number`?e.trigger.slot:e.trigger?.cc?i*n.length+s+1:t+1,l=o(e.messages||[]),u=jt(e,s,l,i),d=at(e.strip?.mainColour??e.strip?.color??e.colour??e.color??e.mainColour);r.push({bankIndex:i,key:a,presetName:u.presetName,secondaryText:u.secondaryText,steps:l,slotNumber:c,color:d})}),r;let s=Array.isArray(e?.bankSettings)?e.bankSettings:Array.isArray(e?.presetSettings)?e.presetSettings:[];if(s.length>0&&(s.forEach((e,t)=>{let i=typeof e.bankId==`number`?e.bankId:typeof e.presetId==`number`?e.presetId:t;i===0&&t>0&&(i=t);let a=i+1,s=Math.floor((a-1)/n.length),c=(a-1)%n.length,l=n[c]||`A`,u=e.presetMessages?.messages||[],d=e.customMessages?.messages||[],f=e.switches?.[c]?.pressMessages?.messages||[],p=e.messages||[],m=o([...Array.isArray(u)?u:[],...Array.isArray(d)?d:[],...Array.isArray(f)?f:[],...Array.isArray(p)?p:[]]),h=jt(e,c,m,s),g=h.presetName&&!h.presetName.match(/^Preset \d+$/i),_=h.secondaryText&&!h.secondaryText.match(/^Second\. \d+$/i),v=at(e.colour??e.color??e.mainColour??e.strip?.mainColour);(g||_||m.length>0||v)&&r.push({bankIndex:s,key:l,presetName:h.presetName,secondaryText:h.secondaryText,steps:m,slotNumber:a,color:v})}),r.length>0)||e&&(Array.isArray(e.bankSettings)||Array.isArray(e.presetSettings)||Array.isArray(e.macros)))return r;let c=[{name:`CLOUD`,secondary:`Ambient Delay`,color:`red`},{name:`GLITCH POP`,secondary:`Microloop Granular`,color:`orange`},{name:`LOFI DRIFT`,secondary:`Tape Pitch Wobble`,color:`yellow`},{name:`TAPE TRIP`,secondary:`Echo Reverse`,color:`green`},{name:`BLOOPER`,secondary:`Loop Speed + Pitch`,color:`mint`},{name:`MOOD`,secondary:`Reverb + Slip`,color:`cyan`},{name:`EL CAPISTAN`,secondary:`Tape Echo`,color:`blue`},{name:`CHROMA`,secondary:`Chorus Flange`,color:`purple`}];for(let e=0;e<4;e++)n.forEach((t,i)=>{let o=e*n.length+i,s=o+1,l=a,u=K.getDevice(l),d=u?.controls[i%(u?.controls.length||1)]||u?.controls[0],f=u&&d?[{device:l,control:d.id,value:64}]:[],p=c[o%c.length];r.push({bankIndex:e,key:t,presetName:p.name,secondaryText:p.secondary,steps:f,slotNumber:s,color:p.color})});return r}var Nt=class{constructor(){this.id=`scribble`,this.name=`Pirate MIDI Scribble`}compileExport(e){let t=At(e);return{filename:`scribble.json`,mimeType:`application/json`,content:JSON.stringify(t,null,2)}}compilePreview(e){let t=At(e);return JSON.stringify(t,null,2).split(`
`).map(e=>({text:e||` `}))}};function Pt(e,t){return e?e.length<=t?e:e.slice(0,t):``}function Ft(){try{if(typeof localStorage<`u`&&localStorage.getItem(`stomp-stacks:setup-done`))return null}catch{}return 1}function It(e){let t=K.getController(e);return{controllerId:e,brainId:`scribble`,banks:G.createBanks(e),bank:0,selectedKey:t.keys[0],action:`press`,browseDevice:Ve[0],face:`photo`,popoverControlId:null,compileOpen:!1,settingsOpen:!1,controllerPickerOpen:!1,brainPickerOpen:!1,addPedalOpen:!1,confirmRemovePedal:null,channelPickerOpen:!1,colorPickerOpen:!1,targetId:`scribble`,rig:[`blooper`,`mood`,`elcap`],channels:{blooper:1,mood:2,elcap:3},naming:{},sheetOpen:!1,connectOpen:!1,readOpen:!1,readData:null,conn:{},listening:null,heard:null,offsets:{},monitorOn:!1,log:[],seq:0,ctrlMin:!1,drag:null,conflict:null,peek:null,mode:`assign`,actEdit:null,edPick:null,focus:null,libOpen:typeof window<`u`?window.innerWidth>=1100:!0,capOpen:{},lens:null,actions:lt.map(e=>({...e,caps:[...e.caps],steps:e.steps.map(e=>({...e}))})),pedalSets:qe.map(e=>({...e,move:{...e.move},fall:{...e.fall},...e.extras?{extras:{...e.extras}}:{}})),setsOpen:null,setsDevice:`mood`,walkIndex:null,instSeq:1,setupStep:Ft(),hintOpen:null,hintAll:!1,notice:null,firing:null,lit:null,jumpOpen:!1,scribbleFirmware:{version:`2.0.0`,major:`v2`,detectedFrom:`default`}}}var Lt=class extends EventTarget{constructor(...e){super(...e),this.state=It(`chocolate`)}set(e){this.state={...this.state,...e},this.dispatchEvent(new Event(`change`))}get activeStack(){let{banks:e,bank:t,selectedKey:n,action:r}=this.state;return G.getActiveStack(e,t,n,r)}get totalAssigned(){return G.countTotalAssignedSteps(this.state.banks)}limit(){let e=this.state,t=z[e.controllerId]||z.chocolate;return t.isBrain?H.scribble.maxSteps:e.brainId===`onboard`&&!t.onboard?1:H[e.brainId]?.maxSteps||8}limitWho(){let e=this.state,t=z[e.controllerId]||z.chocolate;return t.isBrain||e.brainId===`scribble`?`scribble`:e.brainId===`onboard`&&t.onboard?t.short:`${t.short} on its own`}slotName(){let e=this.state,t=z[e.controllerId]||z.chocolate,n=B.find(t=>t.id===e.action)?.label||e.action;return`${t.nav?`p${String(e.bank+1).padStart(3,`0`)} ${{L:`left`,R:`right`}[e.selectedKey]||e.selectedKey}`:`switch ${e.selectedKey}`} ${n}`}availableActions(){let e=z[this.state.controllerId]||z.chocolate;return B.filter(t=>!e.actions||e.actions.includes(t.id))}setsForDevice(e){return this.state.pedalSets.filter(t=>t.device===e)}setPedalSetupStep(e,t=this.state.browseDevice){let{banks:n,bank:r,selectedKey:i,action:a,mode:o,actEdit:s,actions:c}=this.state;if(o===`build`&&s){this.updateAction(s,n=>{let r=n.steps.findIndex(e=>e.device===t&&e.control===`pc`);return r>=0?n.steps[r]={...n.steps[r],set:e,value:null}:n.steps.length<this.limit()&&n.steps.unshift({device:t,control:`pc`,set:e,value:null}),n}),this.set({popoverControlId:null});return}let l=G.cloneBanks(n),u=l[r]?.[i]?.[a];if(!u)return;let d=u.findIndex(e=>e.device===t&&e.control===`pc`);d>=0?(u[d].inst!==void 0&&G.detachIn(u,u[d].inst,c),u[d].set===e?u.splice(d,1):u[d]={...u[d],set:e,value:null}):u.length<this.limit()&&u.unshift({device:t,control:`pc`,set:e,value:null}),this.set({banks:l,popoverControlId:null})}setPedalSetupAt(e,t){let n=G.cloneBanks(this.state.banks),r=n[this.state.bank]?.[this.state.selectedKey]?.[this.state.action];!r||!r[e]||(r[e].inst!==void 0&&G.detachIn(r,r[e].inst,this.state.actions),r[e]={...r[e],set:t,value:null},this.set({banks:n}))}setKnobValue(e,t){this.setKnob(e,t)}setKnobNumericValue(e,t){this.setKnob(e,t)}clearNotice(){this.setNotice(null)}setBank(e){this.selectBank(e)}nextFreeChannel(e=this.state.rig,t=this.state.channels){return K.findNextFreeChannel(e,t)}addPedal(e){if(this.state.rig.includes(e)){this.set({addPedalOpen:!1,browseDevice:e});return}let t=[...this.state.rig,e],n={...this.state.channels};n[e]||(n[e]=K.findNextFreeChannel(t.filter(t=>t!==e),n)),this.set({rig:t,channels:n,browseDevice:e,addPedalOpen:!1,popoverControlId:null})}dropPedal(e){if(this.state.rig.length<=1)return;let t=this.state.rig.filter(t=>t!==e),n=this.state.browseDevice===e?t[0]:this.state.browseDevice;this.set({rig:t,browseDevice:n,channelPickerOpen:!1,popoverControlId:null,confirmRemovePedal:null})}toggleRigPedal(e){this.state.rig.includes(e)?this.state.rig.length>1&&this.dropPedal(e):this.addPedal(e)}setPedalChannel(e,t){let n={...this.state.channels,[e]:t};this.set({channels:n,channelPickerOpen:!1})}sendTestCC(e){Z.sendControlChange(e,93,127),this.pushLog({text:`sent test cc 93 on ch ${e}`,sub:`sweeper diagnostic`,tone:`out`})}assignGuidedPC(e,t,n){let{banks:r,bank:i,action:a}=this.state,o=n||this.state.selectedKey,s=G.assignGuidedPCStep(r,i,o,a,e,t,this.limit()),c={...this.state.channels,[e]:t};this.set({banks:s,channels:c,selectedKey:o});let l=K.getDevice(e);this.pushLog({text:`assigned PC 0 on ch ${t} for ${l?.name||e}`,sub:`Switch ${o} (${a}) · temporary channel learn`,tone:`ok`})}sendDirectPC(e,t=0){Z.sendProgramChange(e,t),this.pushLog({text:`sent direct program change ${t} on ch ${e}`,sub:`Web MIDI broadcast`,tone:`out`})}sendGuidedPC(e,t){this.assignGuidedPC(e,t)}addPCStep(e,t,n){let{banks:r,bank:i,selectedKey:a,action:o}=this.state,s=G.addOrUpdatePCStep(r,i,a,o,e,t,n,this.limit());this.set({banks:s})}openPresetPopover(e=this.state.browseDevice){this.set({browseDevice:e,popoverControlId:`pc`})}selectKey(e){this.selectSwitch(e)}toggleChannelPicker(){this.set({channelPickerOpen:!this.state.channelPickerOpen})}openChannelPicker(){this.set({channelPickerOpen:!0})}closeChannelPicker(){this.set({channelPickerOpen:!1})}setBrain(e){this.set({brainId:e,brainPickerOpen:!1})}openBrainPicker(){this.set({brainPickerOpen:!0,channelPickerOpen:!1})}closeBrainPicker(){this.set({brainPickerOpen:!1})}openAddPedal(){this.set({addPedalOpen:!0,channelPickerOpen:!1})}closeAddPedal(){this.set({addPedalOpen:!1})}setConfirmRemove(e){this.set({confirmRemovePedal:e,channelPickerOpen:!1})}setTarget(e){this.set({targetId:e})}clickControl(e){if(this.state.mode===`build`&&this.state.actEdit){let t=e.values&&e.values.length>0?e.values[0].value:e.type===`knob`?64:null;this.addStep(e.id,t);return}let t=K.getDevice(this.state.browseDevice)?.macroTemplates?.some(t=>t.controlId===e.id);if(e.values&&e.values.length>0||e.type===`knob`||e.type===`toggle`||t){this.set({popoverControlId:this.state.popoverControlId===e.id?null:e.id,sheetOpen:!0});return}this.addStep(e.id,null)}addStep(e,t,n){let{banks:r,bank:i,selectedKey:a,action:o,browseDevice:s,mode:c,actEdit:l,actions:u}=this.state;if(c===`build`){if(!l){this.set({notice:`pick an action on the left first — or start a new one.`,popoverControlId:null});return}this.updateAction(l,r=>{let i=r.steps.findIndex(t=>t.device===s&&t.control===e);return i<0&&r.steps.length<this.limit()?r.steps.push({device:s,control:e,value:t,...n?{label:n}:{}}):i>=0&&(r.steps[i]={...r.steps[i],value:t,...n?{label:n}:{}}),r}),this.set({popoverControlId:null,notice:null,focus:`${s}:${e}`});return}let d=G.addOrToggleStep(r,i,a,o,s,e,t,this.limit(),n,u);this.set({banks:d,popoverControlId:null,sheetOpen:!0})}setKnob(e,t){let n=Number(t),r=this.state.browseDevice;if(this.state.mode===`build`&&this.state.actEdit){let t=this.actionById(this.state.actEdit);if(!t||!t.steps.some(t=>t.device===r&&t.control===e)){this.addStep(e,n);return}this.updateAction(t.id,t=>{let i=t.steps.findIndex(t=>t.device===r&&t.control===e);return i>=0&&(t.steps[i]={...t.steps[i],value:n}),t});return}let i=G.setKnobInBanks(this.state.banks,this.state.bank,this.state.selectedKey,this.state.action,r,e,n,this.limit(),this.state.actions);this.set({banks:i,sheetOpen:!0})}setValueAt(e,t,n){let r=t===null?null:Number(t),i=G.cloneBanks(this.state.banks),a=i[this.state.bank]?.[this.state.selectedKey]?.[this.state.action];!a||!a[e]||(a[e].inst!==void 0&&G.detachIn(a,a[e].inst,this.state.actions),a[e]={...a[e],value:r,...n===void 0?{}:{label:n}},this.set({banks:i}))}applyMacroTemplate(e){let{banks:t,bank:n,selectedKey:r,action:i,browseDevice:a}=this.state,o=K.getDevice(a)?.macroTemplates?.find(t=>t.id===e);if(!o)return;let s=G.addMacroTemplateSteps(t,n,r,i,a,o.steps,this.limit());this.set({banks:s,popoverControlId:null,sheetOpen:!0})}removeStep(e){let{banks:t,bank:n,selectedKey:r,action:i,actions:a}=this.state,o=G.removeStep(t,n,r,i,e,a);this.set({banks:o,edPick:null})}moveStep(e,t){let{banks:n,bank:r,selectedKey:i,action:a}=this.state,o=G.moveStep(n,r,i,a,e,t);this.set({banks:o})}moveTo(e,t){let{banks:n,bank:r,selectedKey:i,action:a}=this.state,o=G.moveTo(n,r,i,a,e,t);this.set({banks:o})}findSet(e){if(e)return this.state.pedalSets.find(t=>t.id===e)}actionById(e){if(e)return this.state.actions.find(t=>t.id===e)}capOf(e){return ct(e)}listCaps(e){let t={};return e.forEach(e=>{if(!e.act)return;let n=this.actionById(e.act);n&&n.caps.forEach(e=>t[e]=!0)}),Object.keys(t)}slotCaps(e){return e?this.listCaps([...e.press,...e.hold,...e.double]):[]}actionUsage(){let e={};return this.state.banks.forEach(t=>Object.keys(t).forEach(n=>B.forEach(r=>{let i={};t[n][r.id].forEach(t=>{t.act&&t.inst!==void 0&&!i[t.inst]&&(i[t.inst]=!0,e[t.act]=(e[t.act]||0)+1)})}))),e}missingFor(e){let t={};return e.steps.forEach(e=>{this.state.rig.includes(e.device)||(t[V[e.device]?.name||e.device]=!0)}),Object.keys(t)}updateAction(e,t){let n=this.state.actions.map(n=>n.id===e?t({...n,steps:n.steps.map(e=>({...e})),caps:[...n.caps]}):n),r=n.find(t=>t.id===e),i=r?G.syncBanks(this.state.banks,e,r.steps.filter(e=>this.state.rig.includes(e.device))):this.state.banks;this.set({actions:n,banks:i})}insertAction(e,t){let n=this.state,r=this.actionById(e);if(!r)return;if(!t){let t=n.banks[n.bank]?.[n.selectedKey]?.[n.action]||[],i=r.steps.find(e=>e.control===`pc`&&e.set&&n.rig.includes(e.device)&&t.some(t=>t.device===e.device&&t.control===`pc`&&t.set&&t.set!==e.set));if(i&&i.set){let n=t.findIndex(e=>e.device===i.device&&e.control===`pc`&&e.set&&e.set!==i.set);if(n>=0){let r=t[n],a=r.act?this.actionById(r.act)?.name||`this press`:r.from||`this press`;this.set({conflict:{act:e,device:i.device,oldSet:r.set,newSet:i.set,oldName:a},popoverControlId:null});return}}}let i=n.banks[n.bank]?.[n.selectedKey]?.[n.action]||[],a=this.slotName(),o=this.missingFor(r),s=r.steps.filter(e=>n.rig.includes(e.device)),c=n.conflict;if(t===`keepOld`&&c&&(s=s.filter(e=>e.device!==c.device||e.control!==`pc`)),t===`useNew`&&c){let e=i.filter(e=>e.device===c.device&&e.control===`pc`).length;if(i.length-e+s.length>this.limit()){this.set({notice:`“${r.name}” doesn't fit, even after dropping the other preset load.`,conflict:null});return}}if(t===`merge`&&c&&(s=s.filter(e=>e.device!==c.device||e.control!==`pc`)),!r.steps.length){this.set({notice:`“${r.name}” has no messages yet — open it and add some.`});return}if(!s.length){this.set({notice:`none of “${r.name}”'s pedals are in the rig (${o.join(` + `)}). edit it to point at yours.`});return}if(t!==`useNew`&&i.length+s.length>this.limit()){this.set({notice:`“${r.name}” needs ${s.length} messages; ${a} only has room for ${this.limit()-i.length} more.`});return}let l=n.instSeq,u=null,d=n.pedalSets;if(t===`merge`&&c){let e=this.findSet(c.oldSet),t=this.findSet(c.newSet);if(e&&t){let r=e.device||c.device||`mood`,i={};n.pedalSets.filter(e=>e.device===r).forEach(e=>i[e.slot]=!0);let a=1;for(;i[a]&&a<122;)a++;u=`s`+Date.now();let o={id:u,device:r,name:`${e.name} + ${t.name}`,slot:a,saved:!1,move:{...e.move,...t.move},fall:{...e.fall,...t.fall},bounce:e.bounce,sweep:e.sweep,shape:e.shape,extras:{...e.extras||{},...t.extras||{}}};d=[...n.pedalSets,o]}}let f=G.cloneBanks(n.banks),p=f[n.bank][n.selectedKey][n.action];if(t===`useNew`&&c)for(let e=p.length-1;e>=0;e--)p[e].device===c.device&&p[e].control===`pc`&&(p[e].inst!==void 0&&G.detachIn(p,p[e].inst,n.actions),p.splice(e,1));t===`merge`&&c&&u&&p.forEach((e,t)=>{e.device===c.device&&e.control===`pc`&&(e.inst!==void 0&&G.detachIn(p,e.inst,n.actions),p[t]={...p[t],set:u})});let m=t===`keepOld`||t===`merge`;s.forEach(t=>{p.push(m?{...t,from:r.name}:{...t,act:e,inst:l})});let h=c?V[c.device]?.faceName||V[c.device]?.name||c.device.toUpperCase():`MOOD`,g=t===`merge`?`merged into a new set-up — save it to ${h} once (walkthrough in set-ups) before it'll move anything.`:o.length?`added “${r.name}” without its ${o.join(` + `)} messages — not in the rig.`:null;this.set({banks:f,pedalSets:d,conflict:t?null:n.conflict,instSeq:l+1,notice:g,sheetOpen:!0,popoverControlId:null}),this.pushLog({text:`+ ${r.name}`,sub:`${a} · ${s.length} ${s.length===1?`message`:`messages`}, ${m?`unlinked`:`linked`}`,tone:`ok`})}removeGroup(e){let t=G.cloneBanks(this.state.banks),n=t[this.state.bank]?.[this.state.selectedKey]?.[this.state.action];if(n){for(let t=n.length-1;t>=0;t--)n[t].inst===e&&n.splice(t,1);this.set({banks:t,edPick:null})}}detachGroup(e){let t=G.cloneBanks(this.state.banks),n=t[this.state.bank]?.[this.state.selectedKey]?.[this.state.action];n&&(G.detachIn(n,e,this.state.actions),this.set({banks:t}))}newAction(e){let t=`u`+Date.now(),n={id:t,name:`new action`,caps:[e],what:``,steps:[]};this.set({actions:[...this.state.actions,n],actEdit:t,mode:`build`,capOpen:{...this.state.capOpen,[e]:!0}})}saveStackAsAction(e){let t=this.state,n=(t.banks[t.bank]?.[t.selectedKey]?.[t.action]||[]).filter(e=>!e.act);if(!n.length)return;let r=n.map(e=>{let t={...e};return delete t.from,t}),i=`u`+Date.now(),a=t.instSeq,o=this.ident(t.bank,t.selectedKey).name||`new action`,s=G.cloneBanks(t.banks),c=s[t.bank][t.selectedKey][t.action];c.forEach((e,t)=>{if(!e.act){let n={...e,act:i,inst:a};delete n.from,c[t]=n}}),this.set({actions:[...t.actions,{id:i,name:o,caps:[e],what:``,steps:r}],banks:s,actEdit:i,mode:`build`,instSeq:a+1})}deleteAction(e){let t=this.state,n=t.actions.find(t=>t.id===e),r=t=>t.map(t=>{if(t.act!==e)return t;let r={...t,from:n?n.name:`an action`};return delete r.act,delete r.inst,r}),i=t.banks.map(e=>{let t={};return Object.keys(e).forEach(n=>{t[n]={press:r(e[n].press),hold:r(e[n].hold),double:r(e[n].double)}}),t});this.set({actions:t.actions.filter(t=>t.id!==e),banks:i,actEdit:null,mode:`assign`})}updateSet(e,t){let n=this.state.pedalSets.map(n=>n.id===e?t({...n,move:{...n.move},fall:{...n.fall},...n.extras?{extras:{...n.extras}}:{}}):n);this.set({pedalSets:n})}newSet(e=this.state.setsDevice){let t={};this.state.pedalSets.filter(t=>t.device===e).forEach(e=>t[e.slot]=!0);let n=1;for(;t[n]&&n<122;)n++;let r=`s`+Date.now(),i={id:r,device:e,name:`new set-up`,slot:n,saved:!1,move:{},fall:{},bounce:!0,sweep:`top`,shape:`tri`,extras:{}};this.set({pedalSets:[...this.state.pedalSets,i],setsOpen:r,setsDevice:e,walkIndex:null})}saveSetToPedal(e){let t=this.findSet(e);if(!t)return;let n=t.device||`mood`,r=V[n]?.faceName||V[n]?.name||n.toUpperCase(),i=this.state.channels[n]||2;this.state.conn[n]&&Z.sendProgramChange(i,t.slot),this.pushLog({text:`${yt(192+i-1)} ${yt(t.slot)}`,sub:`${r} stores its switches and knobs in slot ${t.slot} — keep both footswitches held`,tone:this.state.conn[n]?`out`:`warn`}),this.updateSet(e,e=>({...e,saved:!0}))}mergeSetups(e,t){let n=this.state,r=G.cloneBanks(n.banks),i=r[n.bank]?.[n.selectedKey]?.[n.action];if(!i)return;let a=i[e],o=i[t];if(!a||!o||!a.set||!o.set)return;let s=this.findSet(a.set),c=this.findSet(o.set);if(!s||!c)return;let l=s.device||a.device||`mood`,u={};n.pedalSets.filter(e=>e.device===l).forEach(e=>u[e.slot]=!0);let d=1;for(;u[d]&&d<122;)d++;let f=`s`+Date.now(),p={id:f,device:l,name:`${s.name} + ${c.name}`,slot:d,saved:!1,move:{...s.move,...c.move},fall:{...s.fall,...c.fall},bounce:s.bounce,sweep:s.sweep,shape:s.shape,extras:{...s.extras||{},...c.extras||{}}};a.inst!==void 0&&G.detachIn(i,a.inst,n.actions),o.inst!==void 0&&G.detachIn(i,o.inst,n.actions),i[e]={...i[e],set:f},i.splice(t,1),this.set({banks:r,pedalSets:[...n.pedalSets,p]})}openSetups(e,t){let n=e?this.findSet(e):void 0,r=n?.device||t||this.state.setsDevice||`mood`,i=this.state.pedalSets.find(e=>e.device===r);this.set({setsDevice:r,setsOpen:n?n.id:i?i.id:`__empty__`,walkIndex:null})}closeSetups(){this.set({setsOpen:null,walkIndex:null})}setWalkIndex(e){this.set({walkIndex:e})}createSaveButtonOnP128(e){let t=this.state,n=z[t.controllerId]||z.chocolate,r=G.cloneBanks(t.banks),i=r.length-1,a=n.keys[0];r[i][a].press=[{device:e.device,control:`pc`,set:e.id,value:null}];let o={...t.naming,[`${i}:${a}`]:{name:`SAVE ${e.device.toUpperCase().slice(0,6)}`,secondary:`slot ${e.slot}`,color:`orange`}};this.set({banks:r,naming:o}),this.pushLog({text:`p128 → save ${e.device.toUpperCase()} slot ${e.slot}`,sub:`in your next scribble export`,tone:`ok`})}knobWord(e){return W(e)}wiggleInfo(e){return Qe(e,this.state.pedalSets)}stepRole(e,t){return $e(e,t,this.state.pedalSets)}clash(e,t){return et(e,t,this.state.pedalSets)}setCtrlMin(e){this.set({ctrlMin:e,colorPickerOpen:!1})}toggleCtrlMin(){this.set({ctrlMin:!this.state.ctrlMin,colorPickerOpen:!1})}setDrag(e){this.set({drag:e})}setPeek(e){this.set({peek:e})}setMode(e,t=e===`assign`?null:this.state.actEdit){this.set({mode:e,actEdit:t,popoverControlId:null,notice:null,focus:null})}setEdPick(e){this.set({edPick:e})}setFocus(e){this.set({focus:e})}setLibOpen(e){this.set({libOpen:e})}toggleLibOpen(){this.set({libOpen:!this.state.libOpen})}toggleCapOpen(e){this.set({capOpen:{...this.state.capOpen,[e]:!this.state.capOpen[e]}})}setLens(e){this.set({lens:this.state.lens===e?null:e})}setHintOpen(e){this.set({hintOpen:this.state.hintOpen===e?null:e})}toggleHintAll(){this.set({hintAll:!this.state.hintAll,hintOpen:null})}setNotice(e){this.set({notice:e})}setJumpOpen(e){this.set({jumpOpen:e})}closeConflict(){this.set({conflict:null})}setSetupStep(e){this.set({setupStep:e})}finishSetup(e){let t=this.state;try{typeof localStorage<`u`&&localStorage.setItem(`stomp-stacks:setup-done`,`1`)}catch{}this.set({setupStep:null});let n=z[t.controllerId]||z.chocolate,r=H[t.brainId]||H.scribble;this.pushLog({text:e?`setup skipped`:`rig set`,sub:`${n.short} · ${r.short} · ${t.rig.length} ${t.rig.length===1?`pedal`:`pedals`}`,tone:`ok`})}rerunSetup(){this.set({setupStep:1,settingsOpen:!1})}selectSwitch(e){this.set({selectedKey:e,popoverControlId:null,edPick:null})}selectBank(e){let t=Math.max(0,this.state.banks.length-1),n=Math.max(0,Math.min(t,e));this.set({bank:n,popoverControlId:null,jumpOpen:!1,edPick:null})}selectAction(e){this.set({action:e,popoverControlId:null,edPick:null})}setBrowseDevice(e){this.set({browseDevice:e,popoverControlId:null,channelPickerOpen:!1})}closePopover(){this.set({popoverControlId:null,drag:null})}setFace(e){this.set({face:e,popoverControlId:null})}openSettings(){this.set({settingsOpen:!0})}closeSettings(){this.set({settingsOpen:!1})}openControllerPicker(){this.set({controllerPickerOpen:!0})}closeControllerPicker(){this.set({controllerPickerOpen:!1})}openCompile(){this.set({compileOpen:!0})}closeCompile(){this.set({compileOpen:!1})}toggleSheet(){this.set({sheetOpen:!this.state.sheetOpen})}setSheet(e){this.set({sheetOpen:e})}toggleColorPicker(){this.set({colorPickerOpen:!this.state.colorPickerOpen})}closeColorPicker(){this.set({colorPickerOpen:!1})}namingTargets(){let e=[this.state.controllerId];return this.state.brainId===`scribble`&&!e.includes(`scribble`)&&e.push(`scribble`),e.filter(e=>Y[e]).map(e=>({...Y[e],id:e,...e===`scribble`&&this.state.controllerId===`scribble`?{role:`controller · brain`}:{}}))}displayTargets(){return this.namingTargets().filter(e=>e.name>0)}sharedColors(){let e=this.namingTargets().filter(e=>e.colors===null||e.colors.length>0);return e.length?q.map(e=>e[0]).filter(t=>e.every(e=>e.colors===null||e.colors&&e.colors.includes(t))):[]}autoName(e=this.state.bank,t=this.state.selectedKey){let n=this.state.banks[e]?.[t];if(!n)return``;let r=null,i=0;if(B.forEach(e=>n[e.id].forEach(e=>{i++,r||=e})),!r)return``;let a=r,o=K.getDevice(a.device);if(!o)return``;let s=a.control===`pc`?null:K.getControl(a.device,a.control),c=this.displayTargets().reduce((e,t)=>Math.min(e,t.name),24),l=a.control===`pc`?`set-up`:s?s.short:``;return Pt(i>1?`${o.name} +${i-1}`:`${o.name} ${l}`,c)}autoSecondary(e=this.state.bank,t=this.state.selectedKey){let n=this.state.banks[e]?.[t];if(!n)return``;let r=[];return B.forEach(e=>{n[e.id].length&&r.push(`${n[e.id].length} on ${e.label}`)}),r.join(` · `)}ident(e=this.state.bank,t){let n=z[this.state.controllerId]||z.chocolate,r=t??(n.nav?n.keys[0]:this.state.selectedKey),i=`${e}:${r}`,a=this.state.naming[i]||{},o=this.autoName(e,r),s=this.autoSecondary(e,r),c=a.color||null,l=c?J[c]:`#16323d`;return{name:a.name!=null&&a.name!==``?a.name:o,secondary:a.secondary||``,color:c,textColor:a.textColor||(ot(l)?`cream`:`ink`),autoText:!a.textColor,raw:a,auto:o,autoSec:s}}setIdent(e,t=this.state.bank,n){let r=z[this.state.controllerId]||z.chocolate,i=`${t}:${n??(r.nav?r.keys[0]:this.state.selectedKey)}`,a={...this.state.naming,[i]:{...this.state.naming[i],...e}};this.set({naming:a})}colorFor(e,t){if(!t)return null;let n=Y[e];if(!n)return null;if(n.colors===null)return t;if(!n.colors.length)return null;if(n.colors.includes(t))return t;let r=rt[t];return r&&n.colors.includes(r)?r:n.colors[0]}switchController(e){let t=K.getController(e),n=t.actions&&!t.actions.includes(this.state.action)?t.actions[0]:this.state.action;this.set({controllerId:e,...t.isBrain?{brainId:`scribble`}:{},banks:G.createBanks(e),bank:0,selectedKey:t.keys[0],action:n,controllerPickerOpen:!1,popoverControlId:null,colorPickerOpen:!1,jumpOpen:!1})}openConnect(){this.set({connectOpen:!0})}closeConnect(){this.set({connectOpen:!1})}pushLog(e){let t=this.state.seq+1,n={n:t,...e},r=[...this.state.log,n].slice(-60);this.set({seq:t,log:r})}toggleConn(e){if(e===`scribble`){if(this.state.conn.scribble){let e={...this.state.conn,scribble:!1};this.set({conn:e}),this.pushLog({text:`disconnected Pirate MIDI Scribble`,sub:`serial port closed`,tone:`warn`}),Z.disconnectScribble().catch(()=>{});return}if(!Z.isSerialSupported){if(typeof window<`u`&&typeof navigator<`u`){this.set({notice:`Web Serial is not supported in this browser. Please open Stomp Stacks in Google Chrome or Microsoft Edge desktop.`}),this.pushLog({text:`Web Serial unavailable`,sub:`Chrome or Edge desktop required for USB CDC`,tone:`warn`});return}{let e={...this.state.conn,scribble:!0};this.set({conn:e}),this.pushLog({text:`opened USB MIDI Port 1`,sub:`Pirate MIDI Scribble`,tone:`ok`});return}}this.pushLog({text:`connecting to Scribble...`,sub:`requesting USB serial port access`,tone:`trig`}),Z.connectScribble(!0).then(e=>{if(!e){this.pushLog({text:`serial connection canceled`,sub:`no USB port was selected`,tone:`warn`});return}let t=bt({deviceSettings:e});this.set({conn:{...this.state.conn,scribble:!0},scribbleFirmware:{...t,detectedFrom:`device`}}),this.pushLog({text:`connected ${e.deviceName||`Pirate MIDI Scribble`}`,sub:`firmware ${e.firmwareVersion||t.version} · hardware ${e.hardwareVersion||`1.x`}`,tone:`ok`})},e=>{let t=e?.name===`NotFoundError`?`No serial port was selected`:e?.message&&String(e.message).includes(`Failed to open`)?`Serial port is busy — close any other app (e.g. Pirate MIDI editor) using the port`:e?.message||`Could not connect to Scribble`;this.set({notice:t,conn:{...this.state.conn,scribble:!1}}),this.pushLog({text:`Scribble connection failed`,sub:t,tone:`warn`})});return}let t=!!this.state.conn[e],n={...this.state.conn,[e]:!t},r=t&&this.state.listening===e?null:this.state.listening;this.set({conn:n,listening:r});let i=Z.getHardwareNodes(this.state).find(t=>t.id===e);this.pushLog({text:(t?`closed `:`opened `)+(i?i.port:e),sub:i?i.name:e,tone:t?`warn`:`ok`})}stompTest(){let e=this.state,t=e.banks[e.bank]?.[e.selectedKey]?.[e.action]||[],n=B.find(t=>t.id===e.action),r=n?n.label:e.action;if(!t.length){this.pushLog({text:`switch ${e.selectedKey} · ${r}`,sub:`nothing on this press`,tone:`warn`});return}this.set({firing:e.selectedKey}),this.pushLog({text:`▸ switch ${e.selectedKey} · ${r}`,sub:`${t.length} ${t.length===1?`message`:`messages`} out`,tone:`trig`}),t.forEach((t,n)=>{setTimeout(()=>{let n=wt(t,e.channels,e.pedalSets,e.offsets),r=!!this.state.conn[t.device];r&&(n.pc?Z.sendProgramChange(n.channel,n.value):Z.sendControlChange(n.channel,n.cc??0,n.value)),this.pushLog({text:n.bytes.map(yt).join(` `),sub:r?`${n.deviceName} · ${n.label}`:`${n.deviceName} never answered — is it plugged in?`,tone:r?`out`:`warn`}),this.set({lit:{device:t.device,control:t.control}}),setTimeout(()=>{this.state.lit&&this.state.lit.control===t.control&&this.set({lit:null})},280)},110*n)}),setTimeout(()=>{this.set({firing:null})},110*t.length+260)}simScribblePresets(){let e=this.state,t=e.rig;if(!t.length)return[];let n=[1,2,3,5,8,13,17,21,34,55,64,89,127],r=q.map(e=>e[0]);return n.map((n,i)=>{let a=t[i%t.length],o=V[a],s=o?o.controls.filter(e=>e.type===`foot`&&!e.sub):[],c=s[i%Math.max(s.length,1)]||(o?o.controls[0]:null),l=c?[{device:a,control:c.id,value:null}]:[];if(i%3!=2&&t.length>1){let e=t[(i+1)%t.length],n=V[e],r=n?n.controls.filter(e=>e.type===`knob`&&!e.sub):[],a=r[i%Math.max(r.length,1)]||(n?n.controls[0]:null);a&&l.push({device:e,control:a.id,value:16*(i%7+1)})}if(i%4==1&&t.length>2){let e=t[(i+2)%t.length],n=V[e];if(n&&n.controls.length){let t=n.controls[(i+1)%n.controls.length];l.push({device:e,control:t.id,value:127})}}return{n,label:`${o?o.name.split(` `)[0].toUpperCase():`PEDAL`} ${c?(c.short||c.label||``).split(` `)[0]:``}`.slice(0,12).trim(),second:`${o?o.name.toLowerCase():a} · ch ${e.channels[a]||1}`,color:r[i%r.length],steps:l}})}async readFrom(e,t){let n=this.state,r=z[n.controllerId],i=r?r.keys:[`A`,`B`,`C`,`D`],a=!t&&e===`scribble`;if(a&&!Z.isSerialSupported){let t=this.simScribblePresets();this.pushLog({text:`Web Serial unavailable in this environment`,sub:`loaded simulated preset slots for testing`,tone:`warn`}),this.set({readOpen:!0,readData:{from:e,presets:t,dest:{},filter:``,allPresets:[],readingHardware:!1,scanned:128,total:128,found:t.length},connectOpen:!1});return}this.set({readOpen:!0,readData:{from:e,presets:[],dest:{},filter:``,allPresets:[],readingHardware:a,scanned:0,total:128,found:0},connectOpen:!1});let o=t;if(!o&&a){this.pushLog({text:`querying ${e}...`,sub:`reading banks over USB serial CDC`,tone:`trig`});try{o=await Z.readLiveDeviceConfig(e,{allowPrompt:!0,onProgress:(e,t)=>{!this.state.readData||!this.state.readData.readingHardware||this.set({readData:{...this.state.readData,scanned:e,total:t}})}})??void 0}catch(t){let n=t?.name===`NotFoundError`?`Device selection was canceled`:t?.message&&String(t.message).includes(`Failed to open`)?`Serial port is busy — close any other app (e.g. Pirate MIDI editor) using the port`:t?.message||`USB serial read failed`;this.pushLog({text:`read ${e} failed`,sub:n,tone:`warn`}),this.set({readOpen:!1,readData:null,notice:`Could not read from Scribble: ${n}`});return}}if(!o&&a){this.pushLog({text:`read ${e} failed`,sub:`no data received from hardware`,tone:`warn`}),this.set({readOpen:!1,readData:null,notice:`Could not connect to Scribble. Please verify the USB cable and permissions.`});return}if(o&&e===`scribble`){let e=bt(o);this.set({conn:{...this.state.conn,scribble:!0},scribbleFirmware:{...e,detectedFrom:t?`file`:`device`}})}let s=o?Mt(o,n.channels,i):[],c=q.map(e=>e[0]),l=s.map((e,t)=>{let r=e.slotNumber??e.bankIndex*i.length+(i.indexOf(e.key)>=0?i.indexOf(e.key)+1:t+1);return{n:r,label:e.presetName,second:e.secondaryText||`${V[e.steps[0]?.device]?.name||`pedal`} · ch ${n.channels[e.steps[0]?.device]||1}`,color:e.color||c[(r-1)%c.length],steps:e.steps}}),u=s.map((e,t)=>({id:`${e.bankIndex}:${e.key}:${t}`,bankIndex:e.bankIndex,key:e.key,presetName:e.presetName,secondaryText:e.secondaryText,steps:e.steps,selected:!0})),d=Z.getHardwareNodes(n).find(t=>t.id===e);this.pushLog({text:`read ${d?d.name:e}`,sub:o?`${l.length} device presets loaded live from physical Scribble`:`configuration loaded`,tone:`ok`}),this.set({readData:{from:e,presets:l,dest:{},filter:``,allPresets:u,readingHardware:!1,scanned:128,total:128,found:l.length}})}async readLiveUsbSerial(){return this.readFrom(`scribble`)}async connectAndImportScribble(){this.pushLog({text:`connecting to Scribble...`,sub:`requesting USB device permission`,tone:`trig`});let e=null;try{e=await Z.requestLiveSerialConfig()}catch(e){let t=e?.name===`NotFoundError`?`Device selection was canceled`:e?.message&&String(e.message).includes(`Failed to open`)?`Serial port is busy — close any other app (e.g. Pirate MIDI editor) using the port`:e?.message||`USB serial access error`;this.pushLog({text:`Scribble connection failed`,sub:t,tone:`warn`}),this.set({notice:`Could not connect to Scribble: ${t}`});return}if(!e)return;let t=this.state,n=z[t.controllerId],r=n?n.keys:[`A`,`B`,`C`,`D`],i=bt(e);this.set({conn:{...this.state.conn,scribble:!0},scribbleFirmware:{...i,detectedFrom:`device`}});let a=Mt(e,t.channels,r).map((e,t)=>({id:`${e.bankIndex}:${e.key}:${t}`,bankIndex:e.bankIndex,key:e.key,presetName:e.presetName,secondaryText:e.secondaryText,steps:e.steps,selected:!0}));if(a.length>0){this.loadPresetsIntoBanks(a),this.pushLog({text:`Scribble connected & synced`,sub:`imported ${a.length} active hardware presets`,tone:`ok`}),this.set({connectOpen:!1});return}this.readFrom(`scribble`,e)}setScribbleFirmware(e){let t=e.startsWith(`1`)||e===`v1`?`v1`:`v2`,n=e===`v1`?`1.0.1`:e===`v2`?`2.0.0`:e;this.set({scribbleFirmware:{version:n,major:t,detectedFrom:`manual`}}),this.pushLog({text:`scribble firmware set to ${t.toUpperCase()} (${n})`,sub:`export schema adjusted`,tone:`ok`})}loadScribbleFile(e){let t=bt(e);this.set({scribbleFirmware:{...t,detectedFrom:t.detectedFrom||`file`}}),this.pushLog({text:`loaded scribble config (${t.version})`,sub:`firmware ${t.major.toUpperCase()} detected from ${t.detectedFrom||`file`}`,tone:`ok`}),this.readFrom(`scribble`,e)}setReadFilter(e){this.state.readData&&this.set({readData:{...this.state.readData,filter:e}})}setReadDest(e,t,n){if(!this.state.readData)return;let r={...this.state.readData.dest};if(!t)delete r[e];else{let i=t.split(`:`);r[e]={key:i[0],bank:n??this.state.bank,action:i[1]||this.state.action,mode:r[e]?.mode||`replace`}}this.set({readData:{...this.state.readData,dest:r}})}setReadDestAction(e,t){if(!this.state.readData||!this.state.readData.dest[e])return;let n={...this.state.readData.dest,[e]:{...this.state.readData.dest[e],action:t}};this.set({readData:{...this.state.readData,dest:n}})}setReadDestMode(e,t){if(!this.state.readData||!this.state.readData.dest[e])return;let n={...this.state.readData.dest,[e]:{...this.state.readData.dest[e],mode:t}};this.set({readData:{...this.state.readData,dest:n}})}applyPresets(){let e=this.state.readData;if(!e||!e.presets)return;let t=e.presets.filter(t=>e.dest[t.n]).map(t=>({p:t,d:e.dest[t.n]})),n=this.state,r=n.banks.map(e=>{let t={};return Object.keys(e).forEach(n=>{t[n]={press:[...e[n].press],hold:[...e[n].hold],double:[...e[n].double]}}),t}),i={...n.naming};t.forEach(({p:e,d:t})=>{let a=t.bank??n.bank,o=r[a]?.[t.key];if(o&&(t.mode===`add`?o[t.action]=[...o[t.action],...e.steps.map(e=>({...e}))].slice(0,this.limit()):o[t.action]=e.steps.map(e=>({...e})),t.mode===`replace`)){let n=`${a}:${t.key}`;i[n]={name:e.label,secondary:e.second,color:e.color}}});let a=z[n.controllerId]||z.chocolate;this.pushLog({text:t.length?`pulled ${t.length} ${t.length===1?`preset in`:`presets in`}`:`took nothing`,sub:t.length?t.map(e=>`p${String(e.p.n).padStart(3,`0`)} → ${a.nav?`slot ${String((e.d.bank||0)+1).padStart(3,`0`)}`:`switch ${e.d.key}`}`).join(`, `):`left the rig as it was`,tone:`ok`}),this.set({banks:r,naming:i,readOpen:!1,readData:null})}togglePresetSelection(e){if(!this.state.readData||!this.state.readData.allPresets)return;let t=this.state.readData.allPresets.map(t=>t.id===e?{...t,selected:!t.selected}:t);this.set({readData:{...this.state.readData,allPresets:t}})}selectAllReadPresets(e){if(!this.state.readData||!this.state.readData.allPresets)return;let t=this.state.readData.allPresets.map(t=>({...t,selected:e}));this.set({readData:{...this.state.readData,allPresets:t}})}importSinglePreset(e){let t=this.state,n=t.bank,r=t.selectedKey,i=t.banks.map((t,i)=>{if(i!==n)return t;let a={...t};return a[r]={...a[r],press:[...e.steps]},a}),a=`${n}:${r}`,o={...t.naming,[a]:{name:e.presetName,secondary:e.secondaryText}};this.pushLog({text:`imported preset "${e.presetName}"`,sub:`loaded into Bank ${n+1} - Switch ${r}`,tone:`ok`}),this.set({banks:i,naming:o})}loadPresetsIntoBanks(e){if(!e||!e.length)return;let t=this.state,n=z[t.controllerId],r=n?n.keys:[`A`,`B`,`C`,`D`],i=Math.max(...e.map(e=>e.bankIndex),0),a=Math.max(t.banks.length,i+1),o=[];for(let e=0;e<a;e++){let n={...t.banks[e]||G.createBanks(t.controllerId)[0]};Object.keys(n).forEach(e=>{n[e]={press:[...n[e].press],hold:[...n[e].hold],double:[...n[e].double]}}),o.push(n)}let s={...t.naming};e.forEach(e=>{if(e.bankIndex<o.length&&r.includes(e.key)){o[e.bankIndex][e.key]&&(o[e.bankIndex][e.key].press=[...e.steps]);let t=`${e.bankIndex}:${e.key}`;s[t]={name:e.presetName,secondary:e.secondaryText}}});let c={...t.conn,scribble:!0};this.set({banks:o,naming:s,conn:c,readOpen:!1,readData:null})}importSelectedDevicePresets(){let e=this.state.readData;if(!e||!e.allPresets||!e.allPresets.length)return;let t=e.allPresets.filter(e=>e.selected);t.length&&(this.loadPresetsIntoBanks(t),this.pushLog({text:`imported ${t.length} presets from Scribble`,sub:`loaded into Stomp Stacks banks & macro stacks`,tone:`ok`}))}pickReadRow(e,t){}applyRead(){this.importSelectedDevicePresets()}cancelRead(){this.set({readOpen:!1,readData:null})}listenTo(e){if(!this.state.conn[e])return;this.set({listening:e,heard:null});let t=V[e];if(!t)return;let n={blooper:0,mood:0,elcap:4,genloss:-2}[e]||0,r=t.controls[2]||t.controls[0],i=r?r.cc:10,a=this.state.offsets[e]||0;setTimeout(()=>{if(this.state.listening!==e)return;let o=i+a+n,s=i+a;this.set({heard:{pedal:e,control:r.id,cc:o,expect:s,drift:n}});let c=this.state.channels[e]||1;this.pushLog({text:`${yt(176+c-1)} ${yt(o)} 7F`,sub:`${t.name} sent this when you moved ${r.short||r.label}`,tone:`in`})},1100)}acceptDrift(){let e=this.state.heard;if(!e)return;let t=V[e.pedal],n={...this.state.offsets,[e.pedal]:(this.state.offsets[e.pedal]||0)+e.drift};this.set({offsets:n,heard:null,listening:null}),this.pushLog({text:`shifted ${t?t.name:e.pedal} by ${e.drift>0?`+`:``}${e.drift}`,sub:`its whole map moves with it`,tone:`ok`})}dismissHeard(){this.set({heard:null,listening:null})}toggleMonitor(){this.set({monitorOn:!this.state.monitorOn})}clearLog(){this.set({log:[]})}},Q=class{constructor(e,t){this.onChange=()=>this.host.requestUpdate(),this.host=e,this.store=t,e.addController(this)}hostConnected(){this.store.addEventListener(`change`,this.onChange)}hostDisconnected(){this.store.removeEventListener(`change`,this.onChange)}};function $(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var Rt=class extends j{constructor(...e){super(...e),this.drawer=!1}static{this.styles=[F,I,L,o`
      :host {
        width: 300px;
        flex: none;
        display: flex;
        flex-direction: column;
        background: #fffbf0;
        border-right: 2.5px solid #16323d;
        min-height: 0;
      }
      :host([drawer]) {
        position: fixed;
        left: 0;
        top: 58px;
        bottom: 0;
        z-index: 50;
        width: min(330px, 88vw);
        box-shadow: 6px 0 0 #16323d;
        animation: sheetIn 170ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .head {
        flex: none;
        padding: 16px 18px 13px;
        border-bottom: 2.5px solid #16323d;
        background: #fdf3d4;
      }
      .head-row {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .head-title {
        font-size: 16px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      .setups-btn {
        padding: 4px 10px;
        border-radius: 12px;
        border: 2px solid #16323d;
        background: #fffbf0;
        font-size: 11.5px;
        font-weight: 600;
        transition: box-shadow 140ms ease;
      }
      .setups-btn:hover {
        box-shadow: 2px 2px 0 #16323d;
      }
      .close-drawer-btn {
        width: 26px;
        height: 26px;
        padding: 0;
        border-radius: 50%;
        border: 2px solid #16323d;
        background: #fffbf0;
        font-size: 13px;
        line-height: 1;
      }
      .list {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        padding: 12px 13px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .dashed-btn {
        padding: 5px 11px;
        border-radius: 12px;
        border: 2px dashed #16323d;
        font-size: 11.5px;
        font-weight: 600;
        opacity: 0.6;
        transition: opacity 140ms ease, background 140ms ease;
      }
      .dashed-btn:hover {
        opacity: 1;
        background: #fffbf0;
      }
      .edit-btn:hover {
        opacity: 1 !important;
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Q(this,this.store)}render(){let e=this.store.state,t=(e.banks[e.bank]?.[e.selectedKey]?.[e.action]||[]).filter(e=>!e.act).length,n=e.mode===`build`&&!!e.actEdit,r=B.find(t=>t.id===e.action),i=r?r.label:e.action,a=(K.getController(e.controllerId).nav?`${e.selectedKey===`L`?`left`:`right`} switch`:`switch ${e.selectedKey}`)+` · ${i}`,o=this.store.actionUsage();return k`
      <div class="head">
        <div class="head-row">
          <span class="head-title">capabilities</span>
          ${Ie(this.store,`lib`,`left`,`what are capabilities & actions?`,`capabilities are the five musical jobs in your rig. inside each one live actions — ready-made moves you can put on any switch. edit an action once and every switch that uses it gets the change.`)}
          <span style="flex:1"></span>
          <button
            class="setups-btn"
            title="the saved settings inside your pedals"
            @click=${()=>this.store.openSetups()}
          >
            set-ups
          </button>
          ${this.drawer?k`<button
                class="close-drawer-btn"
                title="close"
                @click=${()=>this.store.setLibOpen(!1)}
              >
                ×
              </button>`:null}
        </div>
      </div>

      <div class="list">
        ${st.map(r=>{let s=!!e.capOpen[r.id],c=e.actions.filter(e=>e.caps.includes(r.id)),l=e.lens===r.id,u=`flex:none;border-radius:18px;border:2.5px solid #16323d;background:${l?`${r.colour}55`:`#f7f1e3`};box-shadow:${l?`3px 3px 0 #16323d`:`none`}`,d=`padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600;border:2px solid #16323d;transition:background 140ms ease;${l?`background:#16323d;color:${r.colour}`:`background:#fffbf0;opacity:.7`}`;return k`
            <div style=${u}>
              <div style="display:flex;align-items:center;gap:8px;padding:10px 11px">
                <button
                  style="flex:1;min-width:0;display:flex;align-items:center;gap:8px;padding:0;text-align:left"
                  @click=${()=>this.store.toggleCapOpen(r.id)}
                >
                  <span
                    style="width:14px;height:14px;border-radius:5px;background:${r.colour};border:2px solid #16323d;flex:none"
                  ></span>
                  <span style="font-size:14px;font-weight:600">${r.name}</span>
                  <span
                    style="font-family:'DM Mono',monospace;font-size:10px;opacity:.55"
                    >${c.length}</span
                  >
                  <span style="font-size:10px;opacity:.5;margin-left:2px"
                    >${s?`▾`:`▸`}</span
                  >
                </button>
                <button
                  style=${d}
                  title="highlight every switch and knob that serves this capability"
                  @click=${()=>this.store.setLens(r.id)}
                >
                  ${l?`seeing it`:`where used?`}
                </button>
              </div>

              ${s?k`
                    <div
                      style="padding:0 11px 11px;display:flex;flex-direction:column;gap:8px"
                    >
                      <div style="font-size:12px;line-height:1.45;opacity:.68">
                        ${r.blurb}
                      </div>
                      ${c.map(t=>{let s=o[t.id]||0,c=this.store.missingFor(t),l=n&&e.actEdit===t.id,u=[...new Set(t.steps.map(e=>e.device))],d=this.store.wiggleInfo(t.steps),f=d?d.set:null,p=f?K.getDevice(f.device):null,m=t.caps.filter(e=>e!==r.id).map(e=>this.store.capOf(e)?.name||e),h=c.length?`skips ${c.join(` + `)} — not in rig`:s?`on ${s}${s===1?` press`:` presses`}`:m.length?`also ${m.join(`, `)}`:``,g=`padding:10px 11px;border-radius:14px;border:${l?`2.5px solid #16323d;box-shadow:3px 3px 0 #16323d;background:${r.colour}40`:`2px solid #16323d;background:#fffbf0`}`,_=f?`display:block;width:100%;margin-top:8px;padding:5px 9px;border-radius:11px;text-align:left;font-size:11px;font-weight:600;border:2px solid #16323d;background:${f.saved?`#e7f5e7`:`#ffe6dd`}`:``;return k`
                          <div style=${g}>
                            <div style="display:flex;align-items:baseline;gap:7px">
                              <span
                                style="font-size:13.5px;font-weight:600;flex:1;min-width:0"
                                >${t.name}</span
                              >
                              ${d?k`<span
                                    style="flex:none;font-family:'DM Mono',monospace;font-size:9.5px;padding:1px 7px;border-radius:9px;border:2px solid #16323d;background:#f7c948"
                                    >${d.bounce?`wiggle`:`glide`}</span
                                  >`:null}
                              <span
                                style="font-family:'DM Mono',monospace;font-size:10px;opacity:.45;flex:none"
                                >${t.steps.length} msg</span
                              >
                            </div>
                            <div
                              style="font-size:11.5px;line-height:1.45;opacity:.72;margin-top:3px"
                            >
                              ${t.what}
                            </div>
                            ${f?k`
                                  <button
                                    style=${_}
                                    title="see or mark this pedal setup"
                                    @click=${()=>this.store.openSetups(f.id,f.device)}
                                  >
                                    ${f.saved?`✓ ready on ${p?p.name:f.device} — set up once, saved in its slot ${f.slot}`:`needs a one-time setup on ${p?p.name:f.device} — show me how →`}
                                  </button>
                                `:null}
                            <div
                              style="display:flex;align-items:center;gap:6px;margin-top:9px"
                            >
                              <span style="display:flex;gap:4px;flex:none">
                                ${u.map(e=>{let t=K.getDevice(e);return t?k`<span
                                        title=${t.name}
                                        style="width:11px;height:11px;border-radius:4px;background:${t.accent};border:2px solid #16323d"
                                      ></span>`:null})}
                              </span>
                              <span
                                style="font-size:11px;opacity:.55;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"
                                >${h}</span
                              >
                              <button
                                class="edit-btn"
                                title="open this action to change its messages"
                                style="flex:none;padding:4px 9px;border-radius:11px;font-size:11.5px;font-weight:600;${l?`background:#16323d;color:#fdf3d4`:`opacity:.6`}"
                                @click=${()=>l?this.store.setMode(`assign`,null):this.store.setMode(`build`,t.id)}
                              >
                                ${l?`editing`:`edit`}
                              </button>
                              ${l?null:k`
                                    <button
                                      title=${c.length===u.length?`needs a pedal not in your rig`:`put this action on ${a}`}
                                      style="flex:none;padding:4px 11px;border-radius:12px;font-size:11.5px;font-weight:600;border:2px solid #16323d;background:${r.colour};box-shadow:2px 2px 0 #16323d${c.length===u.length?`;opacity:.35;pointer-events:none`:``}"
                                      @click=${()=>this.store.insertAction(t.id)}
                                    >
                                      + ${i}
                                    </button>
                                  `}
                            </div>
                          </div>
                        `})}
                      <div style="display:flex;flex-wrap:wrap;gap:6px">
                        <button
                          class="dashed-btn"
                          @click=${()=>this.store.newAction(r.id)}
                        >
                          + new action
                        </button>
                        ${t>0&&!n?k`
                              <button
                                class="dashed-btn"
                                title="bundle the loose messages on the current switch into a reusable action"
                                @click=${()=>this.store.saveStackAsAction(r.id)}
                              >
                                save this ${i} as an action
                              </button>
                            `:null}
                      </div>
                    </div>
                  `:null}
            </div>
          `})}
      </div>
    `}};$([N({attribute:!1})],Rt.prototype,`store`,void 0),$([N({type:Boolean,reflect:!0})],Rt.prototype,`drawer`,void 0),Rt=$([M(`capabilities-aside`)],Rt);var zt=class extends j{constructor(...e){super(...e),this.desktop=!1,this.phone=!1}static{this.styles=[F,I,L,o`
      :host {
        display: block;
      }
      .bank-hit-btn:hover {
        background: rgba(127, 196, 255, 0.18) !important;
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Q(this,this.store)}trunc(e,t){return!t||!e?``:e.length<=t?e:e.slice(0,t-1)+`…`}render(){let e=this.store.state,t=z[e.controllerId]||z.chocolate,n=e.banks[e.bank]||e.banks[0],r=this.store.availableActions(),i=this.store.ident(e.bank,e.selectedKey),a=this.store.sharedColors(),o=this.store.displayTargets().length>0||a.length>0,s=o&&e.brainId===`scribble`&&!t.isBrain,c=o&&(!!t.isBrain&&!!t.photo||s),l=!t.isBrain&&e.brainId===`scribble`&&o,u=nt[i.textColor],d=n?.[e.selectedKey]?.[e.action]||[],f=this.store.limit(),p=`${d.length}/${f}`,m=`bank ${e.bank+1} of ${e.banks.length}`,h=`display:flex;align-items:center;gap:10px;margin-bottom:${e.ctrlMin?10:14}px`,g=`flex:none;width:26px;height:26px;padding:0;border-radius:8px;border:2px solid #16323d;font-size:10px;line-height:1;display:flex;align-items:center;justify-content:center;background:transparent`;if(e.ctrlMin){let a=t.photo,o=t.keys.indexOf(e.selectedKey),s=a?`position:relative;flex:none;height:30px;aspect-ratio:${a.ar};background:url(${a.src}) center/100% 100% no-repeat;border-radius:${a.radius};box-shadow:0 0 0 1.5px #16323d`:``,c=a&&o>=0&&a.x[o]!=null?`position:absolute;left:${a.x[o]}%;top:${a.y[o]}%;width:${a.s+5}%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;border:2.5px solid #f7c948;box-shadow:0 0 0 1.5px #16323d`:`display:none`,u=z.scribble.photo,d=`flex:none;height:30px;aspect-ratio:${u.ar};background:url(${u.src}) center/100% 100% no-repeat;border-radius:${u.radius};box-shadow:0 0 0 1.5px #16323d`,f=t.nav?`p${String(e.bank+1).padStart(3,`0`)}`:`bank ${e.bank+1} · ${e.selectedKey}`,m=l?`scribble “${i.name||`unnamed`}”`:i.name?`“${i.name}”`:``;return k`
        <div>
          <div style=${h}>
            <button
              style="display:flex;align-items:baseline;gap:8px;flex:1;min-width:0;padding:0;text-align:left"
              @click=${()=>this.store.openControllerPicker()}
            >
              <span
                style="flex:0 1 auto;min-width:0;font-size:16px;font-weight:600;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"
                >${t.name}</span
              >
              <span
                style="flex:none;font-size:13px;opacity:.5"
                title="change controller"
                >⌄</span
              >
            </button>
            <button
              title="show the controller"
              style=${g}
              @click=${()=>this.store.toggleCtrlMin()}
            >
              ▾
            </button>
          </div>
          <div style="display:flex;flex-direction:column;gap:10px">
            <button
              title="show controller and brain"
              style="display:flex;flex-direction:column;gap:6px;padding:0;text-align:left;color:#16323d"
              @click=${()=>this.store.toggleCtrlMin()}
            >
              <div style="display:flex;align-items:center;gap:8px">
                ${a?k`<div style=${s}>
                      <span style=${c}></span>
                    </div>`:null}
                ${l?k`
                      <span style="flex:none;font-size:12px;opacity:.5">→</span>
                      <div style=${d}></div>
                    `:null}
              </div>
              <div
                style="display:flex;align-items:baseline;gap:8px;font-family:'DM Mono',monospace;font-size:10.5px"
              >
                <span
                  style="flex:1;min-width:0;opacity:.6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"
                  >${f}</span
                >
                <span
                  style="flex:none;max-width:55%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"
                >
                  <span style="opacity:.6">${m}</span> ${p}
                </span>
              </div>
            </button>
            <div
              style="display:flex;gap:3px;height:30px;box-sizing:border-box;padding:2px;border-radius:10px;border:2px solid #16323d;background:#fffbf0"
            >
              ${r.map(t=>{let r=e.action===t.id,i=n?.[e.selectedKey]?.[t.id]?.length||0,a=(t.id===`press`?`tap`:t.label)+(i?` ${i}`:``);return k`
                  <button
                    style="flex:1;min-width:0;padding:0 2px;border-radius:7px;font-size:11.5px;font-weight:600;white-space:nowrap;transition:background 150ms ease;${r?`background:#f7c948`:`background:transparent;opacity:.6`}"
                    @click=${()=>this.store.selectAction(t.id)}
                  >
                    ${a}
                  </button>
                `})}
            </div>
          </div>
        </div>
      `}let _=!t.nav&&!(t.photo&&t.photo.screen?.digits),v=!!(t.photo&&t.photo.screen?.digits),y=!(t.isBrain&&o)&&(t.screen||!!(t.photo&&t.photo.screen)),ee=!!t.isBrain&&o,b=c&&!s,x=s,S=`position:relative;display:flex;align-items:center;gap:7px;padding:6px;border-radius:${t.photo?`14px;margin-bottom:12px`:`16px 16px 0 0`};background:#16323d;flex-wrap:wrap${t.nav?`;width:${this.desktop?312:292}px;max-width:100%;margin:0 auto`:``}`,C=t.photo?`position:relative;width:100%;max-width:${t.nav?340:420}px;margin:${t.photo.screen?.digits?20:0}px auto ${t.isBrain&&o?42:t.nav?22:26}px;aspect-ratio:${t.photo.ar};background:url(${t.photo.src}) center/100% 100% no-repeat;border-radius:${t.photo.radius};box-shadow:0 0 0 2px #16323d,4px 4px 0 2px #16323d`:t.nav?`position:relative;width:${this.desktop?312:292}px;max-width:100%;margin:0 auto;height:${this.desktop?112:104}px;border-radius:0 0 14px 14px;background:#16323d;box-shadow:4px 4px 0 #7b62b8`:`position:relative;height:${this.desktop?t.heightDesktop:t.height}px;margin-bottom:${s?12:0}px;border-radius:0 0 16px 16px;background:#16323d;box-shadow:4px 4px 0 #7b62b8`,w=t.photo&&t.photo.screen?`position:absolute;left:${t.photo.screen.l}%;top:${t.photo.screen.t}%;width:${t.photo.screen.w}%;height:${t.photo.screen.h}%;border-radius:${t.photo.screen.r};display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden;${t.photo.screen.digits?`background:#0b0f12;color:#cfe9ff;font-family:'DM Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.04em;text-shadow:0 0 6px #7fc4ff`:`padding:4px 8px;font-size:15px;font-weight:600;letter-spacing:-.01em;line-height:1.15;background:${i.color?J[i.color]:`#0b0f12`};color:${i.color?u:`#f7f1e3`};transition:background 200ms ease`}`:t.nav?`position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:${this.desktop?156:146}px;height:${this.desktop?70:64}px;border-radius:8px;padding:5px 9px;background:${i.color?J[i.color]:`#f7f1e3`};border:2.5px solid #16323d;display:flex;align-items:center;justify-content:center;text-align:center;font-size:14px;font-weight:600;letter-spacing:-.01em;line-height:1.2;overflow:hidden;color:${i.color?u:`#16323d`};transition:background 200ms ease`:`position:absolute;left:50%;top:52%;transform:translateX(-50%);width:118px;height:26px;border-radius:4px;background:#f7f1e3;display:flex;align-items:center;justify-content:center;font-family:'DM Mono',monospace;font-size:10px;color:#16323d`,T=t.photo&&t.photo.screen?.digits?String(e.bank+1).padStart(3,`0`):this.trunc(i.name,(Y[e.controllerId]||Y.mc3).name)||(t.nav?`preset ${String(e.bank+1).padStart(3,`0`)}`:`bank ${e.bank+1} · ${e.selectedKey}`),E=z.scribble.photo.screen,te=`position:absolute;left:${E.l}%;top:${E.t}%;width:${E.w}%;height:${E.h}%;border-radius:${E.r};display:flex;flex-direction:column;align-items:stretch;justify-content:center;gap:2px;padding:16px 8px 4px;background:${i.color?J[i.color]:`#0b0f12`};transition:background 200ms ease;box-shadow:inset 0 0 0 2px rgba(247,201,72,.0)`,D=`position:absolute;top:5%;left:5px;right:7px;display:flex;align-items:center;gap:2px;font-family:'DM Mono',monospace;font-size:10px;font-weight:500;color:${i.color?u:`#f7f1e3`};opacity:.75`,ne=`width:100%;padding:0;border:0;background:transparent;text-align:center;font-family:inherit;font-size:${this.desktop?15:13}px;font-weight:600;letter-spacing:-.01em;line-height:1.2;outline:none;color:${i.color?u:`#f7f1e3`}`,re=`width:100%;padding:0;border:0;background:transparent;text-align:center;font-family:'DM Mono',monospace;font-size:10px;line-height:1.3;outline:none;opacity:.75;color:${i.color?u:`#f7f1e3`}`,O=`position:absolute;left:11.4%;top:${s?72:74}%;width:22px;height:22px;transform:translate(-50%,-50%);padding:0;border-radius:7px;border:2px solid #16323d;background:${i.color?J[i.color]:`repeating-linear-gradient(135deg,#fffbf0 0 3px,#e9e0cc 3px 6px)`};box-shadow:2px 2px 0 #16323d;z-index:7`,ie=`position:absolute;left:11.4%;top:calc(${s?72:74}% - 27px);line-height:1;transform:translateX(-50%);font-family:'DM Mono',monospace;font-size:9px;color:#16323d;opacity:.6;z-index:7`,ae=`width:22px;height:22px;margin:-4px 0;padding:0;font-size:14px;font-weight:600;color:inherit;background:transparent${e.bank>0?``:`;opacity:.3;pointer-events:none`}`,oe=`width:22px;height:22px;margin:-4px 0;padding:0;font-size:14px;font-weight:600;color:inherit;background:transparent${e.bank<e.banks.length-1?``:`;opacity:.3;pointer-events:none`}`,se=i.auto||(t.nav?`name this preset`:`name switch ${e.selectedKey}`);return k`
      <div>
        <div style=${h}>
          <button
            style="display:flex;align-items:baseline;gap:8px;flex:1;min-width:0;padding:0;text-align:left"
            @click=${()=>this.store.openControllerPicker()}
          >
            <span
              style="flex:0 1 auto;min-width:0;font-size:16px;font-weight:600;letter-spacing:-.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"
              >${t.name}</span
            >
            <span
              style="flex:none;font-size:13px;opacity:.5"
              title="change controller"
              >⌄</span
            >
          </button>
          ${!e.ctrlMin&&t.photo?k`<span
                style="flex:none;font-family:'DM Mono',monospace;font-size:10px;opacity:.55;white-space:nowrap"
                >${m}</span
              >`:null}
          <button
            title="collapse to a summary"
            style=${g}
            @click=${()=>this.store.toggleCtrlMin()}
          >
            ▴
          </button>
        </div>

        ${_?k`
              <div style=${S}>
                <span
                  style="font-family:'DM Mono',monospace;font-size:10px;color:#f7f1e3;opacity:.5;padding-left:6px;margin-right:2px;flex:none"
                  >bank</span
                >
                ${e.banks.map((n,r)=>{let i=r===e.bank;return k`
                    <button
                      style="flex:0 0 auto;min-width:34px;white-space:nowrap;padding:5px 7px;border-radius:11px;font-size:12.5px;font-weight:600;border:2px solid ${i?`#f7c948`:`rgba(247,241,227,.28)`};transition:background 150ms ease,color 150ms ease,border-color 150ms ease;${i?`background:#f7c948;color:#16323d`:`background:transparent;color:rgba(247,241,227,.6)`}"
                      @click=${()=>this.store.selectBank(r)}
                    >
                      ${String(r+1).padStart(t.nav?3:2,`0`)}
                    </button>
                  `})}
              </div>
            `:null}

        <div style=${C}>
          ${y?k`<div style=${w}>${T}</div>`:null}
          ${v&&t.photo?.screen?k`
                <div
                  style="position:absolute;left:calc(${t.photo.screen.l+t.photo.screen.w/2}% - 46px);top:50%;transform:translateY(-50%);width:92px;height:44px;display:flex;justify-content:space-between;z-index:7"
                >
                  <button
                    class="bank-hit-btn"
                    title="previous bank"
                    style="width:44px;height:44px;padding:0;border-radius:6px 0 0 6px;font-size:16px;font-weight:600;color:#cfe9ff;text-shadow:0 0 6px #7fc4ff;background:transparent;transition:background 150ms ease${e.bank>0?``:`;opacity:.25;pointer-events:none`}"
                    @click=${()=>this.store.selectBank(Math.max(0,e.bank-1))}
                  >
                    ‹
                  </button>
                  <button
                    class="bank-hit-btn"
                    title="next bank"
                    style="width:44px;height:44px;padding:0;border-radius:0 6px 6px 0;font-size:16px;font-weight:600;color:#cfe9ff;text-shadow:0 0 6px #7fc4ff;background:transparent;transition:background 150ms ease${e.bank<e.banks.length-1?``:`;opacity:.25;pointer-events:none`}"
                    @click=${()=>this.store.selectBank(Math.min(e.banks.length-1,e.bank+1))}
                  >
                    ›
                  </button>
                </div>
              `:null}
          ${ee?k`
                <div style=${te}>
                  <div style=${D}>
                    <button
                      title="previous preset"
                      style=${ae}
                      @click=${()=>this.store.selectBank(Math.max(0,e.bank-1))}
                    >
                      ‹
                    </button>
                    <span>${String(e.bank+1).padStart(3,`0`)}</span>
                    <button
                      title="next preset"
                      style=${oe}
                      @click=${()=>this.store.selectBank(Math.min(e.banks.length-1,e.bank+1))}
                    >
                      ›
                    </button>
                    <span style="flex:1"></span>
                    <span title="messages on this press">${p}</span>
                  </div>
                  <input
                    .value=${i.raw.name||``}
                    placeholder=${se}
                    maxlength="12"
                    style=${ne}
                    @input=${e=>this.store.setIdent({name:e.target.value})}
                  />
                  <input
                    .value=${i.secondary}
                    placeholder="second line"
                    maxlength="12"
                    style=${re}
                    @input=${e=>this.store.setIdent({secondary:e.target.value})}
                  />
                </div>
                <button
                  title=${i.color?`strip colour · ${i.color}`:`give this stack a colour`}
                  style=${O}
                  @click=${()=>this.store.toggleColorPicker()}
                ></button>
              `:null}
          ${t.keys.map((r,i)=>{let a=e.selectedKey===r,s=0;B.forEach(e=>{s+=n?.[r]?.[e.id]?.length||0});let c={};B.forEach(e=>n?.[r]?.[e.id]?.forEach(e=>{c[e.device]=1}));let l=Object.keys(c),u=l.length===1?V[l[0]]?.accent||`#f7c948`:l.length>1?`#f7c948`:`rgba(247,241,227,.16)`,d=this.store.ident(e.bank,r),f=t.isBrain&&o?``:t.nav?Re[r]||r:s>0&&d.name?this.trunc(d.name,10):r,p=s>0?String(s):``,m=t.photo?`position:absolute;left:${t.photo.x[i]}%;top:${t.photo.y[i]}%;width:${t.photo.s+2}%;aspect-ratio:1;transform:translate(-50%,-50%);padding:0`:`position:absolute;left:${t.x[i]}%;top:${t.y[i]}%;transform:translate(-50%,-50%);width:38px;height:38px;padding:0`,h=e.lens?this.store.capOf(e.lens):null,g=e.lens&&this.store.slotCaps(n[r]).includes(e.lens);return k`
              <button
                style=${m}
                @click=${()=>this.store.selectSwitch(r)}
              >
                <span style=${`display:flex;align-items:center;justify-content:center;width:100%;height:100%;border-radius:50%;font-size:12px;font-weight:600;color:#16323d;background:${t.photo?s?`${u}cc`:`transparent`:u};border:2.5px ${a||!t.nav?`solid `:`dashed `}${a?`#f7c948`:t.photo?t.nav?`rgba(22,50,61,.4)`:`transparent`:`rgba(247,241,227,.4)`};box-shadow:${a?`0 0 0 4px rgba(247,201,72,.3)`:`none`};transition:box-shadow 160ms cubic-bezier(.23,1,.32,1),border-color 160ms ease,background 160ms ease${e.firing===r?`;animation:ring 520ms cubic-bezier(.23,1,.32,1) infinite`:``}${e.lens&&h?g?`;box-shadow:0 0 0 5px ${h.colour}`:`;opacity:.3`:``}`}>${p}</span>
                <span style=${`position:absolute;left:50%;top:calc(100% + 5px);transform:translateX(-50%);max-width:${this.desktop?88:74}px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:center;line-height:14px;font-size:11.5px;font-weight:600;color:${t.photo?a?`#16323d;background:#f7c948;padding:0 6px;border-radius:7px`:`#16323d;opacity:.6`:a?`#f7c948`:`rgba(247,241,227,.55)`}`}>${f}</span>
              </button>
            `})}
          ${b&&t.isBrain&&t.photo?t.keys.map((t,i)=>r.map((a,o)=>{let s=e.selectedKey===t&&e.action===a.id,c=n?.[t]?.[a.id]?.length||0,l=a.id===`press`?`tap`:a.label,u=`position:absolute;top:calc(100% + 8px);${i===0?`left:${o*60}`:`right:${(r.length-1-o)*60}`}px;width:56px;justify-content:center;z-index:6;display:flex;align-items:center;gap:4px;padding:2px 3px 2px 7px;border-radius:10px;font-size:10.5px;font-weight:600;white-space:nowrap;border:2px solid #16323d;transition:background 150ms ease,box-shadow 150ms ease;${s?`background:#f7c948;box-shadow:2px 2px 0 #16323d`:`background:#fffbf0;opacity:.75`}`;return k`
                    <button
                      title="${t===`L`?`left`:`right`} switch · ${l}"
                      style=${u}
                      @click=${()=>{this.store.selectSwitch(t),this.store.selectAction(a.id)}}
                    >
                      <span>${l}</span>
                      <span style=${`font-family:'DM Mono',monospace;font-size:9px;min-width:14px;text-align:center;border-radius:7px;background:${s?`#16323d`:`rgba(22,50,61,.14)`};color:${s?`#f7c948`:`#16323d`}`}>${c}</span>
                    </button>
                  `})):null}
        </div>

        ${x?k`
              <div style="display:flex;flex-direction:column;gap:8px;margin:0 0 18px">
                <span
                  style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;opacity:.5"
                  >switch ${e.selectedKey}</span
                >
                <div
                  style="display:flex;gap:3px;padding:3px;border-radius:12px;border:2px solid #16323d;background:#fffbf0"
                >
                  ${r.map(t=>{let r=e.action===t.id,i=n?.[e.selectedKey]?.[t.id]?.length||0,a=t.id===`press`?`tap`:t.label;return k`
                      <button
                        title="switch ${e.selectedKey} · ${a}"
                        style="flex:1;min-width:0;display:flex;align-items:center;justify-content:center;gap:5px;padding:5px 4px;border-radius:8px;font-size:12px;font-weight:600;white-space:nowrap;color:#16323d;transition:background 150ms ease,opacity 150ms ease;${r?`background:#f7c948`:`background:transparent;opacity:.6`}"
                        @click=${()=>this.store.selectAction(t.id)}
                      >
                        <span>${a}</span>
                        <span
                          style="font-family:'DM Mono',monospace;font-size:9.5px;min-width:15px;text-align:center;border-radius:7px;background:${r?`#16323d`:`rgba(22,50,61,.14)`};color:${r?`#f7c948`:`#16323d`}"
                          >${i}</span
                        >
                      </button>
                    `})}
                </div>
              </div>
            `:null}
        ${l?k`
              <div
                style="margin:0 0 8px;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;opacity:.5"
              >
                scribble · screen when you press
                ${t.nav?`this preset`:e.selectedKey}
              </div>
              <div
                style="position:relative;width:100%;max-width:${this.desktop?300:this.phone?220:260}px;margin:0 auto 4px;aspect-ratio:${z.scribble.photo.ar};background:url(${z.scribble.photo.src}) center/100% 100% no-repeat;border-radius:${z.scribble.photo.radius};box-shadow:0 0 0 2px #16323d,4px 4px 0 2px #16323d"
              >
                <div style=${te}>
                  <div style=${D}>
                    <span style="flex:1"></span>
                    <span title="messages on this press">${p}</span>
                  </div>
                  <input
                    .value=${i.raw.name||``}
                    placeholder=${se}
                    maxlength="12"
                    style=${ne}
                    @input=${e=>this.store.setIdent({name:e.target.value})}
                  />
                  <input
                    .value=${i.secondary}
                    placeholder="second line"
                    maxlength="12"
                    style=${re}
                    @input=${e=>this.store.setIdent({secondary:e.target.value})}
                  />
                </div>
                <button
                  title=${i.color?`strip colour · ${i.color}`:`give this stack a colour`}
                  style=${O}
                  @click=${()=>this.store.toggleColorPicker()}
                ></button>
                <span style=${ie}>colour</span>
                ${z.scribble.photo.x.map((e,t)=>k`
                    <span
                      style="position:absolute;left:${e}%;top:${z.scribble.photo.y[t]}%;width:${z.scribble.photo.s+2}%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:rgba(240,238,232,.75);pointer-events:none"
                    ></span>
                  `)}
              </div>
            `:null}
      </div>
    `}};$([N({attribute:!1})],zt.prototype,`store`,void 0),$([N({type:Boolean,reflect:!0})],zt.prototype,`desktop`,void 0),$([N({type:Boolean,reflect:!0})],zt.prototype,`phone`,void 0),zt=$([M(`controller-graphic`)],zt);var Bt=class extends j{constructor(...e){super(...e),this.helpView=`none`,this.sweepChannel=1,this.sweepTimer=null,this.targetSwitchKey=null,this.assignedConfirmation=null,this.onWindowPointerDown=e=>{this.store?.state?.channelPickerOpen&&(e.composedPath().some(e=>e instanceof HTMLElement&&(e.classList.contains(`chan-popover`)||e.classList.contains(`chan-btn`)))||(this.resetHelp(),this.store.closeChannelPicker()))}}static{this.styles=[F,I,L,o`
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
          box-shadow 150ms ease,
          opacity 150ms ease;
      }
      .chip-wrap:hover {
        opacity: 1 !important;
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
      .chip-remove {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        margin-right: 7px;
        margin-left: -2px;
        border-radius: 50%;
        background: transparent;
        border: none;
        color: var(--ink);
        cursor: pointer;
        opacity: 0.5;
        transition:
          opacity 120ms ease,
          background 120ms ease,
          transform 100ms ease;
      }
      .chip-wrap[active] .chip-remove {
        opacity: 0.7;
      }
      .chip-wrap:not([active]) .chip-remove {
        opacity: 0;
        pointer-events: none;
      }
      .chip-wrap:not([active]):hover .chip-remove {
        opacity: 0.55;
        pointer-events: auto;
      }
      .chip-remove:hover {
        opacity: 1 !important;
        background: rgba(22, 50, 61, 0.15);
      }
      .chip-remove:active {
        transform: scale(0.9);
      }
      .dot {
        width: 13px;
        height: 13px;
        border-radius: 5px;
        flex: none;
        border: 2px solid var(--ink);
      }
      .drop-pedal-btn {
        width: 100%;
        margin-top: 12px;
        padding: 8px 0;
        border-radius: 12px;
        border: 2px solid var(--ink);
        font-size: 12.5px;
        font-weight: 600;
        opacity: 0.7;
        transition:
          background 150ms ease,
          color 150ms ease,
          opacity 150ms ease;
      }
      .drop-pedal-btn:hover {
        background: var(--coral);
        color: var(--card);
        opacity: 1;
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
        width: 320px;
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
      .help-btn {
        margin-top: 10px;
        width: 100%;
        padding: 6px;
        border-radius: 9px;
        background: var(--paper);
        border: 2px dashed var(--ink);
        font-size: 11.5px;
        font-weight: 500;
        opacity: 0.7;
        transition: opacity 150ms ease, background 150ms ease;
      }
      .help-btn:hover {
        opacity: 1;
        background: var(--panel-warm);
      }
      .menu-btn {
        display: block;
        width: 100%;
        text-align: left;
        padding: 10px 12px;
        margin-bottom: 8px;
        border-radius: 12px;
        border: 2px solid var(--ink);
        background: var(--paper);
        font-size: 13px;
        font-weight: 600;
        transition: background 150ms ease, transform 100ms ease;
      }
      .menu-btn:hover {
        background: var(--sky);
      }
      .menu-btn:active {
        transform: scale(0.98);
      }
      .menu-btn:last-child {
        margin-bottom: 0;
      }
      @keyframes sweepPulse {
        0% { transform: scale(0.95); opacity: 0.7; }
        100% { transform: scale(1.05); opacity: 1; }
      }
      .sweep-display {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
      }
      .sweep-num {
        font-family: var(--mono);
        font-size: 36px;
        font-weight: 700;
        color: var(--mustard);
        margin-bottom: 12px;
        animation: sweepPulse 700ms ease-in-out infinite alternate;
      }
      .sweep-sub {
        font-size: 12px;
        opacity: 0.7;
        text-align: center;
        text-wrap: pretty;
      }
      .learn-why-box {
        margin-bottom: 12px;
        padding: 8px 10px;
        border-radius: 10px;
        background: #f7c94822;
        border: 1.5px solid var(--ink);
        font-size: 11px;
        line-height: 1.45;
        color: var(--ink);
      }
      .learn-why-title {
        font-weight: 700;
        font-size: 11px;
        margin-bottom: 3px;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .guided-steps {
        list-style: none;
        padding: 0;
        margin: 10px 0 12px;
        display: flex;
        flex-direction: column;
        gap: 11px;
      }
      .step-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
      }
      .step-badge {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--mustard);
        border: 1.5px solid var(--ink);
        color: var(--ink);
        font-family: var(--mono);
        font-size: 11px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1px;
      }
      .step-body {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .step-heading {
        font-weight: 600;
        font-size: 12px;
        color: var(--ink);
      }
      .step-detail {
        font-size: 11px;
        line-height: 1.45;
        opacity: 0.85;
      }
      .step-detail-dim {
        font-size: 10.5px;
        line-height: 1.35;
        opacity: 0.65;
        font-style: italic;
        margin-top: 3px;
      }
      .step-action-grid {
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-top: 5px;
      }
      .step-pickers-row {
        display: flex;
        gap: 6px;
      }
      .picker-col {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .picker-label {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        opacity: 0.6;
        margin-bottom: 2px;
      }
      .channel-select {
        width: 100%;
        padding: 5px 8px;
        border-radius: 10px;
        border: 2px solid var(--ink);
        background: var(--card);
        font-family: var(--mono);
        font-size: 12px;
        font-weight: 700;
        outline: none;
        cursor: pointer;
      }
      .btn-assign-switch {
        width: 100%;
        padding: 7px 10px;
        border-radius: 10px;
        background: var(--mustard);
        border: 2px solid var(--ink);
        box-shadow: 2px 2px 0 var(--ink);
        font-size: 11.5px;
        font-weight: 700;
        cursor: pointer;
        transition: transform 100ms, box-shadow 100ms, background 150ms;
        text-align: center;
      }
      .btn-assign-switch[confirmed] {
        background: #51cf66;
        color: var(--ink);
      }
      .btn-assign-switch:active {
        transform: translate(1px, 1px);
        box-shadow: 0 0 0 var(--ink);
      }
      .assigned-banner {
        margin-top: 5px;
        padding: 6px 8px;
        border-radius: 8px;
        background: #51cf6626;
        border: 1.5px solid #2b8a3e;
        font-size: 10.5px;
        font-weight: 600;
        color: #2b8a3e;
        display: flex;
        align-items: center;
        gap: 5px;
      }
      .btn-done {
        width: 100%;
        margin-top: 10px;
        padding: 7px 12px;
        border-radius: 11px;
        background: var(--ink);
        color: var(--paper);
        font-family: inherit;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        transition: transform 100ms, opacity 100ms;
        text-align: center;
      }
      .btn-done:hover {
        opacity: 0.9;
      }
      .btn-done:active {
        transform: scale(0.98);
      }
      .direct-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
        padding-top: 8px;
        border-top: 1px dashed rgba(22, 50, 61, 0.2);
      }
      .direct-label {
        font-size: 10.5px;
        opacity: 0.65;
      }
      .btn-direct-link {
        padding: 4px 8px;
        border-radius: 8px;
        background: var(--card);
        border: 1.5px solid var(--ink);
        font-size: 10.5px;
        font-weight: 600;
        cursor: pointer;
        transition: background 120ms;
      }
      .btn-direct-link:hover {
        background: var(--panel-warm);
      }
      .back-btn {
        display: inline-flex;
        align-items: center;
        font-size: 11px;
        font-weight: 600;
        opacity: 0.6;
        margin-bottom: 12px;
        transition: opacity 150ms;
      }
      .back-btn:hover {
        opacity: 1;
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Q(this,this.store),window.addEventListener(`pointerdown`,this.onWindowPointerDown)}disconnectedCallback(){super.disconnectedCallback(),this.stopSweep(),window.removeEventListener(`pointerdown`,this.onWindowPointerDown)}updated(){!this.store.state.channelPickerOpen&&this.helpView!==`none`&&this.resetHelp()}resetHelp(){this.stopSweep(),this.helpView=`none`,this.assignedConfirmation=null}startSweep(){this.stopSweep(),this.helpView=`sweep`,this.sweepChannel=1,this.store.sendTestCC(this.sweepChannel),this.sweepTimer=window.setInterval(()=>{this.sweepChannel=this.sweepChannel<16?this.sweepChannel+1:1,this.store.sendTestCC(this.sweepChannel)},700)}stopSweep(){this.sweepTimer!==null&&(clearInterval(this.sweepTimer),this.sweepTimer=null)}render(){let e=this.store.state,t=e.browseDevice,n=K.getDevice(t),r=e.channels[t]||(n?n.midiChannel:1),i=K.getController(e.controllerId)?.keys||[`A`,`B`,`C`,`D`],a=this.targetSwitchKey&&i.includes(this.targetSwitchKey)?this.targetSwitchKey:e.selectedKey,o=!!this.assignedConfirmation&&this.assignedConfirmation.switchKey===a;return k`
      <div class="wrap">
        <div class="row">
          ${e.rig.map(n=>{let r=K.getDevice(n);if(!r)return null;let i=t===n,a=!i&&e.peek?.device===n,o=e.rig.length>1;return k`
              <span
                class="chip-wrap"
                ?active=${i}
                style=${i?`background:${r.accent};box-shadow:2px 2px 0 var(--ink)`:`background:transparent;opacity:.6`}
              >
                <button
                  class="chip-btn"
                  style=${a?`border-radius:18px;background:#f7c948;animation:ring 1s cubic-bezier(.23,1,.32,1) infinite`:o?`padding-right: 4px;`:``}
                  @click=${()=>this.store.setBrowseDevice(n)}
                >
                  <span class="dot" style="background:${r.accent}"></span>
                  <span>${r.name}</span>
                </button>
                ${o?k`
                      <button
                        class="chip-remove"
                        title="Remove ${r.name} from rig"
                        aria-label="Remove ${r.name} from rig"
                        @click=${e=>{e.stopPropagation(),this.store.setConfirmRemove(n)}}
                      >
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 10 10"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                        >
                          <line x1="1" y1="1" x2="9" y2="9" />
                          <line x1="9" y1="1" x2="1" y2="9" />
                        </svg>
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
          @click=${()=>{e.channelPickerOpen||(this.helpView=`none`,this.assignedConfirmation=null),this.store.toggleChannelPicker()}}
        >
          <span style="font-family:var(--mono);font-size:11px">ch ${r}</span>
          <span style="font-size:10px;opacity:.55">⚙</span>
        </button>

        ${e.channelPickerOpen?k`
              <div class="chan-popover">
                ${this.helpView===`none`?k`
                  <div class="pop-title">${n?.name} · midi channel</div>
                  <div class="pop-sub">every message for this pedal goes out on this channel.</div>
                  <div class="chan-grid">
                    ${Array.from({length:16},(e,i)=>{let a=i+1;return k`
                        <button
                          class="chan-opt"
                          style=${r===a?`background:${n?.accent};font-weight:600`:`background:var(--card)`}
                          @click=${()=>this.store.setPedalChannel(t,a)}
                        >
                          ${a}
                        </button>
                      `})}
                  </div>
                  <button class="help-btn" @click=${()=>this.helpView=`menu`}>
                    Need help finding or setting your channel?
                  </button>
                  ${e.rig.length>1?k`
                        <button
                          class="drop-pedal-btn"
                          @click=${()=>{this.store.closeChannelPicker(),this.store.setConfirmRemove(t)}}
                        >
                          take ${n?.name} out of the rig
                        </button>
                      `:null}
                `:this.helpView===`menu`?k`
                  <button class="reset back-btn" @click=${()=>this.helpView=`none`}>← back to channels</button>
                  <div class="pop-title">channel tools</div>
                  <div class="pop-sub" style="margin-bottom:16px">having trouble getting ${n?.name||`this pedal`} to listen?</div>
                  <button class="menu-btn" @click=${()=>this.startSweep()}>
                    Find my channel
                    <span style="display:block;font-size:11px;font-weight:400;opacity:0.6;margin-top:2px">Watch the pedal's LED while we sweep through 1-16</span>
                  </button>
                  <button class="menu-btn" @click=${()=>this.helpView=`guide`}>
                    Set a new channel
                    <span style="display:block;font-size:11px;font-weight:400;opacity:0.6;margin-top:2px">Walk through the hardware MIDI learn steps</span>
                  </button>
                `:this.helpView===`sweep`?k`
                  <button class="reset back-btn" @click=${()=>{this.stopSweep(),this.helpView=`menu`}}>← back</button>
                  <div class="pop-title">sweeping channels...</div>
                  <div class="pop-sub">sending test CCs. when the pedal's LED flashes, that's your channel.</div>
                  <div class="sweep-display">
                    <div class="sweep-num">${this.sweepChannel}</div>
                    <div class="sweep-sub">sending CC 93 (127) on channel ${this.sweepChannel}</div>
                  </div>
                `:this.helpView===`guide`?k`
                  <button class="reset back-btn" @click=${()=>this.helpView=`menu`}>← back</button>
                  <div class="pop-title">Set Pedal Channel</div>
                  <div class="pop-sub" style="margin-bottom:8px">Teach ${n?.name||`this pedal`} which MIDI channel to listen on.</div>

                  <div class="learn-why-box">
                    <div class="learn-why-title">💡 How Pedal Channel Learn Works</div>
                    Pedals like Chase Bliss don't have channel DIP switches. They boot into <strong>Learn Mode</strong> and permanently adopt the channel of the first Program Change (PC) message they receive.
                  </div>

                  <ol class="guided-steps">
                    <li class="step-item">
                      <span class="step-badge">1</span>
                      <div class="step-body">
                        <span class="step-heading">Enter Learn Mode</span>
                        <span class="step-detail">Unplug pedal power, hold footswitches down, and reconnect power until LEDs blink.</span>
                      </div>
                    </li>
                    <li class="step-item">
                      <span class="step-badge">2</span>
                      <div class="step-body">
                        <span class="step-heading">Choose Channel & Switch</span>
                        <div class="step-action-grid">
                          <div class="step-pickers-row">
                            <div class="picker-col">
                              <span class="picker-label">Target Channel</span>
                              <select class="channel-select" id="guided-channel-select" .value=${r.toString()}>
                                ${Array.from({length:16},(e,t)=>t+1).map(e=>k`
                                  <option value=${e} ?selected=${e===r}>Ch ${e}</option>
                                `)}
                              </select>
                            </div>
                            <div class="picker-col">
                              <span class="picker-label">Controller Switch</span>
                              <select class="channel-select" id="guided-switch-select" .value=${a} @change=${e=>{this.targetSwitchKey=e.target.value}}>
                                ${i.map(e=>k`
                                  <option value=${e} ?selected=${e===a}>Switch ${e}</option>
                                `)}
                              </select>
                            </div>
                          </div>
                          <button
                            class="btn-assign-switch"
                            ?confirmed=${o}
                            @click=${()=>{let e=this.shadowRoot?.querySelector(`#guided-channel-select`),n=this.shadowRoot?.querySelector(`#guided-switch-select`),i=e?parseInt(e.value,10):r,o=n?n.value:a;this.store.assignGuidedPC(t,i,o),this.assignedConfirmation={channel:i,switchKey:o}}}
                          >
                            ${o?`✓ Assigned PC 0 to Switch ${a}`:`Assign Learn (PC 0) to Switch ${a}`}
                          </button>
                          ${o?k`
                                <div class="assigned-banner">
                                  <span>✓ Ready! Switch ${a} now has PC 0 on Ch ${this.assignedConfirmation.channel}.</span>
                                </div>
                              `:null}
                        </div>
                        <span class="step-detail-dim">Puts a temporary setup message on Switch ${a}.</span>
                      </div>
                    </li>
                    <li class="step-item">
                      <span class="step-badge">3</span>
                      <div class="step-body">
                        <span class="step-heading">Export, Tap & Clean Up</span>
                        <span class="step-detail">
                          1. Export/compile rig to your controller.<br>
                          2. Tap physical <strong>Switch ${a}</strong> on your board to lock in the channel.<br>
                          3. <strong>Delete or overwrite Switch ${a}</strong> afterward.
                        </span>
                      </div>
                    </li>
                  </ol>

                  <button
                    class="btn-done"
                    @click=${()=>{this.resetHelp(),this.store.toggleChannelPicker()}}
                  >
                    Done
                  </button>

                  <div class="direct-footer">
                    <span class="direct-label">Direct cable to pedal?</span>
                    <button class="btn-direct-link" @click=${()=>{let e=this.shadowRoot?.querySelector(`#guided-channel-select`),t=e?parseInt(e.value,10):r;this.store.sendDirectPC(t,0)}}>
                      Send via Web MIDI
                    </button>
                  </div>
                `:null}
              </div>
            `:null}
      </div>
    `}};$([N({attribute:!1})],Bt.prototype,`store`,void 0),$([P()],Bt.prototype,`helpView`,void 0),$([P()],Bt.prototype,`sweepChannel`,void 0),$([P()],Bt.prototype,`sweepTimer`,void 0),$([P()],Bt.prototype,`targetSwitchKey`,void 0),$([P()],Bt.prototype,`assignedConfirmation`,void 0),Bt=$([M(`device-tabs`)],Bt);var Vt=class extends j{constructor(...e){super(...e),this.phone=!1,this.desktop=!1}static{this.styles=[F,I,L,o`
      :host {
        display: flex;
        flex: 1;
        min-width: 0;
        min-height: 0;
      }
      .face-hover:hover {
        background: #f7c94866 !important;
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Q(this,this.store)}render(){let e=this.store.state,t=K.getDevice(e.browseDevice),n=e.face===`drawn`,r=e.mode===`build`&&!!e.actEdit,i=r&&e.actEdit?this.store.actionById(e.actEdit):null,a=r?i?i.steps:[]:this.store.activeStack,o=t.controls.filter(e=>!e.sub);return k`
      <div style=${`${this.phone?`flex:none`:`flex:1;min-height:0`};width:100%;display:flex;align-items:${this.phone?`flex-start`:`center`};justify-content:center;overflow:${this.phone?`visible`:`hidden`};padding:${this.desktop?`0 26px 20px`:`8px 14px 14px`}`}>
        <div style=${`position:relative;flex:none;container-type:size;filter:drop-shadow(5px 5px 0 #16323d);aspect-ratio:${n?`344/426`:`${t.pw}/${t.ph}`};${this.phone?`width:min(100%,${n?250:260}px);margin:0 auto;height:auto`:`height:100%;width:auto;max-width:100%;max-height:${n?`420px`:`600px`}`}`}>
          ${n?k`
                <div
                  style="position:absolute;inset:0;border-radius:20px;background:${t.body};border:2.5px solid #16323d"
                ></div>
                <div
                  style="position:absolute;left:50%;bottom:2%;transform:translateX(-50%);font-size:clamp(13px,6cqw,20px);font-weight:600;color:${t.ink};pointer-events:none"
                >
                  ${t.faceName}
                </div>
              `:k`
                <div style="position:absolute;inset:0">
                  <img
                    src=${t.photo}
                    alt=${t.faceName}
                    style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:14px;display:block"
                  />
                </div>
              `}
          ${o.map(e=>this.renderControl(e,t,n,a,r,i))}
        </div>
      </div>
    `}renderControl(e,t,n,r,i,a){let o=this.store.state,s=o.peek!==null&&o.peek.device===t.id&&o.peek.control===e.id,c=o.peek!==null&&o.peek.device===t.id,l=!1;o.lens&&(l=o.actions.some(n=>n.caps.includes(o.lens)&&n.steps.some(n=>n.device===t.id&&n.control===e.id)));let u=!!o.lens&&l||s,d=!!o.lens&&!l||c&&!s,f=[];r.forEach((n,r)=>{n.device===t.id&&n.control===e.id&&f.push(r+1)});let p=f.length>0,m=o.popoverControlId===e.id,h=a?this.store.wiggleInfo(a.steps):null,g=i&&!!h&&h.device===t.id&&!!h.set.move[e.id],_=!!(o.lit&&o.lit.device===t.id&&o.lit.control===e.id),v=!n&&e.px!=null,y=v?e.px:e.x,ee=v?e.py:e.y,b=v?`width:${e.ps}%;aspect-ratio:1`:e.type===`foot`?`width:18%;aspect-ratio:1`:e.type===`toggle`?`width:9%;height:11%`:`width:14%;aspect-ratio:1`,x=!e.values&&!e.sub,S=null;e.type===`knob`&&r.forEach(n=>{n.device===t.id&&n.control===e.id&&n.value!=null&&!isNaN(Number(n.value))&&(S=Number(n.value))}),e.type===`knob`&&o.drag&&o.drag.device===t.id&&o.drag.control===e.id&&(S=o.drag.value);let C=null;if(e.type===`knob`){let n=-1;r.forEach((e,r)=>{e.device===t.id&&e.control===`pc`&&(n=r)});let i=n>=0?this.store.findSet(r[n].set):null;if(i&&i.move&&i.move[e.id]){let a=64;r.forEach((r,i)=>{i>n&&r.device===t.id&&r.control===e.id&&r.value!=null&&!isNaN(Number(r.value))&&(a=Number(r.value))});let o=64;r.forEach(e=>{e.device===t.id&&(e.control===`mix`||e.control===`volume`)&&e.value!=null&&!isNaN(Number(e.value))&&(o=Number(e.value))});let s=i.sweep===`top`?a:0,c=i.sweep===`top`?127:a,l=i.bounce||!(i.fall&&i.fall[e.id]);C={lo:s,hi:c,from:l?s:c,to:l?c:s,bounce:!!i.bounce,dur:(3.2-2.6*o/127).toFixed(2)},S=C.from}}let w=e=>-135+270*Math.max(0,Math.min(127,e))/127,T=S!=null,E=T?w(S):0,te=``;te=v?`display:block;width:100%;height:100%;border-radius:50%;border:2.5px ${m||p?`solid`:`dashed`} #16323d;background:${m?`#f7c948aa`:p?`#f7c94855`:`rgba(255,251,240,.28)`};box-shadow:${m?`0 0 0 4px #f7c94866`:`none`};transition:background 160ms ease,box-shadow 160ms cubic-bezier(.23,1,.32,1)`:e.type===`toggle`?`display:block;width:100%;height:100%;border-radius:7px;background:#16323d;border:2.5px solid #16323d`:`display:block;width:100%;height:100%;border-radius:50%;background:#fffbf0;border:2.5px solid #16323d;box-shadow:${m?`0 0 0 4px #f7c94866`:`2px 2px 0 #16323d`};transition:box-shadow 160ms cubic-bezier(.23,1,.32,1)`;let D=o.lens?this.store.capOf(o.lens)?.colour:null,ne=te+(T&&v?`;position:relative;background:transparent`:``)+(_?`;animation:ring 480ms cubic-bezier(.23,1,.32,1)`:``)+(s?`;background:#f7c948;box-shadow:0 0 0 5px #f7c948,0 0 0 8px #16323d`:u&&D?`;box-shadow:0 0 0 5px ${D}`:``),re=`position:absolute;left:${y}%;top:${ee}%;${b};transform:translate(-50%,-50%);padding:0;display:flex;align-items:center;justify-content:center;${this.phone?`min-width:44px;min-height:44px;`:``}z-index:${m?12:_?11:6}${d?`;opacity:.28`:``};transition:opacity 200ms ease`,O=T?`position:absolute;inset:-6px;border-radius:50%;pointer-events:none;background:${C?`conic-gradient(from -135deg,rgba(255,251,240,.55) 0deg ${w(C.lo)+135}deg,#8fd0e6 ${w(C.lo)+135}deg ${w(C.hi)+135}deg,rgba(255,251,240,.55) ${w(C.hi)+135}deg 270deg,transparent 270deg)`:`conic-gradient(from -135deg,#f7c948 0deg ${E+135}deg,rgba(255,251,240,.55) ${E+135}deg 270deg,transparent 270deg)`};-webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 4px),#000 calc(100% - 3.5px));mask:radial-gradient(farthest-side,transparent calc(100% - 4px),#000 calc(100% - 3.5px))`:`display:none`,ie=T?C?`position:absolute;inset:0;pointer-events:none;--a0:${w(C.from)}deg;--a1:${w(C.to)}deg;transform:rotate(${w(C.from)}deg);animation:${C.bounce?`kwig ${C.dur}s ease-in-out infinite alternate`:`kglide ${C.dur}s cubic-bezier(.23,1,.32,1) infinite`}`:`position:absolute;inset:0;pointer-events:none;transform:rotate(${E}deg);transition:transform 380ms cubic-bezier(.23,1,.32,1)`:`display:none`,ae=v?`position:absolute;left:50%;bottom:calc(100% + 6px);transform:translateX(-50%);white-space:nowrap;font-size:11px;font-weight:600;padding:2px 8px;border-radius:12px;background:#f7c948;border:2px solid #16323d;color:#16323d;pointer-events:none;opacity:${m||p&&!x?`1`:`0`}`:`position:absolute;left:50%;${e.type===`foot`?`bottom:calc(100% + 6px);`:`top:calc(100% + 5px);`}transform:translateX(-50%);white-space:nowrap;font-size:clamp(8px,3.2cqw,11px);font-weight:500;color:#16323d;opacity:.75;pointer-events:none`,oe=p||g,se=f.join(`,`)+(g?p?` ~`:`~`:``);return k`
      <button
        title=${e.label}
        style=${re}
        @click=${()=>this.store.clickControl(e)}
      >
        <span class="face-hover" style=${ne}></span>
        <span style=${O}></span>
        <span style=${ie}>
          <span
            style="position:absolute;left:50%;top:6%;width:3px;height:44%;transform:translateX(-50%);border-radius:2px;background:#16323d"
          ></span>
          <span
            style="position:absolute;left:50%;top:50%;width:9px;height:9px;transform:translate(-50%,-50%);border-radius:50%;background:#16323d"
          ></span>
          <span
            style="position:absolute;left:50%;top:2%;width:9px;height:9px;transform:translateX(-50%);border-radius:50%;background:#f7c948;box-shadow:0 0 0 2px #16323d"
          ></span>
        </span>
        <span style=${ae}>${e.short}</span>
        ${oe?k`<span style=${`position:absolute;right:-9px;top:-9px;min-width:23px;height:23px;padding:0 5px;border-radius:12px;background:#fffbf0;border:2.5px solid #16323d;color:#16323d;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center`}>${se}</span>`:null}
      </button>
    `}};$([N({attribute:!1})],Vt.prototype,`store`,void 0),$([N({type:Boolean,reflect:!0})],Vt.prototype,`phone`,void 0),$([N({type:Boolean,reflect:!0})],Vt.prototype,`desktop`,void 0),Vt=$([M(`pedal-canvas`)],Vt);function Ht(e){let t={};return e.banks.forEach(e=>{Object.keys(e).forEach(n=>{B.forEach(({id:r})=>{e[n][r].forEach(e=>{t[e.device]=!0})})})}),Object.keys(t)}function Ut(e,t){let n={};return e.banks.forEach(e=>{Object.keys(e).forEach(r=>{B.forEach(({id:i})=>{e[r][i].forEach(e=>{e.device===t&&(n[e.control]=!0)})})})}),Object.keys(n)}function Wt(e){let t={};return Ht(e).forEach(n=>{let r=K.getDevice(n);if(!r)return;let i={};Ut(e,n).forEach(e=>{let t=K.getControl(n,e);t&&(i[e]=t.cc)}),t[n]={name:r.name,channel:e.channels[n]||r.midiChannel,cc:i}}),{schema:`stomp-stacks/rig@1`,controller:e.controllerId,brain:e.brainId,pedals:t,banks:e.banks.map((t,n)=>{let r={};return Object.keys(t).forEach(i=>{let a={};if(B.forEach(n=>{t[i][n.id].length&&(a[n.id]=t[i][n.id].map(t=>{let n=wt(t,e.channels,e.pedalSets,e.offsets);return{pedal:t.device,control:t.control,value:t.value===null||t.value===void 0?n.pc?n.value:127:t.value,...t.set?{set:t.set}:{},label:n.stepLabel||n.label}}))}),Object.keys(a).length){let t=`${n}:${i}`,o=e.naming&&e.naming[t]||{};r[i]={name:o.name||``,secondary:o.secondary||``,color:o.color||null,textColor:o.textColor||`ink`,actions:a}}}),r})}}var Gt=class{constructor(){this.id=`rig`,this.name=`Rig Schema JSON`}compileExport(e){let t=Wt(e);return{filename:`rig-stack-${e.controllerId}.json`,mimeType:`application/json`,content:JSON.stringify(t,null,2)}}compilePreview(e){let t=Wt(e);return JSON.stringify(t,null,2).split(`
`).map(e=>({text:e||` `}))}},Kt=class{constructor(){this.id=`labels`,this.name=`Printable Labels`}compileExport(e){let t=this.compilePreview(e);return{filename:`stomp-labels-${e.controllerId}.txt`,mimeType:`text/plain`,content:t.map(e=>e.text).join(`
`)}}compilePreview(e){let t=[],n=(e,n)=>{t.push({text:e===``?` `:e,...n})},r=K.getController(e.controllerId),i=K.getBrain(e.brainId);return n(`STOMP STACKS · ${r.name}`,{bold:!0}),n(`via ${i.full.toLowerCase()}`,{muted:!0}),Ot(e,(t,r,i,a,o)=>{let s=`${t}:${r}`,c=e.naming&&e.naming[s]||{},l=c.name||`switch ${r}`;n(``),n(`${l}  ·  ${a.label}`,{bold:!0}),c.secondary&&n(c.secondary),n(`bank ${t+1} · switch ${r}${c.color?` · ${c.color}`:``}`,{muted:!0}),o.forEach((t,r)=>{let i=wt(t,e.channels);n(`   ${r+1}. ${i.deviceName} — ${i.label}`)})}),t.length||n(`nothing stacked yet — go poke a pedal`,{muted:!0}),t}},qt=e=>e.toString(16).toUpperCase().padStart(2,`0`),Jt=class{constructor(){this.id=`trace`,this.name=`MIDI Trace Log`}compileExport(e){let t=this.compilePreview(e);return{filename:`midi-trace-${e.controllerId}.txt`,mimeType:`text/plain`,content:t.map(e=>e.text).join(`
`)}}compilePreview(e){let t=[],n=(e,n)=>{t.push({text:e===``?` `:e,...n})};return Ot(e,(t,r,i,a,o)=>{n(`▸ bank ${t+1} · ${r} ${a.label}`,{bold:!0}),o.forEach(t=>{let r=wt(t,e.channels,e.pedalSets,e.offsets);n(`    ${r.bytes.map(qt).join(` `).padEnd(8,` `)}    ${r.deviceName} ${r.label}`,{muted:!0})}),n(``)}),t.length||n(`nothing stacked yet — go poke a pedal`,{muted:!0}),t}},Yt={rig:new Gt,mc3:new Dt,scribble:new Nt,labels:new Kt,trace:new Jt};function Xt(e){let t=K.getController(e.controllerId),n=t.isBrain?K.getBrain(`scribble`):K.getBrain(e.brainId),r=[],i=0,a=0;Ot(e,(e,t,r,o,s)=>{s.length>n.maxSteps&&(i++,s.length>a&&(a=s.length))}),i&&r.push({type:`warn`,text:`${i} stack${i===1?``:`s`} run to ${a} messages — ${n.full.toLowerCase()} sends ${n.maxSteps}${e.brainId===`none`&&!t.isBrain?`. this is the case for a brain.`:`. trim them or move up.`}`}),e.banks.length>n.banks&&r.push({type:`warn`,text:`${t.name} has ${e.banks.length} banks; ${n.full.toLowerCase()} holds ${n.banks}.`}),!t.isBrain&&e.brainId===`onboard`&&!t.onboard&&r.push({type:`warn`,text:`${t.name} can't hold stacks onboard — it only sends one message per switch.`});let o=Ht(e).filter(t=>!e.rig.includes(t));o.length&&r.push({type:`warn`,text:`${o.map(e=>K.getDevice(e)?.name||e).join(` + `)} ${o.length===1?`is`:`are`} stacked but no longer in the rig — those steps won't be sent.`}),K.detectChannelCollisions(e.rig,e.channels).forEach(({channel:e,devices:t})=>{r.push({type:`warn`,text:`${t.join(` + `)} are both on channel ${e} — their cc numbers will collide.`})}),e.targetId===`mc3`&&e.controllerId!==`mc3`&&r.push({type:`warn`,text:`building an mc3 preset, but the rig is set to ${t.name}.`}),e.targetId===`scribble`&&e.brainId!==`scribble`&&!t.isBrain&&r.push({type:`warn`,text:`building a scribble config, but the brain is set to ${n.full.toLowerCase()}.`});let s={},c=0;Ot(e,(e,t,n,r,i)=>{let a={};i.forEach(e=>{e.control===`pc`?(e.set&&(s[e.set]=!0),a[e.device]&&c++):a[e.device]=!0})}),c&&r.push({type:`warn`,text:`${c} ${c===1?`set-up loads`:`set-ups load`} after ${c===1?`its`:`their`} own knob messages — loading a preset resets the pedal's knobs, so put it first.`});let l=e.pedalSets||[],u=Object.keys(s).map(e=>l.find(t=>t.id===e)).filter(e=>!!e&&!e.saved);u.length&&r.push({type:`warn`,text:`${u.map(e=>`“${e.name}” (slot ${e.slot})`).join(` + `)} ${u.length===1?`hasn't`:`haven't`} been saved to the pedal yet — open set-ups for the 4-step walkthrough.`});let d={state:e,namingTargets(){let t=[e.controllerId];return e.brainId===`scribble`&&!t.includes(`scribble`)&&t.push(`scribble`),t.filter(e=>Y[e]).map(e=>({...Y[e]}))},displayTargets(){return this.namingTargets().filter(e=>e.name>0)},sharedColors(){let e=this.namingTargets().filter(e=>e.colors===null||e.colors.length>0);return e.length?q.map(e=>e[0]).filter(t=>e.every(e=>e.colors===null||e.colors&&e.colors.includes(t))):[]}},f=[];e.banks.forEach((t,n)=>{Object.keys(t).forEach(r=>{let i=0;if(B.forEach(e=>{i+=t[r][e.id].length}),i){let t=`${n}:${r}`,i=e.naming&&e.naming[t]||{};f.push({name:i.name||``,secondary:i.secondary||``,color:i.color||null,raw:i})}})}),d.displayTargets().forEach(e=>{let t=f.filter(t=>t.raw.name&&t.name.length>e.name).length;if(t&&r.push({type:`warn`,text:`${t} ${t===1?`name is`:`names are`} longer than the ${e.label.toLowerCase()} shows (${e.name} characters) — ${t===1?`it reads`:`they read`} trimmed there.`}),!e.secondary){let t=f.filter(e=>e.secondary).length;t&&r.push({type:`warn`,text:`${t} second ${t===1?`line has`:`lines have`} nowhere to go on the ${e.label.toLowerCase()} — ${t===1?`it lands`:`they land`} on the label sheet instead.`})}});let p=d.sharedColors(),m={};return f.forEach(e=>{e.color&&(!p.length||!p.includes(e.color))&&(m[e.color]=!0)}),Object.keys(m).forEach(e=>{let t=e,n=d.namingTargets().filter(e=>e.colors&&e.colors.length&&!e.colors.includes(t));n.length&&r.push({type:`warn`,text:`${e} isn't in ${n.map(e=>e.label.toLowerCase()).join(` or `)}'s palette — those stacks fall back to a compatible color there.`})}),r.length||r.push({type:`ok`,text:`all clear — nothing collides, nothing overflows.`}),r}var Zt=class{static compile(e,t=e.targetId){let n=Yt[t]||Yt.rig;return{targetId:t,exportFile:n.compileExport(e),preview:n.compilePreview(e),diagnostics:Xt(e)}}static getAdapter(e){return Yt[e]||Yt.rig}};Zt.compile;var Qt=class extends j{constructor(...e){super(...e),this.phone=!1,this.desktop=!1,this.pinnedRowIndex=null,this.focusKey=null,this.dragState=null}static{this.styles=[F,I,L,o`
      :host {
        display: flex;
        flex-direction: column;
        background: #fffbf0;
        flex: 1;
        min-height: 0;
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
      .del-btn:hover {
        background: #ef7d5c !important;
        color: #fffbf0 !important;
      }
      .pop-close:hover {
        background: #16323d !important;
        color: #e8f4fa !important;
      }
      .hover-mustard:hover {
        background: #f7c948 !important;
      }
      .hover-paper:hover {
        background: #f7f1e3 !important;
      }
      .hover-opa:hover {
        opacity: 1 !important;
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Q(this,this.store)}wigVis(e,t){let n=(3.2-2.6*e.speed/127).toFixed(2);return{track:`position:relative;height:12px;border-radius:7px;background:#fffbf0;border:2px solid #16323d`,seg:`position:absolute;top:0;bottom:0;left:${(e.lo/127*100).toFixed(1)}%;width:${((e.hi-e.lo)/127*100).toFixed(1)}%;background:${t};border-radius:5px`,dot:`position:absolute;top:50%;left:0;width:14px;height:14px;border-radius:50%;background:#f7c948;border:2px solid #16323d;transform:translate(-50%,-50%);animation:${e.bounce?`wig ${n}s ease-in-out infinite alternate`:`glide ${n}s cubic-bezier(.23,1,.32,1) infinite`}`}}capChipStyle(e,t){return`display:flex;align-items:center;gap:6px;padding:4px 10px;border-radius:12px;font-size:11.5px;font-weight:600;border:2px solid #16323d;transition:background 140ms ease,box-shadow 140ms ease;${e?`background:${t};box-shadow:2px 2px 0 #16323d`:`background:#fffbf0;opacity:.55`}`}formatStepLabel(e){if(!K.getDevice(e.device))return e.control;if(e.control===`pc`){let t=this.store.findSet(e.set);return`load set-up · ${t?t.name:`missing`}`}return K.formatControlLabel(e.device,e.control,e.value)}render(){let e=this.store.state,t=e.mode===`build`&&!!e.actEdit,n=t&&e.actEdit?this.store.actionById(e.actEdit):null,r=n?n.steps:this.store.activeStack,i=this.store.limit(),a=e.sheetOpen||!this.phone,o=K.getDevice(e.browseDevice),s=e.popoverControlId&&e.popoverControlId!==`pc`?K.getControl(e.browseDevice,e.popoverControlId):null;return k`
      <button class="grabber" @click=${()=>this.store.toggleSheet()}></button>

      ${t?null:this.renderAssignHeader(r,i,a)}

      ${e.popoverControlId===`pc`&&o?this.renderPcPopover(o,r):s&&o?this.renderControlPopover(o,s,r):null}

      ${t&&n?this.renderBuildMode(n,r,i):a?this.renderAssignList(r,i):null}
    `}renderAssignHeader(e,t,n){let r=this.store.state,i=K.getController(r.controllerId),a=r.banks[r.bank]||r.banks[0],o=this.store.availableActions(),s=this.store.ident(r.bank,r.selectedKey),c=this.store.sharedColors(),l=this.store.displayTargets().length>0||c.length>0,u=l&&r.brainId===`scribble`&&!i.isBrain,d=l&&(!!i.isBrain&&!!i.photo||u),f=!!i.nav&&!(i.isBrain&&l),p=!d,m=l&&!(i.isBrain||r.brainId===`scribble`),h=d,g=!l,_=!d,v=s.color?J[s.color]:`#16323d`,y=nt[s.textColor],ee=i.nav&&Re[r.selectedKey]||r.selectedKey,b=`${i.nav?r.selectedKey===`L`?`left`:`right`:r.selectedKey} · ${r.action===`press`?`tap`:r.action}`,x=`${i.nav?`p${String(r.bank+1).padStart(3,`0`)}`:`bank ${r.bank+1}`} · ${e.length} of ${t} messages`,S=s.auto||(i.nav?`name this preset`:`name switch ${r.selectedKey}`),C=`everything listed below goes out, in order, when you ${B.find(e=>e.id===r.action)?.label||r.action} ${i.nav?`on this preset`:`this switch`}. ${this.store.limitWho()} sends up to ${t} messages per press. actions show as a coloured card — 'unlink' keeps the messages but stops them following the action.`,w=[];l&&this.store.displayTargets().forEach(e=>{s.raw.name&&s.name.length>e.name&&w.push({text:`${e.label.toLowerCase()} shows “${s.name.slice(0,e.name-1)}…”`}),s.secondary&&!e.secondary?w.push({text:`${e.label.toLowerCase()} drops the second line`}):s.secondary&&s.secondary.length>e.secondary&&w.push({text:`${e.label.toLowerCase()} trims line two to “${s.secondary.slice(0,e.secondary-1)}…”`})});let T=q.filter(e=>c.length>0&&!c.includes(e[0])).map(e=>e[0]),E=c.length?`every device in the rig can light these. ${T.length?`${T.join(`, `)} ${T.length===1?`is`:`are`} out of range.`:``}`:`no device in this rig has a light — colour rides along on the label sheet only.`;return k`
      <div
        style="flex:none;padding:${this.desktop?`15px 18px 13px`:`12px 16px 13px`};background:#fdf3d4;border-bottom:2.5px solid #16323d"
      >
        <div
          style="position:relative;display:flex;align-items:center;gap:8px;margin-bottom:${_||w.length?`9px`:`0`}"
        >
          ${f?k`
                <select
                  .value=${String(r.bank+1)}
                  style="flex:none;font-family:'DM Mono',monospace;font-size:12px;font-weight:600;padding:5px 9px;border-radius:10px;background:#16323d;color:#f7c948;border:2px solid #16323d"
                  @change=${e=>this.store.selectBank(parseInt(e.target.value,10)-1)}
                >
                  ${r.banks.map((e,t)=>{let n=r.lens&&i.keys.some(e=>this.store.slotCaps(r.banks[t][e]).includes(r.lens)),a=r.lens?this.store.capOf(r.lens)?.name:``;return k`
                      <option value=${t+1} ?selected=${t===r.bank}>
                        p${String(t+1).padStart(3,`0`)}${n?`  ● ${a}`:``}
                      </option>
                    `})}
                </select>
              `:null}
          ${p?k`
                <span
                  style="flex:none;font-family:'DM Mono',monospace;font-size:11px;padding:3px 8px;border-radius:10px;background:#16323d;color:#fdf3d4"
                  >${ee}</span
                >
              `:null}
          ${m?k`
                <div
                  style="flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;gap:1px;padding:6px 11px;border-radius:13px;border:2.5px solid #16323d;background:${v};transition:background 200ms ease"
                >
                  <input
                    .value=${s.raw.name||``}
                    placeholder=${S}
                    maxlength="24"
                    style="width:100%;padding:0;border:0;background:transparent;font-family:inherit;font-size:15px;font-weight:600;letter-spacing:-.02em;line-height:1.25;color:${y};outline:none"
                    @input=${e=>this.store.setIdent({name:e.target.value})}
                  />
                  <input
                    .value=${s.secondary}
                    placeholder=${s.autoSec||`second line`}
                    maxlength="24"
                    style="width:100%;padding:0;border:0;background:transparent;font-family:'DM Mono',monospace;font-size:11px;line-height:1.35;color:${y};opacity:.72;outline:none"
                    @input=${e=>this.store.setIdent({secondary:e.target.value})}
                  />
                </div>
                <button
                  title=${s.color?`strip colour · ${s.color}`:`give this stack a colour`}
                  style="width:26px;height:26px;flex:none;border-radius:9px;border:2.5px solid #16323d;background:${s.color?J[s.color]:`repeating-linear-gradient(135deg,#fffbf0 0 4px,#e9e0cc 4px 8px)`};transition:box-shadow 150ms cubic-bezier(.23,1,.32,1)"
                  @click=${()=>this.store.toggleColorPicker()}
                ></button>
              `:null}
          ${h?k`
                <div
                  style="flex:1;min-width:0;display:flex;align-items:baseline;gap:8px"
                >
                  <span
                    style="font-size:15px;font-weight:600;letter-spacing:-.02em;white-space:nowrap"
                    >${b}</span
                  >
                  <span
                    style="min-width:0;font-family:'DM Mono',monospace;font-size:11px;opacity:.55;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"
                    >${x}</span
                  >
                </div>
                ${Ie(this.store,`stack`,`right`,`what's in this press`,C)}
              `:null}
          ${g?k`<div
                style="flex:1;min-width:0;font-size:16px;font-weight:600;letter-spacing:-.02em"
              >
                macro
              </div>`:null}
          ${p?k`
                <span
                  style="flex:none;font-family:'DM Mono',monospace;font-size:11px;padding:3px 9px;border-radius:10px;border:2px solid #16323d;background:${e.length>=t?`#ffd9cc`:`#fffbf0`}"
                >
                  ${e.length} / ${t}
                </span>
              `:null}
          ${this.phone?k`
                <button
                  style="width:26px;height:26px;flex:none;border-radius:50%;border:2px solid #16323d;font-size:12px;line-height:1;display:flex;align-items:center;justify-content:center"
                  @click=${()=>this.store.toggleSheet()}
                >
                  ${n?`⌄`:`⌃`}
                </button>
              `:null}

          ${r.colorPickerOpen?k`
                <div
                  style="position:absolute;left:0;top:calc(100% + 8px);z-index:30;width:262px;max-width:100%;padding:14px;border-radius:20px;background:#fffbf0;border:2.5px solid #16323d;box-shadow:5px 5px 0 #16323d;animation:sheetIn 170ms cubic-bezier(.23,1,.32,1)"
                >
                  <div
                    style="display:flex;align-items:center;gap:8px;margin-bottom:10px"
                  >
                    <span style="flex:1;font-size:12.5px;font-weight:600"
                      >${i.nav?`preset ${String(r.bank+1).padStart(3,`0`)}`:`switch ${r.selectedKey}`}
                      lights up…</span
                    >
                    <button
                      style="width:24px;height:24px;border-radius:50%;border:2px solid #16323d;font-size:12px;line-height:1;display:flex;align-items:center;justify-content:center"
                      @click=${()=>this.store.closeColorPicker()}
                    >
                      ×
                    </button>
                  </div>
                  <div
                    style="display:grid;grid-template-columns:repeat(5,1fr);gap:7px"
                  >
                    ${q.map(e=>{let t=!c.length||c.includes(e[0]),n=s.color===e[0];return k`
                        <button
                          title=${t?e[0]:`${e[0]} — not in this rig's palette`}
                          style="height:30px;border-radius:11px;border:2.5px solid #16323d;background:${e[1]};transition:box-shadow 150ms cubic-bezier(.23,1,.32,1),transform 120ms cubic-bezier(.23,1,.32,1);${n?`box-shadow:0 0 0 3px #16323d inset,3px 3px 0 #16323d;`:``}${t?``:`opacity:.22;pointer-events:none;`}"
                          @click=${()=>{t&&(this.store.setIdent({color:n?null:e[0]}),this.store.closeColorPicker())}}
                        ></button>
                      `})}
                  </div>
                  <div
                    style="display:flex;align-items:center;flex-wrap:wrap;gap:6px;margin-top:11px;padding-top:11px;border-top:2px solid rgba(22,50,61,.15)"
                  >
                    <span style="flex:1;font-size:12px;font-weight:600"
                      >text</span
                    >
                    ${tt.map(e=>{let t=s.textColor===e[0];return k`
                        <button
                          title="text in ${e[0]}${s.autoText?` — picked automatically until you choose`:``}"
                          style="display:flex;align-items:center;gap:5px;flex:none;padding:4px 9px 4px 5px;border-radius:11px;border:2px solid #16323d;background:#fffbf0;font-size:11px;font-weight:600;color:#16323d;transition:box-shadow 150ms cubic-bezier(.23,1,.32,1),opacity 150ms ease;${t?`box-shadow:2px 2px 0 #16323d`:`opacity:.55`}"
                          @click=${()=>this.store.setIdent({textColor:e[0]})}
                        >
                          <span
                            style="width:14px;height:14px;flex:none;border-radius:5px;border:2px solid #16323d;background:${e[1]}"
                          ></span>
                          <span>${e[0]}</span>
                        </button>
                      `})}
                  </div>
                  <div
                    style="margin-top:10px;font-size:11px;line-height:1.45;opacity:.6;text-wrap:pretty"
                  >
                    ${E}
                  </div>
                </div>
              `:null}
        </div>

        ${w.length>0?k`
              <div
                style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px"
              >
                ${w.map(e=>k`
                    <button
                      title="see how each device renders this"
                      style="display:flex;align-items:center;gap:6px;padding:3px 9px;border-radius:10px;border:1.5px solid #16323d;background:#fffbf0;font-size:11px"
                      @click=${()=>this.store.openSettings()}
                    >
                      <span
                        style="width:8px;height:8px;border-radius:50%;background:#f7c948;border:1.5px solid #16323d"
                      ></span>
                      <span>${e.text}</span>
                    </button>
                  `)}
              </div>
            `:null}

        ${_?k`
              <div style="display:flex;gap:6px">
                ${o.map(e=>{let t=r.action===e.id,n=a?.[r.selectedKey]?.[e.id]?.length||0;return k`
                    <button
                      style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;padding:7px 9px;border-radius:13px;font-size:12.5px;font-weight:600;border:2px solid #16323d;transition:background 150ms ease,box-shadow 150ms ease;${t?`background:#f7c948;box-shadow:2px 2px 0 #16323d`:`background:#fffbf0;opacity:.65`}"
                      @click=${()=>this.store.selectAction(e.id)}
                    >
                      <span>${e.label}</span>
                      <span
                        style="font-family:'DM Mono',monospace;font-size:10px;padding:1px 6px;border-radius:8px;background:${t?`#16323d`:`rgba(22,50,61,.12)`};color:${t?`#f7c948`:`#16323d`}"
                        >${n}</span
                      >
                    </button>
                  `})}
                <span style="display:flex;align-items:center">
                  ${Ie(this.store,`stack`,`right`,`what's in this press`,C)}
                </span>
              </div>
            `:null}
      </div>
    `}renderPcPopover(e,t){let n=this.store.setsForDevice(e.id),r=t.find(t=>t.device===e.id&&t.control===`pc`);return k`
      <div
        style="flex:none;padding:14px 16px;border-bottom:2.5px solid #16323d;background:#e8f4fa;animation:sheetIn 180ms cubic-bezier(.23,1,.32,1)"
      >
        <div style="display:flex;align-items:center;gap:9px;margin-bottom:11px">
          <span
            style="width:14px;height:14px;border-radius:5px;flex:none;background:${e.accent};border:2px solid #16323d"
          ></span>
          <span style="flex:1;font-size:13.5px;font-weight:600"
            >${e.name} · recall set-up</span
          >
          <button
            class="pop-close"
            style="width:26px;height:26px;border-radius:50%;border:2px solid #16323d;font-size:13px;line-height:1;display:flex;align-items:center;justify-content:center;transition:background 150ms ease"
            @click=${()=>this.store.closePopover()}
          >
            ×
          </button>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${n.map(t=>k`
              <button
                style="padding:8px 14px;border-radius:14px;font-size:13px;border:2px solid #16323d;transition:background 150ms ease,box-shadow 150ms ease;${r?.set===t.id?`background:#8fd0e6;font-weight:600;box-shadow:2px 2px 0 #16323d`:`background:#fffbf0`}"
                @click=${()=>this.store.setPedalSetupStep(t.id,e.id)}
              >
                ${t.name} · slot ${t.slot}
              </button>
            `)}
          <button
            style="padding:8px 14px;border-radius:14px;font-size:13px;border:2px dashed #16323d;background:#fffbf0"
            @click=${()=>{this.store.closePopover(),this.store.openSetups(null,e.id)}}
          >
            manage set-ups…
          </button>
        </div>
      </div>
    `}renderControlPopover(e,t,n){let r=t.values||ze,i=n.find(n=>n.device===e.id&&n.control===t.id),a=`pop:${e.id}:${t.id}`,o=this.dragState&&this.dragState.key===a?this.dragState.v:null,s=i?.value!=null&&!isNaN(Number(i.value))?Number(i.value):null,c=o??s??64,l=o==null?s==null?`not set yet`:W(s)===String(s)?String(s):`${s} · ${W(s)}`:`${o} / 127`;return k`
      <div
        style="flex:none;padding:14px 16px;border-bottom:2.5px solid #16323d;background:#e8f4fa;animation:sheetIn 180ms cubic-bezier(.23,1,.32,1)"
      >
        <div style="display:flex;align-items:center;gap:9px;margin-bottom:11px">
          <span
            style="width:14px;height:14px;border-radius:5px;flex:none;background:${e.accent};border:2px solid #16323d"
          ></span>
          <span style="flex:1;font-size:13.5px;font-weight:600"
            >${t.label} lands on…</span
          >
          <button
            class="pop-close"
            style="width:26px;height:26px;border-radius:50%;border:2px solid #16323d;font-size:13px;line-height:1;display:flex;align-items:center;justify-content:center;transition:background 150ms ease"
            @click=${()=>this.store.closePopover()}
          >
            ×
          </button>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:6px">
          ${r.map(e=>k`
              <button
                style="padding:8px 14px;border-radius:14px;font-size:13px;border:2px solid #16323d;transition:background 150ms ease,box-shadow 150ms ease;${i?.value===e.value?`background:#8fd0e6;font-weight:600;box-shadow:2px 2px 0 #16323d`:`background:#fffbf0`}"
                @click=${()=>this.store.setKnobValue(t.id,e.value)}
              >
                ${e.label}
              </button>
            `)}
        </div>
        ${t.type===`knob`?k`
              <div
                style="display:flex;align-items:center;gap:10px;margin-top:12px"
              >
                <input
                  type="range"
                  min="0"
                  max="127"
                  step="1"
                  .value=${String(c)}
                  style="flex:1;min-width:0;width:100%;accent-color:#16323d;height:22px;margin:0;cursor:pointer"
                  @input=${e=>{this.dragState={key:a,v:Number(e.target.value)}}}
                  @change=${e=>{let n=Number(e.target.value);this.dragState=null,this.store.setKnobNumericValue(t.id,n)}}
                />
                <span
                  style="flex:none;width:104px;text-align:right;font-family:'DM Mono',monospace;font-size:11px;font-variant-numeric:tabular-nums;white-space:nowrap"
                  >${l}</span
                >
              </div>
            `:null}
      </div>
    `}renderBuildMode(e,t,n){let r=this.store.state,i=this.store.actionUsage()[e.id]||0,a=i?`on ${i} ${i===1?`press`:`presses`} — edits land on all of them`:`not on any press yet`,o=this.store.wiggleInfo(e.steps),s=this.store.capOf(e.caps[0])?.colour||`#9fe0c0`,c=o?this.wigVis(o,s):null,l=r.rig.find(e=>We.includes(e)&&this.store.setsForDevice(e).length>0)||null,u=l?K.getDevice(l):null,d=!!l&&!e.steps.some(e=>e.control===`pc`);return k`
      <div
        style="flex:none;padding:15px 18px 13px;background:#fdf3d4;border-bottom:2.5px solid #16323d"
      >
        <div
          style="display:flex;align-items:center;gap:8px;margin-bottom:5px"
        >
          <span
            style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.08em;text-transform:uppercase;opacity:.5"
            >editing an action</span
          >
          <span style="flex:1"></span>
          <span style="font-size:11px;opacity:.6;text-align:right"
            >${a}</span
          >
        </div>
        <input
          .value=${e.name}
          placeholder="name it"
          maxlength="28"
          style="width:100%;padding:0;border:0;background:transparent;font-family:inherit;font-size:19px;font-weight:600;letter-spacing:-.02em;color:#16323d;outline:none"
          @input=${t=>this.store.updateAction(e.id,e=>({...e,name:t.target.value}))}
        />
        <input
          .value=${e.what}
          placeholder="in plain words — what does it do to the sound?"
          style="width:100%;margin-top:3px;padding:0;border:0;background:transparent;font-family:inherit;font-size:12.5px;color:#16323d;opacity:.75;outline:none"
          @input=${t=>this.store.updateAction(e.id,e=>({...e,what:t.target.value}))}
        />
        <div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:11px">
          ${st.map(t=>{let n=e.caps.includes(t.id);return k`
              <button
                style=${this.capChipStyle(n,t.colour)}
                @click=${()=>this.store.updateAction(e.id,e=>{let n=e.caps.includes(t.id),r=n&&e.caps.length>1?e.caps.filter(e=>e!==t.id):n?e.caps:[...e.caps,t.id];return{...e,caps:r}})}
              >
                <span
                  style="width:11px;height:11px;flex:none;border-radius:4px;border:2px solid #16323d;background:${t.colour}"
                ></span>
                <span>${t.name}</span>
              </button>
            `})}
        </div>
      </div>

      <div
        style="flex:1;min-height:0;overflow:auto;padding:13px;display:flex;flex-direction:column;gap:9px;background:#fffbf0"
      >
        ${o&&c?k`
              <div
                style="padding:12px 13px;border-radius:16px;border:2.5px solid #16323d;background:#f7f1e3;display:flex;flex-direction:column;gap:8px"
              >
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="font-size:13px;font-weight:600"
                    >moves using the “${o.set.name}” set-up</span
                  >
                  ${Ie(this.store,`wig`,`right`,`the moving dot`,`the bar is the knob's full travel. the coloured part is where it'll move, and the dot shows the motion — back and forth for a wiggle, one way for a glide. the knob's value in this action sets one end; the set-up's sweep sets the other. mix sets the speed.`)}
                  <span style="flex:1"></span>
                  <button
                    class="hover-mustard"
                    style="padding:4px 10px;border-radius:11px;border:2px solid #16323d;background:#fffbf0;font-size:11.5px;font-weight:600"
                    @click=${()=>this.store.openSetups(o.set.id,o.set.device)}
                  >
                    see the dips
                  </button>
                </div>
                <div style=${c.track}>
                  <div style=${c.seg}>
                    <div style=${c.dot}></div>
                  </div>
                </div>
                <div style="font-family:'DM Mono',monospace;font-size:10.5px">
                  ${o.text}
                </div>
              </div>
            `:null}

        <div style="display:flex;align-items:center">
          <span
            style="flex:1;font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;opacity:.5"
            >messages, in order</span
          >
          <span
            style="font-family:'DM Mono',monospace;font-size:11px;padding:2px 8px;border-radius:10px;border:2px solid #16323d"
            >${t.length} / ${n}</span
          >
        </div>

        ${t.map((n,i)=>{let a=K.getDevice(n.device),o=a?.controls.find(e=>e.id===n.control),s=`${n.device}:${n.control}`,c=this.focusKey===s,l=this.store.stepRole(t,n),u=n.control===`pc`?this.store.findSet(n.set):null,d=n.control===`pc`?`${a?a.name:n.device} · load the “${u?u.name:`?`}” set-up`:`${a?a.name:n.device} · ${o?o.label:n.control}${o?.type===`foot`?` · press`:``}`,f=[];return n.control===`pc`?f=this.store.setsForDevice(n.device).map(t=>({label:`${t.name} · ${t.slot}`,on:n.set===t.id,onClick:()=>this.store.updateAction(e.id,e=>{let n=e.steps.slice();return n[i]={...n[i],set:t.id},{...e,steps:n}})})):o&&(o.values||o.type===`knob`)&&(f=(o.values||ze).map(t=>({label:t.label,on:n.value===t.value,onClick:()=>this.store.updateAction(e.id,e=>{let n=e.steps.slice();return n[i]={...n[i],value:t.value},{...e,steps:n}})}))),k`
            <div
              style="padding:10px 12px;border-radius:15px;cursor:pointer;border:2.5px solid #16323d;background:${n.control===`pc`?`#fdf3d4`:`#fffbf0`};transition:box-shadow 160ms ease;${c?`box-shadow:0 0 0 4px #f7c948`:``}"
              @click=${()=>{this.focusKey=s,r.rig.includes(n.device)&&this.store.setBrowseDevice(n.device)}}
            >
              <div style="display:flex;align-items:center;gap:9px">
                <span
                  style="width:22px;height:22px;flex:none;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;border:2px solid #16323d;background:${c?`#f7c948`:`#fffbf0`}"
                  >${i+1}</span
                >
                <span style="flex:1;min-width:0">
                  <span style="display:block;font-size:13px;font-weight:600"
                    >${d}</span
                  >
                  ${l?k`<span
                        style="display:block;font-size:11.5px;line-height:1.4;opacity:.65;margin-top:2px;text-wrap:pretty"
                        >${l}</span
                      >`:null}
                </span>
                <button
                  class="del-btn"
                  style="width:24px;height:24px;flex:none;border-radius:9px;border:2px solid #16323d;font-size:12px;line-height:1"
                  @click=${e=>{e.stopPropagation(),this.store.removeStep(i)}}
                >
                  ×
                </button>
              </div>
              ${f.length>0?k`
                    <div
                      style="display:flex;flex-wrap:wrap;gap:5px;margin-top:9px"
                    >
                      ${f.map(e=>k`
                          <button
                            style="padding:5px 10px;border-radius:11px;font-size:11.5px;border:2px solid #16323d;transition:background 140ms ease;${e.on?`background:#8fd0e6;font-weight:600;box-shadow:2px 2px 0 #16323d`:`background:#fffbf0;opacity:.7`}"
                            @click=${t=>{t.stopPropagation(),e.onClick()}}
                          >
                            ${e.label}
                          </button>
                        `)}
                    </div>
                  `:null}
            </div>
          `})}

        ${t.length===0?k`
              <div
                style="padding:20px 16px;border-radius:16px;border:2.5px dashed rgba(22,50,61,.3);font-size:12.5px;line-height:1.5;opacity:.7;text-align:center;text-wrap:pretty"
              >
                tap any control on the pedal to add it to this action.
              </div>
            `:null}

        ${d&&l&&u?k`
              <button
                class="hover-opa"
                style="align-self:flex-start;padding:6px 12px;border-radius:13px;border:2px dashed #16323d;font-size:12px;font-weight:600;opacity:.7"
                @click=${()=>{let t=this.store.setsForDevice(l);t.length&&this.store.updateAction(e.id,e=>({...e,steps:[{device:l,control:`pc`,set:t[0].id,value:null},...e.steps]}))}}
              >
                + make a ${u.name} knob move on its own
              </button>
            `:null}
      </div>

      <div
        style="flex:none;display:flex;align-items:center;gap:8px;padding:12px 14px;border-top:2.5px solid #16323d;background:#fffbf0"
      >
        <button
          class="hover-opa"
          style="padding:8px 10px;border-radius:16px;font-size:12.5px;opacity:.55"
          @click=${()=>this.store.deleteAction(e.id)}
        >
          delete
        </button>
        <span style="flex:1"></span>
        <button
          class="hover-paper"
          style="padding:8px 12px;border-radius:16px;border:2px solid #16323d;font-size:12.5px;font-weight:600"
          @click=${()=>{this.store.setMode(`assign`,null),this.store.insertAction(e.id)}}
        >
          + ${this.store.slotName()}
        </button>
        <button
          style="padding:9px 16px;border-radius:18px;background:#f7c948;border:2.5px solid #16323d;box-shadow:3px 3px 0 #16323d;font-size:13px;font-weight:600"
          @click=${()=>this.store.setMode(`assign`,null)}
        >
          done
        </button>
      </div>
    `}renderAssignList(e,t){let n=this.store.state,r=this.store.actionUsage(),i=e=>`width:${this.phone?30:24}px;height:${this.phone?30:24}px;border-radius:9px;border:2px solid #16323d;font-size:12px;line-height:1;transition:background 140ms ease;${e?``:`opacity:.25;pointer-events:none`}`,a=`width:${this.phone?30:24}px;height:${this.phone?30:24}px;border-radius:9px;border:2px solid #16323d;font-size:12px;line-height:1;transition:background 140ms ease,color 140ms ease`;return k`
      ${n.notice?k`
            <div
              style="flex:none;display:flex;align-items:center;gap:9px;padding:10px 14px;background:#ffe6dd;border-bottom:2.5px solid #16323d;font-size:12.5px;line-height:1.4;animation:stepIn 160ms cubic-bezier(.23,1,.32,1)"
            >
              <span style="flex:1;text-wrap:pretty">${n.notice}</span>
              <button
                style="width:22px;height:22px;flex:none;border-radius:50%;border:2px solid #16323d;font-size:11px;line-height:1;display:flex;align-items:center;justify-content:center"
                @click=${()=>this.store.clearNotice()}
              >
                ×
              </button>
            </div>
          `:null}

      <div
        style="flex:1;min-height:0;overflow:auto;padding:13px;display:flex;flex-direction:column;gap:9px;background:#fffbf0"
      >
        ${e.length===0?k`
              <div
                style="text-align:center;padding:28px 20px;border-radius:20px;border:2.5px dashed rgba(22,50,61,.3)"
              >
                <div
                  style="width:44px;height:44px;margin:0 auto 13px;border-radius:14px;background:#8fd0e6;border:2.5px solid #16323d;position:relative;animation:bob 2.6s ease-in-out infinite"
                >
                  <span
                    style="position:absolute;left:11px;top:16px;width:5px;height:5px;border-radius:50%;background:#16323d"
                  ></span>
                  <span
                    style="position:absolute;right:11px;top:16px;width:5px;height:5px;border-radius:50%;background:#16323d"
                  ></span>
                  <span
                    style="position:absolute;left:50%;bottom:10px;transform:translateX(-50%);width:14px;height:7px;border-bottom:2.5px solid #16323d;border-radius:0 0 14px 14px"
                  ></span>
                </div>
                <div style="font-size:14px;font-weight:600;margin-bottom:5px">
                  nothing on this press yet
                </div>
                <div
                  style="font-size:12.5px;line-height:1.5;opacity:.6;text-wrap:pretty"
                >
                  tap the pedal, or add an action from the left.
                </div>
              </div>
            `:null}

        ${e.map((t,o)=>{let s=wt(t,n.channels,n.pedalSets,n.offsets),c=t.act?this.store.actionById(t.act):null,l=!!c&&(o===0||e[o-1].inst!==t.inst),u=c&&this.store.capOf(c.caps[0])?.colour||`#f7c948`,d=l&&t.inst?e.filter(e=>e.inst===t.inst):[],f=l?this.store.wiggleInfo(d):null,p=f?this.wigVis(f,`#fffbf0`):null,m=c&&r[c.id]||0,h=this.pinnedRowIndex===o,g=K.getControl(t.device,t.control),_=!!g&&g.type===`knob`&&t.value!=null&&!isNaN(Number(t.value)),v=g&&g.values&&t.control!==`pc`?g.values:null,y=t.control===`pc`?this.store.setsForDevice(t.device):null,ee=h&&(_||!!v||!!y&&y.length>0),b=`row:${o}`,x=this.dragState&&this.dragState.key===b?this.dragState.v:null,S=_?Number(t.value):64,C=x??S,w=x==null?_?W(S)===String(S)?String(S):`${S} · ${W(S)}`:``:`${x} / 127`,T=this.store.clash(e,o),E=this.formatStepLabel(t),te=`${t.from?`was “${t.from}”, changed · `:``}${s?t.control===`pc`?`${s.deviceName} · ch${s.channel} · pc ${s.value}`:`${s.deviceName} · ch${s.channel} · cc${s.cc} · ${s.value}`:t.device}`,D=`flex:none;display:flex;flex-direction:column;gap:9px;padding:10px 12px;border-radius:16px;border:2.5px solid #16323d;background:${u};box-shadow:3px 3px 0 #16323d;margin-top:${o?5:0}px;animation:stepIn 160ms cubic-bezier(.23,1,.32,1)`,ne=c?`flex:none;display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:8px 12px;margin-left:16px;border-radius:14px;border:2px solid #16323d;cursor:pointer;transition:background 120ms ease;background:${h?`#f7c948`:`#fffbf0`};animation:stepIn 160ms cubic-bezier(.23,1,.32,1)`:`flex:none;display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:10px 12px;border-radius:16px;border:2.5px solid #16323d;cursor:pointer;transition:background 120ms ease;background:${h?`#f7c948`:`#fffbf0`};box-shadow:3px 3px 0 #16323d;margin-top:${o&&e[o-1].act?5:0}px;animation:stepIn 160ms cubic-bezier(.23,1,.32,1)`;return k`
            <div style="display:contents">
              ${l&&c?k`
                    <div
                      style=${D}
                      @pointerenter=${()=>{this.pinnedRowIndex===null&&d[0]&&this.store.setPeek({device:d[0].device,control:d[0].control,value:d[0].value})}}
                      @pointerleave=${()=>{this.pinnedRowIndex===null&&this.store.setPeek(null)}}
                    >
                      <div style="display:flex;align-items:center;gap:8px">
                        <span style="display:flex;gap:3px;flex:none">
                          ${c.caps.map(e=>{let t=this.store.capOf(e);return t?k`<span
                                  title=${t.name}
                                  style="width:12px;height:12px;border-radius:4px;border:2px solid #16323d;background:${t.colour}"
                                ></span>`:null})}
                        </span>
                        <span
                          style="flex:1;min-width:0;font-size:13.5px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"
                          >${c.name}</span
                        >
                        <span
                          style="flex:none;font-family:'DM Mono',monospace;font-size:9.5px;padding:2px 7px;border-radius:9px;background:#16323d;color:#fdf3d4"
                          >${m>1?`linked · on ${m}`:`linked`}</span
                        >
                      </div>
                      ${f&&p?k`
                            <div
                              style="display:flex;flex-direction:column;gap:6px"
                            >
                              <div style=${p.track}>
                                <div style=${p.seg}>
                                  <div style=${p.dot}></div>
                                </div>
                              </div>
                              <span
                                style="font-family:'DM Mono',monospace;font-size:10.5px"
                                >${f.text}</span
                              >
                            </div>
                          `:null}
                      <div style="display:flex;gap:6px">
                        <button
                          style="padding:4px 10px;border-radius:11px;border:2px solid #16323d;background:#fffbf0;font-size:11.5px;font-weight:600"
                          @click=${()=>this.store.setMode(`build`,c.id)}
                        >
                          edit action
                        </button>
                        <button
                          class="hover-opa"
                          title="keep these messages here but stop following the action"
                          style="padding:4px 10px;border-radius:11px;border:2px solid #16323d;background:transparent;font-size:11.5px;font-weight:600;opacity:.7"
                          @click=${()=>t.inst&&this.store.detachGroup(t.inst)}
                        >
                          unlink
                        </button>
                        <span style="flex:1"></span>
                        <button
                          class="hover-opa"
                          title="take the whole action off"
                          style="padding:4px 10px;border-radius:11px;font-size:11.5px;font-weight:600;opacity:.6"
                          @click=${()=>t.inst&&this.store.removeGroup(t.inst)}
                        >
                          remove
                        </button>
                      </div>
                    </div>
                  `:null}

              <div
                style=${ne}
                @pointerenter=${()=>{this.pinnedRowIndex===null&&this.store.setPeek({device:t.device,control:t.control,value:t.value})}}
                @pointerleave=${()=>{this.pinnedRowIndex===null&&this.store.setPeek(null)}}
                @click=${e=>{e.target.closest(`button,input`)||(this.pinnedRowIndex===o?(this.pinnedRowIndex=null,this.store.setPeek(null)):(this.pinnedRowIndex=o,this.store.setPeek({device:t.device,control:t.control,value:t.value}),n.rig.includes(t.device)&&this.store.setBrowseDevice(t.device)))}}
              >
                <span
                  style="width:22px;height:22px;flex:none;border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'DM Mono',monospace;font-size:11px;background:#16323d;color:#fffbf0"
                  >${o+1}</span
                >
                <span
                  style="width:13px;height:13px;flex:none;border-radius:5px;background:${s?s.accent:`#ccc`};border:2px solid #16323d"
                ></span>
                <span style="flex:1;min-width:0">
                  <span
                    style="display:block;font-size:13.5px;font-weight:600;line-height:1.25;text-wrap:pretty;overflow-wrap:anywhere${T&&T.kind===`over`?`;opacity:.45;text-decoration:line-through;text-decoration-thickness:1.5px`:``}"
                    >${E}</span
                  >
                  <span
                    style="display:block;font-family:'DM Mono',monospace;font-size:10px;opacity:.55"
                    >${te}</span
                  >
                </span>
                <span style="display:flex;gap:4px;flex:none">
                  <button
                    style=${i(o>0)}
                    @click=${e=>{e.stopPropagation(),this.store.moveStep(o,-1)}}
                  >
                    ↑
                  </button>
                  <button
                    style=${i(o<e.length-1)}
                    @click=${e=>{e.stopPropagation(),this.store.moveStep(o,1)}}
                  >
                    ↓
                  </button>
                  <button
                    class="del-btn"
                    style=${a}
                    @click=${e=>{e.stopPropagation(),this.pinnedRowIndex===o&&(this.pinnedRowIndex=null),this.store.removeStep(o)}}
                  >
                    ×
                  </button>
                </span>

                ${ee?k`
                      <span
                        style="flex:1 0 100%;display:flex;align-items:center;flex-wrap:wrap;gap:6px 10px;margin-top:-2px;padding:6px 8px;border-radius:9px;background:#fffbf0;border:2px solid #16323d"
                      >
                        ${_?k`
                              <input
                                type="range"
                                min="0"
                                max="127"
                                step="1"
                                .value=${String(C)}
                                style="flex:1;min-width:120px;width:100%;accent-color:#16323d;height:22px;margin:0;cursor:pointer"
                                @input=${e=>{this.dragState={key:b,v:Number(e.target.value)}}}
                                @change=${e=>{let t=Number(e.target.value);this.dragState=null,this.store.setValueAt(o,t)}}
                              />
                              <span
                                style="flex:none;width:104px;text-align:right;font-family:'DM Mono',monospace;font-size:11px;font-variant-numeric:tabular-nums;white-space:nowrap"
                                >${w}</span
                              >
                            `:null}
                        ${v?v.map(e=>k`
                                <button
                                  style="padding:3px 10px;border-radius:9px;font-size:11.5px;font-weight:600;border:2px solid #16323d;background:${t.value===e.value?`#8fd0e6`:`#fffbf0`}"
                                  @click=${()=>this.store.setValueAt(o,e.value)}
                                >
                                  ${e.label}
                                </button>
                              `):null}
                        ${y?y.map(e=>k`
                                <button
                                  style="padding:3px 10px;border-radius:9px;font-size:11.5px;font-weight:600;border:2px solid #16323d;background:${t.set===e.id?`#8fd0e6`:`#fffbf0`}"
                                  @click=${()=>this.store.setPedalSetupAt(o,e.id)}
                                >
                                  ${e.name} · ${e.slot}
                                </button>
                              `):null}
                      </span>
                    `:null}

                ${T?k`
                      <span
                        style="flex:1 0 100%;display:flex;align-items:center;gap:8px;margin-top:-2px;padding:5px 6px 5px 9px;border-radius:9px;font-size:11.5px;line-height:1.3;font-weight:500;color:#16323d;background:${T.kind===`wig`?`#e8f4fa`:`rgba(22,50,61,.08)`}"
                      >
                        <span style="flex:1;min-width:0;text-wrap:pretty"
                          >${T.text}</span
                        >
                        ${T.kind===`over`?k`
                              <button
                                style="flex:none;padding:3px 9px;border-radius:8px;border:2px solid #16323d;background:#fffbf0;font-size:11px;font-weight:600"
                                @click=${e=>{e.stopPropagation(),T.merge==null?this.store.removeStep(o):this.store.mergeSetups(o,T.merge)}}
                              >
                                ${T.merge==null?`remove`:`merge`}
                              </button>
                            `:null}
                      </span>
                    `:null}
              </div>
            </div>
          `})}

        ${e.length>=t?k`
              <div
                style="padding:9px 13px;border-radius:14px;background:#ffe6dd;border:2px solid #16323d;font-size:12.5px"
              >
                this press is full (${t} of ${t} messages for
                ${this.store.limitWho()}). remove a step to make room.
              </div>
            `:null}
      </div>
    `}};$([N({attribute:!1})],Qt.prototype,`store`,void 0),$([N({type:Boolean,reflect:!0})],Qt.prototype,`phone`,void 0),$([N({type:Boolean,reflect:!0})],Qt.prototype,`desktop`,void 0),$([P()],Qt.prototype,`pinnedRowIndex`,void 0),$([P()],Qt.prototype,`focusKey`,void 0),$([P()],Qt.prototype,`dragState`,void 0),Qt=$([M(`macro-panel`)],Qt);function $t(e,t){let n=new Blob([JSON.stringify(t,null,2)],{type:`application/json`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=e,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(r)}function en(e,t){let n=new Blob([t],{type:`text/plain;charset=utf-8`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=e,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(r)}var tn=class extends j{constructor(...e){super(...e),this.phone=!1}static{this.styles=[F,I,R,L,o`
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
      .fw-bar {
        flex: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 7px 16px;
        background: var(--paper);
        border-bottom: 2px solid var(--ink);
        gap: 10px;
      }
      .fw-meta {
        display: flex;
        align-items: center;
        gap: 6px;
        font-family: var(--mono);
        font-size: 11px;
      }
      .fw-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #5bb85b;
        border: 1.5px solid var(--ink);
      }
      .fw-title {
        opacity: 0.6;
      }
      .fw-badge {
        font-weight: 600;
        padding: 1px 6px;
        border-radius: 6px;
        background: var(--card);
        border: 1.5px solid var(--ink);
      }
      .fw-detected {
        opacity: 0.5;
        font-size: 10px;
      }
      .fw-toggle-group {
        display: flex;
        align-items: center;
        gap: 4px;
      }
      .fw-toggle-btn {
        font-family: var(--mono);
        font-size: 10.5px;
        padding: 2.5px 8px;
        border-radius: 8px;
        border: 1.5px solid var(--ink);
        background: transparent;
        opacity: 0.6;
        cursor: pointer;
        transition: all 120ms ease;
      }
      .fw-toggle-btn[active] {
        background: var(--sky);
        opacity: 1;
        font-weight: 600;
        box-shadow: 1.5px 1.5px 0 var(--ink);
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
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Q(this,this.store)}handleDownload(){let e=this.store.state,t=Zt.compile(e);t.exportFile.mimeType===`application/json`?$t(t.exportFile.filename,JSON.parse(t.exportFile.content)):en(t.exportFile.filename,t.exportFile.content)}render(){let e=this.store.state;if(!e.compileOpen)return null;let t=this.store.totalAssigned,n=K.getController(e.controllerId),r=K.getBrain(e.brainId),i=e.rig.length?e.rig.map(e=>K.getDevice(e)?.name||e).join(`, `):`no pedals yet`,a=`${t} ${t===1?`message`:`messages`} · ${n.short} → ${r.short} → ${i}`,o=K.getTarget(e.targetId),s=Zt.compile(e),c=s.preview,l=s.diagnostics;return k`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this.store.closeCompile()}>
        <div class="panel sheet-in">
          <div class="head">
            <div class="title">one stomp stacks config, freshly cooked</div>
            <div class="meta">${a}</div>
          </div>
          <div class="body">
            <div class="targets-sidebar">
              ${Ue.map(t=>k`
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
              ${e.targetId===`scribble`?k`
                    <div class="fw-bar">
                      <div class="fw-meta">
                        <span class="fw-dot"></span>
                        <span class="fw-title">firmware target:</span>
                        <span class="fw-badge">${e.scribbleFirmware?.version||`2.0.0`}</span>
                        ${e.scribbleFirmware?.detectedFrom&&e.scribbleFirmware.detectedFrom!=="default"?k`<span class="fw-detected">(${e.scribbleFirmware.detectedFrom===`device`?`live device`:`imported file`})</span>`:null}
                      </div>
                      <div class="fw-toggle-group">
                        <button
                          class="fw-toggle-btn"
                          ?active=${e.scribbleFirmware?.major===`v2`}
                          @click=${()=>this.store.setScribbleFirmware(`v2`)}
                          title="Scribble v2.0+ format (presetSettings, typeA/B)"
                        >
                          v2.0+
                        </button>
                        <button
                          class="fw-toggle-btn"
                          ?active=${e.scribbleFirmware?.major===`v1`}
                          @click=${()=>this.store.setScribbleFirmware(`v1`)}
                          title="Scribble v1.0.x format (bankSettings, midiOutA/B)"
                        >
                          v1.0.x
                        </button>
                      </div>
                    </div>
                  `:null}
              <div class="preview-area">
                ${c.map(e=>k`<div style=${e.muted?`white-space:pre;opacity:.42`:e.bold?`white-space:pre;font-weight:600`:`white-space:pre;opacity:.85`}>${e.text}</div>`)}
              </div>
              <div class="issues-box">
                ${l.map(e=>k`
                    <div class="issue-row" style=${e.type===`ok`?`opacity:.6`:``}>
                      <span class="issue-dot" style="background:${e.type===`ok`?`#5bb85b`:`var(--mustard)`}"></span>
                      <span style="flex:1;text-wrap:pretty">${e.text}</span>
                    </div>
                  `)}
              </div>
            </div>
          </div>
          <div class="foot">
            <span class="target-note">
              ${o.note}
              ${e.targetId===`scribble`?` · ${e.scribbleFirmware?.major===`v2`?`v2.0+ schema`:`v1.0.x schema`}`:``}
            </span>
            <span class="spacer"></span>
            <button class="btn-close" @click=${()=>this.store.closeCompile()}>close</button>
            <button class="btn-download" @click=${()=>this.handleDownload()}>
              grab ${o.label}
            </button>
          </div>
        </div>
      </div>
    `}};$([N({attribute:!1})],tn.prototype,`store`,void 0),$([N({type:Boolean,reflect:!0})],tn.prototype,`phone`,void 0),tn=$([M(`compile-modal`)],tn);var nn=[{id:`photo`,label:`photo`},{id:`drawn`,label:`sketch`}],rn=class extends j{static{this.styles=[F,I,R,L,o`
      .panel {
        width: 520px;
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
      .head-title {
        font-size: 19px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }
      .modal-body {
        flex: 1;
        min-height: 0;
        overflow: auto;
      }
      .section {
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
      .conventions-container {
        border: 2.5px solid var(--ink);
        border-radius: 20px;
        overflow: hidden;
      }
      .convention-row {
        display: flex;
        gap: 13px;
        padding: 14px;
      }
      .convention-meta {
        width: 106px;
        flex: none;
        padding-top: 2px;
      }
      .convention-label {
        font-size: 12.5px;
        font-weight: 600;
        line-height: 1.3;
        text-wrap: pretty;
      }
      .convention-cap {
        margin-top: 3px;
        font-family: var(--mono);
        font-size: 10px;
        line-height: 1.4;
        opacity: 0.5;
      }
      .convention-render-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1px;
        min-height: 46px;
        padding: 8px 12px;
        border-radius: 12px;
      }
      .convention-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: -0.01em;
      }
      .convention-secondary {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-family: var(--mono);
        font-size: 10.5px;
        opacity: 0.72;
      }
      .convention-note {
        margin-top: 7px;
        font-size: 11.5px;
        line-height: 1.4;
        opacity: 0.55;
        text-wrap: pretty;
      }
      .shared-row {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-top: 16px;
      }
      .shared-lbl {
        font-family: var(--mono);
        font-size: 10px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        opacity: 0.45;
        flex: none;
      }
      .swatches-wrap {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
      }
      .swatch-item {
        width: 22px;
        height: 22px;
        border-radius: 8px;
        border: 2px solid var(--ink);
      }
      .shared-note {
        margin-top: 9px;
        font-size: 11.5px;
        line-height: 1.45;
        opacity: 0.55;
        text-wrap: pretty;
      }
      .foot {
        flex: none;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 16px 24px;
        border-top: 2.5px solid var(--ink);
      }
      .btn-rerun {
        margin-right: auto;
        padding: 9px 15px;
        border-radius: 20px;
        border: 2.5px solid #16323d;
        background: #f7f1e3;
        font-size: 13px;
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
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Q(this,this.store)}render(){let e=this.store.state;if(!e.settingsOpen)return null;let t=this.store.ident(e.bank,e.selectedKey),n=this.store.sharedColors(),r=q.map(e=>e[0]).filter(e=>n.length>0&&!n.includes(e)),i=this.store.displayTargets().length>0||n.length>0,a=this.store.namingTargets();return k`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this.store.closeSettings()}>
        <div class="panel sheet-in">
          <div class="head"><div class="head-title">settings</div></div>
          <div class="modal-body">
            <div class="section">
              <div class="group-title">pedal artwork</div>
              <div class="group-body">photos of the real pedals, or clean sketches with every control labelled.</div>
              <div class="tabs">
                ${nn.map(t=>k`
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

            ${i?k`
                  <div class="section" style="padding-top:4px;padding-bottom:22px">
                    <div class="group-title">device conventions</div>
                    <div class="group-body">you write it once, on the strip. here's what each part of the rig renders of it.</div>
                    <div class="conventions-container">
                      ${a.map((e,n)=>{let r=this.store.colorFor(e.id,t.color),i=e.name===0?`#f7f1e3`:r?J[r]:`#16323d`,a=e.name===0?`#16323d`:e.text?nt[t.textColor]:ot(i)?`#f7f1e3`:`#16323d`,o=[];e.name?o.push(`${e.name} char${e.secondary?` × 2 lines`:``}`):o.push(`no display`),e.colors===null?o.push(`any colour`):e.colors.length&&o.push(`${e.colors.length} leds`);let s=e.name?t.name.slice(0,e.name):t.name,c=e.secondary>0&&!!t.secondary,l=t.secondary.slice(0,e.secondary);return k`
                          <div
                            class="convention-row"
                            style="background:${n%2?`var(--card)`:`var(--paper)`};${n?`border-top:2px solid var(--ink)`:``}"
                          >
                            <div class="convention-meta">
                              <div class="convention-label">${e.label}</div>
                              <div class="convention-cap">${o.join(` · `)}</div>
                            </div>
                            <div style="flex:1;min-width:0">
                              <div
                                class="convention-render-box"
                                style="background:${i};color:${a};border:2px ${e.name?`solid var(--ink)`:`dashed rgba(22,50,61,.35)`}"
                              >
                                <span class="convention-name">${s||`—`}</span>
                                ${c?k`<span class="convention-secondary">${l}</span>`:null}
                              </div>
                              <div class="convention-note">${e.note}</div>
                            </div>
                          </div>
                        `})}
                    </div>

                    ${n.length>0?k`
                          <div class="shared-row">
                            <span class="shared-lbl">shared</span>
                            <div class="swatches-wrap">
                              ${q.map(([e,t])=>{let r=n.includes(e);return k`
                                  <span
                                    class="swatch-item"
                                    title=${r?e:`${e} — out of range for this rig`}
                                    style="background:${t};${r?``:`opacity:.18`}"
                                  ></span>
                                `})}
                            </div>
                          </div>
                          <div class="shared-note">
                            ${r.length?`the picker only offers these. ${r.join(`, `)} ${r.length===1?`is`:`are`} out of range — a colour already set stays put and gets flagged rather than snapping.`:`every device in the rig can light every colour in the picker.`}
                          </div>
                        `:null}
                  </div>
                `:null}
          </div>
          <div class="foot">
            <button class="btn-rerun" @click=${()=>this.store.rerunSetup()}>walk me through the rig again</button>
            <button class="btn-done" @click=${()=>this.store.closeSettings()}>done</button>
          </div>
        </div>
      </div>
    `}};$([N({attribute:!1})],rn.prototype,`store`,void 0),rn=$([M(`settings-modal`)],rn);var an=class extends j{static{this.styles=[F,I,R,L,o`
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
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Q(this,this.store)}render(){let e=this.store.state;return e.controllerPickerOpen?k`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this.store.closeControllerPicker()}>
        <div class="panel sheet-in">
          <div class="head">
            <div class="head-title">what are you stomping on?</div>
            <div class="head-sub">switching controllers starts a fresh set of stacks.</div>
          </div>
          <div class="body">
            ${Le.map(t=>{let n=z[t];return k`
                <button
                  class="tile"
                  style=${e.controllerId===t?`background:var(--panel-warm);box-shadow:3px 3px 0 var(--ink)`:`background:var(--paper)`}
                  @click=${()=>this.store.switchController(t)}
                >
                  <span class="tile-strip">${n.keys.map(()=>k`<span class="tile-cap"></span>`)}</span>
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
    `:null}};$([N({attribute:!1})],an.prototype,`store`,void 0),an=$([M(`controller-picker-modal`)],an);var on=class extends j{static{this.styles=[F,I,R,L,o`
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
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Q(this,this.store)}render(){let e=this.store.state;return e.brainPickerOpen?k`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this.store.closeBrainPicker()}>
        <div class="panel sheet-in">
          <div class="head">
            <div class="title">what turns one stomp into a stack?</div>
            <div class="sub">the stacks stay the same either way — this only changes what you export and what fits.</div>
          </div>
          <div class="tiles">
            ${He.map(t=>{let n=H[t],r=e.brainId===t,i=n.maxSteps===1?`1 msg`:`up to ${n.maxSteps}`;return k`
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
    `:null}};$([N({attribute:!1})],on.prototype,`store`,void 0),on=$([M(`brain-picker-modal`)],on);var sn=class extends j{static{this.styles=[F,I,R,L,o`
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
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Q(this,this.store)}render(){let e=this.store.state;if(!e.addPedalOpen)return null;let t=Ve.filter(t=>!e.rig.includes(t)),n=t.length===0;return k`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this.store.closeAddPedal()}>
        <div class="panel sheet-in">
          <div class="head">
            <div class="title">add a pedal to the rig</div>
            <div class="sub">only the pedals in your rig get tabs, a channel, and a place in the export.</div>
          </div>
          <div class="body">
            ${t.map(t=>{let n=K.getDevice(t),r=e.channels[t]||this.store.nextFreeChannel(e.rig,e.channels);return k`
                <button class="tile" @click=${()=>this.store.addPedal(t)}>
                  <span class="dot" style="background:${n.accent}"></span>
                  <span class="text-wrap">
                    <span class="pedal-name">${n.name}</span>
                    <span class="pedal-sub">${n.sub}</span>
                  </span>
                  <span class="tag">ch ${r}</span>
                </button>
              `})}
            ${n?k`
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
    `}};$([N({attribute:!1})],sn.prototype,`store`,void 0),sn=$([M(`add-pedal-modal`)],sn);var cn=class extends j{static{this.styles=[F,I,R,L,o`
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
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Q(this,this.store)}countStackedSteps(e){let t=0;return this.store.state.banks.forEach(n=>{Object.keys(n).forEach(r=>{B.forEach(i=>{n[r][i.id].forEach(n=>{n.device===e&&t++})})})}),t}render(){let e=this.store.state;if(!e.confirmRemovePedal)return null;let t=e.confirmRemovePedal,n=V[t];if(!n)return null;let r=this.countStackedSteps(t),i=`nothing is stacked on it yet, so nothing is lost. add it back any time.`;return r===1?i=`1 step across your banks uses it. that step stays put, but it won't be sent until you add it back — the export will flag it.`:r>1&&(i=`${r} steps across your banks use it. those steps stay put, but they won't be sent until you add it back — the export will flag them.`),k`
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
    `}};$([N({attribute:!1})],cn.prototype,`store`,void 0),cn=$([M(`confirm-remove-modal`)],cn);var ln=class extends j{static{this.styles=[F,I,R,L,o`
      .panel {
        width: 540px;
        max-width: 100%;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        background: var(--card);
        border: 2.5px solid var(--ink);
        border-radius: 26px;
        box-shadow: 8px 8px 0 var(--ink);
        overflow: hidden;
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
      .meta {
        font-size: 12.5px;
        opacity: 0.65;
        margin-top: 4px;
        text-wrap: pretty;
      }
      .body {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        padding: 16px 24px 20px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .rows-box {
        border: 2.5px solid var(--ink);
        border-radius: 20px;
        overflow: hidden;
      }
      .dev-row {
        display: flex;
        align-items: center;
        gap: 11px;
        padding: 13px 14px;
        border-bottom: 2px solid var(--ink);
        background: var(--paper);
      }
      .dev-row:nth-child(even) {
        background: var(--card);
      }
      .dev-row:last-child {
        border-bottom: 0;
      }
      .dev-dot {
        width: 30px;
        height: 30px;
        border-radius: 10px;
        border: 2.5px solid var(--ink);
        flex: none;
        transition: background 200ms ease;
      }
      .dev-info {
        flex: 1;
        min-width: 0;
      }
      .dev-top {
        display: flex;
        align-items: baseline;
        gap: 8px;
      }
      .dev-name {
        font-size: 14px;
        font-weight: 600;
      }
      .dev-kind {
        font-family: var(--mono);
        font-size: 9px;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        opacity: 0.45;
      }
      .dev-port {
        display: block;
        font-family: var(--mono);
        font-size: 10.5px;
        margin-top: 2px;
        opacity: 0.6;
      }
      .btn-action {
        flex: none;
        padding: 6px 12px;
        border-radius: 14px;
        border: 2px solid var(--ink);
        background: var(--card);
        font-size: 12.5px;
        font-weight: 600;
        transition: background 150ms ease;
      }
      .btn-action:hover {
        background: var(--mustard);
      }
      .btn-listen {
        flex: none;
        padding: 6px 12px;
        border-radius: 14px;
        border: 2px solid var(--ink);
        background: var(--card);
        font-size: 12.5px;
        font-weight: 600;
        transition: background 150ms ease;
      }
      .btn-listen[listening] {
        background: var(--mustard);
        animation: breathe 1.4s ease-in-out infinite;
      }
      .btn-listen:hover {
        background: var(--mustard);
      }
      .btn-toggle {
        flex: none;
        padding: 6px 13px;
        border-radius: 14px;
        border: 2px solid var(--ink);
        font-size: 12.5px;
        font-weight: 600;
        background: var(--ink);
        color: var(--panel-warm);
        transition:
          background 150ms ease,
          opacity 150ms ease;
      }
      .btn-toggle[on] {
        background: transparent;
        color: var(--ink);
        opacity: 0.55;
      }
      .heard-card {
        margin-top: 14px;
        padding: 14px 15px;
        border-radius: 20px;
        border: 2.5px solid var(--ink);
        background: #ffe6dd;
        animation: sheetIn 190ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .heard-card[ok] {
        background: #e7f5e7;
      }
      .heard-head {
        display: flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 8px;
      }
      .heard-dot {
        width: 12px;
        height: 12px;
        flex: none;
        border-radius: 4px;
        border: 2px solid var(--ink);
        background: #ef7d5c;
      }
      .heard-card[ok] .heard-dot {
        background: #5bb85b;
      }
      .heard-title {
        flex: 1;
        font-size: 13.5px;
        font-weight: 600;
      }
      .heard-body {
        font-size: 12.5px;
        line-height: 1.5;
        opacity: 0.75;
        margin-bottom: 12px;
        text-wrap: pretty;
      }
      .heard-btns {
        display: flex;
        gap: 8px;
      }
      .btn-accept {
        padding: 8px 15px;
        border-radius: 16px;
        background: var(--sky);
        border: 2.5px solid var(--ink);
        box-shadow: 2px 2px 0 var(--ink);
        font-size: 13px;
        font-weight: 600;
      }
      .btn-accept:active {
        transform: translate(2px, 2px);
        box-shadow: 0 0 0 var(--ink);
      }
      .btn-dismiss {
        padding: 8px 14px;
        border-radius: 16px;
        font-size: 13px;
        opacity: 0.6;
      }
      .btn-dismiss:hover {
        opacity: 1;
      }
      .monitor-row {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 16px;
        padding: 13px 15px;
        border-radius: 20px;
        border: 2.5px solid var(--ink);
        background: var(--card);
      }
      .monitor-row[active] {
        background: var(--panel-warm);
      }
      .toggle-switch {
        position: relative;
        width: 52px;
        height: 30px;
        flex: none;
        border-radius: 16px;
        border: 2.5px solid var(--ink);
        background: rgba(22, 50, 61, 0.12);
        cursor: pointer;
        transition: background 200ms ease;
      }
      .toggle-knob {
        position: absolute;
        top: 2px;
        left: 2px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: var(--card);
        border: 2px solid var(--ink);
        transition: left 220ms cubic-bezier(0.32, 0.72, 0, 1);
      }
      .toggle-switch[active] {
        background: #5bb85b;
      }
      .toggle-switch[active] .toggle-knob {
        left: 24px;
      }
      .foot {
        flex: none;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 16px 24px;
        border-top: 2.5px solid var(--ink);
        background: var(--card);
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
      .tools-panel {
        background: var(--paper);
        border-bottom: 2px solid var(--ink);
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        animation: sheetIn 200ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .tools-header {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 4px;
      }
      .guided-steps {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 13px;
        line-height: 1.6;
        opacity: 0.8;
      }
      .guided-steps li {
        margin-bottom: 6px;
        display: flex;
        gap: 8px;
      }
      .step-num {
        font-weight: 600;
        color: var(--mustard);
      }
      .guided-controls {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-top: 8px;
      }
      .channel-select {
        padding: 8px 12px;
        border-radius: 12px;
        border: 2px solid var(--ink);
        background: var(--card);
        font-family: inherit;
        font-size: 14px;
        font-weight: 600;
        outline: none;
        cursor: pointer;
      }
      .btn-send {
        padding: 8px 16px;
        border-radius: 16px;
        background: var(--sky);
        border: 2.5px solid var(--ink);
        box-shadow: 2px 2px 0 var(--ink);
        font-size: 13px;
        font-weight: 600;
        transition: transform 100ms, box-shadow 100ms;
      }
      .btn-send:active {
        transform: translate(2px, 2px);
        box-shadow: 0 0 0 var(--ink);
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Q(this,this.store),Z.init()}handleFileSelect(e){let t=e.target.files?.[0];if(!t)return;let n=new FileReader;n.onload=e=>{try{let t=JSON.parse(e.target?.result);this.store.loadScribbleFile(t)}catch{alert(`Could not parse JSON configuration file. Please check file format.`)}},n.readAsText(t)}triggerFileInput(){let e=this.shadowRoot?.querySelector(`#scribble-file-input`);e&&e.click()}render(){let e=this.store.state;if(!e.connectOpen)return null;let t=Z.getHardwareNodes(e),n=t.filter(t=>e.conn[t.id]).length;return k`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this.store.closeConnect()}>
        <input
          type="file"
          id="scribble-file-input"
          accept=".json"
          style="display:none"
          @change=${e=>this.handleFileSelect(e)}
        />
        <div class="panel sheet-in">
          <div class="head">
            <div class="title">what's on the other end of the cable</div>
            <div class="meta">${n?`${n} ${n===1?`device is`:`devices are`} answering. reading pulls what's on the box; listening watches what it sends.`:`nothing is answering yet. open a port and the rig above stops being a diagram.`}</div>
          </div>
          <div class="body">
            ${e.notice?k`
                  <div
                    style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:10px 14px;border-radius:14px;background:#fde8e8;border:2px solid #e53e3e;font-size:12px;color:#9b1c1c;line-height:1.4"
                  >
                    <span>${e.notice}</span>
                    <button
                      style="border:none;background:none;cursor:pointer;font-weight:bold;color:#9b1c1c;font-size:14px;flex:none"
                      @click=${()=>this.store.clearNotice()}
                    >
                      ✕
                    </button>
                  </div>
                `:null}
            <div class="rows-box">
              ${t.map(t=>{let n=!!e.conn[t.id],r=e.listening===t.id;return k`
                  <div class="dev-row">
                    <span class="dev-dot" style="background:${n?t.id===`scribble`?`#8fd0e6`:V[t.id]?.accent||`#8fd0e6`:`transparent`}"></span>
                    <div class="dev-info">
                      <div class="dev-top">
                        <span class="dev-name">${t.name}</span>
                        <span class="dev-kind">${t.kind}</span>
                        ${t.id===`scribble`&&e.scribbleFirmware?k`<span style="font-family:var(--mono);font-size:9.5px;padding:1px 5px;border-radius:6px;background:var(--mustard);border:1px solid var(--ink);font-weight:600">${e.scribbleFirmware.version}</span>`:null}
                      </div>
                      <span class="dev-port" style="opacity:${n?`0.6`:`0.35`}">${n?t.port:`not open`}</span>
                    </div>
                    ${t.canRead?k`
                          <button class="btn-action" @click=${()=>this.store.readFrom(t.id)}>
                            read
                          </button>
                        `:null}
                    ${t.canListen?k`
                          <button
                            class="btn-listen"
                            ?listening=${r}
                            @click=${()=>this.store.listenTo(t.id)}
                          >
                            ${r?`listening…`:`listen`}
                          </button>
                        `:null}
                    <button
                      class="btn-toggle"
                      ?on=${n}
                      @click=${()=>this.store.toggleConn(t.id)}
                    >
                      ${n?`drop`:`connect`}
                    </button>
                  </div>
                `})}
            </div>

            ${e.heard?k`
                  <div class="heard-card" ?ok=${!e.heard.drift}>
                    <div class="heard-head">
                      <span class="heard-dot"></span>
                      <span class="heard-title">
                        ${e.heard.drift?`that isn't where we expected it`:`${V[e.heard.pedal]?.name||e.heard.pedal} answers where we thought`}
                      </span>
                    </div>
                    <div class="heard-body">
                      ${e.heard.drift?`${V[e.heard.pedal]?.name||e.heard.pedal} sent cc ${e.heard.cc}, but our map puts that control on cc ${e.heard.expect}. the whole map looks shifted by ${e.heard.drift>0?`+`:``}${e.heard.drift} — probably a firmware revision.`:`cc ${e.heard.cc}, exactly where the map says. the rest of the pedal should line up too.`}
                    </div>
                    <div class="heard-btns">
                      ${e.heard.drift?k`
                            <button class="btn-accept" @click=${()=>this.store.acceptDrift()}>
                              shift the map by ${e.heard.drift>0?`+`:``}${e.heard.drift}
                            </button>
                          `:null}
                      <button class="btn-dismiss" @click=${()=>this.store.dismissHeard()}>
                        ${e.heard.drift?`leave it`:`good`}
                      </button>
                    </div>
                  </div>
                `:null}

            <div class="monitor-row" ?active=${e.monitorOn}>
              <div style="flex:1;min-width:0">
                <span style="display:block;font-size:13.5px;font-weight:600">watch the wire</span>
                <span style="display:block;font-size:11.5px;opacity:.6;margin-top:2px;text-wrap:pretty">
                  ${n?`every message shows up as it leaves, and anything that goes unanswered gets called out.`:`connect something first — there's nothing to watch yet.`}
                </span>
              </div>
              <div
                class="toggle-switch"
                ?active=${e.monitorOn}
                @click=${()=>this.store.toggleMonitor()}
              >
                <div class="toggle-knob"></div>
              </div>
            </div>
          </div>
          <div class="foot">
            <button class="btn-action" style="margin-right:auto" @click=${()=>this.triggerFileInput()}>
              📂 load scribble.json file
            </button>
            <button class="btn-done" @click=${()=>this.store.closeConnect()}>done</button>
          </div>
        </div>
      </div>
    `}};$([N({attribute:!1})],ln.prototype,`store`,void 0),ln=$([M(`connect-modal`)],ln);function un(e){return!e||!e.length?`empty`:e.map(e=>{let t=V[e.device],n=t?.controls.find(t=>t.id===e.control);return`${t?t.name:e.device} ${n?n.short||n.label:e.control}`}).join(` → `)}var dn=class extends j{static{this.styles=[F,I,R,L,o`
      .panel {
        width: 660px;
        max-width: 100%;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        background: var(--card);
        border: 2.5px solid var(--ink);
        border-radius: 26px;
        box-shadow: 8px 8px 0 var(--ink);
        overflow: hidden;
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
      .meta {
        font-size: 12.5px;
        opacity: 0.65;
        margin-top: 4px;
        text-wrap: pretty;
      }
      .body {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        padding: 16px 24px 20px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .filter-input {
        width: 100%;
        padding: 9px 13px;
        border-radius: 16px;
        border: 2.5px solid var(--ink);
        background: var(--card);
        font-family: var(--mono);
        font-size: 11.5px;
        color: var(--ink);
        outline: none;
      }
      .preset-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .preset-slot-row {
        padding: 12px 13px;
        border-radius: 20px;
        border: 2.5px solid var(--ink);
        background: var(--paper);
        transition:
          background 160ms ease,
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .preset-slot-row[assigned] {
        background: var(--panel-warm);
        box-shadow: 3px 3px 0 var(--ink);
      }
      .preset-top {
        display: flex;
        align-items: center;
        gap: 11px;
      }
      .num-tag {
        flex: none;
        font-family: var(--mono);
        font-size: 10px;
        padding: 4px 8px;
        border-radius: 10px;
        border: 2px solid var(--ink);
      }
      .preset-info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .preset-title {
        font-size: 13.5px;
        font-weight: 600;
        letter-spacing: -0.01em;
      }
      .preset-steps {
        font-family: var(--mono);
        font-size: 10.5px;
        opacity: 0.6;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dest-select {
        flex: none;
        max-width: 190px;
        padding: 7px 10px;
        border-radius: 14px;
        border: 2.5px solid var(--ink);
        background: var(--card);
        font-family: inherit;
        font-size: 12px;
        font-weight: 500;
        color: var(--ink);
        outline: none;
        cursor: pointer;
      }
      .dest-select[assigned] {
        background: var(--sky);
      }
      .assigned-bar {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 11px;
        padding-top: 10px;
        border-top: 2px dashed rgba(22, 50, 61, 0.28);
      }
      .dest-note {
        flex: 1;
        min-width: 0;
        font-size: 11.5px;
        opacity: 0.65;
        text-wrap: pretty;
      }
      .btn-mode {
        padding: 5px 11px;
        border-radius: 13px;
        font-size: 11.5px;
        font-weight: 500;
        border: 2.5px solid var(--ink);
        background: transparent;
        opacity: 0.55;
      }
      .btn-mode[active] {
        background: var(--mustard);
        opacity: 1;
      }
      .empty-note {
        padding: 18px;
        border-radius: 20px;
        border: 2.5px dashed rgba(22, 50, 61, 0.3);
        font-size: 13px;
        line-height: 1.5;
        opacity: 0.7;
        text-wrap: pretty;
      }
      .loader-card {
        padding: 20px;
        border-radius: 20px;
        border: 2.5px solid var(--ink);
        background: var(--paper);
        display: flex;
        flex-direction: column;
        gap: 11px;
      }
      .loader-top {
        display: flex;
        align-items: baseline;
        gap: 9px;
      }
      .scan-label {
        font-family: var(--mono);
        font-size: 13px;
        font-weight: 500;
      }
      .scan-sub {
        flex: 1;
        font-size: 12px;
        opacity: 0.6;
        text-align: right;
        text-wrap: pretty;
      }
      .scan-bar {
        height: 12px;
        border-radius: 8px;
        border: 2.5px solid var(--ink);
        background: var(--card);
        overflow: hidden;
      }
      .scan-fill {
        height: 100%;
        background: #8fd0e6;
        border-right: 2.5px solid var(--ink);
        transition: width 140ms linear;
      }
      .loader-status {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        opacity: 0.6;
      }
      .loader-dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: var(--mustard);
        border: 2px solid var(--ink);
        animation: breathe 1.2s ease-in-out infinite;
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
      .footer-info {
        font-family: var(--mono);
        font-size: 11px;
        opacity: 0.5;
        flex: 1;
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
      .btn-apply {
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
      .btn-apply:active {
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0 var(--ink);
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Q(this,this.store)}handleFileSelect(e){let t=e.target.files?.[0];if(!t)return;let n=new FileReader;n.onload=e=>{try{let t=JSON.parse(e.target?.result);this.store.loadScribbleFile(t)}catch{alert(`Could not parse JSON configuration file. Please check file format.`)}},n.readAsText(t)}render(){let e=this.store.state;if(!e.readOpen||!e.readData)return null;let t=e.readData,n=!!t.readingHardware,r=`presets on the ${t.from===`scribble`?`scribble relay`:t.from}${t.from===`scribble`&&e.scribbleFirmware?` (${e.scribbleFirmware.version})`:``}`,i=`128 slots, ${t.presets.length} carrying something. send any of them to any stack in bank ${String(e.bank+1).padStart(2,`0`)} — nothing changes until you apply.`,a=t.scanned||0,o=t.total||128,s=t.found||0,c=`slot ${a} / ${o}`,l=s?`${s} ${s===1?`preset found so far`:`presets found so far`}`:`listening for the first answer…`,u=Math.min(100,Math.round(100*a/o)),d=(t.filter||``).trim().toLowerCase(),f=t.presets.filter(e=>!d||String(e.n).indexOf(d)===0||e.label.toLowerCase().includes(d)||e.second.toLowerCase().includes(d)||un(e.steps).toLowerCase().includes(d)),p=z[e.controllerId]||z.chocolate,m=p?p.keys:[`A`,`B`,`C`,`D`],h=[{value:``,label:`— leave it —`}];m.forEach(e=>{B.forEach(t=>{h.push({value:`${e}:${t.id}`,label:`switch ${e} · ${t.label.toLowerCase()}`})})});let g=Object.keys(t.dest).length,_=`${g} ${g===1?`preset heading into a stack`:`presets heading into stacks`}`,v=g?`pull ${g} in`:`close`;return k`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this.store.cancelRead()}>
        <input
          type="file"
          id="read-file-input"
          accept=".json"
          style="display:none"
          @change=${e=>this.handleFileSelect(e)}
        />
        <div class="panel sheet-in">
          <div class="head">
            <div class="title">${r}</div>
            <div class="meta">${i}</div>
          </div>
          <div class="body">
            ${n?k`
                  <div class="loader-card">
                    <div class="loader-top">
                      <span class="scan-label">${c}</span>
                      <span class="scan-sub">${l}</span>
                    </div>
                    <div class="scan-bar">
                      <div class="scan-fill" style="width:${u}%;"></div>
                    </div>
                    <div class="loader-status">
                      <span class="loader-dot"></span>
                      <span>waiting on the device — it answers one slot at a time.</span>
                    </div>
                  </div>
                `:null}

            <input
              class="filter-input"
              .value=${t.filter||``}
              @input=${e=>this.store.setReadFilter(e.target.value)}
              placeholder="find a slot — number or name"
            />

            ${f.length===0?k`
                  <div class="empty-note">
                    ${d?`no slot matches “${d}”.`:`nothing on the brain yet — the 128 slots are all empty.`}
                  </div>
                `:k`
                  <div class="preset-list">
                    ${f.map(n=>{let r=t.dest[n.n]||null,i=`p${String(n.n).padStart(3,`0`)}`,a=n.color&&J[n.color]?J[n.color]:`var(--ink)`,o=n.color&&J[n.color]&&!ot(J[n.color])?`var(--ink)`:`#fdf3d4`,s=r?`${r.key}:${r.action}`:``,c=r&&e.banks[e.bank]?.[r.key]?.[r.action]?e.banks[e.bank][r.key][r.action]:null,l=r?B.find(e=>e.id===r.action):null,u=l?l.label.toLowerCase():r?.action||``,d=r?c&&c.length?`switch ${r.key} · ${u} already holds ${c.length} ${c.length===1?`message`:`messages`}`:`switch ${r.key} · ${u} is empty`:``;return k`
                        <div class="preset-slot-row" ?assigned=${!!r}>
                          <div class="preset-top">
                            <span
                              class="num-tag"
                              style="background:${a};color:${o};"
                            >
                              ${i}
                            </span>
                            <div class="preset-info">
                              <span class="preset-title">${n.label}</span>
                              <span class="preset-steps">${n.second||un(n.steps)}</span>
                            </div>
                            <select
                              class="dest-select"
                              ?assigned=${!!r}
                              .value=${s}
                              @change=${e=>this.store.setReadDest(n.n,e.target.value)}
                            >
                              ${h.map(e=>k`<option value="${e.value}">${e.label}</option>`)}
                            </select>
                          </div>

                          ${r?k`
                                <div class="assigned-bar">
                                  <span class="dest-note">${d}</span>
                                  <button
                                    class="btn-mode"
                                    ?active=${r.mode===`replace`}
                                    @click=${()=>this.store.setReadDestMode(n.n,`replace`)}
                                  >
                                    replace the stack
                                  </button>
                                  <button
                                    class="btn-mode"
                                    ?active=${r.mode===`add`}
                                    @click=${()=>this.store.setReadDestMode(n.n,`add`)}
                                  >
                                    add to the stack
                                  </button>
                                </div>
                              `:null}
                        </div>
                      `})}
                  </div>
                `}
          </div>
          <div class="foot">
            <span class="footer-info">${_}</span>
            <button class="btn-cancel" @click=${()=>this.store.cancelRead()}>cancel</button>
            ${n?null:k`
                  <button class="btn-apply" @click=${()=>this.store.applyPresets()}>
                    ${v}
                  </button>
                `}
          </div>
        </div>
      </div>
    `}};$([N({attribute:!1})],dn.prototype,`store`,void 0),dn=$([M(`read-modal`)],dn);var fn=class extends j{static{this.styles=[F,I,L,o`
      :host {
        display: block;
        flex: none;
        border-top: 2.5px solid #16323d;
        background: #fffbf0;
        padding: 12px 18px;
        animation: sheetIn 180ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .head {
        display: flex;
        align-items: center;
        gap: 9px;
        padding-bottom: 9px;
      }
      .label {
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        flex: 1;
        opacity: 0.72;
      }
      .btn-clear {
        font-family: 'DM Mono', monospace;
        font-size: 11px;
        padding: 4px 10px;
        border-radius: 12px;
        opacity: 0.5;
      }
      .btn-clear:hover {
        opacity: 1;
      }
      .btn-stomp {
        padding: 6px 13px;
        border-radius: 16px;
        background: #f7c948;
        border: 2px solid #16323d;
        box-shadow: 2px 2px 0 #16323d;
        font-size: 12px;
        font-weight: 600;
        transition:
          transform 160ms cubic-bezier(0.23, 1, 0.32, 1),
          box-shadow 160ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .btn-stomp:active {
        transform: translate(1px, 1px);
        box-shadow: 1px 1px 0 #16323d;
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Q(this,this.store)}render(){let e=this.store.state;if(!e.monitorOn)return null;let t=z[e.controllerId]||z.chocolate,n=Object.keys(e.conn).filter(t=>e.conn[t]).length,r=n?`the wire · ${n} connected`:`the wire · preview — nothing plugged in yet`,i=`flex:none;width:8px;height:8px;border-radius:50%;border:1.5px solid #16323d;background:${n?`#5bb85b`:`#f7c948`};${n?`box-shadow:0 0 6px #5bb85b`:``}`,a=t.nav?`fire preset ${String(e.bank+1).padStart(3,`0`)}`:`stomp ${e.selectedKey}`,o=`max-height:92px;overflow-y:auto;display:flex;flex-direction:column-reverse;gap:4px;font-family:'DM Mono',monospace;font-size:11.5px;${e.log.length>3?`mask-image:linear-gradient(to bottom,transparent 0,#000 18px);-webkit-mask-image:linear-gradient(to bottom,transparent 0,#000 18px)`:``}`;return k`
      <div class="head">
        <span style=${i}></span>
        <span class="label">${r}</span>
        ${e.log.length?k`<button class="btn-clear" @click=${()=>this.store.clearLog()}>clear</button>`:null}
        <button class="btn-stomp" @click=${()=>this.store.stompTest()}>${a}</button>
      </div>
      <div style=${o}>
        ${e.log.length===0?k`<div style="opacity:.4;padding:4px 0">
              quiet on the wire — hit stomp or twist a knob in a popover to watch messages go out.
            </div>`:[...e.log].slice(-18).reverse().map(e=>k`
                  <div style="display:flex;align-items:baseline;gap:9px;line-height:1.45">
                    <span
                      style="flex:none;width:7px;height:7px;border-radius:50%;border:1.5px solid #16323d;transform:translateY(-1px);background:${e.tone===`trig`?`#f7c948`:e.tone===`out`?`#8fd0e6`:e.tone===`in`?`#e56b55`:e.tone===`warn`?`#f7c948`:`#5bb85b`}"
                    ></span>
                    <span style="font-weight:500">${e.text}</span>
                    <span style="opacity:.52;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${e.sub}</span>
                  </div>
                `)}
      </div>
    `}};$([N({attribute:!1})],fn.prototype,`store`,void 0),fn=$([M(`wire-monitor`)],fn);var pn=class extends j{static{this.styles=[F,I,R,L,o`
      .hover-opa:hover {
        opacity: 1 !important;
      }
      .hover-paper:hover {
        background: #f7f1e3 !important;
      }
      .active-press:active {
        transform: translate(2px, 2px);
        box-shadow: 0 0 0 #16323d !important;
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Q(this,this.store)}flipDip(e,t){!t.id||!t.kind||this.store.updateSet(e.id,e=>(t.kind===`move`?e.move[t.id]=!e.move[t.id]:t.kind===`fall`?e.fall[t.id]=!e.fall[t.id]:t.kind===`bounce`?e.bounce=!e.bounce:t.kind===`sweep`?e.sweep=e.sweep===`top`?`bottom`:`top`:t.kind===`shape`?e.shape=e.shape===`square`?`tri`:`square`:t.kind===`extra`&&(e.extras={...e.extras||{},[t.id]:!(e.extras&&e.extras[t.id])}),e.saved=!1,e))}render(){let e=this.store.state;if(!e.setsOpen)return null;let t=e.pedalSets.find(t=>t.id===e.setsOpen)||e.pedalSets[0],n=t?t.device:`mood`,r=K.getDevice(n),i=e.pedalSets.filter(e=>e.device===n),a=n===`mood`?`#f2a07e`:r?.body||`#f2a07e`,o=n===`mood`?`#e8785a`:r?.accent||`#e8785a`,s=t?Je(t):null,c=s?s.left:[],l=s?s.right:[],u=[...c,...l],d=t?Ze(t,{controllerId:e.controllerId,banks:e.banks,channels:e.channels,onCreateSaveButton:e=>this.store.createSaveButtonOnP128(e)}):[],f=Math.min(e.walkIndex||0,Math.max(0,d.length-1)),p=d[f],m=t?e.actions.filter(e=>e.steps.some(e=>e.control===`pc`&&e.set===t.id)):[],h=t?Ye(t):[];return k`
      <div
        class="scrim"
        style="z-index:94"
        @click=${e=>e.target===e.currentTarget&&this.store.closeSetups()}
      >
        <div
          class="sheet-in"
          style="width:660px;max-width:100%;max-height:92vh;display:flex;flex-direction:column;background:#fffbf0;border:2.5px solid #16323d;border-radius:26px;overflow:hidden;box-shadow:8px 8px 0 #16323d"
        >
          <div
            style="flex:none;padding:20px 24px 15px;border-bottom:2.5px solid #16323d;background:#fdf3d4"
          >
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <span
                style="font-size:19px;font-weight:600;letter-spacing:-.02em"
                >${r?r.name:`MOOD`} set-ups</span
              >
              ${Ie(this.store,`sets`,`left`,`why set-ups?`,`MOOD MkI can move a knob on its own (a wiggle or a slow glide), but only from the switches on its back — midi can't flip them. so you set the switches once, save them into a MOOD slot, and any action can bring them back. slots 1 and 2 save straight from the pedal, no cables needed.`)}
              <span style="flex:1"></span>
              <div style="display:flex;gap:5px">
                ${We.map(t=>{let r=K.getDevice(t),i=n===t;return k`
                    <button
                      style="display:flex;align-items:center;gap:5px;padding:4px 10px;border-radius:12px;font-size:11.5px;font-weight:600;border:2px solid #16323d;background:${i&&r?r.accent:`#fffbf0`};${i?`box-shadow:2px 2px 0 #16323d`:`opacity:.65`}"
                      @click=${()=>{let n=e.pedalSets.find(e=>e.device===t);n?this.store.openSetups(n.id,t):this.store.newSet(t)}}
                    >
                      <span
                        style="width:10px;height:10px;border-radius:3px;border:1.5px solid #16323d;background:${r?r.accent:`#f7c948`}"
                      ></span>
                      <span>${r?r.name:t}</span>
                    </button>
                  `})}
              </div>
            </div>

            <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:12px">
              ${i.map(e=>k`
                  <button
                    style="padding:5px 12px;border-radius:13px;font-size:12px;font-weight:600;border:2px solid #16323d;transition:background 150ms ease;${t&&t.id===e.id?`background:${o};box-shadow:2px 2px 0 #16323d`:`background:#fffbf0;opacity:.65`}"
                    @click=${()=>this.store.openSetups(e.id,e.device)}
                  >
                    ${e.name} · ${e.slot}
                  </button>
                `)}
              <button
                class="hover-opa"
                style="padding:5px 12px;border-radius:13px;border:2px dashed #16323d;font-size:12px;font-weight:600;opacity:.6"
                @click=${()=>this.store.newSet(n)}
              >
                + new set-up
              </button>
            </div>
          </div>

          <div
            style="flex:1;min-height:0;overflow:auto;padding:18px 24px 22px;display:flex;flex-direction:column;gap:16px"
          >
            ${t?k`
                  <div style="display:flex;align-items:center;gap:10px">
                    <input
                      .value=${t.name}
                      maxlength="24"
                      style="flex:1;min-width:0;padding:8px 12px;border-radius:14px;border:2.5px solid #16323d;background:#fffbf0;font-family:inherit;font-size:15px;font-weight:600;color:#16323d;outline:none"
                      @input=${e=>this.store.updateSet(t.id,t=>({...t,name:e.target.value}))}
                    />
                    <select
                      .value=${String(t.slot)}
                      style="flex:none;padding:8px 10px;border-radius:14px;border:2.5px solid #16323d;background:#16323d;color:#f7c948;font-family:'DM Mono',monospace;font-size:12px;font-weight:600"
                      @change=${e=>{let n=parseInt(e.target.value,10);this.store.updateSet(t.id,e=>({...e,slot:n,saved:!1})),this.store.setWalkIndex(0)}}
                    >
                      ${Array.from({length:122},(e,n)=>{let r=n+1,i=n===0?`slot 1 · toggle right`:n===1?`slot 2 · toggle left`:`slot ${r} · via scribble`;return k`
                          <option value=${r} ?selected=${t.slot===r}>
                            ${i}
                          </option>
                        `})}
                    </select>
                  </div>

                  <div
                    style="padding:16px 14px 14px;border-radius:22px;border:2.5px solid #16323d;background:${a};box-shadow:4px 4px 0 #16323d;display:flex;flex-direction:column;gap:12px"
                  >
                    <div
                      style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap"
                    >
                      <span
                        style="font-size:13px;font-weight:600;color:#16323d"
                        >the back of ${r?r.name:`MOOD`}</span
                      >
                      <span
                        style="font-size:11.5px;color:#16323d;opacity:.8"
                        >tap a switch to flip it</span
                      >
                      ${Ie(this.store,`dips`,`left`,`reading the diagram`,`this is the pedal seen from behind, like the photo. only the outlined switches matter for this set-up; leave the faded ones as they are. right bank: down is on. left bank: down is rise, shape ■ and sweep T.`)}
                    </div>

                    <div
                      style="display:flex;align-items:flex-end;justify-content:center;gap:10px;overflow-x:auto;padding-bottom:2px"
                    >
                      <div
                        style="flex:none;display:flex;flex-direction:column;justify-content:space-between;height:66px;padding:6px 7px;border:2px solid #16323d;border-radius:6px;font-size:11px;font-weight:600;color:#16323d;text-align:center"
                      >
                        <span>fall</span>
                        <span>rise</span>
                      </div>

                      <div
                        style="flex:none;display:flex;flex-direction:column;gap:6px"
                      >
                        <div style="display:flex;gap:4px">
                          ${c.map(e=>k`
                              <span
                                style="flex:none;width:22px;height:78px;display:flex;align-items:flex-start;justify-content:center;writing-mode:vertical-rl;transform:rotate(180deg);text-align:right;font-size:12px;font-weight:600;line-height:1;color:#16323d;${e.hot?``:`opacity:.45`}"
                                >${e.l}</span
                              >
                            `)}
                        </div>
                        <div
                          style="display:flex;gap:4px;padding:7px 6px 4px;border-radius:6px;background:#a61d24;border:2px solid #16323d"
                        >
                          ${c.map((e,n)=>k`
                              <button
                                title=${e.l}
                                style="flex:none;width:22px;display:flex;flex-direction:column;align-items:center;gap:3px;padding:0;${e.id?``:`cursor:default`}"
                                @click=${()=>this.flipDip(t,e)}
                              >
                                <span
                                  style="display:flex;flex-direction:column;justify-content:${e.on?`flex-end`:`flex-start`};width:16px;height:38px;padding:2px;border-radius:3px;background:#6e1116;${e.hot?`box-shadow:0 0 0 2px #f7c948`:`opacity:.55`};transition:box-shadow 160ms ease"
                                >
                                  <span
                                    style="display:block;width:100%;height:15px;border-radius:2px;background:#fffbf0"
                                  ></span>
                                </span>
                                <span
                                  style="font-family:'DM Mono',monospace;font-size:8.5px;color:#f7d9d0"
                                  >${8-n}</span
                                >
                              </button>
                            `)}
                        </div>
                      </div>

                      <div
                        style="flex:none;display:flex;flex-direction:column;gap:6px"
                      >
                        <div style="display:flex;gap:4px">
                          ${l.map(e=>k`
                              <span
                                style="flex:none;width:22px;height:78px;display:flex;align-items:flex-start;justify-content:center;writing-mode:vertical-rl;transform:rotate(180deg);text-align:right;font-size:12px;font-weight:600;line-height:1;color:#16323d;${e.hot?``:`opacity:.45`}"
                                >${e.l}</span
                              >
                            `)}
                        </div>
                        <div
                          style="display:flex;gap:4px;padding:7px 6px 4px;border-radius:6px;background:#a61d24;border:2px solid #16323d"
                        >
                          ${l.map((e,n)=>k`
                              <button
                                title=${e.l}
                                style="flex:none;width:22px;display:flex;flex-direction:column;align-items:center;gap:3px;padding:0;${e.id?``:`cursor:default`}"
                                @click=${()=>this.flipDip(t,e)}
                              >
                                <span
                                  style="display:flex;flex-direction:column;justify-content:${e.on?`flex-end`:`flex-start`};width:16px;height:38px;padding:2px;border-radius:3px;background:#6e1116;${e.hot?`box-shadow:0 0 0 2px #f7c948`:`opacity:.55`};transition:box-shadow 160ms ease"
                                >
                                  <span
                                    style="display:block;width:100%;height:15px;border-radius:2px;background:#fffbf0"
                                  ></span>
                                </span>
                                <span
                                  style="font-family:'DM Mono',monospace;font-size:8.5px;color:#f7d9d0"
                                  >${8-n}</span
                                >
                              </button>
                            `)}
                        </div>
                      </div>

                      <div
                        style="flex:none;display:flex;flex-direction:column;justify-content:space-between;height:66px;padding:6px 7px;border:2px solid #16323d;border-radius:6px;font-size:11px;font-weight:600;color:#16323d;text-align:center"
                      >
                        <span>off</span>
                        <span>on</span>
                      </div>
                    </div>

                    <div
                      style="display:flex;flex-wrap:wrap;gap:6px 14px;font-size:11.5px;color:#16323d;line-height:1.4"
                    >
                      <span
                        ><b>left bank</b> · up = fall, down = rise · shape up ▼
                        / down ■ · sweep up B / down T</span
                      >
                      <span><b>right bank</b> · up = off, down = on</span>
                    </div>
                  </div>

                  <div
                    style="padding:14px 16px;border-radius:20px;border:2.5px solid #16323d;background:#f7f1e3"
                  >
                    <div
                      style="font-size:13.5px;font-weight:600;margin-bottom:8px"
                    >
                      what this does
                    </div>
                    <div style="display:flex;flex-direction:column;gap:6px">
                      ${h.map(e=>k`
                          <div
                            style="display:flex;gap:9px;font-size:12.5px;line-height:1.5"
                          >
                            <span
                              style="width:7px;height:7px;flex:none;margin-top:7px;border-radius:2px;background:#16323d"
                            ></span>
                            <span style="flex:1;text-wrap:pretty">${e}</span>
                          </div>
                        `)}
                    </div>
                  </div>

                  ${p?k`
                        <div
                          style="padding:16px;border-radius:20px;border:2.5px solid #16323d;background:#fffbf0;display:flex;flex-direction:column;gap:13px"
                        >
                          <div style="display:flex;align-items:center;gap:8px">
                            <span
                              style="flex:1;font-size:13.5px;font-weight:600"
                              >putting it on the pedal</span
                            >
                            <span
                              style="flex:none;font-family:'DM Mono',monospace;font-size:10px;padding:3px 9px;border-radius:10px;border:2px solid #16323d;background:${t.saved?`#e7f5e7`:`#ffe6dd`}"
                            >
                              ${t.saved?`on the pedal`:`not saved yet`}
                            </span>
                          </div>

                          <div style="display:flex;gap:5px">
                            ${d.map((e,t)=>k`
                                <span
                                  style="flex:1;height:6px;border-radius:3px;border:2px solid #16323d;background:${t<f?`#16323d`:t===f?`#f7c948`:`transparent`}"
                                ></span>
                              `)}
                          </div>

                          <div
                            style="display:flex;gap:16px;align-items:center;flex-wrap:wrap"
                          >
                            <div
                              style="flex:none;width:170px;height:104px;border-radius:16px;border:2.5px solid #16323d;background:${a};position:relative;display:flex;align-items:center;justify-content:center"
                            >
                              ${p.art===`dips`?k`
                                    <div
                                      style="display:flex;flex-direction:column;align-items:center;gap:6px"
                                    >
                                      <div style="display:flex;gap:2px">
                                        ${u.map((e,t)=>k`
                                            <span
                                              style="display:flex;flex-direction:column;justify-content:${e.on?`flex-end`:`flex-start`};width:7px;height:22px;padding:1px;border-radius:2px;background:#6e1116;${t===8?`margin-left:6px;`:``}${e.hot?`box-shadow:0 0 0 1.5px #f7c948`:`opacity:.5`}"
                                            >
                                              <span
                                                style="display:block;height:9px;border-radius:1px;background:#fffbf0"
                                              ></span>
                                            </span>
                                          `)}
                                      </div>
                                      <span
                                        style="font-family:'DM Mono',monospace;font-size:9.5px;color:#16323d"
                                        >back of
                                        ${r?r.name:`MOOD`}</span
                                      >
                                    </div>
                                  `:p.art===`toggle`?k`
                                      <div
                                        style="display:flex;flex-direction:column;align-items:center;gap:8px"
                                      >
                                        <div
                                          style="position:relative;width:96px;height:26px;border-radius:13px;background:#16323d"
                                        >
                                          <span
                                            style="position:absolute;top:3px;width:20px;height:20px;border-radius:50%;background:#f7c948;border:2px solid #f7f1e3;transition:left 260ms cubic-bezier(.32,.72,0,1);left:${p.pos===`left`?`3px`:p.pos===`right`?`73px`:`38px`}"
                                          ></span>
                                        </div>
                                        <div
                                          style="display:flex;justify-content:space-between;width:104px;font-family:'DM Mono',monospace;font-size:9.5px;color:#16323d"
                                        >
                                          <span>slot 2</span>
                                          <span>live</span>
                                          <span>slot 1</span>
                                        </div>
                                      </div>
                                    `:p.art===`feet`?k`
                                        <div
                                          style="display:flex;flex-direction:column;align-items:center;gap:8px"
                                        >
                                          <div style="display:flex;gap:26px">
                                            <span
                                              style="width:34px;height:34px;border-radius:50%;background:#f7f1e3;border:2.5px solid #16323d;animation:ring 1.1s cubic-bezier(.23,1,.32,1) infinite"
                                            ></span>
                                            <span
                                              style="width:34px;height:34px;border-radius:50%;background:#f7f1e3;border:2.5px solid #16323d;animation:ring 1.1s cubic-bezier(.23,1,.32,1) infinite"
                                            ></span>
                                          </div>
                                          <span
                                            style="font-family:'DM Mono',monospace;font-size:9.5px;color:#16323d"
                                            >${p.feetLabel||`hold both`}</span
                                          >
                                        </div>
                                      `:k`
                                        <div
                                          style="display:flex;flex-direction:column;align-items:center;gap:6px"
                                        >
                                          <div
                                            style="display:flex;align-items:center;gap:8px;padding:7px 9px;border-radius:10px;background:#16323d"
                                          >
                                            <span
                                              style="width:14px;height:14px;border-radius:50%;background:#f7f1e3"
                                            ></span>
                                            <span
                                              style="padding:3px 7px;border-radius:5px;background:#f7c948;font-family:'DM Mono',monospace;font-size:9.5px;font-weight:600;color:#16323d;white-space:nowrap"
                                              >${p.screen||`SAVE MOOD`}</span
                                            >
                                            <span
                                              style="width:14px;height:14px;border-radius:50%;background:#f7f1e3"
                                            ></span>
                                          </div>
                                          <span
                                            style="font-family:'DM Mono',monospace;font-size:9.5px;color:#16323d"
                                            >your scribble</span
                                          >
                                        </div>
                                      `}
                            </div>

                            <div
                              style="flex:1;min-width:200px;display:flex;flex-direction:column;gap:5px"
                            >
                              <span
                                style="font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;opacity:.5"
                                >step ${f+1} of ${d.length}</span
                              >
                              <span
                                style="font-size:15px;font-weight:600;letter-spacing:-.01em"
                                >${p.title}</span
                              >
                              <span
                                style="font-size:12.5px;line-height:1.5;opacity:.75;text-wrap:pretty"
                                >${p.body}</span
                              >
                              ${p.helper?k`
                                    <button
                                      style="align-self:flex-start;margin-top:4px;padding:6px 12px;border-radius:13px;border:2px solid #16323d;background:#f7c948;font-size:12px;font-weight:600;box-shadow:2px 2px 0 #16323d"
                                      @click=${()=>p.helper?.run()}
                                    >
                                      ${p.helper.label}
                                    </button>
                                  `:null}
                            </div>
                          </div>

                          <div
                            style="display:flex;align-items:center;gap:8px"
                          >
                            ${f>0?k`
                                  <button
                                    class="hover-paper"
                                    style="padding:8px 14px;border-radius:16px;border:2px solid #16323d;font-size:13px"
                                    @click=${()=>this.store.setWalkIndex(Math.max(0,f-1))}
                                  >
                                    back
                                  </button>
                                `:null}
                            <span
                              style="flex:1;font-size:11.5px;line-height:1.4;opacity:.6;text-wrap:pretty"
                            >
                              ${t.saved?`${r?r.name:`MOOD`} has this in slot ${t.slot}. change a switch here and you'll need to save it again.`:`tick it off once you've done it on the pedal. until then, loading it recalls whatever is already in slot ${t.slot}.`}
                            </span>
                            <button
                              class="active-press"
                              style="flex:none;padding:8px 16px;border-radius:16px;background:#8fd0e6;border:2.5px solid #16323d;box-shadow:2px 2px 0 #16323d;font-size:13px;font-weight:600"
                              @click=${()=>{f<d.length-1?this.store.setWalkIndex(f+1):(this.store.updateSet(t.id,e=>({...e,saved:!e.saved})),this.store.setWalkIndex(0))}}
                            >
                              ${f<d.length-1?`next`:t.saved?`mark as not saved`:`done — it's saved`}
                            </button>
                          </div>

                          <div
                            style="padding-top:10px;border-top:2px dashed rgba(22,50,61,.25);font-size:11.5px;opacity:.65"
                          >
                            ${m.length?`used by ${m.map(e=>`“${e.name}”`).join(`, `)}`:`no action uses this yet — add it from an action's editor.`}
                          </div>
                        </div>
                      `:null}
                `:k`
                  <div
                    style="padding:18px;border-radius:20px;border:2.5px dashed rgba(22,50,61,.3);font-size:13px;line-height:1.5;opacity:.7;text-wrap:pretty"
                  >
                    no set-ups yet. make one to get ${r?r.name:`MOOD`}'s
                    knobs moving on their own.
                  </div>
                `}
          </div>

          <div
            style="flex:none;display:flex;justify-content:flex-end;padding:14px 20px;border-top:2.5px solid #16323d"
          >
            <button
              class="active-press"
              style="padding:10px 20px;border-radius:22px;background:#f7c948;border:2.5px solid #16323d;box-shadow:3px 3px 0 #16323d;font-size:14px;font-weight:600"
              @click=${()=>this.store.closeSetups()}
            >
              done
            </button>
          </div>
        </div>
      </div>
    `}};$([N({attribute:!1})],pn.prototype,`store`,void 0),pn=$([M(`pedal-setups-modal`)],pn);var mn=class extends j{static{this.styles=[F,I,R,L,o`
      .cancel-btn:hover {
        opacity: 1 !important;
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Q(this,this.store)}movesFor(e){return e?(U[e.device||`mood`]||U.mood).filter(t=>e.move[t[0]]).map(e=>e[1]).join(` + `):``}loseFor(e){if(!e)return``;let t=this.movesFor(e);return t?`${t}${e.bounce?` won't wiggle`:` won't glide`}`:`its dip set-up is lost`}render(){let e=this.store.state.conflict;if(!e)return null;let t=this.store.findSet(e.oldSet),n=this.store.findSet(e.newSet),r=this.store.actionById(e.act)||{name:``},i=K.getDevice(e.device),a=i?i.name:e.device,o=Xe(t,n),s=(e,t)=>`display:flex;flex-direction:column;align-items:flex-start;gap:3px;width:100%;padding:12px 14px;border-radius:16px;text-align:left;border:2.5px solid #16323d;background:${e?`#fdf3d4`:`#fffbf0`};box-shadow:${t?`none`:`3px 3px 0 #16323d`}${t?`;opacity:.45;cursor:default`:``}`;return k`
      <div
        class="scrim"
        style="z-index:85"
        @click=${e=>e.target===e.currentTarget&&this.store.closeConflict()}
      >
        <div
          class="sheet-in"
          style="width:460px;max-width:100%;max-height:90vh;overflow:auto;background:#fffbf0;border:2.5px solid #16323d;border-radius:26px;box-shadow:8px 8px 0 #16323d"
        >
          <div
            style="padding:20px 22px 16px;border-bottom:2.5px solid #16323d;background:#f7c948"
          >
            <div
              style="font-size:18px;font-weight:600;letter-spacing:-.02em;text-wrap:pretty"
            >
              ${`${a} can only load one preset per press`}
            </div>
            <div
              style="font-size:12.5px;line-height:1.45;margin-top:6px;text-wrap:pretty"
            >
              ${`“${e.oldName}” already loads “${t?t.name:`a preset`}”. “${r.name}” wants to load “${n?n.name:`another`}”. whichever loads last wins — knobs and dips.`}
            </div>
          </div>
          <div
            style="padding:16px 22px;display:flex;flex-direction:column;gap:10px"
          >
            ${[{how:`merge`,title:`merge into one preset`,sub:o?`“${t?.name||``} + ${n?.name||``}” moves ${[this.movesFor(t),this.movesFor(n)].filter(Boolean).join(` + `)}. needs saving to ${a} once.`:`can't: ${t&&n&&!!t.bounce!=!!n.bounce?`one bounces, the other glides.`:`sweep or shape differs.`}`,on:!0,dis:!o},{how:`useNew`,title:`use “${n?n.name:`the new one`}”`,sub:`“${e.oldName}” keeps its other messages, but ${this.loseFor(t)}.`,on:!1,dis:!1},{how:`keepOld`,title:`keep “${t?t.name:`the current one`}”`,sub:`“${r.name}” goes in without its preset load, so ${this.loseFor(n)}.`,on:!1,dis:!1}].map(t=>k`
                <button
                  style=${s(t.on,t.dis)}
                  @click=${()=>!t.dis&&this.store.insertAction(e.act,t.how)}
                >
                  <span style="font-size:14px;font-weight:600">${t.title}</span>
                  <span
                    style="font-size:12px;line-height:1.4;opacity:.7;text-wrap:pretty"
                    >${t.sub}</span
                  >
                </button>
              `)}
          </div>
          <div style="display:flex;justify-content:flex-end;padding:0 22px 18px">
            <button
              class="cancel-btn"
              style="padding:7px 14px;border-radius:12px;font-size:12.5px;font-weight:600;opacity:.65"
              @click=${()=>this.store.closeConflict()}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    `}};$([N({attribute:!1})],mn.prototype,`store`,void 0),mn=$([M(`conflict-modal`)],mn);var hn=[{title:`what's under your foot?`,lead:`pick the switches on the floor. switching controllers redraws the banks, so start here.`},{title:`what fans the stack out?`,lead:`a foot switch only sends one message on its own. pick what holds the stack and fires the whole list when you stomp.`},{title:`what's in the loop?`,lead:`tick the pedals on your board. you can add or drop them from the tab bar any time.`}],gn=class extends j{static{this.styles=[F,I,R,L,o`
      .setup-card:hover {
        box-shadow: 4px 4px 0 #16323d !important;
      }
      .btn-skip:hover {
        opacity: 1 !important;
      }
      .btn-back:hover {
        background: #f7f1e3 !important;
      }
      .btn-next:active {
        transform: translate(2px, 2px) !important;
        box-shadow: 1px 1px 0 #16323d !important;
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Q(this,this.store)}render(){let e=this.store.state,t=e.setupStep;if(t===null)return null;let n=hn[t-1]||hn[0],r=e=>`display:flex;align-items:center;gap:14px;padding:15px;border-radius:20px;border:2.5px solid #16323d;background:${e?`#fdf3d4`:`#f7f1e3`};box-shadow:${e?`4px 4px 0 #16323d`:`none`};transition:background 160ms ease,box-shadow 160ms cubic-bezier(.23,1,.32,1)`,i=(e,t)=>`flex:none;display:flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:13px;font-family:'DM Mono',monospace;font-size:12px;border:2.5px solid #16323d;background:${e?t:`transparent`};${e?``:`opacity:.5`}`,a=[];a=t===1?Le.map(t=>{let n=z[t],a=e.controllerId===t;return{name:n.name,sub:n.blurb||n.sub,meta:n.nav?`left + right switch · 128 presets`:`${n.keys.length} switches · ${n.banks} banks`,mark:n.nav?`L R`:String(n.keys.length),style:r(a),markStyle:i(a,`#8fd0e6`),onClick:()=>{a||(this.store.switchController(t),n.isBrain&&this.store.setBrain(`scribble`))}}}):t===2?He.map(t=>{let n=H[t],a=e.brainId===t;return{name:n.full,mark:n.icon,sub:t===`scribble`&&e.controllerId===`scribble`?`already under your foot — it stomps and fans out in one box`:n.sub,meta:n.maxSteps===1?`1 message per stomp`:`up to ${n.maxSteps} messages`,style:r(a),markStyle:i(a,n.colour),onClick:()=>this.store.setBrain(t)}}):Ve.map(t=>{let n=V[t],a=e.rig.includes(t);return{name:n.name,sub:n.sub,mark:a?`✓`:`+`,meta:a?`ch ${e.channels[t]||1}`:`not in the rig`,style:r(a),markStyle:i(a,n.accent),onClick:()=>this.store.toggleRigPedal(t)}});let o=z[e.controllerId]||z.chocolate,s=H[e.brainId]||H.scribble,c=t===1?`switching controllers later redraws the banks, so start with the one under your foot.`:t===2?e.brainId===`onboard`&&!o.onboard?`${o.name} can't hold stacks onboard — pick the relay or accept one message per stomp.`:e.controllerId===`scribble`?`the scribble is already under your foot — it stomps and fans the stack out in the same box, 8 messages deep.`:`the brain sets the ceiling: ${s.maxSteps} ${s.maxSteps===1?`message`:`messages`} per stomp.`:`${e.rig.length} ${e.rig.length===1?`pedal in the rig`:`pedals in the rig`} — you can add or drop them any time.`;return k`
      <div
        class="scrim"
        style="background:rgba(22,50,61,.62);z-index:96;padding:24px"
        @click=${e=>e.target===e.currentTarget&&this.store.finishSetup(!0)}
      >
        <div
          class="sheet-in"
          style="width:720px;max-width:100%;max-height:92vh;display:flex;flex-direction:column;background:#fffbf0;border:2.5px solid #16323d;border-radius:28px;overflow:hidden;box-shadow:10px 10px 0 #16323d"
        >
          <div
            style="flex:none;display:flex;align-items:flex-start;gap:14px;padding:24px 26px 18px;border-bottom:2.5px solid #16323d;background:#fdf3d4"
          >
            <div style="flex:1;min-width:0">
              <div
                style="font-family:'DM Mono',monospace;font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;opacity:.5"
              >
                step ${t} of 3 · setting up the rig
              </div>
              <div
                style="font-size:22px;font-weight:600;letter-spacing:-.02em;margin-top:5px"
              >
                ${n.title}
              </div>
              <div
                style="font-size:13px;line-height:1.5;opacity:.65;margin-top:5px;text-wrap:pretty"
              >
                ${n.lead}
              </div>
            </div>
            <div
              style="flex:none;display:flex;align-items:center;gap:6px;padding-top:6px"
            >
              ${[1,2,3].map(e=>k`
                  <span
                    style="width:9px;height:9px;border-radius:50%;border:2.5px solid #16323d;background:${e<=t?`#16323d`:`transparent`}"
                  ></span>
                `)}
            </div>
          </div>

          <div
            style="flex:1;min-height:0;overflow:auto;padding:20px 26px 22px;display:flex;flex-direction:column;gap:11px"
          >
            ${a.map(e=>k`
                <button
                  class="setup-card"
                  style=${e.style}
                  @click=${e.onClick}
                >
                  <span style=${e.markStyle}>${e.mark}</span>
                  <span
                    style="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px;text-align:left"
                  >
                    <span style="display:flex;align-items:baseline;gap:8px">
                      <span
                        style="font-size:15.5px;font-weight:600;letter-spacing:-.015em"
                        >${e.name}</span
                      >
                      <span
                        style="font-family:'DM Mono',monospace;font-size:10.5px;opacity:.55"
                        >${e.meta}</span
                      >
                    </span>
                    <span
                      style="font-size:12.5px;line-height:1.45;opacity:.62;text-wrap:pretty"
                      >${e.sub}</span
                    >
                  </span>
                </button>
              `)}
            ${c?k`
                  <div
                    style="padding:13px 15px;border-radius:18px;border:2.5px dashed rgba(22,50,61,.32);font-size:12.5px;line-height:1.5;opacity:.7;text-wrap:pretty"
                  >
                    ${c}
                  </div>
                `:null}
          </div>

          <div
            style="flex:none;display:flex;align-items:center;gap:10px;padding:16px 22px;border-top:2.5px solid #16323d"
          >
            <button
              class="btn-skip"
              style="padding:10px 14px;border-radius:20px;font-size:13px;opacity:.55"
              @click=${()=>this.store.finishSetup(!0)}
            >
              skip — i know my way round
            </button>
            <div style="flex:1"></div>
            ${t>1?k`
                  <button
                    class="btn-back"
                    style="padding:10px 16px;border-radius:20px;border:2.5px solid #16323d;font-size:13.5px"
                    @click=${()=>this.store.setSetupStep(t-1)}
                  >
                    back
                  </button>
                `:null}
            <button
              class="btn-next"
              style="padding:11px 22px;border-radius:22px;background:#f7c948;border:2.5px solid #16323d;box-shadow:3px 3px 0 #16323d;font-size:14.5px;font-weight:600;transition:transform 160ms cubic-bezier(.23,1,.32,1),box-shadow 160ms cubic-bezier(.23,1,.32,1)"
              @click=${()=>t<3?this.store.setSetupStep(t+1):this.store.finishSetup(!1)}
            >
              ${t>=3?`start mapping`:`continue`}
            </button>
          </div>
        </div>
      </div>
    `}};$([N({attribute:!1})],gn.prototype,`store`,void 0),gn=$([M(`setup-wizard-modal`)],gn);var _n=760,vn=1100,yn=class extends j{static{this.styles=[F,I,L,o`
      :host {
        display: block;
        height: 100vh;
        overflow: hidden;
      }
      .root {
        height: 100vh;
        min-height: 560px;
        display: flex;
        flex-direction: column;
        background: #f7f1e3;
        background-image: radial-gradient(#16323d1f 1.4px, transparent 1.4px);
        background-size: 22px 22px;
        overflow: hidden;
      }
      .hover-shadow:hover {
        box-shadow: 2px 2px 0 #16323d;
      }
      .hover-mustard:hover {
        background: #f7c948 !important;
      }
      .cook-btn:active {
        transform: translate(2px, 2px);
        box-shadow: 1px 1px 0 #16323d !important;
      }
      .drawer-scrim {
        position: fixed;
        inset: 0;
        z-index: 48;
        background: rgba(22, 50, 61, 0.35);
        animation: scrimIn 150ms ease;
      }
    `]}constructor(){super(),this.store=new Lt,this.phone=window.innerWidth<_n,this.desktop=window.innerWidth>=vn,this.winW=window.innerWidth,this.onResize=()=>{this.winW=window.innerWidth,this.phone=this.winW<_n,this.desktop=this.winW>=vn},new Q(this,this.store)}connectedCallback(){super.connectedCallback(),window.addEventListener(`resize`,this.onResize)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(`resize`,this.onResize)}pipStyle(e){return`width:6px;height:6px;flex:none;border-radius:50%;background:${e?`#5bb85b`:`rgba(22,50,61,.25)`};transition:background 200ms ease${e?`;animation:breathe 2.4s ease-in-out infinite`:``}`}renderHeaderRig(){let e=this.store.state,t=K.getController(e.controllerId),n=K.getBrain(e.brainId),r=e.rig.filter(t=>e.conn[t]).length,i=e.rig.length<=2?e.rig.map(e=>K.getDevice(e)?.name||e).join(`, `):`${e.rig.slice(0,2).map(e=>K.getDevice(e)?.name||e).join(`, `)} +${e.rig.length-2}`,a=e=>`display:flex;flex-direction:column;align-items:flex-start;padding:5px 12px;border-radius:14px;border:2px solid #16323d;background:${e};line-height:1.3;text-align:left;transition:box-shadow 150ms cubic-bezier(.23,1,.32,1)`;return this.winW>=1200?k`
        <div style="display:flex;align-items:center">
          <button
            class="hover-shadow"
            style=${a(`#e8f4fa`)}
            title="change controller"
            @click=${()=>this.store.openControllerPicker()}
          >
            <span
              style="display:flex;align-items:center;gap:5px;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.08em;text-transform:uppercase;opacity:.5"
            >
              <span style=${this.pipStyle(!!e.conn[e.controllerId])}></span>
              <span>${t.isBrain?`controller · brain`:`controller`}</span>
              ${t.isBrain&&e.scribbleFirmware?k`<span style="padding:1px 4px;border-radius:4px;background:rgba(22,50,61,0.12);font-size:8.5px;letter-spacing:0">${e.scribbleFirmware.version.startsWith(`2`)?`v2`:`v1`}</span>`:null}
            </span>
            <span style="font-size:12.5px;font-weight:600">${t.short}</span>
          </button>
          ${t.isBrain?null:k`
                <span style="font-size:12px;opacity:.3;padding:0 7px">→</span>
                <button
                  class="hover-shadow"
                  style=${a(`${n.colour}55`)}
                  title="what turns one press into several messages"
                  @click=${()=>this.store.openBrainPicker()}
                >
                  <span
                    style="display:flex;align-items:center;gap:5px;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.08em;text-transform:uppercase;opacity:.5"
                  >
                    <span
                      style=${this.pipStyle(e.brainId===`scribble`&&!!e.conn.scribble)}
                    ></span>
                    <span>brain</span>
                    ${e.brainId===`scribble`&&e.scribbleFirmware?k`<span style="padding:1px 4px;border-radius:4px;background:rgba(22,50,61,0.12);font-size:8.5px;letter-spacing:0">${e.scribbleFirmware.version.startsWith(`2`)?`v2`:`v1`}</span>`:null}
                  </span>
                  <span style="font-size:12.5px;font-weight:600"
                    >${n.short}</span
                  >
                </button>
              `}
          <span style="font-size:12px;opacity:.3;padding:0 7px">→</span>
          <div style="${a(`#f7f1e3`)};cursor:default">
            <span
              style="display:flex;align-items:center;gap:5px;font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.08em;text-transform:uppercase;opacity:.5"
            >
              <span
                style=${this.pipStyle(e.rig.some(t=>e.conn[t]))}
              ></span>
              <span
                >${r?`pedals ${r}/${e.rig.length}`:`pedals`}</span
              >
            </span>
            <span style="font-size:12.5px;font-weight:600"
              >${i}</span
            >
          </div>
        </div>
      `:this.phone?null:k`
        <button
          style="display:flex;align-items:center;gap:6px;padding:6px 11px;border-radius:16px;border:2px solid #16323d;background:#e8f4fa;font-family:'DM Mono',monospace;font-size:10.5px;flex:none"
          title="rig"
          @click=${()=>this.store.openBrainPicker()}
        >
          ${t.isBrain?t.short:`${t.short} → ${n.short}`}
        </button>
      `}renderCenterBanners(){let e=this.store.state,t=e.mode===`build`&&!!e.actEdit,n=e.actEdit?this.store.actionById(e.actEdit):null,r=e.lens?this.store.capOf(e.lens):null,i=K.getController(e.controllerId),a=this.store.availableActions(),o=this.store.actionUsage(),s=[];return e.lens&&!t&&e.banks.forEach((t,n)=>{Object.keys(t).forEach(r=>{a.forEach(a=>{if(this.store.listCaps(t[r][a.id]).includes(e.lens)){let e=(i.nav?`p${String(n+1).padStart(3,`0`)} ${Re[r]||r}`:`b${n+1} · ${r}`)+` ${a.label}`;s.push({bi:n,k:r,a:a.id,label:e})}})})}),k`
      ${r&&!t?k`
            <div
              style="position:relative;z-index:15;flex:none;display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin:0 ${this.desktop?26:14}px 6px;padding:8px 10px 8px 12px;border-radius:16px;border:2.5px solid #16323d;background:${r.colour}66;animation:stepIn 160ms cubic-bezier(.23,1,.32,1)"
            >
              <span
                style="width:14px;height:14px;flex:none;border-radius:5px;border:2px solid #16323d;background:${r.colour}"
              ></span>
              <span style="font-size:13px;font-weight:600;flex:none"
                >${r.name}</span
              >
              <span style="font-size:12px;opacity:.65;flex:none"
                >${s.length?`is on`:`isn't on any stack yet — the pedal shows what its actions reach`}</span
              >
              <div
                style="display:flex;flex-wrap:wrap;gap:5px;flex:1;min-width:0"
              >
                ${s.slice(0,40).map(t=>{let n=t.bi===e.bank&&t.k===e.selectedKey&&t.a===e.action;return k`
                    <button
                      style="flex:none;padding:3px 9px;border-radius:10px;border:2px solid #16323d;font-family:'DM Mono',monospace;font-size:11px;background:${n?`#16323d`:`#fffbf0`};color:${n?`#fdf3d4`:`#16323d`}"
                      @click=${()=>{this.store.setBank(t.bi),this.store.selectSwitch(t.k),this.store.selectAction(t.a)}}
                    >
                      ${t.label}
                    </button>
                  `})}
              </div>
              <button
                title="turn the lens off"
                style="width:24px;height:24px;flex:none;border-radius:50%;border:2px solid #16323d;background:#fffbf0;font-size:12px;line-height:1;display:flex;align-items:center;justify-content:center"
                @click=${()=>this.store.setLens(null)}
              >
                ×
              </button>
            </div>
          `:null}
      ${t&&n?k`
            <div
              style="flex:none;display:flex;align-items:center;gap:10px;margin:0 ${this.desktop?26:14}px 6px;padding:8px 13px;border-radius:14px;font-size:12.5px;line-height:1.4;text-wrap:pretty;border:2px solid #16323d;background:#f7c948"
            >
              <span style="flex:1;min-width:0;text-wrap:pretty">
                editing “${n.name}” — tap a control to add it. its number
                matches the list on the right, where you set its value.${o[n.id]?` changes reach all ${o[n.id]} ${o[n.id]===1?`place`:`places`} it's used.`:``}
              </span>
              <button
                style="flex:none;padding:6px 14px;border-radius:14px;background:#16323d;color:#fdf3d4;font-size:12.5px;font-weight:600"
                @click=${()=>this.store.setMode(`assign`,null)}
              >
                done
              </button>
            </div>
          `:null}
    `}render(){let e=this.store.totalAssigned,t=this.store.state,n=Object.keys(t.conn).filter(e=>t.conn[e]).length,r=t.mode===`build`&&!!t.actEdit,i=t.actEdit?this.store.actionById(t.actEdit):null,a=K.getController(t.controllerId),o=B.find(e=>e.id===t.action)?.label||t.action,s=(a.nav?`${t.selectedKey===`L`?`left`:`right`} switch`:`switch ${t.selectedKey}`)+` · ${o}`,c=`display:flex;align-items:center;gap:${this.phone?6:14}px;padding:0 ${this.desktop?26:this.phone?10:14}px;height:${this.desktop?70:58}px;flex:none;border-bottom:2.5px solid #16323d;background:#fffbf0`,l=`width:${this.desktop?30:28}px;height:${this.desktop?30:28}px;border-radius:9px;background:#f7c948;border:2.5px solid #16323d;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700`,u=`font-size:${this.desktop?19:16.5}px;font-weight:600;letter-spacing:-.02em;white-space:nowrap;display:${this.phone?`none`:`inline`}`,d=r&&i?`you're editing “${i.name}”. tap a control to add it to the action, pick a value to change it, tap the same value again to take it out.`:`tap any knob, switch or toggle to add it straight to ${s}. good for one-offs — if you'll want the same move elsewhere, make it an action instead.`;return k`
      <div class="root">
        <header style=${c}>
          <div style="display:flex;align-items:center;gap:10px;flex:none">
            <span style=${l}>S</span>
            <span style=${u}>stomp stacks</span>
          </div>

          <div style="flex:1"></div>

          ${this.renderHeaderRig()}

          ${this.desktop?null:k`
                <button
                  class="hover-shadow"
                  title="capabilities"
                  style="display:flex;align-items:center;gap:6px;flex:none;padding:7px 11px;border-radius:18px;border:2px solid #16323d;background:${t.libOpen?`#f7c948`:`#fffbf0`};transition:background 150ms ease,box-shadow 150ms ease"
                  @click=${()=>this.store.toggleLibOpen()}
                >
                  <span
                    style="width:9px;height:9px;border-radius:50%;background:#f7c948;border:2px solid #16323d"
                  ></span>
                  <span style="font-size:12.5px;font-weight:600"
                    >${this.phone?`actions`:`capabilities`}</span
                  >
                </button>
              `}

          <button
            class="hover-shadow"
            title="plug your gear in over USB"
            style="display:flex;align-items:center;gap:7px;flex:none;padding:${this.desktop?`8px 13px`:`7px 11px`};border-radius:18px;border:2px solid #16323d;background:${n?`#e7f5e7`:`#fffbf0`};transition:background 150ms ease,box-shadow 150ms ease"
            @click=${()=>this.store.openConnect()}
          >
            <span style=${this.pipStyle(n>0)}></span>
            <span style="font-size:12.5px;font-weight:600"
              >${n?this.phone?`${n} live`:`${n} plugged in`:this.phone?`usb`:`plug in`}</span
            >
          </button>

          <button
            class="hover-mustard"
            title="show or hide the help buttons"
            style="width:${this.desktop?38:34}px;height:${this.desktop?38:34}px;flex:none;border-radius:50%;border:2.5px solid #16323d;font-size:15px;font-weight:700;display:flex;align-items:center;justify-content:center;transition:background 150ms ease;background:${t.hintAll?`#f7c948`:`#fffbf0`}"
            @click=${()=>this.store.toggleHintAll()}
          >
            ?
          </button>

          <button
            class="hover-mustard"
            title="face style & rig setup"
            style="width:${this.desktop?38:34}px;height:${this.desktop?38:34}px;flex:none;border-radius:50%;border:2.5px solid #16323d;background:#fffbf0;display:flex;align-items:center;justify-content:center;font-size:15px;transition:background 150ms ease"
            @click=${()=>this.store.openSettings()}
          >
            ⚙
          </button>

          <button
            class="cook-btn"
            style="display:flex;align-items:center;gap:9px;flex:none;padding:${this.desktop?`10px 18px`:`9px 14px`};border-radius:22px;background:#f7c948;border:2.5px solid #16323d;box-shadow:3px 3px 0 #16323d;font-size:${this.desktop?14:13}px;font-weight:600;transition:transform 160ms cubic-bezier(.23,1,.32,1),box-shadow 160ms cubic-bezier(.23,1,.32,1)"
            @click=${()=>this.store.openCompile()}
          >
            <span>${this.winW>=1280?`cook it up`:`cook`}</span>
            <span
              style="font-family:'DM Mono',monospace;font-size:11px;padding:2px 8px;border-radius:10px;background:#16323d;color:#f7c948"
              >${e}</span
            >
          </button>
        </header>

        <div
          style="flex:1;min-height:0;display:flex;flex-direction:${this.phone?`column`:`row`}"
        >
          ${this.desktop?k`<capabilities-aside
                .store=${this.store}
              ></capabilities-aside>`:null}

          ${!this.desktop&&t.libOpen?k`
                <div
                  class="drawer-scrim"
                  @click=${()=>this.store.setLibOpen(!1)}
                ></div>
                <capabilities-aside
                  .store=${this.store}
                  drawer
                ></capabilities-aside>
              `:null}

          <main
            style="flex:1;min-width:0;min-height:0;display:flex;flex-direction:column${this.phone?`;overflow-y:auto;overflow-x:hidden`:``}"
          >
            ${this.phone&&!r?k`
                  <div style="flex:none;padding:12px 14px 0">
                    <controller-graphic
                      .store=${this.store}
                    ></controller-graphic>
                  </div>
                `:null}

            <div
              style="position:relative;z-index:20;display:flex;align-items:flex-start;gap:12px;padding:${this.desktop?`14px 26px`:`12px 14px 6px`};flex:none;overflow:visible"
            >
              <span
                style="display:flex;align-items:center;gap:6px;flex:none;padding-top:6px"
              >
                <span
                  style="font-family:'DM Mono',monospace;font-size:11px;opacity:.5"
                  >pedal</span
                >
                ${Ie(this.store,`pedal`,`left`,`tapping the pedal`,d)}
              </span>
              <device-tabs
                .store=${this.store}
                style="flex:1;min-width:0"
              ></device-tabs>
            </div>

            ${this.renderCenterBanners()}

            <pedal-canvas
              .store=${this.store}
              ?phone=${this.phone}
              ?desktop=${this.desktop}
            ></pedal-canvas>

            ${t.monitorOn?k`<wire-monitor .store=${this.store}></wire-monitor>`:null}
          </main>

          <section
            style=${this.phone?`flex:none;display:flex;flex-direction:column;background:#fffbf0;border-top:2.5px solid #16323d;border-radius:20px 20px 0 0`:`width:${this.desktop?380:330}px;flex:none;display:flex;flex-direction:column;background:#fffbf0;border-left:2.5px solid #16323d;min-height:0`}
          >
            ${!this.phone&&!r?k`
                  <div
                    style="flex:none;padding:16px 18px 18px;border-bottom:2.5px solid #16323d"
                  >
                    <controller-graphic
                      .store=${this.store}
                      ?desktop=${this.desktop}
                    ></controller-graphic>
                  </div>
                `:null}

            <macro-panel
              .store=${this.store}
              ?phone=${this.phone}
              ?desktop=${this.desktop}
            ></macro-panel>
          </section>
        </div>

        <compile-modal .store=${this.store} ?phone=${this.phone}></compile-modal>
        <settings-modal .store=${this.store}></settings-modal>
        <controller-picker-modal .store=${this.store}></controller-picker-modal>
        <brain-picker-modal .store=${this.store}></brain-picker-modal>
        <add-pedal-modal .store=${this.store}></add-pedal-modal>
        <confirm-remove-modal .store=${this.store}></confirm-remove-modal>
        <connect-modal .store=${this.store}></connect-modal>
        <read-modal .store=${this.store}></read-modal>
        <pedal-setups-modal .store=${this.store}></pedal-setups-modal>
        <conflict-modal .store=${this.store}></conflict-modal>
        <setup-wizard-modal .store=${this.store}></setup-wizard-modal>
      </div>
    `}};$([N({type:Boolean,reflect:!0})],yn.prototype,`phone`,void 0),$([N({type:Boolean,reflect:!0})],yn.prototype,`desktop`,void 0),$([N({type:Number})],yn.prototype,`winW`,void 0),yn=$([M(`stomp-app`)],yn);