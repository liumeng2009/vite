import { ITodo } from ".";

export function addTodo(todoData: ITodo[]) {
    return function(
        target: any, // 当前装饰的函数的容器   todoList的prototype
        methodName: string, // 被装饰的函数的名称
        descriptor: PropertyDescriptor // 描述属性
    ) {
        console.log(target, methodName, descriptor);
        const _origin = descriptor.value;
        
        descriptor.value = function(todo: ITodo) {
            console.log(todo);
            const _todo: ITodo | null = todoData.find(t => t.content === todo.content);

            if (_todo) {
                alert('该事务已存在。');
                return;
            }

            todoData.push(todo);
            console.log(todoData);
            _origin.call(this, todo);
        }
    }
}

export function removeTodo(todoData: ITodo[]) {
    return function(
        target: any, // 当前装饰的函数的容器   todoList的prototype
        methodName: string, // 被装饰的函数的名称
        descriptor: PropertyDescriptor // 描述属性
    ) {
        const _origin = descriptor.value;

        descriptor.value = function(id: number) {
            todoData.forEach((item, index) => {
                if (item.id === id) {
                    todoData.splice(index, 1);
                    _origin(id);
                }
            });
            console.log(todoData);
        }
    }
}

export function changeCompleted(todoData: ITodo[]) {
    return function(
        target: any, // 当前装饰的函数的容器   todoList的prototype
        methodName: string, // 被装饰的函数的名称
        descriptor: PropertyDescriptor // 描述属性
    ) {
        const _origin = descriptor.value;

        descriptor.value = function(id: number) {
            todoData.forEach(item => {
                if (item.id === id) {
                    item.completed = !item.completed;
                    _origin(id, item.completed);
                }
            });
            console.log(todoData);
        }
    }
}