const events = {
    enero: [
        { date: 1, name: "Año Nuevo", emoji: "🎉" },
        { date: 6, name: "Día de Reyes", emoji: "🎁" }
    ],
    febrero: [
        { date: 14, name: "Día de San Valentín", emoji: "💝", special: true }
    ],
    marzo: [
        { date: 8, name: "Día de la Mujer", emoji: "👩🏻" },
        { date: 20, name: "Termina el Verano", emoji: "🏖️" },
        { date: 20, name: "Empieza el Otoño", emoji: "🍂" },
        { date: 21, name: "Día de la Poesía", emoji: "📖" }
    ],
    abril: [
        { date: 17, name: "Comienzo de la Semana Santa", emoji: "🙏🏻" },
        { date: 19, name: "Fin de la Semana Santa", emoji: "🙏🏻" },
        { date: 20, name: "Domingo de Pascua", emoji: "🍫" }
    ],
    mayo: [
        { date: 1, name: "Día del Trabajador", emoji: "⚒️" },
        { date: 5, name: "Día de la Risa", emoji: "😄" },
        { date: 25, name: "Día del Orgullo Geek", emoji: "🤓" }
    ],
    junio: [
        { date: 21, name: "Termina el Otoño", emoji: "🍂" },
        { date: 21, name: "Empieza el Invierno", emoji: "❄️" },
        { date: 22, name: "Comienzo de Cancer", emoji: "🦀" },
        { date: 29, name: "Cumpleaños de Brian", emoji: "🍰", special: true }
    ],
    julio: [
        { date: 20, name: "Día del Amigo", emoji: "👫" },
        { date: 22, name: "Fin de Cancer", emoji: "🦀" },
        { date: 24, name: "Primera vez que hablamos", emoji: "💬", special: true }
    ],
    agosto: [
        { date: 1, name: "Día del noviazgo", emoji: "👫🏼" }
    ],
    septiembre: [
        { date: 13, name: "Día del Programador", emoji: "💻" },
        { date: 21, name: "Día de las Flores Amarillas", emoji: "🌼", special: true },
        { date: 22, name: "Termina el Invierno", emoji: "❄️" },
        { date: 22, name: "Empieza la Primavera", emoji: "🌸" }
    ],
    octubre: [
        { date: 23, name: "Comienzo de Escorpio", emoji: "🦂" },
        { date: 31, name: "Halloween", emoji: "🎃" }
    ],
    noviembre: [
        { date: 5, name: "Cumpleaños de Cami", emoji: "🍰", special: true },
        { date: 21, name: "Fin de Escorpio", emoji: "🦂" }
    ],
    diciembre: [
        { date: 3, name: "Día del Medico", emoji: "🩺" },
        { date: 22, name: "Termina la Primavera", emoji: "🌸" },
        { date: 21, name: "Comienzo del Verano", emoji: "🏖️" },
        { date: 25, name: "Navidad", emoji: "🎄" },
        { date: 31, name: "Fin de Año", emoji: "🎊" }
    ]
};

const monthNames = {
    enero: "Enero", febrero: "Febrero", marzo: "Marzo", abril: "Abril",
    mayo: "Mayo", junio: "Junio", julio: "Julio", agosto: "Agosto",
    septiembre: "Septiembre", octubre: "Octubre", noviembre: "Noviembre", diciembre: "Diciembre"
};

let currentTheme = 'light';

function calculateDaysSince() {
    const meetingDate = new Date(2025, 6, 24);
    const today = new Date();
    const diffTime = Math.abs(today - meetingDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    document.getElementById('daysCounter').textContent = diffDays;
}

function getCurrentDayEvent() {
    const today = new Date();
    const currentMonth = today.toLocaleString('es-ES', { month: 'long' }).toLowerCase();
    const currentDay = today.getDate();

    const monthEvents = events[currentMonth] || [];
    const todayEvent = monthEvents.find(event => event.date === currentDay);

    const currentDayContent = document.getElementById('currentDayContent');

    if (todayEvent) {
        currentDayContent.innerHTML = `
                    <div style="font-size: 1.2rem; color: #d4516b; margin-bottom: 10px;">
                        ${todayEvent.date} de ${monthNames[currentMonth]}
                    </div>
                    <div style="font-size: 1.1rem; margin-bottom: 5px;">
                        ${todayEvent.name} ${todayEvent.emoji}
                    </div>
                    <div style="font-size: 0.9rem; color: #8a8a8a; font-style: italic;">
                        Hoy es un día importanteee 💖
                    </div>
                `;
    } else {
        currentDayContent.innerHTML = `
                    <div style="font-size: 1.2rem; color: #5a8db3; margin-bottom: 10px;">
                        ${currentDay} de ${monthNames[currentMonth]}
                    </div>
                    <div style="font-size: 1rem; color: #8a8a8a; font-style: italic;">
                        Hoy no hay evento...
                    </div>
                `;
    }
}

function renderCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';

    const today = new Date();
    const currentMonth = today.toLocaleString('es-ES', { month: 'long' }).toLowerCase();
    const currentDay = today.getDate();

    Object.keys(events).forEach(month => {
        const monthCard = document.createElement('div');
        monthCard.className = 'month-card';
        monthCard.dataset.month = month;

        const monthTitle = document.createElement('h2');
        monthTitle.className = 'month-title';
        monthTitle.textContent = monthNames[month];

        const eventsList = document.createElement('ul');
        eventsList.className = 'events-list';

        events[month].forEach(event => {
            const eventItem = document.createElement('li');
            eventItem.className = 'event-item';
            eventItem.dataset.eventName = event.name.toLowerCase();

            if (event.special) {
                eventItem.classList.add('special');
            }

            if (month === currentMonth && event.date === currentDay) {
                eventItem.classList.add('today');
            }

            eventItem.innerHTML = `
                        <div class="event-date">${event.date} de ${monthNames[month]}</div>
                        <div class="event-name">${event.name} <span class="event-emoji">${event.emoji}</span></div>
                    `;

            eventsList.appendChild(eventItem);
        });

        monthCard.appendChild(monthTitle);
        monthCard.appendChild(eventsList);
        calendarGrid.appendChild(monthCard);
    });
}

function filterEvents() {
    const searchTerm = document.getElementById('searchBox').value.toLowerCase();
    const selectedMonth = document.getElementById('monthFilter').value;

    const monthCards = document.querySelectorAll('.month-card');

    monthCards.forEach(card => {
        const month = card.dataset.month;
        const eventItems = card.querySelectorAll('.event-item');
        let hasVisibleEvents = false;

        if (selectedMonth && month !== selectedMonth) {
            card.classList.add('hidden');
            return;
        }

        eventItems.forEach(item => {
            const eventName = item.dataset.eventName;
            if (eventName.includes(searchTerm)) {
                item.classList.remove('hidden');
                hasVisibleEvents = true;
            } else {
                item.classList.add('hidden');
            }
        });

        if (hasVisibleEvents || !searchTerm) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

function toggleTheme() {
    alert('Proximamente');

    /*const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle');

    if (currentTheme === 'light') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '🌞';
        currentTheme = 'dark';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
        currentTheme = 'light';
    }*/
}

function addNewEvent() {
    alert('Proximamente');
}

document.getElementById('searchBox').addEventListener('input', filterEvents);
document.getElementById('monthFilter').addEventListener('change', filterEvents);

document.addEventListener('DOMContentLoaded', function () {
    calculateDaysSince();
    getCurrentDayEvent();
    renderCalendar();
});
