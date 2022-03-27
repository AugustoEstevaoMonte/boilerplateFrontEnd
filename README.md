
# Template para desenvolvimento Front-End

O template contém várias funções automatizadas para os seus projetos front-end, tudo isso feito pelo Gulp.js que realiza uma série de tarefas  que visa otimizar o tempo do desenvolvedor front-end.


## Funcionalidades 
1.  Live server integrado (Não precisa de usar extensão)
2.  Limpa o cache do navegador a cada atualização feita nos arquivos
3. Transpilação de todo código em SASS da pasta "app/scss" para a pasta "dist"
4. Otimiza todas as imagens dentro da pasta "app/images" e as coloca na pasta "dist/images"
5. Minifica o arquivo CSS em quanto você digita!
6. Minifica o arquivo JS em quanto você digita!
7. Gera CSS sourcemaps e JS sourcemaps automaticamente
8. Usa o Babel.js para tornar o Javascript mais compatível com navegadores antigos
## Autores

- [@Coder Coder](https://www.youtube.com/channel/UCzNf0liwUzMN6_pixbQlMhQ)
- [@augustoestevao](https://github.com/AugustoEstevaoMonte)



## Documentação do template

#### fazendo download do template

```git
  git clone https://github.com/AugustoEstevaoMonte/boilerplateFrontEnd.git
```

#### instalando o Node Modules

```npm
npm install
```


#### instalando o Gulp cli

```npm
npm install -g gulp-cli
```

#### instalando os pacotes NPM requisitos para o Gulp.js

```npm
npm install @babel/core @babel/preset-env postcss autoprefixer browser-sync cssnano dart-sass gulp gulp-babel gulp-postcss gulp-sass gulp-terser gulp-imagemin gulp-cache
```

#### Executando o template

```npm
gulp
```


## Entendendo o template


| Pasta   |  Descrição                           |
| :---------- | :---------------------------------- |
| `app` | É nesta pasta que você irá desenvolver todo o seu projeto, será onde irá colocar imagens, o javascript e o SASS. |
| `dist` | É a pasta para onde automaticamente o seu SASS será transpilado para o CSS, e o seu Javascript e CSS minificados que você escreveu dentro da pasta `app` estarão aqui| 
| **importante** | Não é necessário mexer na pasta `dist` tudo dentro de `app` irá automaticamente para ela. |

### Sub-pastas

| Parâmetro   | Descrição                                   |
| :---------- | :------------------------------------------ |
| `app/vendor`      | É aqui onde você irá colocar todo os arquivos de terceiros como o Bootstrap |
| `app/images` | É aqui  onde você irá colocar todas as suas imagens que serão minificadas e enviadas para a pasta `dist/images`|
| `app/js` | É aqui onde  você colocará o seu Javascript que será minificado é enviado para a pasta `dist` |
| `app/sass` | É aqui onde você colocará o seu SASS que será minificado e transpilado e enviado para a pasta `dist`|




## Demonstração

Insira um gif ou um link de alguma demonstração

![GifProjeto](https://github.com/AugustoEstevaoMonte/gifsProjects/blob/main/bloggif_62407dbe2fc23.gif)
