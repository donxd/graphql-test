# Test Graphql

```
http://localhost:3000/q?query={users{id}}
http://localhost:3000/q?query=query{users{id}}

http://localhost:3000/q?query=query{users(id:"11687330"){id}}
http://localhost:3000/q?query=query{users(filter:{id:"11687330"}){id}}

http://localhost:3000/q?query={users{id,career,name,nameShort,tools{name}}} # ok
http://localhost:3000/q?query={users{id,career,name,nameShort,tools(filter:{name_contains:"js"}){name}}} #x
http://localhost:3000/q?query={users{id,career,name,nameShort}}
http://localhost:3000/q?query={users{id,career,name,nameShort}}
    http://localhost:3000/q?query="query users{id,career,name,nameShort}" x
http://localhost:3000/q?query={user(id:11687330){id,career,name,nameShort}}

http://localhost:3000/q?query={user(id:11687330){name}} x
http://localhost:3000/q?query={user(id:"11687330"){name,id,career,cf}}
    http://localhost:3000/q?query={user(id:%2211687330%22){name}}
http://localhost:3000/q?query={user(email:"xavierxmac@gmail.com"){name,id,career,cf}}


http://localhost:3000/q?query={user(id:"11687330",nameShort:"Javier Castañeda"){name,id,career,cf}}

http://localhost:3000/q?query={user(id:"11687330",nameShort:"Javier Castañeda"){name,id,career,cf,tools}} x 

http://localhost:3000/q?query={user(id:"11687330"){name,id,career,cf,tools{icon,name}}}

http://localhost:3000/q?query={user(id:"11687330"){name,id,career,cf,tools(name:"js"){icon,name}}} x
http://localhost:3000/q?query={user(id:"11687330"){name,id,career,cf,tools:tool(name:"js"){icon,name}}}




curl -X POST -H "Content-Type: application/json" -d '{"query":"query fuh($id:String!){user(id:$id)}","variables":{"id":"11687330"}}' http://localhost:3000/q
curl -X POST -H "Content-Type: application/json" -d '{"query":"{user($id:String)}","variables":{"id":"11687330"}}' http://localhost:3000/gph
curl -X POST -H "Content-Type: application/json" -d '{"query":"{user(id:$id)}","variables":{"id":"11687330"}}' http://localhost:3000/gph
curl -X POST -H "Content-Type: application/json" -d '{"query":"{user}","variables":{"id":"11687330"}}' http://localhost:3000/gph #ok
curl -X POST -H "Content-Type: application/json" -d '{"query":"{user2(id:\"88\")}","variables":{"id":"11687330"}}' http://localhost:3000/gph
curl -X POST -H "Content-Type: application/json" -d '{"query":"query User2($id:String!){user2(idd: $id)}","variables":{"id":"11687330"}}' http://localhost:3000/gph
curl -X POST -H "Content-Type: application/json" -d '{"query":"query User2($id:Int!){user2(idd: $id)}","variables":{"id":10}}' http://localhost:3000/gph
curl -X POST -H "Content-Type: application/json" -d '{"query":"query User2($id:String!){user2(idd: $id)}","variables":{"id":"11687330"}}' http://localhost:3000/gph #ok



http://localhost:3000/q?query=query+getUser($id:ID){user(id:$id){name}}&variables={"id":"11687330"}
http://localhost:3000/q?query=query+getUser($id:String){user(id:$id){name}}&variables={"id":"11687330"}
```