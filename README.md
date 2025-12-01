# Next.js 16 - Cache Components & API

## 📋 Índice

1. [Configuração Inicial](#1-ativar-cache-components-no-next-config)
2. [API Current Time](#2-criar-uma-api-current-time)
3. [Funções HTTP](#3-criar-pasta-http-com-funções-de-exemplo)
4. [Cache Durations](#cache-durations---quando-usar-cada-tempo)
5. [Uso Correto do Suspense](#️-importante-uso-correto-do-suspense)
6. [Cache Tag e Revalidação](#-cache-tag-e-revalidação)
7. [Cache Privado com Cookies](#-cache-privado-com-cookies)
8. [Server Actions](#-server-actions)

---

## 1. Ativar Cache Components no Next Config

No arquivo `next.config.ts`, adicione a propriedade `cacheComponents: true`:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
}

export default nextConfig
```

## 2. Criar uma API Current Time

Crie o arquivo `app/api/current-time/route.ts`:

```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  const currentTime = new Date().toISOString()
  return NextResponse.json({ time: currentTime })
}
```

## 3. Criar pasta HTTP com funções de exemplo

Crie o arquivo `app/http/fetch-current-time.ts`:

```typescript
import { cacheLife, cacheTag } from 'next/cache'
import { BASE_URL } from '../const/base-url'

// 1️⃣ Sem cache - sempre busca dados novos
export async function fetchCurrentTimeNoCache() {
  const response = await fetch(BASE_URL)
  const data = await response.json()
  return data.time
}

// 2️⃣ Com cache padrão - 15 minutos
export async function fetchCurrentTimeWithUseCache() {
  'use cache'

  const response = await fetch(BASE_URL)
  const data = await response.json()
  return data.time
}

// 3️⃣ Com cache e duração customizada
export async function fetchCurrentTimeWithUseCacheAndCacheLife() {
  'use cache'
  cacheLife('days') // pode ser: seconds, minutes, hours, days, weeks, max

  const response = await fetch(BASE_URL)
  const data = await response.json()
  return data.time
}

// 4️⃣ Com cache tag - permite invalidação manual
export async function fetchCurrentTimeWithUseCacheAndCacheTag() {
  'use cache'
  cacheTag('current-time')

  const response = await fetch(BASE_URL)
  const data = await response.json()
  return data.time
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

**Padrão**: Sem especificar `cacheLife()`, o cache dura **15 minutos**.

---

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

---

## 🏷️ Cache Tag e Revalidação

### O que é Cache Tag?

Cache Tags permitem **invalidar o cache manualmente** quando você precisa atualizar dados específicos, sem esperar o tempo de expiração.

### Como usar

**1. Adicione a tag na função com cache:**

```typescript
import { cacheTag } from 'next/cache'

export async function fetchCurrentTimeWithUseCacheAndCacheTag() {
  'use cache'
  cacheTag('current-time') // identifica este cache

  const response = await fetch(BASE_URL)
  const data = await response.json()
  return data.time
}
```

**2. Crie uma Server Action para invalidar:**

```typescript
'use server'

import { updateTag } from 'next/cache'

export async function onUpdateCurrentTag() {
  updateTag('current-time') // invalida o cache com esta tag
}
```

**3. Use em um botão:**

```typescript
import UpdateCurrentTimeButton from './components/ui/update-current-time-button'

<UpdateCurrentTimeButton />
```

**Componente do botão:**

```typescript
'use client'

import { onUpdateCurrentTag } from '@/app/actions/on-update-current-tag-action'

export default function UpdateCurrentTimeButton() {
  return (
    <form action={onUpdateCurrentTag}>
      <button type="submit">Atualizar Cache</button>
    </form>
  )
}
```

### Quando usar Cache Tags?

- ✅ Dados que mudam raramente, mas precisam de atualização imediata quando necessário
- ✅ Catálogos de produtos que são atualizados manualmente
- ✅ Conteúdo CMS que pode ser republicado a qualquer momento
- ❌ Não use para dados que mudam frequentemente (use `cacheLife` menor)

---

## 🔒 Cache Privado com Cookies

O Next.js 16 permite cache **privado por usuário** usando `'use cache: private'`. Útil para dados específicos do usuário que não devem ser compartilhados.

### Como usar

**1. Crie função com cache privado:**

```typescript
import { cookies } from 'next/headers'

export async function GetUserCookies() {
  'use cache: private' // cache é isolado por usuário

  const data = await cookies()
  const dateCookie = data.get('date')
  return dateCookie?.value || 'Sem cookie'
}
```

**2. Server Action para atualizar cookie:**

```typescript
'use server'

import { cookies } from 'next/headers'

export async function onUpdateCookies() {
  const cookiesStorage = await cookies()
  cookiesStorage.set('date', new Date().toISOString())
}
```

**3. Componente que exibe e atualiza:**

```typescript
import { Suspense } from 'react'
import { GetUserCookies } from './components/fetchers/current-time-fetchers'
import UpdateCookies from './components/ui/update-cookies-button'

<Suspense fallback={<div>Loading cookies...</div>}>
  <div>
    <GetUserCookies />
    <UpdateCookies />
  </div>
</Suspense>
```

### Diferença: Cache Normal vs Cache Privado

| Tipo        | Diretiva               | Compartilhamento                      | Uso                                     |
| ----------- | ---------------------- | ------------------------------------- | --------------------------------------- |
| **Normal**  | `'use cache'`          | Compartilhado entre todos os usuários | Dados públicos (produtos, posts)        |
| **Privado** | `'use cache: private'` | Isolado por usuário                   | Dados do usuário (preferências, sessão) |

---

## 🎯 Server Actions

Server Actions são funções que rodam no servidor e podem ser chamadas diretamente de componentes cliente.

### Estrutura básica

**Action (servidor):**

```typescript
'use server'

export async function myAction() {
  // lógica no servidor
  console.log('Executando no servidor')
}
```

**Botão (cliente):**

```typescript
'use client'

import { myAction } from '@/app/actions/my-action'

export default function MyButton() {
  return (
    <form action={myAction}>
      <button type="submit">Executar</button>
    </form>
  )
}
```

### ⚠️ Importante

- **Server Actions** devem ter `'use server'` no topo do arquivo
- **Componentes que usam formulários** devem ter `'use client'`
- Use `type="submit"` nos botões de formulário
- Actions podem ser passadas via prop `action` do `<form>`

---

## 📂 Estrutura do Projeto

```
app/
├── actions/                    # Server Actions
│   ├── cookies-action.ts
│   ├── on-update-current-tag-action.ts
│   └── on-update-cookies-action.ts
├── api/
│   └── current-time/
│       └── route.ts           # API Route
├── components/
│   ├── fetchers/
│   │   └── current-time-fetchers.tsx  # Componentes com fetch
│   └── ui/
│       ├── card-current-time.tsx
│       ├── set-cookies-button.tsx
│       ├── update-cookies-button.tsx
│       └── update-current-time-button.tsx
├── const/
│   └── base-url.ts
├── doc/
│   └── doc.md                 # Esta documentação
├── http/
│   └── fetch-current-time.ts  # Funções de fetch
└── page.tsx                   # Página principal
```

---

## 🚀 Resumo Rápido

| Feature               | Código                              | Uso                      |
| --------------------- | ----------------------------------- | ------------------------ |
| **Sem cache**         | (nada)                              | Dados sempre atualizados |
| **Cache padrão**      | `'use cache'`                       | 15 minutos               |
| **Cache com duração** | `'use cache'` + `cacheLife('days')` | Controle de tempo        |
| **Cache com tag**     | `'use cache'` + `cacheTag('tag')`   | Invalidação manual       |
| **Cache privado**     | `'use cache: private'`              | Por usuário              |
| **Invalidar cache**   | `updateTag('tag')`                  | Em Server Action         |
| **Server Action**     | `'use server'`                      | Lógica no servidor       |
| **Client Component**  | `'use client'`                      | Interatividade           |
