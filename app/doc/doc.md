# Next.js 16 - Cache Components & API

## 1. Ativar Cache Components no Next Config

No arquivo `next.config.ts`, adicione a propriedade `cacheComponents: true`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
};

export default nextConfig;
```

## 2. Criar uma API Current Time

Crie o arquivo `app/api/current-time/route.ts`:

```typescript
import { NextResponse } from "next/server";

export async function GET() {
  const currentTime = new Date().toISOString();
  return NextResponse.json({ time: currentTime });
}
```

## 3. Criar pasta HTTP com funções de exemplo

Crie o arquivo `app/http/fetch-current-time.ts`:

```typescript
import { BASE_URL } from "../const/base-url";

export async function fetchCurrentTimeNoCache() {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data.time;
}

export async function fetchCurrentTimeWithUseCache() {
  "use cache";

  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data.time;
}
```

## Cache Durations - Quando usar cada tempo

| Duração     | Caso de uso            | Exemplo                       |
| ----------- | ---------------------- | ----------------------------- |
| **seconds** | Real-time data         | Stock prices, live scores     |
| **minutes** | Frequently updated     | Social feeds, news            |
| **hours**   | Multiple daily updates | Product inventory, weather    |
| **days**    | Daily updates          | Blog posts, articles          |
| **weeks**   | Weekly updates         | Podcasts, newsletters         |
| **max**     | Rarely changes         | Legal pages, archived content |

## Como usar o cache com duração

```typescript
export async function fetchData() {
  "use cache";

  const response = await fetch(URL);
  const data = await response.json();
  return data;
}
```

## ⚠️ Importante: Uso correto do Suspense

**Problema comum**: Fazer o `await` no componente pai e passar os dados já resolvidos para dentro do `<Suspense>`.

```typescript
// ❌ ERRADO - Não funciona no Next.js 15+
export default async function Home() {
  const data = await fetchData(); // await FORA do Suspense

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component data={data} /> {/* dados já resolvidos */}
    </Suspense>
  );
}
```

**Solução**: O fetch assíncrono precisa acontecer **dentro** do componente que está envolvido pelo Suspense.

```typescript
// ✅ CORRETO - Fetch dentro do componente envolvido por Suspense
async function DataComponent() {
  const data = await fetchData(); // await DENTRO do componente
  return <Component data={data} />;
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DataComponent /> {/* componente assíncrono */}
    </Suspense>
  );
}
```

**Por quê?** O Next.js 15+ precisa que o fetch assíncrono aconteça dentro do componente envolvido pelo Suspense para fazer o streaming correto e mostrar o fallback enquanto os dados estão sendo carregados.
