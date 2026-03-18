# Workflow: Configuração de PWA com Vite

**Instruções para a IA**:
1. Analise o arquivo `vite.config.ts` atual.
2. Adicione ou configure o `vite-plugin-pwa` para gerar o Service Worker.
3. Configure o manifesto (`manifest.json` no config) com as cores primárias do `UI-PATTERNS.md` e nome "Heure C2".
4. Integre a estratégia de *Workbox* (Stale-while-revalidate) focando no cache de arquivos estáticos da Cloudflare.
5. Conecte o Service Worker ao arquivo existente `src/services/offlineDataService.ts` para garantir que o registro de horas (`DailyLogEntry`) funcione sem internet e sincronize depois.