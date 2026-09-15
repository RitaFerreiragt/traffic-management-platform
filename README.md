# Traffic Management Platform

> Aplicação web premium de gestão de tráfego pago e geração de leads para Portugal

## 🎯 Objetivo

Plataforma profissional de lead generation e qualificação para uma gestora de tráfego pago em Portugal, funcionando como website premium + interface integrada com CRM.

## 🏗️ Arquitetura

### Stack Tecnológico

- **Framework:** Next.js 15 + React 19
- **Linguagem:** TypeScript
- **Styling:** TailwindCSS + Custom CSS
- **Formulários:** React Hook Form + Zod
- **Animações:** Framer Motion
- **HTTP Client:** Axios
- **State Management:** Zustand (futura integração)

### Estrutura de Diretórios

```
src/
├── app/                      # App Router do Next.js
│   ├── layout.tsx           # Layout raiz
│   ├── page.tsx             # Página principal
│   └── api/                 # Rotas API
│
├── components/              # Componentes React reutilizáveis
│   ├── layout/             # Componentes de layout
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/           # Secções da página principal
│   │   ├── Hero.tsx
│   │   ├── Problem.tsx
│   │   ├── Differentiation.tsx
│   │   ├── ForWho.tsx
│   │   ├── Services.tsx
│   │   └── FreeDiagnostic.tsx
│   └── common/            # Componentes comuns
│
├── config/                 # Configurações
│   └── constants.ts
│
├── hooks/                  # React Hooks customizados
│   └── useForm.ts
│
├── lib/                    # Utilitários e funções helper
│   └── api.ts
│
├── styles/                 # Estilos globais
│   └── globals.css
│
├── types/                  # Definições TypeScript
│   └── index.ts
│
└── utils/                  # Funções utilitárias
    └── validation.ts
```

## 🎨 Design System

### Cores

- **Warm White:** #FAFAF8
- **Ivory:** #F5F3F0
- **Charcoal:** #1A1A1A
- **Beige:** #D4C5B9
- **Taupe:** #B8A89F
- **Gold (Subtle):** #E8D4B8

### Tipografia

- **Títulos:** Playfair Display (serif)
- **Corpo:** Inter (sans-serif)

## 📄 Secções Principais

1. **Hero:** Headline e CTA principal
2. **Problema:** Apresentação dos desafios comuns
3. **Diferenciação:** Processo de 4 etapas
4. **Para Quem:** Segmentação (Clínicas, Profissionais, Lojas)
5. **Serviços:** 5 serviços principais
6. **Diagnóstico Gratuito:** CTA final + formulário

## 🚀 Começar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clonar repositório
git clone https://github.com/RitaFerreiragt/traffic-management-platform.git
cd traffic-management-platform

# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env.local

# Iniciar servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📦 Scripts

```bash
npm run dev        # Inicia servidor de desenvolvimento
npm run build      # Faz build de produção
npm run start      # Inicia servidor de produção
npm run lint       # Verifica código com ESLint
npm run type-check # Verifica tipos TypeScript
npm run format     # Formata código com Prettier
```

## 🔐 Variáveis de Ambiente

Ver `.env.example` para configuração completa.

## 📝 Princípios de Desenvolvimento

- ✅ Código limpo e bem documentado
- ✅ TypeScript strict mode
- ✅ Componentes reutilizáveis e testáveis
- ✅ Performance otimizada (Next.js best practices)
- ✅ Acessibilidade (WCAG standards)
- ✅ Responsive design mobile-first
- ✅ SEO optimizado

## 📚 Componentes Implementados

- [x] Header com navegação
- [x] Hero section
- [x] Problem section
- [x] Differentiation section
- [x] ForWho section
- [x] Services section
- [x] Free Diagnostic section
- [x] Footer
- [ ] Lead form com validação
- [ ] API de leads
- [ ] Integração CRM
- [ ] Analytics
- [ ] Notificações por email

## 🛣️ Próximos Passos

1. Implementar formulário de leads com validação
2. Criar API de leads (POST /api/leads)
3. Integração com CRM
4. Sistema de notificações por email
5. Analytics e tracking
6. Página de agendamento de reunião
7. Testes unitários e E2E

## 📄 Licença

MIT © 2024 Traffic Management
