# Typescript Option

Rust options for typescript

## ⚙️ Installation

Here i'm using `pnpm` but you can use any package manager you prefer.

```bash
$ pnpm i typescript-option -S
```

## 🛠️ Api

> ❓ Helper functions to help you deal with options

- **wrap**
- **some**
- **none**

### Option

> ⚡ All functions you can call on an option

- **unwrap**
- **unwrap_or**
- **unwrap_or_else**
- **run**
- **transform**
- **map**
- **map_or**
- **map_or_else**

## 📖 Types

> 📌 All types available

- **Option<T>**
- **Some<T>**
- **None**

## 🎯 Features

> 🚀 **Checkout some [examples](#examples)**

- **[wrap](#api)**: Wraps any value in an [`Option<T>`](#types)
- **[some](#api)**: Checks if any value is [`Some<T>`](#types)
- **[none](#api)**: Checks if any value is [`None`](#types)

- **[unwrap](#api)**: Unwraps an [`Option<T>`](#types) into either `T` or `false`
- **[unwrap_or](#api)**: Uwraps an [`Option<T>`](#types) into `T` or, a default value `T`
- **[unwrap_or_else](#api)**: Uwraps an [`Option<T>`](#types) into `T` or, a default function that returns `T`
- **[run](#api)**: Used to call functions that use an [`Option<T>`](#types)
- **[transform](#api)**: Used to call functions that will apply a transformation to an [`Option<T>`](#types)
- **[map](#api)**: Used to call functions that takes the internal type of an [`Option<T>`](#types) and returns an [`Option<U>`](#types)
- **[map_or](#api)**: Used to call functions that takes the internal type of an [`Option<T>`](#types) and returns an [`Option<U>`](#types) or return `U`, if [`Option<T>`](#types) was [`None`](#types)
- **[map_or](#api)**: Used to call functions that takes the internal type of an [`Option<T>`](#types) and returns an [`Option<U>`](#types) or call an funtion returning `U`, if [`Option<T>`](#types) was [`None`](#types)

- **[Option](#types)**: A type to that represent either the existance of something or nothing
- **[Some](#types)**: A type to that represent some value
- **[None](#types)**: A type to that represent nothing

## Examples

```ts
function getUserPlan(userId: string): Option<UserPlan> { ... }

function getJwtPayload(token: string): Option<JwtPayload> { ... }

const token = wrap(cookies.get("access-token"))

const plan = token
    .map(getJwtPayload)
    .map((payload) => getUserPlan(payload.userId))
    .run(sendUserPlanEmail)
    .unwrap()

// Plan will be either Some<UserPlan> or None

```
