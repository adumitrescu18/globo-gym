import requests
BASE_URL  = " http://localhost:8080"
REPORTS_API = "/api/reports"



def post_report(creator, location, hazard_type, description):
	print("POSTING REPORT\n")
	data = {"creator": creator,
		"location": location,
		"type": hazard_type,
		"description": description
	}
	res = requests.post(BASE_URL + REPORTS_API,  json = data)
	return res.json()

def get_all_reports():
	print("GETTING ALL REPORTS\n")
	res = requests.get(BASE_URL + REPORTS_API)
	return res.json()



####REPORTS TEST - create and getAll######

creator = "Garrett"
location = {"latitude": 69.69, "longitude": 69.69}
hazard_type = "traffic"
description = "test description"

res = post_report(creator, location, hazard_type, description)
print(res)
print("\n")
res = post_report("Garrett2", location, hazard_type, description)
print(res)
print("\n")
res = get_all_reports()
print(res)
print("\n")


