
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
  bash -c clear && docker exec -it this_node sh
  ```

## Build roboapp

Install create-react-app


Create roboapp

```
create-react-app robofriends

```

Start React

```
npm start
```



Install tachyons

```
npm install tachyons

```
