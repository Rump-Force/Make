const hamburgerBar = document.querySelector('.header__hamburger')
const navMenu = document.querySelector('.header__list')
const overlay = document.querySelector('.overlay')

// --- Открытие / Закрытие по клику на иконку гамбургера ---
hamburgerBar.addEventListener('click', () => {
	hamburgerBar.classList.toggle('active-menu')
	navMenu.classList.toggle('active-menu')
	overlay.classList.toggle('active-menu')
})

function closeMenu() {
	// Проверяем, открыто ли меню, чтобы избежать лишних операций
	if (navMenu.classList.contains('active-menu')) {
		hamburgerBar.classList.remove('active-menu')
		navMenu.classList.remove('active-menu')
		overlay.classList.remove('active-menu')
	}
}

// 1. Закрытие по клику на оверлей
overlay.addEventListener('click', () => {
	closeMenu()
})

// 2. Закрытие по нажатию клавиши Escape
document.addEventListener('keydown', event => {
	// Проверяем, что нажата именно клавиша 'Escape'
	if (event.key === 'Escape') {
		closeMenu()
	}
})

// Функция для анимации числа
function animateCounter(element, target, duration = 2000) {
	const start = 0
	const increment = target / (duration / 16) // 60 FPS
	let current = start

	const timer = setInterval(() => {
		current += increment
		if (current >= target) {
			element.textContent = target
			clearInterval(timer)
		} else {
			element.textContent = Math.floor(current)
		}
	}, 16)
}

// Запуск анимации при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
	const items = document.querySelectorAll('.statistics__item-number')

	items.forEach(item => {
		const text = item.textContent
		const number = parseInt(text.replace(/[^0-9]/g, ''))
		const suffix = text.replace(/[0-9]/g, '') // Сохраняем % если есть

		item.textContent = '0' + suffix

		// Запуск с небольшой задержкой
		setTimeout(() => {
			animateCounter(item, number)
			// Добавляем суффикс обратно после анимации
			const checkInterval = setInterval(() => {
				if (parseInt(item.textContent) === number) {
					item.textContent = number + suffix
					clearInterval(checkInterval)
				}
			}, 16)
		}, 200)
	})
})

// Альтернатива: запуск при появлении в viewport (прокрутке)
const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			const item = entry.target.querySelector('.statistics__item-number')
			const text = item.getAttribute('data-target') || item.textContent
			const number = parseInt(text.replace(/[^0-9]/g, ''))
			const suffix = text.replace(/[0-9]/g, '')

			item.textContent = '0' + suffix
			animateCounter(item, number)

			const checkInterval = setInterval(() => {
				if (parseInt(item.textContent) === number) {
					item.textContent = number + suffix
					clearInterval(checkInterval)
				}
			}, 16)

			observer.unobserve(entry.target)
		}
	})
})

// Раскомментируйте эти строки для активации при прокрутке:
document.querySelectorAll('.statistics__item').forEach(item => {
	observer.observe(item)
})


