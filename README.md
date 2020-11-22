装饰器模式 decor-ts
    dom操作前，拦截该函数，进行数据操作之后，再执行改函数
        (   
            target: any, // 当前装饰的函数的容器   todoList的prototype
            methodName: string, // 被装饰的函数的名称
            descriptor: PropertyDescriptor // 描述属性
        )
