# Parada Virmond: decisões do site

Landing page do Auto Posto Virmond (posto, conveniência e restaurante na BR-277, Km 430 + 400 m, Virmond/PR). A única conversão é o clique no WhatsApp. Site estático em `dist/` (HTML, CSS e JS puros, imagens em WebP). Detalhes técnicos de fotos, colagens e rastreamento estão no `README.md`; este arquivo guarda **o que foi decidido com o cliente e o que falta**.

Converse em português do Brasil. O celular é a prioridade: toda mudança visual precisa ser conferida primeiro no celular e depois no computador.

## Marca e nomes

- O cliente está unificando tudo sob a marca **Parada Virmond** (domínio paradavirmond.com.br).
- Topo, ao lado da logo: **PARADA** em cima e **VIRMOND** embaixo, com mesmo tamanho, mesma espessura e mesma largura total (cada letra é um `<span>` distribuído com `justify-content:space-between`).
- Título da aba, `og:title` e rodapé: **"Parada Virmond – Posto, Conveniência e Restaurante"**. Copyright: "© 2026 Parada Virmond".
- O posto continua como **Auto Posto Virmond** (nome registrado).
- **O restaurante aparece só como "Restaurante".** O cliente não tem registro de "Restaurante Virmond" nem de "Restaurante Posto Virmond". Única exceção: no JSON-LD o nome é "Restaurante da Parada Virmond", para o Google saber de qual restaurante se trata.
- Dobra posto × restaurante: sem legenda no canto (a antiga "AUTO POSTO × RESTAURANTE · VIRMOND" lia como "Restaurante Virmond" e foi removida). "Duas essências, uma só parada" fica embaixo do título, centralizada sob ele. Evite colocar "Virmond" logo depois de "Restaurante".
- **Nunca usar "Cantagalo"** (nome antigo do restaurante). Ele foi apagado até da placa na foto antiga da capa.

## Textos e conteúdo

- Título da capa: "Sua parada *completa* na BR-277."
- Serviços do posto, nesta ordem (3 linhas de 3 no computador): Combustível Petrobras, Troca de óleo, Lubrificação · Palhetas, Gás Liquigás, Conveniência · Café e lanches, Boutique de presentes, Espaço de descanso. Troca de óleo, lubrificação e palhetas foram confirmados pelo cliente.
- Buffet: é livre, por quilo e marmitex, mas **não mostrar isso no site**, porque o cliente vai trabalhar esse assunto nos anúncios.
- Fotos e textos **não mostram preços** (buffet e gás mudam com frequência).
- Pagamentos: Dinheiro, Pix, Cartão de crédito, Cartão de débito. Cartões de frota: Fitcard, Prime, Neo, Loop, Link, Fitmoby, Ticket Log.
- Horários:
  - Posto: segunda a sexta 06:00–21:00, sábado 06:00–20:00, domingo 07:00–20:00.
  - Restaurante: segunda a sábado 11:00–14:30; domingo fechado.
  - Ao mudar um horário, atualize a tabela, o `data-hours` do cartão e o JSON-LD.
- Links "Conheça no Instagram" e "WhatsApp do…" foram tirados das seções do posto e do restaurante para não poluir. O Instagram fica só no rodapé.

## Fotos

- Todas as fotos são reais, do cliente. **Nenhuma foto se repete** na página (só a logo, no topo e no rodapé).
- Capa (desde nov/2026): a foto da pista e da conveniência à noite que o cliente escolheu (`hero-capa.webp` / `hero-capa-mobile.webp`). Ela só existe em 1179×714 e foi ampliada com nitidez e redução de ruído. Se o cliente mandar o original como **documento** no WhatsApp (sem compressão), refazer com qualidade máxima.
- Ao trocar uma imagem, **use um nome de arquivo novo**. O `.htaccess` guarda imagens em cache por 30 dias, então substituir o arquivo com o mesmo nome demora a aparecer para os visitantes.
- Colagens diagonais com `aspect-ratio` igual à proporção de cada foto, para nenhuma ser cortada. Ao trocar uma foto, ajuste o `aspect-ratio` do item.

## Telefones e WhatsApp

- Posto: (42) 99938-6409. Restaurante: (42) 99155-7249.
- Os números e as mensagens prontas ficam no objeto `WHATSAPP` em `dist/script.js`. Os números escritos como texto (cartões, rodapé, JSON-LD) ficam no `index.html` e precisam ser trocados à mão.
- O botão da capa e o botão flutuante abrem a escolha entre posto e restaurante. Com `?setor=posto` ou `?setor=restaurante` no link do anúncio, vão direto para o setor. `utm_campaign` acrescenta `[ref: campanha]` à mensagem.

## Rastreamento

- Cada clique no WhatsApp dispara `dataLayer.push({event: 'whatsapp_click', setor, origem})`, além de `fbq('track', 'Contact')` e `gtag('event', 'generate_lead')` quando o Pixel e o GA4 estiverem instalados.
- O código já está pronto; falta colar os scripts do Meta Pixel e do GA4/GTM no `<head>`.

