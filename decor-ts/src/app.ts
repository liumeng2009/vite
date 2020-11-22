import TodoList from './TodoList';

;((doc) => {
    const oInput: HTMLInputElement = doc.querySelector('input'),
          oAddBtn: HTMLElement = doc.querySelector('.add-btn'),
          oList: HTMLElement = doc.querySelector('.todo-list');

    const todoList = TodoList.create(oList);

    const init = (): void => {
        bindEvent();
    }

    function bindEvent() {
        oAddBtn.addEventListener('click', handleAddBtnClick, false);
        oList.addEventListener('click', handleListClick, false);
    }

    function handleAddBtnClick() {
        const val: string = oInput.value.trim();

        if (!val.length) {
            return;
        }

        todoList.addItem({
            id: new Date().getTime(),
            content: val,
            completed: false
        });

        oInput.value = '';
    }
    
    function handleListClick(e: MouseEvent) {
        const tar = e.target as HTMLElement;
        const tagName = tar.tagName;
        console.log(tagName);
        if (tagName === 'INPUT' || tagName === 'BUTTON') {
            const id: number = parseInt(tar.dataset.id);

            switch(tagName) {
                case 'INPUT':
                    todoList.toggleCompleted(id);
                    break;
                case 'BUTTON':
                    todoList.removeItem(id)
                    break;
                default: 
                    break;
            }
        }

    }

    init();

})(document);