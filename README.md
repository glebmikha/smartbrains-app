
```
docker-compose up -d --build

docker-compose up -d

```

docker-compose stop

docker rm -f this_node


To remove all containers
```
docker rm -f $(docker ps -a -q)
```

## Connect to a container terminal
  ```
  bash -c clear && docker exec -it smartbrains_node sh
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


```
npm install --save react-tilt
```
