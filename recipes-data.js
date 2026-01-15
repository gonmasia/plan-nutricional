// Datos completos de todas las recetas
const recipesData = {
    almuerzos: [
        // CARNES ROJAS
        { id: 'alm1', num: 1, title: 'Bifes a la criolla', desc: 'Con cebolla, pimiento y papas en cacerola + ensalada de zanahoria, tomate y huevo', time: 45, cal: 480, prot: 42, diff: 'Media', badges: ['protein', 'carbs'], category: 'Carnes Rojas' },
        { id: 'alm2', num: 2, title: 'Carne al horno con verduras', desc: 'Roast beef con calabaza, zanahoria y cebolla asadas', time: 60, cal: 420, prot: 45, diff: 'Fácil', badges: ['protein', 'easy'], category: 'Carnes Rojas' },
        { id: 'alm3', num: 3, title: 'Bife de chorizo a la plancha', desc: 'Con ensalada mixta (lechuga, tomate, zanahoria rallada)', time: 20, cal: 520, prot: 48, diff: 'Fácil', badges: ['protein', 'quick'], category: 'Carnes Rojas' },
        { id: 'alm4', num: 4, title: 'Estofado de carne', desc: 'Con papas, zanahorias y arvejas', time: 50, cal: 460, prot: 40, diff: 'Media', badges: ['protein', 'carbs'], category: 'Carnes Rojas' },
        { id: 'alm5', num: 5, title: 'Carne a la cacerola', desc: 'Con puré de calabaza', time: 40, cal: 440, prot: 43, diff: 'Fácil', badges: ['protein', 'easy'], category: 'Carnes Rojas' },

        // CERDO
        { id: 'alm6', num: 6, title: 'Bondiola al horno', desc: 'Con salsa de tomate + batatas y calabacín al horno', time: 55, cal: 500, prot: 44, diff: 'Media', badges: ['protein'], category: 'Cerdo' },
        { id: 'alm7', num: 7, title: 'Carré de cerdo', desc: 'A la cacerola con verduras', time: 45, cal: 470, prot: 42, diff: 'Media', badges: ['protein'], category: 'Cerdo' },
        { id: 'alm8', num: 8, title: 'Costeleta de cerdo a la plancha', desc: 'Con ensalada de repollo y zanahoria', time: 25, cal: 490, prot: 46, diff: 'Fácil', badges: ['protein', 'quick'], category: 'Cerdo' },
        { id: 'alm9', num: 9, title: 'Solomillo de cerdo', desc: 'Con puré mixto (papa y batata)', time: 30, cal: 450, prot: 45, diff: 'Fácil', badges: ['protein', 'quick'], category: 'Cerdo' },

        // POLLO
        { id: 'alm10', num: 10, title: 'Suprema de pollo al horno', desc: 'Con puré de calabaza', time: 35, cal: 380, prot: 48, diff: 'Fácil', badges: ['protein', 'easy'], category: 'Pollo' },
        { id: 'alm11', num: 11, title: 'Pollo al verdeo', desc: 'Con arroz (1 pocillo en crudo)', time: 40, cal: 420, prot: 45, diff: 'Media', badges: ['protein', 'carbs'], category: 'Pollo' },
        { id: 'alm12', num: 12, title: 'Muslo de pollo al horno', desc: 'Con ensalada de remolacha y huevo', time: 45, cal: 400, prot: 42, diff: 'Fácil', badges: ['protein', 'easy'], category: 'Pollo' },
        { id: 'alm13', num: 13, title: 'Pollo a la cacerola', desc: 'Con papas y zanahorias', time: 50, cal: 410, prot: 44, diff: 'Media', badges: ['protein', 'carbs'], category: 'Pollo' },

        // MILANESAS
        { id: 'alm14', num: 14, title: 'Milanesa de pollo', desc: 'Con ensalada de rúcula, tomate, choclo y huevo duro', time: 25, cal: 450, prot: 46, diff: 'Fácil', badges: ['protein', 'quick'], category: 'Milanesas' },
        { id: 'alm15', num: 15, title: 'Milanesa de carne', desc: 'Con ensalada completa (lechuga, tomate, zanahoria, huevo)', time: 25, cal: 470, prot: 45, diff: 'Fácil', badges: ['protein', 'quick'], category: 'Milanesas' },
        { id: 'alm16', num: 16, title: 'Milanesa napolitana', desc: 'Con ensalada verde (sin pan)', time: 30, cal: 520, prot: 48, diff: 'Media', badges: ['protein'], category: 'Milanesas' },

        // TARTAS Y VEGETARIANAS
        { id: 'alm17', num: 17, title: 'Tarta de zapallito con carne molida', desc: 'Sin tapa, 1/4 de unidad + ensalada de zanahoria rallada', time: 50, cal: 360, prot: 28, diff: 'Media', badges: ['carbs'], category: 'Tartas y Vegetarianas' },
        { id: 'alm18', num: 18, title: 'Tarta de acelga y huevo', desc: 'Sin tapa + ensalada de tomate', time: 45, cal: 320, prot: 24, diff: 'Media', badges: ['carbs', 'easy'], category: 'Tartas y Vegetarianas' },
        { id: 'alm19', num: 19, title: 'Hamburguesas vegetarianas (2)', desc: 'Con ensalada de chauchas y huevo duro', time: 30, cal: 340, prot: 22, diff: 'Fácil', badges: ['carbs', 'quick'], category: 'Tartas y Vegetarianas' },
        { id: 'alm20', num: 20, title: 'Quinoa/Arroz con verduras salteadas', desc: 'Cebolla, pimiento, zanahoria, berenjena (1 pocillo crudo)', time: 35, cal: 380, prot: 18, diff: 'Fácil', badges: ['carbs', 'easy'], category: 'Tartas y Vegetarianas' },

        // PASTAS Y ASADO
        { id: 'alm21', num: 21, title: 'Fideos con boloñesa', desc: 'Porción moderada con 1 cda de queso rallado', time: 40, cal: 480, prot: 32, diff: 'Media', badges: ['carbs'], category: 'Pastas y Asado' },
        { id: 'alm22', num: 22, title: 'Asado de carne o pollo', desc: 'Con ensalada mixta', time: 90, cal: 550, prot: 50, diff: 'Media', badges: ['protein'], category: 'Pastas y Asado' },
        { id: 'alm23', num: 23, title: 'Ravioles de verdura', desc: 'Con salsa fileto (sin repetir)', time: 25, cal: 420, prot: 26, diff: 'Fácil', badges: ['carbs', 'quick'], category: 'Pastas y Asado' }
    ],

    meriendas: [
        // CON YOGUR
        { id: 'mer1', num: 1, title: 'Yogur con granola y durazno', desc: '1 taza yogur + 2 cdas granola + 1 fruta en trozos', time: 5, cal: 280, prot: 12, diff: 'Fácil', badges: ['quick', 'easy'], category: 'Con Yogur' },
        { id: 'mer2', num: 2, title: 'Yogur con granola y ciruela', desc: '1 taza yogur + 2 cdas granola + ciruela picada', time: 5, cal: 270, prot: 12, diff: 'Fácil', badges: ['quick', 'easy'], category: 'Con Yogur' },
        { id: 'mer3', num: 3, title: 'Yogur con granola y banana', desc: '1 taza yogur + 2 cdas granola + 1/2 banana', time: 5, cal: 290, prot: 13, diff: 'Fácil', badges: ['quick', 'easy'], category: 'Con Yogur' },
        { id: 'mer4', num: 4, title: 'Yogur con frutas del bosque', desc: '1 taza yogur + mix de berries + 1 cda granola', time: 5, cal: 260, prot: 11, diff: 'Fácil', badges: ['quick', 'easy'], category: 'Con Yogur' },

        // CON GELATINA
        { id: 'mer5', num: 5, title: 'Gelatina con yogur y granola', desc: '1 porción gelatina + 1/2 taza yogur + 2 cdas granola', time: 5, cal: 220, prot: 10, diff: 'Fácil', badges: ['quick', 'easy'], category: 'Con Gelatina' },
        { id: 'mer6', num: 6, title: 'Gelatina con frutas', desc: '1 porción gelatina + trozos de fruta fresca', time: 5, cal: 180, prot: 6, diff: 'Fácil', badges: ['quick', 'easy'], category: 'Con Gelatina' },

        // LICUADOS
        { id: 'mer7', num: 7, title: 'Licuado de durazno', desc: '1 vaso leche + 2 duraznos + edulcorante + rollito jamón y queso', time: 10, cal: 320, prot: 18, diff: 'Fácil', badges: ['protein', 'quick'], category: 'Licuados' },
        { id: 'mer8', num: 8, title: 'Licuado de banana', desc: '1 vaso leche + 1 banana + edulcorante + rollito jamón y queso', time: 10, cal: 330, prot: 18, diff: 'Fácil', badges: ['protein', 'quick'], category: 'Licuados' },
        { id: 'mer9', num: 9, title: 'Licuado de frutilla', desc: '1 vaso leche + frutillas + edulcorante + rollito jamón y queso', time: 10, cal: 310, prot: 17, diff: 'Fácil', badges: ['protein', 'quick'], category: 'Licuados' },

        // CON INFUSION Y PAN INTEGRAL
        { id: 'mer10', num: 10, title: 'Té/café con leche + tostadas', desc: '2 rodajas pan integral con queso y dulce de membrillo', time: 10, cal: 300, prot: 14, diff: 'Fácil', badges: ['carbs', 'quick'], category: 'Con Infusión y Pan' },
        { id: 'mer11', num: 11, title: 'Té/café con leche + tostadas con queso untable', desc: '2 rodajas pan integral + queso blanco', time: 10, cal: 280, prot: 15, diff: 'Fácil', badges: ['carbs', 'quick'], category: 'Con Infusión y Pan' },
        { id: 'mer12', num: 12, title: 'Infusión con pan y jamón', desc: '2 rodajas pan integral con jamón y queso', time: 10, cal: 310, prot: 16, diff: 'Fácil', badges: ['carbs', 'quick'], category: 'Con Infusión y Pan' },

        // OPCIONES RAPIDAS
        { id: 'mer13', num: 13, title: 'Fruta + puñado de frutos secos', desc: '1 manzana/pera + 4 nueces', time: 2, cal: 220, prot: 6, diff: 'Fácil', badges: ['quick', 'easy'], category: 'Opciones Rápidas' },
        { id: 'mer14', num: 14, title: 'Yogur solo con fruta', desc: '1 vaso yogur sin azúcar + 1 fruta picada', time: 5, cal: 200, prot: 10, diff: 'Fácil', badges: ['quick', 'easy'], category: 'Opciones Rápidas' },
        { id: 'mer15', num: 15, title: 'Rollitos de jamón y queso (2-3)', desc: 'Con tomates cherry', time: 5, cal: 180, prot: 14, diff: 'Fácil', badges: ['protein', 'quick'], category: 'Opciones Rápidas' }
    ],

    cenas: [
        // A BASE DE HUEVO
        { id: 'cen1', num: 1, title: 'Tortilla de zapallito', desc: 'Con papas hervidas', time: 25, cal: 340, prot: 18, diff: 'Fácil', badges: ['protein', 'easy'], category: 'A Base de Huevo' },
        { id: 'cen2', num: 2, title: 'Huevos al colchón de arvejas', desc: '2 huevos sobre arvejas con cebolla y pimiento salteados', time: 20, cal: 320, prot: 20, diff: 'Fácil', badges: ['protein', 'quick'], category: 'A Base de Huevo' },
        { id: 'cen3', num: 3, title: 'Omelete de verduras y queso', desc: 'Con tomate con albahaca u orégano', time: 15, cal: 300, prot: 22, diff: 'Fácil', badges: ['protein', 'quick'], category: 'A Base de Huevo' },
        { id: 'cen4', num: 4, title: 'Tortilla española', desc: 'Con papa y cebolla + ensalada verde', time: 30, cal: 360, prot: 16, diff: 'Media', badges: ['carbs'], category: 'A Base de Huevo' },
        { id: 'cen5', num: 5, title: 'Huevos revueltos con verduras', desc: 'Con tomate y cebolla + ensalada', time: 15, cal: 280, prot: 18, diff: 'Fácil', badges: ['protein', 'quick'], category: 'A Base de Huevo' },
        { id: 'cen6', num: 6, title: 'Huevos a la plancha (2)', desc: 'Con jamón y queso + ensalada de tomate', time: 15, cal: 320, prot: 24, diff: 'Fácil', badges: ['protein', 'quick'], category: 'A Base de Huevo' },

        // CARNES
        { id: 'cen7', num: 7, title: 'Lomo al plato', desc: 'Churrasco con jamón, queso y huevo a la plancha + tomate con orégano', time: 25, cal: 480, prot: 42, diff: 'Media', badges: ['protein'], category: 'Carnes' },
        { id: 'cen8', num: 8, title: 'Bife a la plancha', desc: 'Con ensalada de tomate, lechuga y zanahoria', time: 20, cal: 440, prot: 45, diff: 'Fácil', badges: ['protein', 'quick'], category: 'Carnes' },
        { id: 'cen9', num: 9, title: 'Pollo grillado', desc: 'Con verduras al vapor o ensalada', time: 25, cal: 380, prot: 46, diff: 'Fácil', badges: ['protein', 'easy'], category: 'Carnes' },
        { id: 'cen10', num: 10, title: 'Salpicón de pollo', desc: 'Con papas, zanahoria, huevo duro y arvejas', time: 30, cal: 400, prot: 38, diff: 'Media', badges: ['protein', 'carbs'], category: 'Carnes' },

        // ENSALADAS COMPLETAS
        { id: 'cen11', num: 11, title: 'Ensalada de lentejas', desc: 'Con tomate, choclo, daditos de queso y zanahoria rallada', time: 15, cal: 360, prot: 22, diff: 'Fácil', badges: ['carbs', 'quick'], category: 'Ensaladas Completas' },
        { id: 'cen12', num: 12, title: 'Ensalada de pollo desmenuzado', desc: 'Con papa, huevo, tomate y arvejas', time: 25, cal: 420, prot: 40, diff: 'Fácil', badges: ['protein'], category: 'Ensaladas Completas' },
        { id: 'cen13', num: 13, title: 'Ensalada césar (sin croutones)', desc: 'Lechuga, pollo, parmesano, huevo', time: 20, cal: 380, prot: 42, diff: 'Fácil', badges: ['protein', 'quick'], category: 'Ensaladas Completas' },
        { id: 'cen14', num: 14, title: 'Ensalada de garbanzos', desc: 'Con tomate, pepino, cebolla morada y huevo', time: 15, cal: 340, prot: 20, diff: 'Fácil', badges: ['carbs', 'quick'], category: 'Ensaladas Completas' },

        // PIZZA Y EMPANADAS
        { id: 'cen15', num: 15, title: 'Pizza integral', desc: '3 porciones, masa fina con harina integral', time: 45, cal: 520, prot: 28, diff: 'Media', badges: ['carbs'], category: 'Pizza y Empanadas' },
        { id: 'cen16', num: 16, title: 'Empanadas', desc: '3 unidades (carne, pollo o verdura)', time: 50, cal: 480, prot: 26, diff: 'Media', badges: ['carbs'], category: 'Pizza y Empanadas' },

        // OTRAS OPCIONES
        { id: 'cen17', num: 17, title: 'Tarta de verduras', desc: 'Sin tapa + ensalada', time: 45, cal: 320, prot: 18, diff: 'Media', badges: ['carbs'], category: 'Otras Opciones' },
        { id: 'cen18', num: 18, title: 'Sushi', desc: '8-12 piezas (ocasional)', time: 60, cal: 380, prot: 24, diff: 'Media', badges: ['carbs'], category: 'Otras Opciones' },
        { id: 'cen19', num: 19, title: 'Suprema grillada', desc: 'Con puré de calabaza', time: 30, cal: 360, prot: 44, diff: 'Fácil', badges: ['protein', 'easy'], category: 'Otras Opciones' },
        { id: 'cen20', num: 20, title: 'Peceto frío', desc: 'Con ensalada rusa light (papa, zanahoria, arvejas, huevo, poco de mayonesa)', time: 40, cal: 400, prot: 38, diff: 'Media', badges: ['protein', 'carbs'], category: 'Otras Opciones' }
    ]
};

// Helper para obtener las categorías únicas
function getCategories(section) {
    const recipes = recipesData[section];
    const categories = [...new Set(recipes.map(r => r.category))];
    return categories;
}

// Helper para obtener recetas por categoría
function getRecipesByCategory(section, category) {
    return recipesData[section].filter(r => r.category === category);
}