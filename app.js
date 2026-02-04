// State Management
let state = {
    theme: localStorage.getItem('theme') || 'light',
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    checked: JSON.parse(localStorage.getItem('checked') || '[]'),
    weekStart: localStorage.getItem('weekStart') || new Date().toISOString()
};

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    applyTheme();
    renderAllRecipes();
    updateStats();
    loadFavorites();
    updateBadges();
});

// Theme Management
function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', state.theme);
    applyTheme();
}

function applyTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    const icon = document.getElementById('themeIcon');
    const text = document.getElementById('themeText');
    if (state.theme === 'dark') {
        icon.textContent = '☀️';
        text.textContent = 'Claro';
    } else {
        icon.textContent = '🌙';
        text.textContent = 'Oscuro';
    }
}

document.getElementById('themeToggle').addEventListener('click', toggleTheme);

// Tab Management
function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
}

// Render All Recipes
function renderAllRecipes() {
    renderSection('almuerzos');
    renderSection('meriendas');
    renderSection('cenas');
}

function renderSection(section) {
    const container = document.getElementById(section);
    const recipes = recipesData[section];
    const categories = getCategories(section);

    let html = '<div class="card">';
    html += '<div class="card-header">';

    const sectionIcons = {
        'almuerzos': '🍖',
        'meriendas': '☕',
        'cenas': '🌙'
    };

    const sectionTitles = {
        'almuerzos': 'Almuerzos',
        'meriendas': 'Meriendas',
        'cenas': 'Cenas'
    };

    html += `<h2 class="card-title">${sectionIcons[section]} ${sectionTitles[section]} (${recipes.length} Opciones)</h2>`;
    html += '<div class="card-actions">';
    html += `<button class="icon-btn" onclick="filterRecipes('${section}', 'all')" title="Todas">📋</button>`;
    html += `<button class="icon-btn" onclick="filterRecipes('${section}', 'favorites')" title="Favoritos">⭐</button>`;
    html += `<button class="icon-btn" onclick="filterRecipes('${section}', 'quick')" title="Rápidos">⚡</button>`;
    html += '</div>';
    html += '</div>';

    categories.forEach(category => {
        const categoryRecipes = getRecipesByCategory(section, category);
        const categoryIcons = {
            'Carnes Rojas': '🥩',
            'Cerdo': '🐷',
            'Pollo': '🍗',
            'Milanesas': '🍽️',
            'Tartas y Vegetarianas': '🥗',
            'Pastas y Asado': '🍝',
            'Con Yogur': '🥛',
            'Con Gelatina': '🍮',
            'Licuados': '🥤',
            'Con Infusión y Pan': '☕',
            'Opciones Rápidas': '⚡',
            'A Base de Huevo': '🥚',
            'Carnes': '🥩',
            'Ensaladas Completas': '🥗',
            'Pizza y Empanadas': '🍕',
            'Otras Opciones': '🍱'
        };

        html += '<div class="category-header">';
        html += `<div class="category-icon">${categoryIcons[category] || '📌'}</div>`;
        html += `<div class="category-title">${category}</div>`;
        html += `<div class="category-count">${categoryRecipes.length} opciones</div>`;
        html += '</div>';

        html += '<div class="recipe-grid">';
        categoryRecipes.forEach(recipe => {
            html += createRecipeCard(recipe, section);
        });
        html += '</div>';
    });

    html += '</div>';
    container.innerHTML = html;

    // Apply saved states
    recipes.forEach(recipe => {
        updateFavoriteUI(recipe.id);
        updateCheckUI(recipe.id);
    });
}

