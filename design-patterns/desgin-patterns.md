# Design Patterns 🎨

A complete guide to the 6 most important design patterns for LLD interviews, with React + TypeScript examples.

---

## Table of Contents
1. [Singleton](#1-singleton)
2. [Factory](#2-factory)
3. [Builder](#3-builder)
4. [Observer](#4-observer)
5. [Strategy](#5-strategy)
6. [Decorator](#6-decorator)

---

## 1. Singleton

> **One instance, global access.**

A class that has only ONE instance throughout the entire application and provides a global access point to it.

### Key ingredients:
- `private static instance` — holds the single instance
- `private constructor` — blocks `new Class()` from outside
- `static getInstance()` — only way to get the instance

### Example — CartStore:

```ts
class CartStore {
  private static instance: CartStore
  private items: CartItem[] = []

  private constructor() {}

  static getInstance(): CartStore {
    if (!CartStore.instance) {
      CartStore.instance = new CartStore()
    }
    return CartStore.instance
  }

  addItem(item: CartItem) { this.items.push(item) }
  getItems(): CartItem[] { return this.items }
}

// Always returns same instance ✅
const cart1 = CartStore.getInstance()
const cart2 = CartStore.getInstance()
console.log(cart1 === cart2) // true
```

### Real world usage:
- Angular services (one instance shared across app)
- Redux store
- CartStore, AuthStore, ThemeStore

### Interview answer:
> *"Singleton ensures only one instance of a class exists and provides a global access point. The constructor is private so nobody can use `new` directly. A static `getInstance()` creates it once and returns the same instance every time. In React I use it for shared stores like CartStore — any component calls `getInstance()` and gets the same cart without prop drilling."*

---

## 2. Factory

> **Centralize object creation.**

A Factory is a class that creates objects for you without you knowing the exact class being created.

### Example — NotificationFactory:

```ts
interface INotification {
  message: string
  color: string
  icon: string
  show(): void
}

class SuccessNotification implements INotification {
  message: string
  color = '#1D9E75'
  icon = '✅'
  constructor(message: string) { this.message = message }
  show() { console.log(`${this.icon} ${this.message}`) }
}

class ErrorNotification implements INotification {
  message: string
  color = '#E24B4A'
  icon = '❌'
  constructor(message: string) { this.message = message }
  show() { console.log(`${this.icon} ${this.message}`) }
}

// Factory — centralizes creation ✅
class NotificationFactory {
  static create(type: string, message: string): INotification {
    if (type === 'success') return new SuccessNotification(message)
    if (type === 'error') return new ErrorNotification(message)
    throw new Error(`Unknown type: ${type}`)
  }
}

// Usage — component doesn't know which class it gets
const notification = NotificationFactory.create('success', 'Saved!')
notification.show() // ✅ Saved!
```

### Real world usage:
- Notification systems
- Creating different product types in e-commerce
- `React.createElement` under the hood

### Interview answer:
> *"Factory pattern centralizes object creation. Instead of using `new` directly in components, you delegate creation to a Factory class. Components don't need to know which exact class they're working with. It naturally follows OCP — adding new types means adding a new class and one line in the factory, never touching existing code."*

---

## 3. Builder

> **Construct complex objects step by step.**

Instead of a constructor with many parameters, you chain setter methods and call `build()` at the end.

### The problem it solves:

```ts
// ❌ Before — confusing, error prone
new User("John", "john@gmail.com", 25, "Hyderabad", null, null, null)

// ✅ After — clean and readable
new UserBuilder("John", "john@gmail.com")
  .setAge(25)
  .setAddress("Hyderabad")
  .build()
```

### Example — UserBuilder:

```ts
class UserBuilder {
  private user: User

  constructor(name: string, email: string) {
    this.user = { name, email } // required fields
  }

  setAge(age: number): UserBuilder {
    this.user.age = age
    return this // ✅ enables chaining
  }

  setAddress(address: string): UserBuilder {
    this.user.address = address
    return this
  }

  setBio(bio: string): UserBuilder {
    this.user.bio = bio
    return this
  }

  build(): User {
    return this.user // ✅ final object
  }
}
```

### Real world usage:
- SQL query builders
- URL builders
- Form configuration objects
- Test data builders in unit tests

### Interview answer:
> *"Builder pattern constructs complex objects step by step. Each setter method returns `this` which enables method chaining. You only set what you need — no nulls for optional fields. When done, call `build()` to get the final object. I use it when an object has more than 3-4 parameters especially optional ones."*

---

## 4. Observer

> **Subscribe to changes, get notified automatically.**

Defines a one-to-many relationship where one subject notifies multiple observers when its state changes.

### Key roles:
- **Subject** — the one being watched (holds listeners list)
- **Observers** — the ones watching (subscribe to changes)

### Example — StockStore:

```ts
type Listener = (price: number) => void

class StockStore {
  private static instance: StockStore
  private price: number = 0
  private listeners: Listener[] = []

  private constructor() {}

  static getInstance(): StockStore {
    if (!StockStore.instance) {
      StockStore.instance = new StockStore()
    }
    return StockStore.instance
  }

  subscribe(listener: Listener) {
    this.listeners.push(listener) // add observer
  }

  unsubscribe(listener: Listener) {
    this.listeners = this.listeners.filter(l => l !== listener) // remove observer
  }

  setPrice(price: number) {
    this.price = price
    this.listeners.forEach(l => l(price)) // notify all observers ✅
  }

  getPrice(): number { return this.price }
}
```

### React hook:

```ts
export const useStock = () => {
  const store = StockStore.getInstance()
  const [price, setPrice] = useState(store.getPrice())

  useEffect(() => {
    const listener = (newPrice: number) => setPrice(newPrice)
    store.subscribe(listener)
    return () => store.unsubscribe(listener) // cleanup ✅
  }, [])

  return { price, setPrice: (p: number) => store.setPrice(p) }
}
```

### Real world usage:
- `addEventListener` in DOM
- `useEffect` with dependencies
- Redux `store.subscribe()`
- RxJS Observables in Angular

### Interview answer:
> *"Observer pattern defines a one-to-many relationship where one subject notifies multiple observers automatically when its state changes. The subject maintains a list of listeners, and when something changes it calls notify() which triggers all of them. In React I used this in a stock price tracker — multiple components subscribe to StockStore and automatically re-render when the price updates, without any prop drilling."*

---

## 5. Strategy

> **Swap algorithms at runtime.**

Defines a family of interchangeable algorithms and lets you swap them without changing the code that uses them.

### Example — Payment Strategies:

```ts
interface IPaymentStrategy {
  pay(amount: number): string
}

class CreditCardStrategy implements IPaymentStrategy {
  pay(amount: number): string {
    return `💳 Paid ₹${amount} via Credit Card`
  }
}

class UPIStrategy implements IPaymentStrategy {
  pay(amount: number): string {
    return `📱 Paid ₹${amount} via UPI`
  }
}

class NetBankingStrategy implements IPaymentStrategy {
  pay(amount: number): string {
    return `🏦 Paid ₹${amount} via Net Banking`
  }
}

// Context — holds and executes strategy
class PaymentContext {
  private strategy: IPaymentStrategy

  constructor(strategy: IPaymentStrategy) {
    this.strategy = strategy
  }

  setStrategy(strategy: IPaymentStrategy) {
    this.strategy = strategy // swap at runtime ✅
  }

  executePayment(amount: number): string {
    return this.strategy.pay(amount)
  }
}

// Usage
const context = new PaymentContext(new UPIStrategy())
context.executePayment(500) // 📱 Paid ₹500 via UPI

context.setStrategy(new CreditCardStrategy()) // swap!
context.executePayment(500) // 💳 Paid ₹500 via Credit Card
```

### Real world usage:
- Payment methods
- Sorting algorithms (by price, name, rating)
- Form validation strategies
- Authentication strategies

### Interview answer:
> *"Strategy pattern defines a family of interchangeable algorithms. Instead of if/else to pick behavior, you inject the algorithm as an object and swap it at runtime. A PaymentContext holds the current strategy and delegates to it. Switching payment method is just swapping the strategy — zero if/else in the component. It naturally follows OCP — adding a new payment method means creating a new class."*

---

## 6. Decorator

> **Wrap and add behavior without changing the original.**

A Decorator wraps an existing object and adds new behavior without modifying the original class.

### Example — HOCs in React:

```tsx
// Original component — clean, no auth logic
const UserProfile = () => {
  return <div><h1>Welcome to your Profile!</h1></div>
}

// Decorator — adds auth check
const withAuth = (Component: React.ComponentType) => {
  return () => {
    const isLoggedIn = localStorage.getItem('token')
    if (!isLoggedIn) return <Navigate to="/login" />
    return <Component /> // render original if logged in ✅
  }
}

// Decorator — adds logging
const withLogger = (Component: React.ComponentType) => {
  return () => {
    console.log(`Rendering: ${Component.name}`)
    return <Component />
  }
}

// Stack decorators — each adds one layer ✅
const ProtectedProfile = withAuth(UserProfile)
const LoggedProtectedProfile = withLogger(ProtectedProfile)
```

### Class based example:

```ts
interface IButton {
  render(): string
}

class Button implements IButton {
  render() { return 'Click me!' }
}

class IconButton extends Button {
  render() { return `🔥 ${super.render()}` }
}

class LoadingButton extends Button {
  render() { return `⏳ ${super.render()}` }
}

console.log(new Button().render())       // "Click me!"
console.log(new IconButton().render())   // "🔥 Click me!"
console.log(new LoadingButton().render()) // "⏳ Click me!"
```

### Real world usage:
- HOCs: `withAuth`, `withTheme`, `withLogger`
- `React.memo()` — adds memoization
- Angular decorators: `@Component`, `@Injectable`

### Interview answer:
> *"Decorator pattern wraps an existing object and adds new behavior without modifying the original. In React, Higher Order Components are decorators — `withAuth(Dashboard)` wraps Dashboard and adds authentication without touching Dashboard itself. You can stack decorators — each layer adds one responsibility, following SRP."*

---

## Quick Reference Table

| Pattern | Category | One Line | Real World |
|---|---|---|---|
| Singleton | Creational | One instance, global access | Angular services, Redux store |
| Factory | Creational | Centralizes object creation | Notification system, product types |
| Builder | Creational | Step by step construction | Query builders, complex forms |
| Observer | Behavioral | Subscribe to changes, get notified | Redux, useEffect, EventEmitter |
| Strategy | Behavioral | Swap algorithms at runtime | Payment methods, sorting, validation |
| Decorator | Structural | Wrap and add behavior | HOCs, React.memo, Angular decorators |

---

## How Patterns Work Together

```
Singleton  → one CartStore instance shared everywhere
  + Observer  → components subscribe to cart changes
  + Factory   → creates different product types
  + Strategy  → different payment methods at checkout
  + Builder   → builds complex order objects
  + Decorator → withAuth wraps checkout page
```

All 6 patterns working together in one e-commerce app! 🔥

---

## SOLID + Patterns Connection

| Pattern | SOLID Principles it follows |
|---|---|
| Singleton | SRP — one class, one instance responsibility |
| Factory | OCP — add new types without modifying factory logic |
| Builder | SRP — construction logic separate from business logic |
| Observer | OCP — add new observers without changing subject |
| Strategy | OCP + DIP — depend on interface, swap implementations |
| Decorator | SRP + OCP — each decorator one job, extend without modifying |
