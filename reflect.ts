import 'reflect-metadata'

function Injectable(): ClassDecorator {
    return target => {
        Reflect.defineMetadata('matedata', 'matedata', target)
    }
}

@ClassDe()
class Test {
    @Prop()
    public a: string = "aaa"

    @FunProps()
    good(s: string): string {
        return s
    }
}

@Injectable()
class Te {
    constructor(public readonly test: Test) {
    }

    testMethod() {
        console.log(this.test.a)
    }
}


function Prop(): PropertyDecorator {
    return function (target, key) {
        const type = Reflect.getMetadata("design:type", target, key)
        console.log(type.toString())
        console.log(`${String(key)} type: ${type.name}`);
    }
}

function FunProps(): MethodDecorator {
    return function (target, key, description) {
        const paramtypes = Reflect.getMetadata('design:paramtypes', target, key); // 数组
        const returntype = Reflect.getMetadata('design:returntype', target, key)

        Reflect.defineMetadata('methodDecorator', 'b', target, key)

        console.log(key)
        console.log(paramtypes[0].name)
        console.log(returntype.name)
    }
}

function ClassDe(): ClassDecorator {
    return function (target) {
        Reflect.defineMetadata('classMateData', 'a', target)
    }
}

console.log(Reflect.getMetadata('classMateData', Test));
console.log(Reflect.getMetadata('methodDecorator', new Test(), 'good'));

type ConstructorType<T> = new (...args: any[]) => T

const Factory = <P>(target: ConstructorType<P>): P => {
    const providers = Reflect.getMetadata('design:paramtypes', target)
    const matedata = Reflect.getMetadata('matedata', target)
    console.log({matedata});
    const args = providers.map((Item: any) => new Item());
    return new target(...args)
}

Factory<Te>(Te).testMethod()

const METHOD_METADATA = Symbol('method'),
    PATH_METADATA = Symbol('path')

const Controller = (path: string): ClassDecorator => target => {
    Reflect.defineMetadata(PATH_METADATA, path, target)
}

const createMappingDecorator =
    (method: string) =>
        (path: string): MethodDecorator =>
            (target, propertyKey, descriptor: PropertyDescriptor) => {
                Reflect.defineMetadata(PATH_METADATA, path, target, propertyKey)
                Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value)
            }

const Get = createMappingDecorator('get'),
    Post = createMappingDecorator('post')

@Controller('/co')
class Co {
    constructor() {
        console.log(1)
    }

    @Get('/get')
    getMethod() {
        return 'get sth'
    }

    @Post('/post')
    postMethod() {
        return "post sth"
    }
}

console.log(Reflect.getMetadata(PATH_METADATA, Co));

const mapRoute = <T>(instance: T) => {
    const prototype = Object.getPrototypeOf(instance),
        methodNames = Object
            .getOwnPropertyNames(prototype)
            .filter(item => item !== 'constructor' && typeof prototype[item] === 'function')

    return methodNames.map(methodName => {
        const fn = prototype[methodName]

        const route = Reflect.getMetadata(PATH_METADATA, instance, methodName),
            method = Reflect.getMetadata(METHOD_METADATA, fn)

        return {
            route,
            method,
            fn: fn.toString(),
            methodName
        }
    })
}

console.log(mapRoute(new Co()));