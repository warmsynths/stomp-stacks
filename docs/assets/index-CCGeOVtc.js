(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=globalThis,t=e.ShadowRoot&&(e.ShadyCSS===void 0||e.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,n=Symbol(),r=new WeakMap,i=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==n)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,n=this.t;if(t&&e===void 0){let t=n!==void 0&&n.length===1;t&&(e=r.get(n)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(n,e))}return e}toString(){return this.cssText}},a=e=>new i(typeof e==`string`?e:e+``,void 0,n),o=(e,...t)=>new i(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,n),s=(n,r)=>{if(t)n.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let t of r){let r=document.createElement(`style`),i=e.litNonce;i!==void 0&&r.setAttribute(`nonce`,i),r.textContent=t.cssText,n.appendChild(r)}},c=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return a(t)})(e):e,{is:l,defineProperty:u,getOwnPropertyDescriptor:d,getOwnPropertyNames:f,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,h=globalThis,g=h.trustedTypes,ee=g?g.emptyScript:``,te=h.reactiveElementPolyfillSupport,_=(e,t)=>e,ne={toAttribute(e,t){switch(t){case Boolean:e=e?ee:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},re=(e,t)=>!l(e,t),ie={attribute:!0,type:String,converter:ne,reflect:!1,useDefault:!1,hasChanged:re};Symbol.metadata??=Symbol(`metadata`),h.litPropertyMetadata??=new WeakMap;var v=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ie){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&u(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ie}static _$Ei(){if(this.hasOwnProperty(_(`elementProperties`)))return;let e=m(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(_(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_(`properties`))){let e=this.properties,t=[...f(e),...p(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(c(e))}else e!==void 0&&t.push(c(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return s(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?ne:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?ne:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??re)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};v.elementStyles=[],v.shadowRootOptions={mode:`open`},v[_(`elementProperties`)]=new Map,v[_(`finalized`)]=new Map,te?.({ReactiveElement:v}),(h.reactiveElementVersions??=[]).push(`2.1.2`);var ae=globalThis,oe=e=>e,se=ae.trustedTypes,ce=se?se.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,le=`$lit$`,y=`lit$${Math.random().toFixed(9).slice(2)}$`,ue=`?`+y,de=`<${ue}>`,b=document,x=()=>b.createComment(``),S=e=>e===null||typeof e!=`object`&&typeof e!=`function`,fe=Array.isArray,pe=e=>fe(e)||typeof e?.[Symbol.iterator]==`function`,me=`[ 	
\f\r]`,C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,he=/-->/g,ge=/>/g,w=RegExp(`>|${me}(?:([^\\s"'>=/]+)(${me}*=${me}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),_e=/'/g,ve=/"/g,ye=/^(?:script|style|textarea|title)$/i,T=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),E=Symbol.for(`lit-noChange`),D=Symbol.for(`lit-nothing`),be=new WeakMap,O=b.createTreeWalker(b,129);function xe(e,t){if(!fe(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ce===void 0?t:ce.createHTML(t)}var Se=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=C;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===C?c[1]===`!--`?o=he:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=w):(ye.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=w):o=ge:o===w?c[0]===`>`?(o=i??C,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?w:c[3]===`"`?ve:_e):o===ve||o===_e?o=w:o===he||o===ge?o=C:(o=w,i=void 0);let d=o===w&&e[t+1].startsWith(`/>`)?` `:``;a+=o===C?n+de:l>=0?(r.push(s),n.slice(0,l)+le+n.slice(l)+y+d):n+y+(l===-2?t:d)}return[xe(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},Ce=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Se(t,n);if(this.el=e.createElement(l,r),O.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=O.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(le)){let t=u[o++],n=i.getAttribute(e).split(y),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?De:r[1]===`?`?Oe:r[1]===`@`?ke:Ee}),i.removeAttribute(e)}else e.startsWith(y)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(ye.test(i.tagName)){let e=i.textContent.split(y),t=e.length-1;if(t>0){i.textContent=se?se.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],x()),O.nextNode(),c.push({type:2,index:++a});i.append(e[t],x())}}}else if(i.nodeType===8){if(i.data===ue)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(y,e+1))!==-1;)c.push({type:7,index:a}),e+=y.length-1}}a++}}static createElement(e,t){let n=b.createElement(`template`);return n.innerHTML=e,n}};function k(e,t,n=e,r){if(t===E)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=S(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=k(e,i._$AS(e,t.values),i,r)),t}var we=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??b).importNode(t,!0);O.currentNode=r;let i=O.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Te(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Ae(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=O.nextNode(),a++)}return O.currentNode=b,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Te=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=k(this,e,t),S(e)?e===D||e==null||e===``?(this._$AH!==D&&this._$AR(),this._$AH=D):e!==this._$AH&&e!==E&&this._(e):e._$litType$===void 0?e.nodeType===void 0?pe(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==D&&S(this._$AH)?this._$AA.nextSibling.data=e:this.T(b.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Ce.createElement(xe(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new we(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=be.get(e.strings);return t===void 0&&be.set(e.strings,t=new Ce(e)),t}k(t){fe(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(x()),this.O(x()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=oe(e).nextSibling;oe(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ee=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=D,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=D}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=k(this,e,t,0),a=!S(e)||e!==this._$AH&&e!==E,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=k(this,r[n+o],t,o),s===E&&(s=this._$AH[o]),a||=!S(s)||s!==this._$AH[o],s===D?e=D:e!==D&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},De=class extends Ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===D?void 0:e}},Oe=class extends Ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==D)}},ke=class extends Ee{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=k(this,e,t,0)??D)===E)return;let n=this._$AH,r=e===D&&n!==D||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==D&&(n===D||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ae=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){k(this,e)}},je=ae.litHtmlPolyfillSupport;je?.(Ce,Te),(ae.litHtmlVersions??=[]).push(`3.3.3`);var Me=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Te(t.insertBefore(x(),e),e,void 0,n??{})}return i._$AI(e),i},Ne=globalThis,A=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Me(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E}};A._$litElement$=!0,A.finalized=!0,Ne.litElementHydrateSupport?.({LitElement:A});var Pe=Ne.litElementPolyfillSupport;Pe?.({LitElement:A}),(Ne.litElementVersions??=[]).push(`4.2.2`);var j=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},Fe={attribute:!0,type:String,converter:ne,reflect:!1,hasChanged:re},Ie=(e=Fe,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function M(e){return(t,n)=>typeof n==`object`?Ie(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function Le(e){return M({...e,state:!0,attribute:!1})}var N=o`
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
`,Re=[{label:`min`,value:0},{label:`9 o'clock`,value:32},{label:`noon`,value:64},{label:`3 o'clock`,value:96},{label:`max`,value:127}],ze=[{label:`left`,value:0},{label:`centre`,value:64},{label:`right`,value:127}],L={blooper:{id:`blooper`,name:`blooper`,faceName:`blooper`,sub:`bottomless looper`,accent:`#8fd0e6`,body:`#bfe2ec`,ink:`#173b47`,midiChannel:3,pcOffset:0,photo:`assets/blooper-face.png`,pw:508,ph:948,notes:[`Zero-Based Program Changes: Blooper is a zero-based MIDI pedal. Loops 1-16 are saved and recalled using Program Changes 0-15. This allows for the use of Faves for recalling loops and puts presets in line with BOSS ES and MS series controllers. Other controllers have an option for "PC Offset" set to 0.`,`TRS MIDI Connection: Blooper uses a 1/4" TRS Ring Active connection. Requires a Chase Bliss MIDIBox or compatible TRS adapter for 5-pin MIDI controllers.`,`Default Channel: Listens on MIDI Channel 2 by default (configurable by holding both stomp switches at power-on and sending a Program Change).`,`Additive Mode Overdubs: In Additive mode, MIDI CC movements for Modifiers or Stability can be recorded directly into loop overdubs.`,`Multi-Control CC 11: CC 11 allows remote control of the onboard switch lifecycle (1=REC, 2=PLAY, 3=DUB, 4=STOP).`],controls:[{id:`volume`,short:`ramp volume`,label:`Ramp / Volume`,type:`knob`,cc:14,x:22,y:12,px:18.7,py:9.7,ps:20.7},{id:`layers`,short:`layers`,label:`Layers`,type:`knob`,cc:17,notes:`Navigates loop layer undo/redo history (0-127)`,x:50,y:12,px:49.2,py:9.5,ps:19.7},{id:`repeats`,short:`repeats`,label:`Repeats`,type:`knob`,cc:15,x:78,y:12,px:82,py:9.5,ps:19.7},{id:`modA`,short:`mod a`,label:`Modifier A`,type:`knob`,cc:30,x:22,y:33,px:19.1,py:29.7,ps:20.7},{id:`stability`,short:`stability`,label:`Stability`,type:`knob`,cc:18,x:50,y:33,px:49.6,py:29.5,ps:19.7},{id:`modB`,short:`mod b`,label:`Modifier B`,type:`knob`,cc:31,x:78,y:33,px:82,py:29.7,ps:19.7},{id:`chA`,short:`1 2 3`,label:`Mod A channel`,type:`toggle`,cc:21,x:22,y:52,px:19.7,py:46.8,ps:12.2,values:[{label:`1`,value:0},{label:`2`,value:64},{label:`3`,value:127}]},{id:`mode`,short:`norm add samp`,label:`Norm / Add / Samp`,type:`toggle`,cc:22,x:50,y:52,px:49.8,py:46.8,ps:12.2,values:[{label:`normal`,value:0},{label:`additive`,value:64},{label:`sampling`,value:127}]},{id:`chB`,short:`4 5 6`,label:`Mod B channel`,type:`toggle`,cc:23,x:78,y:52,px:80.7,py:46.8,ps:12.2,values:[{label:`4`,value:0},{label:`5`,value:64},{label:`6`,value:127}]},{id:`undo`,short:`undo / redo`,label:`Undo / Redo`,type:`toggle`,cc:5,notes:`CC 5 triggers Undo, CC 6 triggers Redo`,x:50,y:82,px:49.8,py:85.7,ps:9.1,values:[{label:`undo`,value:0},{label:`off`,value:64},{label:`redo`,value:127}]},{id:`record`,short:`record`,label:`Record`,type:`foot`,cc:1,notes:`CC 1 acts exactly like pressing the left physical footswitch`,x:28,y:82,px:19.1,py:89.1,ps:19.7,values:[{label:`tap`,value:127}]},{id:`record_discrete`,short:`discrete state`,label:`Discrete Record State (CC 11)`,type:`foot`,cc:11,notes:`CC 11 allows remote control of the onboard switch lifecycle (Requires step-sequencer)`,x:28,y:89,px:19.1,py:95,ps:10,values:[{label:`record`,value:1},{label:`play`,value:2},{label:`overdub`,value:3},{label:`stop`,value:4}]},{id:`loop`,short:`loop`,label:`Loop (Right Switch)`,type:`foot`,cc:2,notes:`CC 2 acts exactly like pressing the right physical footswitch`,x:72,y:82,px:79.8,py:89.1,ps:19.7,values:[{label:`tap`,value:127}]}],macroTemplates:[{id:`blooper-left-cycle`,name:`Record / Play / Overdub Lifecycle`,description:`Sequences through REC (v1) -> PLAY (v2) -> DUB (v3) -> PLAY (v2) (Requires Step Sequencer)`,controlId:`record_discrete`,steps:[{controlId:`record_discrete`,value:1,label:`REC`},{controlId:`record_discrete`,value:2,label:`PLAY`},{controlId:`record_discrete`,value:3,label:`DUB`},{controlId:`record_discrete`,value:2,label:`PLAY`}]},{id:`blooper-undo-redo`,name:`Undo / Redo Lifecycle`,description:`Triggers Undo (0) followed by Redo (127)`,controlId:`undo`,steps:[{controlId:`undo`,value:0,label:`UNDO`},{controlId:`undo`,value:127,label:`REDO`}]}]},mood:{id:`mood`,name:`MOOD`,faceName:`MOOD`,sub:`instant ambience`,accent:`#ef7d5c`,body:`#e8785a`,ink:`#4a150c`,midiChannel:2,photo:`assets/mood-face.png`,pw:507,ph:957,notes:[`Independent Channel Bypass: CC 102 controls Micro-looper bypass (0=Off, 127=On) and CC 103 controls Wet channel bypass (0=Off, 127=On). On classic MOOD, CC 103 values 0 (both off), 45 (micro only), 85 (wet only), 127 (both on) set combined states.`,`TRS MIDI Connection: Uses 1/4" TRS Ring Active MIDI jack (requires Chase Bliss MIDIBox or TRS MIDI cable).`,`Default Channel: Set to MIDI Channel 2 by default.`,`Clock Sync & Subdivisions: CC 18 controls master clock speed. In Tape mode, Length (CC 16) quantizes loop subdivisions (x/32, x/16, x/8, x/4, x/2, x/1).`],controls:[{id:`time`,short:`time`,label:`Time`,type:`knob`,cc:14,x:22,y:12,px:17.9,py:10.1,ps:20.7},{id:`mix`,short:`mix (ramp)`,label:`Mix (Ramp)`,type:`knob`,cc:15,x:50,y:12,px:48.9,py:10.1,ps:19.8},{id:`length`,short:`length`,label:`Length`,type:`knob`,cc:16,x:78,y:12,px:81.5,py:10.1,ps:19.8},{id:`modWet`,short:`modify`,label:`Modify — wet`,type:`knob`,cc:17,x:22,y:33,px:17.9,py:30.5,ps:20.7},{id:`clock`,short:`clock`,label:`Clock`,type:`knob`,cc:18,x:50,y:33,px:49.3,py:30.3,ps:19.8},{id:`modMicro`,short:`modify`,label:`Modify — micro`,type:`knob`,cc:19,x:78,y:33,px:81.8,py:30.5,ps:19.8},{id:`wetmode`,short:`reverb delay slip`,label:`Wet effect`,type:`toggle`,cc:21,x:22,y:52,px:19.3,py:47,ps:12.2,values:[{label:`reverb`,value:0},{label:`delay`,value:64},{label:`slip`,value:127}]},{id:`routing`,short:`in · ○+in · ○`,label:`Routing`,type:`toggle`,cc:22,x:50,y:52,px:49.5,py:47,ps:12.2,values:[{label:`in`,value:0},{label:`loop + in`,value:64},{label:`loop`,value:127}]},{id:`micromode`,short:`stretch tape env`,label:`Micro-looper mode`,type:`toggle`,cc:23,x:78,y:52,px:80.5,py:47,ps:12.2,values:[{label:`stretch`,value:0},{label:`tape`,value:64},{label:`env`,value:127}]},{id:`bypass`,short:`bypass`,label:`Bypass mode`,type:`toggle`,cc:103,notes:`CC 103 controls Wet channel bypass; CC 102 controls Micro-looper bypass`,x:50,y:82,px:49.5,py:86.7,ps:9.1,values:ze},{id:`wet`,short:`wet`,label:`Wet channel`,type:`foot`,cc:1,notes:`CC 1 acts exactly like pressing the left physical footswitch`,x:28,y:82,px:18.4,py:90.3,ps:19.8,values:[{label:`tap`,value:127}]},{id:`wet_discrete`,short:`wet discrete`,label:`Wet Channel Bypass (CC 103)`,type:`foot`,cc:103,notes:`CC 103 explicitly controls Wet channel bypass state`,x:28,y:89,px:18.4,py:96,ps:10,values:[{label:`off`,value:0},{label:`on`,value:127}]},{id:`microloop`,short:`micro`,label:`Micro-looper`,type:`foot`,cc:2,notes:`CC 2 acts exactly like pressing the right physical footswitch`,x:72,y:82,px:79.5,py:90.3,ps:19.8,values:[{label:`tap`,value:127}]},{id:`microloop_discrete`,short:`micro discrete`,label:`Micro-looper State (CC 102)`,type:`foot`,cc:102,notes:`CC 102 explicitly controls Micro-looper bypass state`,x:72,y:89,px:79.5,py:96,ps:10,values:[{label:`off`,value:0},{label:`instant`,value:64},{label:`on`,value:127}]}],macroTemplates:[{id:`mood-micro-lifecycle`,name:`Micro-Looper Freeze & Clear Lifecycle`,description:`Sequences Micro-Looper switch through REC/FREEZE (127) -> DUB (64) -> CLEAR (0)`,controlId:`microloop_discrete`,steps:[{controlId:`microloop_discrete`,value:127,label:`FREEZE`},{controlId:`microloop_discrete`,value:64,label:`DUB`},{controlId:`microloop_discrete`,value:0,label:`CLEAR`}]}]},elcap:{id:`elcap`,name:`el capistan`,faceName:`el capistan`,sub:`dTape echo`,accent:`#7b62b8`,body:`#c7ced2`,ink:`#20262b`,midiChannel:1,photo:`assets/elcap-face.png`,pw:775,ph:872,notes:[`EXP/MIDI Jack Setup: Must configure EXP/MIDI jack to MIDI mode at power-up (hold TAP footswitch, turn MIX knob until ON LED turns BLUE).`,`Default Channel: Defaults to MIDI Channel 1.`,`Bypass CC: CC 102 with value 127 engages effect; value 0 bypasses.`,`Clock Division: CC 25 controls Clock Division on V2 firmware.`],controls:[{id:`time`,short:`time`,label:`Time`,type:`knob`,cc:12,x:22,y:13,px:14.9,py:18,ps:17},{id:`cmix`,short:`mix`,label:`Mix`,type:`knob`,cc:14,x:78,y:13,px:85.1,py:18,ps:17},{id:`age`,short:`tape age`,label:`Tape Age`,type:`knob`,cc:16,x:38,y:33,px:38,py:37.3,ps:17},{id:`repeats`,short:`repeats`,label:`Repeats`,type:`knob`,cc:15,x:62,y:33,px:62,py:37.3,ps:17},{id:`wow`,short:`wow & flutter`,label:`Wow & Flutter`,type:`knob`,cc:13,x:22,y:45,px:14.9,py:42.5,ps:17},{id:`spring`,short:`spring`,label:`Spring`,type:`knob`,cc:18,x:78,y:45,px:85.1,py:42.5,ps:17},{id:`head`,short:`tape head`,label:`Tape head`,type:`toggle`,cc:11,x:40,y:13,px:42.8,py:18,ps:6.7,values:[{label:`fixed`,value:0},{label:`multi`,value:64},{label:`single`,value:127}]},{id:`cmode`,short:`mode`,label:`Mode`,type:`toggle`,cc:19,x:60,y:13,px:56.9,py:18,ps:6.7,values:[{label:`a`,value:0},{label:`b`,value:64},{label:`c`,value:127}]},{id:`tap`,short:`tap`,label:`Tap / SOS`,type:`foot`,cc:93,notes:`CC 93 triggers Tap tempo pulse and acts as the SOS looper footswitch in Mode C`,x:28,y:82,px:18.8,py:80.1,ps:14.2,values:[{label:`tap`,value:127}]},{id:`onoff`,short:`on`,label:`On / bypass`,type:`foot`,cc:102,notes:`CC 102 value 127 engages, 0 bypasses`,x:72,y:82,px:81.8,py:80.1,ps:14.2,values:[{label:`bypass`,value:0},{label:`infinite`,value:64},{label:`engage`,value:127}]}],macroTemplates:[]},genloss:{id:`genloss`,name:`generation loss`,faceName:`generation loss`,sub:`video decay`,accent:`#6d93ad`,body:`#a9c3d4`,ink:`#1f3b4d`,midiChannel:4,photo:`assets/genloss-face.png`,pw:497,ph:944,notes:[`TRS MIDI Connection: Uses Chase Bliss 1/4" TRS Ring Active MIDI connection.`,`Default Channel: Configurable MIDI Channel (defaults to Channel 4 in multi-pedal rigs).`],controls:[{id:`wow`,short:`wow`,label:`Wow`,type:`knob`,cc:14,x:22,y:12,px:18.3,py:8.7,ps:22.1},{id:`volume`,short:`volume ramp`,label:`Volume (Ramp)`,type:`knob`,cc:15,x:50,y:12,px:49.5,py:8.7,ps:21.1},{id:`model`,short:`model`,label:`Model / LP`,type:`knob`,cc:16,x:78,y:12,px:82.7,py:8.7,ps:21.1},{id:`flutter`,short:`flutter`,label:`Flutter`,type:`knob`,cc:17,x:22,y:33,px:18.3,py:29.7,ps:22.1},{id:`saturate`,short:`saturate`,label:`Saturate / Gen`,type:`knob`,cc:18,x:50,y:33,px:49.5,py:29.7,ps:21.1},{id:`failure`,short:`failure`,label:`Failure / HP`,type:`knob`,cc:19,x:78,y:33,px:82.7,py:29.7,ps:21.1},{id:`aux`,short:`stop filter fail`,label:`Aux`,type:`toggle`,cc:21,x:22,y:52,px:17.7,py:47,ps:13,values:[{label:`stop`,value:0},{label:`filter`,value:64},{label:`fail`,value:127}]},{id:`dry`,short:`none small unity`,label:`Dry`,type:`toggle`,cc:22,x:50,y:52,px:48.9,py:46.5,ps:13,values:[{label:`none`,value:0},{label:`small`,value:64},{label:`unity`,value:127}]},{id:`noise`,short:`none mild heavy`,label:`Noise`,type:`toggle`,cc:23,x:78,y:52,px:81.3,py:46.5,ps:13,values:[{label:`none`,value:0},{label:`mild`,value:64},{label:`heavy`,value:127}]},{id:`preset`,short:`preset`,label:`Preset toggle`,type:`toggle`,cc:101,x:50,y:82,px:49.5,py:85.8,ps:9.5,values:ze},{id:`auxSw`,short:`aux`,label:`Aux switch`,type:`foot`,cc:1,notes:`CC 1 acts exactly like pressing the left physical footswitch`,x:28,y:82,px:17.7,py:91.5,ps:21.1,values:[{label:`tap`,value:127}]},{id:`aux_discrete`,short:`aux discrete`,label:`Aux State (CC 103)`,type:`foot`,cc:103,notes:`CC 103 explicitly controls Aux performance state`,x:28,y:89,px:17.7,py:97,ps:10,values:[{label:`stop`,value:0},{label:`filter`,value:64},{label:`fail`,value:127}]},{id:`bypass`,short:`bypass`,label:`Bypass`,type:`foot`,cc:2,notes:`CC 2 acts exactly like pressing the right physical footswitch`,x:72,y:82,px:79.7,py:91.5,ps:21.1,values:[{label:`tap`,value:127}]},{id:`bypass_discrete`,short:`bypass discrete`,label:`Bypass State (CC 102)`,type:`foot`,cc:102,notes:`CC 102 explicitly controls Bypass state`,x:72,y:89,px:79.7,py:97,ps:10,values:[{label:`off`,value:0},{label:`on`,value:127}]}],macroTemplates:[{id:`genloss-aux-cycle`,name:`Aux Performance Switch Lifecycle`,description:`Sequences Aux switch through STOP (0) -> FILTER (64) -> FAIL (127)`,controlId:`aux_discrete`,steps:[{controlId:`aux_discrete`,value:0,label:`STOP`},{controlId:`aux_discrete`,value:64,label:`FLTR`},{controlId:`aux_discrete`,value:127,label:`FAIL`}]}]}},Be=[`blooper`,`mood`,`elcap`,`genloss`],R={chocolate:{id:`chocolate`,name:`M-Vave Chocolate`,short:`chocolate`,sub:`4 switches · 4 banks`,keys:[`A`,`B`,`C`,`D`],x:[14,38,62,86],y:[42,42,42,42],height:74,heightDesktop:80,banks:4,screen:!1,onboard:!1,notes:[`Hardware Layout: 4 foot switches (A, B, C, D) across 4 banks.`,`No Onboard Macro Storage: Sends 1 MIDI message per switch. Requires an external smart relay hub (Pirate MIDI Scribble) to fan out multi-step macro stacks.`,`Editor & Connection: Configured via M-Vave CubeSuite app over Bluetooth or USB-C MIDI.`]},mc3:{id:`mc3`,name:`Morningstar MC3`,short:`mc3`,sub:`3 switches · 3 banks`,keys:[`A`,`B`,`C`],x:[26,74,50],y:[74,74,14],height:158,heightDesktop:170,banks:3,screen:!0,onboard:!0,notes:[`Hardware Layout: 3 foot switches (A, B, C) supporting 30 physical banks.`,`Onboard Macro Storage: Stores up to 16 MIDI messages per switch action directly in memory without requiring an external relay box.`,`Editor Integration: Exports native preset JSON for import via the Morningstar Editor.`,`Connectivity: Features OLED display screen, 1x 5-pin DIN MIDI Out, 4x 3.5mm TRS MIDI outputs, and USB-C MIDI.`]}},Ve=[`chocolate`,`mc3`],z=[{id:`press`,label:`tap`},{id:`hold`,label:`hold`},{id:`double`,label:`double`}],He={scribble:{id:`scribble`,short:`scribble`,full:`Scribble relay`,sub:`the little box in the loop — takes one message in, fans the whole stack out`,icon:`▤`,colour:`#8fd0e6`,maxSteps:8,banks:16,notes:[`Pirate MIDI Scribble Relay Hub: USB-C Host / TRS / BLE relay box.`,`Macro Capacity: Stores up to 8 MIDI messages per switch action across 16 banks (128 presets total).`,`Firmware Flashing: Configured via USB-C or web editor using scribble.json config file.`]},onboard:{id:`onboard`,short:`onboard`,full:`Controller onboard`,sub:`no extra box — the controller holds the stack itself`,icon:`◉`,colour:`#f7c948`,maxSteps:6,banks:3,notes:[`Controller Onboard Storage: Direct execution on smart controllers (like Morningstar MC3).`,`Macro Capacity: Stores up to 16 MIDI messages per action directly on the controller without requiring an external relay hub.`]},none:{id:`none`,short:`direct`,full:`No brain`,sub:`controller talks straight to the pedals — one message per stomp`,icon:`—`,colour:`#ef7d5c`,maxSteps:1,banks:16,notes:[`Direct Controller Setup: Controller sends 1 raw MIDI message per stomp directly to pedals.`,`No Macro Stacks: Triggers are limited to 1 step per action (no multi-pedal fanout).`]}},Ue=[`scribble`,`onboard`,`none`],We=[{id:`scribble`,label:`scribble.json`,sub:`relay config`,note:`flashes onto the scribble over usb`},{id:`mc3`,label:`mc3-preset.json`,sub:`native preset`,note:`import via the morningstar editor`},{id:`rig`,label:`rig.json`,sub:`portable source`,note:`the source of truth — every build comes from this`},{id:`labels`,label:`label sheet`,sub:`printable`,note:`one line per stomp, for the pedalboard`},{id:`log`,label:`midi log`,sub:`debug trace`,note:`raw bytes, in the order they leave`}],B=class e{static{this.controlMap=new Map}static{this.targetMap=new Map}static{Object.values(L).forEach(t=>{t.controls.forEach(n=>{e.controlMap.set(`${t.id}:${n.id}`,n)})}),We.forEach(t=>{e.targetMap.set(t.id,t)})}static getDevice(e){return L[e]}static getController(e){return R[e]||R.chocolate}static getBrain(e){return He[e]||He.none}static getTarget(t){return e.targetMap.get(t)||We[0]}static getControl(t,n){return e.controlMap.get(`${t}:${n}`)}static valueOptionsFor(e){return e.values?e.values:e.type===`knob`?Re:[]}static formatControlLabel(t,n,r){let i=e.getControl(t,n);if(!i)return n;let a=i.label;if(r!=null){let t=e.valueOptionsFor(i).find(e=>e.value===r);t&&(a+=` · `+t.label)}return a}static findNextFreeChannel(e,t){let n={};e.forEach(e=>{t[e]&&(n[t[e]]=!0)});for(let e=1;e<=16;e++)if(!n[e])return e;return 1}static detectChannelCollisions(e,t){let n={};e.forEach(e=>{let r=L[e],i=t[e]||(r?r.midiChannel:1);(n[i]=n[i]||[]).push(r?.name||e)});let r=[];return Object.keys(n).forEach(e=>{let t=Number(e);n[t].length>1&&r.push({channel:t,devices:n[t]})}),r}static getDeviceAccentColorInt(e){let t=L[e];if(!t||!t.accent)return 0;let n=t.accent.replace(`#`,``);return n.length===6?parseInt(n,16):0}},V=[[`red`,`#ef5c4c`],[`orange`,`#ef7d5c`],[`yellow`,`#f7c948`],[`green`,`#5bb85b`],[`mint`,`#9fe0c0`],[`cyan`,`#8fd0e6`],[`blue`,`#5b8fd6`],[`purple`,`#7b62b8`],[`pink`,`#e08fc0`],[`white`,`#f4ede0`]],H=V.reduce((e,[t,n])=>(e[t]=n,e),{}),Ge=[[`ink`,`#16323d`],[`cream`,`#f7f1e3`],[`white`,`#ffffff`]],Ke=Ge.reduce((e,[t,n])=>(e[t]=n,e),{}),qe={mint:`green`,pink:`purple`};function Je(e){let t=e>>16&255,n=e>>8&255,r=e&255,i=1/0,a=`red`;return V.forEach(([e,o])=>{let s=parseInt(o.slice(1),16),c=s>>16&255,l=s>>8&255,u=s&255,d=(t-c)**2+(n-l)**2+(r-u)**2;d<i&&(i=d,a=e)}),a}function Ye(e){if(e!=null){if(typeof e==`string`){let t=e.toLowerCase().trim();if(V.some(([e])=>e===t))return t;if(t.startsWith(`#`)){let e=parseInt(t.slice(1),16);if(!isNaN(e))return Je(e)}}if(typeof e==`number`&&e>0)return Je(e)}}function Xe(e){let t=e.startsWith(`#`)?e.slice(1):e;if(t.length!==6)return!0;let n=parseInt(t,16),r=n>>16&255,i=n>>8&255,a=n&255;return(r*299+i*587+a*114)/1e3<150}var U={scribble:{id:`scribble`,label:`Scribble relay`,role:`brain`,name:12,secondary:12,colors:null,text:!0,note:`a lit strip per switch: both lines, the colour, the text colour.`},mc3:{id:`mc3`,label:`Morningstar MC3`,role:`controller`,name:8,secondary:0,colors:[`red`,`orange`,`yellow`,`green`,`cyan`,`blue`,`purple`,`white`],text:!1,note:`one line on the shared screen, colour on the led. the second line has nowhere to go.`},chocolate:{id:`chocolate`,label:`M-Vave Chocolate`,role:`controller`,name:0,secondary:0,colors:[],text:!1,note:`no screen, no leds. this one only ever reaches the printed label sheet.`}},W=class e{static createBanks(e){let t=R[e]||R.chocolate,n=[];for(let e=0;e<t.banks;e++){let e={};t.keys.forEach(t=>{e[t]={press:[],hold:[],double:[]}}),n.push(e)}return n}static cloneBanks(e){return e.map(e=>{let t={};for(let n of Object.keys(e))t[n]={press:e[n].press.slice(),hold:e[n].hold.slice(),double:e[n].double.slice()};return t})}static getActiveStack(e,t,n,r){return!e[t]||!e[t][n]||!e[t][n][r]?[]:e[t][n][r]}static addOrToggleStep(t,n,r,i,a,o,s,c=8,l){let u=e.cloneBanks(t),d=u[n][r][i],f=d.findIndex(e=>e.device===a&&e.control===o&&e.value===s);return f>=0?(d.splice(f,1),u):(d.length>=c||d.push({device:a,control:o,value:s,...l?{label:l}:{}}),u)}static addMacroTemplateSteps(t,n,r,i,a,o,s=8){let c=e.cloneBanks(t),l=c[n][r][i];for(let e of o){if(l.length>=s)break;l.push({device:a,control:e.controlId,value:e.value,label:e.label})}return c}static removeStep(t,n,r,i,a){let o=e.cloneBanks(t),s=o[n][r][i];return a>=0&&a<s.length&&s.splice(a,1),o}static moveStep(t,n,r,i,a,o){let s=e.cloneBanks(t),c=s[n][r][i],l=a+o;if(l>=0&&l<c.length&&a>=0&&a<c.length){let e=c[a];c[a]=c[l],c[l]=e}return s}static countTotalAssignedSteps(e){let t=0;for(let n of e)for(let e of Object.keys(n))t+=n[e].press.length+n[e].hold.length+n[e].double.length;return t}static usedDeviceIds(e){let t={};return e.forEach(e=>{Object.keys(e).forEach(n=>{z.forEach(({id:r})=>{e[n][r].forEach(e=>{t[e.device]=!0})})})}),Object.keys(t)}static usedControlIds(e,t){let n={};return e.forEach(e=>{Object.keys(e).forEach(r=>{z.forEach(({id:i})=>{e[r][i].forEach(e=>{e.device===t&&(n[e.control]=!0)})})})}),Object.keys(n)}},Ze=5e3,Qe=class extends Error{constructor(e,t){super(e),this.name=`DeviceApiError`,this.packet=t}},$e=class{constructor(){this.buf=``}push(e){this.buf+=e;let t=[],n=this.buf.indexOf(`~`);for(;n!==-1;)t.push(this.buf.slice(0,n)),this.buf=this.buf.slice(n+1),n=this.buf.indexOf(`~`);return t}get pending(){return this.buf}reset(){this.buf=``}};function et(e){return e+`~`}function tt(e){return e.trim()===`ok`}function nt(e,t){let n=e.trim();try{return JSON.parse(n)}catch{throw new Qe(`${t}: expected JSON but device sent ${n.slice(0,80)||`(empty packet)`}`,n)}}var rt=class{constructor(e,t=Ze){this.buffer=new $e,this.queue=[],this.chain=Promise.resolve(),this.transport=e,this.timeoutMs=t}exchange(e){let t=this.chain.then(e,e);return this.chain=t.catch(()=>void 0),t}async send(e){return await this.transport.write(et(e)),this.nextPacket(e)}async nextPacket(e){let t=this.queue.shift();if(t!==void 0)return t;let n=Date.now()+this.timeoutMs;for(;Date.now()<n;){let t=await this.readWithTimeout(n-Date.now());if(t===null)throw new Qe(`${e}: serial stream closed before the device replied`);let r=this.buffer.push(t);if(r.length>0)return this.queue.push(...r.slice(1)),r[0]}throw new Qe(`${e}: no response within ${this.timeoutMs}ms`+(this.buffer.pending?` (partial data: ${this.buffer.pending.slice(0,60)})`:``))}readWithTimeout(e){return e<=0?Promise.resolve(null):new Promise((t,n)=>{let r=!1,i=setTimeout(()=>{r||(r=!0,t(null))},e);this.transport.read().then(e=>{r||(r=!0,clearTimeout(i),t(e))},e=>{r||(r=!0,clearTimeout(i),n(e))})})}async expectAck(e,t){let n=await this.send(e);if(!tt(n))throw new Qe(`${t}: expected "ok~" but device sent "${n}"`,n)}check(){return this.exchange(async()=>nt(await this.send(`CHCK`),`CHCK`))}requestGlobalSettings(){return this.exchange(async()=>(await this.expectAck(`DREQ`,`DREQ`),nt(await this.send(`globalSettings`),`DREQ globalSettings`)))}requestBankSettings(e){return this.exchange(async()=>(await this.expectAck(`DREQ`,`DREQ`),nt(await this.send(`bankSettings,${e}`),`DREQ bankSettings,${e}`)))}transferGlobalSettings(e){return this.exchange(async()=>{await this.expectAck(`DTXR`,`DTXR`),await this.expectAck(`globalSettings`,`DTXR globalSettings`),await this.expectAck(JSON.stringify(e),`DTXR globalSettings payload`)})}transferBankSettings(e,t){return this.exchange(async()=>{await this.expectAck(`DTXR`,`DTXR`),await this.expectAck(`bankSettings,${e}`,`DTXR bankSettings,${e}`),await this.expectAck(JSON.stringify(t),`DTXR bankSettings,${e} payload`)})}control(...e){return this.exchange(async()=>{await this.expectAck(`CTRL`,`CTRL`),await this.expectAck(JSON.stringify({command:e}),`CTRL payload`)})}async savePresets(){await this.control(`savePresets`)}async goToBank(e){await this.control({goToBank:e})}async restart(){await this.control(`restart`)}async readFullConfig(e={}){let t=e.bankCount??128,n=await this.check(),r=await this.requestGlobalSettings(),i=[];for(let n=0;n<t;n++)i.push(await this.requestBankSettings(n)),e.onProgress?.(n+1,t);return{deviceSettings:n,globalSettings:r,presetSettings:i}}async writeFullConfig(e,t={}){let n=e.presetSettings??[],r=Math.min(t.bankCount??n.length,n.length);await this.transferGlobalSettings(e.globalSettings);for(let e=0;e<r;e++)await this.transferBankSettings(e,n[e]),t.onProgress?.(e+1,r);t.save!==!1&&await this.savePresets()}async close(){await this.transport.close?.()}},it=class{constructor(e){this.reader=null,this.decoder=new TextDecoder,this.port=e}async write(e){let t=this.port.writable.getWriter();try{await t.write(new TextEncoder().encode(e))}finally{t.releaseLock()}}async read(){this.reader||=this.port.readable.getReader();let{value:e,done:t}=await this.reader.read();return t?null:this.decoder.decode(e,{stream:!0})}async close(){if(this.reader){try{this.reader.releaseLock()}catch{}this.reader=null}}},at=115200;function G(e){return`0x`+e.toString(16).toUpperCase().padStart(2,`0`)}var K=new class{constructor(){this.midiAccess=null,this.listeners=new Set,this.isSupported=typeof navigator<`u`&&`requestMIDIAccess`in navigator}async init(){if(!this.isSupported)return!1;try{return this.midiAccess=await navigator.requestMIDIAccess({sysex:!0}),this.midiAccess.onstatechange=()=>{this.notifyListeners()},!0}catch(e){return console.warn(`Web MIDI Access denied or unavailable:`,e),!1}}onStateChange(e){return this.listeners.add(e),()=>this.listeners.delete(e)}notifyListeners(){this.listeners.forEach(e=>e())}getHardwareNodes(e){let t=[],n=this.getDetectedMidiPorts(),r=R[e.controllerId],i=e.brainId===`scribble`?`Pirate MIDI Scribble`:r?r.name:`Controller`,a=n.find(t=>t.name.toLowerCase().includes(e.brainId)||t.name.toLowerCase().includes(e.controllerId));return t.push({id:e.brainId===`scribble`?`scribble`:e.controllerId,name:i,kind:`USB-C MIDI`,port:a?a.portName:`USB MIDI Port 1`,canRead:!0,canListen:!1}),e.rig.forEach(r=>{let i=L[r];if(!i)return;let a=n.find(e=>e.name.toLowerCase().includes(r));t.push({id:r,name:i.name,kind:`TRS MIDI`,port:a?a.portName:`MIDI Out Ch ${e.channels[r]||1}`,canRead:!1,canListen:!0})}),t}getDetectedMidiPorts(){if(!this.midiAccess)return[];let e=[];return this.midiAccess.inputs.forEach(t=>{e.push({id:t.id,name:t.name||`Unknown Device`,portName:t.name||t.id})}),e}async openDeviceApi(e){if(typeof navigator>`u`||!(`serial`in navigator))return console.warn(`Web Serial is unavailable — the Device API needs Chrome or Edge on desktop.`),null;let t=navigator.serial,n=null,r=await t.getPorts();if(r.length>0?n=r[0]:e&&(n=await t.requestPort()),!n)return null;if(!n.readable||!n.writable)try{await n.open({baudRate:at})}catch(e){if(e?.name!==`InvalidStateError`&&!String(e?.message||``).includes(`already open`))throw e}return new rt(new it(n))}async requestLiveSerialConfig(e={}){let t=null;try{return t=await this.openDeviceApi(!0),t?await t.readFullConfig(e):null}catch(e){return console.warn(`Scribble read failed:`,e),null}finally{await t?.close()}}async readLiveDeviceConfig(e,t={}){if(e!==`scribble`)return null;let n=null;try{return n=await this.openDeviceApi(!1),n?await n.readFullConfig(t):null}catch(e){return console.warn(`Scribble read failed:`,e),null}finally{await n?.close()}}async writeLiveDeviceConfig(e,t={}){let n=null;try{return n=await this.openDeviceApi(!0),n?(await n.writeFullConfig(e,t),!0):!1}catch(e){return console.warn(`Scribble write failed:`,e),!1}finally{await n?.close()}}sendControlChange(e,t,n){if(!this.midiAccess)return;let r=176|e-1&15;this.midiAccess.outputs.forEach(e=>{try{e.send([r,t&127,n&127])}catch{}})}sendProgramChange(e,t){if(!this.midiAccess)return;let n=192|e-1&15;this.midiAccess.outputs.forEach(e=>{try{e.send([n,t&127])}catch{}})}};function ot(e){let t=e.replace(`#`,``);return parseInt(t,16)||0}var st=176;function q(e,t){let n=B.getDevice(e.device),r=B.getControl(e.device,e.control),i=t&&t[e.device]?t[e.device]:n?.midiChannel||1,a=e.value??127,o=e.label||``;if(!o&&e.value!==null&&e.value!==void 0&&r){let t=B.valueOptionsFor(r).find(t=>t.value===e.value);t&&(o=t.label.toUpperCase())}!o&&r&&(o=r.short.toUpperCase());let s=r?.label||e.control;if(e.label)s+=` · `+e.label;else if(e.value!==null&&e.value!==void 0&&r){let t=B.valueOptionsFor(r).find(t=>t.value===e.value);t&&(s+=` · `+t.label)}let c=r?.cc||0,l=st+(i-1);return{label:s,stepLabel:o,deviceId:n?.id||e.device,deviceName:n?.name||e.device,accent:n?.accent||`#ffffff`,channel:i,cc:c,value:a,message:{statusByte:l,dataByte1:c,dataByte2:a}}}function ct(e,t){if(!t)return null;let n=U[e];if(!n)return null;if(n.colors===null)return t;if(!n.colors.length)return null;if(n.colors.includes(t))return t;let r=qe[t];return r&&n.colors.includes(r)?r:n.colors[0]}function lt(e){let t={press:`Press`,hold:`Long Press`,double:`Double Tap`},n=[];return e.banks.slice(0,3).forEach((r,i)=>{Object.keys(r).forEach(a=>{let o={};if(z.forEach(n=>{let i=r[a][n.id];i.length&&(o[t[n.id]]=i.slice(0,6).map(t=>{let n=q(t,e.channels);return{type:`Control Change`,channel:n.channel,cc:n.cc,value:n.value,label:n.stepLabel||n.label}}))}),Object.keys(o).length){let t=`${i}:${a}`,r=e.naming&&e.naming[t]||{},s=r.name?r.name.slice(0,8):a,c=ct(`mc3`,r.color||null);n.push({bank:i+1,preset:a,name:s,ledColour:c,actions:o})}})}),{device:`Morningstar MC3`,schema:`stomp-stacks/mc3@1`,presets:n}}var ut=class{constructor(){this.id=`mc3`,this.name=`Morningstar MC3`}compileExport(e){let t=lt(e);return{filename:`mc3-preset-${e.controllerId}.json`,mimeType:`application/json`,content:JSON.stringify(t,null,2)}}compilePreview(e){let t=lt(e);return JSON.stringify(t,null,2).split(`
`).map(e=>({text:e||` `}))}};function dt(e,t){e.banks.forEach((e,n)=>{Object.keys(e).forEach((r,i)=>{z.forEach(a=>{let o=e[r][a.id];o.length&&t(n,r,i,a,o)})})})}var ft={usb:!0,ble:!0,midi1:!0};function pt(e){let t=[],n=[`A`,`B`,`C`,`D`];for(let r=0;r<128;r++){let i=Math.floor(r/n.length),a=n[r%n.length],o=`${i}:${a}`,s=e.naming?.[o],c=`Preset ${r+1}`,l=`Second. ${r+1}`,u=0,d=[];if(i<e.banks.length){let t=e.banks[i],n=new Set,r=[];if(z.forEach(({id:i})=>{(t[a]?.[i]||[]).forEach(t=>{let i=q(t,e.channels);n.add(i.deviceName.toUpperCase()),r.length<3&&r.push(i.stepLabel?`${i.deviceName.toUpperCase()} ${i.stepLabel}`:`${i.deviceName} ${i.label}`),u||=B.getDeviceAccentColorInt(t.device),d.push({statusByte:i.message.statusByte,dataByte1:i.message.dataByte1,dataByte2:i.message.dataByte2,outputs:{...ft}})})}),s?.name)c=s.name;else if(d.length>0){let e=Array.from(n);c=e.length?e.join(` + `):`BANK ${i+1}`}s?.secondary?l=s.secondary:d.length>0&&(l=r.join(` · `)||`Bank ${i+1}`),s?.color&&H[s.color]&&(u=ot(H[s.color]))}let f=d.slice(0,8);t.push({bankId:r,bankName:c.slice(0,17),secondaryText:l.slice(0,17),colourOverride:d.length>0||!!s?.color,colour:d.length>0||s?.color?u||582655:0,textColourOverride:d.length>0||!!s?.color,textColour:d.length>0||s?.color?16777215:0,midiValueDisplayOverride:!1,midiValueDisplay:d.length>0?`valueOnly`:`none`,midiValueDisplayCC:0,bpm:120,switches:[{pressMessages:{numMessages:0,messages:[]},holdMessages:{numMessages:0,messages:[]}},{pressMessages:{numMessages:0,messages:[]},holdMessages:{numMessages:0,messages:[]}}],customMessages:{numMessages:0,messages:[]},presetMessages:{numMessages:f.length,messages:f}})}return{deviceSettings:{deviceModel:`Scribble`,firmwareVersion:`1.0.1`,hardwareVersion:`1.x.0`,deviceName:`Scribble`,uId:0x9070692f06d8,profileId:0},globalSettings:{deviceName:`Scribble`,currentBank:0,lightMode:`dark`,mainColour:15199215,textColour:0,displayBrightness:100,midiChannel:0,globalBpm:120,midiOutPortMode:`midiOutA`,bankPcMidiOutputs:{usbd:1,ble:1,midi1:1},clockMode:`external`,clockDisplayType:`bpm`,tapTempoQuant:`none`,usbdThruHandles:{usbd:!0,ble:!0,midi1:!0},bleThruHandles:{usbd:!1,ble:!1,midi1:!1},midi1ThruHandles:{usbd:!0,ble:!0,midi1:!0},midiClockOutHandles:{usbd:!0,ble:!0,midi1:!0},switches:[{mode:`pressPresetDown`,pressMessages:{numMessages:0,messages:[]},holdMessages:{numMessages:0,messages:[]}},{mode:`pressPresetUp`,pressMessages:{numMessages:0,messages:[]},holdMessages:{numMessages:0,messages:[]}}],customMessages:{numMessages:0,messages:[]},presetUpCC:1,presetDownCC:2,goToPresetCC:3,globalCustomMessagesCC:17,presetCustomMessagesCC:16,midiValueDisplay:`valueOnly`,midiValueDisplayCC:7,wirelessType:`ble`,bleMode:`server`,mainTextResize:!1,zeroIndexBanks:!1,kemperPlayerMode:!1,useStaticIp:!1,staticIp:`0.0.0.0`,gatewayIp:`0.0.0.0`},presetSettings:t}}function mt(e,t,n,r,i){let a=e?.switches?.[t]||{},o=e?.bankName||e?.presetName||e?.name||e?.label||e?.strip?.name||``,s=e?.secondaryText||e?.secondary||e?.description||e?.strip?.secondary||a?.name||a?.label||a?.secondaryText||a?.secondary||``;return o=typeof o==`string`?o.trim():``,s=typeof s==`string`?s.trim():``,o||(n.length>0?(o=Array.from(new Set(n.map(e=>{let t=B.getDevice(e.device);return t?t.name.toUpperCase():e.device.toUpperCase()}))).join(` + `),s||=n.map(e=>{let t=B.getDevice(e.device)?.controls.find(t=>t.id===e.control);return t?t.short||t.label:e.control}).join(` · `)):o=`Preset ${r*4+t+1}`),{presetName:o,secondaryText:s}}function ht(e,t,n=[`A`,`B`,`C`,`D`]){let r=[],i={};Object.keys(t).forEach(e=>{i[t[e]]=e});let a=Object.keys(t)[0]||`blooper`;function o(e){let t=[];return Array.isArray(e)&&e.forEach(e=>{let n=0,r=0,o=127;if(Array.isArray(e))n=e[0]||0,r=e[1]||0,o=e[2]??127;else if(e&&typeof e==`object`){if(typeof e.smartType==`string`)return;n=e.statusByte||0,r=e.dataByte1||0,o=e.dataByte2??127}let s=(n&15)+1,c=i[s]||a,l=B.getDevice(c);if(!l)return;let u=l.controls.find(e=>e.cc===r)||l.controls[0];u&&t.push({device:c,control:u.id,value:o===127&&u.type===`foot`?null:o})}),t}if(Array.isArray(e?.macros)&&e.macros.length>0)return e.macros.forEach((e,t)=>{let i=typeof e.trigger?.bank==`number`?Math.max(0,e.trigger.bank-1):Math.floor(t/n.length),a=n[t%n.length];if(e.trigger){if(typeof e.trigger.switchKey==`string`&&n.includes(e.trigger.switchKey))a=e.trigger.switchKey;else if(typeof e.trigger.cc==`number`){let t=e.trigger.cc-80;t>=0&&t<n.length&&(a=n[t])}else typeof e.trigger.action==`string`&&n.includes(e.trigger.action)&&(a=e.trigger.action)}let s=Math.max(0,n.indexOf(a)),c=typeof e.trigger?.slot==`number`?e.trigger.slot:e.trigger?.cc?i*n.length+s+1:t+1,l=o(e.messages||[]),u=mt(e,s,l,i),d=Ye(e.strip?.mainColour??e.strip?.color??e.colour??e.color??e.mainColour);r.push({bankIndex:i,key:a,presetName:u.presetName,secondaryText:u.secondaryText,steps:l,slotNumber:c,color:d})}),r;let s=Array.isArray(e?.bankSettings)?e.bankSettings:Array.isArray(e?.presetSettings)?e.presetSettings:[];if(s.length>0&&(s.forEach((e,t)=>{let i=typeof e.bankId==`number`?e.bankId:typeof e.presetId==`number`?e.presetId:t;i===0&&t>0&&(i=t);let a=i+1,s=Math.floor((a-1)/n.length),c=(a-1)%n.length,l=n[c]||`A`,u=e.presetMessages?.messages||[],d=e.customMessages?.messages||[],f=e.switches?.[c]?.pressMessages?.messages||[],p=e.messages||[],m=o([...Array.isArray(u)?u:[],...Array.isArray(d)?d:[],...Array.isArray(f)?f:[],...Array.isArray(p)?p:[]]),h=mt(e,c,m,s),g=h.presetName&&!h.presetName.match(/^Preset \d+$/i),ee=h.secondaryText&&!h.secondaryText.match(/^Second\. \d+$/i),te=Ye(e.colour??e.color??e.mainColour??e.strip?.mainColour);(g||ee||m.length>0||te)&&r.push({bankIndex:s,key:l,presetName:h.presetName,secondaryText:h.secondaryText,steps:m,slotNumber:a,color:te})}),r.length>0))return r;let c=[{name:`CLOUD`,secondary:`Ambient Delay`,color:`red`},{name:`GLITCH POP`,secondary:`Microloop Granular`,color:`orange`},{name:`LOFI DRIFT`,secondary:`Tape Pitch Wobble`,color:`yellow`},{name:`TAPE TRIP`,secondary:`Echo Reverse`,color:`green`},{name:`BLOOPER`,secondary:`Loop Speed + Pitch`,color:`mint`},{name:`MOOD`,secondary:`Reverb + Slip`,color:`cyan`},{name:`EL CAPISTAN`,secondary:`Tape Echo`,color:`blue`},{name:`CHROMA`,secondary:`Chorus Flange`,color:`purple`}];for(let e=0;e<4;e++)n.forEach((t,i)=>{let o=e*n.length+i,s=o+1,l=a,u=B.getDevice(l),d=u?.controls[i%(u?.controls.length||1)]||u?.controls[0],f=u&&d?[{device:l,control:d.id,value:64}]:[],p=c[o%c.length];r.push({bankIndex:e,key:t,presetName:p.name,secondaryText:p.secondary,steps:f,slotNumber:s,color:p.color})});return r}var gt=class{constructor(){this.id=`scribble`,this.name=`Pirate MIDI Scribble`}compileExport(e){let t=pt(e);return{filename:`scribble.customization`,mimeType:`application/json`,content:JSON.stringify(t,null,2)}}compilePreview(e){let t=pt(e);return JSON.stringify(t,null,2).split(`
`).map(e=>({text:e||` `}))}},J=8;function _t(e,t){return e?e.length<=t?e:e.slice(0,t):``}function vt(e){let t=B.getController(e);return{controllerId:e,brainId:`scribble`,banks:W.createBanks(e),bank:0,selectedKey:t.keys[0],action:`press`,browseDevice:Be[0],face:`photo`,popoverControlId:null,compileOpen:!1,settingsOpen:!1,controllerPickerOpen:!1,brainPickerOpen:!1,addPedalOpen:!1,confirmRemovePedal:null,channelPickerOpen:!1,colorPickerOpen:!1,targetId:`scribble`,rig:[`blooper`,`mood`,`elcap`],channels:{blooper:1,mood:2,elcap:3},naming:{},sheetOpen:!1,connectOpen:!1,readOpen:!1,readData:null,conn:{},listening:null,heard:null,offsets:{},monitorOn:!1,log:[],seq:0}}var yt=class extends EventTarget{constructor(...e){super(...e),this.state=vt(`chocolate`)}set(e){this.state={...this.state,...e},this.dispatchEvent(new Event(`change`))}get activeStack(){let{banks:e,bank:t,selectedKey:n,action:r}=this.state;return W.getActiveStack(e,t,n,r)}get totalAssigned(){return W.countTotalAssignedSteps(this.state.banks)}nextFreeChannel(e=this.state.rig,t=this.state.channels){return B.findNextFreeChannel(e,t)}addPedal(e){if(this.state.rig.includes(e)){this.set({addPedalOpen:!1,browseDevice:e});return}let t=[...this.state.rig,e],n={...this.state.channels};n[e]||(n[e]=B.findNextFreeChannel(t.filter(t=>t!==e),n)),this.set({rig:t,channels:n,browseDevice:e,addPedalOpen:!1,popoverControlId:null})}dropPedal(e){if(this.state.rig.length<=1)return;let t=this.state.rig.filter(t=>t!==e),n=this.state.browseDevice===e?t[0]:this.state.browseDevice;this.set({rig:t,browseDevice:n,channelPickerOpen:!1,popoverControlId:null,confirmRemovePedal:null})}setPedalChannel(e,t){let n={...this.state.channels,[e]:t};this.set({channels:n,channelPickerOpen:!1})}sendTestCC(e){K.sendControlChange(e,93,127),this.pushLog({text:`sent test cc 93 on ch ${e}`,sub:`sweeper diagnostic`,tone:`out`})}sendGuidedPC(e,t){K.sendProgramChange(t,0);let n={...this.state.channels,[e]:t};this.set({channels:n}),this.pushLog({text:`sent program change 0 on ch ${t}`,sub:`guided set completed for ${e}`,tone:`out`})}toggleChannelPicker(){this.set({channelPickerOpen:!this.state.channelPickerOpen})}setBrain(e){this.set({brainId:e,brainPickerOpen:!1})}openBrainPicker(){this.set({brainPickerOpen:!0,channelPickerOpen:!1})}closeBrainPicker(){this.set({brainPickerOpen:!1})}openAddPedal(){this.set({addPedalOpen:!0,channelPickerOpen:!1})}closeAddPedal(){this.set({addPedalOpen:!1})}setConfirmRemove(e){this.set({confirmRemovePedal:e,channelPickerOpen:!1})}setTarget(e){this.set({targetId:e})}clickControl(e){let t=B.getDevice(this.state.browseDevice)?.macroTemplates?.some(t=>t.controlId===e.id);if(e.values&&e.values.length>0||e.type===`knob`||e.type===`toggle`||t){this.set({popoverControlId:this.state.popoverControlId===e.id?null:e.id,sheetOpen:!0});return}this.addStep(e.id,null)}addStep(e,t,n){let{banks:r,bank:i,selectedKey:a,action:o,browseDevice:s}=this.state,c=W.addOrToggleStep(r,i,a,o,s,e,t,J,n);this.set({banks:c,popoverControlId:null,sheetOpen:!0})}applyMacroTemplate(e){let{banks:t,bank:n,selectedKey:r,action:i,browseDevice:a}=this.state,o=B.getDevice(a)?.macroTemplates?.find(t=>t.id===e);if(!o)return;let s=W.addMacroTemplateSteps(t,n,r,i,a,o.steps,J);this.set({banks:s,popoverControlId:null,sheetOpen:!0})}removeStep(e){let{banks:t,bank:n,selectedKey:r,action:i}=this.state,a=W.removeStep(t,n,r,i,e);this.set({banks:a})}moveStep(e,t){let{banks:n,bank:r,selectedKey:i,action:a}=this.state,o=W.moveStep(n,r,i,a,e,t);this.set({banks:o})}selectSwitch(e){this.set({selectedKey:e,popoverControlId:null})}selectBank(e){this.set({bank:e,popoverControlId:null})}selectAction(e){this.set({action:e,popoverControlId:null})}setBrowseDevice(e){this.set({browseDevice:e,popoverControlId:null,channelPickerOpen:!1})}closePopover(){this.set({popoverControlId:null})}setFace(e){this.set({face:e,popoverControlId:null})}openSettings(){this.set({settingsOpen:!0})}closeSettings(){this.set({settingsOpen:!1})}openControllerPicker(){this.set({controllerPickerOpen:!0})}closeControllerPicker(){this.set({controllerPickerOpen:!1})}openCompile(){this.set({compileOpen:!0})}closeCompile(){this.set({compileOpen:!1})}toggleSheet(){this.set({sheetOpen:!this.state.sheetOpen})}setSheet(e){this.set({sheetOpen:e})}toggleColorPicker(){this.set({colorPickerOpen:!this.state.colorPickerOpen})}closeColorPicker(){this.set({colorPickerOpen:!1})}namingTargets(){let e=[this.state.controllerId];return this.state.brainId===`scribble`&&e.push(`scribble`),e.filter(e=>U[e]).map(e=>({...U[e]}))}displayTargets(){return this.namingTargets().filter(e=>e.name>0)}sharedColors(){let e=this.namingTargets().filter(e=>e.colors===null||e.colors.length>0);return e.length?V.map(e=>e[0]).filter(t=>e.every(e=>e.colors===null||e.colors&&e.colors.includes(t))):[]}autoName(e=this.state.bank,t=this.state.selectedKey){let n=this.state.banks[e]?.[t];if(!n)return``;let r=null,i=0;if(z.forEach(e=>n[e.id].forEach(e=>{i++,r||=e})),!r)return``;let a=r,o=B.getDevice(a.device);if(!o)return``;let s=B.getControl(a.device,a.control),c=this.displayTargets().reduce((e,t)=>Math.min(e,t.name),24);return _t(i>1?`${o.name} +${i-1}`:`${o.name} ${s?s.short:``}`,c)}autoSecondary(e=this.state.bank,t=this.state.selectedKey){let n=this.state.banks[e]?.[t];if(!n)return``;let r=[];return z.forEach(e=>{n[e.id].length&&r.push(`${n[e.id].length} on ${e.label}`)}),r.join(` · `)}ident(e=this.state.bank,t=this.state.selectedKey){let n=`${e}:${t}`,r=this.state.naming[n]||{},i=this.autoName(e,t),a=this.autoSecondary(e,t),o=r.color||null,s=o?H[o]:`#16323d`;return{name:r.name!=null&&r.name!==``?r.name:i,secondary:r.secondary||``,color:o,textColor:r.textColor||(Xe(s)?`cream`:`ink`),autoText:!r.textColor,raw:r,auto:i,autoSec:a}}setIdent(e,t=this.state.bank,n=this.state.selectedKey){let r=`${t}:${n}`,i={...this.state.naming,[r]:{...this.state.naming[r],...e}};this.set({naming:i})}colorFor(e,t){if(!t)return null;let n=U[e];if(!n)return null;if(n.colors===null)return t;if(!n.colors.length)return null;if(n.colors.includes(t))return t;let r=qe[t];return r&&n.colors.includes(r)?r:n.colors[0]}switchController(e){let t=B.getController(e);this.set({controllerId:e,banks:W.createBanks(e),bank:0,selectedKey:t.keys[0],controllerPickerOpen:!1,popoverControlId:null,colorPickerOpen:!1})}openConnect(){this.set({connectOpen:!0})}closeConnect(){this.set({connectOpen:!1})}pushLog(e){let t=this.state.seq+1,n={n:t,...e},r=[...this.state.log,n].slice(-60);this.set({seq:t,log:r})}toggleConn(e){let t=!!this.state.conn[e],n={...this.state.conn,[e]:!t},r=t&&this.state.listening===e?null:this.state.listening;this.set({conn:n,listening:r});let i=K.getHardwareNodes(this.state).find(t=>t.id===e);this.pushLog({text:(t?`closed `:`opened `)+(i?i.port:e),sub:i?i.name:e,tone:t?`warn`:`ok`})}stompTest(){let e=this.state,t=e.banks[e.bank]?.[e.selectedKey]?.[e.action]||[],n=z.find(t=>t.id===e.action),r=n?n.label:e.action;if(!t.length){this.pushLog({text:`switch ${e.selectedKey} · ${r}`,sub:`nothing stacked here`,tone:`warn`});return}this.pushLog({text:`▸ switch ${e.selectedKey} · ${r}`,sub:`${t.length} ${t.length===1?`message`:`messages`} out`,tone:`trig`}),t.forEach((t,n)=>{setTimeout(()=>{let n=L[t.device];if(!n)return;let r=n.controls.find(e=>e.id===t.control),i=e.channels[t.device]||1,a=(r?r.cc:10)+(e.offsets[t.device]||0),o=t.value===null?127:t.value,s=!!e.conn[t.device];s&&K.sendControlChange(i,a,o),this.pushLog({text:`${G(176+i-1)} ${G(a)} ${G(o)}`,sub:s?`${n.name} · ${r?r.label:t.control}`:`${n.name} never answered — is it plugged in?`,tone:s?`out`:`warn`})},110*n)})}simScribblePresets(){let e=this.state,t=e.rig;if(!t.length)return[];let n=[1,2,3,5,8,13,17,21,34,55,64,89,127],r=V.map(e=>e[0]);return n.map((n,i)=>{let a=t[i%t.length],o=L[a],s=o?o.controls.filter(e=>e.type===`foot`):[],c=s[i%Math.max(s.length,1)]||(o?o.controls[0]:null),l=c?[{device:a,control:c.id,value:null}]:[];if(i%3!=2&&t.length>1){let e=t[(i+1)%t.length],n=L[e],r=n?n.controls.filter(e=>e.type===`knob`):[],a=r[i%Math.max(r.length,1)]||(n?n.controls[0]:null);a&&l.push({device:e,control:a.id,value:16*(i%7+1)})}if(i%4==1&&t.length>2){let e=t[(i+2)%t.length],n=L[e];if(n&&n.controls.length){let t=n.controls[(i+1)%n.controls.length];l.push({device:e,control:t.id,value:127})}}return{n,label:`${o?o.name.split(` `)[0].toUpperCase():`PEDAL`} ${c?(c.short||c.label||``).split(` `)[0]:``}`.slice(0,12).trim(),second:`${o?o.name.toLowerCase():a} · ch ${e.channels[a]||1}`,color:r[i%r.length],steps:l}})}async readFrom(e,t){let n=this.state,r=R[n.controllerId],i=r?r.keys:[`A`,`B`,`C`,`D`],a=!t;if(this.set({readOpen:!0,readData:{from:e,presets:[],dest:{},filter:``,allPresets:[],readingHardware:a,scanned:0,total:128,found:0},connectOpen:!1}),a){this.pushLog({text:`querying ${e}...`,sub:`sending Web Serial / MIDI query to device`,tone:`trig`});for(let e=1;e<=16;e++)setTimeout(()=>{if(!this.state.readData||!this.state.readData.readingHardware)return;let t=Math.round(8*e);this.set({readData:{...this.state.readData,scanned:t,found:Math.min(t,13)}})},95*e)}let o=t;o||=await K.readLiveDeviceConfig(e)??void 0;let s=o?ht(o,n.channels,i):[],c=V.map(e=>e[0]),l=s.length?s.map((e,t)=>{let r=e.slotNumber??e.bankIndex*i.length+(i.indexOf(e.key)>=0?i.indexOf(e.key)+1:t+1);return{n:r,label:e.presetName,second:e.secondaryText||`${L[e.steps[0]?.device]?.name||`pedal`} · ch ${n.channels[e.steps[0]?.device]||1}`,color:e.color||c[(r-1)%c.length],steps:e.steps}}):this.simScribblePresets(),u=s.map((e,t)=>({id:`${e.bankIndex}:${e.key}:${t}`,bankIndex:e.bankIndex,key:e.key,presetName:e.presetName,secondaryText:e.secondaryText,steps:e.steps,selected:!0})),d=K.getHardwareNodes(n).find(t=>t.id===e);this.pushLog({text:`read ${d?d.name:e}`,sub:o?`${l.length} device presets loaded live from physical Scribble`:`live hardware query finished — select scribble.json file if USB CDC requires manual grant`,tone:o?`ok`:`warn`}),this.set({readData:{from:e,presets:l,dest:{},filter:``,allPresets:u,readingHardware:!1,scanned:128,total:128,found:l.length}})}async readLiveUsbSerial(){this.set({readOpen:!0,readData:{from:`scribble`,presets:[],dest:{},filter:``,allPresets:[],readingHardware:!0,scanned:0,total:128,found:0}});for(let e=1;e<=16;e++)setTimeout(()=>{if(!this.state.readData||!this.state.readData.readingHardware)return;let t=Math.round(8*e);this.set({readData:{...this.state.readData,scanned:t,found:Math.min(t,13)}})},95*e);let e=await K.requestLiveSerialConfig(),t=this.state,n=R[t.controllerId],r=n?n.keys:[`A`,`B`,`C`,`D`],i=e?ht(e,t.channels,r):[],a=V.map(e=>e[0]),o=i.length?i.map((e,n)=>{let i=e.slotNumber??e.bankIndex*r.length+(r.indexOf(e.key)>=0?r.indexOf(e.key)+1:n+1);return{n:i,label:e.presetName,second:e.secondaryText||`${L[e.steps[0]?.device]?.name||`pedal`} · ch ${t.channels[e.steps[0]?.device]||1}`,color:e.color||a[(i-1)%a.length],steps:e.steps}}):this.simScribblePresets(),s=i.map((e,t)=>({id:`${e.bankIndex}:${e.key}:${t}`,bankIndex:e.bankIndex,key:e.key,presetName:e.presetName,secondaryText:e.secondaryText,steps:e.steps,selected:!0}));this.pushLog({text:`read USB device`,sub:e?`${o.length} presets loaded live from physical Scribble`:`no USB serial data received — select scribble.json file`,tone:e?`ok`:`warn`}),this.set({readData:{from:`scribble`,presets:o,dest:{},filter:``,allPresets:s,readingHardware:!1,scanned:128,total:128,found:o.length}})}async connectAndImportScribble(){this.pushLog({text:`connecting to Scribble...`,sub:`requesting USB device permission`,tone:`trig`});let e=await K.requestLiveSerialConfig(),t=this.state,n=R[t.controllerId],r=n?n.keys:[`A`,`B`,`C`,`D`];if(e){let n=ht(e,t.channels,r).map((e,t)=>({id:`${e.bankIndex}:${e.key}:${t}`,bankIndex:e.bankIndex,key:e.key,presetName:e.presetName,secondaryText:e.secondaryText,steps:e.steps,selected:!0}));if(n.length>0){this.loadPresetsIntoBanks(n),this.pushLog({text:`Scribble connected & synced`,sub:`imported ${n.length} active hardware presets`,tone:`ok`}),this.set({connectOpen:!1});return}}this.readFrom(`scribble`,e||void 0)}loadScribbleFile(e){this.readFrom(`scribble`,e)}setReadFilter(e){this.state.readData&&this.set({readData:{...this.state.readData,filter:e}})}setReadDest(e,t){if(!this.state.readData)return;let n={...this.state.readData.dest};if(!t)delete n[e];else{let r=t.split(`:`);n[e]={key:r[0],action:r[1],mode:n[e]?.mode||`replace`}}this.set({readData:{...this.state.readData,dest:n}})}setReadDestMode(e,t){if(!this.state.readData||!this.state.readData.dest[e])return;let n={...this.state.readData.dest,[e]:{...this.state.readData.dest[e],mode:t}};this.set({readData:{...this.state.readData,dest:n}})}applyPresets(){let e=this.state.readData;if(!e||!e.presets)return;let t=e.presets.filter(t=>e.dest[t.n]).map(t=>({p:t,d:e.dest[t.n]})),n=this.state,r=n.bank,i=n.banks.map(e=>{let t={};return Object.keys(e).forEach(n=>{t[n]={press:[...e[n].press],hold:[...e[n].hold],double:[...e[n].double]}}),t}),a={...n.naming};t.forEach(({p:e,d:t})=>{let n=i[r]?.[t.key];if(n&&(t.mode===`add`?n[t.action]=[...n[t.action],...e.steps.map(e=>({...e}))].slice(0,J):n[t.action]=e.steps.map(e=>({...e})),t.mode===`replace`)){let n=`${r}:${t.key}`;a[n]={name:e.label,secondary:e.second,color:e.color}}}),this.pushLog({text:t.length?`pulled ${t.length} ${t.length===1?`preset`:`presets`} in`:`took nothing`,sub:t.length?t.map(e=>`p${String(e.p.n).padStart(3,`0`)} → ${e.d.key}`).join(`, `):`left the rig as it was`,tone:`ok`}),this.set({banks:i,naming:a,readOpen:!1,readData:null})}togglePresetSelection(e){if(!this.state.readData||!this.state.readData.allPresets)return;let t=this.state.readData.allPresets.map(t=>t.id===e?{...t,selected:!t.selected}:t);this.set({readData:{...this.state.readData,allPresets:t}})}selectAllReadPresets(e){if(!this.state.readData||!this.state.readData.allPresets)return;let t=this.state.readData.allPresets.map(t=>({...t,selected:e}));this.set({readData:{...this.state.readData,allPresets:t}})}importSinglePreset(e){let t=this.state,n=t.bank,r=t.selectedKey,i=t.banks.map((t,i)=>{if(i!==n)return t;let a={...t};return a[r]={...a[r],press:[...e.steps]},a}),a=`${n}:${r}`,o={...t.naming,[a]:{name:e.presetName,secondary:e.secondaryText}};this.pushLog({text:`imported preset "${e.presetName}"`,sub:`loaded into Bank ${n+1} - Switch ${r}`,tone:`ok`}),this.set({banks:i,naming:o})}loadPresetsIntoBanks(e){if(!e||!e.length)return;let t=this.state,n=R[t.controllerId],r=n?n.keys:[`A`,`B`,`C`,`D`],i=Math.max(...e.map(e=>e.bankIndex),0),a=Math.max(t.banks.length,i+1),o=[];for(let e=0;e<a;e++){let n={...t.banks[e]||W.createBanks(t.controllerId)[0]};Object.keys(n).forEach(e=>{n[e]={press:[...n[e].press],hold:[...n[e].hold],double:[...n[e].double]}}),o.push(n)}let s={...t.naming};e.forEach(e=>{if(e.bankIndex<o.length&&r.includes(e.key)){o[e.bankIndex][e.key]&&(o[e.bankIndex][e.key].press=[...e.steps]);let t=`${e.bankIndex}:${e.key}`;s[t]={name:e.presetName,secondary:e.secondaryText}}});let c={...t.conn,scribble:!0};this.set({banks:o,naming:s,conn:c,readOpen:!1,readData:null})}importSelectedDevicePresets(){let e=this.state.readData;if(!e||!e.allPresets||!e.allPresets.length)return;let t=e.allPresets.filter(e=>e.selected);t.length&&(this.loadPresetsIntoBanks(t),this.pushLog({text:`imported ${t.length} presets from Scribble`,sub:`loaded into Stomp Stacks banks & macro stacks`,tone:`ok`}))}pickReadRow(e,t){}applyRead(){this.importSelectedDevicePresets()}cancelRead(){this.set({readOpen:!1,readData:null})}listenTo(e){if(!this.state.conn[e])return;this.set({listening:e,heard:null});let t=L[e];if(!t)return;let n={blooper:4,mood:0,elcap:-2}[e]||0,r=t.controls[2]||t.controls[0],i=r?r.cc:10,a=this.state.offsets[e]||0;setTimeout(()=>{if(this.state.listening!==e)return;let o=i+a+n,s=i+a;this.set({heard:{pedal:e,control:r.id,cc:o,expect:s,drift:n}});let c=this.state.channels[e]||1;this.pushLog({text:`${G(176+c-1)} ${G(o)} 7F`,sub:`${t.name} sent this when you moved ${r.short||r.label}`,tone:`in`})},1100)}acceptDrift(){let e=this.state.heard;if(!e)return;let t=L[e.pedal],n={...this.state.offsets,[e.pedal]:(this.state.offsets[e.pedal]||0)+e.drift};this.set({offsets:n,heard:null,listening:null}),this.pushLog({text:`shifted ${t?t.name:e.pedal} by ${e.drift>0?`+`:``}${e.drift}`,sub:`its whole map moves with it`,tone:`ok`})}dismissHeard(){this.set({heard:null,listening:null})}toggleMonitor(){this.set({monitorOn:!this.state.monitorOn})}clearLog(){this.set({log:[]})}},Y=class{constructor(e,t){this.onChange=()=>this.host.requestUpdate(),this.host=e,this.store=t,e.addController(this)}hostConnected(){this.store.addEventListener(`change`,this.onChange)}hostDisconnected(){this.store.removeEventListener(`change`,this.onChange)}};function X(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var bt=class extends A{constructor(...e){super(...e),this.desktop=!1}static{this.styles=[N,P,o`
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
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Y(this,this.store)}render(){let e=this.store.state,t=R[e.controllerId],n=e.banks[e.bank],r=this.desktop?t.heightDesktop:t.height;return T`
      <button class="name-row" @click=${()=>this.store.openControllerPicker()}>
        <span class="name">${t.name}</span>
        <span class="change">change ⌄</span>
      </button>
      ${this.desktop?T`
            <div class="bank-row">
              <span class="bank-row-label">bank</span>
              ${e.banks.map((t,n)=>{let r=n===e.bank;return T`
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
        ${t.screen?T`<div class="screen">bank ${e.bank+1} · ${e.selectedKey}</div>`:null}
        ${t.keys.map((r,i)=>{let a=e.selectedKey===r,o=0,s=new Set;z.forEach(({id:e})=>{n[r][e].forEach(e=>{o++,s.add(e.device)})});let c=s.size===1?L[[...s][0]].accent:s.size>1?`var(--mustard)`:`rgba(247,241,227,.16)`;return T`
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
    `}};X([M({attribute:!1})],bt.prototype,`store`,void 0),X([M({type:Boolean,reflect:!0})],bt.prototype,`desktop`,void 0),bt=X([j(`controller-graphic`)],bt);var Z=class extends A{constructor(...e){super(...e),this.helpView=`none`,this.sweepChannel=1,this.sweepInterval=null}static{this.styles=[N,P,F,o`
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
      .guided-steps {
        list-style: none;
        padding: 0;
        margin: 0;
        font-size: 12.5px;
        line-height: 1.5;
        opacity: 0.8;
      }
      .guided-steps li {
        margin-bottom: 8px;
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
        gap: 10px;
        margin-top: 14px;
      }
      .channel-select {
        padding: 6px 10px;
        border-radius: 10px;
        border: 2px solid var(--ink);
        background: var(--card);
        font-family: inherit;
        font-size: 13px;
        font-weight: 600;
        outline: none;
        cursor: pointer;
      }
      .btn-send {
        flex: 1;
        padding: 8px 12px;
        border-radius: 12px;
        background: var(--sky);
        border: 2px solid var(--ink);
        box-shadow: 2px 2px 0 var(--ink);
        font-size: 12.5px;
        font-weight: 600;
        transition: transform 100ms, box-shadow 100ms;
      }
      .btn-send:active {
        transform: translate(2px, 2px);
        box-shadow: 0 0 0 var(--ink);
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
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Y(this,this.store)}updated(){!this.store.state.channelPickerOpen&&this.helpView!==`none`&&this.resetHelp()}resetHelp(){this.helpView=`none`,this.stopSweep()}startSweep(){this.helpView=`sweep`,this.sweepChannel=1,this.store.sendTestCC(this.sweepChannel),this.sweepInterval=setInterval(()=>{this.sweepChannel=this.sweepChannel<16?this.sweepChannel+1:1,this.store.sendTestCC(this.sweepChannel)},700)}stopSweep(){this.sweepInterval&&=(clearInterval(this.sweepInterval),null)}render(){let e=this.store.state,t=e.browseDevice,n=B.getDevice(t),r=e.channels[t]||(n?n.midiChannel:1);return T`
      <div class="wrap">
        <div class="row">
          ${e.rig.map(n=>{let r=B.getDevice(n);if(!r)return null;let i=t===n;return T`
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
                ${i&&e.rig.length>1?T`
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

        ${e.channelPickerOpen?T`
              <div class="chan-popover">
                ${this.helpView===`none`?T`
                  <div class="pop-title">${n?.name} · midi channel</div>
                  <div class="pop-sub">every message for this pedal goes out on this channel.</div>
                  <div class="chan-grid">
                    ${Array.from({length:16},(e,i)=>{let a=i+1;return T`
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
                `:this.helpView===`menu`?T`
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
                `:this.helpView===`sweep`?T`
                  <button class="reset back-btn" @click=${()=>{this.stopSweep(),this.helpView=`menu`}}>← back</button>
                  <div class="pop-title">sweeping channels...</div>
                  <div class="pop-sub">sending test CCs. when the pedal's LED flashes, that's your channel.</div>
                  <div class="sweep-display">
                    <div class="sweep-num">${this.sweepChannel}</div>
                    <div class="sweep-sub">sending CC 93 (127) on channel ${this.sweepChannel}</div>
                  </div>
                `:this.helpView===`guide`?T`
                  <button class="reset back-btn" @click=${()=>this.helpView=`menu`}>← back</button>
                  <div class="pop-title">set a new channel</div>
                  <ol class="guided-steps">
                    <li><span class="step-num">1.</span> Unplug power from the pedal.</li>
                    <li><span class="step-num">2.</span> Hold down both footswitches.</li>
                    <li><span class="step-num">3.</span> Plug power back in while holding.</li>
                    <li><span class="step-num">4.</span> Wait for the LEDs to indicate setup mode.</li>
                    <li><span class="step-num">5.</span> Pick a channel and send a PC message.</li>
                  </ol>
                  <div class="guided-controls">
                    <select class="channel-select" id="guided-channel-select" .value=${r.toString()}>
                      ${Array.from({length:16},(e,t)=>t+1).map(e=>T`
                        <option value=${e}>Channel ${e}</option>
                      `)}
                    </select>
                    <button class="btn-send" @click=${()=>{let e=this.shadowRoot?.querySelector(`#guided-channel-select`);e&&(this.store.sendGuidedPC(t,parseInt(e.value,10)),this.helpView=`none`,this.store.toggleChannelPicker())}}>
                      Send PC Message
                    </button>
                  </div>
                `:null}
              </div>
            `:null}
      </div>
    `}};X([M({attribute:!1})],Z.prototype,`store`,void 0),X([Le()],Z.prototype,`helpView`,void 0),X([Le()],Z.prototype,`sweepChannel`,void 0),Z=X([j(`device-tabs`)],Z);var xt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},St=e=>(...t)=>({_$litDirective$:e,values:t}),Ct=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},wt=`important`,Tt=` !important`,Et=St(class extends Ct{constructor(e){if(super(e),e.type!==xt.ATTRIBUTE||e.name!==`style`||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce((t,n)=>{let r=e[n];return r==null?t:t+`${n=n.includes(`-`)?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,`-$&`).toLowerCase()}:${r};`},``)}update(e,[t]){let{style:n}=e.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let e of this.ft)t[e]??(this.ft.delete(e),e.includes(`-`)?n.removeProperty(e):n[e]=null);for(let e in t){let r=t[e];if(r!=null){this.ft.add(e);let t=typeof r==`string`&&r.endsWith(Tt);e.includes(`-`)||t?n.setProperty(e,t?r.slice(0,-11):r,t?wt:``):n[e]=r}}return E}}),Q=class extends A{constructor(...e){super(...e),this.phone=!1,this.desktop=!1}static{this.styles=[N,P,o`
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
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Y(this,this.store)}render(){let e=this.store.state,t=B.getDevice(e.browseDevice),n=e.face===`drawn`,r=this.store.activeStack,i={aspectRatio:n?`344/426`:`${t.pw}/${t.ph}`,width:this.phone?`100%`:`auto`,maxWidth:`100%`,height:this.phone?`auto`:`100%`};return this.desktop&&(i.maxHeight=n?`420px`:`600px`),T`
      <div class="canvas">
        ${this.desktop?T`
              <span class="deco" style="left:8%;top:14%;width:13px;height:13px;border-radius:50%;background:var(--sky)"></span>
              <span class="deco" style="left:13%;bottom:20%;width:20px;height:20px;border-radius:6px;background:var(--mustard);transform:rotate(14deg)"></span>
              <span class="deco" style="right:10%;top:22%;width:18px;height:18px;border-radius:6px;background:var(--coral);transform:rotate(-12deg)"></span>
              <span class="deco" style="right:7%;bottom:16%;width:12px;height:12px;border-radius:50%;background:var(--violet)"></span>
            `:null}
        <div class="stage" style=${Et(i)}>
          ${n?T`
                <div class="enclosure" style="background:${t.body}"></div>
                <div class="brand" style="color:${t.ink}">${t.faceName}</div>
              `:T`<img class="face-photo" src=${t.photo} alt=${t.faceName} />`}
          ${t.controls.map(i=>this.renderControl(i,t,n,r,e.popoverControlId))}
        </div>
      </div>
    `}renderControl(e,t,n,r,i){let a=[];r.forEach((n,r)=>{n.device===t.id&&n.control===e.id&&a.push(r+1)});let o=a.length>0,s=i===e.id,c=!n,l=c?e.px:e.x,u=c?e.py:e.y,d={position:`absolute`,left:`${l}%`,top:`${u}%`,transform:`translate(-50%,-50%)`,display:`flex`,alignItems:`center`,justifyContent:`center`,zIndex:String(s?12:6)};c?(d.width=`${e.ps}%`,d.aspectRatio=`1`):e.type===`foot`?(d.width=`18%`,d.aspectRatio=`1`):e.type===`toggle`?(d.width=`9%`,d.height=`11%`):(d.width=`14%`,d.aspectRatio=`1`),this.phone&&(d.minWidth=`44px`,d.minHeight=`44px`);let f;f=c?{display:`block`,width:`100%`,height:`100%`,borderRadius:`50%`,border:`2.5px ${s||o?`solid`:`dashed`} var(--ink)`,background:s?`#f7c948aa`:o?`#f7c94855`:`rgba(255,251,240,.28)`,boxShadow:s?`0 0 0 4px #f7c94866`:`none`,transition:`background 160ms ease, box-shadow 160ms cubic-bezier(.23,1,.32,1)`}:e.type===`toggle`?{display:`block`,width:`100%`,height:`100%`,borderRadius:`7px`,background:`var(--ink)`,border:`2.5px solid var(--ink)`}:{display:`block`,width:`100%`,height:`100%`,borderRadius:`50%`,background:`#fffbf0`,border:`2.5px solid var(--ink)`,boxShadow:s?`0 0 0 4px #f7c94866`:`2px 2px 0 var(--ink)`,transition:`box-shadow 160ms cubic-bezier(.23,1,.32,1)`};let p=c?{position:`absolute`,left:`50%`,bottom:`calc(100% + 6px)`,transform:`translateX(-50%)`,whiteSpace:`nowrap`,fontSize:`11px`,fontWeight:`600`,padding:`2px 8px`,borderRadius:`12px`,background:`var(--mustard)`,border:`2px solid var(--ink)`,color:`var(--ink)`,pointerEvents:`none`,opacity:s||o?`1`:`0`}:{position:`absolute`,left:`50%`,[e.type===`foot`?`bottom`:`top`]:e.type===`foot`?`calc(100% + 6px)`:`calc(100% + 5px)`,transform:`translateX(-50%)`,whiteSpace:`nowrap`,fontSize:`clamp(8px,3.2cqw,11px)`,fontWeight:`500`,color:`var(--ink)`,opacity:`.75`,pointerEvents:`none`};return T`
      <button
        class="hotspot"
        style=${Et(d)}
        title=${e.label}
        @click=${()=>this.store.clickControl(e)}
      >
        <span style=${Et(f)}></span>
        <span style=${Et(p)}>${e.short}</span>
        ${o?T`<span class="badge">${a.join(`,`)}</span>`:null}
      </button>
    `}};X([M({attribute:!1})],Q.prototype,`store`,void 0),X([M({type:Boolean,reflect:!0})],Q.prototype,`phone`,void 0),X([M({type:Boolean,reflect:!0})],Q.prototype,`desktop`,void 0),Q=X([j(`pedal-canvas`)],Q);function Dt(e){let t={};return e.banks.forEach(e=>{Object.keys(e).forEach(n=>{z.forEach(({id:r})=>{e[n][r].forEach(e=>{t[e.device]=!0})})})}),Object.keys(t)}function Ot(e,t){let n={};return e.banks.forEach(e=>{Object.keys(e).forEach(r=>{z.forEach(({id:i})=>{e[r][i].forEach(e=>{e.device===t&&(n[e.control]=!0)})})})}),Object.keys(n)}function kt(e){let t={};return Dt(e).forEach(n=>{let r=B.getDevice(n);if(!r)return;let i={};Ot(e,n).forEach(e=>{let t=B.getControl(n,e);t&&(i[e]=t.cc)}),t[n]={name:r.name,channel:e.channels[n]||r.midiChannel,cc:i}}),{schema:`stomp-stacks/rig@1`,controller:e.controllerId,brain:e.brainId,pedals:t,banks:e.banks.map((t,n)=>{let r={};return Object.keys(t).forEach(i=>{let a={};if(z.forEach(n=>{t[i][n.id].length&&(a[n.id]=t[i][n.id].map(t=>{let n=q(t,e.channels);return{pedal:t.device,control:t.control,value:t.value===null||t.value===void 0?127:t.value,label:n.stepLabel||n.label}}))}),Object.keys(a).length){let t=`${n}:${i}`,o=e.naming&&e.naming[t]||{};r[i]={name:o.name||``,secondary:o.secondary||``,color:o.color||null,textColor:o.textColor||`ink`,actions:a}}}),r})}}var At=class{constructor(){this.id=`rig`,this.name=`Rig Schema JSON`}compileExport(e){let t=kt(e);return{filename:`rig-stack-${e.controllerId}.json`,mimeType:`application/json`,content:JSON.stringify(t,null,2)}}compilePreview(e){let t=kt(e);return JSON.stringify(t,null,2).split(`
`).map(e=>({text:e||` `}))}},jt=class{constructor(){this.id=`labels`,this.name=`Printable Labels`}compileExport(e){let t=this.compilePreview(e);return{filename:`stomp-labels-${e.controllerId}.txt`,mimeType:`text/plain`,content:t.map(e=>e.text).join(`
`)}}compilePreview(e){let t=[],n=(e,n)=>{t.push({text:e===``?` `:e,...n})},r=B.getController(e.controllerId),i=B.getBrain(e.brainId);return n(`STOMP STACKS · ${r.name}`,{bold:!0}),n(`via ${i.full.toLowerCase()}`,{muted:!0}),dt(e,(t,r,i,a,o)=>{let s=`${t}:${r}`,c=e.naming&&e.naming[s]||{},l=c.name||`switch ${r}`;n(``),n(`${l}  ·  ${a.label}`,{bold:!0}),c.secondary&&n(c.secondary),n(`bank ${t+1} · switch ${r}${c.color?` · ${c.color}`:``}`,{muted:!0}),o.forEach((t,r)=>{let i=q(t,e.channels);n(`   ${r+1}. ${i.deviceName} — ${i.label}`)})}),t.length||n(`nothing stacked yet — go poke a pedal`,{muted:!0}),t}},Mt=e=>e.toString(16).toUpperCase().padStart(2,`0`),Nt=class{constructor(){this.id=`trace`,this.name=`MIDI Trace Log`}compileExport(e){let t=this.compilePreview(e);return{filename:`midi-trace-${e.controllerId}.txt`,mimeType:`text/plain`,content:t.map(e=>e.text).join(`
`)}}compilePreview(e){let t=[],n=(e,n)=>{t.push({text:e===``?` `:e,...n})};return dt(e,(t,r,i,a,o)=>{n(`▸ bank ${t+1} · ${r} ${a.label}`,{bold:!0}),o.forEach(t=>{let r=q(t,e.channels);n(`    ${Mt(176+r.channel-1)} ${Mt(r.cc)} ${Mt(r.value)}    ${r.deviceName} ${r.label}`,{muted:!0})}),n(``)}),t.length||n(`nothing stacked yet — go poke a pedal`,{muted:!0}),t}},Pt={rig:new At,mc3:new ut,scribble:new gt,labels:new jt,trace:new Nt};function Ft(e){let t=B.getBrain(e.brainId),n=B.getController(e.controllerId),r=[],i=0,a=0;dt(e,(e,n,r,o,s)=>{s.length>t.maxSteps&&(i++,s.length>a&&(a=s.length))}),i&&r.push({type:`warn`,text:`${i} stack${i===1?``:`s`} run to ${a} messages — ${t.full.toLowerCase()} sends ${t.maxSteps}${e.brainId===`none`?`. this is the case for a brain.`:`. trim them or move up.`}`}),e.banks.length>t.banks&&r.push({type:`warn`,text:`${n.name} has ${e.banks.length} banks; ${t.full.toLowerCase()} holds ${t.banks}.`}),e.brainId===`onboard`&&!n.onboard&&r.push({type:`warn`,text:`${n.name} can't hold stacks onboard — it only sends one message per switch.`});let o=Dt(e).filter(t=>!e.rig.includes(t));o.length&&r.push({type:`warn`,text:`${o.map(e=>B.getDevice(e)?.name||e).join(` + `)} ${o.length===1?`is`:`are`} stacked but no longer in the rig — those steps won't be sent.`}),B.detectChannelCollisions(e.rig,e.channels).forEach(({channel:e,devices:t})=>{r.push({type:`warn`,text:`${t.join(` + `)} are both on channel ${e} — their cc numbers will collide.`})}),e.targetId===`mc3`&&e.controllerId!==`mc3`&&r.push({type:`warn`,text:`building an mc3 preset, but the rig is set to ${n.name}.`}),e.targetId===`scribble`&&e.brainId!==`scribble`&&r.push({type:`warn`,text:`building a scribble config, but the brain is set to ${t.full.toLowerCase()}.`});let s={state:e,namingTargets(){let t=[e.controllerId];return e.brainId===`scribble`&&t.push(`scribble`),t.filter(e=>U[e]).map(e=>({...U[e]}))},displayTargets(){return this.namingTargets().filter(e=>e.name>0)},sharedColors(){let e=this.namingTargets().filter(e=>e.colors===null||e.colors.length>0);return e.length?V.map(e=>e[0]).filter(t=>e.every(e=>e.colors===null||e.colors&&e.colors.includes(t))):[]}},c=[];e.banks.forEach((t,n)=>{Object.keys(t).forEach(r=>{let i=0;if(z.forEach(e=>{i+=t[r][e.id].length}),i){let t=`${n}:${r}`,i=e.naming&&e.naming[t]||{};c.push({name:i.name||``,secondary:i.secondary||``,color:i.color||null,raw:i})}})}),s.displayTargets().forEach(e=>{let t=c.filter(t=>t.raw.name&&t.name.length>e.name).length;if(t&&r.push({type:`warn`,text:`${t} ${t===1?`name is`:`names are`} longer than the ${e.label.toLowerCase()} shows (${e.name} characters) — ${t===1?`it reads`:`they read`} trimmed there.`}),!e.secondary){let t=c.filter(e=>e.secondary).length;t&&r.push({type:`warn`,text:`${t} second ${t===1?`line has`:`lines have`} nowhere to go on the ${e.label.toLowerCase()} — ${t===1?`it lands`:`they land`} on the label sheet instead.`})}});let l=s.sharedColors(),u={};return c.forEach(e=>{e.color&&(!l.length||!l.includes(e.color))&&(u[e.color]=!0)}),Object.keys(u).forEach(e=>{let t=e,n=s.namingTargets().filter(e=>e.colors&&e.colors.length&&!e.colors.includes(t));n.length&&r.push({type:`warn`,text:`${e} isn't in ${n.map(e=>e.label.toLowerCase()).join(` or `)}'s palette — those stacks fall back to a compatible color there.`})}),r.length||r.push({type:`ok`,text:`all clear — nothing collides, nothing overflows.`}),r}var It=class{static compile(e,t=e.targetId){let n=Pt[t]||Pt.rig;return{targetId:t,exportFile:n.compileExport(e),preview:n.compilePreview(e),diagnostics:Ft(e)}}static getAdapter(e){return Pt[e]||Pt.rig}};It.compile;var $=class extends A{constructor(...e){super(...e),this.phone=!1,this.desktop=!1}static{this.styles=[N,P,F,o`
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
        position: relative;
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 9px;
      }
      .switch-tag {
        flex: none;
        font-family: var(--mono);
        font-size: 11px;
        padding: 3px 8px;
        border-radius: 10px;
        background: var(--ink);
        color: var(--panel-warm);
      }
      .strip-card {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1px;
        padding: 6px 11px;
        border-radius: 13px;
        border: 2.5px solid var(--ink);
        transition: background 200ms ease;
      }
      .name-input {
        width: 100%;
        padding: 0;
        border: 0;
        background: transparent;
        font-family: inherit;
        font-size: 15px;
        font-weight: 600;
        letter-spacing: -0.02em;
        line-height: 1.25;
        outline: none;
      }
      .secondary-input {
        width: 100%;
        padding: 0;
        border: 0;
        background: transparent;
        font-family: var(--mono);
        font-size: 11px;
        line-height: 1.35;
        opacity: 0.72;
        outline: none;
      }
      .color-btn {
        width: 26px;
        height: 26px;
        flex: none;
        border-radius: 9px;
        border: 2.5px solid var(--ink);
        transition: box-shadow 150ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .color-btn:hover {
        box-shadow: 2px 2px 0 var(--ink);
      }
      .color-popover {
        position: absolute;
        left: 0;
        top: calc(100% + 8px);
        z-index: 30;
        width: 262px;
        max-width: 100%;
        padding: 14px;
        border-radius: 20px;
        background: var(--card);
        border: 2.5px solid var(--ink);
        box-shadow: 5px 5px 0 var(--ink);
        animation: sheetIn 170ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .color-pop-head {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
      }
      .color-pop-title {
        flex: 1;
        font-size: 12.5px;
        font-weight: 600;
      }
      .color-pop-close {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid var(--ink);
        font-size: 12px;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .color-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 7px;
      }
      .color-swatch {
        height: 30px;
        border-radius: 11px;
        border: 2.5px solid var(--ink);
        transition:
          box-shadow 150ms cubic-bezier(0.23, 1, 0.32, 1),
          transform 120ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .color-swatch[active] {
        box-shadow:
          0 0 0 3px #16323d inset,
          3px 3px 0 var(--ink);
      }
      .color-swatch[disabled] {
        opacity: 0.22;
        pointer-events: none;
      }
      .text-row {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 11px;
        padding-top: 11px;
        border-top: 2px solid rgba(22, 50, 61, 0.15);
      }
      .text-lbl {
        flex: 1;
        font-size: 12px;
        font-weight: 600;
      }
      .text-opt {
        display: flex;
        align-items: center;
        gap: 5px;
        flex: none;
        padding: 4px 9px 4px 5px;
        border-radius: 11px;
        border: 2px solid var(--ink);
        background: var(--card);
        font-size: 11px;
        font-weight: 600;
        color: var(--ink);
        transition:
          box-shadow 150ms cubic-bezier(0.23, 1, 0.32, 1),
          opacity 150ms ease;
      }
      .text-opt[active] {
        box-shadow: 2px 2px 0 var(--ink);
      }
      .text-opt:not([active]) {
        opacity: 0.55;
      }
      .text-dot {
        width: 14px;
        height: 14px;
        flex: none;
        border-radius: 5px;
        border: 2px solid var(--ink);
      }
      .color-pop-note {
        margin-top: 10px;
        font-size: 11px;
        line-height: 1.45;
        opacity: 0.6;
        text-wrap: pretty;
      }
      .flags-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 10px;
      }
      .flag-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: 12px;
        border: 2px solid var(--ink);
        background: #ffe6dd;
        font-size: 11.5px;
        transition: box-shadow 150ms ease;
      }
      .flag-btn:hover {
        box-shadow: 2px 2px 0 var(--ink);
      }
      .flag-dot {
        width: 8px;
        height: 8px;
        flex: none;
        border-radius: 3px;
        border: 2px solid var(--ink);
        background: var(--mustard);
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
      .pop-section-title {
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        opacity: 0.7;
        margin: 10px 0 6px;
      }
      .pop-templates {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .pop-template-btn {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 3px;
        padding: 8px 11px;
        border-radius: 14px;
        border: 2px solid var(--ink);
        background: var(--card);
        text-align: left;
        cursor: pointer;
        transition:
          background 150ms ease,
          box-shadow 150ms ease;
      }
      .pop-template-btn:hover {
        background: var(--mustard);
        box-shadow: 2px 2px 0 var(--ink);
      }
      .tmpl-name {
        font-size: 12px;
        font-weight: 600;
      }
      .tmpl-desc {
        font-size: 10.5px;
        opacity: 0.75;
      }
      .tmpl-badges {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 2px;
      }
      .step-chip {
        font-family: var(--mono);
        font-size: 10px;
        font-weight: 700;
        padding: 1px 6px;
        border-radius: 8px;
        background: var(--ink);
        color: var(--panel-warm);
      }
      .step-arrow {
        font-size: 9px;
        opacity: 0.5;
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
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Y(this,this.store)}render(){let e=this.store.state,t=e.banks[e.bank],n=this.store.activeStack,r=e.sheetOpen||!this.phone;this.phone?this.style.maxHeight=r?`56%`:`none`:this.style.maxHeight=``;let i=B.getDevice(e.browseDevice),a=e.popoverControlId?B.getControl(e.browseDevice,e.popoverControlId):null,o=this.store.ident(e.bank,e.selectedKey),s=this.store.sharedColors(),c=V.map(e=>e[0]).filter(e=>s.length>0&&!s.includes(e)),l=this.store.displayTargets().length>0||s.length>0,u=o.color?H[o.color]:`#16323d`,d=Ke[o.textColor],f=[];if(l&&(this.store.displayTargets().forEach(e=>{o.raw.name&&o.name.length>e.name&&f.push(`${e.label.toLowerCase()} shows “${o.name.slice(0,e.name)}”`),o.secondary&&!e.secondary?f.push(`${e.label.toLowerCase()} drops the second line`):o.secondary&&o.secondary.length>e.secondary&&f.push(`${e.label.toLowerCase()} trims line two to “${o.secondary.slice(0,e.secondary)}”`)}),o.color&&s.length>0&&!s.includes(o.color))){let e=this.store.namingTargets().filter(e=>e.colors&&e.colors.length>0&&!e.colors.includes(o.color));e.length&&f.push(`${o.color} is out of range on ${e.map(e=>e.label.toLowerCase()).join(` + `)}`)}return T`
      <button class="grabber" @click=${()=>this.store.toggleSheet()}></button>

      <div class="head">
        <div class="head-row">
          <span class="switch-tag">${e.selectedKey}</span>
          ${l?T`
                <div class="strip-card" style="background:${u}">
                  <input
                    class="name-input"
                    style="color:${d}"
                    .value=${o.raw.name||``}
                    placeholder=${o.auto||`name this stack`}
                    maxlength="24"
                    @input=${e=>this.store.setIdent({name:e.target.value})}
                  />
                  <input
                    class="secondary-input"
                    style="color:${d}"
                    .value=${o.secondary}
                    placeholder=${o.autoSec||`second line`}
                    maxlength="24"
                    @input=${e=>this.store.setIdent({secondary:e.target.value})}
                  />
                </div>
                <button
                  class="color-btn"
                  title=${o.color?`strip colour · ${o.color}`:`give this stack a colour`}
                  style="background:${o.color?H[o.color]:`repeating-linear-gradient(135deg,#fffbf0 0 4px,#e9e0cc 4px 8px)`}"
                  @click=${()=>this.store.toggleColorPicker()}
                ></button>
              `:T`<div class="title">switch ${e.selectedKey} macro</div>`}

          <span class="capacity" style=${n.length>=J?`background:var(--full-border-bg)`:`background:transparent`}
            >${n.length} / ${J}</span
          >
          <button class="chevron" @click=${()=>this.store.toggleSheet()}>${r?`⌄`:`⌃`}</button>

          ${e.colorPickerOpen?T`
                <div class="color-popover">
                  <div class="color-pop-head">
                    <span class="color-pop-title">switch ${e.selectedKey} lights up…</span>
                    <button class="color-pop-close" @click=${()=>this.store.closeColorPicker()}>×</button>
                  </div>
                  <div class="color-grid">
                    ${V.map(([e,t])=>{let n=s.length===0||s.includes(e),r=o.color===e;return T`
                        <button
                          class="color-swatch"
                          title=${n?e:`${e} — not in this rig's palette`}
                          style="background:${t}"
                          ?active=${r}
                          ?disabled=${!n}
                          @click=${()=>{this.store.setIdent({color:r?null:e}),this.store.closeColorPicker()}}
                        ></button>
                      `})}
                  </div>
                  <div class="text-row">
                    <span class="text-lbl">text</span>
                    ${Ge.map(([e,t])=>{let n=o.textColor===e;return T`
                        <button
                          class="text-opt"
                          title=${`text in ${e}${o.autoText?` — picked automatically until you choose`:``}`}
                          ?active=${n}
                          @click=${()=>this.store.setIdent({textColor:e})}
                        >
                          <span class="text-dot" style="background:${t}"></span>
                          <span>${e}</span>
                        </button>
                      `})}
                  </div>
                  <div class="color-pop-note">
                    ${s.length>0?`every device in the rig can light these. ${c.length?`${c.join(`, `)} ${c.length===1?`is`:`are`} out of range.`:``}`:`no device in this rig has a light — colour rides along on the label sheet only.`}
                  </div>
                </div>
              `:null}
        </div>

        ${f.length>0?T`
              <div class="flags-row">
                ${f.map(e=>T`
                    <button class="flag-btn" title="see how each device renders this" @click=${()=>this.store.openSettings()}>
                      <span class="flag-dot"></span>
                      <span>${e}</span>
                    </button>
                  `)}
              </div>
            `:null}

        <div class="tabs">
          ${z.map(({id:n,label:r})=>{let i=t[e.selectedKey][n].length,a=e.action===n;return T`
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

      ${a&&i?T`
            <div class="popover">
              <div class="popover-head">
                <span class="pop-dot" style="background:${i.accent}"></span>
                <span class="pop-title">${a.label}</span>
                <button class="pop-close" @click=${()=>this.store.closePopover()}>×</button>
              </div>

              ${i.macroTemplates?.some(e=>e.controlId===a.id)?T`<div class="pop-section-title">Single Action</div>`:null}

              <div class="pop-options">
                ${B.valueOptionsFor(a).map(t=>T`
                    <button
                      class="pop-option"
                      style=${n.some(n=>n.device===e.browseDevice&&n.control===a.id&&n.value===t.value)?`background:var(--sky);font-weight:600;box-shadow:2px 2px 0 var(--ink)`:``}
                      @click=${()=>this.store.addStep(a.id,t.value,t.label.toUpperCase())}
                    >
                      ${t.label}
                    </button>
                  `)}
              </div>

              ${i.macroTemplates?.some(e=>e.controlId===a.id)?T`
                    <div class="pop-section-title">Onboard Switch Lifecycle</div>
                    <div class="pop-templates">
                      ${i.macroTemplates.filter(e=>e.controlId===a.id).map(e=>T`
                            <button class="pop-template-btn" @click=${()=>this.store.applyMacroTemplate(e.id)}>
                              <span class="tmpl-name">${e.name}</span>
                              ${e.description?T`<span class="tmpl-desc">${e.description}</span>`:null}
                              <div class="tmpl-badges">
                                ${e.steps.map((e,t)=>T`
                                    ${t>0?T`<span class="step-arrow">→</span>`:null}
                                    <span class="step-chip">${e.label}</span>
                                  `)}
                              </div>
                            </button>
                          `)}
                    </div>
                  `:null}
            </div>
          `:null}
      ${r?T`
            <div class="list">
              ${n.length===0?T`
                    <div class="empty">
                      ${this.desktop?T`
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
                  `:n.map((e,t)=>{let r=q(e);return T`
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
              ${n.length>=J?T`<div class="full-notice">stack's full — 8 is the limit. drop one to add another.</div>`:null}
            </div>
          `:null}
    `}};X([M({attribute:!1})],$.prototype,`store`,void 0),X([M({type:Boolean,reflect:!0})],$.prototype,`phone`,void 0),X([M({type:Boolean,reflect:!0})],$.prototype,`desktop`,void 0),$=X([j(`macro-panel`)],$);function Lt(e,t){let n=new Blob([JSON.stringify(t,null,2)],{type:`application/json`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=e,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(r)}function Rt(e,t){let n=new Blob([t],{type:`text/plain;charset=utf-8`}),r=URL.createObjectURL(n),i=document.createElement(`a`);i.href=r,i.download=e,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(r)}var zt=class extends A{constructor(...e){super(...e),this.phone=!1}static{this.styles=[N,P,I,F,o`
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
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Y(this,this.store)}handleDownload(){let e=this.store.state,t=It.compile(e);t.exportFile.mimeType===`application/json`?Lt(t.exportFile.filename,JSON.parse(t.exportFile.content)):Rt(t.exportFile.filename,t.exportFile.content)}render(){let e=this.store.state;if(!e.compileOpen)return null;let t=this.store.totalAssigned,n=B.getController(e.controllerId),r=B.getBrain(e.brainId),i=e.rig.length?e.rig.map(e=>B.getDevice(e)?.name||e).join(`, `):`no pedals yet`,a=`${t} ${t===1?`message`:`messages`} · ${n.short} → ${r.short} → ${i}`,o=B.getTarget(e.targetId),s=It.compile(e),c=s.preview,l=s.diagnostics;return T`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this.store.closeCompile()}>
        <div class="panel sheet-in">
          <div class="head">
            <div class="title">one stomp stacks config, freshly cooked</div>
            <div class="meta">${a}</div>
          </div>
          <div class="body">
            <div class="targets-sidebar">
              ${We.map(t=>T`
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
                ${c.map(e=>T`<div style=${e.muted?`white-space:pre;opacity:.42`:e.bold?`white-space:pre;font-weight:600`:`white-space:pre;opacity:.85`}>${e.text}</div>`)}
              </div>
              <div class="issues-box">
                ${l.map(e=>T`
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
    `}};X([M({attribute:!1})],zt.prototype,`store`,void 0),X([M({type:Boolean,reflect:!0})],zt.prototype,`phone`,void 0),zt=X([j(`compile-modal`)],zt);var Bt=[{id:`photo`,label:`photo`},{id:`drawn`,label:`sketch`}],Vt=class extends A{static{this.styles=[N,P,I,F,o`
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
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Y(this,this.store)}render(){let e=this.store.state;if(!e.settingsOpen)return null;let t=this.store.ident(e.bank,e.selectedKey),n=this.store.sharedColors(),r=V.map(e=>e[0]).filter(e=>n.length>0&&!n.includes(e)),i=this.store.displayTargets().length>0||n.length>0,a=this.store.namingTargets();return T`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this.store.closeSettings()}>
        <div class="panel sheet-in">
          <div class="head"><div class="head-title">settings</div></div>
          <div class="modal-body">
            <div class="section">
              <div class="group-title">pedal artwork</div>
              <div class="group-body">photos of the real pedals, or clean sketches with every control labelled.</div>
              <div class="tabs">
                ${Bt.map(t=>T`
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

            ${i?T`
                  <div class="section" style="padding-top:4px;padding-bottom:22px">
                    <div class="group-title">device conventions</div>
                    <div class="group-body">you write it once, on the strip. here's what each part of the rig renders of it.</div>
                    <div class="conventions-container">
                      ${a.map((e,n)=>{let r=this.store.colorFor(e.id,t.color),i=e.name===0?`#f7f1e3`:r?H[r]:`#16323d`,a=e.name===0?`#16323d`:e.text?Ke[t.textColor]:Xe(i)?`#f7f1e3`:`#16323d`,o=[];e.name?o.push(`${e.name} char${e.secondary?` × 2 lines`:``}`):o.push(`no display`),e.colors===null?o.push(`any colour`):e.colors.length&&o.push(`${e.colors.length} leds`);let s=e.name?t.name.slice(0,e.name):t.name,c=e.secondary>0&&!!t.secondary,l=t.secondary.slice(0,e.secondary);return T`
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
                                ${c?T`<span class="convention-secondary">${l}</span>`:null}
                              </div>
                              <div class="convention-note">${e.note}</div>
                            </div>
                          </div>
                        `})}
                    </div>

                    ${n.length>0?T`
                          <div class="shared-row">
                            <span class="shared-lbl">shared</span>
                            <div class="swatches-wrap">
                              ${V.map(([e,t])=>{let r=n.includes(e);return T`
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
          <div class="foot"><button class="btn-done" @click=${()=>this.store.closeSettings()}>done</button></div>
        </div>
      </div>
    `}};X([M({attribute:!1})],Vt.prototype,`store`,void 0),Vt=X([j(`settings-modal`)],Vt);var Ht=class extends A{static{this.styles=[N,P,I,F,o`
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
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Y(this,this.store)}render(){let e=this.store.state;return e.controllerPickerOpen?T`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this.store.closeControllerPicker()}>
        <div class="panel sheet-in">
          <div class="head">
            <div class="head-title">what are you stomping on?</div>
            <div class="head-sub">switching controllers starts a fresh set of stacks.</div>
          </div>
          <div class="body">
            ${Ve.map(t=>{let n=R[t];return T`
                <button
                  class="tile"
                  style=${e.controllerId===t?`background:var(--panel-warm);box-shadow:3px 3px 0 var(--ink)`:`background:var(--paper)`}
                  @click=${()=>this.store.switchController(t)}
                >
                  <span class="tile-strip">${n.keys.map(()=>T`<span class="tile-cap"></span>`)}</span>
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
    `:null}};X([M({attribute:!1})],Ht.prototype,`store`,void 0),Ht=X([j(`controller-picker-modal`)],Ht);var Ut=class extends A{static{this.styles=[N,P,I,F,o`
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
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Y(this,this.store)}render(){let e=this.store.state;return e.brainPickerOpen?T`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this.store.closeBrainPicker()}>
        <div class="panel sheet-in">
          <div class="head">
            <div class="title">what turns one stomp into a stack?</div>
            <div class="sub">the stacks stay the same either way — this only changes what you export and what fits.</div>
          </div>
          <div class="tiles">
            ${Ue.map(t=>{let n=He[t],r=e.brainId===t,i=n.maxSteps===1?`1 msg`:`up to ${n.maxSteps}`;return T`
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
    `:null}};X([M({attribute:!1})],Ut.prototype,`store`,void 0),Ut=X([j(`brain-picker-modal`)],Ut);var Wt=class extends A{static{this.styles=[N,P,I,F,o`
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
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Y(this,this.store)}render(){let e=this.store.state;if(!e.addPedalOpen)return null;let t=Be.filter(t=>!e.rig.includes(t)),n=t.length===0;return T`
      <div class="scrim" @click=${e=>e.target===e.currentTarget&&this.store.closeAddPedal()}>
        <div class="panel sheet-in">
          <div class="head">
            <div class="title">add a pedal to the rig</div>
            <div class="sub">only the pedals in your rig get tabs, a channel, and a place in the export.</div>
          </div>
          <div class="body">
            ${t.map(t=>{let n=B.getDevice(t),r=e.channels[t]||this.store.nextFreeChannel(e.rig,e.channels);return T`
                <button class="tile" @click=${()=>this.store.addPedal(t)}>
                  <span class="dot" style="background:${n.accent}"></span>
                  <span class="text-wrap">
                    <span class="pedal-name">${n.name}</span>
                    <span class="pedal-sub">${n.sub}</span>
                  </span>
                  <span class="tag">ch ${r}</span>
                </button>
              `})}
            ${n?T`
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
    `}};X([M({attribute:!1})],Wt.prototype,`store`,void 0),Wt=X([j(`add-pedal-modal`)],Wt);var Gt=class extends A{static{this.styles=[N,P,I,F,o`
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
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Y(this,this.store)}countStackedSteps(e){let t=0;return this.store.state.banks.forEach(n=>{Object.keys(n).forEach(r=>{z.forEach(i=>{n[r][i.id].forEach(n=>{n.device===e&&t++})})})}),t}render(){let e=this.store.state;if(!e.confirmRemovePedal)return null;let t=e.confirmRemovePedal,n=L[t];if(!n)return null;let r=this.countStackedSteps(t),i=`nothing is stacked on it yet, so nothing is lost. add it back any time.`;return r===1?i=`1 step across your banks uses it. that step stays put, but it won't be sent until you add it back — the export will flag it.`:r>1&&(i=`${r} steps across your banks use it. those steps stay put, but they won't be sent until you add it back — the export will flag them.`),T`
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
    `}};X([M({attribute:!1})],Gt.prototype,`store`,void 0),Gt=X([j(`confirm-remove-modal`)],Gt);var Kt=class extends A{static{this.styles=[N,P,I,F,o`
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
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Y(this,this.store),K.init()}handleFileSelect(e){let t=e.target.files?.[0];if(!t)return;let n=new FileReader;n.onload=e=>{try{let t=JSON.parse(e.target?.result);this.store.loadScribbleFile(t)}catch{alert(`Could not parse JSON configuration file. Please check file format.`)}},n.readAsText(t)}triggerFileInput(){let e=this.shadowRoot?.querySelector(`#scribble-file-input`);e&&e.click()}render(){let e=this.store.state;if(!e.connectOpen)return null;let t=K.getHardwareNodes(e),n=t.filter(t=>e.conn[t.id]).length;return T`
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
            <div class="rows-box">
              ${t.map(t=>{let n=!!e.conn[t.id],r=e.listening===t.id;return T`
                  <div class="dev-row">
                    <span class="dev-dot" style="background:${n?t.id===`scribble`?`#8fd0e6`:L[t.id]?.accent||`#8fd0e6`:`transparent`}"></span>
                    <div class="dev-info">
                      <div class="dev-top">
                        <span class="dev-name">${t.name}</span>
                        <span class="dev-kind">${t.kind}</span>
                      </div>
                      <span class="dev-port" style="opacity:${n?`0.6`:`0.35`}">${n?t.port:`not open`}</span>
                    </div>
                    ${t.canRead?T`
                          <button class="btn-action" @click=${()=>this.store.readFrom(t.id)}>
                            read
                          </button>
                        `:null}
                    ${t.canListen?T`
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

            ${e.heard?T`
                  <div class="heard-card" ?ok=${!e.heard.drift}>
                    <div class="heard-head">
                      <span class="heard-dot"></span>
                      <span class="heard-title">
                        ${e.heard.drift?`that isn't where we expected it`:`${L[e.heard.pedal]?.name||e.heard.pedal} answers where we thought`}
                      </span>
                    </div>
                    <div class="heard-body">
                      ${e.heard.drift?`${L[e.heard.pedal]?.name||e.heard.pedal} sent cc ${e.heard.cc}, but our map puts that control on cc ${e.heard.expect}. the whole map looks shifted by ${e.heard.drift>0?`+`:``}${e.heard.drift} — probably a firmware revision.`:`cc ${e.heard.cc}, exactly where the map says. the rest of the pedal should line up too.`}
                    </div>
                    <div class="heard-btns">
                      ${e.heard.drift?T`
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
    `}};X([M({attribute:!1})],Kt.prototype,`store`,void 0),Kt=X([j(`connect-modal`)],Kt);function qt(e){return!e||!e.length?`empty`:e.map(e=>{let t=L[e.device],n=t?.controls.find(t=>t.id===e.control);return`${t?t.name:e.device} ${n?n.short||n.label:e.control}`}).join(` → `)}var Jt=class extends A{static{this.styles=[N,P,I,F,o`
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
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Y(this,this.store)}handleFileSelect(e){let t=e.target.files?.[0];if(!t)return;let n=new FileReader;n.onload=e=>{try{let t=JSON.parse(e.target?.result);this.store.loadScribbleFile(t)}catch{alert(`Could not parse JSON configuration file. Please check file format.`)}},n.readAsText(t)}render(){let e=this.store.state;if(!e.readOpen||!e.readData)return null;let t=e.readData,n=!!t.readingHardware,r=`presets on the ${t.from===`scribble`?`scribble relay`:t.from}`,i=`128 slots, ${t.presets.length} carrying something. send any of them to any stack in bank ${String(e.bank+1).padStart(2,`0`)} — nothing changes until you apply.`,a=t.scanned||0,o=t.total||128,s=t.found||0,c=`slot ${a} / ${o}`,l=s?`${s} ${s===1?`preset found so far`:`presets found so far`}`:`listening for the first answer…`,u=Math.min(100,Math.round(100*a/o)),d=(t.filter||``).trim().toLowerCase(),f=t.presets.filter(e=>!d||String(e.n).indexOf(d)===0||e.label.toLowerCase().includes(d)||e.second.toLowerCase().includes(d)||qt(e.steps).toLowerCase().includes(d)),p=R[e.controllerId]||R.chocolate,m=p?p.keys:[`A`,`B`,`C`,`D`],h=[{value:``,label:`— leave it —`}];m.forEach(e=>{z.forEach(t=>{h.push({value:`${e}:${t.id}`,label:`switch ${e} · ${t.label.toLowerCase()}`})})});let g=Object.keys(t.dest).length,ee=`${g} ${g===1?`preset heading into a stack`:`presets heading into stacks`}`,te=g?`pull ${g} in`:`close`;return T`
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
            ${n?T`
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

            ${f.length===0?T`
                  <div class="empty-note">
                    ${d?`no slot matches “${d}”.`:`nothing on the brain yet — the 128 slots are all empty.`}
                  </div>
                `:T`
                  <div class="preset-list">
                    ${f.map(n=>{let r=t.dest[n.n]||null,i=`p${String(n.n).padStart(3,`0`)}`,a=n.color&&H[n.color]?H[n.color]:`var(--ink)`,o=n.color&&H[n.color]&&!Xe(H[n.color])?`var(--ink)`:`#fdf3d4`,s=r?`${r.key}:${r.action}`:``,c=r&&e.banks[e.bank]?.[r.key]?.[r.action]?e.banks[e.bank][r.key][r.action]:null,l=r?z.find(e=>e.id===r.action):null,u=l?l.label.toLowerCase():r?.action||``,d=r?c&&c.length?`switch ${r.key} · ${u} already holds ${c.length} ${c.length===1?`message`:`messages`}`:`switch ${r.key} · ${u} is empty`:``;return T`
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
                              <span class="preset-steps">${n.second||qt(n.steps)}</span>
                            </div>
                            <select
                              class="dest-select"
                              ?assigned=${!!r}
                              .value=${s}
                              @change=${e=>this.store.setReadDest(n.n,e.target.value)}
                            >
                              ${h.map(e=>T`<option value="${e.value}">${e.label}</option>`)}
                            </select>
                          </div>

                          ${r?T`
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
            <span class="footer-info">${ee}</span>
            <button class="btn-cancel" @click=${()=>this.store.cancelRead()}>cancel</button>
            ${n?null:T`
                  <button class="btn-apply" @click=${()=>this.store.applyPresets()}>
                    ${te}
                  </button>
                `}
          </div>
        </div>
      </div>
    `}};X([M({attribute:!1})],Jt.prototype,`store`,void 0),Jt=X([j(`read-modal`)],Jt);var Yt=class extends A{static{this.styles=[N,P,F,o`
      :host {
        display: block;
        flex: none;
        border-top: 2.5px solid var(--ink);
        background: var(--card);
        padding: 12px 18px;
        animation: sheetIn 180ms cubic-bezier(0.23, 1, 0.32, 1);
      }
      .head {
        display: flex;
        align-items: center;
        gap: 9px;
        padding-bottom: 9px;
      }
      .live-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #5bb85b;
        border: 1.5px solid var(--ink);
        box-shadow: 0 0 6px #5bb85b;
      }
      .label {
        font-family: var(--mono);
        font-size: 10px;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        opacity: 0.55;
        flex: 1;
      }
      .btn-clear {
        font-family: var(--mono);
        font-size: 10px;
        opacity: 0.5;
        padding: 2px 6px;
        transition: opacity 150ms ease;
      }
      .btn-clear:hover {
        opacity: 1;
      }
      .btn-stomp {
        padding: 5px 13px;
        border-radius: 16px;
        background: var(--mustard);
        border: 2px solid var(--ink);
        box-shadow: 2px 2px 0 var(--ink);
        font-family: var(--mono);
        font-size: 11px;
        font-weight: 600;
        transition:
          transform 150ms ease,
          box-shadow 150ms ease;
      }
      .btn-stomp:active {
        transform: translate(1px, 1px);
        box-shadow: 1px 1px 0 var(--ink);
      }
      .log-area {
        max-height: 110px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-family: var(--mono);
        font-size: 11px;
      }
      .log-row {
        display: flex;
        align-items: center;
        gap: 8px;
        line-height: 1.45;
      }
      .log-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        flex: none;
      }
      .log-text {
        font-weight: 500;
      }
      .log-sub {
        opacity: 0.55;
        margin-left: 6px;
      }
      .empty-note {
        font-family: var(--mono);
        font-size: 11px;
        opacity: 0.4;
      }
    `]}connectedCallback(){super.connectedCallback(),this.storeController??=new Y(this,this.store)}render(){let e=this.store.state;return e.monitorOn?T`
      <div class="head">
        <span class="live-dot"></span>
        <span class="label">wire monitor</span>
        <button class="btn-clear" @click=${()=>this.store.clearLog()}>clear</button>
        <button class="btn-stomp" @click=${()=>this.store.stompTest()}>stomp now</button>
      </div>
      <div class="log-area">
        ${e.log.length===0?T`<div class="empty-note">quiet on the wire — stomp something</div>`:e.log.map(e=>T`
                <div class="log-row">
                  <span class="log-dot" style="background:${e.tone===`trig`?`#5bb85b`:e.tone===`warn`?`var(--mustard)`:e.tone===`in`||e.tone===`out`?`var(--sky)`:`#5bb85b`}"></span>
                  <span class="log-text">${e.text}</span>
                  <span class="log-sub">${e.sub}</span>
                </div>
              `)}
      </div>
    `:null}};X([M({attribute:!1})],Yt.prototype,`store`,void 0),Yt=X([j(`wire-monitor`)],Yt);var Xt=760,Zt=1120,Qt=class extends A{static{this.styles=[N,P,o`
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
      .connect-btn {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 18px;
        border: 2px solid var(--ink);
        background: var(--card);
        font-family: var(--mono);
        font-size: 11px;
        font-weight: 500;
        transition: box-shadow 150ms ease;
      }
      .connect-btn:hover {
        box-shadow: 2px 2px 0 var(--ink);
      }
      .connect-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 1.5px solid var(--ink);
        flex: none;
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
    `]}constructor(){super(),this.store=new yt,this.phone=window.innerWidth<Xt,this.desktop=window.innerWidth>=Zt,this.onResize=()=>{this.phone=window.innerWidth<Xt,this.desktop=window.innerWidth>=Zt},new Y(this,this.store)}connectedCallback(){super.connectedCallback(),window.addEventListener(`resize`,this.onResize)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener(`resize`,this.onResize)}render(){let e=this.store.totalAssigned,t=this.store.state,n=Object.keys(t.conn).filter(e=>t.conn[e]).length;return T`
      <div class="root">
        <header>
          <div class="brand">
            <span class="logo">S</span>
            <span class="wordmark">stomp stacks</span>
          </div>
          <div class="spacer"></div>
          ${this.renderHeaderRig()}
          <button class="connect-btn" title="connect hardware" @click=${()=>this.store.openConnect()}>
            <span class="connect-dot" style="background:${n?`#5bb85b`:`rgba(22,50,61,.3)`}"></span>
            <span>${n?`${n} live`:`connect`}</span>
          </button>
          <button class="settings-btn" title="settings" @click=${()=>this.store.openSettings()}>⚙</button>
          <button class="cook-btn" @click=${()=>this.store.openCompile()}>
            <span>${this.desktop?`cook it up`:`cook`}</span>
            <span class="cook-count">${e}</span>
          </button>
        </header>

        ${this.desktop?this.renderDesktopBody():this.renderCompactBody()}
        <wire-monitor .store=${this.store}></wire-monitor>
      </div>

      <compile-modal .store=${this.store} ?phone=${this.phone}></compile-modal>
      <settings-modal .store=${this.store}></settings-modal>
      <controller-picker-modal .store=${this.store}></controller-picker-modal>
      <brain-picker-modal .store=${this.store}></brain-picker-modal>
      <add-pedal-modal .store=${this.store}></add-pedal-modal>
      <confirm-remove-modal .store=${this.store}></confirm-remove-modal>
      <connect-modal .store=${this.store}></connect-modal>
      <read-modal .store=${this.store}></read-modal>
    `}renderHeaderRig(){let e=this.store.state,t=B.getController(e.controllerId),n=B.getBrain(e.brainId),r=e.rig.length<=2?e.rig.map(e=>B.getDevice(e)?.name||e).join(`, `):`${e.rig.slice(0,2).map(e=>B.getDevice(e)?.name||e).join(`, `)} +${e.rig.length-2}`;return this.phone?T`
        <button class="rig-compact-btn" title="rig" @click=${()=>this.store.openBrainPicker()}>
          ${t.short} → ${n.short}
        </button>
      `:T`
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
    `}renderCompactBody(){return T`
      <div class="body">
        <main>
          <div class="controller-block"><controller-graphic .store=${this.store}></controller-graphic></div>
          <div class="device-tabs-block"><device-tabs .store=${this.store}></device-tabs></div>
          <pedal-canvas .store=${this.store} ?phone=${this.phone}></pedal-canvas>
        </main>
        <macro-panel .store=${this.store} ?phone=${this.phone}></macro-panel>
      </div>
    `}renderDesktopBody(){return T`
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
    `}};X([M({type:Boolean,reflect:!0})],Qt.prototype,`phone`,void 0),X([M({type:Boolean,reflect:!0})],Qt.prototype,`desktop`,void 0),Qt=X([j(`stomp-app`)],Qt);