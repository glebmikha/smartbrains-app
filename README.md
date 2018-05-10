
```
docker rm -f smartbrains_frontend
```

```
docker-compose build --no-cache

docker-compose up -d --build

docker-compose up -d

```

docker-compose stop



To remove all containers
```
docker rm -f $(docker ps -a -q)
```

## Connect to a container terminal
  ```
  bash -c clear && docker exec -it smartbrains_frontend sh
  ```

  ```
  bash -c clear && docker exec -it smartbrains_backend sh
  ```


## Create and start app

Create app

```
create-react-app smartbrains

```

Start React

```
npm start
```



Install tachyons

```
npm install --save tachyons
//this removed all packages. I rebuilt docker and it fixed. Dunno. Maybe I should use install without save

npm install tachyons

```

Tune Docker.

https://medium.com/@McMenemy/react-docker-for-development-and-production-6cb50a1218c5


npm i

```
npm install --save react-tilt
```

```
npm install react-particles-js
```

```
npm install clarifai
```

https://secure.i.telegraph.co.uk/multimedia/archive/03249/archetypal-female-_3249633c.jpg


#ENTRYPOINT while true; do echo hello world; sleep 1; done

#RUN npm i #to not delete packages on npm install (locally)
