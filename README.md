# GaiaSenses App

## Setup
### Ambiente
* NodeJS
* JDK 11
* Android SDK

Para mais detalhes de como instalar estas dependências, veja o guia no site do [React Native](https://reactnative.dev/docs/environment-setup?guide=native).

### App
1. Clone o repositório
```console
$ git clone https://github.com/GaiaSenses/GaiaSensesApp.git

$ cd GaiaSensesApp
```

2. Instale dependências do Node
```console
$ npm i
```

3. Crie o arquivo `.env` contendo as seguintes variáveis de ambiente (coloque entre áspas as URLs reais)
```ini
APP_API_URL=""
WEATHER_API_URL=""
```

4. Compile e execute o app. Isso pode ser feito pela interface do VSCode ou pelo terminal.
```console
$ npx react-native start

$ # em outra instância execute:

$ npx react-native run-android
```