function createRecipeCard(recipe, section) {
    const badgeClasses = {
        'protein': 'badge-protein',
        'carbs': 'badge-carbs',
        'quick': 'badge-quick',
        'easy': 'badge-easy'
    };

    const badgeLabels = {
        'protein': 'Alto en proteína',
        'carbs': 'Carbos moderados',
        'quick': 'Rápido',
        'easy': 'Fácil'
    };

    let html = `<div class="recipe-card" data-id="${recipe.id}" data-category="${recipe.category}" data-time="${recipe.time}">`;
    html += '<div class="recipe-header">';
    html += `<div class="recipe-number">${recipe.num}</div>`;
    html += '<div style="flex: 1;">';
    html += `<div class="recipe-title">${recipe.title}</div>`;
    html += '<div class="recipe-badges">';
    recipe.badges.forEach(badge => {
        html += `<span class="badge ${badgeClasses[badge]}">${badgeLabels[badge]}</span>`;
    });
    html += '</div>';
    html += '</div>';
    html += '<div class="recipe-actions">';
    html += `<div class="action-icon" onclick="toggleFavorite('${recipe.id}')" title="Favorito">⭐</div>`;
    html += `<div class="action-icon" onclick="toggleCheck('${recipe.id}')" title="Marcar">✓</div>`;
    html += '</div>';
    html += '</div>';
    html += `<div class="recipe-description">${recipe.desc}</div>`;
    html += '<div class="recipe-meta">';
    html += `<div class="meta-item">⏱️ <strong>${recipe.time} min</strong></div>`;
    html += `<div class="meta-item">🔥 <strong>${recipe.cal} kcal</strong></div>`;
    html += `<div class="meta-item">🥩 <strong>${recipe.prot}g prot</strong></div>`;
    html += `<div class="meta-item">👨‍🍳 <strong>${recipe.diff}</strong></div>`;
    html += '</div>';

    // Add instructions section
    if (recipe.instructions) {
        html += `<div class="recipe-instructions-toggle" onclick="toggleInstructions('${recipe.id}')">`;
        html += '📖 Ver preparación <span class="toggle-arrow">▼</span>';
        html += '</div>';
        html += `<div class="recipe-instructions" id="instructions-${recipe.id}" style="display: none;">`;
        const steps = recipe.instructions.split('\n');
        steps.forEach(step => {
            if (step.trim()) {
                html += `<div class="instruction-step">${step}</div>`;
            }
        });
        html += '</div>';
    }

    html += '</div>';

    return html;
}

// Favorites Management
function toggleFavorite(recipeId) {
    const index = state.favorites.indexOf(recipeId);
    if (index > -1) {
        state.favorites.splice(index, 1);
    } else {
        state.favorites.push(recipeId);
    }
    localStorage.setItem('favorites', JSON.stringify(state.favorites));
    updateFavoriteUI(recipeId);
    updateStats();
    loadFavorites();
}

function updateFavoriteUI(recipeId) {
    const card = document.querySelector(`[data-id="${recipeId}"]`);
    if (!card) return;

    const icons = card.querySelectorAll('.action-icon');
    const favIcon = icons[0]; // First icon is favorite
    if (state.favorites.includes(recipeId)) {
        favIcon.classList.add('active');
    } else {
        favIcon.classList.remove('active');
    }
}

// Check Management
function toggleCheck(recipeId) {
    const index = state.checked.indexOf(recipeId);
    if (index > -1) {
        state.checked.splice(index, 1);
    } else {
        state.checked.push(recipeId);
        // Save date
        localStorage.setItem(`check_${recipeId}_date`, new Date().toDateString());
    }
    localStorage.setItem('checked', JSON.stringify(state.checked));
    updateCheckUI(recipeId);
    updateStats();
    updateBadges();
}

function updateCheckUI(recipeId) {
    const card = document.querySelector(`[data-id="${recipeId}"]`);
    if (!card) return;

    const icons = card.querySelectorAll('.action-icon');
    const checkIcon = icons[1]; // Second icon is check
    if (state.checked.includes(recipeId)) {
        checkIcon.classList.add('checked');
    } else {
        checkIcon.classList.remove('checked');
    }
}

// Stats Update
function updateStats() {
    const mealsCount = state.checked.length;
    const totalMeals = 56; // 8 semanas × 7 días
    const percentage = Math.round((mealsCount / totalMeals) * 100);

    document.getElementById('mealsThisWeek').textContent = mealsCount;
    document.getElementById('mealsProgress').style.width = percentage + '%';
    document.getElementById('weekProgressText').textContent = `${mealsCount}/56 comidas`;
    document.getElementById('favoritesCount').textContent = state.favorites.length;

    // Calculate average protein
    let totalProtein = 0;
    state.checked.forEach(id => {
        const recipe = findRecipeById(id);
        if (recipe) totalProtein += recipe.prot;
    });
    const avgProtein = mealsCount > 0 ? Math.round(totalProtein / mealsCount) : 0;
    document.getElementById('avgProtein').textContent = avgProtein + 'g';

    // Calculate calories today
    const today = new Date().toDateString();
    let todayCalories = 0;
    state.checked.forEach(id => {
        const checkDate = localStorage.getItem(`check_${id}_date`);
        if (checkDate === today) {
            const recipe = findRecipeById(id);
            if (recipe) todayCalories += recipe.cal;
        }
    });
    document.getElementById('caloriesToday').textContent = todayCalories;
}

