# ionic vigimovil

Este es el código necesario para tener un template base de la aplicacion

Para ejecutarlo, es necesario reconstruir los módulos de node usando el comando

```
npm install
```


## pasa a paso en git para iniciar un nuevo repositorio

git init
git status
git add .
git commit -m "primera version"
git remote add origin https://github.com/Gilbert84/ionic-vigimovil.git
git push -u origin master

## es opcional para ponerle un tag cuando se unicia un nuevo repositorio es con el fin de si hay una version estable
git tag -a v0.0.1 -m "socket-io ok"
git push --tags

## pasa a paso en git para actualizar un repositorio

git init
git status
git add .
git commit -m "cambios ok"
git remote add origin https://github.com/Gilbert84/ionic-vigimovil.git

## es obligatorio crear un tag para poder actualizar un repositorio con el mismo nombre
## LA VERSION de ir creciendo en la medida que se hagan los cambios

git tag -a v0.0.1 -m "socket-io ok" 
git push --tags

## comandos utiles

## agrega android al proyecto
ionic cordova platform add android

## construye la aplicacion para depuracion generando un apk
ionic cordova build android

## lanza un emulador de android
ionic cordova emulate android

## lanza la aplicacion en dispositivo fisico , debe estar abierto android studio
## debe estar selecionado el dispositivo 
## debe estar corriendo la aplicacion en el dispositivo
ionic cordova run android --device



##se instala https://github.com/ashish-chopra/ngx-gauge

npm install --save ngx-gauge 
 


