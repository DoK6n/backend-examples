type Constructor<T = any> = new (...args: any[]) => T

class Container {
  private registrations: Map<string, Constructor> = new Map()

  register<T>(implementation: Constructor<T>): void {
    const token = implementation.name
    this.registrations.set(token, implementation)
  }

  resolve<T>(target: Constructor<T>): T {
    const token = target.name
    const implementation = this.registrations.get(token)
    if (!implementation) {
      throw new Error(`Implementation not found for ${token}`)
    }
    return new implementation()
  }
}

// 예제 클래스
class Foo {
  greet(): void {
    console.log('Hello, Foo!')
  }
}

class Bar {
  greet(): void {
    console.log('Hello, Bar!')
  }
}

// IoC 컨테이너 사용
const container = new Container()
container.register(Foo) // Foo 클래스 등록
container.register(Bar) // Bar 클래스 등록

const fooInstance = container.resolve(Foo)
fooInstance.greet() // 출력: Hello, Foo!

const barInstance = container.resolve(Bar)
barInstance.greet() // 출력: Hello, Bar!
