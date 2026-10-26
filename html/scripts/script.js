// 1. КЛАСС КАРТОЧКИ ТОВАРА
class ProductCard {
    constructor(name, price, category, openModalCallback) {
        this.name = name;
        this.price = price;
        this.category = category;
        this.openModalCallback = openModalCallback; // Передаем функцию открытия окна внутрь класса
        
        this.domElement = this.createCardDOM();
    }

    createCardDOM() {
        const card = document.createElement('article');
        card.className = 'product-card';

        card.innerHTML = `
            <h3 class="product-name">${this.name}</h3>
            <p class="product-price">${this.price.toLocaleString('ru-RU')} ₽</p>
            <button class="btn-buy">В корзину</button>
        `;

        const buyBtn = card.querySelector('.btn-buy');
        
        // При клике на кнопку вызываем коллбэк для открытия модального окна
        buyBtn.addEventListener('click', () => {
            this.openModalCallback(this.name);
        });

        return card;
    }

    render(container) {
        if (container) {
            container.appendChild(this.domElement);
        }
    }

    show() { this.domElement.style.display = 'block'; }
    hide() { this.domElement.style.display = 'none'; }
}


// 2. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('products-container');
    const categorySelect = document.getElementById('category-select');
    const priceInput = document.getElementById('price-input');

    // Находим элементы модального окна в HTML
    const modalContainer = document.getElementById('modal-container');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // ФУНКЦИИ УПРАВЛЕНИЯ МОДАЛЬНЫМ ОКНОМ
    function openModal(productName) {
        modalTitle.innerText = 'Товар добавлен!';
        modalText.innerText = `Вы успешно добавили "${productName}" в корзину покупок.`;
        
    
        modalContainer.style.display = 'flex'; 
    }

    function closeModal() {
        // Скрываем окно обратно
        modalContainer.style.display = 'none';
    }

    // Навешиваем события закрытия
    modalCloseBtn.addEventListener('click', closeModal);
    
    // Закрытие при клике на темный фон вокруг белого окошка
    modalContainer.addEventListener('click', (event) => {
        if (event.target === modalContainer) {
            closeModal();
        }
    });


    // БАЗА ДАННЫХ И СОЗДАНИЕ КАРТОЧЕК
    const productsData = [
        { name: 'Диван "Сканди-Мини"', price: 45000, category: 'living-room' },
        { name: 'Кровать "Оливия Люкс"', price: 25000, category: 'bedroom' },
        { name: 'Стол обеденный "Лофт"', price: 18000, category: 'kitchen' },
        { name: 'Шкаф купе зеркальный', price: 38000, category: 'bedroom' },
        { name: 'Кресло-качалка "Уют"', price: 15000, category: 'living-room' },
        { name: 'Кухонный гарнитур "Модерн"', price: 85000, category: 'kitchen' },
        { name: 'Тумба под ТВ "Слейт"', price: 11500, category: 'living-room' },
        { name: 'Прикроватная тумбочка', price: 6000, category: 'bedroom' },
        { name: 'Коврик для намаза', price: 666_000, category: 'bedroom' }
    ];

    const productInstances = [];

    productsData.forEach(data => {
        // Передаем функцию openModal четвертым аргументом в конструктор
        const product = new ProductCard(data.name, data.price, data.category, openModal);
        product.render(container);
        productInstances.push(product);
    });


    // ФУНКЦИЯ ФИЛЬТРАЦИИ
    function applyFilters() {
        const selectedCategory = categorySelect.value;
        const maxPrice = parseInt(priceInput.value, 10);

        productInstances.forEach(product => {
            const matchesCategory = (selectedCategory === 'all' || product.category === selectedCategory);
            const matchesPrice = isNaN(maxPrice) || (product.price <= maxPrice);

            if (matchesCategory && matchesPrice) {
                product.show();
            } else {
                product.hide();
            }
        });
    }

    categorySelect.addEventListener('change', applyFilters);
    priceInput.addEventListener('input', applyFilters);

        // ==========================================
    // ПЕРЕКЛЮЧЕНИЕ ТЕМЫ (СВЕТЛАЯ / ТЕМНАЯ)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');

    themeToggleBtn.addEventListener('click', () => {
        // Метод toggle автоматически добавляет класс, если его нет, и удаляет, если он есть
        document.body.classList.toggle('dark-theme');

        // Выведем лог в консоль для преподавателя
        const currentTheme = document.body.classList.contains('dark-theme') ? 'Тёмная' : 'Светлая';
        console.log(`Тема оформления изменена на: ${currentTheme}`);
    });

});










    // ==========================================
    // ОБОРАБОТКА ФОРМЫ С ВЫВОДОМ В КОНСОЛЬ
    // ==========================================
    const orderForm = document.getElementById('order-form');

    orderForm.addEventListener('submit', (event) => {
        // 1. Обязательно отменяем перезагрузку страницы браузером
        event.preventDefault();

        // 2. Находим инпуты и забираем их значения
        const nameValue = document.getElementById('user-name').value;
        const phoneValue = document.getElementById('user-phone').value;

        // 3. Формируем чистый объект с данными
        const formData = {
            name: nameValue.trim(),  // trim() убирает случайные пробелы по краям
            phone: phoneValue.trim(),
            sentAt: new Date().toLocaleTimeString('ru-RU') // Время отправки для наглядности
        };

        // 4. Красиво выводим данные в консоль (преподаватель оценит!)
        console.log('%c--- ПОЛУЧЕНЫ ДАННЫЕ ФОРМЫ ---', 'color: #8b5a2b; font-weight: bold; font-size: 12px;');
        console.log('Имя клиента:', formData.name);
        console.log('Телефон клиента:', formData.phone);
        console.log('Время локальной отправки:', formData.sentAt);
        console.table(formData); // Выведет данные в виде красивой интерактивной таблицы прямо в консоли!

        // 5. Очищаем поля формы после успешной "отправки"
        orderForm.reset();

        // 6. Опционально: откроем наше модальное окно, чтобы показать пользователю, что всё ок
        
    });