function findRecipeById(id) {
    for (let section in recipesData) {
        const recipe = recipesData[section].find(r => r.id === id);
        if (recipe) return recipe;
    }
    return null;
}

// Load Favorites
function loadFavorites() {
    const container = document.getElementById('favoritesContainer');
    if (state.favorites.length === 0) {
        container.innerHTML = '<p style="color: var(--text-gray); text-align: center; padding: 20px;">Aún no tienes favoritos. Marca las recetas que más te gusten con la estrella ⭐</p>';
        return;
    }

    let html = '<div class="recipe-grid">';
    state.favorites.forEach(id => {
        const recipe = findRecipeById(id);
        if (recipe) {
            // Determine section from ID prefix
            let section = '';
            if (id.startsWith('alm')) section = 'almuerzos';
            else if (id.startsWith('mer')) section = 'meriendas';
            else if (id.startsWith('cen')) section = 'cenas';

            html += createRecipeCard(recipe, section);
        }
    });
    html += '</div>';
    container.innerHTML = html;

    // Reapply states
    state.favorites.forEach(id => {
        updateFavoriteUI(id);
        updateCheckUI(id);
    });
}

// Update Badges
function updateBadges() {
    const almuerzosChecked = state.checked.filter(id => id.startsWith('alm')).length;
    const meriendasChecked = state.checked.filter(id => id.startsWith('mer')).length;
    const cenasChecked = state.checked.filter(id => id.startsWith('cen')).length;

    document.getElementById('almuerzosBadge').textContent = almuerzosChecked;
    document.getElementById('meriendasBadge').textContent = meriendasChecked;
    document.getElementById('cenasBadge').textContent = cenasChecked;

    // Today badge
    const today = new Date().toDateString();
    const todayChecked = state.checked.filter(id => {
        const checkDate = localStorage.getItem(`check_${id}_date`);
        return checkDate === today;
    }).length;

    const todayBadge = document.getElementById('todayBadge');
    if (todayChecked > 0) {
        todayBadge.textContent = todayChecked;
        todayBadge.style.display = 'block';
    } else {
        todayBadge.style.display = 'none';
    }
}

// Search Functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const allCards = document.querySelectorAll('.recipe-card');

    allCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
});

// Filter Recipes
function filterRecipes(section, filter) {
    const cards = document.querySelectorAll(`#${section} .recipe-card`);

    cards.forEach(card => {
        const id = card.dataset.id;
        const time = parseInt(card.dataset.time);

        let show = true;

        if (filter === 'favorites') {
            show = state.favorites.includes(id);
        } else if (filter === 'quick') {
            show = time <= 30;
        }

        card.style.display = show ? '' : 'none';
    });
}

// Calculator Modal
function openCalculator() {
    document.getElementById('calculatorModal').classList.add('active');
}

function closeCalculator() {
    document.getElementById('calculatorModal').classList.remove('active');
}

function calculatePortions() {
    const weight = parseFloat(document.getElementById('weightInput').value);
    const proteinGoal = parseFloat(document.getElementById('proteinGoal').value);
    const activity = document.getElementById('activityLevel').value;

    if (!weight || !proteinGoal) {
        alert('Por favor completa todos los campos');
        return;
    }

    const proteinPerMeal = Math.round(proteinGoal / 3);
    const meatPortion = Math.round((proteinPerMeal / 0.25) * 10) / 10;

    let calorieMultiplier = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725
    }[activity];

    const dailyCalories = Math.round(weight * 24 * calorieMultiplier);

    const result = `
        <div class="info-box info-box-success">
            <h4>Tus recomendaciones:</h4>
            <p><strong>Proteína por comida:</strong> ${proteinPerMeal}g</p>
            <p><strong>Porción de carne:</strong> ${meatPortion}g</p>
            <p><strong>Calorías diarias:</strong> ${dailyCalories} kcal</p>
            <p><strong>Calorías por comida:</strong> ${Math.round(dailyCalories / 3)} kcal</p>
        </div>
    `;

    document.getElementById('calculatorResult').innerHTML = result;
}

