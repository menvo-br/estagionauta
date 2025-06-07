
# Estagionauta.com.br 🚀

> Sua missão rumo ao estágio ideal

Uma plataforma que conecta universitários a mentores voluntários, oferece análise de currículo com IA, mapa de agências de estágio e calculadora de recesso.

## ✨ Funcionalidades

### 🎯 Core Features
- **Análise de Currículo com IA**: Avaliação completa usando OpenAI com notas e sugestões personalizadas
- **Formulário Multistep com A/B Testing**: Duas variantes (Menvo vs Career) para validação
- **Mapa de Agências**: Discover e avalie agências de estágio (em desenvolvimento)
- **Calculadora de Recesso**: Cálculo automático baseado na Lei 11.788/2008
- **Sistema de Mentoria**: Conecte-se com mentores voluntários verificados

### 🛠 Tecnologias
- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **UI**: Shadcn/ui, Radix UI, Framer Motion
- **AI**: OpenAI GPT-4 para análise de currículos
- **State Management**: React Query/TanStack Query
- **Forms**: React Hook Form + Zod validation

## 🚀 Quick Start

### 1. Conectar Supabase
1. Clique no botão verde "Supabase" no topo direito da interface Lovable
2. Conecte sua conta e crie um novo projeto
3. Execute o script SQL em `src/sql/schema.sql` no SQL Editor do Supabase

### 2. Configurar Variáveis de Ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Configure as variáveis:
NEXT_PUBLIC_SUPABASE_URL=sua_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role
OPENAI_API_KEY=sua_chave_openai
```

### 3. Executar Localmente
```bash
npm install
npm run dev
```

## 📋 Comandos SQL para Supabase

Execute os comandos em `src/sql/schema.sql` no SQL Editor do Supabase para criar:

- ✅ Todas as tabelas necessárias
- ✅ Políticas RLS (Row Level Security)
- ✅ Triggers e funções automáticas
- ✅ Dados de exemplo (categorias, eventos, agências)

## 🎨 Design System

O projeto usa um design system customizado baseado no Shadcn/ui:

- **Cores Primárias**: Azul (#3B82F6) e Roxo (#8B5CF6)
- **Tipografia**: Inter font family
- **Componentes**: Reutilizáveis e acessíveis
- **Responsividade**: Mobile-first approach

## 📊 A/B Testing

O formulário de análise de currículo possui duas variantes:

1. **Variant "menvo"**: Foca em validar a ideia do Menvo
2. **Variant "career"**: Direcionado aos objetivos de carreira

Para testar específicamente uma variante, use:
- `/analise-curriculo?variant=menvo`
- `/analise-curriculo?variant=career`

## 🔐 Segurança

- **RLS**: Todas as tabelas protegidas com Row Level Security
- **Autenticação**: Supabase Auth com múltiplos provedores
- **Validação**: Frontend e backend com Zod schemas
- **Uploads**: Arquivos armazenados no Supabase Storage com políticas restritas

## 📱 Funcionalidades Futuras

- [ ] Mapa interativo de agências
- [ ] Sistema de avaliações de agências
- [ ] Chat em tempo real mentor-mentee
- [ ] Workshops e eventos online
- [ ] Mobile app (React Native)
- [ ] Integração com LinkedIn

## 🤝 Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 💜 Feito com amor para a comunidade estudantil

O Estagionauta é um projeto social que visa democratizar o acesso à orientação de carreira para universitários brasileiros.

---

**Contato**: contato@estagionauta.com.br
**Instagram**: [@estagionauta](https://instagram.com/estagionauta)
