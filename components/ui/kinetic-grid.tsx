"use client";

import { useEffect, useRef, useCallback, ReactNode } from "react";
import { cn } from "@/lib/utils";

const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;

uniform vec2  u_resolution;
uniform vec2  u_mouse;
uniform float u_time;
uniform vec2  u_ripple0;
uniform float u_ripple0_age;
uniform vec2  u_ripple1;
uniform float u_ripple1_age;
uniform vec2  u_ripple2;
uniform float u_ripple2_age;

#define CELL       55.0
#define DOT_R      1.8
#define DOT_R_ACT  3.2
#define INFL       0.38
#define WARP       22.0
#define RIPPLE_SPD 400.0

float sdSeg(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  return length(pa - ba * clamp(dot(pa,ba)/dot(ba,ba), 0.0, 1.0));
}

vec2 rippleD(vec2 wp, vec2 c, float age) {
  if (age < 0.0) return vec2(0.0);
  float radius = age * RIPPLE_SPD;
  float op = max(0.0, 1.0 - age * 1.2);
  vec2 d = wp - c;
  float dist = length(d);
  float diff = dist - radius;
  if (abs(diff) > 55.0 || op <= 0.0 || dist < 0.001) return vec2(0.0);
  float str = (1.0 - abs(diff)/55.0) * op * 18.0;
  float sgn = diff < 0.0 ? -1.0 : 1.0;
  return -normalize(d) * str * sgn;
}

vec2 warpPt(vec2 gp, vec2 mpx, float infl,
            vec2 c0, float a0, vec2 c1, float a1, vec2 c2, float a2) {
  vec2 d = gp - mpx;
  float dist = length(d);
  float prox = max(0.0, 1.0 - dist / infl);
  vec2 w = vec2(0.0);
  if (dist < infl && dist > 0.001) {
    float t = dist / infl;
    float e = (1.0-t)*(1.0-t) * min(1.0, dist/60.0);
    w = -normalize(d) * e * WARP * prox;
  }
  vec2 rip = rippleD(gp,c0,a0) + rippleD(gp,c1,a1) + rippleD(gp,c2,a2);
  return gp + w + rip * prox;
}

void main() {
  vec2 fc  = gl_FragCoord.xy;
  vec2 res = u_resolution;

  vec2 mpx = vec2(u_mouse.x * res.x, res.y - u_mouse.y * res.y);
  float infl = min(res.x, res.y) * INFL;

  vec2 c0 = vec2(u_ripple0.x * res.x, res.y - u_ripple0.y * res.y);
  vec2 c1 = vec2(u_ripple1.x * res.x, res.y - u_ripple1.y * res.y);
  vec2 c2 = vec2(u_ripple2.x * res.x, res.y - u_ripple2.y * res.y);

  vec3 col = vec3(0.086, 0.086, 0.094);

  vec2 uv = fc / res;
  float vig = pow(uv.x*(1.0-uv.x)*uv.y*(1.0-uv.y)*16.0, 0.4);
  col *= mix(0.6, 1.0, vig);

  vec2 dc = mod(fc, 28.0);
  if (length(dc - 14.0) < 0.7) col = mix(col, vec3(1.0), 0.02);

  float cellW = CELL;
  float cellH = CELL;
  float gx = floor(fc.x / cellW);
  float gy = floor(fc.y / cellH);

  float lineA = 0.0;
  float dotA  = 0.0;
  vec3  lineC = vec3(1.0);
  vec3  dotC  = vec3(1.0);

  for (float ddc = 0.0; ddc <= 1.0; ddc += 1.0) {
    for (float ddr = 0.0; ddr <= 1.0; ddr += 1.0) {
      float cx = gx + ddc;
      float cy = gy + ddr;

      vec2 p00 = vec2(cx       * cellW, cy       * cellH);
      vec2 p10 = vec2((cx+1.0) * cellW, cy       * cellH);
      vec2 p01 = vec2(cx       * cellW, (cy+1.0) * cellH);

      float pr00 = max(0.0, 1.0 - length(p00 - mpx) / infl);
      float pr10 = max(0.0, 1.0 - length(p10 - mpx) / infl);
      float pr01 = max(0.0, 1.0 - length(p01 - mpx) / infl);

      vec2 w00 = warpPt(p00, mpx, infl, c0,u_ripple0_age, c1,u_ripple1_age, c2,u_ripple2_age);
      vec2 w10 = warpPt(p10, mpx, infl, c0,u_ripple0_age, c1,u_ripple1_age, c2,u_ripple2_age);
      vec2 w01 = warpPt(p01, mpx, infl, c0,u_ripple0_age, c1,u_ripple1_age, c2,u_ripple2_age);

      float dH = sdSeg(fc, w00, w10);
      float tH = smoothstep(1.5, 0.0, dH);
      if (tH > 0.001) {
        float pr = (pr00 + pr10) * 0.5;
        float sm = pr*pr*(3.0-2.0*pr);
        lineA = max(lineA, tH * mix(0.04, 0.45, sm));
        lineC = mix(lineC, mix(vec3(1.0), vec3(0.29,0.62,1.0), sm), tH*sm);
      }

      float dV = sdSeg(fc, w00, w01);
      float tV = smoothstep(1.5, 0.0, dV);
      if (tV > 0.001) {
        float pr = (pr00 + pr01) * 0.5;
        float sm = pr*pr*(3.0-2.0*pr);
        lineA = max(lineA, tV * mix(0.04, 0.45, sm));
        lineC = mix(lineC, mix(vec3(1.0), vec3(0.29,0.62,1.0), sm), tV*sm);
      }

      float dD = length(fc - w00);
      float rr = mix(DOT_R, DOT_R_ACT, pr00*pr00);
      float tD = smoothstep(rr+1.5, rr-0.5, dD);
      if (tD > 0.001) {
        float sm = pr00*pr00*(3.0-2.0*pr00);
        dotA = max(dotA, tD);
        dotC = mix(vec3(1.0), vec3(0.29,0.62,1.0), sm);
        if (sm > 0.3) {
          float gr = rr + mix(0.0, 6.0, (sm-0.3)/0.7);
          float gT = smoothstep(gr, rr, dD) * sm * 0.25;
          col = mix(col, vec3(0.29,0.62,1.0), gT);
        }
      }
    }
  }

  if (u_ripple0_age >= 0.0) {
    float rr = u_ripple0_age * RIPPLE_SPD;
    float ro = max(0.0, 1.0 - u_ripple0_age * 1.2);
    float rt = smoothstep(2.0, 0.0, abs(length(fc - c0) - rr)) * ro * 0.2;
    col = mix(col, vec3(0.29,0.62,1.0), rt);
  }
  if (u_ripple1_age >= 0.0) {
    float rr = u_ripple1_age * RIPPLE_SPD;
    float ro = max(0.0, 1.0 - u_ripple1_age * 1.2);
    float rt = smoothstep(2.0, 0.0, abs(length(fc - c1) - rr)) * ro * 0.2;
    col = mix(col, vec3(0.29,0.62,1.0), rt);
  }
  if (u_ripple2_age >= 0.0) {
    float rr = u_ripple2_age * RIPPLE_SPD;
    float ro = max(0.0, 1.0 - u_ripple2_age * 1.2);
    float rt = smoothstep(2.0, 0.0, abs(length(fc - c2) - rr)) * ro * 0.2;
    col = mix(col, vec3(0.29,0.62,1.0), rt);
  }

  col = mix(col, lineC, lineA);
  col = mix(col, dotC, dotA * mix(0.06, 0.55, dotA));

  gl_FragColor = vec4(col, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function createProgram(gl: WebGLRenderingContext) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, VERT);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(prog));
    return null;
  }
  return prog;
}

