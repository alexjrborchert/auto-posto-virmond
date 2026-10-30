# Parada Virmond – Posto, Conveniência e Restaurante

Landing page estática de conceito para reunir o posto e o restaurante em uma experiência premium na BR-277.

## Site no ar

https://paradavirmond.com.br, hospedado na Hostinger (domínio no Registro.br, DNS apontando para `lunar`/`solar.dns-parking.com`). Para atualizar, gere um .zip com o conteúdo de `dist/` (incluindo o `.htaccess`) e envie para `public_html` pelo Gerenciador de Arquivos.

O endereço antigo da prévia (https://alexjrborchert.github.io/auto-posto-virmond/) só redireciona para o site oficial (`redirect/` e `.github/workflows/pages.yml`).

## Prévia local

```sh
python3 -m http.server 4173 --directory dist
```

Abra `http://localhost:4173`.

## Conteúdo e imagens

- `dist/index.html`: estrutura e texto.
- `dist/styles.css`: layout responsivo e animações.
- `dist/script.js`: revelação ao rolar, progresso e menu mobile.
- Todas as fotos são reais, enviadas pelo cliente (outubro de 2026), com leve ajuste de brilho, contraste e saturação, recortadas e convertidas para WebP:
  - `hero-parada.webp` / `hero-parada-mobile.webp`: posto e restaurante à noite (capa).
  - `duo-posto.webp`: pista de abastecimento à noite.
  - `conv-loja.webp`, `conv-cafe.webp`, `conv-bebidas.webp`, `conv-boutique.webp`: colagem diagonal da conveniência e boutique (seção do posto).
  - `rest-balcao.webp`, `rest-salao-mesas.webp`, `rest-buffet.webp`: colagem diagonal do restaurante (salão recortado para focar nas mesas, sem a entrada e o caixa).
- A seção de localização usa o mapa incorporado do Google Maps (`?cid=` do perfil do posto, sem chave de API). O próprio mapa tem o botão "Abrir no Maps".
- Prioridade de layout: celular. No celular as colagens e o mapa ocupam a largura toda da tela.
- As colagens (`.collage`, `.ci-*`, `.cr-*` no CSS) usam posições em porcentagem e `aspect-ratio` igual à proporção de cada foto, então nenhuma foto é cortada e a composição funciona no celular. Ao trocar uma foto, ajuste o `aspect-ratio` do item correspondente.
- `duo-buffet.webp`: macarrão e gratinado do buffet (foto do Instagram do restaurante, recortada sem o fundo desfocado) (seção "Energia para o carro. Sabor para a viagem.").
- `logo-virmond.webp`, `logo-virmond-512.png`, `favicon-64.png`, `apple-touch-icon.png`: geradas a partir do PDF da logo oficial (versão 02).
- Nenhuma foto se repete na página (exceto a logo, no topo e no rodapé).
- As fotos foram recortadas para não mostrar preços (buffet e gás), que mudam com frequência.

## WhatsApp e rastreamento

- Os números e as mensagens prontas de cada setor ficam no objeto `WHATSAPP`, no início de `dist/script.js`. Todos os links com `data-wa="posto"` ou `data-wa="restaurante"` usam essa configuração. Os números escritos como texto (cartões de contato, rodapé e JSON-LD) precisam ser trocados à mão no `index.html`.
- O botão principal da capa (`data-wa-open`) abre a escolha entre posto e restaurante. O botão flutuante (canto inferior direito) faz o mesmo e só aparece depois que o botão da capa sai da tela. Com `?setor=posto` ou `?setor=restaurante` no link do anúncio, ele vai direto para o setor.
- Se o link tiver `utm_campaign`, a mensagem pronta inclui `[ref: campanha]`, para o atendente saber de onde a pessoa veio.
- Cada clique dispara `dataLayer.push({event: 'whatsapp_click', setor, origem})` e, quando o Pixel e o GA4 estiverem instalados, `fbq('track', 'Contact')` e `gtag('event', 'generate_lead')`. Falta só colar os códigos do Meta Pixel e do GA4/GTM no `<head>`.
- "Traçar rota" e "Como chegar" levam ao mapa da própria página (`#localizacao`), sem sair do site.

Horários e telefones (informados pelo cliente) ficam na seção `#contato`. O selo "Aberto agora / Fechado agora" é calculado no horário de Brasília a partir do atributo `data-hours` de cada cartão; ao mudar um horário, atualize também o texto da tabela e o JSON-LD no `<head>`. Os botões "Como chegar" abrem o perfil do posto no Google Maps (`?cid=`).
