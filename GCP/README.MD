```
Those index.js file has limitation that need to pass zone name of the instance. 

instead use customize-for-all-3-zone-of-asia-southeast1.js, for all instance of asia-southeast1
```

## GCP IAM Condition
```
Scenario: We would like to provide compute admin access only UAT resources for dev or SO. then we can provide "Compute Instance Admin (v1)" access to the users with the below condition 
Condition Editor: resource.name.extract('/instances/{name}').startsWith('sit-')

resource.name.extract('/instances/{name}').startsWith('sit-')
```
