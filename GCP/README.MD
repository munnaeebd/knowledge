```
Those index.js file has limitation that need to pass zone name of the instance. 

instead use customize-for-all-3-zone-of-asia-southeast1.js, for all instance of asia-southeast1
```

## GCP IAM Condition
```
Scenario: We would like to provide compute admin access only UAT resources for dev or SO. then we can provide "Compute Instance Admin (v1)" access to the users with the below condition 
Condition Editor: resource.name.extract('/instances/{name}').startsWith('uat-')
Now the problem is user will face issue to list the instances. Due to this below permission is required without any condition.

compute.instances.get
compute.instances.list
compute.projects.get


resource.name.extract('/instances/{name}').startsWith('sit-')

Reference: 
https://cloud.google.com/iam/docs/resource-types-with-conditional-roles
https://cloud.google.com/iam/docs/conditions-attribute-reference
https://cloud.google.com/iam/docs/conditions-resource-attributes?_gl=1*1qdd2pv*_ga*Nzc0NjMzNDYyLjE3MDg4NDAyMTE.*_ga_WH2QY8WWF5*MTcyNDEyNzI2OC41My4xLjE3MjQxMzIwNjAuNjAuMC4w
https://cloud.google.com/iam/docs/configuring-resource-based-access#extract-values

```