interface Ripple { x: number; y: number; born: number }

export default function KineticGrid({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const mouseRef   = useRef({ x: -9999, y: -9999 });
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef     = useRef<number>(0);
  const startRef   = useRef<number>(performance.now());
  const glRef      = useRef<WebGLRenderingContext | null>(null);
  const progRef    = useRef<WebGLProgram | null>(null);

  const animate = useCallback(() => {
    const gl   = glRef.current;
    const prog = progRef.current;
    const canvas = canvasRef.current;
    if (!gl || !prog || !canvas) return;

    const now = performance.now();
    const t   = (now - startRef.current) / 1000;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(prog);

    const loc = (n: string) => gl.getUniformLocation(prog, n);

    const mx = mouseRef.current.x < 0 ? -1 : mouseRef.current.x / canvas.width;
    const my = mouseRef.current.y < 0 ? -1 : mouseRef.current.y / canvas.height;

    gl.uniform2f(loc("u_resolution"), canvas.width, canvas.height);
    gl.uniform2f(loc("u_mouse"), mx, my);
    gl.uniform1f(loc("u_time"), t);

    const rips = ripplesRef.current;
    // clean expired
    for (let i = rips.length - 1; i >= 0; i--) {
      if ((now - rips[i].born) / 1000 > 1.2) rips.splice(i, 1);
    }

    for (let i = 0; i < 3; i++) {
      const r   = rips[i];
      const age = r ? (now - r.born) / 1000 : -1;
      gl.uniform2f(loc(`u_ripple${i}`), r ? r.x / canvas.width : 0, r ? r.y / canvas.height : 0);
      gl.uniform1f(loc(`u_ripple${i}_age`), age);
    }

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) { canvas.style.background = "#161618"; return; }
    glRef.current = gl;

    const prog = createProgram(gl);
    if (!prog) return;
    progRef.current = prog;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove  = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onClick = (e: MouseEvent) => {
      const rips = ripplesRef.current;
      if (rips.length >= 3) rips.shift();
      rips.push({ x: e.clientX, y: e.clientY, born: performance.now() });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, [animate]);

  return (
    <div className={cn("relative w-full min-h-screen overflow-hidden bg-[#161618]", className)}>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}
