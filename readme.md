# SF-SajermannFortnite

Projeto responsável por fornecer estatísticas do jogo Fortnite baseado na consulta de jogadores.

Esse projeto utiliza a api FortniteApi.io

## Backend

Responsável por receber o request do front e realizar uma requisição ao FortniteApi devolvendo então as estatísticas ao front.

## Frontend

Responsável por fornecer uma interface gráfica ao usuário onde o mesmo pode realizar a pesquisa das estatísticas, o front se conecta com o back em buscas dessas informações.

## Bot

Bot do Discord responsável por fornecer as estatísticas através de comandos no Discord.

Para utilização do bot, é necessário convidá-lo para o servidor desejado, após, basta digitar `sf-[username]` para que ele faça a verificação e retorne o resultado, por exemplo `sf-AlemaoRetroGame`

Incluído versionamento, agora é possível saber a versão do bot publicado enviando a msg `sf-version` que ele responderá com a versão atual disponibilizado no `package.json`, essa versão por sua vez é incrementada a cada merge request na branch main, o github actions se encarrega do resto.

![SajermannFortniteBot](https://lh3.googleusercontent.com/pw/AM-JKLUQ7WaTvLMX3aR74-JIUi8Tbenq0GzBVHzqhzSfdWWBqRUvw2BRD0pyEkslct9YQdZJtL8jKhee9P2mME_1h1Neb-RbT66bU5RPz26Os1uePhhuFelALYCIm8jvS7-lwXePBMTLIUOWGpQtWMJLP6DR=w1188-h343-no?authuser=0)