## Instagram

- Posto: @autoposto_virmond. Restaurante: @restaurantecantagalopr. O link do restaurante foi mantido por enquanto, a pedido do usuário, mesmo com o nome antigo.
- O cliente provavelmente vai unir os dois perfis em um só (e também os perfis do Google). Quando isso acontecer, atualize os links do rodapé e o `sameAs` do JSON-LD.

## Hospedagem e domínio

- No ar em **https://paradavirmond.com.br**, na Hostinger (plano Unlimited, na conta do cliente; o usuário entra como colaborador ou com o login de administrador).
- O domínio continua registrado no **Registro.br**, com os servidores DNS **athena.dns-parking.com** e **apollo.dns-parking.com**. Os antigos lunar/solar pararam de publicar a zona em 05/11/2026 e o site ficou fora do ar até a troca.
- **Não transferir o domínio para a Hostinger.** Duas tentativas falharam, e a transferência travou a troca de DNS no Registro.br. O domínio fica no Registro.br.
- A zona DNS na Hostinger tem ALIAS @ e CNAME www apontando para a CDN, e A ftp 185.239.210.12. O servidor também atende o site direto em 185.239.210.12.
- Se o site parecer fora do ar só para o usuário: o computador dele usa o DNS da Cloudflare (1.1.1.1). Limpe em https://one.one.one.one/purge-cache/ (tipos A e NS) e em `chrome://net-internals/#dns`.
- `dist/.htaccess`: redireciona http e www para https://paradavirmond.com.br e guarda imagens em cache por 30 dias.
- O site pode aparecer no Google (sem `noindex`); o sitemap e o robots apontam para o domínio oficial.

### Como publicar uma alteração

1. Commit e push no GitHub (repositório `alexjrborchert/auto-posto-virmond`). A alteração entra na branch `main` (direto ou aprovando um pull request).
2. A tarefa automática `.github/workflows/hostinger.yml` envia por FTP (FTPS, porta 21, servidor 185.239.210.12) só os arquivos de `dist/` que mudaram para `public_html`. No FTP, o caminho é `/domains/paradavirmond.com.br/public_html/` (absoluto, com barra no início). Antes de enviar, a tarefa confere se essa pasta tem o arquivo `DO_NOT_UPLOAD_HERE` ao lado da `public_html` e, se não tiver, para sem enviar nada. Histórico: a pasta inicial do FTP é `/public_html`, que **não** é a do site; as duas primeiras tentativas deixaram cópias soltas em `/public_html` (e em `/public_html/domains`), que podem ser apagadas. A tarefa só de leitura `.github/workflows/ftp-diagnostico.yml` lista as pastas do FTP. Roda a cada push na `main` que mexe em `dist/`, e também pode ser disparada à mão na aba Actions.
3. Usuário e senha do FTP ficam nos segredos do repositório (`VIRMOND_HOSTINGER_FTP_USUARIO` e `VIRMOND_HOSTINGER_FTP_SENHA`). Nunca pedir a senha na conversa. Se a senha do FTP mudar na Hostinger, atualizar o segredo.
4. **Não editar arquivos direto na Hostinger**: o GitHub é a única fonte do site.
5. Depois, confira no site oficial (janela anônima). Se aparecer versão antiga, limpar o cache da CDN na Hostinger.
6. Plano B, se a tarefa automática falhar: o usuário envia só os arquivos que mudaram pelo Gerenciador de Arquivos, para `public_html` (imagens em `public_html/assets`), escolhendo "Replace all". Não use .zip.

- O endereço antigo da prévia (alexjrborchert.github.io/auto-posto-virmond) só redireciona para o site oficial (`redirect/` e `.github/workflows/pages.yml`).
- Mensagens de commit terminam com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Pendências

- [ ] **Telefones:** o cliente ainda precisa confirmar qual número é do posto e qual é do restaurante. A placa do posto e o Google mostram 99155-7249 como o do posto, o contrário do site.
- [ ] **Meta Pixel e GA4/GTM:** o cliente vai mandar os códigos.
- [ ] **Google Search Console:** propriedade do tipo Domínio, com um registro TXT na zona DNS da Hostinger; depois enviar `sitemap.xml`. Ficou para quando o usuário tiver acesso à conta Google certa (pode ser a dele, adicionando o cliente como proprietário).
- [ ] **Link do site nos perfis:** colocar https://paradavirmond.com.br nos perfis do Google (posto e restaurante) e nos Instagram. É o cliente ou o usuário que faz isso nas contas.
- [ ] **Unificação** dos perfis do Google e do Instagram sob "Parada Virmond", quando o cliente decidir. Depois, atualizar os links do site.
- [ ] **Foto da capa em tamanho original**, se o cliente tiver.
