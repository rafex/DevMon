# DevMon: La Leyenda del Programador (Phaser 3 RPG)

> Un RPG 2D estilo Pokémon donde un programador recorre el “mundo real” (oficina + home office + cliente) enfrentándose en batallas por turnos contra Project Managers, Managers, Customers y otros Developers.  
> El objetivo: crecer habilidades, sobrevivir sprints, dominar releases… y no quebrarte por el estrés.

---

## 1) Descripción del juego

**Género:** RPG 2D top-down + combate por turnos  
**Inspiración:** loop de exploración + encuentros + batallas tipo Pokémon (sin capturas, más “progresión de skills”)  
**Plataformas objetivo:** Web (desktop primero), móvil después (PWA opcional)

### Loop principal (core gameplay)
1. Exploras zonas (mapas) y hablas con NPCs.
2. Te topas con **encuentros** (reuniones sorpresa, bugs, cambios de scope).
3. Entras a un **combate por turnos**.
4. Ganas XP, desbloqueas habilidades, consigues ítems.
5. Vuelves al mundo y avanzas la historia con nuevos accesos / llaves / permisos.

---

## 2) Historia base (lore)

### Premisa
Eres **Rafa**, un programador que entra a una empresa donde el proyecto “K” promete cambiarlo todo… pero está plagado de:
- PMs que mueven prioridades cada 2 horas
- Managers obsesionados con métricas
- Customers que cambian el scope en demo day
- Developers rivales con ego + code reviews letales

Tu misión: convertir el caos en un producto estable, construir tu reputación y derrotar al boss final: **“Release Night: El Incidente”**.

### Actos sugeridos (estructura narrativa)
**Acto 1 — El Onboarding**
- Llegas al equipo.
- Aprendes lo básico: tickets, ramas, deploy.
- Primer boss: **PM Junior** (“Reunión Infinita”).

**Acto 2 — El Sprint Eterno**
- Se abre el mapa (home office, oficina, salas).
- Encuentras side-quests (refactor legacy, migración, bugs antiguos).
- Boss: **Manager de Métricas** (“OKRs Imposibles”).

**Acto 3 — La Demo del Cliente**
- Zonas con enemigos “Customer”.
- Mecánica clave: negociación de scope / manejo de expectativas.
- Boss: **Customer VIP** (“Scope Creep Supremo”).

**Acto 4 — Release Night**
- El mundo cambia: incidentes, hotfixes, regresiones.
- Último boss: **El Sistema Legacy** + “Incidente 500”.
- Final: estabilizas el proyecto K y desbloqueas “Modo Mentor”.

---

## 3) Mundo, facciones y enemigos

### Facciones
- **PM Guild:** control de turnos, debuffs por “cambio de prioridad”.
- **Management League:** buffs propios, presión, estados de ansiedad.
- **Customer Council:** ataques de “urgente”, “para ayer”, “cambio de último minuto”.
- **Developers Arena:** daño alto, contraataques, “refactor” que rompe builds.

### Tipos de combate (ejemplos)
- **Encuentro aleatorio:** bug, junta, dependencia rota.
- **Encuentro por zona:** entrar a sala de juntas → probabilidad de PM.
- **Boss:** eventos de historia (demo, release, retro).

---

## 4) Sistema de combate

### Stats base (sugeridos)
- **Focus (HP):** tu claridad mental.
- **Energy (MP):** tu stamina para ejecutar acciones.
- **Logic:** daño de acciones técnicas.
- **Communication:** resistencia a debuffs sociales.
- **Speed:** define orden de turnos.
- **Stress (estado):** si sube mucho, penaliza precisión o defensa.

### Acciones / habilidades (ejemplos)
- **Refactor:** daño medio + chance de buff (logic).
- **Write Tests:** baja daño recibido, reduce riesgo de “regresión”.
- **Coffee Break:** cura + reduce stress.
- **Hotfix:** daño alto, consume mucha energy, chance de “deuda técnica”.
- **Scope Negotiation:** counter vs Customer (reduce daño de “scope creep”).
- **1:1 Prep:** counter vs Manager (reduce debuffs).

### Estados (status effects)
- **Stressed:** baja speed / precisión.
- **Blocked:** no puedes usar ciertas acciones (dependencias).
- **Context Switch:** pierdes energy cada turno.
- **Overtime:** sube daño pero aumenta stress rápidamente.

---

## 5) Diseño de extensibilidad (principios)

### Objetivo de arquitectura
Que sea fácil agregar:
- Nuevos enemigos (tipo + IA)
- Nuevas habilidades
- Nuevos ítems
- Nuevos mapas/zonas/eventos
- Nuevas UI screens (inventario, skills, log de combate)