// Shopping List Modal
function openShoppingList() {
    document.getElementById('shoppingModal').classList.add('active');
    generateShoppingList();
}

function closeShoppingList() {
    document.getElementById('shoppingModal').classList.remove('active');
}

function generateShoppingList() {
    const checkedRecipes = state.checked;
    if (checkedRecipes.length === 0) {
        document.getElementById('shoppingListContent').innerHTML = '<p style="color: var(--text-gray); text-align: center; padding: 20px;">Marca las recetas que planeas hacer esta semana.</p>';
        return;
    }

    // Analyze checked recipes and generate shopping list
    const ingredients = {
        'Proteínas': [],
        'Verduras': [],
        'Carbohidratos': [],
        'Lácteos': [],
        'Otros': []
    };

    // Count protein types
    let carneCount = 0;
    let polloCount = 0;
    let huevosCount = 0;

    checkedRecipes.forEach(id => {
        const recipe = findRecipeById(id);
        if (!recipe) return;

        // Simple ingredient extraction based on recipe title and description
        const text = (recipe.title + ' ' + recipe.desc).toLowerCase();

        if (text.includes('carne') || text.includes('bife')) carneCount++;
        if (text.includes('pollo')) polloCount++;
        if (text.includes('huevo')) huevosCount += 2;
    });

    if (carneCount > 0) ingredients['Proteínas'].push(`Carne vacuna - ${Math.round(carneCount * 0.17)}kg`);
    if (polloCount > 0) ingredients['Proteínas'].push(`Pollo - ${Math.round(polloCount * 0.17)}kg`);
    if (huevosCount > 0) ingredients['Proteínas'].push(`Huevos - ${Math.ceil(huevosCount / 12)} docenas`);

    // Add common items
    ingredients['Verduras'].push('Lechuga - 2 unidades');
    ingredients['Verduras'].push('Tomates - 1kg');
    ingredients['Verduras'].push('Zanahorias - 500g');
    ingredients['Verduras'].push('Cebolla - 1kg');

    ingredients['Carbohidratos'].push('Papa - 1kg');
    ingredients['Carbohidratos'].push('Batata - 500g');

    ingredients['Lácteos'].push('Yogur - 1 paquete');
    ingredients['Lácteos'].push('Queso - 200g');

    ingredients['Otros'].push('Aceite de oliva');
    ingredients['Otros'].push('Sal y pimienta');

    let html = '';
    for (let category in ingredients) {
        if (ingredients[category].length > 0) {
            html += `<h4 style="color: var(--primary); margin: 20px 0 10px 0;">${category}</h4>`;
            html += '<ul class="shopping-list">';
            ingredients[category].forEach(item => {
                html += `
                    <li class="shopping-item">
                        <input type="checkbox" class="shopping-checkbox" onchange="toggleShoppingItem(this)">
                        <span>${item}</span>
                    </li>
                `;
            });
            html += '</ul>';
        }
    }

    document.getElementById('shoppingListContent').innerHTML = html;
}

function toggleShoppingItem(checkbox) {
    const item = checkbox.parentElement;
    if (checkbox.checked) {
        item.classList.add('checked');
    } else {
        item.classList.remove('checked');
    }
}

// Export to PDF
function exportToPDF() {
    alert('Función de exportar PDF: Usa Ctrl+P (Windows) o Cmd+P (Mac) para imprimir o guardar como PDF.');
    window.print();
}

// Show Stats
function showStats() {
    showTab('dashboard');
    document.querySelector('[onclick="showTab(\'dashboard\')"]').click();
}

// Toggle recipe instructions
function toggleInstructions(recipeId) {
    const instructionsDiv = document.getElementById(`instructions-${recipeId}`);
    const card = document.querySelector(`[data-id="${recipeId}"]`);
    const toggleBtn = card.querySelector('.recipe-instructions-toggle');
    const arrow = toggleBtn.querySelector('.toggle-arrow');

    if (instructionsDiv.style.display === 'none') {
        instructionsDiv.style.display = 'block';
        arrow.textContent = '▲';
    } else {
        instructionsDiv.style.display = 'none';
        arrow.textContent = '▼';
    }
}

// Close modals on outside click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});