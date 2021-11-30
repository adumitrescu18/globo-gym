import requests
import random
BASE_URL  = " http://localhost:8080"
ROUTES_API = "/api/routes"



def post_route(creator, waypoints, description):
	print("POSTING ROUTE\n")
	data = {
		"creator":creator,
		"waypoints":waypoints,
		"description": description
	}
	res = requests.post(BASE_URL + ROUTES_API,  json = data)
	return res.json()

def get_all_routes():
	print("GETTING ALL ROUTES\n")
	res = requests.get(BASE_URL + ROUTES_API)
	return res.json()

####ROUTES TEST - create and getAll######
creator = "Garrett"
waypoints = [{"latitude" : 69.69 + i, "longitude": 68.69+i} for i in range(4)]
description = "test description"

res = post_route(creator, waypoints, description)
print(res)
print("\n")

res = post_route("Garrett2", waypoints, description)
print(res)
print("\n")

res = get_all_routes()
print(res)
print("\n")