### Principios
- **Data-driven:** enemigos, habilidades e ítems definidos como JSON/TS objects (no hardcode).
- **ECS-lite o Componentes:** separar “lo que es” (datos) de “lo que hace” (sistemas).
- **Eventos:** comunicación entre sistemas por EventBus.
- **Máquinas de estados:** para escenas y para combate.
- **Inversión de dependencias (simple):** servicios (Audio, Save, Dialog) inyectables.

---

## 6) Stack tecnológico

### Runtime
- **Phaser 3** (motor 2D)
- **TypeScript** (recomendado para escalabilidad)
- **Vite** (bundler/dev server)
- **pnpm** o **npm** (paquetería)

### Herramientas de calidad
- **ESLint** + **Prettier** (estilo + consistencia)
- **Vitest** (tests de lógica: combate, cálculos, drops)
- **Zod** (validación de data JSON de enemigos/skills/items)

### Assets / Content pipeline
- **Tiled** (tilemaps)
- **Aseprite** (sprites) o placeholders al inicio
- **TexturePacker** (opcional: atlas)

### Persistencia
- **LocalStorage / IndexedDB** (MVP)
- **SaveService** con interfaz → futuro backend (si un día lo haces online)

---

## 7) Estructura de proyecto recomendada

> Estructura pensada para extensibilidad y separación clara.

devmon/
public/
assets/
sprites/
tilesets/
maps/
sfx/
music/
src/
main.ts
game/
config/
phaserConfig.ts
scenes/
BootScene.ts
WorldScene.ts
BattleScene.ts
UIScene.ts
systems/
input/
InputSystem.ts
world/
MovementSystem.ts
EncounterSystem.ts
battle/
BattleSystem.ts
TurnSystem.ts
StatusSystem.ts
DamageSystem.ts
RewardSystem.ts
domain/
entities/
Player.ts
Enemy.ts
valueObjects/
Stats.ts
StatusEffect.ts
rules/
damage.ts
turnOrder.ts
xp.ts
data/
enemies/
pm.json
manager.json
customer.json
developer.json
skills/
skills.json
items/
items.json
services/
AudioService.ts
SaveService.ts
DialogService.ts
AssetService.ts
ui/
components/
Menu.ts
Panel.ts
hud/
BattleHUD.ts
WorldHUD.ts
infra/
EventBus.ts
Logger.ts
Random.ts
tests/
battleRules.test.ts
xp.test.ts

### Qué va en cada capa
- `domain/`: reglas puras (sin Phaser). Aquí vive la lógica del juego.
- `systems/`: conectan input/Phaser con el dominio (aplican reglas).
- `data/`: todo lo configurable (enemigos/skills/items). Data-driven.
- `services/`: “infra” intercambiable (audio, guardado, diálogos).
- `scenes/`: orquestación visual y flujos.

---

## 8) Contratos e interfaces clave (para extensibilidad)

### Definición de enemigo (data-driven)
- `type`: "pm" | "manager" | "customer" | "developer"
- `stats`: base
- `skills`: lista por id
- `aiProfile`: tipo de IA (agresivo, control, defensivo)

### Skills como catálogo
Cada skill se define por:
- `id`, `name`
- `costEnergy`
- `tags`: ["tech", "social", "defense", ...]
- `effect`: referencia a un handler (por id) o fórmula declarativa

### Sistema de efectos (handlers)
- `DamageEffect`
- `HealEffect`
- `ApplyStatusEffect`
- `RemoveStatusEffect`
- `BuffStatsEffect`

Así puedes crear skills nuevas sin tocar el core: solo agregas data + un handler si es un efecto nuevo.

---

## 9) Roadmap (MVP → Pro)

### MVP (jugable)
- 1 mapa simple
- 2 enemigos (PM, Developer)
- 6 skills
- combate por turnos con HP/Energy
- guardado local de progreso

### v1
- historia por actos (misiones)
- bosses
- inventario / consumibles
- estados (stress, blocked)

### v2 (pro)
- más mapas
- side-quests
- mejoras en IA
- balance de habilidades
- soporte móvil (controles touch)

---

## 10) Reglas de oro de desarrollo
- Todo lo “nuevo” debe entrar por **data** primero.
- La lógica de combate vive en **domain/** (testeable).
- Phaser sólo orquesta: render + input + audio.
- La comunicación entre sistemas se hace por **EventBus**.

---

## 11) Nombre, tono y estética
**Tono:** humor ligero + sátira tech, pero con progreso heroico.  
**Estética:** pixel art simple, UI retro tipo RPG.  
**Nombre tentativo:** *DevMon*, *Sprint Quest*, *Bug Hunter*, *Refactor Legends*.

---