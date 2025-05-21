import"./chunk-KGSNJ2CQ.js";import{c as ae,k as R}from"./chunk-FDSWRZNB.js";import"./chunk-SZQ7ZDJA.js";import"./chunk-7B3YDHVE.js";import"./chunk-7YYW5QLQ.js";import{a as s,c as b,f as D}from"./chunk-7C4RO2MU.js";import{D as _,E as a,I as F,M as T,_ as l,a as u,aa as f,b as h,h as y,j as c}from"./chunk-PVUPW5TC.js";import{b as me}from"./chunk-FW4363Y4.js";var w={extension:{type:u.Environment,name:"browser",priority:-1},test:()=>!0,load:async()=>{await import("./browserAll-WSKPRGUE.js")}};var I={extension:{type:u.Environment,name:"webworker",priority:0},test:()=>typeof self<"u"&&self.WorkerGlobalScope!==void 0,load:async()=>{await import("./webworkerAll-LXLLI2P2.js")}};var P;function L(t){return P!==void 0||(P=(()=>{let e={stencil:!0,failIfMajorPerformanceCaveat:t??b.defaultOptions.failIfMajorPerformanceCaveat};try{if(!T.get().getWebGLRenderingContext())return!1;let o=T.get().createCanvas().getContext("webgl",e),p=!!o?.getContextAttributes()?.stencil;if(o){let i=o.getExtension("WEBGL_lose_context");i&&i.loseContext()}return o=null,p}catch{return!1}})()),P}var B;async function z(t={}){return B!==void 0||(B=await(async()=>{let e=T.get().getNavigator().gpu;if(!e)return!1;try{return await(await e.requestAdapter(t)).requestDevice(),!0}catch{return!1}})()),B}var k=["webgl","webgpu","canvas"];async function V(t){let e=[];t.preference?(e.push(t.preference),k.forEach(i=>{i!==t.preference&&e.push(i)})):e=k.slice();let r,o={};for(let i=0;i<e.length;i++){let n=e[i];if(n==="webgpu"&&await z()){let{WebGPURenderer:m}=await import("./WebGPURenderer-JZXG24T2.js");r=m,o={...t,...t.webgpu};break}else if(n==="webgl"&&L(t.failIfMajorPerformanceCaveat??b.defaultOptions.failIfMajorPerformanceCaveat)){let{WebGLRenderer:m}=await import("./WebGLRenderer-FVT5ZJ7G.js");r=m,o={...t,...t.webgl};break}else if(n==="canvas")throw o={...t},new Error("CanvasRenderer is not yet implemented")}if(delete o.webgpu,delete o.webgl,!r)throw new Error("No available renderer for the current environment");let p=new r;return await p.init(o),p}var W=class O{constructor(...e){this.stage=new F,e[0]!==void 0&&c(y,"Application constructor options are deprecated, please use Application.init() instead.")}async init(e){e={...e},this.renderer=await V(e),O._plugins.forEach(r=>{r.init.call(this,e)})}render(){this.renderer.render({container:this.stage})}get canvas(){return this.renderer.canvas}get view(){return c(y,"Application.view is deprecated, please use Application.canvas instead."),this.renderer.canvas}get screen(){return this.renderer.screen}destroy(e=!1,r=!1){let o=O._plugins.slice(0);o.reverse(),o.forEach(p=>{p.destroy.call(this)}),this.stage.destroy(r),this.stage=null,this.renderer.destroy(e),this.renderer=null}};W._plugins=[];var A=W;h.handleByList(u.Application,A._plugins);h.add(D);var le=me(ae(),1);h.add(w,I);var d=`in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`;var g=`struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

struct VSOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv : vec2<f32>
  };

fn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

fn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>
{
  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  
}

fn getSize() -> vec2<f32>
{
  return gfu.uGlobalFrame.zw;
}
  
@vertex
fn mainVertex(
  @location(0) aPosition : vec2<f32>, 
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}`;var N=`
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uOffset;

void main(void)
{
    vec4 color = vec4(0.0);

    // Sample top left pixel
    color += texture(uTexture, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y));

    // Sample top right pixel
    color += texture(uTexture, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y));

    // Sample bottom right pixel
    color += texture(uTexture, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y));

    // Sample bottom left pixel
    color += texture(uTexture, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y));

    // Average
    color *= 0.25;

    finalColor = color;
}`;var H=`struct KawaseBlurUniforms {
  uOffset:vec2<f32>,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> kawaseBlurUniforms : KawaseBlurUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uOffset = kawaseBlurUniforms.uOffset;
  var color: vec4<f32> = vec4<f32>(0.0);

  // Sample top left pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x - uOffset.x, uv.y + uOffset.y));
  // Sample top right pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x + uOffset.x, uv.y + uOffset.y));
  // Sample bottom right pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x + uOffset.x, uv.y - uOffset.y));
  // Sample bottom left pixel
  color += textureSample(uTexture, uSampler, vec2<f32>(uv.x - uOffset.x, uv.y - uOffset.y));
  // Average
  color *= 0.25;

  return color;
}`;var q=`
precision highp float;
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform vec2 uOffset;

uniform vec4 uInputClamp;

void main(void)
{
    vec4 color = vec4(0.0);

    // Sample top left pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Sample top right pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Sample bottom right pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Sample bottom left pixel
    color += texture(uTexture, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), uInputClamp.xy, uInputClamp.zw));

    // Average
    color *= 0.25;

    finalColor = color;
}
`;var X=`struct KawaseBlurUniforms {
  uOffset:vec2<f32>,
};

struct GlobalFilterUniforms {
  uInputSize:vec4<f32>,
  uInputPixel:vec4<f32>,
  uInputClamp:vec4<f32>,
  uOutputFrame:vec4<f32>,
  uGlobalFrame:vec4<f32>,
  uOutputTexture:vec4<f32>,
};

@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> kawaseBlurUniforms : KawaseBlurUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let uOffset = kawaseBlurUniforms.uOffset;
  var color: vec4<f32> = vec4(0.0);

  // Sample top left pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x - uOffset.x, uv.y + uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Sample top right pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x + uOffset.x, uv.y + uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Sample bottom right pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x + uOffset.x, uv.y - uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Sample bottom left pixel
  color += textureSample(uTexture, uSampler, clamp(vec2<f32>(uv.x - uOffset.x, uv.y - uOffset.y), gfu.uInputClamp.xy, gfu.uInputClamp.zw));
  // Average
  color *= 0.25;
    
  return color;
}`;var fe=Object.defineProperty,se=(t,e,r)=>e in t?fe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,x=(t,e,r)=>(se(t,typeof e!="symbol"?e+"":e,r),r),K=class Y extends s{constructor(...e){let r=e[0]??{};(typeof r=="number"||Array.isArray(r))&&(c("6.0.0","KawaseBlurFilter constructor params are now options object. See params: { strength, quality, clamp, pixelSize }"),r={strength:r},e[1]!==void 0&&(r.quality=e[1]),e[2]!==void 0&&(r.clamp=e[2])),r={...Y.DEFAULT_OPTIONS,...r};let o=f.from({vertex:{source:g,entryPoint:"mainVertex"},fragment:{source:r?.clamp?X:H,entryPoint:"mainFragment"}}),p=l.from({vertex:d,fragment:r?.clamp?q:N,name:"kawase-blur-filter"});super({gpuProgram:o,glProgram:p,resources:{kawaseBlurUniforms:{uOffset:{value:new Float32Array(2),type:"vec2<f32>"}}}}),x(this,"uniforms"),x(this,"_pixelSize",{x:0,y:0}),x(this,"_clamp"),x(this,"_kernels",[]),x(this,"_blur"),x(this,"_quality"),this.uniforms=this.resources.kawaseBlurUniforms.uniforms,this.pixelSize=r.pixelSize??{x:1,y:1},Array.isArray(r.strength)?this.kernels=r.strength:typeof r.strength=="number"&&(this._blur=r.strength,this.quality=r.quality??3),this._clamp=!!r.clamp}apply(e,r,o,p){let i=this.pixelSizeX/r.source.width,n=this.pixelSizeY/r.source.height,m;if(this._quality===1||this._blur===0)m=this._kernels[0]+.5,this.uniforms.uOffset[0]=m*i,this.uniforms.uOffset[1]=m*n,e.applyFilter(this,r,o,p);else{let U=a.getSameSizeTexture(r),v=r,G=U,M,E=this._quality-1;for(let C=0;C<E;C++)m=this._kernels[C]+.5,this.uniforms.uOffset[0]=m*i,this.uniforms.uOffset[1]=m*n,e.applyFilter(this,v,G,!0),M=v,v=G,G=M;m=this._kernels[E]+.5,this.uniforms.uOffset[0]=m*i,this.uniforms.uOffset[1]=m*n,e.applyFilter(this,v,o,p),a.returnTexture(U)}}get strength(){return this._blur}set strength(e){this._blur=e,this._generateKernels()}get quality(){return this._quality}set quality(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()}get kernels(){return this._kernels}set kernels(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max(...e)):(this._kernels=[0],this._quality=1)}get pixelSize(){return this._pixelSize}set pixelSize(e){if(typeof e=="number"){this.pixelSizeX=this.pixelSizeY=e;return}if(Array.isArray(e)){this.pixelSizeX=e[0],this.pixelSizeY=e[1];return}this._pixelSize=e}get pixelSizeX(){return this.pixelSize.x}set pixelSizeX(e){this.pixelSize.x=e}get pixelSizeY(){return this.pixelSize.y}set pixelSizeY(e){this.pixelSize.y=e}get clamp(){return this._clamp}_updatePadding(){this.padding=Math.ceil(this._kernels.reduce((e,r)=>e+r+.5,0))}_generateKernels(){let e=this._blur,r=this._quality,o=[e];if(e>0){let p=e,i=e/r;for(let n=1;n<r;n++)p-=i,o.push(p)}this._kernels=o,this._updatePadding()}};x(K,"DEFAULT_OPTIONS",{strength:4,quality:3,clamp:!1,pixelSize:{x:1,y:1}});var j=K;var Q=`in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform sampler2D uMapTexture;
uniform float uBloomScale;
uniform float uBrightness;

void main() {
    vec4 color = texture(uTexture, vTextureCoord);
    color.rgb *= uBrightness;
    vec4 bloomColor = vec4(texture(uMapTexture, vTextureCoord).rgb, 0.0);
    bloomColor.rgb *= uBloomScale;
    finalColor = color + bloomColor;
}
`;var Z=`struct AdvancedBloomUniforms {
  uBloomScale: f32,
  uBrightness: f32,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> advancedBloomUniforms : AdvancedBloomUniforms;
@group(1) @binding(1) var uMapTexture: texture_2d<f32>;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  var color = textureSample(uTexture, uSampler, uv);
  color = vec4<f32>(color.rgb * advancedBloomUniforms.uBrightness, color.a);

  var bloomColor = vec4<f32>(textureSample(uMapTexture, uSampler, uv).rgb, 0.0);
  bloomColor = vec4<f32>(bloomColor.rgb * advancedBloomUniforms.uBloomScale, bloomColor.a);
  
  return color + bloomColor;
}
`;var J=`
in vec2 vTextureCoord;
out vec4 finalColor;

uniform sampler2D uTexture;
uniform float uThreshold;

void main() {
    vec4 color = texture(uTexture, vTextureCoord);

    // A simple & fast algorithm for getting brightness.
    // It's inaccuracy , but good enought for this feature.
    float _max = max(max(color.r, color.g), color.b);
    float _min = min(min(color.r, color.g), color.b);
    float brightness = (_max + _min) * 0.5;

    if(brightness > uThreshold) {
        finalColor = color;
    } else {
        finalColor = vec4(0.0, 0.0, 0.0, 0.0);
    }
}
`;var $=`struct ExtractBrightnessUniforms {
  uThreshold: f32,
};

@group(0) @binding(1) var uTexture: texture_2d<f32>; 
@group(0) @binding(2) var uSampler: sampler;
@group(1) @binding(0) var<uniform> extractBrightnessUniforms : ExtractBrightnessUniforms;

@fragment
fn mainFragment(
  @builtin(position) position: vec4<f32>,
  @location(0) uv : vec2<f32>
) -> @location(0) vec4<f32> {
  let color: vec4<f32> = textureSample(uTexture, uSampler, uv);

  // A simple & fast algorithm for getting brightness.
  // It's inaccurate, but good enough for this feature.
  let max: f32 = max(max(color.r, color.g), color.b);
  let min: f32 = min(min(color.r, color.g), color.b);
  let brightness: f32 = (max + min) * 0.5;

  return select(vec4<f32>(0.), color, brightness > extractBrightnessUniforms.uThreshold);
}
`;var xe=Object.defineProperty,ue=(t,e,r)=>e in t?xe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,ee=(t,e,r)=>(ue(t,typeof e!="symbol"?e+"":e,r),r),re=class te extends s{constructor(e){e={...te.DEFAULT_OPTIONS,...e};let r=f.from({vertex:{source:g,entryPoint:"mainVertex"},fragment:{source:$,entryPoint:"mainFragment"}}),o=l.from({vertex:d,fragment:J,name:"extract-brightness-filter"});super({gpuProgram:r,glProgram:o,resources:{extractBrightnessUniforms:{uThreshold:{value:e.threshold,type:"f32"}}}}),ee(this,"uniforms"),this.uniforms=this.resources.extractBrightnessUniforms.uniforms}get threshold(){return this.uniforms.uThreshold}set threshold(e){this.uniforms.uThreshold=e}};ee(re,"DEFAULT_OPTIONS",{threshold:.5});var oe=re;var ce=Object.defineProperty,de=(t,e,r)=>e in t?ce(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,S=(t,e,r)=>(de(t,typeof e!="symbol"?e+"":e,r),r),ie=class pe extends s{constructor(e){e={...pe.DEFAULT_OPTIONS,...e};let r=f.from({vertex:{source:g,entryPoint:"mainVertex"},fragment:{source:Z,entryPoint:"mainFragment"}}),o=l.from({vertex:d,fragment:Q,name:"advanced-bloom-filter"});super({gpuProgram:r,glProgram:o,resources:{advancedBloomUniforms:{uBloomScale:{value:e.bloomScale,type:"f32"},uBrightness:{value:e.brightness,type:"f32"}},uMapTexture:_.WHITE}}),S(this,"uniforms"),S(this,"bloomScale",1),S(this,"brightness",1),S(this,"_extractFilter"),S(this,"_blurFilter"),this.uniforms=this.resources.advancedBloomUniforms.uniforms,this._extractFilter=new oe({threshold:e.threshold}),this._blurFilter=new j({strength:e.kernels??e.blur,quality:e.kernels?void 0:e.quality}),Object.assign(this,e)}apply(e,r,o,p){let i=a.getSameSizeTexture(r);this._extractFilter.apply(e,r,i,!0);let n=a.getSameSizeTexture(r);this._blurFilter.apply(e,i,n,!0),this.uniforms.uBloomScale=this.bloomScale,this.uniforms.uBrightness=this.brightness,this.resources.uMapTexture=n.source,e.applyFilter(this,r,o,p),a.returnTexture(n),a.returnTexture(i)}get threshold(){return this._extractFilter.threshold}set threshold(e){this._extractFilter.threshold=e}get kernels(){return this._blurFilter.kernels}set kernels(e){this._blurFilter.kernels=e}get blur(){return this._blurFilter.strength}set blur(e){this._blurFilter.strength=e}get quality(){return this._blurFilter.quality}set quality(e){this._blurFilter.quality=e}get pixelSize(){return this._blurFilter.pixelSize}set pixelSize(e){typeof e=="number"&&(e={x:e,y:e}),Array.isArray(e)&&(e={x:e[0],y:e[1]}),this._blurFilter.pixelSize=e}get pixelSizeX(){return this._blurFilter.pixelSizeX}set pixelSizeX(e){this._blurFilter.pixelSizeX=e}get pixelSizeY(){return this._blurFilter.pixelSizeY}set pixelSizeY(e){this._blurFilter.pixelSizeY=e}};S(ie,"DEFAULT_OPTIONS",{threshold:.5,bloomScale:1,brightness:1,blur:8,quality:4,pixelSize:{x:1,y:1}});var ne=ie;export{ne as AdvancedBloomFilter,A as Application,F as Container,R as Graphics};
//# sourceMappingURL=pixi.js.map
